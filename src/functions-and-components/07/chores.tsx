import ChoreItem from "./chore-item";
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
            <ChoreItem
              key={chore.id}
              chore={chore}
              onChoreCompleted={completeChore}
            />
          ))}
        </ul>
      </div>
      <div>
        <h2>Completed</h2>
        <ul>
          {filteredCompletedChoresByTitle.map((chore) => (
            <ChoreItem
              key={chore.id}
              chore={chore}
              onChoreUncompleted={uncompleteChore}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
