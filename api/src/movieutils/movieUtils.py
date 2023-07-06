
import json
import os
import requests

from datetime import datetime
from dateutil.relativedelta import relativedelta


class MovieUtils:

    __url = "https://api.themoviedb.org/3/movie/popular"
    __TopRatedUrl = "https://api.themoviedb.org/3/trending/movie/day"
    __NowPlayingMovieUrl = "https://api.themoviedb.org/3/movie/now_playing"
    __MovieReviewUrl = "https://api.themoviedb.org/3/movie/{}/reviews"
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
                        if result['release_date'] > currDate and result['poster_path'] != None:
                            result['vote_average'] = round(result['vote_average'], 1)
                            data['results'].append(result)

        return {"status":False} if response.status_code != 200 else {'status':True, "data":data}
    
    
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
        response = requests.get(self.__MovieReviewUrl.format(movie_id), headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        return {"status":False} if response.status_code != 200 else {'status':True, "data": response.json()}
    
    def _getMovieGenre(self, lst):
        movie_genre = []
        print(lst, type(lst))
        if type(lst) == int:
            movie_genre.append(self.getMovieGenre(lst))
        else:
            for genre_ids in lst:
                movie_genre.append(self.getMovieGenre(genre_ids))
        return movie_genre
    
    def getMovieDetails(self, movie_name):
        
        def formateGenres(genreDict):
            genres = []
            for genre in genreDict:
                genres.append(genre['name'])
            return genres
        
        response = requests.get(self.__GetMovieDetailsUrl.format(movie_name), headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )    
        
        allResponse = requests.get(self.__GetMovieDetailsAllUrl.format(response.json()['results'][0]['id']), headers={
                "accept": "application/json",
                "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
            }
        )
        allResponseJson = allResponse.json()
     
        allResponseJson['genres'] = formateGenres(allResponseJson['genres'])
        allResponseJson['vote_average'] = round(allResponseJson['vote_average'], 1)

                
        return {"status":False} if response.status_code != 200 else {'status':True, "data": allResponseJson}



