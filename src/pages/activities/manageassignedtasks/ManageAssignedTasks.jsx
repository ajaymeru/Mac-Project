import React, { useEffect, useState } from 'react'
import "./manage.css"
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
// import Table from '../../components/table/Table'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { MdDelete, MdEdit, MdPresentToAll } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MdCheckCircle, MdClose, MdDelete, MdEdit, MdPresentToAll } from 'react-icons/md';
import { IoMdCloseCircle, IoMdEye } from 'react-icons/io';

function ManageAssignedTasks({navigation}) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [empData, setEmpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

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
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'activity_name', headerName: 'Activity', width: 250 },
        { field: 'task_title', headerName: 'Task', width: 200 },
        { field: 'status', headerName: 'Status', width: 300 },
        { field: 'actions', headerName: 'Actions', width: 300,
            renderCell: (params) => {
                const { id, activity_name, task_title, status } = params.row; // Access row data
                return (
                  <div className="text-center">
                    <button
                      className="btn btn-light text-primary px-4 me-2"
                      onClick={() => {
                        editPage(id, activity_name, task_title, status); // Pass row data to editPage
                      }}
                    >
                      <IoMdEye />
                    </button>
                    <button
                      className="btn btn-light text-success px-4 me-2"
                      onClick={() => {
                        // Handle Present to All action
                      }}
                    >
                      <MdCheckCircle />
                    </button>
                    <button
                      className="btn btn-light text-danger px-3"
                      onClick={() => {
                        deleteEmployee(id); // Pass row id to deleteEmployee
                      }}
                    >
                      <IoMdCloseCircle />
                    </button>
                  </div>
                );
            }
         }
      ];
      
      const rows = [
        { id: 1, activity_name: 'BigC Promo', task_title: 'Task_001', status: 'Assigned' },
        { id: 2, activity_name: 'BigC Promo', task_title: 'Task_002', status: 'Assigned' },
      ];

      const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
      
      const paginationModel = { page: 0, pageSize: 5 };

    
    const editPage = () => {
        navigate('/app/view-task');
    }

    const deleteEmployee = (account_code, emp_code) => {
        Swal.fire({
          text:  `Are you sure you want to delete?`,
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
            setEmpData([
                {id: 1, title: 'BigC Promo', no_of_tasks: '3', no_of_items: '9', status: 'Approved'},
                {id: 1, title: 'Reliance Promo', no_of_tasks: '4', no_of_items: '8', status: 'Pending Approval'},
            ])
            setTotalPages(Math.ceil(1 / pageSize))
        })();
    }, [])

    
    return (
        <div className='manageContainer'>
        <h5 className='manage-employee'>Assigned Tasks</h5>
            <div className="row">
                <div className="col-12 col-lg-6">
                   <div className="d-flex w-100 mb-4">
                      <TextField id="standard-basic" label="Search" variant="standard" value={searchQuery} onChange={() => {}} />
                      <div className='ms-3'>
                        <FormControl style={{minWidth: 220}} variant="standard" required>
                          <InputLabel>Search by Customer</InputLabel>
                          <Select
                              label="Search by Customer"
                              onChange={(ev) => {
                              }}
                          >
                              <MenuItem value={1}>Customer 1</MenuItem>
                              <MenuItem value={2}>Customer 2</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                   </div>
                </div>
                {selectedRows && selectedRows.length > 0 && <div className="col-12 col-lg-6 text-end">
                    <button className="btn btn-success px-4 py-1 me-3">Approve</button>
                    <button className="btn btn-danger px-4 py-1 me-3">Reject</button>
                </div>}
            </div>
            <div className="card table-card p-0">
                <div className="tableContainer emp-table">
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={(ids) => {
                                setSelectedRows(ids);
                            }}
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </div>
                {/* <Table rows={empData} headerCells={headerCells} update={setEmpData} deleteRow={deleteEmployee} editRoute={editPage} /> */}
            </div>
        </div>
    )
}

export default ManageAssignedTasks