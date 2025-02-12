import { Footer, HomeHeader } from "@/components";
import BentoGridThirdInterface from "@/components/Home/bentogrid";
import Features from "@/components/Home/features";
import Subscribe from "@/components/Home/subscribe";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeScrollState, NavUp } from "@/store/slices/themeSlice";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const isNavVisible = useAppSelector((state) => state.theme.isNavVisible);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    if (isNavVisible) return;
    dispatch(NavUp());
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        dispatch(changeScrollState(progress));
        setScrollProgress(progress);
      }
    };

    const scrollContainer = scrollRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);
  return (
    <ScrollArea ref={scrollRef} className="w-full h-screen dark">
      <HomeHeader />
      <Features />
      <Subscribe />
      <BentoGridThirdInterface />
      <Footer />
    </ScrollArea>
  );
};

export default Home;
