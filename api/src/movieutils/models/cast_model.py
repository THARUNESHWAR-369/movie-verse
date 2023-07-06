import os
import requests
import json

from src.utils.status_code import *


class CAST_MODEL:
    
    __CAST_DETAILS_URL = os.environ.get('TMDB_CAST_DETAILS_URL')
    
    def __init__(self, movie_id : int, max_no: int = 5) -> None:
        self.movie_id = movie_id
        self.max_no = max_no
        
    def __response(self) -> json:
        response = requests.get(self.__CAST_DETAILS_URL.format(self.movie_id), headers={
                    "accept": "application/json",
                    "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
                    }
                )     
        return response.json() if response.status_code == SUCCESSFUL_RESPONSE else {"error":True}

    def toJson(self) -> json:
        
        __response = self.__response()
        
        if 'error' not in __response:
            data = {"results":[]}
            
            for i in range(self.max_no):
                __response['cast'][i]['profile_path'] = os.environ.get('TMDB_POSTER_URL') + __response['cast'][i]['profile_path']
                data['results'].append(__response['cast'][i])
        
            return data
            
        return {"status":False} 