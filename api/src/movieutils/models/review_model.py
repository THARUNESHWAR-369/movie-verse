import os
import requests
import json
import re

from src.utils.status_code import *

import pickle

from nltk.tokenize.toktok import ToktokTokenizer
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

import numpy as np

class DataCleaning:
    
    replace_list = {r"i'm": 'i am',
                r"'re": ' are',
                r"let's": 'let us',
                r"'s":  ' is',
                r"'ve": ' have',
                r"can't": 'can not',
                r"cannot": 'can not',
                r"don't" : 'do not',
                r"n't": ' not',
                r"'d": ' would',
                r"'ll": ' will',
                r"=" : ' ',
                r'<br />': ' ',
                r"\.+" : '.',
                r'\!+': ' ',
                r'\?+': ' ',
                r'\s+': ' '
                }
    
    _map = {
        1:"Positive",
        2:"Negative"
    }
    
    #Tokenization of text
    tokenizer=ToktokTokenizer()
    
    #Setting English stopwords
    stopword_list=stopwords.words('english')
    
    def convert_normal_form(self, text : str) -> str:
        for i in self.replace_list:
            text = text.replace(i,self.replace_list[i])
        return text
    
    # Remove special characters
    def remove_special_characters(self, text : str) -> str:
        pattern=r'[^a-zA-z0-9\s]'
        text=re.sub(pattern,'',text)
        return text
    
    # Stemming
    def stemmer(self, text : str) -> str:
        ps=PorterStemmer()
        text= ' '.join([ps.stem(word) for word in text.split()])
        return text
    
    # Removing the stopwords
    def remove_stopwords(self, text : str) -> str:
        tokens = self.tokenizer.tokenize(text)
        tokens = [token.strip() for token in tokens]
        filtered_tokens = [token for token in tokens if token.lower() not in self.stopword_list]
        filtered_text = ' '.join(filtered_tokens)    
        return filtered_text
    
    def denoise_text(self, text : str) -> str:
        text = self.convert_normal_form(text)
        text = self.remove_special_characters(text)
        text = self.stemmer(text)
        text = self.remove_stopwords(text)
        return text

class ReviewModel(DataCleaning):
    """
    Class for retrieving cast details for a movie using the TMDB API.
    """

    __MOVIE_REVIEW_DETAILS_URL : str = os.environ.get('TMDB_REVIEW_URL')
    __SENTIMENT_ANALYZER_MODEL : str = "src/artifacts/models/sentiment_analyzer_lr.pkl"
    __SENTIMENT_ANALYZER_VECTORIZER_MODEL : str = "src/artifacts/models/sentiment_analyzer_vectorizer.pkl"
    
    __REQUEST_TIMEOUT : int = 10

    def __init__(self, movie_id: int) -> None:
        """
        Initializes an instance of the ReviewModel class.

        Args:
            movie_id (int): The ID of the movie.
        """
        self.movie_id = movie_id
        
    def __load_model(self) -> list:
        return [pickle.load(open(self.__SENTIMENT_ANALYZER_MODEL, 'rb')), pickle.load(open(self.__SENTIMENT_ANALYZER_VECTORIZER_MODEL, 'rb'))]
    
    def __predict(self, text : str) -> str:
        __SA_LR_MODEL, __SA_VECTORIZER_MODEL = self.__load_model()
        return str(__SA_LR_MODEL.predict(__SA_VECTORIZER_MODEL.transform(np.array([self.denoise_text(text)])))[0])
    
    def __response(self) -> json:
        """
        Sends a request to the TMDB API to retrieve movie review details.

        Returns:
            json: The response from the API as JSON.
        """
        response = requests.get(self.__MOVIE_REVIEW_DETAILS_URL.format(self.movie_id), headers={
            "accept": "application/json",
            "Authorization": "Bearer " + os.environ.get('TMDB_HEADER')
        }, timeout=self.__REQUEST_TIMEOUT)
        return response.json() if response.status_code == SUCCESSFUL_RESPONSE else {"error": True}

    def to_json(self) -> json:
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
                
                res['sentiment'] = self.__predict(text = res['content'])     
            
            return data

        return {"status": False}

if __name__ == "__main__":
    review_model = ReviewModel(movie_id=19995)
    review_model.to_json()