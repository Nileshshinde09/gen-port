import DefaultPortfolios from "@/www/app/default";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { House, PanelsTopLeft } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Portfolio = ({
  portfolio_type,
}: {
  portfolio_type: "default" | "modifiable";
}) => {
  const navigate = useNavigate();
  const getSequentialColor = (index: number, colors: string[]): string => {
    return colors[index % colors.length];
  };

  const containerRef = useRef<HTMLDivElement>(null); // Reference to the container
  const arr = [
"#e5cc78",
    "#b6f36b",
    "#464454",
    "#84dfe3",
    "#c8a0ff",
    "#7e696b",
    "#9d96b8",
    "#6d827e",
    "#b4563d",
    "#706a8d",
    "#192636",
  ];

  const handleNavDefautlPort = (url: string) => {
    navigate(url);
  };
  if (portfolio_type === "default")
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">
            {portfolio_type === "default" ? "Default Templates" : "Custom Portfolios"}
          </CardTitle>
          <CardDescription className="text-base">
            Choose from our carefully crafted portfolio templates to get started quickly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 h-[calc(100vh-12rem)]">
          <div
            ref={containerRef}
            className="flex gap-6 flex-wrap w-full mx-auto relative overflow-hidden h-full p-4"
          >
            {Object.keys(DefaultPortfolios).map((key, index) => {
              const sequentialColor = getSequentialColor(index, arr);
              return (
                <motion.div
                  drag
                  dragListener={true}
                  dragConstraints={containerRef}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: sequentialColor,
                    touchAction: "none",
                  }}
                  className="relative flex flex-col items-center justify-center cursor-pointer 
                            border-border border h-[18rem] w-[16rem] rounded-2xl shadow-md
                            transition-shadow hover:shadow-xl"
                  key={index}
                >
                  <div
                    onClick={() => handleNavDefautlPort(`/striver/${key}?demo=true`)}
                    className="absolute bg-white/20 backdrop-blur-sm right-4 top-4 
                              flex justify-center items-center w-11 h-11 rounded-xl
                              transition-all hover:bg-white/30"
                  >
                    <FiUpload size={22} className="text-white" />
                  </div>
                  <motion.img
                    src="/31.png"
                    className="h-[10rem] w-[10rem] rounded-full shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear",
                    }}
                  />
                  <h2 className="absolute bottom-6 text-white font-semibold text-lg tracking-wide">
                    {key}
                  </h2>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
};

const CreatePortfolio = () => {
  return (
    <div className="p-3">
      <PortfolioTab>
        <TabsContent value="default">
          <Portfolio portfolio_type={"default"} />
        </TabsContent>
        <TabsContent value="modifiable">
          <Portfolio portfolio_type={"modifiable"} />
        </TabsContent>
      </PortfolioTab>
    </div>
  );
};

export default CreatePortfolio;

function PortfolioTab({ children }: { children: React.ReactNode }) {
  return (
    <Tabs defaultValue="default">
      <ScrollArea>
        <TabsList className="mb-3">
          <TabsTrigger value="default">
            <House
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Default
          </TabsTrigger>
          <TabsTrigger value="modifiable" className="group">
            <PanelsTopLeft
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Modifiable
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {children}
    </Tabs>
  );
}
