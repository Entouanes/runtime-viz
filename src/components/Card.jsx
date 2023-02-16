import Timeline from "./Timeline";

export default function Card() {

  return (  
      <div className="m-10 bg-white rounded-lg p-4 ring-1 ring-slate-900/5 shadow-xl">
        <div>
          <span className="inline-flex items-center justify-center p-2 m-2 bg-white rounded-md text-indigo-500 ring-1 ring-indigo-500">
            Run ID: 1
          </span>
        </div>
        <h3 className="text-slate-900 mt-5 p-2 text-base font-medium tracking-tight">Run timeline (microseconds)</h3>
        <div className="pl-4 pr-4">
          <Timeline/>
        </div>
      </div>
  )
}
