import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";


export const startAddNotes = () => {

    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const docRef = await db.collection(`${uid}/journal/notes`).add( newNote );
        dispatch(noteActive(docRef.id, newNote))
    }

}

export const noteActive = (id, nota) => ({
    type: types.notesActive,
    payload: {
        id,
        ...nota
    }
})

export const setNote =(notas) =>({
    type: types.notesLoad,
    payload: notas
})

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        if(!note.url){
            delete note.url
        }
        const {uid} = getState().auth;
        const noteclon = {...note}
        delete noteclon.id;
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteclon);
        dispatch(noteUpdate(note.id, noteclon))
        Swal.fire('Saved', '', 'success')
    }

}
export const noteUpdate = (id, note) => ({
    type: types.noteUpdated,
    payload: {
        id,
        note: {id, ...note}
    }
})