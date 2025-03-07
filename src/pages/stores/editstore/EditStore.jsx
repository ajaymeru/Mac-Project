import React, { useEffect } from 'react'
import "../createstore/create.css"
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function EditStore() {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = React.useState(null);
    const [name, setName] = React.useState('Store Hyderabad');
    const [code, setCode] = React.useState('001');

    const submit = async () => {
        if(!name){
            Swal.fire({
                text: 'Please provide store name',
                showConfirmButton: false,
                icon: 'warning',
                timer: 3000,
            })
        }else if(!code){
            Swal.fire({
                text: 'Please provide store code',
                showConfirmButton: false,
                icon: 'warning',
                timer: 3000,
            })
        }else{
            let data = {
                store_name: name,
                store_code: code
            };
        }
    }

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        setUserInfo(userData);
        console.log(userData);
    }, [])

    return (
        <div className='locationContainer'>
            <h5 className='create-location'>Edit Store</h5>
            <div className="card forms-card">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' value={name} id="outlined-basic" label="Store Name" 
                            onChange={(ev) => {
                                setName(ev.target.value);
                            }} 
                            variant="outlined" 
                            autoComplete="off" 
                            required 
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' value={code}
                            onChange={(ev) => {
                                let regex = /[^a-z0-9_-]/gi;
                                let val = ev.target.value.replace(regex, "")
                                setCode(val.toLowerCase());
                            }} 
                            id="outlined-basic" label="Store Code" variant="outlined" autoComplete="off" required 
                        />
                    </div>
                    <div className="col-12 col-lg-4 mb-3">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Store Format</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Store Format"
                            >
                                <MenuItem value={'Format 1'}>Format 1</MenuItem>
                                <MenuItem value={'Format 2'}>Format 2</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 col-lg-4 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="State" variant="outlined" autoComplete="off" required />
                    </div>
                    <div className="col-12 col-lg-4 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="City" variant="outlined" autoComplete="off" required />
                    </div>
                    <div className="col-12 mb-3">
                        <TextField className='w-100' rows={3} multiline id="outlined-basic" label="Address" variant="outlined" autoComplete="off" />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button className='btn btn-dark px-4 me-4' onClick={() => {submit()}}>Update</button>
                    <button className='btn btn-danger px-4' onClick={() => {navigate('/app/manage-stores')}}>Cancel</button>
                </div>
            </div>
        
        </div>
    )
}

export default EditStore
