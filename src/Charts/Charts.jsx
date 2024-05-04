import React from "react";
import ActiveUsers from "./ActiveUsers";
import ActiveAccounts from "./ActiveAccounts";
import Tvl from "./Tvl";
import Stables from "./Stables";
import Contracts from "./Contracts";
import RentPaid from "./RentPaid";
import OnChainProfit from "./OnChainProfit";

const Charts = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-350">
      <div>
        <div className="flex flex-col outline-border shadow-xl min-h-48 rounded-lg gap-4 ht-50 bg-gradient-to-r from-cyan-500 to-blue-500">
          <OnChainProfit />
        </div>
        <div className="flex flex-col bg-base-200 shadow-xl mt-5 rounded-lg gap-4 ">
          <ActiveUsers />
        </div>
      </div>

      <div className="flex flex-col ">
        <div className="flex-grow bg-base-200 shadow-xl rounded-lg gap-4">
          <Tvl />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5 items-center justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl rounded-lg min-h-48">
            <Contracts />
          </div>
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-xl rounded-lg min-h-48 ">
            <Stables />
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col shadow-xl rounded-lg gap-4 bg-gradient-to-r from-purple-500 to-pink-500 min-h-48 ">
          <RentPaid />
        </div>
        <div className="flex flex-col  mt-5 shadow-xl rounded-lg gap-4 ht-50">
          <ActiveAccounts />
        </div>
      </div>
    </div>
  );
};

export default Charts;
