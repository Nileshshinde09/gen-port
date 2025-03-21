import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaNpm, FaYarn, FaGitAlt, FaClipboard, FaCheck } from "react-icons/fa6";
import { SiPnpm, SiXubuntu, SiMacos } from "react-icons/si";
import { IoLogoWindows } from "react-icons/io";
import { FcLinux } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CommandBox = () => {
    const [version, setVersion] = useState("v.0.0.1");
    const [os, setOs] = useState("windows");
    const [installMethod, setInstallMethod] = useState("npm");
    const [copied, setCopied] = useState(false);
    console.log(os)
    const repoUrl = "github.com/dummy-org/dummy-repo"; // Dummy URL

    const generateCommands = () => {
        let installCommand = "";
        if (installMethod === "npm") {
            installCommand = `npx degit ${repoUrl} my-project`;
        } else if (installMethod === "pnpm") {
            installCommand = `pnpm dlx degit ${repoUrl} my-project`;
        } else if (installMethod === "yarn") {
            installCommand = `yarn dlx degit ${repoUrl} my-project`;
        } else if (installMethod === "bun") {
            installCommand = `bunx degit ${repoUrl} my-project`;
        } else if (installMethod === "git") {
            installCommand = `git clone https://${repoUrl}.git && cd my-project && git checkout ${version}`;
        }

        return `# Install using ${installMethod.toUpperCase()}
${installCommand}

# Install dependencies
${installMethod !== "git" ? `${installMethod} install` : ""}

# Start development server
${installMethod !== "git" ? `${installMethod} run dev` : ""}

# Build project
${installMethod !== "git" ? `${installMethod} run build` : ""}
`;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generateCommands());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    };

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
                <h2 className="text-lg font-semibold">Get Port @</h2>
                <Select onValueChange={setVersion} defaultValue="v.0.0.1">
                    <SelectTrigger className="w-28">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="v.0.0.1">v.0.0.1</SelectItem>
                    </SelectContent>
                </Select>

                <h2 className="text-lg font-semibold">for OS</h2>
                <Select onValueChange={setOs} defaultValue="windows">
                    <SelectTrigger className="w-28">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="windows">
                            <div className="flex items-center gap-2">
                                <IoLogoWindows className="w-4 h-4" />
                                Windows
                            </div>
                        </SelectItem>
                        <SelectItem value="linux">
                            <div className="flex items-center gap-2">
                                <FcLinux className="w-4 h-4" />
                                Linux
                            </div>
                        </SelectItem>
                        <SelectItem value="mac">
                            <div className="flex items-center gap-2">
                                <SiMacos className="w-4 h-4" />
                                Mac
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>

                <h2 className="text-lg font-semibold">with</h2>
                <Select onValueChange={setInstallMethod} defaultValue="npm" >
                    <SelectTrigger className="w-44">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <div className="flex flex-wrap gap-2 p-2 w-40">
                            <SelectItem value="npm">
                                <div className="flex items-center gap-2">
                                    <FaNpm className="w-4 h-4" />
                                    npm
                                </div>
                            </SelectItem>
                            <SelectItem value="bun">
                                <div className="flex items-center gap-2">
                                    <SiXubuntu className="w-4 h-4" />
                                    bun
                                </div>
                            </SelectItem>
                            <SelectItem value="yarn">
                                <div className="flex items-center gap-2">
                                    <FaYarn className="w-4 h-4" />
                                    yarn
                                </div>
                            </SelectItem>
                            <SelectItem value="pnpm">
                                <div className="flex items-center gap-2">
                                    <SiPnpm className="w-4 h-4" />
                                    pnpm
                                </div>
                            </SelectItem>
                            <SelectItem value="git">
                                <div className="flex items-center gap-2">
                                    <FaGitAlt className="w-4 h-4" />
                                    git
                                </div>
                            </SelectItem>
                        </div>
                    </SelectContent>
                </Select>
            </div>

            <div className="relative bg-neutral-950 p-4 rounded border border-border h-fit max-w-3xl mx-auto">
                {/* Copy Button */}
                <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="absolute top-2 right-2 flex items-center gap-2"
                >
                    {copied ? <FaCheck className="text-green-400" /> : <FaClipboard />}
                    {copied ? "Copied!" : "Copy"}
                </Button>

                {/* Scrollable Command Box with Syntax Highlighting */}
                <ScrollArea className=" text-white mt-14">
                    <SyntaxHighlighter language="bash" style={materialDark} className="rounded-md border border-border">
                        {generateCommands()}
                    </SyntaxHighlighter>
                </ScrollArea>
            </div>
        </section>
    );
};

export default CommandBox;
// prism