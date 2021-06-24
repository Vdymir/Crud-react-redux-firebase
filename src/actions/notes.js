import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { filesUpload } from "../helpers/filesUpload";
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
        dispatch(noteAddNew(docRef.id, newNote))
    }

}
export const noteAddNew = (id, nota) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...nota
    }
})

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

export const startUploading = file => {
    return async (dispatch, getState) => {
        const {active} = getState().notes;
        
        const fileUrl = await filesUpload(file);
        active.url = fileUrl;
        dispatch(startSaveNote(active))
    }
}

export const startDeleteNote = (id) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(noteDelete(id))
    }
}

export const noteDelete = (id) => ({
    type: types.noteDelete,
    payload: id
})

export const noteLogout = ()=> ({
    type: types.noteLogoutCleaning,
})