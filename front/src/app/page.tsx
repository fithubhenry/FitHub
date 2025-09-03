
import Image from "next/image";
import { Dumbbell } from "lucide-react";


import ActivityCard from "@/components/Cards/ActivityCard";


export default function Home() {
  return (
    <main>

    <section className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 bg-[#fee600]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center">¡Bienvenido a FitHub!</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-xl">
          Tu plataforma para alcanzar tus objetivos fitness. Descubre planes, rutinas y mucho más.
        </p>
        <button className="px-8 py-4 bg-gray-900 text-white rounded-lg text-lg font-semibold">
          Empezar ahora
        </button>
      </section>
      <section>
        <div className="text-center mt-16 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Nuestras <span className="text-[#fee600]">Actividades</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Descubre una amplia variedad de clases diseñadas para todos los niveles. Desde entrenamientos de alta
            intensidad hasta sesiones de relajación y bienestar.
          </p>
          <input
            type="text"
            placeholder="Buscar actividad..."
            className="mt-6 w-full max-w-md mx-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
          />
        </div>


        <ul className="grid mb-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">

          <li className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-md text-black font-bold text-lg">

            Entrenamiento Funcional
          </li>

          <li className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-md text-black font-bold text-lg">
            Spinning
          </li>

          <li className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-md text-black font-bold text-lg">

            Yoga
          </li>

          <li className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-md text-black font-bold text-lg">

            Pilates
          </li>

          <li className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-md text-black font-bold text-lg">

            Crossfit
          </li>

          <li className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-md text-black font-bold text-lg">

            Zumba
          </li>

          <li className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-md text-black font-bold text-lg">

            Boxeo
          </li>

          <li className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-md text-black font-bold text-lg">

            Estiramientos
          </li>
        </ul>

       <ActivityCard
          id={1}
          title="Clase Funcional"
          description="Entrenamiento de fuerza y resistencia"
          duration="45 min"
          participants={12}
          intensity="Alta"
          icon={Dumbbell}            // componente, NO <Dumbbell />
          image="https://images.unsplash.com/photo-1749640245925-4e31e81c3d38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  // que exista en /public
          />


          
      </section>
    </main>
  );
}
