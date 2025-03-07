import React, { useEffect, useState } from 'react'
import "./manage.css"
import { styled } from '@mui/material/styles';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, InputAdornment, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Search } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    width: '100%',
    color: '#000',
    '&.Mui-focused': {
        color: '#000',
    },
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#000', // Set the border color to black
        },
        '&:hover fieldset': {
            borderColor: '#000', // Set the border color to black on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: '#000', // Set the border color to black when focused
        },
    },
    '& .MuiInputLabel-root': {
        color: '#000', // Set the label color to black
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#000', // Keep the label black even when focused
    },
}));
const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000',
    },
}));

function ActivitySummary({ navigation }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [empData, setEmpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const filteredData = [...empData].filter(row =>
        Object.values(row).some(value =>
            value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset current page when the search query changes
    };

    const paginatedData = [...filteredData].slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const nextPage = () => {
        if (currentPage < totalPages) {
            let newPage = currentPage;
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            let newPage = currentPage;
            setCurrentPage(currentPage - 1);
        }
    };

    const editPage = () => {
        navigate('/app/edit-activity');
    }

    const deleteEmployee = (account_code, emp_code) => {
        Swal.fire({
            text: `Are you sure you want to delete?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false,
        }).then(async (res) => {
            // if(res.isConfirmed){
            //     Swal.fire({
            //       text:  `Employee Deleted`,
            //       icon: 'success',
            //       showConfirmButton: false,
            //       timer: 3000
            //     }).then(() => {
            //       setEmpData([])
            //       setTotalPages(Math.ceil(0 / pageSize))
            //     });
            //   // }
            // }
        })
    }

    useEffect(() => {
        (async () => {
            // setEmpData([
            //     {id: 1, title: 'BigC Promo', no_of_tasks: '3', no_of_items: '9', status: 'Approved'},
            //     {id: 1, title: 'Reliance Promo', no_of_tasks: '4', no_of_items: '8', status: 'Pending Approval'},
            // ])
            setEmpData([
                { id: 1, status: 'New', activities: '10' },
                { id: 2, status: 'Assigned ', activities: '20' },
                { id: 3, status: 'Accepted ', activities: '10' },
                { id: 4, status: 'Rejected ', activities: '20' },
                { id: 5, status: 'Inprogress ', activities: '10' },
                { id: 6, status: 'Dispatched ', activities: '20' },
                { id: 6, status: 'Completed ', activities: '20' },
            ])
            setTotalPages(Math.ceil(1 / pageSize))
        })();
    }, [])

    const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);

    const handleOpenFilterModal = () => setIsFilterModalOpen(true);
    const handleCloseFilterModal = () => setIsFilterModalOpen(false);
    const isOverlayFiltersActive = isFilterModalOpen;

    const [formData, setFormData] = useState(null);
    const defaultTableData = [
        {
            endDate: "2025-01-01",
            execution_by: "Vendor",
            vendorName: "Default Vendor",
            execution_captain: "Vendor",
            activityNumber: "1234",
            activityCode: "Ac_1",
            activityName: "Big C Promo",
            activityPeriod: "2025-02-19",
            selectedStatus: "Dispatched",
            remarks: "Default remarks",
            action: "Complete"
        },
        {
            endDate: "2024-02-19",
            execution_by: "Store Team",
            vendorName: "Default Team",
            execution_captain: "Store Team",
            activityNumber: "8765",
            activityCode: "Ac_2",
            activityName: "Activity",
            activityPeriod: "2025-02-19",
            selectedStatus: "Pending",
            remarks: "Default remarks",
            action: "Complete"
        },
    ];

    const [tableData, setTableData] = useState(defaultTableData);

    const handleSubmit = () => {
        const filteredData = defaultTableData.filter(item => {
            if (formData.vendorName && formData.vendorName.trim() !== '') {
                if (!item.vendorName.toLowerCase().includes(formData.vendorName.toLowerCase())) {
                    return false;
                }
            }

            if (formData.activityNumber && formData.activityNumber.trim() !== '') {
                if (!item.activityNumber.includes(formData.activityNumber)) {
                    return false;
                }
            }

            return true;
        });

        // Set the filtered data to be displayed
        setTableData(filteredData);

        handleCloseFilterModal(); // Close modal after submission
    };


    return (
        <>
            <div className={isOverlayFiltersActive ? 'modal-overlay' : ''}>
                {isFilterModalOpen && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered messages" role="document" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <h5 className='activities-filter'>Activities Filter</h5>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-lg-6 mb-3">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Start Date"
                                                    className="cust-violet-input-field date-field w-100 me-3"
                                                    value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
                                                    format="DD-MM-YYYY"
                                                    onChange={(newValue) => {
                                                        if (!newValue) return;
                                                        setStartDate(newValue.format("DD-MM-YYYY"));
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="col-12 col-lg-6 mb-3">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label={"End Date"}
                                                    className="cust-violet-input-field date-field w-100"
                                                    value={endDate ? dayjs(endDate, "DD-MM-YYYY") : null}
                                                    format="DD-MM-YYYY"
                                                    onChange={(newValue) => {
                                                        if (!newValue) return;
                                                        setEndDate(newValue.format("DD-MM-YYYY"));
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-12 mb-3">
                                            <FormControl fullWidth required>
                                                <CustomInputLabel id="demo-multiselect-label">Status</CustomInputLabel>
                                                <CustomSelect
                                                    labelId="status-label"
                                                    id="sttaus-select"

                                                    label="Status"
                                                    value={selectedStatus}
                                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                                >
                                                    <MenuItem value="New">New</MenuItem>
                                                    <MenuItem value="Assigned">Assigned</MenuItem>
                                                    <MenuItem value="Accepted">Accepted</MenuItem>
                                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                                    <MenuItem value="Inprogress">Inprogress</MenuItem>
                                                    <MenuItem value="Dispatched">Dispatched</MenuItem>
                                                    <MenuItem value="Completed">Completed</MenuItem>
                                                </CustomSelect>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-dark px-4 me-4" onClick={handleSubmit}>
                                            Submit
                                        </button>
                                        <button className="btn btn-danger px-4" onClick={handleCloseFilterModal}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='manageContainer'>
                {/* <h5 className='manage-employee'>Manage Activities</h5> */}
                <h5 className='manage-employee'>Activity Summary</h5>
                <div className="row g-0 mt-3">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 pe-0">
                                <p
                                    className="mb-0 p-2 text-white"
                                    style={{
                                        background: "#626262",
                                        borderBottom: "1px solid #fff",
                                    }}
                                >
                                    <strong>Store Code</strong>
                                </p>
                            </div>
                            <div className="col-6 ps-0">
                                <p
                                    className="mb-0 p-2"
                                    style={{ border: "1px solid #626262" }}
                                >
                                    FR01
                                </p>
                            </div>
                            <div className="col-6 pe-0">
                                <p
                                    className="mb-0 p-2 text-white"
                                    style={{
                                        background: "#626262",
                                        borderBottom: "1px solid #fff",
                                    }}
                                >
                                    <strong>Store Name</strong>
                                </p>
                            </div>
                            <div className="col-6 ps-0">
                                <p
                                    className="mb-0 p-2"
                                    style={{
                                        borderLeft: "1px solid #626262",
                                        borderRight: "1px solid #626262",
                                        borderBottom: "1px solid #626262",
                                    }}
                                >
                                    Ameerpet Smart Bazar
                                </p>
                            </div>
                            <div className="col-6 pe-0">
                                <p
                                    className="mb-0 p-2 text-white"
                                    style={{
                                        background: "#626262",
                                        borderBottom: "1px solid #fff",
                                    }}
                                >
                                    <strong>Completed Activities</strong>
                                </p>
                            </div>
                            <div className="col-6 ps-0">
                                <p
                                    className="mb-0 p-2"
                                    style={{
                                        borderLeft: "1px solid #626262",
                                        borderRight: "1px solid #626262",
                                        borderBottom: "1px solid #626262",
                                    }}
                                >
                                    1
                                </p>
                            </div>
                            <div className="col-6 pe-0">
                                <p
                                    className="mb-0 p-2 text-white"
                                    style={{
                                        background: "#626262",
                                        // borderBottom: "1px solid #fff",
                                    }}
                                >
                                    <strong>Pending Activities</strong>
                                </p>
                            </div>
                            <div className="col-6 ps-0">
                                <p
                                    className="mb-0 p-2"
                                    style={{
                                        borderLeft: "1px solid #626262",
                                        borderRight: "1px solid #626262",
                                        borderBottom: "1px solid #626262",
                                    }}
                                >
                                    2
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='searchbar-div my-3'>
                    <div className='searchbar'>
                        <div className="buttonCreate" onClick={handleOpenFilterModal}>
                            <button className='create'><Search /> Search</button>
                        </div>
                    </div>
                    <Link to="/app/create-activity">
                        <div className="buttonCreate">
                            <button className='create'>+ Create</button>
                        </div>
                    </Link>
                </div>
                <div className="card table-card mt-3" style={{ width: "100%" }}>
                    <div className="tableContainer activity-table" style={{ overflowX: "auto", maxWidth: "calc(100vw - 360px)" }}>
                        <table className="table" style={{ minWidth: "100vw", tableLayout: "auto" }}>
                            <thead>
                                <tr>
                                    <th className='table-heading'>Date</th>
                                    <th className='table-heading'>Execution By</th>
                                    <th className='table-heading'>Vendor Name</th>
                                    <th className='table-heading'>Execution Captain</th>
                                    <th className='table-heading'>Activity Number</th>
                                    <th className='table-heading'>Activity Code</th>
                                    <th className='table-heading'>Activity Name</th>
                                    <th className='table-heading'>Activity Period</th>
                                    <th className='table-heading'>Status</th>
                                    <th className='table-heading'>Remarks</th>
                                    <th className='table-heading'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    tableData.map((data, index) => (

                                        <tr className='table-row-color' key={index} onClick={() => { window.location.href = "/app/single-activity" }}>
                                            {/*  */}
                                            <td>{data.endDate}</td>
                                            <td>{data.execution_by}</td>
                                            <td>{data.vendorName}</td>
                                            <td>{data.execution_captain}</td>
                                            <td>{data.activityNumber}</td>
                                            <td>{data.activityCode}</td>
                                            <td>{data.activityName}</td>
                                            <td>{data.activityPeriod}</td>
                                            <td>{data.selectedStatus}</td>
                                            <td>{data.remarks}</td>
                                            <td>{data.action}</td>
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

                {/* <div className="card table-card">
                <div className="tableContainer emp-table">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Activities</th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedData && (paginatedData.length > 0) && paginatedData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.status}</td>
                                    <td>{row.activities}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                     <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">No of Tasks</th>
                            <th scope="col">No of Items</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedData && (paginatedData.length > 0) && paginatedData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.title}</td>
                                    <td>{row.no_of_tasks}</td>
                                    <td>{row.no_of_items}</td>
                                    <td>{row.status}</td>
                                    <td>
                                      <button className="btn btn-light text-primary px-4 me-2" onClick={() => {
                                        editPage();
                                      }}><MdEdit /></button>
                                      <button className="btn btn-light text-dark px-4 me-2" onClick={() => {
                                      }}><MdPresentToAll /></button>
                                      <button className="btn btn-light text-danger px-3" onClick={() => {deleteEmployee(row.account_code, row.employee_number)}}><MdDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>  
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-light me-2" onClick={previousPage} disabled={currentPage === 1}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="btn btn-light ms-2" onClick={nextPage} disabled={currentPage === totalPages}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </Div>
                 <Table rows={empData} headerCells={headerCells} update={setEmpData} deleteRow={deleteEmployee} editRoute={editPage} />
            </div> */}
            </div>
        </>
    )
}

export default ActivitySummary