import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault()

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.massage))
    }

    const register = e => {
        e.preventDefault()

        auth 
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.massage))
    }


  return (
    <div className='login'>
        <Link to='/'>
            <img 
                className="login_logo"
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
            />
        </Link>

        <div className='login_container'>
            <h1>
                Sign-in
            </h1>

            <form>
                <h5>
                    E-mail
                </h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                <h5>
                    Password
                </h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                <button type='submit' onClick={signIn}
                className='login_signInButton'>
                    Sign In
                </button>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register}
                className='login_registerButton'>
                    Create your AMAZON ACCOUNT
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login