import React from "react";
import { ChoreList } from "./chore-list";
import { Chore } from "./interfaces";

export default function Chores() {
  const [uncompletedChores, setUncompletedChores] = React.useState<Chore[]>([]);
  const [completedChores, setCompletedChores] = React.useState<Chore[]>([]);

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

  return (
    <div>
      <h1>Chores</h1>
      <div>
        <h2>Pending</h2>
        <ChoreList chores={uncompletedChores}></ChoreList>
      </div>
      <div>
        <h2>Completed</h2>
        <ChoreList chores={completedChores}></ChoreList>
      </div>
    </div>
  );
}
