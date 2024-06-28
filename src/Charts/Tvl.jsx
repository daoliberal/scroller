import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

function DailyTransactions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastValue, setLastValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.llama.fi/v2/historicalChainTvl/scroll"
        );

        const scrollData = response.data;

        const lastEntry = scrollData[scrollData.length - 1];
        const formattedValue = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(lastEntry.tvl);
        setLastValue(formattedValue);

        setData(scrollData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    options: {
      chart: {
        id: "scroll-chart",
        type: "line",
        toolbar: {
          show: false,
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
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
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
          entry.date * 1000, // Convert seconds to milliseconds
          entry.tvl,
        ]),
        color: "#1d4ed8",
      },
    ],
  };

  if (loading) {
    return (
      <div>
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center ml-4 pt-2 mr-2">
        <h1 className="text-1xl font-mono font-bold primary-content">
          Total Value Locked
        </h1>
        <span className="text-1xl font-mono font-bold primary-content">
          {lastValue}
        </span>
      </div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={175}
      />
    </div>
  );
}

export default DailyTransactions;
