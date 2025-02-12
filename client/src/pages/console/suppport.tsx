import { FaGripfire } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
const Suppport = () => {
  return (
    <>
      <div className="h-full w-full">
        <div className="max-w-4xl mx-auto p-4 mt-20">
          <h1 className="relative h-20 z-10 text-lg md:text-7xl  text-white  text-center font-sans font-bold">
            Need Help? We're Here!
          </h1>
          <p className="text-neutral-300/70 max-w-2xl mx-auto my-2 text-sm text-center relative z-10">
            At Welcome to{" "}
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              Prep Next
            </span>{" "}
            Support, your go-to place for assistance with our food
            recommendation app. Whether you're facing technical issues, have
            questions about your recommendations, or need guidance on using our
            features, we're here to help. Our team is dedicated to ensuring a
            seamless experience, so feel free to reach out anytime.
          </p>
          <Link to="mailto:support@prepnext.com">
            <Button className="absolute left-1/2 -translate-x-1/2 z-10 mt-5 rounded-full py-0 ps-0 w-fit h-fit">
              <div className="m-1 flex aspect-square h-full p-2 rounded-full bg-black border border-border">
                <FaGripfire className="h-auto w-full text-white" size={30} />
              </div>
              support@prepnext.com
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Suppport;
