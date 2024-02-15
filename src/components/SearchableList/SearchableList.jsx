import { useState, useRef } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [serachTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(serachTerm)
  );

  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults?.map((item, index) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
