import { useParams, useNavigate } from "react-router-dom";

export default function ViewTicket({ tickets, updateStatus }) {

  const { id } = useParams();
  const nav = useNavigate();

  const ticket = tickets.find(t => t.id === Number(id));

  if (!ticket) return <p className="container">Ticket not found</p>;

  return (
    <div className="container">

      <h2>{ticket.title}</h2>
      <p><b>Customer:</b> {ticket.customer}</p>
      <p>{ticket.desc}</p>

      <label htmlFor="status">Update Status</label>
      <select
        id="status"
        value={ticket.status}
        onChange={e => updateStatus(ticket.id, e.target.value)}
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>

      <br /><br />
      <button onClick={() => nav("/")}>Back</button>

    </div>
  );
}