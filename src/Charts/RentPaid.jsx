import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDollarSign } from "react-icons/fa";

function RentPaid() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.growthepie.xyz/v1/fundamentals_full.json"
        );

        const scrollData = response.data.filter(
          (entry) =>
            entry.metric_key === "rent_paid_usd" &&
            entry.origin_key === "scroll"
        );

        const sumPaidRent = scrollData.reduce((total, entry) => {
          return total + parseFloat(entry.value);
        }, 0);

        const formattedValue =
          (sumPaidRent / 1000000).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + "m";

        setData(formattedValue);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full rounded-lg p-6">
      <h1 className="text-xl font-light mb-4 text-center text-neutral-content font-mono">
        Rent Paid to Ethereum
      </h1>
      <div className="flex items-center  px-6 py-3 ">
        <h1 className="text-6xl font-bold text-neutral-content font-mono">
          {data}
        </h1>
        <FaDollarSign className="w-15 h-10 ml-2 text-neutral-content" />
      </div>
    </div>
  );
}

export default RentPaid;
