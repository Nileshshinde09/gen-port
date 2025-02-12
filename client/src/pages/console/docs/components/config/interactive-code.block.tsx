
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

interface InteractiveCodeBlockProps {
  language: string
  code: string
}

export function InteractiveCodeBlock({ language, code }: InteractiveCodeBlockProps) {
  const [currentCode, setCurrentCode] = useState(code)

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        className="!bg-gray-100 dark:!bg-zinc-900 !p-4 rounded-lg"
      >
        {currentCode}
      </SyntaxHighlighter>
      <textarea
        value={currentCode}
        onChange={(e) => setCurrentCode(e.target.value)}
        className="absolute inset-0 bg-transparent text-transparent caret-black dark:caret-white resize-none p-4 rounded-lg"
      />
    </div>
  )
}

