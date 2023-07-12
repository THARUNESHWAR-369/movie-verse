
from flask import Flask, jsonify
from flask_cors import CORS

from src.bp.homeBp import HomeBp
from src.bp.castBp import CastBp
from src.bp.productionBp import ProductionBp
from src.bp.recommendationBp import RecommendationBp
from src.bp.reviewBp import ReviewBp
from src.bp.movie_detailsBp import MovieDetailsBp

from src.utils.status_code import *

import os
from dotenv import load_dotenv
load_dotenv()

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_prefixed_env()

    CORS(app, origins=[i for i in os.getenv('ORIGINS').split(",")])

    if test_config is None:
        app.config.from_mapping(
            SECRECT_KEY = os.getenv('SECRET_KEY')
        )
    else:
        app.config.from_mapping(test_config)

    app.register_blueprint(HomeBp)
    app.register_blueprint(CastBp)
    app.register_blueprint(ProductionBp)
    app.register_blueprint(RecommendationBp)
    app.register_blueprint(ReviewBp)
    app.register_blueprint(MovieDetailsBp)

    @app.errorhandler(NOT_FOUND_RESPONSE)
    def handle_404(e):
        return jsonify({'error': 'Not found'}), NOT_FOUND_RESPONSE

    @app.errorhandler(SERVER_BUSY_RESPONSE)
    def handle_500(e):
        return jsonify({'error': 'Something went wrong, we are working on it'}), SERVER_BUSY_RESPONSE

    return app
