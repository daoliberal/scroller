import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <section className="align-element py-10">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default Home;
