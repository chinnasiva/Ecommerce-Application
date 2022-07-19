import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";



const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState({
        email: '',
        password: '',
    })


    const handleOnChange = (key, value) => {
        setDetails({
            ...details, [key]: value
        })
        // console.log(key, value)
    }


    const confirmSubmit = () => {
        // console.log("submittt");
        setLoading(true)
        axios({
            method: "POST",
            url: "https://api.backendless.com/07AA61C5-4799-9F89-FF92-011767A3B000/24C0C976-E9EB-4CBC-8709-1523EE591A7C/users/login",
            data: {
                login: details["email"],
                password: details["password"]
            }
        }).then((response) => {
            setLoading(false)
            console.log(response);
            if (response.status == 200) {
                const token = response.data["user-token"];
                localStorage.setItem("EcommerAuthToken", token);
                navigate("/productsfeed")
            }

        }).catch((error) => {
            setLoading(false)
            console.log(error);
            alert(error.response.data.message)
        })


    }

    return (
        <div style={{
            display: "flex", justifyContent: "center",
             alignItems: "center", backgroundColor: "yellowgreen"}}>

            <div style={{ width: 400, height: 550, marginTop: 80 }} >
                <h1 style={{ color: "blue" }}> LOGIN HERE</h1>
                <br></br>
                
                <div className="form-group" style={{backgroundColor:"darkorange",height:150,borderRadius:10}}>
                    <br></br>
                   
                    <input style={{ borderRadius: 15, border: 5 }}
                        type="email"
                        value={details.email}
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(event) => {
                            handleOnChange("email", event.target.value)
                        }} />


                    <br></br>

                    <input style={{ borderRadius: 15, border: 5 }}
                        type="password"
                        value={details.password}
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={(event) => {
                            handleOnChange("password", event.target.value)
                        }} />


                    <br></br>

                </div>

                <br></br>
                {
                    loading ? (
                        <div>
                            <div class="spinner-grow text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-secondary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-success" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-danger" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-warning" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : null
                }
                <br></br>
                <button type="submit"
                    className="btn btn-primary"
                    onClick={() => { confirmSubmit() }}>Submit</button>
                <br></br>
                <div>
                    <br></br>
                    <p>Don't have an account ? please <a href="/signup"> signup </a> here</p>
                </div>
            </div >
        </div>

    )
}
export default Login;