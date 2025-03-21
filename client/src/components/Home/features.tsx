import Iphone15Pro from "../iphone-15-pro";
import { motion } from "framer-motion";
import { Safari } from "../magicui/safari";
import { SparklesText } from "../magicui/sparkles-text";
const Features = () => {
  return (
    <>
      <div className="relative w-full h-full flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute z-[9999] w-full h-full max-w-7xl mx-auto bg-neutral-950   rounded-2xl"
        >
          <motion.h2
            className="bg-clip-text mt-18 font-semibold  text-white/90 text-center  text-2xl md:text-3xl lg:text-6xl py-2 md:py-5 relative z-20 tracking-tight"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We'll keep it up to date
          </motion.h2>
          <motion.p
            className="max-w-xl mx-auto text-sm md:text-xl text-neutral-700 dark:text-neutral-400 text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Check in via email and maintain your portfolio.
            <br />
            An updated portfolio opens doors.
          </motion.p>
          <div className="relative h-[80vh] max-sm:h-[50vh] mt-10">
            <Iphone15Pro videoSrc="/video.mp4" className="size-full " />
          </div>
          <div id="demo" className="relative h-[80vh] max-sm:h-[50vh] mt-10">
          <SparklesText className="text-center my-10" text="- - - Demo - - -" />
            <Safari
              url="magicui.design"
              className="size-full"
              videoSrc="/demo.mp4"
            />
          <SparklesText className="text-center my-5" text=". . . . . . ." />

          </div>
        </motion.div>
      </div>
      {/* <motion.h2
        className="bg-clip-text mt-32 font-semibold  text-white/90 text-center  text-2xl md:text-3xl lg:text-6xl py-2 md:py-5 relative z-20 tracking-tight"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        We'll keep it up to date
      </motion.h2>
      <motion.p
        className="max-w-xl mx-auto text-sm md:text-xl text-neutral-700 dark:text-neutral-400 text-center"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Check in via email and maintain your portfolio.
        <br />
        An updated portfolio opens doors.
      </motion.p>
      <div className="relative mt-5 flex h-[560px] w-full flex-col items-center justify-center overflow-hidden bg-background">
        <span className="z-50 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-neutral-500 via-gray-400 to-gray-300 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
          Start Fresh or Start New
        </span>

        <OrbitingCircles iconSize={40} radius={225}>
          <Icons.react />
          <Icons.js />
          <Icons.nextjs />
          <Icons.docker />
        </OrbitingCircles>
        <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
          <Icons.react />
          <Icons.html />
          <Icons.ts />
          <Icons.tailwind />
        </OrbitingCircles>
        <OrbitingCircles iconSize={30} radius={175} reverse speed={2}>
          <Icons.css />
          <Icons.js />
          <Icons.ts />
          <Icons.docker />
        </OrbitingCircles>
      </div> */}
    </>
  );
};

export default Features;
