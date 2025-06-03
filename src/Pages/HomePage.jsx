import { useState, useEffect } from "react";
import MyCountries from "../Components/myCountries";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import Countries from "../Components/Countries";

const HomePage = () => {
  const [countries, setCountries] = useState(null);
  const [numCountries, setNumCountries] = useState(5);
  const [savedCountries, setSavedCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //function to fetch countries from API
  const fetchCountries = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`?limit=${numCountries}`);

      if (response.data?.data) {
        setCountries(response.data.data);
      } else {
        setError("Unexpected response format.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          setError("You have made too many requests. Please try again later.");
          toast.error(
            "Rate limit exceeded. Please wait a moment before retrying."
          );
        } else {
          setError(`Failed to fetch countries: ${error.response.status}`);
        }
      } else if (error.request) {
        setError("Failed to fetch countries: No response from server.");
      } else {
        setError("Failed to fetch countries: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveCountry = (country) => {
    //if the country exists, show a toast message and return early
    const countryExists = savedCountries.some(
      (savedCountry) => savedCountry.code === country.code
    );

    if (countryExists) {
      toast.error(`${country.name} already on list!`, {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    //adding new country to saved countries
    const updatedSavedCountries = [...savedCountries, country];
    setSavedCountries(updatedSavedCountries);
    localStorage.setItem(
      "savedCountries",
      JSON.stringify(updatedSavedCountries)
    );

    //removing country that has been added from fetched list
    const updatedCountries = countries.filter(
      (fetchedCountry) => fetchedCountry.code !== country.code
    );
    setCountries(updatedCountries);

    toast.success(`${country.name} has been saved!`, {
      duration: 3000,
      position: "top-right",
    });
  };

  //getting countries from localStorage
  useEffect(() => {
    const storedCountries =
      JSON.parse(localStorage.getItem("savedCountries")) || [];
    setSavedCountries(storedCountries);
  }, []);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col mt-16 p-6 sm:p-12">
        <div className="flex flex-col justify-center items-center mb-4">
          <div className="bg-white text-black px-4 py-2 rounded-lg mb-4">
            <h2 className="text-3xl font-bold mb-4">How it works?</h2>
            <p className="mb-4">
              "To fetch countries, set the number of desired countries and click
              the button below. Save your favorite countries by clicking the
              <strong> +</strong> symbol , or remove unwanted ones by clicking
              the <strong>-</strong> symbol.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="btn-primary"
              onClick={fetchCountries}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin text-white size-6" />
              ) : (
                "Fetch countries"
              )}
            </button>

            <select
              value={numCountries}
              onChange={(e) => setNumCountries(Number(e.target.value))}
              className="btn-secondary"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} Countries
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-xl font-semibold mx-auto">{error}</p>
        )}

        <div>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : countries?.length > 0 ? (
            <Countries
              countries={countries}
              changeCountriesList={saveCountry}
              button={"+"}
            />
          ) : (
            <p className="text-center text-2xl font-bold italic">
              Click the button to fetch the countries.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-16 p-6 sm:p-12">
        <MyCountries
          savedCountries={savedCountries}
          setSavedCountries={setSavedCountries}
        />
      </div>
    </div>
  );
};

export default HomePage;
