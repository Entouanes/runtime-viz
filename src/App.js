import Card from "./components/Card";


function App() {
  return (
    <>
      <div className="m-10 bg-white rounded-lg p-2">
        <h1 className="text-center m-10 text-6xl font-semibold text-slate-600 font-mono">Runtime visualizer</h1>
        <div>
          <Card/>
        </div>
        <div className="flex justify-center">
          <button 
            className="hover:text-white hover:bg-indigo-500 text-cente inline-flex items-center justify-center p-2 bg-white rounded-md shadow-lg text-indigo-500 ring-1 ring-indigo-500">
              Load new state file
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
