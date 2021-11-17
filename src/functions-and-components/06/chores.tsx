import useChoresState from "./use-chores-state";

export default function Chores() {
  const {
    search,
    completeChore,
    uncompleteChore,
    filteredUncompletedChoresByTitle,
    filteredCompletedChoresByTitle,
    filterTerm,
  } = useChoresState();

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
          {filteredUncompletedChoresByTitle.map((chore) => (
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
          {filteredCompletedChoresByTitle.map((chore) => (
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
