/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

export const ProductionSection = ({ movieId }) => {
  const [productionDetails, setProductionDetails] = useState(null);
  const [productionCountryDetails, setProductionCountryDetails] =
    useState(null);

  useEffect(() => {
    const fetchProductionCompanyDetails = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_SERVICE_GET_PRODUCTION_DETAILS_URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ movie_id: movieId }),
          }
        );
        if (response.ok) {
          const productionDetailsJson = await response.json();
  
          // Handle the movie reviews data
          //console.log(productionDetailsJson);
          setProductionDetails(
            productionDetailsJson["results"]["production_companies"]
          );
          setProductionCountryDetails(
            productionDetailsJson["results"]["production_countries"]
          );
        }
      } catch (e) {
        // setLoading(false);
      }
    };
    fetchProductionCompanyDetails();
  }, []);

  

  return (
    <div className="flex flex-col gap-3">
      <div className="tracking-wider">
        <h3 className="text-4xl font-bold ">Production Company</h3>
        <div className="content">
          <ul className="flex flex-row gap-2 pt-2 flex-wrap">
            {productionDetails &&
              productionDetails.map((productionDetail, index) => (
                <li
                  key={index}
                  className="text-white flex text-center items-center align-middle cursor-pointer border-2 w-fit p-[0.2rem] px-[0.9rem] rounded-[5rem] border-white hover:backdrop-blur-lg hover:bg-white hover:bg-opacity-40"
                >
                  {productionDetail.name}
                </li>
              ))}
          </ul>

        </div>
      </div>
      <div className="tracking-wider">
        <h3 className="text-4xl font-bold ">Production Country</h3>
        <div className="content">
       

          <ul className="flex flex-row gap-2 pt-2 flex-wrap">
            {productionCountryDetails &&
              productionCountryDetails.map((productionCountryDetail, index) => (
                <li
                  key={index}
                  className="text-white flex text-center items-center align-middle cursor-pointer border-2 w-fit p-[0.2rem] px-[0.9rem] rounded-[5rem] border-white hover:backdrop-blur-lg hover:bg-white hover:bg-opacity-40"
                >
                  {productionCountryDetail.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
