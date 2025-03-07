import React from 'react'
import {TextField} from "@mui/material"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function CreateVendorRequest() {
    const navigate = useNavigate();
    const [empObj, setEmpObj] = React.useState({
      name: "",
      company_name: "",
      account_type: "",
      email: "",
      mobile: "",
      gst: "",
      pan: ""
    })

    const submit = () => {
      if(empObj.gst === 'A5000000'){
        Swal.fire({
          text: 'Vendor with same GST already exists',
          icon: 'warning',
          heightAuto: false
        })
      }else if(empObj.pan === 'ER000000'){
        Swal.fire({
          text: 'Vendor with same PAN already exists',
          icon: 'warning',
          heightAuto: false
        })
      }
    }
    
    return (
        <div className='employeeContainer'>
            <h5 className='create-employee'>Create Vendor Request</h5>
            <div className="card forms-card">
                <div className="row mb-3">
                    <div className="col-12 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Company Name" value={empObj.company_name} variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, company_name: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Name" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, name: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Email" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, email: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Phone" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, mobile: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="GST" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, gst: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="PAN" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, pan: ev.target.value})
                            }}
                        />
                    </div>
                </div>
                <div className="text-center">
                  <button className='btn btn-dark px-4 me-4' onClick={() => {submit()}}>Create</button>
                  <button className='btn btn-danger px-4' onClick={() => {}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreateVendorRequest