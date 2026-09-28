import json
from io import BytesIO

import torch
from flask import Blueprint, jsonify, request
from google import genai
from PIL import Image
from torchvision import transforms

from app.config.env import EnvironmentConfig
from app.models.model import load_model

api = Blueprint('api', __name__)

model = load_model('app/models/checkpoints/epoch=38-step=44109.ckpt')
classes = ['biological', 'cardboard', 'clothes', 'electronics', 'glass', 'metal', 'paper', 'plastic', 'shoes', 'trash']

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
])

genai_client = genai.Client(api_key=EnvironmentConfig.aistudio_api_key)


@api.route('/classify', methods=['POST'])
def classify():
    if 'file' not in request.files:
        return jsonify({ 'success': False, 'statusCode': 400, 'message': 'BadRequest', 'data': {} }), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({ 'success': False, 'statusCode': 400, 'message': 'BadRequest', 'data': {} }), 400

    try:
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

        image = Image.open(BytesIO(file.read())).convert('RGB')
        image_tensor = transform(image).unsqueeze(0).to(device)
        model.to(device)

        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)

        metadata = genai_client.models.generate_content(
            model=EnvironmentConfig.aistudio_model,
            contents=[EnvironmentConfig.aistudio_prompt, image]
        )
        metadata = metadata.text
        if metadata.startswith('```json') and metadata.endswith('```'):
            metadata = metadata[7:-3]
        metadata = json.loads(metadata)

        return jsonify({
            'success': True,
            'statusCode': 200,
            'message': '',
            'data': {
                'prediction': classes[predicted.item()],
                'confidence': f'{confidence.item() * 100:.2f}',
                'metadata': metadata
            }
        })
    except Exception as error:
        return jsonify({ 'success': False, 'statusCode': 500, 'message': '', 'data': { 'error': str(error) } }), 500
