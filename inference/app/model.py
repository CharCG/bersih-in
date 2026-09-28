from pathlib import Path
import pytorch_lightning as pl
import torch
import torch.nn as nn
import torch.nn.functional as F
from efficientnet_pytorch import EfficientNet
from torchmetrics.classification import MulticlassAccuracy

CHECKPOINT_PATH = Path(__file__).resolve().parent / 'checkpoints' / 'epoch=38-step=44109.ckpt'

class EfficientLite(pl.LightningModule):
    def __init__(self, lr: float, num_classes: int, *args, **kwargs):
        super().__init__()

        self.save_hyperparameters()

        self.model = EfficientNet.from_name('efficientnet-b0')
        self.model._fc = nn.Linear(self.model._fc.in_features, num_classes)

        self.train_accuracy = MulticlassAccuracy(num_classes)
        self.val_accuracy = MulticlassAccuracy(num_classes)
        self.test_accuracy = MulticlassAccuracy(num_classes)

    def forward(self, x):
        return self.model(x)

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=self.hparams.lr, weight_decay=1e-4)
        scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.1)
        return [optimizer], [scheduler]

    def training_step(self, batch, batch_idx):
        inputs, labels = batch
        logits = self.model(inputs)
        loss = F.cross_entropy(logits, labels)
        self.train_accuracy(torch.argmax(logits, dim=1), labels)
        self.log('train_loss', loss, on_epoch=True)
        self.log('train_acc', self.train_accuracy, on_step=False, on_epoch=True, prog_bar=True)
        return loss

    def validation_step(self, batch, batch_idx):
        inputs, labels = batch
        logits = self.model(inputs)
        loss = F.cross_entropy(logits, labels)
        self.val_accuracy(torch.argmax(logits, dim=1), labels)
        self.log('val_loss', loss, on_epoch=True)
        self.log('val_acc', self.val_accuracy, on_step=False, on_epoch=True, prog_bar=True)

    def test_step(self, batch, batch_idx):
        inputs, labels = batch
        logits = self.model(inputs)
        loss = F.cross_entropy(logits, labels)
        self.test_accuracy(torch.argmax(logits, dim=1), labels)
        self.log('test_loss', loss, on_epoch=True)
        self.log('test_acc', self.test_accuracy, on_step=False, on_epoch=True, prog_bar=True)


def load_model():
    model = EfficientLite.load_from_checkpoint(CHECKPOINT_PATH)
    model.eval()
    return model
