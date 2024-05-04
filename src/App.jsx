import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home, About, Projects, SingleProject, Error, Landing } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "case-study", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <SingleProject /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
