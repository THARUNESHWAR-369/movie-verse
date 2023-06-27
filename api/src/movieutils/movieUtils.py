
import json
import os
import requests


class MovieUtils:

    __url = "https://api.themoviedb.org/3/movie/popular"
    __TopRatedUrl = "https://api.themoviedb.org/3/movie/top_rated"
    __NowPlayingMovieUrl = "https://api.themoviedb.org/3/movie/now_playing"
    __MovieReviewUrl = "https://api.themoviedb.org/3/movie/385687/reviews"
    __UpcomingMovieUrl = "https://api.themoviedb.org/3/movie/upcoming"
    

    def getPopularMovies(self) -> json:
        response = requests.get(self.__url, headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        return {"status":False} if response.status_code != 200 else {'status':True, "data": response.json()}


    def getTopRatedMovies(self) -> json:
        response = requests.get(self.__TopRatedUrl, headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        return {"status":False} if response.status_code != 200 else {'status':True, "data": response.json()}
    
    def getNowPlayingMovies(self) -> json:
        response = requests.get(self.__NowPlayingMovieUrl, headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        return {"status":False} if response.status_code != 200 else {'status':True, "data": response.json()}
    
    def getUpComingMovies(self) -> json:
        response = requests.get(self.__UpcomingMovieUrl, headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        return {"status":False} if response.status_code != 200 else {'status':True, "data": response.json()}
    
    
    def getMovieGenre(self, genre_id : int) :
        data = {
            28: 'Action',
            12: 'Adventure',
            16: 'Animation',
            35: 'Comedy',
            80: 'Crime',
            99: 'Documentary',
            18: 'Drama',
            10751: 'Family',
            14: 'Fantasy',
            36: 'History',
            27: 'Horror',
            10402: 'Music',
            9648: 'Mystery',
            10749: 'Romance',
            878: 'Science Fiction',
            10770: 'TV Movie',
            53: 'Thriller',
            10752: 'War',
            37: 'Western'
        }
        return data[int(genre_id)]
    
    def getMovieReviews(self, movie_id : int): 
        response = requests.get(self.__MovieReviewUrl, headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        return {"status":False} if response.status_code != 200 else {'status':True, "data": response.json()}


