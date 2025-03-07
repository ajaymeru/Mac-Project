import React, { useEffect } from 'react'
import "./create.css"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
// import { LocalizationProvider } from "@mui/x-date-pickers"
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import { createEmp, getLocations } from '../../../Api';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { compressImg } from '../../../ImageCompressor';

function CreateEmployee() {
    const navigate = useNavigate();
    const [role, setRole] = React.useState(null)
    const [empObj, setEmpObj] = React.useState({
        'name': '',
        'employee_number': '',
        'department': '',
        'designation': '',
        'phone_number': '',
        'email_id': '',
        'store_name': '',
        'store_code': '',
        'reporting_manager': '',
        'mat_id': '',
        'organization_name': '',
        'employee_type': ''
    })

    const submit = async () => {
        
    }

    const fileIp = React.useRef(null);
    const [img, setImg] = React.useState('https://placehold.co/250x250');
    const handleReset = () => {
      if(fileIp.current) {
          fileIp.current.value = "";
          fileIp.current.type = "text";
          fileIp.current.type = "file";
      }
    };
    const handleFile = (event) => {
      console.log(event);
      setImg('https://placehold.co/250x250');
      const file = event.target.files[0];
      console.log('Before compression', file.size)
      let splitfile = file.name;
      let extension = splitfile.split('.').pop();
      if(extension === 'png' || extension === 'PNG' || extension === 'jpg' || extension === 'JPG' || extension === 'jpeg' || extension === 'JPEG') {
          console.log('valid file');
          var reader = new FileReader();
          if(event.target.files[0]){
              reader.readAsDataURL(event.target.files[0]);
              reader.onload = (e)=>{
                  setImg(e.target.result);
              }
              compressImg(event.target.files[0]).then(img => {
                  setEmpObj({...empObj, logo: img});
                  console.log('After compression', img.size)
              });
          }
      }else{
          Swal.fire({
              text: 'Invalid file format. Only .png, .jpg files are allowed',
              icon: 'warning',
              heightAuto: false
          })
          return
      }
    }
    
    useEffect(() => {
        (async () => {
            let userData = JSON.parse(localStorage.getItem('userData') || '{}');
            setRole(userData.role);
        })()
    },[navigate])
    return (
        <div className='employeeContainer'>
            <h5 className='create-employee'>Create Employee</h5>
            <div className="card forms-card">
                <div className="row mb-3 align-items-center">
                    <div className="col-12 col-lg-3 text-center">
                        <h5 className="mb-3"><strong>Profile Pic</strong></h5>
                        <img src={img} alt="" style={{maxHeight: '150px', maxWidth: '100%'}} />
                        <br />
                        <input type="file" accept=".png, .jpg, .jpeg, .webp" hidden ref={fileIp} onClick={handleReset} onChange={(ev) => {handleFile(ev)}} />
                        <button className="btn btn-dark px-4 my-3" onClick={() => {fileIp.current.click();}}>Upload</button>
                    </div>
                        <div className="col-12 col-lg-9">
                            <div className="row">
                                <div className="col-12 col-lg-6 mb-3">
                                    <TextField className='w-100' id="outlined-basic" label="Name" variant="outlined" autoComplete="off" required 
                                        onChange={(ev) => {
                                            setEmpObj({...empObj, name: ev.target.value})
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-lg-6 mb-3">
                                    <TextField className='w-100' id="outlined-basic" label="Employee Number" value={empObj.emp_code || ''} variant="outlined" autoComplete="off" required 
                                        onChange={(ev) => {
                                            let val = ev.target.value.toLowerCase();
                                            let regex = /[^a-zA-Z0-9_-]/gi;
                                            setEmpObj({...empObj, employee_number: val.replace(regex, "")})
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-lg-6 mb-3">
                                    <TextField className='w-100' id="outlined-basic" label="Department" value={empObj.department || ''} variant="outlined" autoComplete="off" required 
                                        onChange={(ev) => {
                                            setEmpObj({...empObj, department: ev.target.value})
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-lg-6 mb-3">
                                    <TextField className='w-100' id="outlined-basic" label="Designation" value={empObj.designation || ''} variant="outlined" autoComplete="off" required 
                                        onChange={(ev) => {
                                            setEmpObj({...empObj, designation: ev.target.value})
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-lg-6 mb-3">
                                    <TextField className='w-100' id="outlined-basic" label="Phone Number" variant="outlined" autoComplete="off" required
                                        onChange={(ev) => {
                                            setEmpObj({...empObj, phone_number: ev.target.value})
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-lg-6 mb-3">
                                    <TextField className='w-100' id="outlined-basic" label="Email" variant="outlined" autoComplete="off" 
                                        onChange={(ev) => {
                                            setEmpObj({...empObj, email: ev.target.value})
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {+role === 2 && <>
                            <div className="col-12 col-lg-4 mb-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Store</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={empObj.store_code}
                                        label="Store"
                                        onChange={(ev) => {
                                            setEmpObj({...empObj, store_code: ev.target.value})
                                        }}
                                    >
                                        <MenuItem value={'1'}>Store 1</MenuItem>
                                        <MenuItem value={'2'}>Store 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <TextField className='w-100' id="outlined-basic" label="Reporting Manager" variant="outlined" autoComplete="off" 
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, reporting_manager: ev.target.value})
                                    }}
                                />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Employee Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={empObj.account_type}
                                        label="Account Type"
                                        onChange={(ev) => {
                                            setEmpObj({...empObj, account_type: ev.target.value})
                                        }}
                                    >
                                        <MenuItem value={'Employee'}>Employee</MenuItem>
                                        <MenuItem value={'Contractor'}>Contractor</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </>}
                    </div>
                <div className="text-center">
                    <button className='btn btn-dark px-4 me-4' onClick={() => {submit()}}>Create</button>
                    <button className='btn btn-danger px-4' onClick={() => {navigate('/app/manage-employees')}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreateEmployee
