import { useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";

export default function Header(props) {
    const { cartItems, setCartItems } = props
    const { token, setToken } = props
    const { userInfo, setUserInfo } = props
    const navigate = useNavigate();
    // JSON.parse(localStorage.getItem("cartItems") || "[]")

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        setUserInfo(localStorage.getItem("userInfo"))
    },[setUserInfo,setToken,navigate])

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
        //eslint-disable-next-line
    }, [])

    return (
        <div style={{ position: "sticky", top: "0", zIndex: "1000000" }}>
            <nav className="navbar navbar-expand-lg bg-light ">
                <div className="container-fluid">
                    <a className="navbar-brand text-warning" href="/">E-Commerce</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="##">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="##">Service</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="##">About</a>
                            </li>

                        </ul>
                        <form className="d-flex me-5 float-left" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                    </div>
                    <div className="button d-flex ">
                        <Link to={"/cart"}>
                            <i className="fa-solid fa-cart-shopping m-1 me-3 mt-2 text-body position-relative" style={{ fontSize: "1.1rem" }}>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.length}
                                </span></i></Link>


                        <button 
                        type="button" 
                        onClick={!token && !userInfo? ()=>navigate("/login"):()=>{
                            localStorage.removeItem("userInfo")
                            setUserInfo(localStorage.getItem("userInfo"))
                            localStorage.removeItem("token")
                            setToken(localStorage.getItem("token"))
                            navigate("/")
                        }} className="btn btn-outline-success me-3">
                            {!token && !userInfo?"Sign In":"Sign Out"}
                            </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
