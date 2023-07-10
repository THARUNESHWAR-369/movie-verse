
from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin

import os

from src.config.config import app_version
from src.movieutils.models.production_model import ProductionModel

import pandas as pd


ProductionBp = Blueprint('production_bp', __name__, url_prefix=f'/api/{app_version}/production-bp-details')
cors = CORS(ProductionBp)

@ProductionBp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*" 
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Origin"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


@ProductionBp.route("/getProductionDetails",methods=['POST', "GET"])
@cross_origin()
def getProductionCompanyDetails():
    movie_id = request.json['movie_id']
    print(movie_id)
    return ProductionModel(movie_id).toJson()

