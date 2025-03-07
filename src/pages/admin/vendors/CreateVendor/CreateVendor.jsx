import React from 'react'
import "./create-account.css"
import {TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { compressImg } from "../../../../ImageCompressor";
import Swal from "sweetalert2";

function CreateVendor() {
    const navigate = useNavigate();
    const fileIp = React.useRef(null);
    const [img, setImg] = React.useState('https://placehold.co/250x100');
    const [empObj, setEmpObj] = React.useState({
        business_name: "",
        account_type: "",
        client_id: [],
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        account_code: "",
        pic_name: "",
        pic_phone: "",
        pic_email: "",
        validity_start_date: "",
        validity_end_date: "",
        no_of_employees: "",
        no_of_locations: "",
        plan_name: "",
        logo: ""
    })

    const [checked, setChecked] = React.useState(false)

    const handleReset = () => {
        if(fileIp.current) {
            fileIp.current.value = "";
            fileIp.current.type = "text";
            fileIp.current.type = "file";
        }
    };

    const handleFile = (event) => {
        console.log(event);
        setImg('https://placehold.co/250x100');
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

    const options = [
      "Create & Manage Employees",
      "Create & Manage Store Types",
      "Create & Manage Stores",
      "Create & Manage Activities",
      "Create & Manage Tasks",
      "Create & Manage Items",
      "Create & Manage RFQ",
    ];
        
    const [checkedItems, setCheckedItems] = React.useState(
      new Array(options.length).fill(false)
    );
        
    const handleChange = (index) => {
      setCheckedItems((prev) => {
        const updatedChecks = [...prev];
        updatedChecks[index] = !updatedChecks[index];
        return updatedChecks;
      });
    };
    
    return (
        <div className='employeeContainer'>
            <h5 className='create-employee'>Create Vendor</h5>
            <div className="card forms-card">
                <div className="row mb-3">
                    <div className="col-12 text-center">
                        <h5 className="mb-3"><strong>Logo</strong></h5>
                        <img src={img} alt="" style={{maxHeight: '100px', maxWidth: '100%'}} />
                        <br />
                        <input type="file" accept=".png, .jpg, .jpeg, .webp" hidden ref={fileIp} onClick={handleReset} onChange={(ev) => {handleFile(ev)}} />
                        <button className="btn btn-dark px-4 my-3" onClick={() => {fileIp.current.click();}}>Upload</button>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Primary Contact Person" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, primary_contact: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Organization Name" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, business_name: ev.target.value})
                            }}
                        />
                    </div>
                    {/* <div className="col-12 col-lg-6 mb-3">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={empObj.account_type}
                                label="Account Type"
                                onChange={(ev) => {
                                    setEmpObj({...empObj, account_type: ev.target.value})
                                }}
                            >
                                <MenuItem value={'cms'}>CMS</MenuItem>
                                <MenuItem value={'ams'}>AMS</MenuItem>
                                <MenuItem value={'bni'}>BNI</MenuItem>
                            </Select>
                        </FormControl>
                    </div> */}
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Email" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, email: ev.target.value})
                            }}
                        />
                    </div>
                    {/* <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Notification Email" variant="outlined" autoComplete="off" 
                            onChange={(ev) => {
                                setEmpObj({...empObj, notification_email: ev.target.value})
                            }}
                        />
                    </div> */}
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Phone" variant="outlined" autoComplete="off" required 
                            onChange={(ev) => {
                                setEmpObj({...empObj, phone: ev.target.value})
                            }}
                        />
                    </div>
                    {/* <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Website" variant="outlined" autoComplete="off" 
                            onChange={(ev) => {
                                setEmpObj({...empObj, website: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className='w-100' label="Validity Start Date*" onChange={(ev) => {
                                let date = dayjs(ev.$d).format('YYYY-MM-DD');
                                setEmpObj({...empObj, validity_start_date: date})
                            }} />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className='w-100' label="Validity End Date*" onChange={(ev) => {
                                let date = dayjs(ev.$d).format('YYYY-MM-DD');
                                setEmpObj({...empObj, validity_end_date: date})
                            }} />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Account Code" variant="outlined" autoComplete="off" required
                            onChange={(ev) => {
                                setEmpObj({...empObj, account_code: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="City" variant="outlined" autoComplete="off" 
                            onChange={(ev) => {
                                setEmpObj({...empObj, city: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="State" variant="outlined" autoComplete="off" 
                            onChange={(ev) => {
                                setEmpObj({...empObj, state: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="Country" variant="outlined" autoComplete="off" 
                            onChange={(ev) => {
                                setEmpObj({...empObj, country: ev.target.value})
                            }}
                        />
                    </div> */}
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="GST" variant="outlined" autoComplete="off" required 
                            value={empObj.gst || ''}
                            onChange={(ev) => {
                                setEmpObj({...empObj, gst: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" label="PAN" variant="outlined" autoComplete="off" required 
                            value={empObj.pan || ''}
                            onChange={(ev) => {
                                setEmpObj({...empObj, pan: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Client</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={empObj.client_id}
                                label="Client"
                                multiple
                                onChange={(ev) => {
                                    setEmpObj({...empObj, client_id: ev.target.value})
                                }}
                            >
                                <MenuItem value={'Client 1'}>Client 1</MenuItem>
                                <MenuItem value={'Client 2'}>Client 2</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 mb-3">
                        <TextField className='w-100' rows={3} multiline id="outlined-basic" label="Address" variant="outlined" autoComplete="off" 
                            onChange={(ev) => {
                                setEmpObj({...empObj, address: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <h5 className="mb-3"><strong>Select Features</strong></h5>
                        {/* <div className="row">
                            <div className="col-12 col-lg-3 mb-2 check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="secondary"
                                        />
                                    }
                                    label="Create & Manage Employees" // The label (name) next to the checkbox
                                />
                            </div>
                            <div className="col-12 col-lg-3 mb-2 check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="secondary"
                                        />
                                    }
                                    label="Create & Manage Store Types" // The label (name) next to the checkbox
                                />
                            </div>
                            <div className="col-12 col-lg-3 mb-2 check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="secondary"
                                        />
                                    }
                                    label="Create & Manage Stores" // The label (name) next to the checkbox
                                />
                            </div>
                            <div className="col-12 col-lg-3 mb-2 check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="secondary"
                                        />
                                    }
                                    label="Create & Manage Activities" // The label (name) next to the checkbox
                                />
                            </div>
                            <div className="col-12 col-lg-3 mb-2 check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="secondary"
                                        />
                                    }
                                    label="Create & Manage Tasks" // The label (name) next to the checkbox
                                />
                            </div>
                            <div className="col-12 col-lg-3 mb-2 check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="secondary"
                                        />
                                    }
                                    label="Create & Manage Items" // The label (name) next to the checkbox
                                />
                            </div>
                            <div className="col-12 col-lg-3 mb-2 check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="secondary"
                                        />
                                    }
                                    label="Create & Manage RFQ" // The label (name) next to the checkbox
                                />
                            </div>
                        </div> */}
                        <div className="row">
                            {options.map((label, index) => (
                                <div key={index} className="col-12 col-lg-3 mb-2 check-box">
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={checkedItems[index]}
                                        onChange={() => handleChange(index)}
                                        color="secondary"
                                    />
                                    }
                                    label={label}
                                />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-center">
                  <button className='btn btn-dark px-4 me-4' onClick={() => {}}>Create</button>
                  <button className='btn btn-danger px-4' onClick={() => {navigate('/admin/manage-vendors')}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreateVendor
