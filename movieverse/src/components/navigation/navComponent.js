import React, { useState, useEffect, useRef } from "react";

export const NavComponent = () => {
  const [movieNameList, setMovieNameList] = useState([]);
  const [expandSearchResult, setExpandSearchResult] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  let menuRef = useRef();

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
        process.env.REACT_APP_API_SERVICE_GET_MOVIE_NAME_LIST_URL
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
    setSelectedMovie(movie);
    setSearchKey(movie);
    setExpandSearchResult(false);
  };

  const filteredMovies = movieNameList.filter((movie) =>
    movie.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <div className="nav w-full p-1 flex align-middle justify-between items-center pt-8">
      <div className="appName pl-10">
        <a href="/" className="myAppName text-4xl">
          MOVIE VERSE
        </a>
      </div>
      <div className="search-bar pr-10" ref={menuRef}>
        <input
          placeholder="Search"
          className="search-bar-input border-none outline-none rounded-[50px] pl-[13px] p-[0.35rem] w-[20rem] backdrop-blur-md tracking-wider font-semibold text-white"
          onClick={() => {
            setExpandSearchResult(!expandSearchResult);
          }}
          onChange={handleSearchInputChange}
          value={selectedMovie}
        ></input>
        <span className="relative right-[30px] cursor-pointer text-white hover:text-red-600">
          <i className="fa fa-search"></i>
        </span>
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
  );
};
