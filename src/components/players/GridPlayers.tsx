"use client";

import { usePlayerContext } from "@/context/PlayerContext";
import { PlayerButton } from "./PlayerButton";
import { useState } from "react";



export const GridPlayers = () => {
  const { players }: any = usePlayerContext();
  const [inputValue, setInputValue] = useState("")

  const onInputChange = (event:any) => {
    setInputValue(event.target.value);
  }

  const filterPlayers = (players: any) => {
    if(inputValue==="")return players
    return players.filter((player: any) => player.name.toLowerCase().includes(inputValue))
  };

  const filteredPlayers = filterPlayers(players)

  return (
    <div className="">

      <div className="flex justify-end mb-4">
        <input
          onChange={onInputChange}
          value={inputValue}
          type="text"
          placeholder="Buscador..."
          className="input input-bordered input-accent w-full max-w-xs lg:w-auto mb-2 "
        />

        <button
        onClick={() => setInputValue("")}
         className="btn btn-ghost border-accent hover:border-accent ml-1 text-xl">X</button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
        {filteredPlayers.map((player: any) => (
          <PlayerButton key={player.id} player={player} />
        ))}
        
      </div>
    </div>
  );
};
