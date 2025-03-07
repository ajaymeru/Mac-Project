import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';

function Layout() {
  const navigate = useNavigate();
  const [innerWidth, setinnerWidth] = useState(window.innerWidth);
  const [stateVal, setStateVal] = useState(innerWidth > 992 ? true : false);
  const toggleSidebar = () => {
    setStateVal((prev) => !prev);
  };

  const [role, setRole] = useState(null);
  const [accountType, setAccountType] = useState(null);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(userData);
    if(!userData.role){
      navigate('/app/login')
    }else{
      setRole(userData.role);
      setAccountType(userData.account_type);
    };
  }, [])

  return (
    <div className={innerWidth > 992 ? 'web' : 'mobile'}>
      <Navbar stateVal={stateVal} trigger={toggleSidebar} />
            <div className="components">
                <Sidebar stateVal={stateVal} trigger={toggleSidebar} role={role} accountType={accountType} />
                <div className="mainContainer">
                  <Outlet />
                </div>
            </div>
       
    </div>
  )
}

export default Layout
