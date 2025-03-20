import { useState } from "react";
import { useGetPuppiesQuery } from "../API/index";
import SearchBar from "./SearchBar";

export default function PuppyList({ setSelectedPuppyId }) {
  // TODO: Get data from getPuppies query
  const { data, isLoading, error } = useGetPuppiesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const puppies = data || [];

    // Filter puppies based on search input
    const filteredPuppies = puppies.filter((puppy) =>
        puppy.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (isLoading) return <p>Loading puppies...</p>;
  if (error) return <p>Error loading puppies!</p>;


//   console.log("Full API Response:", data);

  return (
    <article>

         {/*Include the SearchBar Component */}
        <h2>Search</h2>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h2>Roster</h2>
      <ul className="puppies">
        {filteredPuppies.length === 0 ? (
          <p>No matching puppies found.</p>
        ) : (
          filteredPuppies.map((p) => (
            <li key={p.id}>
              <h3>{p.name} #{p.id}</h3>
              <figure>
                <img src={p.imageUrl} alt={p.name} />
              </figure>
              <button onClick={() => setSelectedPuppyId(p.id)}>
                See details
              </button>
            </li>
          ))
        )}
      </ul>
    </article>
  );
}
