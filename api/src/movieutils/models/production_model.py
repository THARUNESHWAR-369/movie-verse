import os
import requests
import json

from src.utils.status_code import *

class ProductionModel:
    """
    Class for retrieving cast details for a movie using the TMDB API.
    """

    __PRODUCTION_DETAILS_URL = os.environ.get('TMDB_PRODUCTION_DETAILS_URL')

    def __init__(self, movie_id: int) -> None:
        """
        Initializes an instance of the ProductionModel class.

        Args:
            movie_id (int): The ID of the movie.
        """
        self.movie_id = movie_id

    def __response(self) -> json:
        """
        Sends a request to the TMDB API to retrieve production details.

        Returns:
            json: The response from the API as JSON.
        """
        
        response = requests.get(self.__PRODUCTION_DETAILS_URL % f"{self.movie_id}", headers={
            "accept": "application/json",
            "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
        })
        return response.json() if response.status_code == SUCCESSFUL_RESPONSE else {"error": True}

    def toJson(self) -> json:
        """
        Retrieves production details and formats the response as JSON.

        Returns:
            json: The production details formatted as JSON.
        """
        __response = self.__response()
        

        if 'error' not in __response:
            data = {"results": {"production_companies":[], "production_countries":[]}}

            for i in __response['production_companies']:
                if i['logo_path'] != None:
                    i['logo_path'] = os.environ.get('TMDB_POSTER_URL') +  i['logo_path']
                data['results']['production_companies'].append(i)

            data['results']['production_countries'] = __response['production_countries']

            return data

        return {"status": False}
