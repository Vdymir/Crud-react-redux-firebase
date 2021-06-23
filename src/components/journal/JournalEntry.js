import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { noteActive } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, date, url }) => {

    const dateNote = moment(date);
    const dispatch = useDispatch();

    const handleClickNotes = () => {

        dispatch(noteActive(id, { title, body, date, url }));
    }

    return (
        <div className="journal__entry pointer" onClick={handleClickNotes}>

            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}>

                </div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{dateNote.format('MMM')}</span>
                <h4>{dateNote.format('Do')}</h4>
            </div>

        </div>
    )
}
