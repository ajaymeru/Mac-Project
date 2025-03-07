import React, { useEffect, useState } from 'react'
import "./manage-accounts.css"
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { changeAccountStatus, getAllAccounts } from '../../../../Api';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function ManageVendors({navigation}) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [totalPages, setTotalPages] = useState(null);

    const filteredData = [...tableData].filter(row =>
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


    const editPage = (account_code) => {
        navigate('/admin/edit-vendor/'+account_code);
    }

    const statusChange = async (row) => {
        let apiRes = await changeAccountStatus(row.account_code);
        console.log(apiRes);
        if(apiRes.status === "S"){
          Swal.fire({
            text:  `Account ${row.is_active === 'Y' ? 'deactivated':'activated'} successfully`,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            fetchData();
          })
        }
        if(apiRes.status === 'E' && apiRes.message === "Unauthorized - Missing token"){
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
        if(apiRes.status === 'E' && apiRes.message === "Unauthorized - Invalid token"){
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

    const deleteAcc = (acc_code) => {
      Swal.fire({
        text:  `Are you sure you want to delete the account?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false,
      }).then(async (res) => {
        if(res.isConfirmed){
            // let apiRes = await deleteAccount(acc_code);
            // console.log(apiRes);
            // if(apiRes.status === "S"){
                Swal.fire({
                text:  `Account Deleted`,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
                }).then(() => {
                // fetchData();
                });
            // }
            // if(apiRes.status === 'E' && apiRes.message === "Unauthorized - Missing token"){
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
            // if(apiRes.status === 'E' && apiRes.message === "Unauthorized - Invalid token"){
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
        }
      }) 
    }

    const fetchData = async () => {
        let apiData = await getAllAccounts();
        console.log(apiData);
        apiData.status === "S" ?  setTableData(apiData.result_info) : setTableData([]);
        apiData.status === "S" ? setTotalPages(Math.ceil([...apiData.result_info].length / pageSize)) : setTotalPages(0);
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
            setTableData([
                {id: 1, account_code: 'ac_1', organization_name: 'Reliance', phone: '7685563323', email:'balajikr@gmail.com', person_name: 'Balaji'},
                {id: 2, account_code: 'ac_2', organization_name: 'BigC', phone: '688953263', email:'raven@gmail.com', person_name: 'Raven'}
            ])
            setTotalPages(Math.ceil(2 / pageSize))
            // let apiData = await getAllAccounts();
            // console.log(apiData);
            // apiData.status === "S" ?  setTableData(apiData.result_info) : setTableData([]);
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
    }, [navigate])

    
    return (
        <div className='manageContainer'>
        <h5 className='manage-employee'>Manage Vendors</h5>
            <div className='searchbar-div mb-4'>
                <div className='searchbar'>
                    <TextField id="standard-basic" label="Search" variant="standard" value={searchQuery} onChange={handleSearchChange} />
                </div>
                <Link to="/admin/create-vendor">
                    <div className="buttonCreate">
                        <button className='create'>+ Create</button>
                    </div>
                </Link>
            </div>
            <div className="card table-card">
                <div className="tableContainer accounts-table">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Organization Name</th>
                            <th scope="col">Phone #</th>
                            <th scope="col">Email</th>
                            <th scope="col">Primary Contact Person</th>
                            {/* <th scope="col">Account Code</th> */}
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedData && (paginatedData.length > 0) && paginatedData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.organization_name}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.email}</td>
                                    <td>{row.person_name}</td>
                                    <td>
                                    <button className="btn btn-outline-primary px-4 me-2" onClick={() => {
                                        editPage(row.account_code);
                                    }}>Edit</button>
                                    <button className={row.is_active === 'Y' ? 'btn btn-outline-warning px-4 me-2': 'btn btn-outline-success px-4 me-2'} onClick={() => {
                                        // statusChange(row)
                                        navigate('/admin/approve-vendor')
                                    }}>{row.is_active === 'Y' ? 'Deactivate': 'Activate'}</button>
                                    <button className="btn btn-outline-danger px-3" onClick={() => {}}>Delete</button>
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

export default ManageVendors