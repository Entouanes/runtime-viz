import Timeline from "./Timeline";

export default function Card() {

  return (  
      <div className="m-40 bg-white rounded-lg p-10 ring-1 ring-slate-900/5 shadow-xl">
        <h3 className="text-slate-900 mt-5 p-2 text-base font-medium tracking-tight">Run timeline</h3>
        <div className="pl-4 pr-4">
          <Timeline/>
        </div>
      </div>
  )
}
