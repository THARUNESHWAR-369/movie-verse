import os
import requests
import json

from src.utils.status_code import *
from src.movieutils.movieUtils import MovieUtils

class RecommendationModel:
    """
    Class for retrieving Recommendation details for a movie using the TMDB API.
    """

    __RECOMMENDATION_URL = os.environ.get('TMDB_RECOMMENDATION_URL')

    def __init__(self, movie_id: int, max_result : int = 10) -> None:
        """
        Initializes an instance of the RecommendationModel class.

        Args:
            movie_id (int): The ID of the movie.
        """
        self.movie_id : int = movie_id
        self.max_result : int = max_result  
        self.page_no : int = 1

    def __response(self) -> json:
        """
        Sends a request to the TMDB API to retrieve RecommendationModel details.

        Returns:
            json: The response from the API as JSON.
        """
        response = requests.get(self.__RECOMMENDATION_URL % (self.movie_id, self.page_no), headers={
            "accept": "application/json",
            "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
        })
        return response.json() if response.status_code == SUCCESSFUL_RESPONSE else {"error": True}

    def toJson(self) -> json:
        """
        Retrieves recommendation details and formats the response as JSON.

        Returns:
            json: The recommendation details formatted as JSON.
        """
        __response = self.__response()

        if 'error' not in __response:
            data = {"results": []}

            totalPage = __response['page']
            
            for pages in range(1, totalPage + 1):
                self.page_no = pages
                _response = self.__response() if 'error' not in self.__response() else None
                if _response is not None:
                    for res in _response['results']:
                        if res['poster_path'] != None:    
                            res['poster_path'] = os.environ.get("TMDB_POSTER_URL") + res['poster_path']
                            res['genres'] = MovieUtils()._getMovieGenre(res['genre_ids'])
                            del res['genre_ids']
                            data['results'].append(res)
                
           # data['results'] = sorted(data['results'], key=lambda x: x['release_date'], reverse=True)                
                
            return data

        return {"status": False}
