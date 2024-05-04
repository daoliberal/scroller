import React, { useState } from "react";
import {
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaScroll,
  FaTelegram,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const ProjectItem = ({
  url,
  img,
  github,
  title,
  text,
  category,
  twitter,
  discord,
  contract,
  labels,
  telegram,
}) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText((prev) => !prev);
  };

  const truncatedText = text.slice(0, 100);
  const displayText = showFullText ? text : truncatedText + "...";

  return (
    <article className="glass rounded-lg shadow-md hover:shadow-xl duration-300">
      <div className="flex flex-col-1 items-center justify-center gap-10 mt-6 ">
        <div className="avatar">
          <img src={img} alt={title} className="max-h-14" />
        </div>
        <h2 className="text-2xl tracking-wide font-medium">{title}</h2>
      </div>
      <div className="capitalize p-8 rounded-lg">
        <p className="text-base">{displayText}</p>
        {text.length > 100 && (
          <button
            onClick={handleToggleText}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {showFullText ? "Show less" : "Show more"}
          </button>
        )}
        <div className="mt-6 flex gap-x-4">
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <TbWorldWww className="h-6 w-6 hover:text-black duration-300" />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="h-6 w-6 hover:text-black duration-300" />
            </a>
          )}
          {contract && (
            <a href={contract} target="_blank" rel="noopener noreferrer">
              <FaScroll className="h-6 w-6 hover:text-black duration-300" />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="h-6 w-6 hover:text-black duration-300" />
            </a>
          )}
          {discord && (
            <a href={discord} target="_blank" rel="noopener noreferrer">
              <FaDiscord className="h-6 w-6 hover:text-black duration-300" />
            </a>
          )}
          {telegram && (
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              <FaTelegram className="h-6 w-6 hover:text-black duration-300" />
            </a>
          )}
        </div>
        <div>
          <div className="flex justify-center mt-2">
            {labels.map(
              (label, index) =>
                label && (
                  <p key={index} className="badge badge-secondary mt-5 m-2">
                    {label}
                  </p>
                )
            )}
            {category && <p className="badge badge-primary mt-5">{category}</p>}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;
