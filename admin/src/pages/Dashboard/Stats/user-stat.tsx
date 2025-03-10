import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../../components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../components/ui/chart"
import { toast } from "../../../hooks/use-toast"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Skeleton } from "../../../components/ui/skeleton"
import { useParams } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import { Auth } from "../../../services"

const FormSchema = z.object({
  credential: z.string().min(2, {
    message: "credential must be at least 2 characters.",
  }),
})

const ErrorCard = ({ message }: { message: string }) => {
  return (
    <Card className="col-span-2 border-destructive">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">Error</CardTitle>
        </div>
        <CardDescription>Something went wrong while fetching user stat data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-auto">
          <code className="text-destructive">{message}</code>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </CardFooter>
    </Card>
  )
}

const AppUserStats = () => {
  // const { data, error, loading, setCredential } = useUserStats()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isVisible, setIsVisible] = React.useState<boolean>(true)
  const [statData, setStatData] = React.useState<any | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)

  const { userId } = useParams()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      credential: "",
    },
  })

  React.useEffect(() => {
    if (userId) {
      setLoading(true)
      setError(null)
      ;(async () => {
        try {
          const response = await Auth.getUserStats({ credential: userId })
          if (response.status === 200) {
            setStatData(response.data.data)
          } else {
            setError(new Error(`Failed to fetch user stats: ${response.statusText}`))
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        } finally {
          setLoading(false)
        }
      })()

      setIsVisible(true)
    }
  }, [userId])

  React.useEffect(() => {
    if (error) {
      console.error("User stats error:", error)
      toast({
        variant: "destructive",
        title: "Error fetching user data",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-hidden text-wrap">
            <code className="text-destructive">{error.message}</code>
          </pre>
        ),
      })
    }
  }, [error])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { credential } = data
    if (credential) {
      setLoading(true)
      setError(null)
      ;(async () => {
        try {
          const response = await Auth.getUserStats({ credential })
          if (response.status === 200) {
            setStatData(response.data.data)
          } else {
            setError(new Error(`Failed to fetch user stats: ${response.statusText}`))
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        } finally {
          setLoading(false)
        }
      })()

      setIsVisible(true)
    }
  }

  return (
    <ScrollArea className="w-full h-screen pb-20  overflow-hidden">
      <div className="grid grid-cols-2 gap-5 p-10">
        {!userId && (
          <div className="col-span-2 p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="credential"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username / User Id / Email</FormLabel>
                      <FormControl>
                        <Input placeholder="username / id / email" {...field} className="w-[20rem]" />
                      </FormControl>
                      <FormDescription>Find user the any unique credential.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        )}

        {error && <ErrorCard message={error.message} />}

        {isVisible && !error && (
          <>
            {isLoading && (
              <>
                <Card className="col-span-2">
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Skeleton className="h-[200px] w-[200px] rounded-full" />
                  </CardContent>
                </Card>
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-2/3" />
                      </CardHeader>
                      <CardContent className="flex justify-center">
                        <Skeleton className="h-[180px] w-[180px] rounded-full" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-4 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
              </>
            )}
            {!isLoading && statData && (
              <>
                <OverallUserStat data={statData} />
                <IndividualChart
                  title="Login Requests"
                  feature={"login"}
                  requests={statData?.logins}
                  username={statData?.userData?.username}
                />
                <IndividualChart
                  title="Logouts Requests"
                  feature={"logout"}
                  requests={statData?.logouts}
                  username={statData?.userData?.username}
                />
                <IndividualChart
                  title="Password Change Requests"
                  feature={"login"}
                  requests={statData?.passwordChanges}
                  username={statData?.userData?.username}
                />
                <IndividualChart
                  title="Profile Updates Requests"
                  feature={"login"}
                  requests={statData?.profileUpdates}
                  username={statData?.userData?.username}
                />
                <IndividualChart
                  title="Refresh AccessToken Requests"
                  feature={"login"}
                  requests={statData?.refreshAccessToken}
                  username={statData?.userData?.username}
                />
              </>
            )}
          </>
        )}
      </div>
    </ScrollArea>
  )
}
export default AppUserStats

export const OverallUserStat = ({ data }: { data: any | null }) => {
  if (!data) return
  const chartData = [
    {
      feature: "refreshAccessToken",
      visitors: data.refreshAccessToken,
      fill: "var(--color-chrome)",
    },
    {
      feature: "profileUpdates",
      visitors: data.profileUpdates,
      fill: "var(--color-safari)",
    },
    {
      feature: "passwordChanges",
      visitors: data.passwordChanges,
      fill: "var(--color-firefox)",
    },
    { feature: "logouts", visitors: data.logouts, fill: "var(--color-edge)" },
    { feature: "logins", visitors: data.logins, fill: "var(--color-other)" },
    {
      feature: "changePassword",
      visitors: data.changePassword,
      fill: "var(--color-firefox)",
    },
  ]
  const chartConfig = {
    visitors: {
      label: "Request",
    },
    chrome: {
      label: "refreshAccessToken",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "profileUpdates",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "passwordChanges",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "logouts",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "changePassword",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col h-fit">
      <CardHeader className="items-center pb-0">
        <CardTitle>{`${data.userData.username} total requests`}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {data?.requests?.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}

const IndividualChart = ({
  title,
  date,
  requests,
  main_dsc,
  sub_dsc,
  username,
  feature,
}: {
  title?: string
  date?: string
  requests?: number
  main_dsc?: string
  sub_dsc?: string
  username?: string
  feature?: string
}) => {
  const IchartData = [{ feature, requests, fill: "var(--color-safari)" }]

  const IchartConfig = {
    requests: {
      label: "Requests",
    },
    feature: {
      label: "feature",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={IchartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart data={IchartData} endAngle={100} innerRadius={80} outerRadius={140}>
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="feature" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                          {requests}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Requests
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

