from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin

import os

from src.config.config import app_version
from src.movieutils.movieUtils import MovieUtils

import pandas as pd

print(app_version)

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
    print("In Popular movies")
    __popularMovies = movieUtils.getPopularMovies()
    if __popularMovies['status']:
        return {'status' : __popularMovies['status'], "results" : __popularMovies['data']['results']}
    else:
        return __popularMovies

@HomeBp.route("/getTopRatedMovies",methods=['POST', "GET"])
@cross_origin()
def getTopRatedMovies():
    print("In Top Rated Movies")
    __topRatedMovies = movieUtils.getTopRatedMovies()
    if __topRatedMovies['status']:
        return {'status' : __topRatedMovies['status'], "results" : __topRatedMovies['data']['results']}
    else:
        return __topRatedMovies
    
@HomeBp.route("/getUpComingMovies",methods=['POST', "GET"])
@cross_origin()
def getUpComingMovies():
    print("In upcoming Movies")
    __upComingMovies = movieUtils.getUpComingMovies()
    if __upComingMovies['status']:
        return {'status' : __upComingMovies['status'], "results" : __upComingMovies['data']['results']}
    else:
        return __upComingMovies

@HomeBp.route("/nowPlaying",methods=['POST', "GET"])
@cross_origin()
def getNowPlayingMovies():
    print("Now Playing Movies")
    __nowPlayingMovies = movieUtils.getNowPlayingMovies()
    if __nowPlayingMovies['status']:    
        return jsonify(__nowPlayingMovies)
    else:
        return __nowPlayingMovies

@HomeBp.route("/getMovieReview",methods=['POST', "GET"])
@cross_origin()
def getMovieReview():
    movie_id = request.json['movie_id']
    __movieReview = movieUtils.getMovieReviews(movie_id)
    return jsonify(__movieReview)

@HomeBp.route("/getMovieGenre",methods=['POST', "GET"])
@cross_origin()
def getMovieGenre():
    movie_genre_list = request.json['movie_genre'] if type(request.json['movie_genre']) == list else [request.json['movie_genre']]
    print("movie_genre_list: ",movie_genre_list)
    return movieUtils._getMovieGenre(movie_genre_list)

@HomeBp.route("/getMovieNameList",methods=['POST', "GET"])
@cross_origin()
def getMovieNameList():
    print(os.getcwd())
    print(os.listdir("/opt/render/project/src/api/src"))
    df = pd.read_csv("src/artifacts/movie_names_preprocessed_en.csv")
    return df['Title'].tolist()

