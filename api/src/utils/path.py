
import os

from dataclasses import dataclass

@dataclass
class Paths():
    config_path : str = os.path.join("src/config", 'config.yaml')
    movie_dataset_path : str = os.path.join("src/artifacts", 'movie_names_en.csv')
    
