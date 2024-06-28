import React, { useState, useEffect } from "react";
import axios from "axios";

function DexVolumeTable({ theme = "dark" }) {
  const [dexes, setDexes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "volume",
    direction: "descending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const dexesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.llama.fi/overview/dexs/scroll?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        );
        setDexes(response.data.protocols);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sortedDexes = [...dexes].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setDexes(sortedDexes);
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastDex = currentPage * dexesPerPage;
  const indexOfFirstDex = indexOfLastDex - dexesPerPage;
  const currentDexes = dexes.slice(indexOfFirstDex, indexOfLastDex);
  const totalPages = Math.ceil(dexes.length / dexesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading)
    return <div className="loading loading-spinner loading-lg"></div>;
  if (error) return <div className="text-error">Error: {error}</div>;

  return (
    <div data-theme={theme}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th
                className="cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name
              </th>
              <th
                className="cursor-pointer"
                onClick={() => requestSort("volume")}
              >
                Volume
              </th>
              <th
                className="cursor-pointer"
                onClick={() => requestSort("change_1d")}
              >
                1d Change
              </th>
              <th
                className="cursor-pointer"
                onClick={() => requestSort("change_7d")}
              >
                7d Change
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDexes.map((dex, index) => (
              <tr key={dex.name}>
                <td>{indexOfFirstDex + index + 1}</td>
                <td>
                  <div className="flex items-center">
                    {dex.logo && (
                      <img
                        src={dex.logo}
                        alt={dex.name}
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    <span>{dex.name}</span>
                  </div>
                </td>
                <td>${dex.volume ? (dex.volume / 1e6).toFixed(2) : "N/A"}m</td>
                <td
                  className={dex.change_1d > 0 ? "text-success" : "text-error"}
                >
                  {dex.change_1d != null ? dex.change_1d.toFixed(2) : "N/A"}%
                </td>
                <td
                  className={dex.change_7d > 0 ? "text-success" : "text-error"}
                >
                  {dex.change_7d != null ? dex.change_7d.toFixed(2) : "N/A"}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className="btn btn-outline join-item"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="btn btn-outline join-item"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DexVolumeTable;
