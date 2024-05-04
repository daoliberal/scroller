import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleDown, FaAngleUp, FaScroll } from "react-icons/fa";

const Test = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.growthepie.xyz/v1/chains/blockspace/scroll.json"
        );

        const dataAll = response.data.overview.max;
        console.log(dataAll);
        const combinedArray = [
          ...flattenData(dataAll.cross_chain.contracts.data),
          ...flattenData(dataAll.defi.contracts.data),
          ...flattenData(dataAll.nft.contracts.data),
          ...flattenData(dataAll.social.contracts.data),
          ...flattenData(dataAll.token_transfers.contracts.data),
          ...flattenData(dataAll.utility.contracts.data),
          ...flattenData(dataAll.unlabeled.contracts.data),
        ];

        setCombinedData(combinedArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const flattenData = (dataArray) => {
    return dataArray.map((item) => ({
      address: item[0],
      contractName: item[1],
      category: item[3],
      subcategory: item[4],
      gasFees: item[7],
    }));
  };

  const sortByGasFees = () => {
    if (sortBy === "asc") {
      setCombinedData([...combinedData.sort((a, b) => a.gasFees - b.gasFees)]);
      setSortBy("desc");
    } else {
      setCombinedData([...combinedData.sort((a, b) => b.gasFees - a.gasFees)]);
      setSortBy("asc");
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visibleData = combinedData.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    sortByGasFees();
  }, []);
  return (
    <div className="pt-5">
      <h1 className="text-3xl font-bold mb-9 flex justify-center">
        Active Contracts
      </h1>
      <div className="overflow-x-auto">
        <table className="table border shadow-md rounded-lg overflow-hidden border-spacing-2">
          <thead className="align-center secondary-content">
            <tr>
              <th className=" px-8 py-2  justify-content align-center secondary-content">
                CONTRACT OWNER
              </th>
              <th className=" px-8 py-2  justify-content align-center secondary-content">
                CATEGORIES
              </th>
              <th className=" px-8 py-2  justify-content align-center secondary-content">
                SUBCATEGORIES
              </th>
              <th
                className="flex justify-content align-center px-4 py-2 primary-content cursor-pointer"
                onClick={sortByGasFees}
              >
                GAS FEE {sortBy === "asc" ? <FaAngleDown /> : <FaAngleUp />}
              </th>
              <th className=" px-8 py-2 justify-content align-center secondary-content">
                CONTRACTS
              </th>
            </tr>
          </thead>
          <tbody className="secondary-content">
            {visibleData.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "secondary-content" : " secondary-content"
                }
              >
                <td className="px-4 py-3 secondary-content">
                  {item.contractName ? item.contractName : "unlabeled"}
                </td>
                <td className="px-4 py-3 primary-content">
                  {" "}
                  {item.category
                    .split("_")
                    .map((word) => word.toUpperCase())
                    .join(" ")}
                </td>
                <td className="px-4 py-3 primary-content">
                  {item.subcategory
                    .split("_")
                    .map((word) => word.toUpperCase())
                    .join(" ")}
                </td>
                <td className="px-4 py-3 primary-content">
                  $
                  {item.gasFees.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="px-4 py-3 primary-content flex items-center justify-center">
                  <a
                    href={`https://scrollscan.com/address/${item.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaScroll />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join mt-4 flex justify-center rounded-lg">
        <button
          className="join-item btn btn-outline"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={handleNextPage}
          disabled={visibleData.length < itemsPerPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Test;
