import React, { useEffect, useState } from "react";
import axios from "axios";
import EntriesTable from "./EntriesTable";
import "./index.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    type: "inward",
    date: "",
    name: "",
    department: "",
    quantity: 0,
    details: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/entries").then((res) => setEntries(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/entries", form);
    const res = await axios.get("http://localhost:5000/api/entries");
    setEntries(res.data);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);
    const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
    const to = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;

    const inDateRange =
      (!from || entryDate >= from) && (!to || entryDate <= to);

    return matchesSearch && inDateRange;
  });

  return (
    <div className="container">
      <h1 className="title">Inward-Outward Management</h1>

      <div className="form-section">
        <label>Type</label>
        <select onChange={(e) => setForm({ ...form, type: e.target.value })} value={form.type}>
          <option value="inward">Inward</option>
          <option value="outward">Outward</option>
        </select>

        <label>Date</label>
        <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} required />

        <label>Name</label>
        <input placeholder="Item Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />

        <label>Department</label>
        <input placeholder="Department" onChange={(e) => setForm({ ...form, department: e.target.value })} required />

        <label>Quantity</label>
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })} required
        />

        <label>Details</label>
        <input placeholder="Details" onChange={(e) => setForm({ ...form, details: e.target.value })} required />

        <button className="submit-btn" onClick={handleSubmit}>Add Entry</button>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="radio-group">
          <label><input type="radio" name="searchBy" value="type" checked={searchBy === "type"} onChange={(e) => setSearchBy(e.target.value)} /> Type</label>
          <label><input type="radio" name="searchBy" value="name" checked={searchBy === "name"} onChange={(e) => setSearchBy(e.target.value)} /> Name</label>
          <label><input type="radio" name="searchBy" value="department" checked={searchBy === "department"} onChange={(e) => setSearchBy(e.target.value)} /> Department</label>
          <label><input type="radio" name="searchBy" value="date" checked={searchBy === "date"} onChange={(e) => setSearchBy(e.target.value)} /> Date</label>
        </div>

        <div className="date-range">
          <label>From Date</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>To Date</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
      </div>

      <EntriesTable entries={filteredEntries} />
    </div>
  );
}

export default App;
