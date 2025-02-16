"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResultsPage = ({ providers, services }) => {
  const { query } = useParams(); // Use useParams to access query param
  console.log(useParams())
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = [...providers, ...services].filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.location && item.location.toLowerCase().includes(query.toLowerCase()))
        );
      });
      setFilteredResults(filtered);
    }
  }, [query, providers, services]);

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
      <ul className="space-y-3">
        {filteredResults.map((item) => (
          <li key={item.$id} className="p-2 border rounded-md">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {item.serviceCategory || "N/A"} - {item.location}
            </p>
            <p className="text-sm">⭐ {item.rating || "No Ratings"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default SearchResultsPage;
