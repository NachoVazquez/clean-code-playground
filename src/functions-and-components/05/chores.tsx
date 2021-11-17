import React, { ChangeEvent } from "react";

import { Chore } from "./interfaces";

export default function Chores() {
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

  const filterUncompletedChoresByTitle = React.useMemo(
    () =>
      uncompletedChores.filter((chore) =>
        chore.title.toLowerCase().includes(filterTerm.toLowerCase())
      ),
    [filterTerm, uncompletedChores]
  );

  const filterCompletedChoresByTitle = React.useMemo(
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

  return (
    <div>
      <h1>Chores</h1>
      <input
        type="search"
        placeholder="Search"
        value={filterTerm}
        onChange={search}
      />
      <div>
        <h2>Pending</h2>
        <ul>
          {filterUncompletedChoresByTitle.map((chore) => (
            <li key={chore.id}>
              <label>
                <input
                  disabled={chore.completed}
                  type="checkbox"
                  checked={chore.completed}
                  onChange={() => completeChore(chore.id)}
                />
                {chore.title}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Completed</h2>
        <ul>
          {filterCompletedChoresByTitle.map((chore) => (
            <li key={chore.id}>
              <label>
                <input
                  disabled={!chore.completed}
                  type="checkbox"
                  checked={chore.completed}
                  onChange={() => uncompleteChore(chore.id)}
                />
                {chore.title}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
