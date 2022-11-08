import React, {useState} from "react";
import { useNavigate  } from "react-router-dom";

export default function Login() {
    const [credentials, setCredentials] = useState({email: "", password: ""})

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    let history = useNavigate ();

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzZTZkYjMwNzUwNTlkMjE5OTg2NmFiIn0sImlhdCI6MTY2NTM4MDQ2MH0.rx7xvg2ptsgv908z6DyYYLI6KJ2tU8Pywvm5En7ys1Q",
            },
          body: JSON.stringify({email:credentials.email, password: credentials.password}),

        });
        const json = await response.json()
        console.log(json)
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
    <>
      <form className="container my-5" onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            onChange={onChange}
            name="email"
            value={credentials.email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required

          />
          
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={onChange}
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            autoComplete="false"
            value={credentials.password}
            required

          />
        </div>
        {/* <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary my-3" >
          Login
        </button>
      </form>
    </>
  );
}
