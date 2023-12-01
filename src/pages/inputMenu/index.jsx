import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar"



export default function AddMenu() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null)
    const [category, setCategory] = useState([{ category_id: 0, category_name: 'null' }])
    const [inputData, setInputData] = useState({
        
        title: "",
        ingredients: "",
        category_id: "1",
        photo_url: ""
    })

    const getCategory = () => {
        axios.get(import.meta.env.VITE_BASE_URL+`category`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setCategory(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCategory()
    }, [])

    const postData = (event) => {
        event.preventDefault();
        let bodyFormData = new FormData()
        bodyFormData.append("title", inputData.title)
        bodyFormData.append("ingredients", inputData.ingredients)
        bodyFormData.append("category_id", inputData.category_id)
        bodyFormData.append("image", photo)
        setLoading(true)

        if (!photo) {
            return toast.error('Please add photo first!')
        }

        axios.post(import.meta.env.VITE_BASE_URL+`recipe`, bodyFormData, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                console.log(res)
                navigate('/menu');
                toast.success('Recipe Created')
                setLoading(false)
                toast.success('Berhasil Search Recipe')

            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message)
                setLoading(false)
                toast.error(`${err}`)

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
        <>
            <ToastContainer />
            <Navbar />
            <div className="border-image">
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col">
                            <form className="input-menu" onSubmit={postData} >
                                <div className="change-photo">
                                    {inputData.photo_url ? <img src={inputData.photo_url} className='img-fluid' /> :
                                        <div className='photo-placeholder'></div>
                                    }
                                    <label>
                                        <input name='photo' type="file" onChange={onChangePhoto} style={{ display: "none" }} />
                                        <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                            Add Photo
                                        </a>
                                    </label>
                                </div>
                                <div className="input-title">
                                    <label className="add-title">
                                        <input name='title' type="text" placeholder="Title" value={inputData.title} onChange={onChange} />
                                    </label>
                                </div>
                                <div className="input-ingredients">
                                    <label className="add-ingredients">
                                        <textarea
                                            name='ingredients'
                                            placeholder="ingredients"
                                            rows={8}
                                            value={inputData.ingredients} onChange={onChange}
                                        />
                                    </label>
                                </div>
                                <div className="d-flex select-category">
                                    <select name="category" id="1">
                                        {category.map((item, index) => {
                                            return (
                                                <option selected={item.category_id == inputData.category_id} key={index} value={item.category_id}>{(item.category_name)}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="d-grid gap-2 col-3 mx-auto">
                                    <button
                                   
                                    
                                        className="btn btn-primary"
                                        style={{
                                            backgroundColor: "#EFC81A",
                                            border: "1px solid #EFC81A",
                                            marginTop: 25
                                        }}
                                        type="submit"
                                        
                                    >
                                         {loading && (
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    )}
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
        </>

    )
}