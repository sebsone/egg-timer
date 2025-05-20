import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header'
import { TimerDisplay } from './components/TimerDisplay'
import { TimerButton } from './components/TimerButton'
import { createEggStyle, EggStyle } from './types/EggStyle';
import { Alarm, AlarmHandle } from "./components/Alarm";


const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number|null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedEgg, setSelectedEgg] = useState<EggStyle|null>(null);
  const alarmRef = useRef<AlarmHandle | null>(null);

  const eggStyles: EggStyle[] = [
    createEggStyle({ name: 'Soft-boiled', description: 'Runny yolk', time: 5 * 60 , color: 'pink', tooltipPosition: "top"}),
    createEggStyle({ name: 'Almost set', description: 'Sticky yolk', time: 7 * 60 , color: 'yellow', tooltipPosition: "top"}),
    createEggStyle({ name: 'Softly set', description: 'Jammy', time: 8 * 60 , color: 'blue', tooltipPosition: "bottom"}),
    createEggStyle({ name: 'Hard-boiled', description: 'Firm throughout', time: 10 * 60 , color: 'green', tooltipPosition: "bottom"}),
  ];

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      setIsActive(false);
      if (selectedEgg) {
        playAlarm();
      }
      return;
    }

    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : null));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [isActive, timeLeft, selectedEgg]);

  
  const startTimer = (eggStyle: EggStyle) => {
    setSelectedEgg(eggStyle);
    setTimeLeft(eggStyle.time);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setSelectedEgg(null);
    setTimeLeft(null);
    alarmRef.current?.stop();
  };

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resumeTimer = () => {
    setIsActive(true);
  };

  const playAlarm = () => {
    alarmRef.current?.play();
  };


  return (
    <>
      <Alarm alarmRef={alarmRef} />
      <div className="min-h-screen w-full bg-gradient-to-b from-yellow-100 to-purple-100 flex flex-col items-center p-6">
        <div className="w-full max-w-md flex flex-col items-center">
          <Header /> 
          <div className="w-full bg-white rounded-3xl shadow-lg p-8 mt-8 flex flex-col items-center">
            <TimerDisplay 
              timeLeft={timeLeft}
              isActive={isActive}
              selectedEgg={selectedEgg}
            />
            <div className="mt-8 w-full">
              {!isActive ? (
                selectedEgg && timeLeft && timeLeft > 0 ? (
                  <button
                    onClick={resumeTimer}
                    className="w-full py-4 bg-green-200 hover:bg-green-300 text-green-800 font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Resume Timer
                  </button>
                ) : (
                  timeLeft === 0 ? (
                    <button
                      onClick={stopTimer}
                      className="w-full py-4 bg-red-200 hover:bg-red-300 text-red-800 font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Stop
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {eggStyles.map((option) => (
                        <TimerButton
                          eggStyle={option}
                          onClick={() => startTimer(option)}
                        />
                      ))}
                    </div>
                  )
                )
                
              ) : (
                <div className='grid grid-cols-2 gap-3'>
                  <button
                    onClick={stopTimer}
                    className="w-full py-4 ring-3 ring-red-300 hover:bg-red-300 text-red-800 font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Cancel Timer
                  </button>
                  <button
                    onClick={pauseTimer}
                    className="w-full py-4 bg-yellow-200 hover:bg-yello-300 text-yellow-800 font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Pause Timer
                  </button>
              </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default App;
