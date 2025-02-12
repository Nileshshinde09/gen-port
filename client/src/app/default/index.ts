import React from "react";
import DefaultPortfolio01 from "./Portfolio-01";
import DefaultPortfolio02 from "./Portfolio-02";
import DefaultPortfolio03 from "./Portfolio-03";
import DefaultPortfolio04 from "./Portfolio-04";
import DefaultPortfolio05 from "./Portfolio-05";
import DefaultPortfolio06 from "./Portfolio-06";
import DefaultPortfolio07 from "./Portfolio-07";

export {
  DefaultPortfolio01,
  DefaultPortfolio02,
  DefaultPortfolio03,
  DefaultPortfolio04,
  DefaultPortfolio05,
  DefaultPortfolio06,
  DefaultPortfolio07,
};

const DefaultPortfolios: { [key: string]: [string,React.ComponentType] } = {
  "Portfolio01": ["portfolio01",DefaultPortfolio01],
  "Portfolio02": ["portfolio02",DefaultPortfolio02],
  "Portfolio03": ["portfolio03",DefaultPortfolio03],
  "Portfolio04": ["portfolio04",DefaultPortfolio04],
  "Portfolio05": ["portfolio05",DefaultPortfolio05],
  "Portfolio06": ["portfolio06",DefaultPortfolio06],
  "Portfolio07": ["portfolio07",DefaultPortfolio07],
};

export default DefaultPortfolios;
