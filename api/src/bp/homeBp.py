from flask import Blueprint, jsonify
from flask_cors import CORS, cross_origin

from src.config.config import app_version
from src.movieutils.models.movie_home_model import MovieHomeModel

HomeBp = Blueprint('home_bp', __name__, url_prefix=f'/api/{app_version}/home-bp-details')
cors = CORS(HomeBp)

@HomeBp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*" 
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Origin"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

movie_home_model = MovieHomeModel()
@HomeBp.route("/getPopularMovies", methods=['POST', "GET"])
@cross_origin()
def get_popular_movies_list():
    """
    Retrieves a list of popular movies.

    Returns:
        dict: A dictionary containing the status and results of the request.
    """
    __popularMovies = movie_home_model.get_movie_list(type_='popular_movie', sort_by_vote="release_date")
    return __popularMovies


@HomeBp.route("/getTopRatedMovies", methods=['POST', "GET"])
@cross_origin()
def get_trending_movies_list():
    """
    Retrieves a list of top-rated movies.

    Returns:
        dict: A dictionary containing the status and results of the request.
    """
    __topRatedMovies = movie_home_model.get_movie_list(type_='trending_movie', sort_by_vote="vote_average")
    print(__topRatedMovies)
    return __topRatedMovies


@HomeBp.route("/getUpComingMovies", methods=['POST', "GET"])
@cross_origin()
def get_upcoming_movies_list():
    """
    Retrieves a list of upcoming movies.

    Returns:
        dict: A dictionary containing the status and results of the request.
    """
    __upComingMovies = movie_home_model.get_movie_list(type_='upcoming_movie', sort_by_vote="vote_average")
    return __upComingMovies


@HomeBp.route("/nowPlaying", methods=['POST', "GET"])
@cross_origin()
def get_now_playing_movies_list():
    """
    Retrieves a list of now playing movies.

    Returns:
        dict: A dictionary containing the status and results of the request.
    """
    __nowPlayingMovies = movie_home_model.get_movie_list(type_='now_playing_movie', sort_by_vote='release_date')
   # print(__nowPlayingMovies)
    return __nowPlayingMovies


@HomeBp.route("/getMovieNameList", methods=['POST', "GET"])
@cross_origin()
def get_movies_name_list():
    """
    Retrieves the list of movie names.

    Returns:
        list: The list of movie names.
    """
    return movie_home_model.get_movie_name_list()
