import React from "react";
import { Chore } from "../interfaces";

const useChoresFilter = ({
  uncompletedChores,
  completedChores,
}: {
  uncompletedChores: Chore[];
  completedChores: Chore[];
}) => {
  const [filterTerm, filterChores] = React.useState("");

  const filteredUncompletedChoresByTitle = React.useMemo(
    () =>
      uncompletedChores.filter((chore) =>
        chore.title.toLowerCase().includes(filterTerm.toLowerCase())
      ),
    [filterTerm, uncompletedChores]
  );

  const filteredCompletedChoresByTitle = React.useMemo(
    () =>
      completedChores.filter((chore) =>
        chore.title.toLowerCase().includes(filterTerm.toLowerCase())
      ),
    [filterTerm, completedChores]
  );

  return {
    filteredUncompletedChoresByTitle,
    filteredCompletedChoresByTitle,
    filterChores,
  };
};

export default useChoresFilter;
