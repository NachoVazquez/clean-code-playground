import ChoreItem from "../chore-item/chore-item";
import ChoresSearchBar from "../chores-search-bar/chores-search-bar";
import useChoresState from "./use-chores-state";
import useChoresFilter from "./use-chores-filter";

export default function Chores() {
  const { completeChore, uncompleteChore, completedChores, uncompletedChores } =
    useChoresState();

  const {
    filteredUncompletedChoresByTitle,
    filteredCompletedChoresByTitle,
    filterChores,
  } = useChoresFilter({ completedChores, uncompletedChores });

  return (
    <div>
      <h1>Chores</h1>
      <ChoresSearchBar onSearch={filterChores} />
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
