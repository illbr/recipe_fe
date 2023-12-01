import axios from 'axios'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/action/auth';
import logo from '../../../assets/barbecue 1.svg';


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email:'',
        password:'',
    });
    const [isChecked, setIsChecked] = useState(false);

    // let url = import.meta.env.VITE_BASE_URL;

    const postData = (e) => {
        e.preventDefault();
        if (!isChecked) {
            alert("Harap centang kotak untuk melanjutkan login.");
            return;
        }

        console.log(inputData);
    //     axios.post(url+`/users/login`,inputData)
    //     .then((res) => {
    //         console.log(res);
    //         localStorage.setItem("token",res.data.token);
    //         localStorage.setItem("username",res.data.data[0].name);
    //         localStorage.setItem("photo",res.data.data[0].photo);
    //         localStorage.setItem("email",res.data.data[0].email);
    //         localStorage.setItem("id",res.data.data[0].id);
    //         navigate('/');
    //     })
    //     .catch((err) => {
    //         alert(err.response.data.message);
    //     });
    dispatch (login(inputData,navigate))
    };


    const onChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col md={12}>
                    <div className="mt-5 text-center">
                        <img src={logo} alt="logo" width="100px" />
                        <h4 className="my-3 fw-bold text-warning">Welcome</h4>
                        <p>Log in into your existing account</p>
                    </div>
                    <form onSubmit={postData} className='my-3'>
                        <input type="text" name='email' value={inputData.email} className='form-control col-4 mb-3' onChange={onChange} placeholder='email' />
                        <input type="password" name='password' value={inputData.password} className='form-control col-4 mb-3' onChange={onChange} placeholder='password' />
                        <Form.Group className="my-3 form-check">
                            <Form.Check type="checkbox" label="I agree to terms and conditions" checked={isChecked} onChange={handleCheckboxChange} />
                        </Form.Group>
                        <Button type="submit" variant="warning" className="w-100 fw-semibold text-white">
                            Login
                        </Button>
                        <p className="mt-3">
                            Don't have an account?
                            <span>
                                <Link to="/register"  className="text-decoration-none colors">Sign Up</Link>
                            </span>
                        </p>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}