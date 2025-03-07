import React, { useEffect, useState } from 'react';

function Table({rows, update, deleteRow, editRoute}) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(rows);
  }, [rows])

  return (
    <div className="tableContainer">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone No.</th>
            <th scope="col">Designation</th>
            <th scope="col">Emp Code</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && (filteredData.length > 0) && filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.phone_number}</td>
                <td>{row.designation}</td>
                <td>{row.emp_code}</td>
                <td>
                  <button className="btn btn-primary px-4 ms-2" onClick={() => {
                    localStorage.setItem('empId', row.id)
                    editRoute();
                  }}>Edit</button>
                  <button className="btn btn-danger px-4 ms-2" onClick={() => {deleteRow(row.id)}}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table> 
    </div>
  );
}

export default Table;
