import { Link } from "react-router-dom";
import React, { memo, useMemo } from "react";

const Badge = memo(function Badge({ status }) {

  const cls =
    status === "Open" ? "badge open" :
    status === "In Progress" ? "badge progress" :
    "badge closed";

  return (
    <span
      className={cls}
      aria-label={`Ticket status is ${status}`}
    >
      {status}
    </span>
  );
});

export default function Home({ tickets }) {

  // Derived state (performance aware)
  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => b.id - a.id);
  }, [tickets]);

  if (!tickets.length) {
    return (
      <p className="container" role="status">
        No tickets found.
      </p>
    );
  }

  return (
    <div className="container">
      <h2>All Tickets</h2>

      {sortedTickets.map(t => (
        <div key={t.id} className="card">
          <div>
            <b>{t.title}</b><br />
            <small>{t.customer}</small>
          </div>

          <div>
            <Badge status={t.status} />
            <br />
            <Link to={`/ticket/${t.id}`}>
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}