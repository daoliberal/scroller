import Featured from "../components/Featured";
const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          A marketing
        </h1>
        <div className="stats bg-secondary shadow">
          <div className="stat">
            <div
              className="stat-title text-secondary-content text-4xl font-bold tracking-widest
          "
            >
              <h1>case study</h1>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Our mission is to empower developers and enthusiasts with actionable
        insights to enhance visibility, adoption and growth. We explore
        innovative marketing approaches and showcase successful campaigns to
        drive dapp success in today's competitive landscape.
      </p>
    </>
  );
};

export default About;
