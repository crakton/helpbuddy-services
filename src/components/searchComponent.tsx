"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search/${query}`);
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-2 border border-afruna-blue rounded-md"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-primaryGreen text-white rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
