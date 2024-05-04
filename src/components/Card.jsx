import React from "react";

const CardButton = ({ title, description, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block shadow-md rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 border border-solid h-60"
    >
      <div>
        <h2 className="text-xl font-semibold mb-2 font-mono">{title}</h2>
        <p className=" font-mono">{description}</p>
      </div>
    </a>
  );
};

export default CardButton;
