"use client"
import { ProviderCard } from "@/components/ProviderCard";
import SearchBar from "@/components/searchComponent";
import ServicesCard from "@/components/ServicesCard";
import { providers, services } from "@/constants/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";


type SearchProps = {

 filtered:[],
  query:string
}

const SearchResultsPage: FC<SearchProps> = () => {
  const { query } = useParams(); // Use useParams to access query param
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


  console.log(filteredResults)

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <SearchBar />
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
      <ul className="space-y-3 flex gap-5 flex-wrap  shrink-0">
        {filteredResults.map((item) => (
          
          <ProviderCard item={item} />
        ))}
      </ul>
    </div>
  );
};



export default SearchResultsPage;
