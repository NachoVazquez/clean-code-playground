import React from "react";

interface Entity {
  id: string;
  completed: boolean;
  title: string;
}

export default function HerculesMission() {
  const [ts, setTs] = React.useState<Entity[]>([]);
  const [ts2, setTs2] = React.useState<Entity[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://niceapi/todos");
      const data: Entity[] = await result.json();
      setTs(data.filter((t) => !t.completed));
      setTs2(data.filter((t) => t.completed));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Chores</h1>
      <div>
        <h2>Pending</h2>
        <ul>
          {ts.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Completed</h2>
        <ul>
          {ts2.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
