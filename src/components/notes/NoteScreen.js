import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteActive } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);
    const [values, handleInputChange, reset] = useForm(note);
    const { title, body, url } = values;
    const activeId = useRef( note.id );
    const dispatch = useDispatch();

    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note)
            activeId.current = note.id
        }
    }, [reset, note])
    useEffect(() => {
        dispatch(noteActive(values.id, {...values}))
       
    }, [values, dispatch])

    
    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                ></textarea>

                {
                    url &&
                    (<div className="notes__image">
                        <img
                            src= {url}
                            alt="imagen"
                        />
                    </div>)
                }


            </div>

        </div>
    )
}
