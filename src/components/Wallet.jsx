import React, { useState } from "react";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [analysisData, setAnalysisData] = useState(null);

  const handleAddressSubmit = async (address) => {
    try {
      const response = await fetch(
        `https://api.scrollscan.com/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken`
      );
      const data = await response.json();
      setAnalysisData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const AnalysisComponent = ({ data }) => (
    <div>
      <h2>Analysis Results</h2>
      <p>Total Transactions: {data.result.length}</p>
      <p>Contracts Interacted With:</p>
      <ul>
        {[...new Set(data.result.map((transaction) => transaction.to))].map(
          (contract, index) => (
            <li key={index}>{contract}</li>
          )
        )}
      </ul>
    </div>
  );

  return (
    <div>
      <h1>Wallet Analysis App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddressSubmit(walletAddress);
        }}
      >
        <label>
          Enter Wallet Address:
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {analysisData && <AnalysisComponent data={analysisData} />}
    </div>
  );
}

export default App;
