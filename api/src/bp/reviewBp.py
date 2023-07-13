
from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin

import os

from src.config.config import app_version
from src.movieutils.models.review_model import ReviewModel

import pandas as pd


ReviewBp = Blueprint('review_bp', __name__, url_prefix=f'/api/{app_version}/review-bp-details')
cors = CORS(ReviewBp)

@ReviewBp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*" 
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Origin"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


@ReviewBp.route("/getReviewDetails",methods=['POST', "GET"])
@cross_origin()
def getReviewDetails():
    movie_id = request.json['movie_id']
    return ReviewModel(movie_id).to_json()

