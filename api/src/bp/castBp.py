
from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin

import os

from src.config.config import app_version
from src.movieutils.models.cast_model import CAST_MODEL

import pandas as pd


CastBp = Blueprint('cast_bp', __name__, url_prefix=f'/api/{app_version}/cast-bp-details')
cors = CORS(CastBp)

@CastBp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*" 
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Origin"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


@CastBp.route("/getCastDetails",methods=['POST', "GET"])
@cross_origin()
def getCastDetails():
    movie_id = request.json['movie_id']
    return CAST_MODEL(movie_id, 10).toJson()

