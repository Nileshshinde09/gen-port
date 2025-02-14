import DefaultPortfolios from "@/www/app/default";
import { useEffect, useState } from "react";
import { SiVercel } from "react-icons/si";
import { useParams, useSearchParams } from "react-router-dom";
import meta from "@/registry";
import { Button } from "@/components/ui/button";
const Portfolio = () => {
  const { username, id } = useParams();
  const [searchParams] = useSearchParams();
  const [metaData, setMetaData] = useState();
  useEffect(() => {
    if (!id) return;
    setMetaData(meta["portfolios"]["Portfolio01"]);
  }, []);

  const handleDeploy = () => {};
  const handleAddPortfolio = () => {};

  const demoValue = searchParams.get("demo");
  if (demoValue === "true" && id && DefaultPortfolios[id]) {
    const Component = DefaultPortfolios[id][1];
    return (
      <div className="w-full h-full relative">
        {metaData && (
          <div
          className="fixed flex flex-col gap-5 mt-20">
            <Button
              onClick={handleDeploy}
              variant={"ghost"}
              className=" flex justify-end items-center pr-5 z-[9999] w-32 h-12 border-border border bg-neutral-950 rounded-r-full"
            >
              <span className="mr-3">Deploy</span>{" "}
              <SiVercel size={25} className="cursor-pointer" />
            </Button>
            <Button
              onClick={handleAddPortfolio}
              variant={"ghost"}
              className=" flex justify-end items-center pr-5 z-[9999] w-fit px-5 h-12 border-border border bg-neutral-950 rounded-r-full"
            >
              <span className="mr-3">Add Portfolio</span>{" "}
              <SiVercel size={25} className="cursor-pointer" />
            </Button>
          </div>
        )}
        <Component />;
      </div>
    );
  }
  return null;
};

export default Portfolio;
