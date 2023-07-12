import os
import requests
import json

from src.utils.status_code import *

class ReviewModel:
    """
    Class for retrieving cast details for a movie using the TMDB API.
    """

    __MOVIE_REVIEW_DETAILS_URL = os.environ.get('TMDB_REVIEW_URL')

    def __init__(self, movie_id: int) -> None:
        """
        Initializes an instance of the ReviewModel class.

        Args:
            movie_id (int): The ID of the movie.
        """
        self.movie_id = movie_id

    def __response(self) -> json:
        """
        Sends a request to the TMDB API to retrieve movie review details.

        Returns:
            json: The response from the API as JSON.
        """
        
        response = requests.get(self.__MOVIE_REVIEW_DETAILS_URL.format(self.movie_id), headers={
            "accept": "application/json",
            "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
        })
        return response.json() if response.status_code == SUCCESSFUL_RESPONSE else {"error": True}

    def toJson(self) -> json:
        """
        Retrieves movie review details and formats the response as JSON.

        Returns:
            json: The movie review details formatted as JSON.
        """
        __response = self.__response()
        
        if 'error' not in __response:
            data = {"results" : []}
                
            for res in __response['results']:
                
                if res['author_details']['avatar_path'] != None and len(res['author_details']['avatar_path'].split("/")) == 2:
                    res['author_details']['avatar_path'] = os.environ.get("TMDB_POSTER_URL") + res['author_details']['avatar_path'] 
                
                if  res['author_details']['avatar_path'] != None and res['author_details']['avatar_path'][0] == '/':
                    res['author_details']['avatar_path'] =  res['author_details']['avatar_path'][1:]
            
                if res['author'] == None or res['author'] == "":
                    res['name'] = res['author_details']['name']
                    
                elif res['author_details']['name'] == None or res['author_details']['name'] == "":
                    res['name'] = res['author']
                else:
                    res['name'] = res['author']
                if res['author_details']['avatar_path'] != None: data['results'].append(res)       
            
            return data

        return {"status": False}
