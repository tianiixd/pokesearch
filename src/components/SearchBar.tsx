import type { SearchBarProps } from "../types/SearchBarProps.types";

export default function SearchBar({
  search,
  setSearch,
  onSearch,
  loading,
}: SearchBarProps) {
  const isInputEmpty = search.trim() === "";
  const isDisabled = loading || isInputEmpty;

  return (
    <form onSubmit={onSearch} className="max-w-2xl mx-auto flex gap-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading}
        placeholder="Search by Pokémon name..."
        className="w-full p-3 text-neutral-100 border-2 border-gray-300 rounded-md placeholder-gray-400 outline-none focus:border-sky-500 transition-colors duration-300 ease-in-out font-sans"
      />
      <button
        disabled={isDisabled}
        type="submit"
        className={`text-neutral-100 p-4 px-5 rounded-lg ${isDisabled ? "cursor-not-allowed bg-gray-600 text-neutral-400" : "bg-mist-600 hover:bg-mist-500 cursor-pointer"} transition-all duration-300 ease-in-out text-md font-semibold font-sans`}
      >
        {loading ? "Wait" : "Search"}
      </button>
    </form>
  );
}
