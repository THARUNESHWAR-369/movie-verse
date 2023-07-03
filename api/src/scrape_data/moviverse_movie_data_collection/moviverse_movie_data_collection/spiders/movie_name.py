import scrapy
import csv

import os

os.chdir("../")
os.chdir("../")
os.chdir("../")
os.chdir("../")

class MovieNameSpider(scrapy.Spider):
    name = "movie_name"
    allowed_domains = ["en.wikipedia.org"]
    start_urls = open(r"src\scrape_data\moviverse_movie_data_collection\moviverse_movie_data_collection\spiders\urls.txt", 'r').readlines()
    
    print(start_urls)
    
    def parse(self, response):
        tables = response.xpath('//table[contains(@class, "wikitable")]')

        with open("src/artifacts/movie_names_en.csv", 'a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            
            writer.writerow(['Title'])
            
            for table in tables:
                # Extract table rows
                rows = table.xpath('.//tr')

                for row in rows:
                    # Extract data from the first table cell
                    first_cell = row.xpath('.//td[1]//text()').get()

                    if first_cell:
                        # Write the extracted data to the CSV file
                        writer.writerow([first_cell])    
