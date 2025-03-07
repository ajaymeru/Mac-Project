import React, {useState, useEffect} from 'react'
import "./navbar.css"
import { MdMenu
  // , MdOutlinePerson 
} from "react-icons/md";
function Navbar({ stateVal, trigger }) {

  const [accountName, setAccountName] = useState(null);

  // const handleToggle = () => {
  //   trigger((prev) => !prev);
  // };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    setAccountName(userData.username);
  }, [])

  return (
    <div className='navbarContainer'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid navbarContent">
          <p className="navbar-brand mb-0"><MdMenu fontSize={"30px"} className='menu-icon'  onClick={trigger}/></p>
          
          <div className="collapse navbar-collapse justify-content-start" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <img className='logo-image' src={require('../../assets/nixa-logo.jpg')} alt="" />
              </li>
            </ul>
            
          </div>
          <div className="collapse navbar-collapse justify-content-end d-flex" id="navbarSupportedContent2">
            <div className='me-3'>
              <h6 className='navbar-lastText p-0 m-0 d-none d-lg-block'>{accountName}</h6>
            </div>
            {/* <MdOutlinePerson fontSize={"30px"} /> */}
            
          </div>
        </div>
      </nav>
      
    </div>
  )
}

export default Navbar
