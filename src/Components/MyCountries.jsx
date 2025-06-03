import { useState } from "react";
import toast from "react-hot-toast";
import Countries from "./Countries";

const MyCountries = ({ savedCountries, setSavedCountries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 15;

  //function to remove country
  const removeCountry = (country) => {
    const updatedSavedCountries = savedCountries.filter(
      (savedCountry) => savedCountry.code !== country.code
    );
    setSavedCountries(updatedSavedCountries);
    localStorage.setItem(
      "savedCountries",
      JSON.stringify(updatedSavedCountries)
    );

    toast.success(`${country.name} has been removed!`, {
      duration: 3000,
      position: "top-right",
    });
  };

  const reversedCountries = [...savedCountries].reverse();

  //pagination indexes
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = reversedCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  //pagination buttons
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const totalPages = Math.ceil(savedCountries.length / countriesPerPage);

  return (
    <div>
      <h3 className="text-4xl font-bold mb-8">Saved Countries:</h3>
      <div className="">
        {savedCountries.length === 0 ? (
          <p>No saved countries yet!</p>
        ) : (
          <Countries
            countries={currentCountries}
            changeCountriesList={removeCountry}
            button={"-"}
          />
        )}
      </div>

      {savedCountries.length > countriesPerPage && (
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-white text-black text-lg rounded-lg px-2 mr-4 cursor-pointer hover:scale-110 ease-in-out duration-150"
          >
            {"<"}
          </button>
          <span className="text-lg font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-white text-black text-lg rounded-lg px-2 ml-4 cursor-pointer hover:scale-110 ease-in-out duration-150"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCountries;
