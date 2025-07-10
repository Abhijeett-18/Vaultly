export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="p-4 flex justify-end">
      <input
        type="text"
        placeholder="Search for websites"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 rounded bg-orange-50 text-stone-900 font-semibold w-64 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </header>
  );
}
