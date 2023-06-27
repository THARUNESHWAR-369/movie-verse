
import yaml
import os

from src.utils.path import Paths

paths = Paths()

with open(paths.config_path, "r") as config_file:
    config_file_content = yaml.safe_load(config_file)
    

movie_recommendation = config_file_content["movie_recommendation"]
app_version = config_file_content["version"]["version"]

print(app_version)

