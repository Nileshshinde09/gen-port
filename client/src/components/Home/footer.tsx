import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { TextHoverEffect } from "../ui/text-hover-effect";

const Footer = () => {
  return (
    <footer className="w-full h-fit ">
      <div className="md:h-[30rem] h-[25rem] relative w-full ">
        <Separator className="w-full mb-10" />

        <div className="absolute z-40 w-full max-w-7xl left-1/2 -translate-x-1/2  flex max-sm:flex-col max-sm:gap-5 max-sm:p-10 justify-between">
          <div>
            <p className="text-xl font-thin text-white mb-3">GenPort.</p>
            <p className="text-sm text-muted-foreground">
              Effortlessly Build a Portfolio That Shines
            </p>
            <p className="text-sm text-muted-foreground">
              No coding wizardly required. Just pure, unadultreated artistry.
            </p>
          </div>
          <div className="gap-3 flex flex-col">
            <div className="flex gap-10 font-thin">
              <Link to="/">
                <p className="text-base text-muted-foreground hover:cursor-pointer">
                  Home
                </p>
              </Link>
              <Link to={"#"}>
                <p className="text-base text-muted-foreground hover:cursor-pointer">
                  About
                </p>
              </Link>
              <Link to={"#"}>
                <p className="text-base text-muted-foreground hover:cursor-pointer">
                  Contact Us
                </p>
              </Link>
            </div>
            <div className="flex gap-10 font-thin">
              <Link to={"#"}>
                <p className="text-base text-muted-foreground hover:cursor-pointer">
                  Twitter
                </p>
              </Link>
            </div>
            <div className="flex gap-10 font-thin">
              <Link to={"#"}>
                <p className="text-base text-muted-foreground hover:cursor-pointer">
                  Instagram
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-fit -mb-[7rem]">
          <TextHoverEffect text="GENPORT." />
        </div>
        <p className="absolute bottom-2 text-sm text-muted-foreground text-center w-full">
          © {new Date().getFullYear()} GenPort. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
