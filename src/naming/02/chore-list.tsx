import React from "react";

interface Chore {
  id: string;
  completed: boolean;
  title: string;
}

export default function ChoreList() {
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
        <ul>
          {uncompletedChores.map((uncompletedChore) => (
            <li key={uncompletedChore.id}>{uncompletedChore.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Completed</h2>
        <ul>
          {completedChores.map((completedChore) => (
            <li key={completedChore.id}>{completedChore.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
