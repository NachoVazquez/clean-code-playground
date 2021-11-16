import { Chore } from "./interfaces";

interface ListProps {
  chores: Chore[];
}
export function List({ chores }: ListProps) {
  return (
    <ul>
      {chores.map((chores) => (
        <li key={chores.id}>{chores.title}</li>
      ))}
    </ul>
  );
}
