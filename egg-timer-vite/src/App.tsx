import React, { useState, useEffect } from 'react';

type EggStyle = {
  name: string;
  description: string;
  time: number;
  color: string;
};

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedEgg, setSelectedEgg] = useState<string>('');

  const eggStyles: EggStyle[] = [
    { name: 'Runny yolk', description: 'soft-boiled', time: 5 * 60 , color: 'bg-pink-200 hover:bg-pink-300'},
    { name: 'Almost set', description: 'sticky yolk', time: 7 * 60 , color: 'bg-yellow-200 hover:bg-yellow-300'},
    { name: 'Softly set', description: 'jammy', time: 8 * 60 , color: 'bg-blue-200 hover:bg-blue-300'},
    { name: 'Hard-boiled', description: 'firm throughout', time: 10 * 60 , color: 'bg-green-200 hover:bg-green-300'},
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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startTimer = (eggStyle: EggStyle) => {
    setSelectedEgg(eggStyle.name);
    setTimeLeft(eggStyle.time);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setSelectedEgg('');
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setSelectedEgg('');
  };

  const playAlarm = () => {
    // In a real app, you would implement sound playing here
    alert(`Your ${selectedEgg} egg is ready!`);
  };

  const calculateProgress = (): number => {
    if (!selectedEgg) return 0;
    const selectedEggStyle = eggStyles.find(style => style.name === selectedEgg);
    if (!selectedEggStyle) return 0;
    const totalTime = selectedEggStyle.time;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-100 to-blue-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-600">Egg Timer</h1>
        
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto rounded-full border-8 border-gray-200 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className="bg-yellow-400 h-full transition-all duration-1000"
                style={{ 
                  width: '100%', 
                  transform: `translateY(${100 - calculateProgress()}%)` 
                }}
              ></div>
            </div>
            <div className="z-10">
              <div className="text-5xl font-bold text-gray-800">{formatTime(timeLeft)}</div>
              {selectedEgg && (
                <div className="text-lg text-center text-gray-600 mt-2">{selectedEgg}</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {eggStyles.map((style) => (
            <button
              key={style.name}
              onClick={() => startTimer(style)}
              disabled={isActive}
              className={`
                py-3 px-4 rounded-lg text-left
                ${isActive && selectedEgg === style.name 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 hover:bg-yellow-100 text-gray-800 hover:text-yellow-800'}
                ${isActive && selectedEgg !== style.name ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="font-bold">{style.name}</div>
              <div className="text-sm">{style.description} - {style.time / 60} min</div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4">
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
        </div>
      </div>
    </div>
  );
};

export default App;