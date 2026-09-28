import os
from dotenv import load_dotenv

load_dotenv()

class EnvironmentConfig:
    node_env = os.getenv('NODE_ENV', 'development')
    port = int(os.getenv('PORT', 8000))
    allowed_origins = [
        origin.strip()
        for origin in os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173').split(',')
        if origin.strip()
    ]
    aistudio_api_key = os.getenv('AISTUDIO_API_KEY')
    aistudio_model = os.getenv('AISTUDIO_MODEL')
    aistudio_prompt = """
    You are a sustainability and waste management expert. Don't return null/undefined, force return some value (for metrics), except you don't know. Analyze the main object in the provided image. Respond only with a JSON formatted object:
    {
        "metrics": {
            "estimated_decomposition_time": "[string (in years (decimal if <1))]",
            "estimated_co2_emissions": "[string (in kg CO₂e)]",
            "estimated_water_footprint": "[string (in L)]",
            "estimated_energy_embodied": "[string (in MJ)]"
        },
        "properties": {
            "is_organic": [boolean],
            "is_recyclable": [boolean],
            "is_compostable": [boolean],
            "is_hazardous": [boolean]
        }
    }
    """
