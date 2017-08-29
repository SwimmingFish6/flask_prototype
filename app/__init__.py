from flask import Flask
from flask_mongoengine import MongoEngine
from config import config
from flask_cors import CORS

db = MongoEngine()

def create_app(config_name):
    app = Flask(__name__)

    CORS(app)

    app.config['MONGODB_DB'] = 'health_care'
    app.config['MONGODB_HOST'] = 'localhost'
    app.config['MONGODB_PORT'] = 27017
    # app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
    app.config['SECRET_KEY'] = 'when the boys around here do not listen to the betals'
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)


    from .main import main
    app.register_blueprint(main)
    return app