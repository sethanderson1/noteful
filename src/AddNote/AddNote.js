import React, { useState, useContext, useEffect } from 'react';
import './AddNote.css'
import { NavLink } from 'react-router-dom'
import { v4 as uuid4 } from 'uuid'
import { setMinutes } from 'date-fns';
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'


const AddNote = (props) => {
    const context = useContext(ApiContext)
    // console.log('context from AddNote', context)
    const [note, setNote] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [folder, setFolder] = useState(context.folders[0] || {})
    const [nameTouched, setNameTouched] = useState(false)
    const [contentTouched, setContentTouched] = useState(false)
    // console.log('context.folders[1]', context.folders[1])
    // const [folder, setFolder] = useState(context.folders[0] || {id:'',name:''}) 
    // actually, if there are no folders, they should not have option to create note


    const updateFolder = (e) => {
        setFolder(e.target.value)
        console.log('e.target.value from updateFolder', e.target.value)
        console.log('folder from updateFolder', folder)
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
                // needed to add this because folder becomes 
                // folder.id once user selects an option from dropdown
                // for some unkown reason. sloppy fix until i figure out

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
        console.log('nameTouched', nameTouched),
        console.log('props AddNote', props),
        <div className="AddNote">
            <form onSubmit={handleSubmit}>
                <label className="select-folder-label" htmlFor="select-folder" >Select Folder</label>
                <select id="select-folder"
                    value={folder.id}
                    {...console.log('folder.id', folder.id)}
                    onChange={updateFolder}>

                    {renderFolders()}
                    {console.log('folder', folder)}

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

                <button type="submit"  >Add</button>
            </form>
        </div>
    );
}

export default AddNote;

AddNote.propTypes = {
    fetchUpdates: PropTypes.func
}