import React from "react";
import { Chore } from "../interfaces";

const useChoresState = () => {
  const [uncompletedChores, setUncompletedChores] = React.useState<Chore[]>([]);
  const [completedChores, setCompletedChores] = React.useState<Chore[]>([]);

  const completeChore = async (choreId: string) => {
    const chore = uncompletedChores.find((chore) => chore.id === choreId);

    if (chore) {
      setUncompletedChores(
        uncompletedChores.filter((chore) => chore.id !== choreId)
      );
      setCompletedChores([...completedChores, { ...chore, completed: true }]);
    }
  };

  const uncompleteChore = (choreId: string) => {
    const chore = completedChores.find((chore) => chore.id === choreId);
    if (chore) {
      setCompletedChores(
        completedChores.filter((chore) => chore.id !== choreId)
      );
      setUncompletedChores([
        ...uncompletedChores,
        { ...chore, completed: false },
      ]);
    }
  };

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
    completeChore,
    uncompleteChore,
    uncompletedChores,
    completedChores,
  };
};

export default useChoresState;
