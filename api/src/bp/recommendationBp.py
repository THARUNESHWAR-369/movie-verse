
from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin

import os

from src.config.config import app_version
from src.movieutils.models.recommendation_model import RecommendationModel

import pandas as pd


RecommendationBp = Blueprint('recommendation_bp', __name__, url_prefix=f'/api/{app_version}/recommendation-bp-details')
cors = CORS(RecommendationBp)

@RecommendationBp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*" 
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Origin"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


@RecommendationBp.route("/getRecommendation",methods=['POST', "GET"])
@cross_origin()
def getRecommendationDetails():
    movie_id = request.json['movie_id']
    return RecommendationModel(movie_id).toJson()

