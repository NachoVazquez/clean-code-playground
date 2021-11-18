import { Chore } from "../interfaces";
import useChoreToggle from "./use-chore-toggle";

export interface ChoreProps {
  chore: Chore;
  onChoreCompleted?: (choreId: string) => void;
  onChoreUncompleted?: (choreId: string) => void;
}
export default function ChoreItem({
  chore,
  onChoreCompleted,
  onChoreUncompleted,
}: ChoreProps) {
  const { toggleChore } = useChoreToggle({
    chore,
    onChoreCompleted,
    onChoreUncompleted,
  });

  return (
    <li key={chore.id}>
      <label>
        <input
          type="checkbox"
          checked={chore.completed}
          onChange={toggleChore}
        />
        {chore.title}
      </label>
    </li>
  );
}
