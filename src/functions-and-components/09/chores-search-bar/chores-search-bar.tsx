import React, { ChangeEvent } from "react";

export default function ChoresSearchBar({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) {
  const [filterTerm, setFilterTerm] = React.useState("");

  const search = (searchEvent: ChangeEvent<HTMLInputElement>) => {
    const term = searchEvent.target.value;
    setFilterTerm(term);
    onSearch(term);
  };

  return (
    <input
      type="search"
      placeholder="Search"
      value={filterTerm}
      onChange={search}
    />
  );
}
