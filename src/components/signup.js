import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { object, string, number } from 'yup';
import axios from "axios";


const enterSchema = object({
    email: string().email().required('required'),
    phonenumber: string().min(10).max(10, "Enter phonenumber").required('required'),
    password: string().required('required').min(6, "Minimum 6 characters").max(10),
    confirmpassword: string().required('required')
        .min(6).max(10)
        .test('confirm-password', 'must match password ', function (confirmpassword) {

            return confirmpassword == this.parent.password;
            // console.log(value, hasAt);
            // const hasAt=value.indexOf('@') !=-1;
            // return hasAt;
        })
})

const Signup = () => {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params, "params calleddd");
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpassword: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpassword: ''
    });

    const handleOnChange = (key, value) => {
        // console.log(key, value);
        setDetails({
            ...details, [key]: value
        })
    }


    const handleSubmit = () => {
        // console.log("submittt",details);
        enterSchema.validate(details, { abortEarly: false })
            .then((res) => {
                setErrors({});
                console.log(res);
                axios({
                    method: "POST",
                    url: "https://api.backendless.com/07AA61C5-4799-9F89-FF92-011767A3B000/24C0C976-E9EB-4CBC-8709-1523EE591A7C/users/register",
                    data: {
                        name: details["name"],
                        phonenumber: details["phonenumber"],
                        email: details["email"],
                        password: details["password"]
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        navigate("/login")
                    }

                }).catch((error) => {

                    console.log(error);
                })


            }).catch((error) => {

                // console.log(error.inner);
                let errObj = {}

                error.inner.map((valErr) => {
                    errObj[valErr.path] = valErr.message;
                })
                // console.log("errobject",errObj);
                setErrors(errObj);
            })

    }

    return (

        <div style={{
            display: "flex", justifyContent: "center",
            alignItems: "center", backgroundColor:"darkorchid"
        }}>
            <div style={{ width: 400, height: 700, marginTop: 20 }} >
                <h1 style={{ color: "orange" }}> SIGNUP HERE</h1>
                <br></br>

                <div class="form-group" style={{backgroundColor:"gold",height:380,borderRadius:10}} >

                    <br></br>
                    <input style={{ borderRadius: 15, border: 5 }}
                        type="text"
                        className="form-control"
                        value={details.name}
                        placeholder="Enter Name"
                        onChange={(event) => {
                            handleOnChange("name", event.target.value)
                        }} />

                   
                    <br></br>

                    <input style={{ borderRadius: 15, border: 5 }}
                        type="email"
                        className="form-control"
                        value={details.email}
                        placeholder="Enter email"
                        onChange={(event) => {
                            handleOnChange("email", event.target.value)
                        }} />

                    <p className="text-danger">{errors["email"]}</p>
                    <br></br>

                    <input style={{ borderRadius: 15, border: 5 }}
                        type="number"
                        className="form-control"
                        value={details.phonenumber}
                        placeholder="Enter phonenumber"
                        onChange={(event) => {
                            handleOnChange("phonenumber", event.target.value)
                        }} />

                    <p className="text-danger">{errors["phonenumber"]}</p>
                    <br></br>

                    <input style={{ borderRadius: 15, border: 5 }}
                        type="password"
                        className="form-control"
                        value={details.password}
                        placeholder="Enter Password"
                        onChange={(event) => {
                            handleOnChange("password", event.target.value)
                        }} />

                    <p className="text-danger">{errors["password"]}</p>
                    <br></br>


                    <input style={{ borderRadius: 15, border: 5 }}
                        type="password"
                        className="form-control"
                        value={details.confirmpassword}
                        placeholder="Confirm Password"
                        onChange={(event) => {
                            handleOnChange("confirmpassword", event.target.value)
                        }} />

                    <p className="text-danger">{errors["confirmpassword"]}</p>

                    <br></br>
                </div>


                 <br></br>
                <button type="submit"
                    class="btn btn-primary"
                    onClick={() => { handleSubmit() }}>Submit</button>

                <div>
                    <br></br>
                    <p>Already have an account  <a href="/login"> login</a> here</p>
                </div>
            </div >
        </div>

    )
}
export default Signup;