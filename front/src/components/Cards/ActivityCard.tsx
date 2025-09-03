// "use client"; // solo si vas a manejar estado, onClick, localStorage, etc.

import { Clock, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  participants: number;
  intensity: "Muy Alta" | "Alta" | "Media" | "Baja";
  icon: LucideIcon;   // componente de icono (p.ej. Dumbbell)
  image: string;      // ruta dentro de /public o URL absoluta
}

const intensityStyles: Record<ActivityCardProps["intensity"], string> = {
  "Muy Alta": "bg-red-100 text-red-800",
  "Alta": "bg-orange-100 text-orange-800",
  "Media": "bg-yellow-100 text-yellow-800",
  "Baja": "bg-green-100 text-green-800",
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  duration,
  participants,
  intensity,
  icon: IconComponent,
  image,
}) => {
  return (
    <div className="group rounded-xl border border-border/60 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Imagen + overlay + icono */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
        <div className="absolute top-4 right-4 rounded-full bg-black/60 backdrop-blur-sm p-2">
          {/* 👇 El icono debe ser AUTOCERRADO y sin hijos */}
          <IconComponent className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{participants}</span>
          </div>
        </div>

       <div className="mt-4">
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${intensityStyles[intensity]}`}>
    Intensidad: {intensity}
  </span>
</div>
<button
  type="button"
  className="mt-3 w-full rounded-md bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
>
  Reservar Clase
</button>

      </div>
    </div>
  );
};

export default ActivityCard;

