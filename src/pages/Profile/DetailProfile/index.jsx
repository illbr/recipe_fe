import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import MyNavbar from '../../../components/Navbar';


const DetailProfile = () => {
    const logout = () => {
        localStorage.clear()
        navigate('/')
    }
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null)
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        photo_url: ""
    })

    const getData = () => {
        axios.get(import.meta.env.VITE_BASE_URL+`users/${localStorage.getItem("id")}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res)
                setInputData({ ...inputData, name: res.data.data.name, email: res.data.data.email, photo_url: res.data.data.photo })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const postData = (event) => {
        event.preventDefault();
        let bodyFormData = new FormData()
        bodyFormData.append("name", inputData.name)
        bodyFormData.append("email", inputData.email)
        bodyFormData.append("image", photo)

        console.log(bodyFormData)

        axios.put(import.meta.env.VITE_BASE_URL+`users/${localStorage.getItem("id")}`, bodyFormData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                console.log(res)
                logout()
                navigate('/menu');
                toast.success('Users Updated')

            })
            .catch((err) => {
                console.log(err);
                toast.error('Cannot update users data')

            })
    }

    const onChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
        console.log(inputData)
    }
    const onChangePhoto = (e) => {
        e.target.files[0] && setPhoto(e.target.files[0])
        e.target.files[0] && setInputData({ ...inputData, photo_url: URL.createObjectURL(e.target.files[0]) })
        console.log(e.target.files)

    }


    return (
        <Container>
            <MyNavbar />
            <Row>
                <Col md={12}>
                    <form className="input-menu d-flex justify-content-center align-items-center flex-column mt-5" onSubmit={postData}>
                        <div className="change-photo d-flex justify-content-center align-items-center flex-column mt-5">
                            {localStorage.getItem("photo") !== "null" ?
                                <img src={inputData.photo_url} className='img-fluid' alt="profile"
                                    style={{ height: 100, width: 100, borderRadius: '50%' }}
                                /> : <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                                    alt="profile"
                                    style={{ height: 100, width: 100, borderRadius: '50%' }} />}
                        </div>
                        <label>
                            <input name='photo' type="file" onChange={onChangePhoto} style={{ display: "none" }} />
                            <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                Change Profile Picture
                            </a>
                        </label>
                        <p className="text-center fw-bold fs-4">{localStorage.getItem("username")}</p>
                        <div className="d-flex justify-content-center align-items-center mb-5">
                            <Row>
                                <Col md={12}>
                                    <div className="mb-3">
                                        <label for='name' className="form-label">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name='name'
                                            className="form-control border-warning"
                                            placeholder="Enter Name"
                                            value={inputData.name}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for='email' className="form-label">Email</label>
                                        <input
                                            id='email'
                                            type="email"
                                            name='email'
                                            className="form-control border-warning"
                                            placeholder="Enter Email Address"
                                            value={inputData.email}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="btn w-100 fw-semibold text-white mt-3"
                                        style={{ backgroundColor: '#efc81a' }}
                                    >
                                        Update Profile
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </Col>
            </Row>
            <div className="container-fluid">
                    <div className="footer">
                        <div className="footer-mid">
                            <div style={{ fontSize: "5vw", fontStyle: "bolder" }}>
                                Eat, Cook, Repeat
                            </div>
                            <div style={{ fontSize: "1.8vw" }}>
                                Share your best recipe by uploading here !
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <span className="footer-bottom-item">Product</span>
                            <span className="footer-bottom-item">Company</span>
                            <span className="footer-bottom-item">Learn More</span>
                            <span className="footer-bottom-item">Get In Touch</span>
                        </div>
                        <div className="arkademy">@Arkademy</div>
                    </div>
                    </div>
        </Container>
    );
}

export default DetailProfile;