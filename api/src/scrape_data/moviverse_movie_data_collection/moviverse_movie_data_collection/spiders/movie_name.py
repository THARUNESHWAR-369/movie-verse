import scrapy
import csv

from .urls import get_list_year

import os

os.chdir("../")
os.chdir("../")
os.chdir("../")
#os.chdir("../")

class MovieNameSpider(scrapy.Spider):
    name = "movie_name"
    allowed_domains = ["en.wikipedia.org"]
    start_urls = get_list_year()
    
    print(start_urls)
    isRowWrite = False
    
    def parse(self, response):
        year = response.url.split("_")[-1]
        language = response.url.split("_")[-4]
        print(year, language)
        
        tables = response.xpath('//table[contains(@class, "wikitable")]')

        with open("src/artifacts/movie_names_en.csv", 'a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            
            if not self.isRowWrite:
                writer.writerow(['Title', 'Release Date', 'Language'])
                self.isRowWrite = not self.isRowWrite
            
            for table in tables:
                # Extract table rows
                rows = table.xpath('.//tr')

                for row in rows:
                    # Extract data from the first table cell
                    first_cell = row.xpath('.//td[1]//text()').get()
                    
                    if first_cell != None and str(first_cell) not in [str(num) for num in range(0, 150)]:                    
                        if first_cell:
                            writer.writerow([first_cell, year, language])   