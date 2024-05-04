import { Link } from "react-router-dom";

import img1 from "../../public/images/cover/1.png";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-1xl text-1xl font-bold tracking-tight sm:text-6xl font-mono">
          Unveiling Scroll's Ecosystem
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 font-mono">
          Join us as we uncover the opportunities, navigate the challenges and
          unlock the potential of Scroll's technology.
        </p>
        <div className="mt-10">
          <Link to="/projects" className="btn btn-primary font-mono">
            Explore Projects
          </Link>
        </div>
      </div>
      <div className=" h-[28rem] w-full ">
        <img
          src={img1}
          key={img1}
          alt="hero"
          className="rounded-box h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
