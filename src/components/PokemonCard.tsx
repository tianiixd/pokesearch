// src/components/PokemonCard.tsx
import type { PokemonData } from "../types/pokemon.types";

interface PokemonCardProps {
  pokemon: PokemonData;
}

const typeColors: Record<string, string> = {
  fire: "bg-orange-500",
  grass: "bg-green-500",
  water: "bg-blue-500",
  bug: "bg-lime-500",
  normal: "bg-slate-400",
  poison: "bg-purple-500",
  electric: "bg-yellow-400",
  ground: "bg-amber-600",
  fairy: "bg-pink-400",
  fighting: "bg-red-700",
  psychic: "bg-pink-600",
  rock: "bg-stone-600",
  ghost: "bg-indigo-700",
  ice: "bg-cyan-400",
  dragon: "bg-violet-600",
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="max-w-sm mx-auto bg-slate-800 border-2 border-slate-600 rounded-3xl overflow-hidden shadow-2xl transform transition-all hover:scale-105 duration-300">
      {/* Header with Name */}
      <div className="p-6 text-center">
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter font-retro">
          {pokemon.name}
        </h3>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square bg-slate-900 mx-6 rounded-2xl border-b-4 border-slate-700 flex items-center justify-center p-4">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Types Section */}
      <div className="p-6 flex justify-center gap-3">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`${
              typeColors[t.type.name] || "bg-slate-500"
            } px-4 py-3 rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-md`}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
