import { BotForm } from "@/components/bots/BotForm";
import { GridPlayers } from "@/components/players/GridPlayers";
import { NumberOfPlayers } from "@/components/players/NumberOfPlayers";
import { LineSeparator } from "@/components/ui/LineSeparator";
import { Title } from "@/components/ui/Title";

export const metadata = {
  title: "SJD-Armador de equipos",
  description: "Armador de equipos",
};
export default function Home() {

  
  return (
    <div className="px-12 py-8">
      
      <div className="mb-1 flex flex-col items-center lg:flex-row lg:justify-between">

        <div className="flex flex-col items-center sm:flex-row">
        <Title title={"Selecciona jugadores"} />
        <NumberOfPlayers/>
         
        </div>

        
      </div>

      
      <GridPlayers />
      
      <LineSeparator name={"............."} className="mt-5" />

      
        <BotForm />
      

      <LineSeparator name={"............."} className="mt-4" />

      
    </div>
  );
}
