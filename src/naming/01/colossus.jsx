import React from "react";

export default function HerculesMission() {
  const [ts, setTs] = React.useState([]);
  const [ts2, setTs2] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://niceapi/todos");
      const data = await result.json();
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
            <li key={t.id}>{t.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Completed</h2>
        <ul>
          {ts2.map((t) => (
            <li key={t.id}>{t.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
