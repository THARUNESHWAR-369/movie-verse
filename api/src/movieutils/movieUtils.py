
import json
import os
import requests

from datetime import datetime
from dateutil.relativedelta import relativedelta


class MovieUtils:

    __url = "https://api.themoviedb.org/3/movie/popular"
    __TopRatedUrl = "https://api.themoviedb.org/3/trending/movie/day"
    __NowPlayingMovieUrl = "https://api.themoviedb.org/3/movie/now_playing"
    __UpcomingMovieUrl = "https://api.themoviedb.org/3/movie/upcoming?page={}"
    __GetMovieDetailsUrl = "https://api.themoviedb.org/3/search/movie?query={}"
    __GetMovieDetailsAllUrl = "https://api.themoviedb.org/3/movie/{}"
    
    def getPopularMovies(self) -> json:
        response = requests.get(self.__url, headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        return {"status":False} if response.status_code != 200 else {'status':True, "data": response.json()}

    def getTopRatedMovies(self) -> json:
        date = datetime.now()
        currDate = date.strftime("%Y-%m-%d")
        
        previous_month = date - relativedelta(months=1)
        minimum_date = previous_month.replace(day=1).strftime("%Y-%m-%d")            
    
        response = requests.get(self.__TopRatedUrl, headers={
                    "accept": "application/json",
                    "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
                    }
                )
        
        data = {"results" : []}
        
        if response.status_code == 200:
            resp = response.json()
        
            for result in resp['results']:
                if (result['release_date'] > minimum_date and result['release_date'] < currDate) and result['poster_path'] != None:
                    result['vote_average'] = round(result['vote_average'], 1)
                    data['results'].append(result)
                    
        data['results'] = sorted(data['results'], key=lambda x: x['vote_average'], reverse=True)
        
        return {"status":False} if response.status_code != 200 else {'status':True, "data": data}
    
    def getNowPlayingMovies(self) -> json:
        date = datetime.now()
        currDate = date.strftime("%Y-%m-%d")
        
        previous_month = date - relativedelta(months=1)
        minimum_date = previous_month.replace(day=1).strftime("%Y-%m-%d")            
    
        response = requests.get(self.__NowPlayingMovieUrl, headers={
                    "accept": "application/json",
                    "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
                    }
                )
        
        data = {"results" : []}
        
        if response.status_code == 200:
            resp = response.json()
        
            for result in resp['results']:
                if (result['release_date'] > minimum_date and result['release_date'] < currDate) and result['poster_path'] != None:
                    result['vote_average'] = round(result['vote_average'], 1)
                    data['results'].append(result)

            data['results'] = sorted(data['results'], key=lambda x: x['vote_average'], reverse=False)

        return {"status":False} if response.status_code != 200 else {'status':True, "data": data}
    
    def getUpComingMovies(self) -> json:
        
        date = datetime.now()
        currDate = date.strftime("%Y-%m-%d")
        
        def get(pg_no=1):
            return requests.get(self.__UpcomingMovieUrl.format(pg_no), headers={
                    "accept": "application/json",
                    "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
                    }
                )
        
        response = get()
        
        data = {"results" : []}
        
        if response.status_code == 200:
            resp = response.json()
            totalPages = resp['total_pages']
                        
            for tp in range(totalPages):
                _response = get(tp)
                __response = _response.json()
                
                if _response.status_code == 200:
        
                    for result in __response['results']:
                        if 'release_date' in result:
                            if result['release_date'] > currDate and result['poster_path'] != None:
                                result['vote_average'] = round(result['vote_average'], 1)
                                data['results'].append(result)

        return {"status":False} if response.status_code != 200 else {'status':True, "data":data}
    


   
      
