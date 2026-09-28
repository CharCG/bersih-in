from flask import Flask, jsonify
from flask_cors import CORS

from app.env import EnvironmentConfig
from app.routes import api

def create_app():
    application = Flask(__name__)
    CORS(application, origins=EnvironmentConfig.allowed_origins)
    application.register_blueprint(api, url_prefix='/api')

    @application.get('/health')
    def health():
        return jsonify({ 'status': 'healthy' })

    return application

app = create_app()

if __name__ == '__main__':
    app.run(
        debug=EnvironmentConfig.node_env == 'development',
        host='0.0.0.0',
        port=EnvironmentConfig.port
    )
