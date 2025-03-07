import React, { useState } from 'react';
import "./forgot-password.scss";
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from "../../Api";
import Swal from 'sweetalert2';

function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");

    const submit = async() => {
        Swal.fire({
            html: `<img src="../loader.gif" style="width: 50px" alt="loader">`,
            showConfirmButton: false,
            heightAuto: false,
            customClass: {popup: 'loader-swal'}
        });
        let formData = {email: email.toLowerCase()};
        let emalval = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
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
        }else{
          let resData = await forgotPassword(formData);
          Swal.fire({
            html: `<img src="../loader.gif" style="width: 50px" alt="loader">`,
            showConfirmButton: false,
            heightAuto: false,
            customClass: {popup: 'loader-swal'},
            timer: 2000
          });
          if(resData.status === 'S'){
            Swal.fire({
              text: 'You will receive an email shortly, Redirecting to Login!',
              showConfirmButton: false,
              icon: 'success',
              timer: 3000,
            }).then(() =>{navigate('/app/login');})
          }else if(resData.status === 'E' && resData.result_code === 404){
              Swal.fire({
                  text: 'Invalid Email',
                  showConfirmButton: false,
                  icon: 'warning',
                  timer: 3000,
              })
              return;
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
        <div className='loginContainer forgot-screen'>
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
                        <h5 className='loginText text-white'>Forgot Password</h5>
                        <p className='text-white'>Enter your registered email</p>
                        <TextField 
                            id="outlined-basic"
                            label="Email" 
                            variant="outlined"
                            className='mb-4 cust-white-input-field w-100' 
                            autoComplete='off'
                            onChange={(ev) => {
                                setEmail(ev.target.value)
                            }}
                            onKeyDown={(ev) => {
                              if (ev.key === "Enter") {
                                ev.preventDefault();
                                submit();
                              }
                            }}
                        />
                        <div className="text-center">
                            <button className='btn btn-white px-4 rounded-pill' onClick={() => {submit()}}>Send</button>
                        </div>
                        <div className="text-center mt-3 text-white">
                            <p>Remember password ? <button className="btn btn-light" onClick={() => {navigate('/app/login')}} rel="noreferrer">Login</button></p>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default ForgotPassword
