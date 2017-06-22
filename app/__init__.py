from flask import Flask
from flask_mongoengine import MongoEngine
from config import config

db = MongoEngine()

def create_app(config_name):
    app = Flask(__name__)

    app.config['MONGODB_DB'] = 'python'
    app.config['MONGODB_HOST'] = 'localhost'
    app.config['MONGODB_PORT'] = 27017
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)


    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    return app