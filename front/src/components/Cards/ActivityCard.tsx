import { IClase } from "@/types";
import { Clock, Dumbbell, Users } from "lucide-react";
import Link from "next/link";




const intensityStyles: Record<IClase["intensidad"], string> = {
  "muy alta": "bg-red-100 text-black",
  "alta": "bg-orange-100 text-black",
  "media": "bg-yellow-100 text-black",
  "baja": "bg-green-100 text-black",
};

const ActivityCard: React.FC<IClase> = ({
  id,
  nombre,
  descripcion,
  duracion,
  participantes,
  intensidad,
  image,
}) => {
  return (
    <Link href={`/clases/${id}`}>
      <div className="group rounded-xl border border-border/60 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={nombre}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />

        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
              {nombre}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{descripcion}</p>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{duracion}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{participantes}</span>
            </div>
          </div>

          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${intensityStyles[intensidad]}`}>
              Intensidad: {intensidad}
            </span>
          </div>
          <button
            type="button"
            className="mt-3 w-full rounded-md bg-[#fee600] px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-[#fee600] focus:outline-none focus:ring-2 focus:ring-yellow-500/50">
            Reservar Clase
          </button>

        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;

