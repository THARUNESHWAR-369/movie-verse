
import json
import os
import requests


class MovieUtils:

    __url = "https://api.themoviedb.org/3/movie/popular"
    __TopRatedUrl = "https://api.themoviedb.org/3/movie/top_rated"
    __NowPlayingMovieUrl = "https://api.themoviedb.org/3/movie/now_playing"
    

    def getPopularMovies(self) -> json:
        response = requests.get(self.__url, headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        print(response.json())
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
    
