import React from 'react'
import "./sidebar.css"
import { MdDashboard, MdOutlinePersonAdd, MdLock, MdOutlinePerson,  MdOutlineGroup,  MdOutlinePowerSettingsNew } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
// import { QrCode } from '@mui/icons-material';

function Sidebar({ stateVal, trigger, role, accountType }) {

  const location = useLocation();
  const { pathname } = location;

  const closeSideMenu = () => {
    if(window.innerWidth < 992){
      trigger()
    }
  }


  return (
    <div className={`sidebarContainer ${stateVal ? '' : 'd-none'}`}>
      <div className="sidebarContent" key={role}>
        {+role === 1 && <>
          <Link onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/admin/dashboard' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdDashboard className='icon' />
              <p className='actualText'>Dashboard</p>
            </div>
          </Link>
          <Link to="/admin/create-client" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/admin/create-client' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Create Client</p>
            </div>
          </Link>
          <Link to="/admin/manage-clients" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/admin/manage-clients' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Manage Clients</p>
            </div>
          </Link>
          <Link to="/admin/create-vendor" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/admin/create-vendor' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Create Vendor</p>
            </div>
          </Link>
          <Link to="/admin/manage-vendors" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/admin/manage-vendors' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Manage Vendors</p>
            </div>
          </Link>
          <Link to="/app/profile" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/profile' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlinePerson className='icon' />
              <p className='actualText'>Profile</p>
            </div>
          </Link>
        </>}
        {+role === 2 && <>
          <Link  onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/dashboard' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdDashboard className='icon' />
              <p className='actualText'>Dashboard</p>
            </div>
          </Link>
          <Link to="/app/create-activity" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/create-activity' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Create Activity</p>
            </div>
          </Link>
          <Link to="/app/edit-activity" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/edit-activity' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Activity Edit(Client)</p>
            </div>
          </Link>
          {/* <Link to="/app/manage-activities" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-activities' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Manage Activities</p>
            </div>
          </Link> */}
          <Link to="/app/manage-activitie" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-activitie' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Activity Summary(Client )</p>
            </div>
          </Link>
          {/* <Link to="/app/manage-activity2" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-activity2' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Activity Summary(Client-2)</p>
            </div>
          </Link> */}
          {/* <Link to="/app/activity-summary" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/activity-summary' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Activity Summary</p>
            </div>
          </Link> */}
          <Link to="/app/activity-summary-user" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/activity-summary-user' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Activity Summary(user)</p>
            </div>
          </Link>
          <Link to="/app/activity-screen-enduser" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/activity-screen-enduser' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Activity Screen EndUser</p>
            </div>
          </Link>
          <Link to="/app/activity-vendor-user" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/activity-vendor-user' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Activity Vendor User</p>
            </div>
          </Link>
          {/* <Link to="/app/create-vendor-request" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/create-vendor-request' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Create Vendor Request</p>
            </div>
          </Link> */}
          {/* <Link to="/app/create-store" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/create-store' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Create Store</p>
            </div>
          </Link> */}
          {/* <Link to="/app/manage-stores" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-stores' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Manage Stores</p>
            </div>
          </Link> */}
          {/* <Link to="/app/create-employee" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/create-employee' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Create Employee</p>
            </div>
          </Link> */}
          {/* <Link to="/app/manage-employees" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-employees' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Manage Employees</p>
            </div>
          </Link> */}
          <Link to="/app/profile" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/profile' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlinePerson className='icon' />
              <p className='actualText'>Profile</p>
            </div>
          </Link>
        </>}
        {+role === 3 && <>
          <Link onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/dashboard' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdDashboard className='icon' />
              <p className='actualText'>Dashboard</p>
            </div>
          </Link>
          <Link to="/app/create-activity" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/create-activity' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Create Activity</p>
            </div>
          </Link>
          {/* <Link to="/app/edit-activity" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/edit-activity' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Activity Edit(Client)</p>
            </div>
          </Link> */}
          {/* <Link to="/app/manage-activities" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-activities' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Manage Activities</p>
            </div>
          </Link> */}
          
          <Link to="/app/manage-assignedtasks" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-assignedtasks' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Assigned Tasks</p>
            </div>
          </Link>
          <Link to="/app/manage-approvedtasks" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-approvedtasks' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Approved Tasks</p>
            </div>
          </Link>
          {/* <Link to="/app/create-employee" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/create-employee' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdOutlinePersonAdd className='icon' />
              <p className='actualText'>Create Employee</p>
            </div>
          </Link> */}
          {/* <Link to="/app/manage-employees" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/manage-employees' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlineGroup className='icon' />
              <p className='actualText'>Manage Employees</p>
            </div>
          </Link> */}
          <Link to="/app/profile" onClick={() => {closeSideMenu()}} className="sidebar-link">
            <div className={pathname === '/app/profile' ? 'subContent mb-2 active' : 'subContent mb-2' }>
              <MdOutlinePerson className='icon' />
              <p className='actualText'>Profile</p>
            </div>
          </Link>
        </>}
        <Link to="/app/reset-password" onClick={() => {closeSideMenu()}} className="sidebar-link">
          <div className={pathname === '/app/reset-password' ? 'subContent mb-2 active' : 'subContent mb-2' }>
            <MdLock className='icon' />
            <p className='actualText'>Reset Password</p>
          </div>
        </Link>
          <Link to="/app/login" onClick={() => {
            closeSideMenu();
            localStorage.clear()
          }} className="sidebar-link">
            <div className="subContent mb-2">
              <MdOutlinePowerSettingsNew className='icon' />
              <p className='actualText'>Log Out</p>
            </div>
          </Link>
      </div>
      {/* <div className='mt-auto text-center'>
          <p>Powered by <a href="https://impaxivesolutions.com" className='text-danger text-decoration-none fw-700' target='_blank' rel="noreferrer">Impaxive Solutions</a></p>
      </div> */}
    </div>
  )
}

export default Sidebar
