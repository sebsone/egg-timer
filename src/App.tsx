import React, { useState, useEffect } from 'react';
import { Header } from './components/Header'
import { TimerDisplay } from './components/TimerDisplay'
import { TimerButton } from './components/TimerButton'
import { EggStyle } from './types/types';

//todo:
// add description to tooltip
// add new images.
// what to do with timer when not counting
// implement progress bar
// Special animation when finished?


const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedEgg, setSelectedEgg] = useState<EggStyle|null>(null);

  const eggStyles: EggStyle[] = [
    { name: 'Soft-boiled', description: 'Runny yolk', time: 5 * 60 , color: 'bg-pink-200 hover:bg-pink-300'},
    { name: 'Almost set', description: 'Sticky yolk', time: 7 * 60 , color: 'bg-yellow-200 hover:bg-yellow-300'},
    { name: 'Softly set', description: 'Jammy', time: 8 * 60 , color: 'bg-blue-200 hover:bg-blue-300'},
    { name: 'Hard-boiled', description: 'Firm throughout', time: 10 * 60 , color: 'bg-green-200 hover:bg-green-300'},
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
      if (selectedEgg) {
        playAlarm();
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, selectedEgg]);

  
  const startTimer = (eggStyle: EggStyle) => {
    setSelectedEgg(eggStyle);
    setTimeLeft(eggStyle.time);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setSelectedEgg(null);
    setTimeLeft(0);
  };

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resumeTimer = () => {
    setIsActive(true);
  };

  const playAlarm = () => {
    // In a real app, you would implement sound playing here
    alert(`Your ${selectedEgg.name} egg is ready!`);
  };

  const calculateProgress = (): number => {
    if (!selectedEgg) return 0;
    const totalTime = selectedEgg.time;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
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
              selectedEgg && timeLeft > 0 ? (
                <button
                  onClick={resumeTimer}
                  className="w-full py-4 bg-green-200 hover:bg-green-300 text-green-800 font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Resume Timer
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
  );
};

export default App;



{/* <div className="flex justify-center space-x-4">
          {isActive ? (
            <button
              onClick={stopTimer}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Stop
            </button>
          ) : (
            timeLeft > 0 && (
              <button
                onClick={() => setIsActive(true)}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Resume
              </button>
            )
          )}
          
          {(isActive || timeLeft > 0) && (
            <button
              onClick={resetTimer}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Reset
            </button>
          )}
        </div> */}