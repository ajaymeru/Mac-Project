import React, { useState } from 'react';
import "./change-password.scss";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword } from "../../Api";
import Swal from 'sweetalert2';

function ChangePassword() {
    const navigate = useNavigate()
    const [userObj, setUserObj] = useState({oldPassword: "", newPassword: "", confirmPassword: "", account_code: ""});
    const [showPassword, setShowPassword] = useState(false)

    const submit = async() => {
        let formData = {...userObj};
        if(!formData.oldPassword){
          Swal.fire({
            text: 'Old password required!',
            showConfirmButton: false,
            icon: 'warning',
            timer: 3000,
          })
          return;
        }else if(!userObj.newPassword){
          Swal.fire({
            text: 'New password required!',
            showConfirmButton: false,
            icon: 'warning',
            timer: 3000,
          })
          return;
        }else if(userObj.oldPassword === userObj.newPassword){
          Swal.fire({
            text: 'New password should not match with old password!',
            showConfirmButton: false,
            icon: 'warning',
            timer: 3000,
          })
          return;
        }else if(!userObj.confirmPassword){
          Swal.fire({
            text: 'Confirm password required!',
            showConfirmButton: false,
            icon: 'warning',
            timer: 3000,
          })
          return;
        }else if(userObj.confirmPassword !== userObj.newPassword){
          Swal.fire({
            text: 'New password should match with confirm password!',
            showConfirmButton: false,
            icon: 'warning',
            timer: 3000,
          })
          return;
        }else{
          let userData = JSON.parse(localStorage.getItem('userData') || '{}');
          formData.account_code = userData.account_code
          let resData = await changePassword(formData);
          if(resData.status === 'S'){
            Swal.fire({
              text: 'Password changed, Redirecting to Login!',
              showConfirmButton: false,
              icon: 'success',
              timer: 3000,
            }).then(() =>{navigate('/app/login');})
          }else if(resData.status === 'E' && resData.result_code === 404){
              Swal.fire({
                  text: 'User not found',
                  showConfirmButton: false,
                  icon: 'warning',
                  timer: 3000,
              })
              return;
          }else if(resData.status === 'E' && resData.result_code === 401){
              Swal.fire({
                  text: 'Invalid Old password',
                  showConfirmButton: false,
                  icon: 'warning',
                  timer: 3000,
              })
              return;
          }else if(resData.status === 'E' && resData.result_code === 400){
              Swal.fire({
                  text: 'New password and confirm password does not match',
                  showConfirmButton: false,
                  icon: 'warning',
                  timer: 3000
              })
              return;
          }else if(resData.status === 'F' && resData.message === "Unauthorized - Missing token"){
            Swal.fire({
                text: "Please login with your credentials",
                icon: 'warning',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                localStorage.clear();
                navigate('/app/login');
            })
        }else if(resData.status === 'F' && resData.message === "Unauthorized - Invalid token"){
            Swal.fire({
                text: "Please login with your credentials",
                icon: 'warning',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                localStorage.clear();
                navigate('/app/login');
            })
        }else{
            Swal.fire({
              text: JSON.stringify(resData),
              showConfirmButton: false,
              icon: 'warning',
              timer: 3000
            })
            return;
          }
        }
        
    }

    return (
        <div className='loginContainer pwd-screen'>
            <div className="row g-0 h-100 w-100">
                <div className="col-6 d-none d-lg-block">
                    <div className="loginLeft">
                        <h5 className='headingText text-black'>Welcome to Attendlog!</h5>
                        <img src={require('../../assets/app-vec.png')} alt="" className='image' />
                        <p>New generation attendance software <br className='d-none d-lg-block' /> that streamlines the attendance management process</p>
                        <p>Powered by <a href="https://impaxivesolutions.com" className='text-danger text-decoration-none fw-700' target='_blank' rel="noreferrer">Impaxive Solutions</a></p>
                    </div>
                </div>
                <div className="col-12 col-lg-6 h-100">
                    <div className="loginRight h-100">
                        <h5 className='loginText text-white'>Change Password</h5>
                        <TextField 
                            id="outlined-basic"
                            label="Old Password" 
                            variant="outlined" 
                            type={showPassword ? 'text' : 'password'}
                            className='mb-4 cust-white-input-field w-100' 
                            autoComplete='off'
                            onChange={(ev) => {
                                setUserObj({...userObj, oldPassword: ev.target.value})
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
                        />
                        <TextField 
                            id="outlined-basic"
                            label="New Password" 
                            variant="outlined" 
                            type={showPassword ? 'text' : 'password'}
                            className='mb-4 cust-white-input-field w-100' 
                            autoComplete='off'
                            onInput={(ev) => {
                                setUserObj({...userObj, newPassword: ev.target.value})
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
                        />
                        <TextField 
                            id="outlined-basic"
                            label="Confirm Password" 
                            variant="outlined" 
                            type={showPassword ? 'text' : 'password'}
                            className='mb-4 cust-white-input-field w-100' 
                            autoComplete='off'
                            onInput={(ev) => {
                                setUserObj({...userObj, confirmPassword: ev.target.value})
                            }}
                            onKeyDown={(ev) => {
                              if (ev.key === "Enter") {
                                ev.preventDefault();
                                submit();
                              }
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
                        />
                        <div>
                            <button className='btn btn-white px-4 rounded-pill' onClick={submit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default ChangePassword
