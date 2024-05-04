import React, { useState } from "react";
import ProjectList from "../components/ProjectList";
import Categories from "../components/Categories";
import projectsdata from "../Projectdata";

const tempCategories = projectsdata.map((project) => project.category);
const tempSet = new Set(tempCategories);
const Allcategories = ["All", ...tempSet];

const Projects = () => {
  const [projectItems, setProjectItems] = useState(projectsdata);
  const [categories, setCategory] = useState(Allcategories);

  const filterItems = (category) => {
    if (category === "All") {
      setProjectItems(projectsdata);
      return;
    }
    const newItems = projectsdata.filter(
      (project) => project.category === category
    );
    setProjectItems(newItems);
  };
  return (
    <main>
      <section>
        <div className=" ">
          <div>
            <div className="max-w-md pt-20">
              <h1 className="text-5xl font-bold">Projects</h1>
              <p className="py-6">
                Empowering developers and users with efficiency and reliability.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-20">
          <Categories categories={categories} filterItems={filterItems} />
        </div>
        <ProjectList projects={projectItems} />
      </section>
    </main>
  );
};

export default Projects;
