from flask import Blueprint, request, jsonify
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

@HomeBp.route("/nowPlaying",methods=['POST', "GET"])
@cross_origin()
def getNowPlayingMovies():
    print("Now Playing Movies")
    __nowPlayingMovies = movieUtils.getNowPlayingMovies()
    if __nowPlayingMovies['status']:
        movie_genre = []
        for genre_ids in __nowPlayingMovies['data']['results'][0]['genre_ids']:
            movie_genre.append(movieUtils.getMovieGenre(genre_ids))
    
        return jsonify({
            "movie_title":__nowPlayingMovies['data']['results'][0]['original_title'],
            "movie_overview":__nowPlayingMovies['data']['results'][0]['overview'],
            "movie_release_date":__nowPlayingMovies['data']['results'][0]['release_date'],
            "movie_id":__nowPlayingMovies['data']['results'][0]['id'],
            "poster_url":os.environ.get('TMDB_POSTER_URL') + __nowPlayingMovies['data']['results'][0]['backdrop_path'],
            "rating" : __nowPlayingMovies['data']['results'][0]['vote_average'],
            "movie_genres" : movie_genre
        })
    else:
        return __nowPlayingMovies
