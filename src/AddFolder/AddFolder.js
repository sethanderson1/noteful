import React, { useState, useContext } from 'react';
import './AddFolder.css'
import { NavLink } from 'react-router-dom'
import { v4 as uuid4 } from 'uuid'
import { setMinutes } from 'date-fns';
import config from '../config';
import ApiContext from '../ApiContext';

const AddFolder = (props) => {
    const context = useContext(ApiContext)
    console.log('context from AddFolder', context)
    console.log('config.API_ENDPOINT', config.API_ENDPOINT)
    const [folder, setFolder] = useState()

    const updateName = (e) => {
        setFolder(e.target.value)
        console.log('folder from updateName', folder)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('folder from handleSubmit', folder)
        postFolder();
    }

    const postFolder = () => {
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: uuid4(),
                name: folder
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
    return (
        console.log('props AddFolder', props),
        <div className="AddFolder">
            <form onSubmit={handleSubmit}>
                <label className="folder-label" htmlFor="folder-name">Folder name</label>
                <input type="text" id="folder-name"
                    onChange={updateName} />
                <button type="submit" >Add</button>
            </form>
        </div>
    );
}

export default AddFolder;