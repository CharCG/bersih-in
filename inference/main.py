from app import create_app
from app.config.env import EnvironmentConfig

app = create_app()

if __name__ == '__main__':
    app.run(
        debug=EnvironmentConfig.node_env == 'development',
        host='0.0.0.0',
        port=EnvironmentConfig.port
    )
