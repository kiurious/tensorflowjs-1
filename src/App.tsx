import "./App.css";
import "@tensorflow/tfjs";
import ToxicityChecker from "./components/toxicity-checker";
import TeachableMachine from "./components/teachable-machine";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-purple-900 text-white gap-6 p-2">
      <h1 className="text-2xl">Tensorflow JS</h1>
      <ToxicityChecker />
      <TeachableMachine />
    </div>
  );
}

export default App;
