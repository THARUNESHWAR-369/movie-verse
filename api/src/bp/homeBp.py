from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin

import os

from src.config.config import app_version
from src.movieutils.movieUtils import MovieUtils

import pandas as pd


HomeBp = Blueprint('home_bp', __name__, url_prefix=f'/api/{app_version}/home-bp-details')
cors = CORS(HomeBp)

@HomeBp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*" 
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Origin"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

movieUtils = MovieUtils()

@HomeBp.route("/getPopularMovies",methods=['POST', "GET"])
@cross_origin()
def getPopularMovies():
    __popularMovies = movieUtils.getPopularMovies()
    if __popularMovies['status']:
        return {'status' : __popularMovies['status'], "results" : __popularMovies['data']['results']}
    else:
        return __popularMovies

@HomeBp.route("/getTopRatedMovies",methods=['POST', "GET"])
@cross_origin()
def getTopRatedMovies():
    __topRatedMovies = movieUtils.getTopRatedMovies()
    if __topRatedMovies['status']:
        return {'status' : __topRatedMovies['status'], "results" : __topRatedMovies['data']['results']}
    else:
        return __topRatedMovies
    
@HomeBp.route("/getUpComingMovies",methods=['POST', "GET"])
@cross_origin()
def getUpComingMovies():
    __upComingMovies = movieUtils.getUpComingMovies()
    if __upComingMovies['status']:
        return {'status' : __upComingMovies['status'], "results" : __upComingMovies['data']['results']}
    else:
        return __upComingMovies

@HomeBp.route("/nowPlaying",methods=['POST', "GET"])
@cross_origin()
def getNowPlayingMovies():
    __nowPlayingMovies = movieUtils.getNowPlayingMovies()
    if __nowPlayingMovies['status']:    
        return jsonify(__nowPlayingMovies)
    else:
        return __nowPlayingMovies

@HomeBp.route("/getMovieNameList",methods=['POST', "GET"])
@cross_origin()
def getMovieNameList():
    df = pd.read_csv("src/artifacts/dataset/movie_names_preprocessed_en.csv")
    return df['Title'].tolist()


