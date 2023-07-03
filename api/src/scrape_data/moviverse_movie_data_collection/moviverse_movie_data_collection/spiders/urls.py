


start_limit = 50

end_limit = 23

i = start_limit

year = "1950"

while i != end_limit + 1:
    if i >= start_limit:
        year = "19{:02d}".format(i)
    else:
        year = "20{:02d}".format(i)
    with open('urls.txt', 'a') as f:
        f.write(f"https://en.wikipedia.org/wiki/List_of_American_films_of_{year}" + '\n')
    
    if i == 99:
        i = 0
    else:i+=1
        
        
f.close()