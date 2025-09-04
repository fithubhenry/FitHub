import { preloadClases } from "@/helpers/preloadClases"; 
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
          
        </div>
        
          <div className="grid mb-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {preloadClases.map((clase) => (
            <ActivityCard
              key={clase.id}
              id={clase.id}
              nombre={clase.nombre}
              descripcion={clase.descripcion}
              duracion={clase.duracion}
              participantes={clase.participantes}
              intensidad={clase.intensidad}
              image={`/images/${clase.image}`} // ojo: debe existir la imagen en /public/images
              instructor={""} horario={""} capacidad={0} tipo={"Yoga"} grupo_musculo={"Pierna"} sub_musculo={"biceps"} sede={""}            />
          ))}
        </div>
      </section>


    </main>
  );
}
