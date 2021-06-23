import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {

    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes =[];

    notesSnap.forEach( snapChildren =>{
        notes.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
    })


    return notes;
}