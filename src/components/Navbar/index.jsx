import React from "react";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


function MyNavbar() {
  const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        navigate('/landing')
    }
  return (
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto d-flex gap-3 mx-5 mb-4">
        <Link to="/menu" className="text-decoration-none fw-bold fs-5">
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Home
                </Nav.Link>
              </Link>
              <Link
                to='/input-menu'
                className="text-decoration-none fw-bold fs-5"
              >
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Add Recipe
                </Nav.Link>
              </Link>
              <Link
                to="/search-menu"
                className="text-decoration-none fw-bold fs-5"
              >
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Search Menu
                </Nav.Link>
              </Link>
        </Nav>
        {localStorage.getItem("token") !== null ?
        (
        <div className="d-flex gap-3">
          <div style={{ height: '60px', width: '5px', backgroundColor: '#efc81a' }}></div>
          <div>
            {localStorage.getItem("photo") !== "null" ?
            <img
              src={localStorage.getItem("photo")}
              alt="profile"
              width="90px"
              height="60px"
              style={{ borderRadius: '50%' }}
            /> : <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" 
            alt="profile"
              width="60px"
              style={{ borderRadius: '50%' }}/>
          }
          </div>
          <div>
            <p className="m-0" style={{cursor: 'pointer'}} onClick={() => navigate(`/detail-profile/${localStorage.getItem("id")}`)}>{localStorage.getItem("username")}</p>
            <p className="btn m-0 fw-bold" style={{cursor: 'pointer'}} onClick={logout}>Logout</p>
          </div>
        </div>
        ):(
        <div className="d-flex gap-3 mx-5">
          <Button className="btn fw-bold" style={{ backgroundColor: "#EFC81A" }} onClick={() => navigate("/login")}>Login</Button>
          <Button className="btn fw-bold" style={{ backgroundColor: "#EFC81A" }} onClick={() => navigate("/register")}>Register</Button>
        </div>  
          )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;