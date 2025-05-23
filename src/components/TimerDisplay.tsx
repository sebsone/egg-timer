import { JSX } from "react"
import { EggStyle } from "../types/EggStyle"

interface TimerDisplayProps {
  timeLeft: number | null
  isActive: boolean
  selectedEgg: EggStyle | null
}
export const TimerDisplay = ({
  timeLeft,
  isActive,
  selectedEgg,
}: TimerDisplayProps) => {
    const color = selectedEgg?.color;
    const formatTime = (seconds: number | null): string => {
        if (seconds === null) return '00:00'
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    const getStatusText = (): JSX.Element => {
        if (!isActive && timeLeft === 0) return <> Your egg is <span className="font-bold text-purple-600"> Done! </span></>
        if (!isActive && timeLeft === null) return <>Select egg type</>
        if (selectedEgg) return (
          <>
            <div>Cooking <span className="font-bold text-purple-600">{selectedEgg.name}</span> egg </div>
            <span className="flex items-center justify-center font-bold text-yellow-500">{selectedEgg.description}</span>
          </>
        )
        return <></>
    }
    const getEggIcon = () => {
      if (!isActive && timeLeft === null) {
        return(
          <div className="w-30 h-32">
            <img src="/eggs.png"></img>
          </div>
        )
      } else {
        return(
          <div className="w-30 h-32 animate-pulse">
            <img src="/eggs.png"></img>
          </div>
        )
      }
    }
    
    const getProgressBar = () => {
      const calculateProgress = (): number => {
        if (!selectedEgg || !timeLeft) return 0;
        const totalTime = selectedEgg.time;
        return ((totalTime - timeLeft) / totalTime) * 100;
      };

      return(
        <div className="w-100 h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
            <div
              className={`bg-${color}-200 h-full transition-all duration-1000 ease-linear`}
              style={{ width: `${calculateProgress()}%`}}>
              </div>
          </div>
      )
    }

    return (
        <div className="w-full flex flex-col items-center">
        {getEggIcon()}
        <div className="text-6xl font-bold text-gray-800 font-mono tracking-wider">
            {formatTime(timeLeft)}
        </div>
        <>
          {getProgressBar()} 
        </>
        <div className="mt-2 text-lg text-purple-600">{getStatusText()}</div>
        </div>
    )
}
