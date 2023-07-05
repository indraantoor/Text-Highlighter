import Searchbox from "./components/Searchbox";
import CreateDocument from "./components/CreateDocument";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          <div className="md:order-2">
            <Searchbox />
          </div>
          <div className="md:order-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Text Highlighter
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Your Single Page Saas Application for Text Highlighting.
            </p>
            <CreateDocument />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
