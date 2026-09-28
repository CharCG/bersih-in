import json
from io import BytesIO
import torch
from flask import Blueprint, jsonify, request
from google import genai
from PIL import Image
from torchvision import transforms
from app.env import EnvironmentConfig
from app.model import load_model

api = Blueprint('api', __name__)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = load_model().to(device)
classes = ['biological', 'cardboard', 'clothes', 'electronics', 'glass', 'metal', 'paper', 'plastic', 'shoes', 'trash']

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
])

genai_client = genai.Client(api_key=EnvironmentConfig.aistudio_api_key)


@api.post('/classify')
def classify():
    if 'file' not in request.files:
        return jsonify({ 'success': False, 'statusCode': 400, 'message': 'BadRequest', 'data': {} }), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({ 'success': False, 'statusCode': 400, 'message': 'BadRequest', 'data': {} }), 400

    try:
        image = Image.open(BytesIO(file.read())).convert('RGB')
        image_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)

        metadata_response = genai_client.models.generate_content(
            model=EnvironmentConfig.aistudio_model,
            contents=[EnvironmentConfig.aistudio_prompt, image]
        )
        metadata_text = metadata_response.text or '{}'
        if metadata_text.startswith('```json') and metadata_text.endswith('```'):
            metadata_text = metadata_text[7:-3]
        metadata = json.loads(metadata_text)

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
