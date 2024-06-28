import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "home" },
  // { id: 2, url: "projects", text: "projects" },
  { id: 2, url: "case-study", text: "case study" },
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink to={url} className="capitalize font-mono">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
