import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../../components/Navbar';



export default function UpdateMenu() {
    const navigate = useNavigate();
    const { menuId } = useParams()
    const [photo, setPhoto] = useState(null)
    const [category, setCategory] = useState([{ category_id: 0, category_name: 'null' }])
    const [inputData, setInputData] = useState({
        title: "",
        ingredients: "",
        category_id: "1",
        photo_url: ""
    })

    const getData = () => {
        axios.get(import.meta.env.VITE_BASE_URL+`recipe/${menuId}`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res)
                setInputData({ ...inputData, title: res.data.data.title, ingredients: res.data.data.ingredients, category_id: res.data.data.category_id, photo_url: res.data.data.photo })
            })
            .catch((err) => {
                console.log(err)
            })
    }

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
        console.log(menuId)
        getData()
        getCategory()
    }, [])

    const [loading, setLoading] = useState(false);

    const postData = (event) => {
        event.preventDefault();
        setLoading(true);
        let bodyFormData = new FormData()
        bodyFormData.append("title", inputData.title)
        bodyFormData.append("ingredients", inputData.ingredients)
        bodyFormData.append("category_id", inputData.category_id)
        bodyFormData.append("image", photo)

        console.log(bodyFormData)

        axios.put(import.meta.env.VITE_BASE_URL+`recipe/${menuId}`, bodyFormData, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                console.log(res)
                navigate('/menu');
                toast.success('Recipe Updated')
                setLoading(false)
                toast.success('Berhasil tambah Recipe')

            })
            .catch((err) => {
                console.log(err);
                toast.error('Recipe buka milik anda')
                setLoading(false)
                toast.error(`${err}`);

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
            <MyNavbar />
            <div className="border-image">
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col">
                            <form className="input-menu" onSubmit={postData} >
                                <div className="change-photo" style={{height: "100vh", width: "50vw"}}>
                                    <img src={inputData.photo_url} className='img-fluid' />
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
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}