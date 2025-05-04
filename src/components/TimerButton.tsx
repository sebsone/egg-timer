import { EggStyle } from "../types/EggStyles"

interface TimerButtonProps {
  eggStyle: EggStyle
  onClick: () => void
}

export const TimerButton = ({
  eggStyle,
  onClick,
}: TimerButtonProps) => {
    const {time, color, name, description, tooltipPosition } = eggStyle
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return (
        <div className={`bg-${color}-200 hover:bg-${color}-300 tooltip tooltip-${tooltipPosition} py-4 px-2 rounded-2xl text-center shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400`}>
            <div className="tooltip-content">
                <div className={`animate-bounce text-${color}-400 text-xl`}>{description}</div>
            </div>
            <button
                onClick={onClick}
                >
            <div className="font-bold text-lg">{name}</div>
            <div className="text-sm opacity-75">
                {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            </button>
        </div>
    )
}
