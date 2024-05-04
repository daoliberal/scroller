import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { FaDollarSign } from "react-icons/fa";

function RentPaid() {
  // Define state to store the fetched data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastValue, setLastValue] = useState(null);

  // Define a useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define a function to fetch the data
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint to retrieve scroll blockchain daily transactions data
        const response = await axios.get(
          "https://api.growthepie.xyz/v1/fundamentals_full.json"
        );

        // Extract the relevant data for Scroll blockchain daily transactions
        const scrollData = response.data.filter(
          (entry) =>
            entry.metric_key === "rent_paid_usd" &&
            entry.origin_key === "scroll"
        );
        //console.log(scrollData);

        const sumPaidRent = scrollData.reduce((total, entry) => {
          return total + parseFloat(entry.value);
        }, 0);
        //console.log(scrollData[1037].value);

        const formattedValue =
          (sumPaidRent / 1000000).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + "m";

        // Update the state with the fetched data
        setData(formattedValue);
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

  // Prepare data for the chart

  {
    /* 
  Multi
  line
  comment

  const chartData = {
    options: {
      chart: {
        id: "scroll-chart",
        type: "line",

        toolbar: {
          show: false, // Hide the toolbar including the x-axis tooltip
        },
      },

      stroke: {
        curve: "smooth",
        width: 3,
      },

      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: false,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: "dark",
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: true,
          format: "dd MMM yyyy",
          formatter: undefined,
        },
        y: {
          formatter: function (value) {
            // Format value to include commas for thousands separators
            return (
              "$ " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
          },
        },
        marker: {
          show: false,
        },
      },
      grid: {
        show: false,
        label: false,
      },
    },

    series: [
      {
        name: "",
        data: data.map((entry) => [
          new Date(entry.date).getTime(),
          entry.value,
        ]),
        color: "#EB656F",
      },
    ],
  };
  */
  }

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
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-light mt-4 mb-2 text-center text-neutral-content font-mono">
        Rent Paid to Ethereum
      </h1>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-neutral-content font-mono">
          {data}
        </h1>
        <FaDollarSign className="w-6 h-6 ml-2 text-neutral-content" />
      </div>
    </div>
  );
}

export default RentPaid;
