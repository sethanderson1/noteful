import React, { useState, useContext, useEffect } from 'react';
import './AddNote.css'
import { NavLink } from 'react-router-dom'
import { v4 as uuid4 } from 'uuid'
import { setMinutes } from 'date-fns';
import config from '../config';
import ApiContext from '../ApiContext';

const AddNote = (props) => {
    const context = useContext(ApiContext)
    // console.log('context from AddNote', context)
    const [note, setNote] = useState()
    const [noteContent, setNoteContent] = useState()
    const [folder, setFolder] = useState(context.folders[2] || {})
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
        // console.log('note name from updateName', note)
    }

    const updateContent = (e) => {
        setNoteContent(e.target.value)
        // console.log('note content from updateContent', noteContent)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log('note from handleSubmit', note)

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
            .then(
                handleFinishedFetch(),
                props.routeProps.history.push('/'),
            )
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



    return (
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

                <label className="note-label" htmlFor="note-content">Note content</label>
                <textarea
                    id="note-content"
                    onChange={updateContent}
                    rows={10}
                    cols={25}></textarea>
                <button type="submit"  >Add</button>
            </form>
        </div>
    );
}

export default AddNote;