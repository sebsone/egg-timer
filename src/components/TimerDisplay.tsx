import { JSX } from "react"
import { EggStyle } from "../types/types"

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
    const formatTime = (seconds: number | null): string => {
        if (seconds === null) return '00:00'
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    const getStatusText = (): JSX.Element => {
        if (!isActive && timeLeft === 0) return <>Done!</>
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
        return (
            <div className="w-24 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-300 rounded-full"></div>
            </div>
        )
        } else {
        return (
            <div className="w-24 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <div className="w-16 h-16 bg-yellow-300 rounded-full"></div>
            </div>
        )
        }
    }
    return (
        <div className="w-full flex flex-col items-center">
        {getEggIcon()}
        <div className="text-6xl font-bold text-gray-800 font-mono tracking-wider">
            {formatTime(timeLeft)}
        </div>
        <div className="mt-2 text-lg text-purple-600">{getStatusText()}</div>
        </div>
    )
}






// Old timer
// <div className="w-64 h-64 mx-auto rounded-full border-8 border-gray-200 flex items-center justify-center">
// <div className="absolute inset-0 rounded-full overflow-hidden">
//     <div 
//     className="bg-yellow-400 h-full transition-all duration-1000"
//     style={{ 
//         width: '100%', 
//         transform: `translateY(${100 - calculateProgress()}%)` 
//     }}
//     ></div>
// </div>
// <div className="z-10">
//     <div className="text-5xl font-bold text-gray-800">{formatTime(timeLeft)}</div>
//     {selectedEgg && (
//     <div className="text-lg text-center text-gray-600 mt-2">{selectedEgg}</div>
//     )}
// </div>
// </div>