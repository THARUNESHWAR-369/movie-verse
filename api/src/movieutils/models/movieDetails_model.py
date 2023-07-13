import os
import requests
import json

from src.utils.status_code import *

class MovieDetailModel:
    """
    Class for retrieving cast details for a movie using the TMDB API.
    """

    __MOVIE_DETAILS_URL : str = os.environ.get('TMDB_MOVIE_DETAIL_URL')
    __MOVIE_DETAILS_ALL_URL : str = os.environ.get('TMDB_MOVIE_DETAIL_ALL_URL')
    __MOVIE_LANGUAGE_URL : str = os.environ.get('TMDB_MOVIE_LANGUAGE_URL')
    
    __REQUEST_TIMEOUT : int = 10
    

    def __init__(self, movie_name: id) -> None:
        """
        Initializes an instance of the MovieDetailModel class.

        Args:
            movie_name (str): The name of the movie.
        """
        self.movie_name = movie_name

    def __response(self) -> json:
        """
        Sends a request to the TMDB API to retrieve movie details.

        Returns:
            json: The response from the API as JSON.
        """
        
        response = requests.get(self.__MOVIE_DETAILS_URL.format(self.movie_name), headers={
            "accept": "application/json",
            "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
        })
        return response.json() if response.status_code == SUCCESSFUL_RESPONSE else {"error": True}

    def _getMovieGenre(self, lst : list) -> list:
        
        def getMovieGenre(genre_id : int) -> str:
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
        
        movie_genre = []
        if type(lst) == int:
            movie_genre.append(getMovieGenre(lst))
        else:
            for genre_ids in lst:
                movie_genre.append(getMovieGenre(genre_ids))
        return movie_genre
    
    def get_movie_language(self, code : str) -> str: 
             
        __language_response = requests.get(self.__MOVIE_LANGUAGE_URL, headers={
                 "accept": "application/json",
            "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
        },timeout=self.__REQUEST_TIMEOUT)
        
        if __language_response.status_code == SUCCESSFUL_RESPONSE:
            __language_response = __language_response.json()
            
            for codes in __language_response:
                if codes['iso_639_1'] == code:
                    return codes['english_name']
       
    def toJson(self) -> json:
        """
        Retrieves movie details and formats the response as JSON.

        Returns:
            json: The movie details formatted as JSON.
        """
        
        def formateGenres(genreDict):
            genres = []
            for genre in genreDict:
                genres.append(genre['name'])
            return genres
     
        __response = self.__response()

        
        if ('error' not in __response) or len(__response['results']) == 0:
            data = {"results" : []}
       
            
            allResponse = requests.get(self.__MOVIE_DETAILS_ALL_URL.format(__response['results'][0]['id']), headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
                },timeout=self.__REQUEST_TIMEOUT
            )
            allResponseJson = allResponse.json()
            
            try:
                allResponseJson['genres'] = formateGenres(allResponseJson['genres'])
                allResponseJson['vote_average'] = round(allResponseJson['vote_average'], 1)
                allResponseJson['original_language'] = self.get_movie_language(allResponseJson['original_language'])
                allResponseJson['poster_path'] = os.environ.get("TMDB_POSTER_URL") + allResponseJson['poster_path']
                allResponseJson['backdrop_path'] = os.environ.get("TMDB_POSTER_URL") + allResponseJson['backdrop_path']
                data['results'].append(allResponseJson)  
            except TypeError:pass
                
            return data
        
        return {"status": False}
