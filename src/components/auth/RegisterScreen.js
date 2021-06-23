import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisternWithEmail } from '../../actions/auth';

export const RegisterScreen = () => {


    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)
    /** Custom hooks para obtener los valore del formulario */
    const [ formValue , handleInputChange] = useForm({
        name: 'Vladimir',
        email: 'vlad@correo.com',
        password: '1564w2',
        password2: '1564w2',
    })
    const { name, email, password, password2 } = formValue;


    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisternWithEmail(email, password, name))
        }

    }
    const isFormValid = () => { 
        
        if(name.trim().length === 0) {
            dispatch(setError('name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email not valid'));
            return false;
        } else if (password !==  password2 || password.length < 5) {
            dispatch(setError('Password not valid'));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            {
                msgError && 
                    (<div className="auth__alert-error">
                        <p>{msgError}</p>
                    </div>)
                
            }

            <form onSubmit={handleRegister}>

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value={ name }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value={ email }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ password }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ password2 }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link link-block"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
