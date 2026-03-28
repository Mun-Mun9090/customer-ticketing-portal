import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import Home from "./components/Home.jsx";
import NewTicket from "./components/NewTicket.jsx";
import ViewTicket from "./components/ViewTicket.jsx";
import Login from "./components/Login.jsx";

import "./App.css";

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);

    const timer = setTimeout(() => {
      try {
        setTickets([
          { id: 1, title: "Login issue", customer: "Rahul", desc: "Cannot login", status: "Open" },
          { id: 2, title: "Payment failed", customer: "Aisha", desc: "Card declined", status: "In Progress" }
        ]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tickets");
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const addTicket = useCallback((ticket) => {
    setTickets(prev => [
      ...prev,
      { ...ticket, id: Date.now(), status: "Open" }
    ]);
  }, []);

  const updateStatus = useCallback((id, status) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status } : t
      )
    );
  }, []);

  // 👇 If not logged in → show login page
  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <>
      <header className="topbar">
        <h2>Customer Support Ticketing Portal</h2>
        <nav aria-label="Main Navigation">
          <Link to="/">Tickets</Link>
          <Link to="/new">New Ticket</Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              marginLeft: "15px",
              padding: "6px 10px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      {loading && (
        <p className="container" role="status">
          Loading tickets...
        </p>
      )}

      {error && (
        <p className="container" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && tickets.length === 0 && (
        <p className="container">
          No tickets available.
        </p>
      )}

      {!loading && !error && (
        <Routes>
          <Route path="/" element={<Home tickets={tickets} />} />
          <Route path="/new" element={<NewTicket addTicket={addTicket} />} />
          <Route
            path="/ticket/:id"
            element={
              <ViewTicket
                tickets={tickets}
                updateStatus={updateStatus}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}