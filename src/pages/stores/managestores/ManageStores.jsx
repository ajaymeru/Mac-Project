import React, { useEffect, useState } from 'react'
import "./manage.css"
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { getLocations } from '../../../Api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ManageStores({navigation}) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [totalPages, setTotalPages] = useState(0);

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

    const deleteLocation = (account_code, location_code) => {
        Swal.fire({
          text:  `Are you sure you want to delete this location?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          allowOutsideClick: false,
        }).then(async (res) => {
          if(res.isConfirmed){
            // let apiRes = await deleteLoc(account_code, location_code);
            // console.log(apiRes);
            // if(apiRes.status === "S"){
              Swal.fire({
                text: 'Location deleted successfully',
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
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        let acc_code = userData.account_code;
        let apiData = await getLocations(acc_code);
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
                {store_id: 1, store_name: 'Store Hyderabad', store_code: '001'},
                {store_id: 2, store_name: 'Store Mumbai', store_code: '002'},
            ])
            setTotalPages(Math.ceil(1 / pageSize))
            // let userData = JSON.parse(localStorage.getItem('userData') || '{}');
            // let acc_code = userData.account_code;
            // let apiData = await getLocations(acc_code);
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
        <h5 className='manage-employee'>Manage Stores</h5>
            <div className='searchbar-div mb-4'>
                <div className='searchbar'>
                    <TextField id="standard-basic" label="Search" variant="standard" value={searchQuery} onChange={handleSearchChange} />
                </div>
                <Link to="/app/create-store">
                    <div className="buttonCreate">
                        <button className='create'>+ Create</button>
                    </div>
                </Link>
            </div>
            <div className="card table-card">
                <div className="tableContainer location-table">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className='table-heading' scope="col">Store Name</th>
                            <th className='table-heading' scope="col">Store Code</th>
                            <th className='table-heading' scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedData && (paginatedData.length > 0) && paginatedData.map((row, index) => (
                                <tr key={index} className='table-row-color'>
                                    <td>{row.store_name}</td>
                                    <td>{row.store_code}</td>
                                    <td>
                                      <button className="btn btn-outline-primary px-3 me-3" onClick={() => {navigate('/app/edit-store')}}>Edit</button>
                                      <button className="btn btn-outline-danger px-3" onClick={() => {deleteLocation(row.account_code, row.location_code)}}>Delete</button>
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
            </div>
        </div>
    )
}

export default ManageStores