import { InteractiveCodeBlock } from "./components/config/interactive-code.block";



export default function Documentation() {
  return (
    <div className="max-w-3xl mx-auto z-50">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="mb-4">
          To get started with this project, follow these steps:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li>Clone the repository</li>
          <li>Install dependencies</li>
          <li>Run the development server</li>
        </ol>
        <InteractiveCodeBlock
          language="bash"
          code={`git clone https://github.com/example/repo.git
cd repo
npm install
npm run dev`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <p className="mb-4">
          Here's a simple example of how to use the main component:
        </p>
        <InteractiveCodeBlock
          language="jsx"
          code={`import { MainComponent } from './components/MainComponent'

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      <MainComponent />
    </div>
  )
}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
        <p className="mb-4">The MainComponent accepts the following props:</p>
        <InteractiveCodeBlock
          language="typescript"
          code={`interface MainComponentProps {
  title: string;
  items: string[];
  onItemClick: (item: string) => void;
}`}
        />
      </section>
    </div>
  );
}
