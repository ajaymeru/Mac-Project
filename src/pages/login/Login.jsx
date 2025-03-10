import React, { useState } from 'react';
import "./login.css";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { 
    // Link, 
    useNavigate } from 'react-router-dom';
// import { loginApi } from "../../Api";
import Swal from 'sweetalert2';

function Login() {
    const navigate = useNavigate()
    const [userObj, setUserObj] = useState({email: "",password: ""});
    const [showPassword, setShowPassword] = useState(false)

    const submit = async() => {
        let formData = {...userObj};
        formData.email = formData.email.toLowerCase();
        let emalval = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
        let pwd = new RegExp('^[a-zA-Z0-9.@]+$');
        if(!formData.email){
            Swal.fire({
                text: 'Email required!',
                icon: 'warning',
                showConfirmButton: false,
                heightAuto: false,
                timer: 1500
            });
        }else if(!emalval.test(formData.email)){
            Swal.fire({
                text: 'Please enter valid Email',
                icon: 'warning',
                showConfirmButton: false,
                heightAuto: false,
                timer: 1500
            });
        }else if(!formData.password){
            Swal.fire({
                text: 'Please provide password!',
                icon: 'warning',
                showConfirmButton: false,
                heightAuto: false,
                timer: 1500
            });
        }else if(!pwd.test(formData.password)){
            Swal.fire({
                text: 'Enter valid Password',
                icon: 'warning',
                showConfirmButton: false,
                heightAuto: false,
                timer: 1500
            });
        }else{
            if(formData.email === 'admin@gmail.com' && formData.password === '123456'){
                navigate('/admin/manage-clients');
                localStorage.setItem('userData', JSON.stringify({email: formData.email, role: 1, username: 'Admin'}));
                return;
            }else if(formData.email === 'client@gmail.com' && formData.password === '123456'){
                navigate('/app/manage-activitie');
                localStorage.setItem('userData', JSON.stringify({email: formData.email, role: 2, username: 'Client'}));
                return;
            }else if(formData.email === 'vendor@gmail.com' && formData.password === '123456'){
                navigate('/app/manage-assignedtasks');
                localStorage.setItem('userData', JSON.stringify({email: formData.email, role: 3, username: 'Vendor'}));
                return;
            }else{
                Swal.fire({
                    text: 'Invalid Credentials',
                    showConfirmButton: false,
                    icon: 'warning',
                    timer: 3000,
                })
                return;
            }
            // let loginData = await loginApi(formData);
            // if(loginData.status === 'S'){
            //     localStorage.setItem('userData', JSON.stringify(loginData.result_info));
            //     localStorage.setItem('token', JSON.stringify(loginData.token));
            //     if(loginData.result_info.is_first_time_login === 'Y'){
            //         navigate('/app/change-password');
            //         return;
            //     }
            //     if(loginData.result_info.is_first_time_login === 'N' && loginData.result_info.role == 1){
            //         navigate('/admin/manage-clients');
            //         return;
            //     }else{
            //         navigate('/app/manage-employees');
            //         return;
            //     }  
            // }else if(loginData.status === 'E' && loginData.result_code === 401){
            //     Swal.fire({
            //         text: 'Invalid Credentials',
            //         showConfirmButton: false,
            //         icon: 'warning',
            //         timer: 3000,
            //     })
            //     return;
            // }else if(loginData.status === 'E' && loginData.result_code === 402){
            //     Swal.fire({
            //         text: 'Invalid Credentials',
            //         showConfirmButton: false,
            //         icon: 'warning',
            //         timer: 3000
            //     })
            //     return;
            // }else if(loginData.status === 'E' && loginData.result_code === 404){
            //     Swal.fire({
            //         text: 'Invalid Credentials',
            //         showConfirmButton: false,
            //         icon: 'warning',
            //         timer: 3000
            //     })
            //     return;
            // }else if(loginData.status === 'E' && loginData.result_code === 202){
            //     Swal.fire({
            //         text: 'Account validity expired!',
            //         showConfirmButton: false,
            //         icon: 'warning',
            //         timer: 3000
            //     })
            //     return;
            // }else{
            //     Swal.fire({
            //         text: JSON.stringify(loginData),
            //         showConfirmButton: false,
            //         icon: 'warning',
            //         timer: 3000
            //     })
            //     return;
            // }
        }
    }

    return (
        <div className='loginContainer login-page'>
            <div className="row g-0 h-100 w-100">
                <div className="col-6 d-none d-lg-block">
                    <div className="loginLeft">
                        <h5 className='headingText'>Welcome to NIXA!</h5>
                        <img src={require('../../assets/app-vec.png')} alt="" className='image' />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br /> Corrupti reprehenderit natus nulla.</p>
                        {/* <p>Powered by <a href="https://impaxivesolutions.com" className='text-danger text-decoration-none' target='_blank' rel="noreferrer">Impaxive Solutions</a></p> */}
                    </div>
                </div>
                <div className="col-12 col-lg-6 h-100">
                    <div className="loginRight h-100">
                        <h5 className='loginText text-white'>Login to your Account</h5>
                        <TextField 
                            id="outlined-basic"
                            label="Email Address" 
                            variant="outlined" 
                            className='mb-4 cust-white-input-field'
                            autoComplete='off'
                            onChange={(ev) => {
                                setUserObj({...userObj, email: ev.target.value})
                            }}
                        />
                        <TextField 
                            id="outlined-basic"
                            label="Password" 
                            variant="outlined" 
                            className='mb-4 cust-white-input-field' 
                            autoComplete='off'
                            type={showPassword ? 'text' : 'password'}
                            onInput={(ev) => {
                                setUserObj({...userObj, password: ev.target.value})
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton className='text-white'
                                        aria-label="toggle password visibility"
                                        onClick={() => {setShowPassword(!showPassword)}}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                            onKeyDown={(ev) => {
                                if (ev.key === "Enter") {
                                ev.preventDefault();
                                submit();
                              }}
                            }
                        />
                        <div>
                            <button className='btn btn-white px-4 rounded-pill' onClick={submit}>Login</button>
                        </div>
                        <div className="text-center mt-3">
                            <button className='btn btn-light' onClick={() => {navigate('/app/forgot-password')}}>Forgot password?</button>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Login
