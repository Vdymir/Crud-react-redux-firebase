import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { loadNotes } from '../helpers/loadNotes';
import { setNote } from '../actions/notes';

export const AppRouter = () => {


    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        firebase.auth().onAuthStateChanged( async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                const note = await loadNotes(user.uid)
                dispatch(setNote(note))
            } else {
                setIsLoggedIn(false);
            }
        })

        setChecking(false)

    }, [dispatch, setIsLoggedIn, setChecking])

    if (checking) {
        return <h1>Loading...</h1>
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter
                        isAuth={isLoggedIn}
                        path="/auth"
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        isAuth={isLoggedIn}
                        exact
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
