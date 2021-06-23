import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { FinishLoading, StartLoading } from './ui';
import Swal from 'sweetalert2'


export const loginwithEmail = (email, password) => {

    return (dispatch) => {
        dispatch(StartLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(FinishLoading())
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error')
            })
    }
}
export const startRegisternWithEmail = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startGooglelogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })

    }
}

export const login = (uid, displayName) => ({

    type: types.login,
    payload: {
        uid,
        displayName
    }


});
export const starLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
    }
}
export const logout = () => ({
    type: types.logout
})