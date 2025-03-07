import React, { useEffect, useState } from 'react'
import "./manage.css"
import { Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MdCheckCircle} from 'react-icons/md';
import { IoMdCloseCircle, IoMdEye } from 'react-icons/io';

function ManageApprovedTasks({navigation}) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [empData, setEmpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 25;
    const [totalPages, setTotalPages] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

    const filteredData = [...empData].filter(row =>
        Object.values(row).some(value =>
            value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    

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
                        editPage(id); // Pass row data to editPage
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
        { id: 1, activity_name: 'BigC Promo', task_title: 'Task_001', status: 'Approved' },
        { id: 2, activity_name: 'BigC Promo', task_title: 'Task_002', status: 'Approved' },
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

      const [assignType, setAssignType] = React.useState('');
      const [openAssign, setOpenAssign] = React.useState(false);
      const [scrollAssign, setScrollAssign] = React.useState('paper');
      const descriptionAssignElementRef = React.useRef(null);
    
      const handleCloseAssign = () => {
        setOpenAssign(false);
      };
      
      const [openStatus, setOpenStatus] = React.useState(false);
      const [scrollStatus, setScrollStatus] = React.useState('paper');
      const descriptionStatusElementRef = React.useRef(null);
    
      const handleCloseStatus = () => {
        setOpenStatus(false);
      };

    useEffect(() => {
        (async () => {
            setEmpData([
                {id: 1, title: 'BigC Promo', no_of_tasks: '3', no_of_items: '9', status: 'Approved'},
                {id: 1, title: 'Reliance Promo', no_of_tasks: '4', no_of_items: '8', status: 'Pending Approval'},
            ])
            setTotalPages(Math.ceil(1 / pageSize))
        })();
    }, [])

    React.useEffect(() => {
      if (openAssign) {
        const { current: descriptionAssignElement } = descriptionAssignElementRef;
        if (descriptionAssignElement !== null) {
          descriptionAssignElement.focus();
        }
      }
    }, [openAssign]);
    
    React.useEffect(() => {
      if (openStatus) {
        const { current: descriptionStatusElement } = descriptionStatusElementRef;
        if (descriptionStatusElement !== null) {
          descriptionStatusElement.focus();
        }
      }
    }, [openStatus]);

    
    return (
        <div className='manageContainer'>
            <h5 className='manage-employee'>Approved Tasks</h5>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className='searchbar-div mb-4'>
                        <div className='searchbar'>
                            <TextField id="standard-basic" label="Search" variant="standard" value={searchQuery} onChange={() => {}} />
                        </div>
                    </div>
                </div>
                {selectedRows && selectedRows.length > 0 && <div className="col-12 col-lg-6 text-end">
                    <button className="btn btn-dark px-4 py-1 me-3" onClick={() => {setOpenAssign(true)}}>Assign To</button>
                    <button className="btn btn-dark px-4 py-1" onClick={() => {setOpenStatus(true)}}>Change Status</button>
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
            <Dialog className='task-dialog'
              open={openAssign}
              onClose={handleCloseAssign}
              scroll={scrollAssign}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
            <DialogTitle id="scroll-dialog-title"><strong>Assign To</strong></DialogTitle>
            <DialogContent dividers={scrollAssign === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionAssignElementRef}
                tabIndex={-1}
              >
                <div className="row">
                    <div className="col-12 mb-3">
                        <FormControl fullWidth variant="standard" required>
                            <InputLabel>Internal / External</InputLabel>
                            <Select
                                label=""
                                value={assignType}
                                onChange={(ev) => {setAssignType(ev.target.value)}}
                            >
                                <MenuItem value={1}>Internal</MenuItem>
                                <MenuItem value={2}>External</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 mb-3">
                        <FormControl fullWidth variant="standard" required>
                            <InputLabel>{assignType === 1 ? 'Employee' : 'Vendor'}</InputLabel>
                            <Select
                                label="Assign To"
                                onChange={(ev) => {
                                }}
                            >
                                <MenuItem value={1}>{assignType === 1 ? 'Raven' : 'Miller'}</MenuItem>
                                <MenuItem value={2}>{assignType === 1 ? 'Raghav' : 'Arensol'}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* <div className="col-12 mb-3">
                        <TextField className='w-100' multiline rows="3" id="outlined-basic" variant="standard" label="Comments" autoComplete="off" 
                           
                        />
                    </div> */}
                    <div className="col-12 text-center">
                        <button className="btn btn-dark px-3 py-1 me-3" onClick={() => {setOpenAssign(false)}}>Submit</button>
                        <button className="btn btn-danger px-3 py-1" onClick={() => {}}>Cancel</button>
                    </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Dialog className='task-dialog'
              open={openStatus}
              onClose={handleCloseStatus}
              scroll={scrollStatus}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
            <DialogTitle id="scroll-dialog-title"><strong>Change Status</strong></DialogTitle>
            <DialogContent dividers={scrollStatus === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionStatusElementRef}
                tabIndex={-1}
              >
                <div className="row">
                    <div className="col-12 mb-3">
                        <FormControl fullWidth variant="standard" required>
                            <InputLabel>Status</InputLabel>
                            <Select
                                // value={formObj.vendor_id}
                                label="Status"
                                onChange={(ev) => {
                                    // setFormObj({...formObj, vendor_id: ev.target.value})
                                }}
                            >
                                <MenuItem value={1}>Approve</MenuItem>
                                <MenuItem value={2}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 mb-3">
                        <TextField className='w-100' multiline rows="3" id="outlined-basic" variant="standard" label="Comments" autoComplete="off" 
                           
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button className="btn btn-dark px-3 py-1 me-3" onClick={() => {setOpenStatus(false)}}>Submit</button>
                        <button className="btn btn-danger px-3 py-1" onClick={() => {}}>Cancel</button>
                    </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
    )
}

export default ManageApprovedTasks