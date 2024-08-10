"use client";
import { usePlayerContext } from "@/context/PlayerContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Player {
  id: string;
  name: string;
  position: string;
  selected: boolean;
  onHandleTeam?: boolean;
}

export const Tables = () => {
  const router = useRouter();

  const { selectedPlayers }: any = usePlayerContext();

  // TRAIGO LA LISTA DE JUGADORES LAS GUARDO EN LA VARIABLE PLAYERS
  const [players, setPlayers] = useState<Player[]>([]);

  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);

  // FN PARA DIVIDIR EQUIPOS
  const positionDivider = (players: any) => {
    const defensores = players.filter((e: Player) => e.position === "def");
    const medios = players.filter((e: Player) => e.position === "med");
    const delanteros = players.filter((e: Player) => e.position === "del");

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
    if (defensores.length % 2 === 0 && medios.length % 2 !== 0) {
      const mitad = Math.floor(medios.length / 2);

      const primeraMitad = medios.slice(0, mitad + 1);
      const segundaMitad = medios.slice(mitad + 1);

      setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
    }

    // Tercera parte Defensa par y Medio impar
    if (defensores.length % 2 !== 0 && medios.length % 2 === 0) {
      const mitad = Math.floor(medios.length / 2);

      const primeraMitad = medios.slice(0, mitad);
      const segundaMitad = medios.slice(mitad);

      setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
    }

    // Cuarta parte Defensores y Medios impares
    if (defensores.length % 2 !== 0 && medios.length % 2 !== 0) {
      const mitad = Math.floor(medios.length / 2);

      const primeraMitad = medios.slice(0, mitad + 1);
      const segundaMitad = medios.slice(mitad + 1);

      setTeam1((prevTeam1) => [...prevTeam1, ...segundaMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...primeraMitad]);
    }

    // DELANTEROS

    if (delanteros.length % 2 === 0) {
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

    return true;
  };

  // FN PARA MEZCLAR JUGADORES AL AZAR
  function shuffle(array:[]) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    // Mientras queden elementos a mezclar...
    while (currentIndex !== 0) {
      // Seleccionar un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // Intercambiar el elemento actual con el seleccionado al azar
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


  // ACTUALIZO LA VARIABLE PLAYERS SI NECESITO Y MEZCLO AL AZAR LOS EQUIPOS
  useEffect(() => {
    setPlayers(shuffle(selectedPlayers));
  }, [selectedPlayers]);

  // ACTIVO FN DE DIVISION Y ACTUALIZO
  useEffect(() => {
    positionDivider(players);
  }, [players]);

 


  // FN PARA COPIAR A PORTAPAPELES

  const copylink = (e: any) => {
    const team1Copy = team1.map((e: Player) => e.name);
    const team2Copy = team2.map((e: Player) => e.name);

    const cadenaCopy =
      "--Team 1--" +
      "\n" +
      team1Copy.join("\n") +
      "\n" +
      "\n" +
      "--Team 2--" +
      "\n" +
      team2Copy.join("\n");
    navigator.clipboard.writeText(cadenaCopy);
  };

  const notify = () => toast("Copiado!");

  //Selecciono los jugadores a cambiar
  function onSelectPlayerToChangeTeamUno(id: any) {
    const findIndex = team1.findIndex((player) => player.id === id);
    const playerToChange = team1[findIndex];

    const selected = {
      ...playerToChange,
      onHandleTeam: !playerToChange.onHandleTeam,
    };

    team1[findIndex] = selected;

    router.refresh();
  }

  //Selecciono los jugadores a cambiar
  function onSelectPlayerToChangeTeamDos(id: any) {
    const findIndex = team2.findIndex((player) => player.id === id);
    const playerToChange = team2[findIndex];

    const selected = {
      ...playerToChange,
      onHandleTeam: !playerToChange.onHandleTeam,
    };

    team2[findIndex] = selected;

    router.refresh();
  }

  //FN Para realizar el cambio de equipo
  function onHandleTeamChangeTeamUno() {
    const newTeam2 = team1.filter((player) => player.onHandleTeam);
    const updatedNewTeam2 = newTeam2.map((player) => ({
      ...player,
      onHandleTeam: false,
    }));

    setTeam2((prevTeam2) => [...prevTeam2, ...updatedNewTeam2]);
    setTeam1((prevTeam1) => prevTeam1.filter((player) => !player.onHandleTeam));
  }

  //FN Para realizar el cambio de equipo
  function onHandleTeamChangeTeamDos() {
    const newTeam1 = team2.filter((player) => player.onHandleTeam);
    const updatedNewTeam1 = newTeam1.map((player) => ({
      ...player,
      onHandleTeam: false,
    }));

    setTeam1((prevTeam1) => [...prevTeam1, ...updatedNewTeam1]);
    setTeam2((prevTeam2) => prevTeam2.filter((player) => !player.onHandleTeam));
  }

  const transfer = () => {
    onHandleTeamChangeTeamUno();
    onHandleTeamChangeTeamDos();
  };


  
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-3">
        <button
          onClick={transfer}
          className="btn btn-primary mt-10 flex justify-center mb-5 mr-5"
        >
          {" "}
          {"<< >>"}{" "}
        </button>

        <button
          onClick={copylink}
          className="btn btn-accent  mt-10 flex justify-center mb-5"
        >
          <span onClick={notify}>Copiar</span>
        </button>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>

      <div className="container mx-auto  flex flex-col lg:flex-row mt-2 gap-10 ">
        {/* PRIMERA COLUMNA */}
        <div className="lg:w-1/2 ">
          <table className="min-w-full bg-primary text-primary-content border-2 border-success">
            <thead className="bg-success text-black ">
              <tr>
                <th className="py-2 px-4 border-b border-primary">Jugador</th>
                <th className="py-2 px-4 border-b border-primary">Posición</th>
              </tr>
            </thead>
            <tbody className="text-center cursor-pointer ">
              {team1
                .sort((a, b) => {
                  const order = ["def", "med", "del"];
                  return order.indexOf(a.position) - order.indexOf(b.position);
                })
                .map((jugador: any) => (
                  <tr
                    className={
                      jugador.onHandleTeam
                        ? "border-2 bg-accent "
                        : "bg-primary text-primary-content"
                    }
                    onClick={() => onSelectPlayerToChangeTeamUno(jugador.id)}
                    key={jugador.id}
                  >
                    <td className="py-2 px-4 border-b border-success uppercase ">
                      {jugador.name}
                    </td>
                    <td className="py-2 px-4 border-b border-success uppercase">
                      {jugador.position}
                    </td>
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
            <tbody className="text-center cursor-pointer">
              {team2
                .sort((a, b) => {
                  const order = ["def", "med", "del"];
                  return order.indexOf(a.position) - order.indexOf(b.position);
                })
                .map((jugador: any) => (
                  <tr
                    className={
                      jugador.onHandleTeam
                        ? "border-2  bg-success text-black "
                        : "bg-primary text-primary-content"
                    }
                    onClick={() => onSelectPlayerToChangeTeamDos(jugador.id)}
                    key={jugador.id}
                  >
                    <td className="py-2 px-4 border-b border-accent uppercase">
                      {jugador.name}
                    </td>
                    <td className="py-2 px-4 border-b border-accent uppercase">
                      {jugador.position}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* FIN SEGUNDA COLUMNA */}
      </div>
     
    </div>
  );
};
