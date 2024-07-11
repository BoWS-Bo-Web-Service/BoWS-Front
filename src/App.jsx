import './App.css'
import Timer from "./components/Timer.jsx";
import WebTerminal from "./components/WebTerminal.jsx";

function App() {

  return (
      <>
          <p className="text-2xl">Ubuntu playground</p>
          <main className="min-h-screen w-full overflow-hidden flex">
              <section className="hidden md:flex md:flex-col md:w-[350px]">
                  <div className="flex flex-col h-[200px] bg-gray-400 justify-center">
                      <Timer/>
                      <button className="bg-orange-600 m-2">CLOSE SESSION</button>
                  </div>
                  <div>
                      스펙을 여기 적어주고
                  </div>
              </section>
              <section className="flex flex-col flex-grow">
                  <section className="h-[200px] bg-sky-400">
                      여기는 통계?
                  </section>
                  <section className="min-h-[500px] flex-grow">
                      <WebTerminal />
                  </section>
              </section>
          </main>
      </>
  )
}

export default App
