import React, { useState, useContext } from 'react';
import './AddFolder.css'
import { v4 as uuid4 } from 'uuid'
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'

const AddFolder = (props) => {
    const context = useContext(ApiContext)
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
        updateTouched()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postFolder();
    }

    const postFolder = () => {
        fetch(`${config.API_ENDPOINT}/api/folders`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: uuid4(),
                folder_name: folder
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
        return props.fetchUpdates
    }
    return (
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
                    aria-label="Add Folder"
                    
                >Add</button>
            </form>
        </div>
    );
}

export default AddFolder;

AddFolder.propTypes = {
    fetchUpdates: PropTypes.func
}