import { useRef, useState } from "react";

export default function Stopwatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);

  const clearIntervalRef = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startStopwatch = () => {
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = Date.now() - elapsedTime;
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    });
  };

  const stopStopwatch = () => {
    clearIntervalRef();
    setIsRunning(false);
    setIsPaused(true);
  };

  const resetStopwatch = () => {
    clearIntervalRef();
    setIsRunning(false);
    setIsPaused(false);
    setElapsedTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <main className=" flex flex-col gap-12 px-16 py-8 rounded-xl bg-gray-800 shadow-2xl">
      <h1 className="text-3xl font-bold text-center text-white ">Stopwatch</h1>
      <p
        className="text-6xl font-bold text-center text-amber-400"
        aria-live="polite"
      >
        {formatTime(elapsedTime)}
      </p>
      <div className="grid grid-cols-[repeat(3,110px)] gap-x-8">
        <button
          onClick={startStopwatch}
          disabled={isRunning}
          className="bg-[#36BA98] hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPaused ? "Resume" : "Start"}
        </button>

        <button
          onClick={stopStopwatch}
          disabled={!isRunning}
          className="bg-[#ef9144] hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Stop
        </button>

        <button
          onClick={resetStopwatch}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Reset
        </button>
      </div>
    </main>
  );
}
