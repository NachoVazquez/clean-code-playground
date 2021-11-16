import React from "react";

export default function ChoreList() {
  const [uncompletedChores, setUncompletedChores] = React.useState([]);
  const [completedChores, setCompletedChores] = React.useState([]);

  React.useEffect(() => {
    const fetchCompletedAndUncompletedChores = async () => {
      const stringifiedChores = await fetch("https://niceapi/todos");
      const completedAndUncompletedChores = await stringifiedChores.json();
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
            <li key={uncompletedChore.id}>{uncompletedChore.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Completed</h2>
        <ul>
          {completedChores.map((completedChore) => (
            <li key={completedChore.id}>{completedChore.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
