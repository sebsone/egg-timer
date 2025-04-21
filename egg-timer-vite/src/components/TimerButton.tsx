import { EggStyle } from "../types/types"

interface TimerButtonProps {
  eggStyle: EggStyle
  onClick: () => void
}

export const TimerButton = ({
  eggStyle,
  onClick,
}: TimerButtonProps) => {
    const {time, color, name } = eggStyle
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return (
        <button
            onClick={onClick}
            className={`${color} py-4 px-2 rounded-2xl text-center shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400`}
        >
        <div className="font-bold text-lg">{name}</div>
        <div className="text-sm opacity-75">
            {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        </button>
    )
}



// Old egg buttons
{/* <div className="grid grid-cols-2 gap-4 mb-6">
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
</div> */}