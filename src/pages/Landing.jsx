import ActiveTx from "../Charts/ActiveUsers";
import Blockspace from "../Charts/Blockspace";
import Charts from "../Charts/Charts";
import ScrollProtocolTable from "../Charts/Protocols";
import DexVolumeTable from "../Charts/Volume";
import { Hero } from "../components";
import CardButton from "../components/Card";

const Landing = () => {
  // add featured projects component
  // add active marketing campaigns component
  return (
    <>
      <div className="flex justify-center text-center mt-20">
        <div>
          <div className="max-w-md">
            <h1 className="text-5xl font-bold font-mono">Scroll Map</h1>
            <p className="py-6 font-mono">
              Step into the forefront of blockchain innovation with Scroll's
              ecosystem
            </p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Charts />
      </div>
      {/*       <div className="mt-40">
        <Hero />
      </div> */}
      <div className="mt-20">
        <ScrollProtocolTable />
        {/* <DexVolumeTable /> */}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-40 gap-5 mb-40 ">
        <CardButton
          title="Documentation"
          description="Learn more about zero knowledge proofs, zkEVMs, and the future of scaling Ethereum."
          link="https://docs.scroll.io/en/home/"
        />
        <CardButton
          title="Join Discord"
          description="Connect with like-minded individuals and share your ideas and experiences."
          link="https://discord.gg/HrBhsBFp"
        />
        <CardButton
          title="Architecture"
          description="An overview of Scroll’s overall architecture."
          link="https://scroll.io/blog/architecture"
        />
      </div>
    </>
  );
};

export default Landing;
