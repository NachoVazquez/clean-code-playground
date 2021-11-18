import React from "react";
import { Chore } from "../interfaces";

const useChoreToggle = ({
  chore,
  onChoreCompleted,
  onChoreUncompleted,
}: {
  chore: Chore;
  onChoreCompleted?: (choreId: string) => void;
  onChoreUncompleted?: (choreId: string) => void;
}) => {
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

  const toggleChore = React.useCallback(() => {
    if (chore.completed) {
      optimisticallyUncompleteChore();
    } else {
      optimisticallyCompleteChore();
    }
  }, [
    chore.completed,
    optimisticallyCompleteChore,
    optimisticallyUncompleteChore,
  ]);

  return { toggleChore };
};

export default useChoreToggle;
