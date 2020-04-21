import React, { useState, useContext } from 'react';
import './AddNote.css'
import { v4 as uuid4 } from 'uuid'
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'


const AddNote = (props) => {
    const context = useContext(ApiContext)
    const [note, setNote] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [folder, setFolder] = useState(context.folders[0] || {})
    const [nameTouched, setNameTouched] = useState(false)
    const [contentTouched, setContentTouched] = useState(false)

    const updateFolder = (e) => {
        setFolder(e.target.value)
    }

    const updateName = (e) => {
        setNote(e.target.value)
        updateNameTouched()
    }

    const updateContent = (e) => {
        setNoteContent(e.target.value)
        updateContentTouched()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postNote();
    }

    const postNote = () => {
        console.log('folder in postNote', folder.id)
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: uuid4(),
                name: note,
                modified: new Date().toISOString(),
                content: noteContent,
                folderId: folder.id || folder,
            })
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e));
                return res.json();
            })
            .then(
                handleFinishedFetch(),
                props.routeProps.history.push('/'),
            )
            .catch(error => {
                console.error({ error });
            });
    }
    const handleFinishedFetch = () => {
        console.log('props', props)
        return props.fetchUpdates
    }

    const { folders } = context

    function renderFolders() {
        return (
            folders.map((fldr) =>
                <option
                    key={fldr.id}
                    id={fldr.id}
                    value={fldr.id} >{fldr.name}</option>
            )
        )
    }

    const updateNameTouched = () => {
        if (!nameTouched) {
            return setNameTouched(true)
        }
    }

    const updateContentTouched = () => {
        if (!nameTouched) {
            return setContentTouched(true)
        }
    }

    const validateName = () => {
        const noteName = note.trim()
        if (noteName.length === 0) {
            return '*name is required'
        }
    }

    const validateContent = () => {
        const content = noteContent.trim()
        if (content.length === 0) {
            return '*content cannot be empty'
        }
    }

    return (
        <div className="AddNote">
            <form onSubmit={handleSubmit}>
                <label className="select-folder-label" htmlFor="select-folder" >Select Folder</label>
                <select id="select-folder"
                    value={folder.id}
                    {...console.log('folder.id', folder.id)}
                    onChange={updateFolder}>
                    {renderFolders()}
                </select>
                <label className="note-label" htmlFor="note-name">Note name</label>
                <input type="text" id="note-name"
                    onChange={updateName} />
                <ValidationError message={validateName()} />

                <label className="note-label" htmlFor="note-content">Note content</label>
                <textarea
                    id="note-content"
                    onChange={updateContent}
                    rows={10}
                    cols={25}></textarea>
                <ValidationError message={validateContent()} />

                <button
                    className='NavCircleButton AddNote__add-note-button'
                    type="submit"
                    disabled={note.length === 0 || noteContent.length === 0}
                >
                    Add</button>
            </form>
        </div>
    );
}

export default AddNote;

AddNote.propTypes = {
    fetchUpdates: PropTypes.func
}