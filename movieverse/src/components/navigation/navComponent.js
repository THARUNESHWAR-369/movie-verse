import React, { useState, useEffect, useRef } from "react";
import config from '../../config/config'

export const NavComponent = ({ onMovieSelect }) => {
  const [movieNameList, setMovieNameList] = useState([]);
  const [expandSearchResult, setExpandSearchResult] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const [colorChange, setColorchange] = useState(false);

  let menuRef = useRef();

  console.log("process.env.REACT_APP_API_SERVICE_GET_MOVIE_NAME_LIST_URL: ",config.REACT_APP_API_SERVICE_GET_MOVIE_NAME_LIST_URL, config.REACT_APP_API_SERVICE_GET_MOVIE_DETAILS_URL);

  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setExpandSearchResult(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });


  useEffect(() => {
    fetchMovieListData();
  }, []);

  const fetchMovieListData = async () => {
    try {
      const response = await fetch(
        config.REACT_APP_API_SERVICE_GET_MOVIE_NAME_LIST_URL
      );
      const jsonData = await response.json();
      //setLoading(false);
      setMovieNameList(jsonData);
    } catch (error) {
      console.log("error fetching data: ", error);
      //setLoading(true);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchKey(inputValue);
    setSelectedMovie(inputValue);
    setExpandSearchResult(true);
  };

  const handleMovieClick = (movie) => {
    setExpandSearchResult(false);
    setSelectedMovie(movie);
    setSearchKey(movie);
    console.log(movie);
    onMovieSelect(movie);
  };

  const filteredMovies = movieNameList.filter((movie) =>
    movie.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <div className={colorChange ? "nav change-color " : "nav no-change-color"}>
      <div className="nav-container flex align-middle justify-between items-center w-[90%] m-auto py-4 px-0 z-10">
        <div className="appName">
          <a href="/" className="myAppName text-4xl">
            MOVIE VERSE
          </a>
        </div>
        <div className="search-bar" ref={menuRef}>
          <div className="search-bar-search-input p-[0.5rem] rounded-[2rem] flex justify-between  w-[20rem]">
            <input
              placeholder="Search movie"
              id="search-bar-input"
              autoComplete="off"
              className="search-bar-input tracking-wider font-semibold text-white pl-[10px] outline-none border-none  bg-transparent w-[17rem] truncate"
              onClick={() => {
                setExpandSearchResult(!expandSearchResult);
              }}
              onChange={handleSearchInputChange}
              value={selectedMovie}
            ></input>
            <span
              className="relative cursor-pointer p-[0.2rem] bg-gradient-to-r from-red-500 to-red-900 w-[30px] h-[30px] rounded-full flex justify-center items-center text-white"
              onClick={() => handleMovieClick(selectedMovie)}
            >
              <i className="fa fa-search"></i>
            </span>
          </div>
          <div
            className={`searchResult ${
              expandSearchResult
                ? "expandSearchResult-active"
                : "expandSearchResult-inactive"
            }`}
          >
            <ul className="divide-y-4 divide-gray-800/25">
              {filteredMovies.slice(0, 7).map((movie, index) => (
                <li
                  className="searchResult-li text-white cursor-pointer font-bold text-center tracking-[1px] p-[0.3rem] hover:opacity-75"
                  key={index}
                  onClick={() => handleMovieClick(movie)}
                >
                  {movie}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
