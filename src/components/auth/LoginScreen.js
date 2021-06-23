import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loginwithEmail, startGooglelogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const [ formValue , handleInputChange] = useForm({
        email: 'vlad@correo.com',
        password: '1564w2'
    })
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.ui);
    const { email, password } = formValue;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( loginwithEmail(email, password) )
    }

    const handleGoogleLogin = () =>{
        dispatch( startGooglelogin() );
    }
    

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={ handleLogin }>

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange= {handleInputChange}
                    value={email}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange= {handleInputChange}
                    value={password}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link link-block"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}
