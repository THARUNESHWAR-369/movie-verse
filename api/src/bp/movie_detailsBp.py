
from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin

import os

from src.config.config import app_version
from src.movieutils.models.movieDetails_model import MovieDetailModel

import pandas as pd


MovieDetailsBp = Blueprint('movie_details_bp', __name__, url_prefix=f'/api/{app_version}/movie-details-bp-details')
cors = CORS(MovieDetailsBp)

@MovieDetailsBp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*" 
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Origin"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@MovieDetailsBp.route("/getMovieDetails",methods=['POST', "GET"])
@cross_origin()
def getMovieDetails():
    movie_name = request.json['movie_name']
    return MovieDetailModel(movie_name=movie_name).toJson()


@MovieDetailsBp.route("/getMovieGenre",methods=['POST', "GET"])
@cross_origin()
def getMovieGenre():
    movie_genre_list = request.json['movie_genre'] if type(request.json['movie_genre']) == list else [request.json['movie_genre']]
    print(movie_genre_list)
    return MovieDetailModel(movie_name="")._getMovieGenre(movie_genre_list)