import React from "react";
import { Chore } from "./interfaces";

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
  const optimisticallyCompleteChore = React.useCallback(async () => {
    onChoreCompleted?.(chore.id);

    try {
      await fetch(`/api/chores/${chore.id}/complete`, {
        method: "POST",
      });
    } catch (error) {
      onChoreUncompleted?.(chore.id);
    }
  }, [chore.id, onChoreCompleted, onChoreUncompleted]);

  const optimisticallyUncompleteChore = React.useCallback(async () => {
    onChoreUncompleted?.(chore.id);

    try {
      await fetch(`/api/chores/${chore.id}/uncomplete`, {
        method: "POST",
      });
    } catch (error) {
      onChoreCompleted?.(chore.id);
    }
  }, [chore.id, onChoreCompleted, onChoreUncompleted]);

  const toggleChore = () => {
    if (chore.completed) {
      optimisticallyUncompleteChore();
    } else {
      optimisticallyCompleteChore();
    }
  };

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
