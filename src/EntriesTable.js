import React from "react";
import "./index.css";

function EntriesTable({ entries }) {
  return (
    <div className="table-container">
      <table className="entry-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Name</th>
            <th>Department</th>
            <th>Quantity</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.type}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.name}</td>
              <td>{entry.department}</td>
              <td>{entry.quantity}</td>
              <td>{entry.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntriesTable;
