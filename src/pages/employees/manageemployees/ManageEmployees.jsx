import React, { useEffect, useState } from 'react'
import "./manage.css"
import { TextField } from '@mui/material'
// import Table from '../../components/table/Table'
import { Link } from 'react-router-dom'
import { getEmployees } from '../../../Api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ManageEmployees({navigation}) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [empData, setEmpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(null);

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
        navigate('/app/edit-employee');
    }

    const deleteEmployee = (account_code, emp_code) => {
        Swal.fire({
          text:  `Are you sure you want to delete the account?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          allowOutsideClick: false,
        }).then(async (res) => {
          if(res.isConfirmed){
            // let apiRes = await deleteEmp(account_code, emp_code);
            // console.log(apiRes);
            // if(apiRes.status === "S"){
              Swal.fire({
                text:  `Employee Deleted`,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              }).then(() => {
                // fetchData();
                setEmpData([])
                setTotalPages(Math.ceil(0 / pageSize))
              });
            // }
          }
        }) 
      }

    const fetchData = async () => {
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        let acc_code = userData.account_code;
        let apiData = await getEmployees(acc_code);
        apiData.status === "S" ?  setEmpData(apiData.result_info) : setEmpData([]);
        apiData.status === "S" ? setTotalPages(Math.ceil([...apiData.result_info].length / pageSize)): setTotalPages(0);
        if(apiData.status === 'F' && apiData.message === "Unauthorized - Missing token"){
            Swal.fire({
                text: "Please login with your credentials",
                icon: 'warning',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                localStorage.clear();
                navigate('/app/login');
            })
        }
        if(apiData.status === 'F' && apiData.message === "Unauthorized - Invalid token"){
            Swal.fire({
                text: "Please login with your credentials",
                icon: 'warning',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                localStorage.clear();
                navigate('/app/login');
            })
        }
    }

    useEffect(() => {
        (async () => {
            setEmpData([
                {emp_id: 1, name: 'Arun', employee_number: '001', department: 'ER', designation: 'Marketing Head', phone_number: '7680891376', email_id: 'arun@gmail.com', store_name: '', store_code: '', reporting_manager: 'Ajay', mat_id: '', organization_name: '', employee_type: 'Employee'},
            ])
            setTotalPages(Math.ceil(1 / pageSize))
            // let userData = JSON.parse(localStorage.getItem('userData') || '{}');
            // let acc_code = userData.account_code;
            // let apiData = await getEmployees(acc_code);
            // apiData.status === "S" ?  setEmpData(apiData.result_info) : setEmpData([]);
            // apiData.status === "S" ? setTotalPages(Math.ceil([...apiData.result_info].length / pageSize)) : setTotalPages(0);
            // if(apiData.status === 'F' && apiData.message === "Unauthorized - Missing token"){
            //     Swal.fire({
            //         text: "Please login with your credentials",
            //         icon: 'warning',
            //         showConfirmButton: false,
            //         timer: 3000
            //     }).then(() => {
            //         localStorage.clear();
            //         navigate('/app/login');
            //     })
            // }
            // if(apiData.status === 'F' && apiData.message === "Unauthorized - Invalid token"){
            //     Swal.fire({
            //         text: "Please login with your credentials",
            //         icon: 'warning',
            //         showConfirmButton: false,
            //         timer: 3000
            //     }).then(() => {
            //         localStorage.clear();
            //         navigate('/app/login');
            //     })
            // }
        })();
    }, [])

    
    return (
        <div className='manageContainer'>
        <h5 className='manage-employee'>Manage Employees</h5>
            <div className='searchbar-div mb-4'>
                <div className='searchbar'>
                    <TextField id="standard-basic" label="Search" variant="standard" value={searchQuery} onChange={handleSearchChange} />
                </div>
                <Link to="/app/create-employee">
                    <div className="buttonCreate">
                        <button className='create'>+ Create</button>
                    </div>
                </Link>
            </div>
            <div className="card table-card">
                <div className="tableContainer emp-table">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Employee Number</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedData && (paginatedData.length > 0) && paginatedData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.employee_number}</td>
                                    <td>{row.phone_number}</td>
                                    <td>{row.designation}</td>
                                    <td>
                                    <button className="btn btn-outline-primary px-4 me-2" onClick={() => {
                                        localStorage.setItem('employee_number', row.employee_number)
                                        editPage();
                                    }}>Edit</button>
                                    <button className="btn btn-outline-danger px-3" onClick={() => {deleteEmployee(row.account_code, row.employee_number)}}>Delete</button>
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
                </div>
                {/* <Table rows={empData} headerCells={headerCells} update={setEmpData} deleteRow={deleteEmployee} editRoute={editPage} /> */}
            </div>
        </div>
    )
}

export default ManageEmployees
