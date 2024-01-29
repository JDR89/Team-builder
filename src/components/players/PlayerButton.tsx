
import { usePlayerContext } from "@/context/PlayerContext"

interface Player {
    player:{
        name: string
        position: string
        selected: boolean
        id: string
    }
}
export const PlayerButton = ({ player }: Player) => {

   const{onTogglePlayer}:any=usePlayerContext()
    

  return (
    <button
      onClick={() => onTogglePlayer(player.id)}
      key={player.id}
      className={ `text-sm  btn uppercase border border-primary-content hover:border-success ${player.selected ? "btn-success" : ""} `}
    >
      {player.name}
    </button>
  );
};
