import React, { useState, useEffect } from "react";

function ScrollProtocolTable({ theme = "dark" }) {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "scrollTvl",
    direction: "descending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const protocolsPerPage = 10;

  useEffect(() => {
    fetch("https://api.llama.fi/protocols")
      .then((response) => response.json())
      .then((data) => {
        const scrollProtocols = data
          .filter(
            (p) =>
              p.chains.includes("Scroll") && p.chainTvls && p.chainTvls.Scroll
          )
          .map((p) => ({
            ...p,
            scrollTvl: p.chainTvls.Scroll,
            change_1d: p.change_1d || 0,
            change_7d: p.change_7d || 0,
            change_1m: p.change_30d || 0,
          }));
        setProtocols(scrollProtocols);
        setLoading(false);
        console.log(scrollProtocols);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const sortedProtocols = [...protocols].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setProtocols(sortedProtocols);
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastProtocol = currentPage * protocolsPerPage;
  const indexOfFirstProtocol = indexOfLastProtocol - protocolsPerPage;
  const currentProtocols = protocols.slice(
    indexOfFirstProtocol,
    indexOfLastProtocol
  );
  const totalPages = Math.ceil(protocols.length / protocolsPerPage);

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
                onClick={() => requestSort("scrollTvl")}
              >
                TVL on Scroll
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
            {currentProtocols.map((protocol, index) => (
              <tr key={protocol.id}>
                <td>{indexOfFirstProtocol + index + 1}</td>
                <td>
                  <a
                    href={protocol.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline"
                  >
                    <img
                      src={protocol.logo}
                      alt={protocol.name}
                      className="w-6 h-6 mr-2"
                    />
                    <span>{protocol.name}</span>
                  </a>
                </td>
                <td>${(protocol.scrollTvl / 1e6).toFixed(2)}m</td>
                <td
                  className={
                    protocol.change_1d > 0 ? "text-success" : "text-error"
                  }
                >
                  {protocol.change_1d.toFixed(2)}%
                </td>
                <td
                  className={
                    protocol.change_7d > 0 ? "text-success" : "text-error"
                  }
                >
                  {protocol.change_7d.toFixed(2)}%
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

export default ScrollProtocolTable;
