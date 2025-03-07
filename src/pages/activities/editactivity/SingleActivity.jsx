import React, { useState, useRef } from 'react'
import "./editactivity.css"
import {FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useNavigate } from 'react-router-dom';


function SingleActivity() {
    const navigate = useNavigate();
    const [taskObj, setTaskObj] = useState({});
   
    // For Task card management
    const [formObj, setFormObj] = useState({
        title: '',
        vendor_id: 1,
        execution_id: 2,
        description: 'Lorem ipsum dolor sit amet',
        task_title: 'Task 1',
        stores: [],
        activityNumber: '5678',
        activityName: 'Big C Promo',
        poNumber: '1234'
    });
    // For file
    const defaultTableData = [
        {
            endDate: "1",
            vendorName: "FR01",
            activityNumber: "Ameerpet",
            activityName: "Dangler",
            activityDesc: "123095",
            tasks: 'Dangler',
            tasksCompleted: '12',
            poDate: "12",
            poNumber: "100",
            poValue: "100",
            
        },
        {
            endDate: "2",
            vendorName: "FR02",
            activityNumber: "Ameerpet",
            activityName: "Dangler",
            activityDesc: "123095",
            tasks: 'Dangler',
            tasksCompleted: '12',
            poDate: "12",
            poNumber: "100",
            poValue: "100",
            
        },
    ];
    const [tableData, setTableData] = useState(defaultTableData);
    
    const handleSearchChange = (ev, type) => {
        // setSearchQuery(ev.target.value);
        if(type === 'store_name'){
            let newData = defaultTableData.filter((row) => row.vendorName.toLowerCase() === ev.target.value.toLowerCase());
            setTableData(newData)
        }
        
    };
    
    const [fileName, setFileName] = useState("reference.pptx");
    const [dcFileName, setDcFileName] = useState("dc-invoice.pptx");
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : "No file chosen");
    };

        // For Documents
    const docIp = useRef(null);
    const [fileNames, setFileNames] = useState(["commercial-documents.pdf"]); // Default file
             
    const handleDocReset = () => {
        if (docIp.current) {
            docIp.current.value = "";
        }
    };
             
    const handleDoc = (event) => {
        const files = event.target.files;
        let names = [];
      
         Array.from(files).forEach((file) => {
           let extension = file.name.split(".").pop().toLowerCase();
           if (extension === "pdf") {
             names.push(file.name);
           } else {
             alert("Only .pdf files are allowed"); // Replace with SweetAlert if needed
           }
         });
      
         setFileNames((prevNames) => [...prevNames, ...names]);
    };
   
    
    return (
        <div className='employeeContainer'>
            <h5 className='create-employee'>Single Activity</h5>
            <div className="card forms-card">
                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <TextField className='w-100' id="outlined-basic" value={formObj.activityName} variant="standard" label="Activity Name" autoComplete="off" required 
                            onChange={(ev) => {
                                setFormObj({...formObj, activityName: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <TextField className='w-100' id="outlined-basic" variant="standard" value={formObj.activityNumber} disabled label="Activity Number" autoComplete="off" required 
                            onChange={(ev) => {
                                setFormObj({...formObj, activityNumber: ev.target.value})
                            }}
                        />
                    </div>
                </div>    
            </div>  
           
            <div className="task-card">
                <h6 className='items-heading'>Tasks</h6>
                <div className="row justify-conetnt-center">
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField 
                            className='w-100' 
                            // id={`task-number-`} 
                            variant="standard" 
                            disabled 
                            label="Task Number" 
                            autoComplete="off" 
                            required 
                            value={taskObj.taskNumber}
                            onChange={(ev) => {
                                setTaskObj({ ...taskObj, taskNumber: ev.target.value });
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" variant="standard" value={taskObj.taskName || ''} label="Task Name" autoComplete="off" required 
                            onChange={(ev) => {
                                setTaskObj({ ...taskObj, taskName: ev.target.value });
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" variant="standard" value={taskObj.taskName || ''} label="Store Code" autoComplete="off" required 
                            onChange={(ev) => {
                                setTaskObj({ ...taskObj, taskName: ev.target.value });
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <FormControl fullWidth variant="standard" required>
                            <InputLabel>Execution By</InputLabel>
                            <Select
                                value={formObj.execution_id}
                                label="Execution By"
                                onChange={(ev) => {
                                    setFormObj({...formObj, execution_id: ev.target.value})
                                }}
                            >
                                <MenuItem value={1}>Vendor</MenuItem>
                                <MenuItem value={2}>Store Team</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
                            <strong>Execution Reference PPT</strong>
                        </h6>
                        <div className="choose-file-input mt-3">
                            <label className="btn choose-file-btn" htmlFor="pptFileInput">
                            Choose File
                            </label>

                            <input
                            id="pptFileInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange} // Separate handler for PPT
                            />

                            <p
                            className="mb-0 choose-file-name"
                            onClick={() => document.getElementById("pptFileInput").click()}
                            style={{ cursor: "pointer" }}
                            >
                            {fileName || "No file chosen"}
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
                            <strong>Attachements</strong>
                        </h6>
                        <div className="upload-doc-file">
                                <div className="d-flex align-items-center">
                                <label className="btn" id="doc-file" style={{ cursor: "pointer", padding: "0.6rem 1rem" }}>
                                    Choose File
                                    <input
                                    id="docFileInput"
                                    type="file"
                                    accept=".pdf"
                                    hidden
                                    multiple
                                    onChange={handleDoc} // Separate handler for documents
                                    />
                                </label>
                                <p
                                    className="mb-0"
                                    style={{ marginLeft: "10px", cursor: "pointer" }}
                                    onClick={() => document.getElementById("docFileInput").click()}
                                >
                                    {fileNames.length === 0 ? "No file chosen" : fileNames.join(", ")}
                                </p>
                                </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
                            <strong>DC/Invoice</strong>
                        </h6>
                        <div className="choose-file-input mt-3">
                            <label className="btn choose-file-btn" htmlFor="pptFileInput">
                            Choose File
                            </label>

                            <input
                            id="pptFileInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange} // Separate handler for PPT
                            />

                            <p
                            className="mb-0 choose-file-name"
                            onClick={() => document.getElementById("pptFileInput").click()}
                            style={{ cursor: "pointer" }}
                            >
                            {fileName || "No file chosen"}
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" variant="standard" value={taskObj.taskName || ''} label="Docket Number" autoComplete="off" required 
                            onChange={(ev) => {
                                setTaskObj({ ...taskObj, taskName: ev.target.value });
                            }}
                        />
                    </div>
                </div> 
            </div>  
            <div className="card table-card mt-3" style={{ width: "100%" }}>
                <div className="tableContainer activity-table" style={{ overflowX: "auto", maxWidth: "1200px"}}>
                    <table className="table" style={{ minWidth: "1300px", tableLayout: "auto"}}>
                        <thead>
                            <tr>
                                <th>Line No</th>
                                <th>Store / Branch Code</th>
                                <th>Store / Branch Name</th>
                                <th>Element Name </th>
                                <th>Item code </th>
                                <th>Item Description</th>
                                <th>Width (Inches)</th>
                                <th>Height (Inches)</th>
                                <th>Quantity</th>
                                <th>Total SFT</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>                    
                                    <input type="text" placeholder="Search" className='searchInput' onChange={(ev) => {handleSearchChange(ev, 'store_name')}} />
                                </th>
                                <th>                    
                                    <input type="text" placeholder="Search" className='searchInput'  />
                                </th>
                                <th>                    
                                    <input type="text" placeholder="Search" className='searchInput'  />
                                </th>
                                <th>                    
                                    <input type="text" placeholder="Search" className='searchInput'  />
                                </th>
                                
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.endDate}</td>
                                    <td>{data.vendorName}</td>
                                    <td>{data.activityNumber}</td>
                                    <td>{data.activityName}</td>
                                    <td>{data.activityDesc}</td>
                                    <td>{data.tasks}</td>
                                    <td>{data.tasksCompleted}</td>
                                    <td>{data.poDate}</td>
                                    <td>{data.poNumber}</td>
                                    <td>{data.poValue}</td>
                                    
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
                   
                
            <div className="text-center mt-3">
              <button className='btn btn-dark px-4 me-4' onClick={() => {}}>Update</button>
              <button className='btn btn-danger px-4' onClick={() => {navigate('/app/activity-summary')}}>Cancel</button>
            </div>
            </div>
        // </div>
    )
}

export default SingleActivity

