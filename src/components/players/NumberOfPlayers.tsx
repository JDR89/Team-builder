"use client"
import { usePlayerContext } from "@/context/PlayerContext"


export const NumberOfPlayers = () => {
    const{selectedPlayers}:any=usePlayerContext()
  return (
    <span className="text-2xl mb-4 sm:mb-0">{selectedPlayers.length}</span>
  )
}
