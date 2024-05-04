const Categories = ({ categories, filterItems }) => {
  return (
    <div className="flex justify-center">
      {categories.map((category) => {
        return (
          <button
            key={category}
            onClick={() => filterItems(category)}
            className="btn btn-outline btn-sm m-1"
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
