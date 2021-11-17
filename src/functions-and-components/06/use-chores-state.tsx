import React, { ChangeEvent } from "react";
import { Chore } from "./interfaces";

const useChoresState = () => {
  const [uncompletedChores, setUncompletedChores] = React.useState<Chore[]>([]);
  const [completedChores, setCompletedChores] = React.useState<Chore[]>([]);
  const [filterTerm, setFilterTerm] = React.useState("");

  const search = (searchEvent: ChangeEvent<HTMLInputElement>) => {
    setFilterTerm(searchEvent.currentTarget.value);
  };

  const completeChore = async (choreId: string) => {
    const chore = uncompletedChores.find((chore) => chore.id === choreId);
    if (chore) {
      setUncompletedChores(
        uncompletedChores.filter((chore) => chore.id !== choreId)
      );
      setCompletedChores([...completedChores, chore]);

      try {
        await fetch(`/api/chores/${choreId}/complete`, {
          method: "POST",
        });
      } catch (error) {
        setCompletedChores(
          completedChores.filter((chore) => chore.id !== choreId)
        );
        setUncompletedChores([...uncompletedChores, chore]);
      }
    }
  };

  const uncompleteChore = (choreId: string) => {
    const chore = completedChores.find((chore) => chore.id === choreId);
    if (chore) {
      setCompletedChores(
        completedChores.filter((chore) => chore.id !== choreId)
      );
      setUncompletedChores([...uncompletedChores, chore]);

      try {
        fetch(`/api/chores/${choreId}/uncomplete`, {
          method: "POST",
        });
      } catch (error) {
        setCompletedChores([...completedChores, chore]);
        setUncompletedChores(
          uncompletedChores.filter((chore) => chore.id !== choreId)
        );
      }
    }
  };

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

  React.useEffect(() => {
    const fetchCompletedAndUncompletedChores = async () => {
      const stringifiedChores = await fetch("https://niceapi/todos");
      const completedAndUncompletedChores: Chore[] =
        await stringifiedChores.json();
      setUncompletedChores(
        completedAndUncompletedChores.filter((chore) => !chore.completed)
      );
      setCompletedChores(
        completedAndUncompletedChores.filter((chore) => chore.completed)
      );
    };
    fetchCompletedAndUncompletedChores();
  }, []);

  return {
    search,
    completeChore,
    uncompleteChore,
    filteredUncompletedChoresByTitle,
    filteredCompletedChoresByTitle,
    filterTerm,
  };
};

export default useChoresState;
