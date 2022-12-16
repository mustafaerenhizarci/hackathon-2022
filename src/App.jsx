import { useState } from "react";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <div className="container mx-auto text-center h-screen flex flex-col gap-y-8 justify-center items-center px-8">
      <p>Turkey {time}</p>
      <h1 className="font-medium text-3xl">Hackathon Vite + React Project Starter</h1>
      <a target="_blank" href="https://hackathon.karsav.org/">
        <button className="btn btn-primary font-bold">Hackathon Website</button>
      </a>
    </div>
  );
}

export default App;
