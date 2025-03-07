import React, { useEffect, useState } from 'react'
import "./manage.css"
import { styled } from '@mui/material/styles';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, InputAdornment, IconButton, Checkbox } from '@mui/material'
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

function ManageActivities({ navigation }) {
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
      endDate: "2024-02-18",
      vendorName: "Default Vendor",
      activityNumber: "1234",
      activityName: "Default Activity",
      activityDesc: "Description here",
      tasks: 10,
      tasksCompleted: 5,
      poDate: "2024-02-10",
      poNumber: "PO-5678",
      poValue: "$1000", // Changed from povalue to poValue for consistency
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
      {/* <div className={isOverlayFiltersActive ? 'modal-overlay' : ''}>
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
                                
                            </div>
                            <div className="row justify-content-center">
                                
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
        </div> */}
      <div className='manageContainer'>
        <h5 className='manage-employee'>Manage Activities</h5>
        <div className="row mt-3">
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-12 mb-3">
                <CustomTextField
                  className='w-100'
                  id="outlined-basic"
                  label="Vendor Name"
                  variant="outlined"
                  autoComplete="off"

                  onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })} />
              </div>
              <div className="col-12 mb-3">
                <CustomTextField
                  className="w-100"
                  id="outlined-basic"
                  label="Activity Name"
                  variant="outlined"
                  autoComplete="off"
                  onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <CustomTextField
                  className="w-100"
                  id="outlined-basic"
                  label="Activity Number"
                  variant="outlined"
                  autoComplete="off"

                  onChange={(e) => setFormData({ ...formData, activityNumber: e.target.value })}
                />
              </div>
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
              <div className="col-12 mb-3">
                <CustomTextField
                  className="w-100"
                  id="outlined-basic"
                  label="PO Number"
                  variant="outlined"
                  autoComplete="off"

                  onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-6 pe-0">
                <p
                  className="mb-0 status-table-padding text-white"
                  style={{
                    background: "#626262",
                    borderBottom: "1px solid #fff",
                  }}
                >
                  <strong>New</strong>
                </p>
              </div>
              <div className="col-6 ps-0">
                <p
                  className="mb-0 status-table-padding"
                  style={{ border: "1px solid #626262" }}
                >
                  10
                </p>
              </div>
              <div className="col-6 pe-0">
                <p
                  className="mb-0 status-table-padding text-white"
                  style={{
                    background: "#626262",
                    borderBottom: "1px solid #fff",
                  }}
                >
                  <strong>Assigned</strong>
                </p>
              </div>
              <div className="col-6 ps-0">
                <p
                  className="mb-0 status-table-padding"
                  style={{
                    borderLeft: "1px solid #626262",
                    borderRight: "1px solid #626262",
                    borderBottom: "1px solid #626262",
                  }}
                >
                  20
                </p>
              </div>
              <div className="col-6 pe-0">
                <p
                  className="mb-0 status-table-padding text-white"
                  style={{
                    background: "#626262",
                    borderBottom: "1px solid #fff",
                  }}
                >
                  <strong>Accepted</strong>
                </p>
              </div>
              <div className="col-6 ps-0">
                <p
                  className="mb-0 status-table-padding"
                  style={{
                    borderLeft: "1px solid #626262",
                    borderRight: "1px solid #626262",
                    borderBottom: "1px solid #626262",
                  }}
                >
                  10
                </p>
              </div>
              <div className="col-6 pe-0">
                <p
                  className="mb-0 status-table-padding text-white"
                  style={{
                    background: "#626262",
                    borderBottom: "1px solid #fff",
                  }}
                >
                  <strong>Rejected</strong>
                </p>
              </div>
              <div className="col-6 ps-0">
                <p
                  className="mb-0 status-table-padding"
                  style={{
                    borderLeft: "1px solid #626262",
                    borderRight: "1px solid #626262",
                    borderBottom: "1px solid #626262",
                  }}
                >
                  20
                </p>
              </div>
              <div className="col-6 pe-0">
                <p
                  className="mb-0 status-table-padding text-white"
                  style={{
                    background: "#626262",
                    borderBottom: "1px solid #fff",
                  }}
                >
                  <strong>Inprogress</strong>
                </p>
              </div>
              <div className="col-6 ps-0">
                <p
                  className="mb-0 status-table-padding"
                  style={{
                    borderLeft: "1px solid #626262",
                    borderRight: "1px solid #626262",
                    borderBottom: "1px solid #626262",
                  }}
                >
                  10
                </p>
              </div>
              <div className="col-6 pe-0">
                <p
                  className="mb-0 status-table-padding text-white"
                  style={{
                    background: "#626262"
                  }}
                >
                  <strong>Dispatched</strong>
                </p>
              </div>
              <div className="col-6 ps-0">
                <p
                  className="mb-0 status-table-padding"
                  style={{
                    borderLeft: "1px solid #626262",
                    borderRight: "1px solid #626262",
                    borderBottom: "1px solid #626262",
                  }}
                >
                  20
                </p>
              </div>
              <div className="col-6 pe-0">
                <p
                  className="mb-0 status-table-padding text-white"
                  style={{
                    background: "#626262"
                  }}
                >
                  <strong>Completed</strong>
                </p>
              </div>
              <div className="col-6 ps-0">
                <p
                  className="mb-0 status-table-padding"
                  style={{
                    borderLeft: "1px solid #626262",
                    borderRight: "1px solid #626262",
                    borderBottom: "1px solid #626262",
                  }}
                >
                  20
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='searchbar-div my-3'>
          <div className='searchbar'>
            {/* <div className="buttonCreate" onClick={handleSubmit}>
                        <button className='create'><Search /> Search</button>
                    </div> */}
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
          <Link to="/app/edit-activity">
            <div className="buttonCreate">
              <button className='create'>+ Edit</button>
            </div>
          </Link>
        </div>
        <div className="card table-card mt-3" style={{ width: "100%" }}>
          <div className="tableContainer activity-table" style={{ overflowX: "auto", maxWidth: "calc(100vw - 360px)" }}>
            <table className="table" style={{ minWidth: "100vw", tableLayout: "auto", paddingInline: '1em' }}>
              <thead>
                <tr>
                  <th className='table-heading'>
                    <div className='d-flex align-items-center'>
                      <input type="checkbox" className='checkboxStyle me-3' />
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
                    <tr key={index} className='table-row-color'>
                      <td>
                        <div className='d-flex align-items-center'>
                          <input type="checkbox" className='checkboxStyle me-3' />
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
    </>
  )
}

export default ManageActivities