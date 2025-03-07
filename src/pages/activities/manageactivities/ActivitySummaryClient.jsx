import React, { useState } from 'react'
import "./ActivitySummaryClient.css"
import { IoSearch } from "react-icons/io5";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const ActivitySummaryClient = () => {
   const navigate = useNavigate();

    const statusActivities = [
        { "status": "New", "count": 10 },
        { "status": "Assigned", "count": 20 },
        { "status": "Accepted", "count": 10 },
        { "status": "Rejected", "count": 20 },
        { "status": "Inprogress", "count": 10 },
        { "status": "Dispatched", "count": 20 },
        { "status": "Completed", "count": 20 }
    ]

    const searchfields = [
        { "field": "Vendor Name", "type": "text", "placeholder": "Enter Vendor Name" },
        { "field": "Activity Name", "type": "text", "placeholder": "Enter Activity Name" },
        { "field": "Activity Number", "type": "text", "placeholder": "Enter Activity Number" },
        { "field": "Status", "type": "text", "placeholder": "Enter Status" },
        { "field": "PO Number", "type": "text", "placeholder": "Enter PO Number" }
    ]

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const exportData = () => {
        const workSheet = XLSX.utils.json_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, workSheet, 'Activities');
        XLSX.writeFile(workbook, 'Activities.xlsx');
    }

    const defaultTableData = [
        {
            endDate: "2024-02-18",
            vendorName: "Default Vendor",
            activityNumber: "1234",
            activityName: "Default Activity",
            activityDesc: "Description here",
            tasks: 10,
            tasksCompleted: 5,
            poDate: "2024-02-10",
            poNumber: "PO-5678",
            poValue: "$1000",
            selectedStatus: "Pending",
            store: "Confirmed",
            remarks: "Default remarks"
        },
        {
            endDate: "2024-02-20",
            vendorName: "Vendor",
            activityNumber: "123456",
            activityName: "Activity",
            activityDesc: "Lorem Ipusm",
            tasks: 20,
            tasksCompleted: 10,
            poDate: "2024-02-30",
            poNumber: "PO-1234",
            poValue: "$3000", // Changed from povalue to poValue for consistency
            selectedStatus: "In-Progress",
            store: "Pending",
            remarks: "Lorem"
        }
    ];

    const [tableData, setTableData] = useState(defaultTableData);

      const [selectedRows, setSelectedRows] = useState([]);
    
      const handleSelectAll = (event) => {
        if (event.target.checked) {
          const allRowIds = tableData.map((data, index) => index);
          setSelectedRows(allRowIds);
        } else {
          setSelectedRows([]);
        }
      };
    
      const handleRowSelect = (index) => {
        setSelectedRows((prevSelectedRows) => {
          if (prevSelectedRows.includes(index)) {
            return prevSelectedRows.filter((rowIndex) => rowIndex !== index);
          } else {
            return [...prevSelectedRows, index];
          }
        });
      };

    return (
        <div className='ActivitySummaryClient'>
            <div className="filters-data">
                <div className="filters">
                    <h4 >Search Bar <IoSearch /> </h4>
                    {searchfields.map((field, index) => {
                        return (
                            <div key={index} className="field">
                                <label>{field.field}</label>
                                <input type={field.type} placeholder={field.placeholder} />
                            </div>
                        )
                    })}
                </div>
                <div className="data">
                    <h4>Summary</h4>
                    {statusActivities.map((status, index) => {
                        return (
                            <div key={index} className="status">
                                <div className="status-name">{status.status}</div>
                                <div className="status-count">{status.count}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="table-container  px-3">
                <div className="searchbar-div my-3">
                    <div className="buttonCreate">
                        <button className='create' onClick={exportData}>Export</button>
                    </div>
                    <div className="d-flex align-items-center">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="standard"
                                label="Start Date"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                    if (!newValue) return;
                                    setStartDate(newValue.format("DD-MM-YYYY"));
                                }}
                                slots={{ textField: TextField }}
                                // Use slots for TextField
                                slotProps={{
                                    textField: {
                                        variant: "standard",
                                        className: "cust-violet-input-field date-field w-100 me-3"
                                    }
                                }}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="standard"
                                label="End Date"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={endDate ? dayjs(endDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                    if (!newValue) return;
                                    setEndDate(newValue.format("DD-MM-YYYY"));
                                }}
                                slots={{ textField: TextField }}
                                // Use slots for TextField
                                slotProps={{
                                    textField: {
                                        variant: "standard",
                                        className: "cust-violet-input-field date-field w-100 me-3"
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="card table-card mt-3" style={{ width: "100%" }}>
                    <div className="tableContainer activity-table" style={{ overflowX: "auto", maxWidth: "calc(100vw - 360px)" }}>
                        <table className="table" style={{ minWidth: "100vw", tableLayout: "auto", paddingInline: '1em' }}>
                            <thead>
                                <tr>
                                    <th className='table-heading'>
                                        <div className='d-flex align-items-center'>
                                            <input
                                                type="checkbox"
                                                className='checkboxStyle me-3'
                                                checked={selectedRows.length === tableData.length}
                                                onChange={handleSelectAll}
                                            />
                                            Date
                                        </div>

                                    </th>
                                    <th className='table-heading'>Vendor Name</th>
                                    <th className='table-heading'>Activity Number</th>
                                    <th className='table-heading'>Activity Name</th>
                                    <th className='table-heading'>Activity Description</th>
                                    <th className='table-heading'>No Of Tasks</th>
                                    <th className='table-heading'>No of Tasks Completed</th>
                                    <th className='table-heading'>PO Date</th>
                                    <th className='table-heading'>PO Number</th>
                                    <th className='table-heading'>PO Value</th>
                                    <th className='table-heading'>Status</th>
                                    <th className='table-heading'>Store Confirmation</th>
                                    <th className='table-heading'>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    tableData.map((data, index) => (
                                        <tr key={index} className='table-row-color' onClick={() => navigate('/app/edit-activity')} >
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <input
                                                        type="checkbox"
                                                        className='checkboxStyle me-3'
                                                        checked={selectedRows.includes(index)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={(e) => {
                                                            handleRowSelect(index);
                                                        }}
                                                    />
                                                    {data.endDate}
                                                </div>
                                            </td>
                                            <td>{data.vendorName}</td>
                                            <td>{data.activityNumber}</td>
                                            <td>{data.activityName}</td>
                                            <td>{data.activityDesc}</td>
                                            <td>{data.tasks}</td>
                                            <td>{data.tasksCompleted}</td>
                                            <td>{data.poDate}</td>
                                            <td>{data.poNumber}</td>
                                            <td>{data.poValue}</td>
                                            <td>{data.selectedStatus}</td>
                                            <td>{data.store}</td>
                                            <td>{data.remarks}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="13" className="text-center">No records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivitySummaryClient