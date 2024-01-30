
import { Tables } from "@/components/equipos/Tables";
import { Title } from "@/components/ui/Title";



export const metadata = {
 title: 'Sorteo equipos',
 description: 'Sorteo equipos',
};
export default function SeleccionadosPage() {

  return (
    <div className="px-12 py-8">
      <Title title={"Equipos"} className="flex justify-center md:justify-start" />

      <div>
        <Tables />
      </div>

    </div>
  );
}