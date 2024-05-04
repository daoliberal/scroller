import React, { useState } from "react";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ projects }) => {
  const [visibleProjects, setVisibleProjects] = useState(9);

  const handleShowMore = () => {
    setVisibleProjects((prevCount) => prevCount + 9);
  };

  return (
    <section className="py-20 align-element">
      <div className="py-16 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.slice(0, visibleProjects).map((item, index) => {
          return <ProjectItem key={index} {...item} />;
        })}
      </div>
      {visibleProjects < projects.length && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectList;
