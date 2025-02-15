import { HomeHeader } from "@/components";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NavUp } from "@/store/slices/themeSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const isNavVisible = useAppSelector((state) => state.theme.isNavVisible);
  useEffect(() => {
    if (isNavVisible) return;
    dispatch(NavUp());
  }, []);
  return (
    <HomeLayout className="w-full h-full overflow-y-auto">
      <HomeHeader />
    </HomeLayout>
  );
};

export const HomeLayout = ({
  children,
  outerClassName,
  gardientClassName,
  className,
}: {
  children: React.ReactNode;
  outerClassName?: string;
  gardientClassName?: string;
  className?: string;
}): React.ReactNode => (
  <div
    className={cn(
      "min-h-screen h-[200%] overflow-hidden w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative",
      outerClassName
    )}
  >
    <div
      className={cn(
        "absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        gardientClassName
      )}
    />
    <div className={cn("absolute z-40", className)}>{children}</div>
  </div>
);

export default Home;

//Profile
// -----------------------------------------------------------------------
export const FullName: string = "Sukranti Bijagarnikar";
export const Image: string = "/shukk.png";
export const Objective: string = `
Seeking to apply my software development skills in a dynamic IT environment while contributing to innovative projects and enhancing my expertise.
`;
// -----------------------------------------------------------------------

//Nav
// -----------------------------------------------------------------------
export const ResumeLink: string = "/";
// -----------------------------------------------------------------------

export const ContactDetails = [
  "sukrantibijagarnikar@gmail.com",
  "+9196XXXXXXXX",
];

//Education
export const Education = [
  {
    intitution_Name: "DMS Mandal's BCA College, Belagavi, Karnataka",
    starting_date: "2022",
    Ending_date: "2025",
    grads: "8.34",
    grading_system: "CGPA",
    course_or_degree_name: "Bachelor of Computer Applications",
  },
  {
    intitution_Name: "M B TUPARE JUNIOR COLLEGE KARVE",
    starting_date: "2021",
    Ending_date: "2022",
    grads: "71.66",
    grading_system: "Percentage",
    course_or_degree_name: "Higher Secondary Examination (PCM)",
  },
  {
    intitution_Name: "Mahatma fule vidyalay majre karve",
    starting_date: "2019",
    Ending_date: "2020",
    grads: "8.36",
    grading_system: "Percentage",
    course_or_degree_name: "Secondary Examination (10th)",
  },
];

//Technical Skills
export const TechnicalSkills = [
  {
    name: "Python",
    proficiency: "Intermediate",
  },
  {
    name: "HTML",
    proficiency: "Beginner",
  },
  {
    name: "CSS",
    proficiency: "Beginner",
  },
  {
    name: "DBMS",
    proficiency: "Intermediate",
  },
];

//Soft Skills

export const SoftSkills = [
  {
    name: "Teamwork",
  },
  {
    name: "Time Management",
  },
  {
    name: "Problem-Solving",
  },
  {
    name: "Adaptability",
  },
];

//Additional information
export const Additioninfo = {
  languages: [
    {
      name: "English",
      proficiency: ["Speak", "Write", "Read"],
    },
    {
      name: "Marathi",
      proficiency: ["Speak", "Write", "Read"],
    },
    {
      name: "Hindi",
      proficiency: ["Speak", "Write", "Read"],
    },
  ],
};
