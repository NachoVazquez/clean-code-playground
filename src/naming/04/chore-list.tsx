import { Chore } from "./interfaces";

interface ChoreListProps {
  chores: Chore[];
}
export function ChoreList({ chores }: ChoreListProps) {
  return (
    <ul>
      {chores.map((chores) => (
        <li key={chores.id}>{chores.title}</li>
      ))}
    </ul>
  );
}
