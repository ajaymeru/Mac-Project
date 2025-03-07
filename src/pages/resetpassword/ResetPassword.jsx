import React, { useState } from "react";
import "./reset.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../Api";
import Swal from "sweetalert2";
function ResetPassword() {
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    account_code: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    let formData = { ...userObj };
    if (!formData.oldPassword) {
      Swal.fire({
        text: "Old password required!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else if (!userObj.newPassword) {
      Swal.fire({
        text: "New password required!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else if (userObj.oldPassword === userObj.newPassword) {
      Swal.fire({
        text: "New password should not match with old password!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else if (!userObj.confirmPassword) {
      Swal.fire({
        text: "Confirm password required!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else if (userObj.confirmPassword !== userObj.newPassword) {
      Swal.fire({
        text: "New password should match with confirm password!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else {
      let userData = JSON.parse(localStorage.getItem("userData") || "{}");
      formData.account_code = userData.account_code;
      let resData = await changePassword(formData);
      if (resData.status === "S") {
        Swal.fire({
          text: "Password changed, Redirecting to Login!",
          showConfirmButton: false,
          icon: "success",
          timer: 3000,
        }).then(() => {
          localStorage.clear();
          navigate("/app/login");
        });
      } else if (resData.status === "E" && resData.result_code === 404) {
        Swal.fire({
          text: "User not found",
          showConfirmButton: false,
          icon: "warning",
          timer: 3000,
        });
        return;
      } else if (resData.status === "E" && resData.result_code === 401) {
        Swal.fire({
          text: "Invalid Old password",
          showConfirmButton: false,
          icon: "warning",
          timer: 3000,
        });
        return;
      } else if (resData.status === "E" && resData.result_code === 400) {
        Swal.fire({
          text: "New password and confirm password does not match",
          showConfirmButton: false,
          icon: "warning",
          timer: 3000,
        });
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
      }else {
        Swal.fire({
          text: JSON.stringify(resData),
          showConfirmButton: false,
          icon: "warning",
          timer: 3000,
        });
        return;
      }
    }
  };

  return (
    <div className="resetContainer">
      <div className="row justify-content-center px-0 mx-0">
        <div className="col-12 px-0">
          <h5 className="loginText">Reset Password</h5>
        </div>
      </div>
      <div className="row justify-content-center px-0 mx-0">
        <div className="col-12 h-100 bg-white p-4 card">
          <TextField
            label="Old Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            className="mb-4 w-100"
            autoComplete="off"
            onChange={(ev) => {
              setUserObj({ ...userObj, oldPassword: ev.target.value });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="New Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            className="mb-4 w-100"
            autoComplete="off"
            onInput={(ev) => {
              setUserObj({ ...userObj, newPassword: ev.target.value });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            className="mb-4 w-100"
            autoComplete="off"
            onInput={(ev) => {
              setUserObj({ ...userObj, confirmPassword: ev.target.value });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="text-center mt-3">
            <button
              className="btn btn-dark px-4"
              onClick={() => {
                submit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
