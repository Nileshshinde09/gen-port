import { useEffect, useState } from "react"
import { InteractiveCodeBlock } from "./components/config/interactive-code.block"
import { useParams } from "react-router-dom"
import { Portfolio as PortfolioService } from "@/services/portfolio.service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, Clipboard, Download, Github, Tag } from "lucide-react"
import { portfolioTemplates } from "./components/config/portfolio-templates"
import {type PortfolioTemplate} from "./components/config/portfolio-templates"
export default function Documentation() {
  const { id } = useParams()
  const [portfolioId, setPortfolioId] = useState<string>("")
  const [accessToken, setAccessToken] = useState("")
  const [template, setTemplate] = useState<PortfolioTemplate|any>(null)
  const [copied, setCopied] = useState({
    clone: false,
    tag: false,
    release: false,
    token: false,
  })

  useEffect(() => {
    ;(async () => {
      console.log(id)
      if (!id) return
      const response = await PortfolioService.getPortfolioPreview(id)
      if (response.status === 200) {
        if (response.data.data.portfolio.portfolioId) {
          const id = response.data.data.portfolio.portfolioId
          setPortfolioId(id)
          setTemplate(portfolioTemplates[id])
          if (response.data.data.portfolio.portfolioAccessToken) {
            setAccessToken(response.data.data.portfolio.portfolioAccessToken)
          }
        }
      }
    })()
  }, [id])

  const handleCopy = (text:string, type:string) => {
    navigator.clipboard.writeText(text)
    setCopied({ ...copied, [type]: true })
    setTimeout(() => {
      setCopied({ ...copied, [type]: false })
    }, 2000)
  }

  if (!template) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Documentation</h1>
        <p>Loading template information...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Documentation</h1>
      <p className="text-muted-foreground mb-6">Follow these steps to download and set up your portfolio template</p>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              {portfolioId}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="download" className="mt-2">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="download">Download Template</TabsTrigger>
              <TabsTrigger value="setup">Setup Instructions</TabsTrigger>
            </TabsList>

            <TabsContent value="download" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Download Options</h3>
                <p className="text-muted-foreground">
                  Choose one of the following methods to download the template code:
                </p>

                <div className="space-y-4">
                  {/* GitHub Clone */}
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Github className="w-4 h-4 mr-2" />
                        Clone Repository
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(`git clone ${template.github}`, "clone")}
                        className="h-8"
                      >
                        {copied.clone ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                      </Button>
                    </div>
                    <InteractiveCodeBlock
                      language="bash"
                      code={`git clone ${template.github}
cd gen-port-templates
git checkout ${template.branch}`}
                    />
                  </div>
  {/* Tag Clone */}
  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Clone Tag
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(`git clone ${template.clone_Tag}`, "clone")}
                        className="h-8"
                      >
                        {copied.clone ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                      </Button>
                    </div>
                    <InteractiveCodeBlock
                      language="bash"
                      code={`git clone ${template.clone_Tag}`}
                    />
                  </div>
                  {/* GitHub Tag */}
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download from Tag
                      </h4>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(template.tag, "tag")} className="h-8">
                        {copied.tag ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Visit the tag URL and download the ZIP or TAR file:
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm font-mono break-all">
                      <a
                        href={template.tag}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {template.tag}
                      </a>
                    </div>
                  </div>

                  {/* GitHub Release */}
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download from Release
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(template.releases, "release")}
                        className="h-8"
                      >
                        {copied.release ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Visit the release URL and download the ZIP or TAR file:
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm font-mono break-all">
                      <a
                        href={template.releases}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {template.releases}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="setup" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Setup Instructions</h3>
                <p className="text-muted-foreground">
                  After downloading the template, follow these steps to set up your portfolio:
                </p>

                <div className="space-y-6">
                  {/* Access Token */}
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Your Access Token</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(accessToken, "token")}
                        className="h-8"
                      >
                        {copied.token ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
                      {accessToken || "Token will appear here"}
                    </div>
                  </div>

                  {/* Environment Setup */}
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Configure Environment Variables</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create a <code>.env</code> file in the root of your project and add your access token:
                    </p>
                    <InteractiveCodeBlock
                      language="bash"
                      code={`VITE_PORTFOLIO_ACCESS_TOKEN=${accessToken || "your_access_token_here"}`}
                    />
                  </div>

                  {/* Installation and Running */}
<div className="border rounded-md p-4">
  <h4 className="font-medium mb-2">Install Dependencies and Run</h4>
  <p className="text-sm text-muted-foreground mb-3">
    Install the dependencies and start the development server using your preferred package manager:
  </p>
  {portfolioId && (
    <Tabs defaultValue="npm" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="yarn">Yarn</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="bun">Bun</TabsTrigger>
        <TabsTrigger value="cnpm">cnpm</TabsTrigger>
      </TabsList>
      <TabsContent value="npm">
        <InteractiveCodeBlock
          language="bash"
          code={`# Navigate to the project directory
cd ${template.clone_Tag?.split(" ")[1]}

# Install dependencies
npm install

# Start the development server
npm run dev`}
        />
      </TabsContent>
      <TabsContent value="yarn">
        <InteractiveCodeBlock
          language="bash"
          code={`# Navigate to the project directory
cd ${template.clone_Tag?.split(" ")[1]}

# Install dependencies
yarn install

# Start the development server
yarn dev`}
        />
      </TabsContent>
      <TabsContent value="pnpm">
        <InteractiveCodeBlock
          language="bash"
          code={`# Navigate to the project directory
cd ${template.clone_Tag?.split(" ")[1]}

# Install dependencies
pnpm install

# Start the development server
pnpm run dev`}
        />
      </TabsContent>
      <TabsContent value="bun">
        <InteractiveCodeBlock
          language="bash"
          code={`# Navigate to the project directory
cd ${template.clone_Tag?.split(" ")[1]}

# Install dependencies
bun install

# Start the development server
bun run dev`}
        />
      </TabsContent>
      <TabsContent value="cnpm">
        <InteractiveCodeBlock
          language="bash"
          code={`# Navigate to the project directory
cd ${template.clone_Tag?.split(" ")[1]}

# Install dependencies
cnpm install

# Start the development server
cnpm run dev`}
        />
      </TabsContent>
    </Tabs>
  )}
</div>

                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Need Help?</h3>
        <p className="mb-2">If you encounter any issues during setup, please refer to the following resources:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Check the README file in the repository for detailed instructions</li>
          <li>
            Visit the{" "}
            <a href={template.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              template repository
            </a>{" "}
            for more information
          </li>
          <li>Contact support if you continue to experience problems</li>
        </ul>
      </div>
    </div>
  )
}

