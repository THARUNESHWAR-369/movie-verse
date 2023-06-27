
import os

from dataclasses import dataclass

@dataclass
class Paths():
    config_path : str = os.path.join("src/config", 'config.yaml')
    
 