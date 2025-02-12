import { cn } from "@/lib/utils";
import { NeonGradientCard } from "../ui/neon-gradient-card";
import { motion } from "framer-motion";
import { useTheme } from "../ui/theme-provider";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";
// import { FiSlack } from "react-icons/fi";
const HomeHeader = () => {
  return (
    <motion.div
      className="h-fit relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <IntroTitle />
      <IntroButton />
      <IntroImage />
    </motion.div>
  );
};

export default HomeHeader;

export const IntroButton = () => {
  const router = useNavigate()
  const handleGetStarted = () => {
    router("/console/my-profile")
  };
  return (
    <motion.div
      className="flex h-fit mt-10 mb-2 mx-auto items-center justify-center cursor-pointer"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        onClick={handleGetStarted}
        className={cn(
          "h-12 w-[10rem] flex items-center justify-center  group rounded-full border "
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex gap-1">
          <span>Get Started for free</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const IntroTitle = () => (
  <>
    <motion.h2
      className=" bg-clip-text mt-28 font-normal text-white/90  text-center  text-2xl md:text-4xl lg:text-8xl py-2 md:py-5 relative z-20 tracking-tight"
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      Effortlessly Build a<br /> Portfolio That Shines
    </motion.h2>
    <motion.p
      className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      No coding wizardly required. Just pure, unadultreated artistry.
    </motion.p>
  </>
);

export const IntroImage = () => {
  const { theme } = useTheme();
  return (
    <>
      <motion.div
        className={cn(
          "w-full max-w-6xl mx-auto my-20 border-2 border-zinc-400/70 rounded-[2.1rem]",
          theme == "dark" ? "border-zinc-700" : null
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <NeonGradientCard borderRadius={34} borderSize={2.5}>
          <div className="overflow-hidden w-full h-[50rem] max-sm:h-[35rem] bg-neutral-950/95 rounded-t-[2.1rem] relative">
            <div className="absolute top-2 rounded-b-full z-20 left-1/2 -translate-x-1/2 blur-3xl w-[30rem] h-[10rem] bg-white/5" />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-zinc-950 rounded-2xl border w-[90%] h-[43rem] max-sm:h-[30rem]">
              <div className="relative border-b p-1 w-full h-14 flex items-center">
                <div className="flex gap-2 ml-4 absolute">
                  <div className="w-3 h-3 bg-neutral-500/20 rounded-full" />
                  <div className="w-3 h-3 bg-neutral-500/20 rounded-full" />
                  <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                </div>
                <div className="w-[14rem] h-[1rem] max-sm:w-[12rem] mx-auto rounded-full bg-neutral-500/20 " />
              </div>
              <FrameSkeleton />
            </div>
          </div>
        </NeonGradientCard>
        <div className="pointer-events-none absolute z-50 inset-x-0 bottom-0 -mb-2 h-1/3 max-w-[72.5rem] mx-auto bg-gradient-to-t via-background from-black dark:from-black" />
      </motion.div>
    </>
  );
};

const FrameSkeleton = () => {
  return (
    <div className="w-full h-full p-10 max-sm:p-5 overflow-hidden flex flex-col space-y-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Skeleton className="h-[2rem] w-[2rem] rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <div className="flex gap-3 w-fit max-sm:hidden">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-4 w-[50px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[5rem] mx-auto w-[5rem] rounded-lg" />
        <Skeleton className="h-4 w-[150px] mx-auto" />
        <Skeleton className="h-4 w-[200px] mx-auto" />
      </div>
      <Skeleton className="h-4 w-[200px] ml-24 max-sm:hidden" />
      <div>
        <div className=" flex gap-3 justify-center">
          <Block />
          <Block />
          <Block />
        </div>
      </div>
      <div className=" flex gap-3 justify-center">
        <Block />
        <Block />
        <Block />
      </div>
    </div>
  );
};
const Block = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);
