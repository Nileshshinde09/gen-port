import { ChartConfig } from "../../../components/ui/chart";



export const IchartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
]
export const IchartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig