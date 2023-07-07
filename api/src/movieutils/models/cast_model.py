import os
import requests
import json

from src.utils.status_code import *

class CastModel:
    """
    Class for retrieving cast details for a movie using the TMDB API.
    """

    __CAST_DETAILS_URL = os.environ.get('TMDB_CAST_DETAILS_URL')

    def __init__(self, movie_id: int, max_no: int = 5) -> None:
        """
        Initializes an instance of the CAST_MODEL class.

        Args:
            movie_id (int): The ID of the movie.
            max_no (int, optional): The maximum number of cast members to retrieve. Defaults to 5.
        """
        self.movie_id = movie_id
        self.max_no = max_no

    def __response(self) -> json:
        """
        Sends a request to the TMDB API to retrieve cast details.

        Returns:
            json: The response from the API as JSON.
        """
        response = requests.get(self.__CAST_DETAILS_URL.format(self.movie_id), headers={
            "accept": "application/json",
            "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
        })
        return response.json() if response.status_code == SUCCESSFUL_RESPONSE else {"error": True}

    def toJson(self) -> json:
        """
        Retrieves cast details and formats the response as JSON.

        Returns:
            json: The cast details formatted as JSON.
        """
        __response = self.__response()

        if 'error' not in __response:
            data = {"results": []}

            for i in range(self.max_no):
                try:
                    if __response['cast'][i]['profile_path'] != None:
                        __response['cast'][i]['profile_path'] = os.environ.get('TMDB_POSTER_URL') + __response['cast'][i]['profile_path']
                        data['results'].append(__response['cast'][i])
                except:pass

            return data

        return {"status": False}
