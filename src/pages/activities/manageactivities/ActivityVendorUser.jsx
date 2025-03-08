import React, { useState } from 'react'
import "./ActivitySummaryClientCopy.css"
import { IoSearch } from "react-icons/io5";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { TextField, MenuItem } from '@mui/material'; // Import MenuItem for dropdown
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ActivityVendorUser = () => {
    const navigate = useNavigate();

    const statusActivities = [
        // { "status": "New", "count": 10 },
        // { "status": "Assigned", "count": 20 },
        // { "status": "Accepted", "count": 10 },
        // { "status": "Rejected", "count": 20 },
        { "status": "Inprogress", "count": 10 },
        // { "status": "Dispatched", "count": 20 },
        { "status": "Completed", "count": 20 }
    ]

    const searchfields = [
        // { "field": "Store Code", "type": "text", "placeholder": "Enter Store Code" },
        // { "field": "Store Name", "type": "text", "placeholder": "Enter Store Name" },
        { "field": "Status", "type": "dropdown", "placeholder": "Select Status", "options": ["New", "Assigned", "Accepted", "Rejected", "Inprogress", "Dispatched", "Completed"] },
        { "field": "Start Date", "type": "date", "placeholder": "Enter Start Date" },
        { "field": "End Date", "type": "date", "placeholder": "Enter End Date" },
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
            StoreCode: "Store-1234",
            StoreName: "Store Name",
            // ExecutionBy: "Vendor",
            // vendorName: "Default Vendor",
            // ExecutionCaptain: "",
            activityNumber: "1234",
            ActivityCode : "ACT-1234",
            activityName: "Default Activity",
            ActivitiyPeriod : "2024-02-10 to 2024-02-20",
            // activityDesc: "Description here",
            // tasks: 10,
            // tasksCompleted: 5,
            // poDate: "2024-02-10",
            // poNumber: "PO-5678",
            // poValue: "$1000",
            selectedStatus: "Pending",
            // store: "Confirmed",
            remarks: "Default remarks",
            // Action:"complete"
        },
        {
            endDate: "2024-02-20",
            StoreCode: "Store-1234",
            StoreName: "Store Name",
            // ExecutionBy: "Store Team",
            // vendorName: "Vendor",
            // ExecutionCaptain: "",
            activityNumber: "123456",
            ActivityCode : "ACT-1234",
            activityName: "Activity",
            ActivitiyPeriod : "2024-02-10 to 2024-02-20",
            // activityDesc: "Lorem Ipusm",
            // tasks: 20,
            // tasksCompleted: 10,
            // poDate: "2024-02-30",
            // poNumber: "PO-1234",
            // poValue: "$3000", // Changed from povalue to poValue for consistency
            selectedStatus: "In-Progress",
            // store: "Pending",
            remarks: "Lorem",
            // Action:"pending"
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
            <div className="filters-data container d-flex flex-column p-3">
                <div className="row mb-1">
                    <div className="col-12">
                        <h4>Search <IoSearch /> </h4>
                        <div className="row">
                            {searchfields.map((field, index) => (
                                <div key={index} className="col-md-2 mb-1">
                                    <label className="form-label pl-3">{field.field}</label>
                                    {field.type === "dropdown" ? (
                                        <TextField
                                            select
                                            className="form-control"
                                            placeholder={field.placeholder}
                                            variant="standard"
                                            InputProps={{
                                                style: {
                                                    border: '1px solid #ced4da',
                                                    borderRadius: '4px',
                                                }
                                            }}
                                        >
                                            {field.options.map((option, idx) => (
                                                <MenuItem key={idx} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    ) : (
                                        <input type={field.type} className="form-control" placeholder={field.placeholder} />
                                    )}
                                </div>
                            ))}
                            <div className="col-md-2 mb-1 d-flex align-items-end">
                                <button className="btn btn-primary w-100">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h4>Summary</h4>
                        <div className="row">
                            {statusActivities.map((status, index) => (
                                <div key={index} className="col-md-3 mb-2">
                                    <div className="card">
                                        <div className="card-body d-flex justify-content-between status-card-body">
                                            <div>{status.status}</div>
                                            <div>{status.count}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-container px-3">
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
                                    <th className='table-heading'>Store Code</th>
                                    <th className='table-heading'>Store Name</th>   
                                    {/* <th className='table-heading'>Execution By</th>
                                    <th className='table-heading'>Vendor Name</th>
                                    <th className='table-heading'>Execution Captain</th> */}
                                    <th className='table-heading'>Activity Number</th>
                                    <th className='table-heading'>Activity Code</th>
                                    <th className='table-heading'>Activity Name</th>
                                    <th className='table-heading'>Activity Period</th>
                                    {/* <th className='table-heading'>Activity Description</th>
                                    <th className='table-heading'>No Of Tasks</th>
                                    <th className='table-heading'>No of Tasks Completed</th>
                                    <th className='table-heading'>PO Date</th>
                                    <th className='table-heading'>PO Number</th>
                                    <th className='table-heading'>PO Value</th> */}
                                    <th className='table-heading'>Status</th>
                                    {/* <th className='table-heading'>Store Confirmation</th> */}
                                    <th className='table-heading'>Remarks</th>
                                    {/* <th className='table-heading'>Action</th> */}
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
                                            <td>{data.StoreCode}</td>
                                            <td>{data.StoreName}</td>
                                            {/* <td>{data.ExecutionBy}</td>
                                            <td>{data.vendorName}</td>
                                            <td>{data.ExecutionCaptain}</td> */}
                                            <td>{data.activityNumber}</td>
                                            <td>{data.ActivityCode}</td>
                                            <td>{data.activityName}</td>
                                            <td>{data.ActivitiyPeriod}</td>
                                            {/* <td>{data.activityDesc}</td>
                                            <td>{data.tasks}</td>
                                            <td>{data.tasksCompleted}</td>
                                            <td>{data.poDate}</td>
                                            <td>{data.poNumber}</td>
                                            <td>{data.poValue}</td> */}
                                            <td>{data.selectedStatus}</td>
                                            {/* <td>{data.store}</td> */}
                                            <td>{data.remarks}</td>
                                            {/* <td>{data.Action}</td> */}
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

export default ActivityVendorUser