import DefaultPortfolios from "@/www/app/default";
import { useEffect, useState } from "react";
import { SiVercel } from "react-icons/si";
import { useParams, useSearchParams } from "react-router-dom";
import meta from "@/registry";
import { Button } from "@/components/ui/button";
import { Portfolio as PortfolioService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
const Portfolio = () => {
  const navigate = useNavigate();
  const {  id } = useParams();
  const [searchParams] = useSearchParams();
  const [metaData, setMetaData] = useState<{ "id": string,"version":string, "style":string }>();
  const { toast } = useToast();
  useEffect(() => {
    if (!id) return;
    setMetaData(meta["portfolios"][id]);
  }, []);


  const handleAddPortfolio = async (isDeployed:boolean=false) => { 
    if(!metaData) return;
    const response = await PortfolioService.createPortfolio({portfolioId:metaData?.id,isDeployed});
    if(isDeployed){
      if(response?.status === 201){
        toast({
          title: "Deployable Portfolio created successfully",
          description: "Deployable Portfolio created successfully",
        });

        navigate(`/docs/${response?.data?.data?.portfolio?._id}`);
      }
      if(response?.status !== 201){
          toast({
            title: "Deployable Portfolio creation failed",
            description: "DeployablePortfolio creation failed",
          });
      }
    }
    if(!isDeployed){
      if(response?.status === 201){
        toast({
          title: "Portfolio created successfully",
          description: "Portfolio created successfully",
        });
      } 
      if(response?.status !== 201){
        toast({
          title: "Portfolio creation failed",
          description: "Portfolio creation failed",
        });
      }
    }

  };

  const demoValue = searchParams.get("demo");
  if (demoValue === "true" && id && DefaultPortfolios[id]) {
    const Component = DefaultPortfolios[id][1];
    return (
      <div className="w-full h-full relative">
        {metaData && (
          <div
            className="fixed flex flex-col gap-5 mt-20 absolute z-[9999]">
            <Button
              onClick={()=>handleAddPortfolio(true)}
              variant={"ghost"}
              className=" flex justify-end items-center pr-5  w-32 h-12 border-border border bg-neutral-950 rounded-r-full"
            >
              <span className="mr-3">Deploy</span>{" "}
              <SiVercel size={25} className="cursor-pointer" />
            </Button>
            <Button
              onClick={()=>handleAddPortfolio(false)}
              variant={"ghost"}
              className=" flex justify-end items-center pr-5 w-fit px-5 h-12 border-border border bg-neutral-950 rounded-r-full"
            >
              <span className="mr-3">Add Portfolio</span>{" "}
              <SiVercel size={25} className="cursor-pointer" />
            </Button>
          </div>
        )}
        <Component />
      </div>
    );
  }
  return null;
};

export default Portfolio
