import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Portfolio as PortfolioService } from "@/services";
import {
  DefaultPortfolio01,
  DefaultPortfolio02,
  DefaultPortfolio03,
  DefaultPortfolio04,
  DefaultPortfolio05,
  DefaultPortfolio06,
  DefaultPortfolio07,
} from "@/www/app/default";

const Preview = () => {
  const { _id } = useParams();
  const [portfolioId, setPortfolioId] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  useEffect(() => {
    (async () => {
      if (!_id) return;
      const response = await PortfolioService.getPortfolioPreview(_id);
      if (response.status === 200) {
        if(response.data.data.portfolio.portfolioId)
        setPortfolioId(response.data.data.portfolio.portfolioId);
        setPortfolio(response.data.data.portfolio)
      }
    })();
  }, [_id]);
  
    if (portfolioId === "default-portfolio-01"){
      return (
        <div className="w-full h-full relative">
          <DefaultPortfolio01 portfolio={portfolio}/>
        </div>
      );
  } else if (portfolioId === "default-portfolio-02") {
    return (
      <div className="w-full h-full relative">
        <DefaultPortfolio02 portfolio={portfolio}/>
      </div>
    );
  } else if (portfolioId === "default-portfolio-03") {
    return (
      <div className="w-full h-full relative">
        <DefaultPortfolio03 portfolio={portfolio}/>
      </div>
    );
  } else if (portfolioId === "default-portfolio-04") {
    return (
      <div className="w-full h-full relative">
        <DefaultPortfolio04 portfolio={portfolio}/>
      </div>
    );
  } else if (portfolioId === "default-portfolio-05") {
    return (
      <div className="w-full h-full relative">
        <DefaultPortfolio05 portfolio={portfolio}/>
      </div>
    );
  } else if (portfolioId === "default-portfolio-06") {
    return (
      <div className="w-full h-full relative">
        <DefaultPortfolio06 portfolio={portfolio}/>
      </div>
    );
  } else if (portfolioId === "default-portfolio-07") {
    return (
      <div className="w-full h-full relative">
        <DefaultPortfolio07 portfolio={portfolio}/>
      </div>
    );
  }
};

export default Preview;
