"use client"
import { createContext, useContext, useEffect, useState } from "react"
import  playersMock  from "../dataPlayers.json"

interface PlayerContextProps {
    players:any
    onTogglePlayer:(id:string)=>void
    onAddBots:(bot:any)=>void
    selectedPlayers:any
    team1:any
    team2:any
  }

  interface Player {
    id: string;
    name: string;
    position: string;
    selected: boolean;
  }
  

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined)

export const usePlayerContext = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {

  

    // LISTA DE JUGADORES
    const playersList = playersMock.players.sort((a, b) => a.name.localeCompare(b.name));
    const [players, setPlayers] = useState(playersList);

    // LISTA DE SELECCIONADOS
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

    // TEAM 1
    const [team1, setTeam1] = useState<Player[]>([])
    // TEAM 2
    const [team2, setTeam2] = useState<Player[]>([])

    // FUNCION PARA MARCAR SELECCION
    const onTogglePlayer=(id:string)=>{
      const playerIndex = players.findIndex((player) => player.id === id)
      players[playerIndex].selected = !players[playerIndex].selected
      
        setSelectedPlayers(players.filter((player) => player.selected)) 
    }

    // FUNCION DE CARGA DE BOTS

    const onAddBots = (bot:any) => {
      setPlayers([...players, bot])
    }

    // ACTUALIZO LA LISTA DE BOTS CADA VEZ QUE AGREGAN UNO
    useEffect(() => {
      setSelectedPlayers(players.filter((player) => player.selected))
    }, [players])
    
    
  
    return (
        <PlayerContext.Provider value={{
            players,
            onTogglePlayer,
            onAddBots,
            selectedPlayers,
            team1,
            team2,
        }} >
            {children}
        </PlayerContext.Provider>
    )
}