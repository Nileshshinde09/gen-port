import { useParams } from "react-router-dom";
import { InteractiveCodeBlock } from "./components/config/interactive-code.block";
import CommandBox from "./components/config/command-box";

export default function DeployDocs() {
    // const {type,id} = useParams();
    return (
        <div className="max-w-3xl mx-auto z-50 py-10">
          <h1 className="text-3xl font-bold mb-6">Documentation</h1>
        {/* <h2>{type} {id}</h2> */}
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
          </section>
            <CommandBox />
        </div>
      );
}
