"use client";
import { usePlayerContext } from "@/context/PlayerContext";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";


export const BotForm = () => {

  const{onAddBots}:any=usePlayerContext()

  

  const [bot, setBot] = useState({
    name: "",
    position: "",
    id: new Date().getTime().toString(),
    selected: true,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;

    setBot({
      ...bot,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(bot.position === "")return
    onAddBots(bot)

    setBot({
        name: "",
        position: "",
        id: new Date().getTime().toString(),
        selected: true,
    })

    
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mt-5 flex justify-center   ">
        <div className=" ">
          <div>
            <div>
              <input
                className="input input-accent "
                placeholder="Agregar bot y posición"
                onChange={onChange}
                name="name"
                value={bot.name}
                type="text"
                required
                maxLength={14}
              />
            </div>
          </div>
          <select
          value={bot.position}
          required
          name="position"
          onChange={onChange}
          className="select select-accent w-full mt-2  ">
            <option value="">Posición</option>
            <option value="def">Def</option>
            <option value="med">Med</option>
            <option value="del">Del</option>
          </select>

          <div className="flex justify-center">
            <button className="btn mt-2 btn-accent">Agregar</button>
          </div>
        </div>
      </form>
    </>
  );
};
