import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContract from "../components/SingleContract";
import { FaScroll } from "react-icons/fa";

function Contracts() {
  // Define state to store the fetched data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define a useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define a function to fetch the data
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint to retrieve scroll blockchain daily transactions data
        const response = await axios.get(
          "https://api.growthepie.xyz/v1/contracts.json"
        );

        const scrollContracts = response.data.filter(
          (entry) => entry.origin_key === "scroll"
        );

        const numScrollContracts = scrollContracts.length - 1;
        setData(numScrollContracts);

        // Update the state with the fetched data

        setLoading(false);
      } catch (error) {
        // Handle any errors that occur during fetching
        setError(error);
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Render loading state while data is being fetched
  if (loading) {
    return (
      <div>
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  // Render error message if an error occurs
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render the chart
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 pt-9 ">
      {/* First item: Data */}
      <div className="flex flex-col items-center justify-center text-center ">
        <h1 className="text-6xl font-bold text-neutral-content font-mono">
          {data}
        </h1>
      </div>

      {/* Second item: Descriptions */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex text-1xl text-neutral-content">
          <span className="font-mono">Active Contracts</span>
          <FaScroll />
        </div>
      </div>
    </div>
  );
}

export default Contracts;
