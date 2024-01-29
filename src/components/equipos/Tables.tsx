"use client"
import { usePlayerContext } from "@/context/PlayerContext";
import { useEffect, useState } from "react";

interface Player{
  id:string
  name:string
  position:string
  selected:boolean

}


export const Tables = () => {

  const{selectedPlayers}:any=usePlayerContext()

  // TRAIGO LA LISTA DE JUGADORES LAS GUARDO EN LA VARIABLE PLAYERS
  const [players, setPlayers] = useState<Player[]>([])

  const [team1, setTeam1] = useState<Player[]>([])
  const [team2, setTeam2] = useState<Player[]>([])


  const positionDivider=(players:any)=>{
    const defensores = players.filter((e:Player) => e.position === "def");
    const medios = players.filter((e:Player) => e.position === "med");
    const delanteros = players.filter((e:Player) => e.position === "del")

    // Division de defensores (en caso de ser impar se le suma +1 a team1)
    if (defensores.length % 2 === 0) {
        
      const mitad = Math.floor(defensores.length / 2);

      const primeraMitad = defensores.slice(0, mitad);
      const segundaMitad = defensores.slice(mitad);

      setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
      
    } else {
     
      const mitad = Math.floor(defensores.length / 2);

      const primeraMitad = defensores.slice(0, mitad + 1);
      const segundaMitad = defensores.slice(mitad + 1);

      setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
     
    }

    // Primera parte: divide en dos si son pares y si los defensores son pares
    if (defensores.length % 2 === 0 && medios.length % 2 === 0) {
        
      const mitad = Math.floor(medios.length / 2);

      const primeraMitad = medios.slice(0, mitad);
      const segundaMitad = medios.slice(mitad);

      setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
      
    }

    // Segunda parte da +1 al primer equipo en caso que los defensores hayan sido par y medios impar
  if(defensores.length % 2 === 0 && medios.length % 2 !== 0){
    
    const mitad = Math.floor(medios.length / 2);

    const primeraMitad = medios.slice(0, mitad + 1);
    const segundaMitad = medios.slice(mitad + 1);

    setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
    setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
    
  }

  // Tercera parte Defensa par y Medio impar
  if(defensores.length % 2 !== 0 && medios.length % 2 === 0){
    
    const mitad = Math.floor(medios.length / 2)

    const primeraMitad = medios.slice(0, mitad );
    const segundaMitad = medios.slice(mitad );

    setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
    setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
   
  }

  // Cuarta parte Defensores y Medios impares
  if(defensores.length % 2 !== 0 && medios.length % 2 !== 0){
    
    const mitad = Math.floor(medios.length / 2);

    const primeraMitad = medios.slice(0, mitad + 1);
    const segundaMitad = medios.slice(mitad + 1);
    
    setTeam1((prevTeam1) => [...prevTeam1, ...segundaMitad]);
    setTeam2((prevTeam2) => [...prevTeam2, ...primeraMitad]);
    
  }

  // DELANTEROS

  if(delanteros.length % 2 === 0){
    const mitad = Math.floor(delanteros.length / 2);

    const primeraMitad = delanteros.slice(0, mitad);
    const segundaMitad = delanteros.slice(mitad);

    setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
    setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
  } else {
    const mitad = Math.floor(delanteros.length / 2);

    const primeraMitad = delanteros.slice(0, mitad + 1);
    const segundaMitad = delanteros.slice(mitad + 1);

    setTeam2((prevTeam1) => [...prevTeam1, ...primeraMitad]);
    setTeam1((prevTeam2) => [...prevTeam2, ...segundaMitad]);
  }
  
  return true

}

  // ACTUALIZO LA VARIABLE PLAYERS SI NECESITO
  useEffect(() => {
    setPlayers(selectedPlayers as any[]);
  }, [selectedPlayers]);

  // ACTIVO FN DE DIVISION Y ACTUALIZO
  useEffect(() => {
    positionDivider(players)
  }, [players]);
  

  
  return (
    <div className="container mx-auto  flex flex-col lg:flex-row mt-10 gap-10 ">
      {/* PRIMERA COLUMNA */}
      <div className="lg:w-1/2 ">
        <table className="min-w-full bg-primary text-primary-content border-2 border-success">
          <thead className="bg-success text-black">
            <tr>
            <th className="py-2 px-4 border-b border-primary">Jugador</th>
              <th className="py-2 px-4 border-b border-primary">Posición</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {team1.map((jugador:any) => (
              <tr key={jugador.id}>
                <td className="py-2 px-4 border-b border-success uppercase ">{jugador.name}</td>
                <td className="py-2 px-4 border-b border-success uppercase">{jugador.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* FIN PRIMERA COLUMNA */}

      {/* SEGUNDA COLUMNA */}
      <div className="lg:w-1/2 ">
        <table className="min-w-full bg-primary text-primary-content border-2 border-accent">
          <thead className="bg-accent text-black">
            <tr>
              <th className="py-2 px-4 border-b border-primary ">Jugador</th>
              <th className="py-2 px-4 border-b border-primary">Posición</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {team2.map((jugador:any) => (
              <tr key={jugador.id}>
                <td className="py-2 px-4 border-b border-accent uppercase">{jugador.name}</td>
                <td className="py-2 px-4 border-b border-accent uppercase">{jugador.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* FIN SEGUNDA COLUMNA */}

     
    </div>
  );
};
