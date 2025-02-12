import { Utils } from "@/lib/utils";
import MorphingText from "./ui/morphing-text";

const TextTexts = [
  "Hello",
  "Morphing",
  "Text",
  "Animation",
  "React",
  "Component",
  "Smooth",
  "Transition",
  "Engaging",
];
interface MorphingProps {
  className?: string;
  texts?: [string];
}
const MorphingTextDemo: React.FC<MorphingProps> = ({
  className,
  texts,
}): React.ReactNode => {
  return (
    <MorphingText
      className={Utils.cn("", className)}
      texts={texts ? texts : TextTexts}
    />
  );
};

export default MorphingTextDemo;
