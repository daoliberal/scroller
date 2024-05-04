import React from "react";
import SingleContract from "../components/SingleContract";

const ContractList = ({ contracts }) => {
  return (
    <section className="py-20 align-element">
      <div className="py-16 grid md:grid-cols-2 xl:grid-cols-3 gap-8 ">
        {/* Map over the combinedData array and render table rows */}
        {contracts.map((nestedArray, index) => (
          <tr key={index}>
            {/* Map over the nestedArray and render table cells */}
            {nestedArray.map((item, nestedIndex) => (
              <td key={nestedIndex}>{item}</td>
            ))}
          </tr>
        ))}
      </div>
    </section>
  );
};

export default ContractList;
