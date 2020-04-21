import React, { useState, useContext } from 'react';
import './AddFolder.css'
import { v4 as uuid4 } from 'uuid'
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'

const AddFolder = (props) => {
    const context = useContext(ApiContext)
    console.log('context from AddFolder', context)
    console.log('config.API_ENDPOINT', config.API_ENDPOINT)
    const [folder, setFolder] = useState('')
    const [touched, setTouched] = useState(false)

    const updateTouched = () => {
        if (!touched) {
            return setTouched(true)
        }
    }

    const validateFolderName = () => {
        const folderName = folder.trim()
        if (folderName.length === 0) {
            return '*name is required'
        }
    }

    const updateName = (e) => {
        setFolder(e.target.value)
        console.log('folder from updateName', folder)
        updateTouched()
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
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e));
                return res.json();
            })
            .then(
                handleFinishedFetch(),
                props.routeProps.history.push('/'),
            )
            .catch(error => console.log(error))
    }
    const handleFinishedFetch = () => {
        console.log('props', props)
        return props.fetchUpdates
    }
    return (
        console.log('touched', touched),
        console.log('props AddFolder', props),
        console.log('folder', folder),
        console.log('!touched && folder.length > 0', !touched && folder.length > 0),
        <div className="AddFolder">
            <form onSubmit={handleSubmit}>
                <label className="folder-label" htmlFor="folder-name">Folder name</label>
                <input type="text" id="folder-name"
                    onChange={updateName} />
                <ValidationError
                    message={validateFolderName()}
                    className="validation-error"
                />
                <button
                    className='NavCircleButton AddFolder__add-folder-button'
                    type="submit"
                    disabled={folder.length === 0}

                >Add</button>
            </form>
        </div>
    );
}

export default AddFolder;

AddFolder.propTypes = {
    fetchUpdates: PropTypes.func
}