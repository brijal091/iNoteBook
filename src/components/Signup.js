import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";

function Signup() {
  let history = useNavigate ();
  const [userDetail, setUserDetail] = useState({
    name:"",
    email: "",
    password: ""
  })

  const onChange = (e) => {
    setUserDetail({...userDetail,[e.target.name]: e.target.value})
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    console.log(userDetail)
    const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
          body: JSON.stringify({name:userDetail.name, email:userDetail.email, password: userDetail.password}),

        });
        const json = await response.json()
        if (json.error){
          alert("You have entered wrong credentials")
      }
        else{
            // alert("You have login successfully")
            // save the auth token and redairect
            console.log(json)
            console.log(json.jwtData)
            localStorage.setItem('token', json.jwtData)
            history('/');
    }
  }
  return (
    <div className="container my-5">
      <form onSubmit={handleOnSubmit}>
      <div className="form-group">
          <label htmlFor="exampleInputEmail1">UserName</label>
          <input
          name="name"
          value={userDetail.name}
            type="text"
            className="form-control"
            id="exampleInputName"
            placeholder="Enter Your Name"
            onChange={onChange}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            onChange={onChange}
            value={userDetail.email}
            className="form-control"
            placeholder="Enter email"
            name="email"
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            value={userDetail.password}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={onChange}
            autoComplete = 'true'
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
  }

export default Signup;
