import DefaultPortfolios from "@/app/default";
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
import { motion, useDragControls } from "motion/react";
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

  const controls = useDragControls();
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
      <Card>
        <CardHeader>
          <CardTitle>Account {portfolio_type}</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 h-screen">
          <div
            ref={containerRef} // Attach the ref to the container
            className="flex gap-4 flex-wrap w-full mx-auto relative overflow-hidden h-full"
          >
            {Object.keys(DefaultPortfolios).map((key, index) => {
              const sequentialColor = getSequentialColor(index, arr);
              return (
                <motion.div
                  drag
                  dragListener={true}
                  dragConstraints={containerRef}
                  style={{
                    backgroundColor: sequentialColor,
                    touchAction: "none",
                  }}
                  className="relative flex items-center justify-center  cursor-pointer border-border border h-[16rem] w-[15rem] rounded-[2.7rem]"
                  key={index}
                >
                  <div
                    onClick={() => {
                      handleNavDefautlPort(
                        `/striver/${key}?demo=true`
                      );
                    }}
                    className="absolute bg-black/10 right-3 top-3 flex justify-center items-center w-10 h-10 rounded-lg "
                  >
                    <FiUpload size={20} className="text-white" />
                  </div>
                  <motion.img
                    src="/31.png"
                    className="h-[12rem] w-[12rem] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "linear",
                    }}
                  />
                  <h2 className="absolute bottom-1 text-black font-semibold">
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
