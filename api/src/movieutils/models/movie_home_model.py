import os
import requests
import json

#from src.utils.status_code import *

from datetime import datetime, timedelta

from dotenv import load_dotenv
load_dotenv()

import pandas as pd

class MovieHomeModel:
    """
    Class for retrieving movie details for a movie using the TMDB API.
    """
    
    __REQUEST_TIMEOUT = 10
    
    __POPULAR_MOVIE_URL = os.environ.get('TMDB_POPULAR_MOVIE_URL')
    __TRENDING_MOVIE_URL = os.environ.get('TMDB_TRENDING_MOVIE_URL')
    __NOW_PLAYING_MOVIE_URL = os.environ.get('TMDB_NOW_PLAYING_MOVIE_URL')
    __UPCOMING_MOVIE_URL = os.environ.get('TMDB_UPCOMING_MOVIE_URL')
    
    __URL_MAP = {
        "popular_movie" : [__POPULAR_MOVIE_URL, False,],
        "trending_movie" : [__TRENDING_MOVIE_URL, False],
        "now_playing_movie" : [__NOW_PLAYING_MOVIE_URL, False],
        "upcoming_movie" : [__UPCOMING_MOVIE_URL, True]
    }

    __MOVIE_NAME_LIST = "src/artifacts/dataset/movie_names_preprocessed_en.csv"
    
    def __init__(self, max_page_no : int = 5) -> None:
        
        self.max_page_no : int = max_page_no
    
    def get_movie_name_list(self) -> list:
        """
        Retrieves the movie name list from a CSV file.

        Returns:
            list: A list of movie names.
        """
        return pd.read_csv(self.__MOVIE_NAME_LIST)['Title'].to_list()

    def __response(self, url : str, page_no : int = 1) -> json:
        """
        Sends a request to the TMDB API to retrieve movie details.

        Args:
            url (str): The URL for the API request.

        Returns:
            json: The response from the API as JSON.
        """
            
        response = requests.get(url.format(page_no), headers={
            "accept": "application/json",
            "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
        }, timeout=self.__REQUEST_TIMEOUT)
        
        return response.json() if response.status_code == 200 else {"error": True}

    def get_movie_list(self, type_ : str, sort_by_vote : str = 'popularity' ) -> json:
        
        """
        Retrieves a list of movies from the TMDB API.

        Args:
            type_ (str): The type of movie list to retrieve.
            sort_by_vote (bool, optional): Flag to indicate if the movie list should be sorted by vote average. Defaults to False.

        Returns:
            json: The movie list as JSON.
        """
        
        curDateTime = datetime.now()
        formattedDateTime = curDateTime.strftime("%Y-%m-%d")
        oneMonthAgo = curDateTime - timedelta(days=30)
        one_month = oneMonthAgo.strftime("%Y-%m-%d")
        
        if type_ in list(self.__URL_MAP.keys()):
            __URL, __NEW_MOVIE = self.__URL_MAP[type_]
        else:return {"status" : False}
        
        #print("*"*30)
        #print(sort_by_vote)
        #print(__URL)
        #print("*"*30)           
        __response = self.__response(__URL)
        
        if 'error' not in __response:
            data = {"results": []}
            
            for pageNo in range(1, self.max_page_no + 1):
                
                _response = self.__response(__URL, pageNo)

                for res in _response['results']:
                 
                    if res['poster_path'] != None and res['backdrop_path'] != None:
                        #print(os.environ.get('TMDB_POSTER_URL'), res['poster_path'])
                        res['poster_path'] = os.environ.get('TMDB_POSTER_URL') + res['poster_path']
                        res['backdrop_path'] = os.environ.get('TMDB_POSTER_URL') + res['backdrop_path']
                        
                        if __NEW_MOVIE:
                            if (res['release_date'] >= formattedDateTime):                 
                                data['results'].append(self.__toJson(res))
                        else:
                            if (res['release_date'] <= formattedDateTime) and (res['release_date'] >= one_month):                 
                                data['results'].append(self.__toJson(res))
                
            
            data['results'] = sorted(data['results'], key=lambda x : x[sort_by_vote], reverse=True)
            print(data)
            return data
                    
        return {"status" : False}
             
    def __toJson(self, res : dict) -> json:
        """
        Converts a dictionary to a JSON object with specific keys and values.

        Args:
            res (dict): The input dictionary.

        Returns:
            json: The JSON object with extracted keys and values.
        """
        return {
                    "id" : res['id'],
                    "original_title" : res['original_title'],
                    "poster_path" : res['poster_path'],
                    "release_date" : res['release_date'],
                    "vote_average" : res['vote_average'],
                    "title" : res['title'],
                    "popularity" : res['popularity'],
                    "genre_ids" : res['genre_ids'],
                    "backdrop_path" : res['backdrop_path']
                }

if __name__ == "__main__":
    movie_home_model = MovieHomeModel()
    print(movie_home_model.get_movie_list(type_="trending_movie", sort_by_vote='vote_average'))