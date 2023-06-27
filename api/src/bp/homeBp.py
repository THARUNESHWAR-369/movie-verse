from flask import Blueprint, request
from flask_cors import CORS, cross_origin

import os

from src.config.config import app_version
from src.movieutils.movieUtils import MovieUtils

print(app_version)

HomeBp = Blueprint('home_bp', __name__, url_prefix=f'/api/{app_version}/home-bp-details')
cors = CORS(HomeBp)

@HomeBp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*" # <- You can change "*" for a domain for example "http://localhost"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Origin"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@HomeBp.route("/getPopularMovies",methods=['POST', "GET"])
@cross_origin()
def getPopularMovies():
    print("In Popular movies")
    __popularMovies = MovieUtils().getPopularMovies()
    if __popularMovies['status']:
        return {'status' : __popularMovies['status'], "results" : __popularMovies['data']['results']}
    else:
        return __popularMovies

@HomeBp.route("/getTopRatedMovies",methods=['POST', "GET"])
@cross_origin()
def getTopRatedMovies():
    print("In Top Rated Movies")
    __topRatedMovies = MovieUtils().getTopRatedMovies()
    if __topRatedMovies['status']:
        return {'status' : __topRatedMovies['status'], "results" : __topRatedMovies['data']['results']}
    else:
        return __topRatedMovies

@HomeBp.route("/nowPlaying",methods=['POST', "GET"])
@cross_origin()
def getNowPlayingMovies():
    print("Now Playing Movies")
    __nowPlayingMovies = MovieUtils().getNowPlayingMovies()
    print(__nowPlayingMovies)
    if __nowPlayingMovies['status']:
        return {'status' : __nowPlayingMovies['status'], "results" : __nowPlayingMovies['data']['results']}
    else:
        return __nowPlayingMovies
