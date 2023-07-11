
import os

start_limit = 50

end_limit = 23

i = start_limit

year = "1950"

def get_list_year():

    global i, start_limit, end_limit, year

    yearData = []
    
    americanMovieUrl = []
    tamilMovieUrl = []
    hindiMovieUrl = []
    
    while i != end_limit + 1:
        if i >= start_limit:
            year = "19{:02d}".format(i)
        else:
            year = "20{:02d}".format(i)
            
        americanMovieUrl.append(f"https://en.wikipedia.org/wiki/List_of_American_films_of_{year}")
        tamilMovieUrl.append(f"https://en.wikipedia.org/wiki/List_of_Tamil_films_of_{year}")
        hindiMovieUrl.append(f"https://en.wikipedia.org/wiki/List_of_Hindi_films_of_{year}")            
        
        if i == 99:
            i = 0
        else:i+=1
    
    yearData.extend(americanMovieUrl)
    yearData.extend(tamilMovieUrl)
    yearData.extend(hindiMovieUrl)      
    
    return yearData  
            
    