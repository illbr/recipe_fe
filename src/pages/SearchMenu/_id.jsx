import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./../../components/Navbar"
import './_id.css'
import logoBookmark from "./../../assets/mark.svg"
import logoLike from "./../../assets/jempol.svg"
import logoLiked from "./../../assets/liked.png"


function MenuById() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [comment, setComment] = useState(null)
    const [like, setLike] = useState(null)
    const [bookmark, setBookmark] = useState(null)
    const [totalComment, setTotalComment] = useState(0)
    const [inputComment, setInputComment] = useState({
        recipe_id: id,
        comment_text: "",
        user_id: localStorage.getItem("id"),
    })

    const [isLiked, setIsLiked] = useState(like?.id === id);
    const [isBookmarked, setIsBookmarked] = useState(bookmark?.id === id);

    const inputData = {
        ResepID: id,
        UserID: localStorage.getItem("id"),
    }


    const getData = () => {
        axios.get(import.meta.env.VITE_BASE_URL + `recipe/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res)
                setData(res.data.data)
                toast.success('Berhasil Detail Recipe')


            })
            .catch((err) => {
                console.log(err)
                toast.error(`${err}`)
            })
    }

    const getLike = () => {
        axios.get(import.meta.env.VITE_BASE_URL + `LikeAndBookmark/like/${id}?UserID=${localStorage.getItem("id")}&ResepID=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res)
                setLike(res.data.data[0])
                if (res.data.data.length > 0) {
                    setIsLiked(true)
                }


            })
            .catch((err) => {
                console.log(err)
                toast.error(`${err}`)
            })
    }

    const getBookmark = () => {
        axios.get(import.meta.env.VITE_BASE_URL + `LikeAndBookmark/bookmark/${id}?UserID=${localStorage.getItem("id")}&ResepID=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res)
                setBookmark(res.data.data[0])
                if (res.data.data.length > 0) {
                    setIsBookmarked(true)
                }


            })
            .catch((err) => {
                console.log(err)
                toast.error(`${err}`)
            })
    }

    const getComment = () => {
        axios.get(import.meta.env.VITE_BASE_URL + `comment/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res)
                setTotalComment(res.data.data.length)
                setComment(res.data.data)
                // toast.success('Berhasil get comment Recipe')


            })
            .catch((err) => {
                console.log(err)
                toast.error(`${err}`)
            })
    }

    useEffect(() => {
        getData()
        getComment()
        getLike()
        getBookmark()
    }, [])

    const postData = (event) => {
        event.preventDefault();
        axios.post(import.meta.env.VITE_BASE_URL + "comment", inputComment, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                console.log(res);
                toast.success('Comment Success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    }

    const onChange = (e) => {
        setInputComment({
            ...inputComment,
            [e.target.name]: e.target.value
        })
        console.log(inputComment)
    }

    const postLike = () => {
        axios.post(import.meta.env.VITE_BASE_URL + `LikeAndBookmark/like?UserID=${localStorage.getItem("id")}`, inputData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res);
                toast.success('Like Success');
                setIsLiked(true);
            })
            .catch((err) => {
                console.log(err);
                toast.error(`${err}`);
            });
    }
    
    const deleteLike = () => {
        axios.delete(import.meta.env.VITE_BASE_URL + `LikeAndBookmark/like?UserID=${localStorage.getItem("id")}&ResepID=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res);
                toast.success('Delete Like Success');
                setIsLiked(false); // Set isLiked menjadi false
            })
            .catch((err) => {
                console.log(err);
                toast.error(`${err}`);
            });
    }
    
    const postBookmark = () => {
        axios.post(import.meta.env.VITE_BASE_URL + `LikeAndBookmark/bookmark?UserID=${localStorage.getItem("id")}`, inputData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res);
                toast.success('Bookmark Success');
                setIsBookmarked(true);
            })
            .catch((err) => {
                console.log(err);
                toast.error(`${err}`);
            });
    }
    
    const deleteBookmark = () => {
        axios.delete(import.meta.env.VITE_BASE_URL + `LikeAndBookmark/bookmark?UserID=${localStorage.getItem("id")}&ResepID=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res);
                toast.success('Delete Bookmark Success');
                setIsBookmarked(false); //
            })
            .catch((err) => {
                console.log(err);
                toast.error(`${err}`);
            });
    }
    // const postBookmark = () => {
    //     axios.post(import.meta.env.VITE_BASE_URL + `LikeAndBookmark/bookmark?UserID=${localStorage.getItem("id")}`, inputData, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             toast.success('Bookmark Success');
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 1000);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             toast.error(`${err}`)
    //         })
    // }

    // const deleteBookmark = () => {
    //     axios.delete(import.meta.env.VITE_BASE_URL + `LikeAndBookmark/bookmark?UserID=${localStorage.getItem("id")}&ResepID=${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             toast.success('Delete Bookmark Success');
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 1000);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             toast.error(`${err}`)
    //         })
    // }


    return (
        <>
            <ToastContainer autoClose={1000} />
            <Navbar />
            <div className="mt-5">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <div
                                className="border-start"
                                style={{
                                    borderWidth: "3px !important",
                                    borderColor: "#EFC81A !important"
                                }}
                            >
                                <div className="d-flex ms-2">
                                    {data?.author_photo !== null ? (
                                        <img
                                            src={data?.author_photo}
                                            className="rounded-circle "
                                            alt="profile"
                                            width="90px"
                                        // height="60px"
                                        // style={{ width: 40 }}
                                        />
                                    ) : (
                                        <img
                                            src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                                            className="rounded-circle "
                                            alt="profile"
                                            width="90px"
                                        // height="60px"
                                        // style={{ width: 40 }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="d-flex flex-column ms-4">
                                <h6 className="mb-0">
                                    <a
                                        className="text-black"
                                        style={{ textDecoration: "none" }}
                                    >
                                        {data?.author}
                                    </a>
                                </h6>
                                <p className="mb-0 text-start fw-bold">{data?.category}</p>
                            </div>
                        </div>
                        <div className="d-flex flex-column text-end">
                            <p className="mb-0">{formattedDate}</p>
                            <p className="mb-0">
                                20 Likes -<span> {totalComment} Comments</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h1 className="title text-center">{data?.title}</h1>
                        <div className="row mb-5">
                            <div className="col" style={{ textAlign: "center" }}>
                                <img
                                    className="rounded img-fluid img-thumbnail"
                                    src={data?.photo}
                                    alt=""
                                    style={{ width: "350px", height: "300px" }}
                                />
                            </div>
                        </div>
                        <div className="py-5 bg">
                            <h4>Ingredients</h4>
                            <div>{data?.ingredients.split(",").map((ingredient, index) => {
                                return <li key={index}>{ingredient}</li>;
                            })}</div>

                        </div>
                        <div className="d-flex gap-3 mb-5">
                            {isBookmarked ? (
                                <button className="icon-button-1" onClick={deleteBookmark}>
                                    <img src={logoBookmark} alt="Bookmark" />
                                </button>
                            ) : (
                                <button className="icon-button-2" onClick={postBookmark}>
                                    <img src={logoBookmark} alt="Bookmark" />
                                </button>
                            )}
                            {isLiked ? (
                            <button className="icon-button-1" onClick={deleteLike}>
                                <img src={logoLiked} alt="Like" />
                            </button>
                            ) : (
                            <button className="icon-button-2" onClick={postLike}>
                                <img src={logoLike} alt="Like" />
                            </button>
                            )}
                        </div>
                        <div
                            className="card py-5 border-start-0 border-end-0 border-3 mb-5"
                            style={{ borderColor: "#EFC81A !important" }}
                        >
                            {comment?.map((item, index) => {
                                return (
                                    <div key={index} className="d-flex align-items-center mb-5">
                                        <div className="me-4">
                                            <div className="d-flex ms-2">
                                                <img
                                                    src={item.author_photo !== null ? item.author_photo : "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}
                                                    className="rounded-circle "
                                                    alt="profile"
                                                    style={{ width: "60px", height: "60px" }}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="d-flex flex-column border-end pe-4"
                                            style={{
                                                borderWidth: "3px !important",
                                                borderColor: "#EFC81A !important"
                                            }}
                                        >
                                            <h6 className="mb-0">
                                                <a
                                                    className="text-black"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {item.author}
                                                </a>
                                            </h6>
                                            <p className="mb-0 text-start fw-bold">{item.formatted_created_at}</p>
                                        </div>
                                        <p className="message mb-0 ms-3">
                                            {item.comment_text}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mb-5">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <form onSubmit={postData}>
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control bg-body-secondary"
                                                id="comment_text"
                                                name="comment_text"
                                                rows={5}
                                                placeholder="Your comment here!"
                                                value={inputComment.comment_text}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn py-3"
                                            style={{
                                                backgroundColor: "#FFB167",
                                                color: "#FFF",
                                                paddingLeft: 40,
                                                paddingRight: 40
                                            }}
                                        >
                                            Send a comment
                                        </button>
                                    </form>
                                </div>
                            </div>
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

export default MenuById