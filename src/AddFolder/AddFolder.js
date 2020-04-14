import React, { useState } from 'react';
import './AddFolder.css'

const AddFolder = (props) => {

    const [state, setState] = useState()
    

    const updateName = (e) => {
        setState(e.target.value)
        console.log('state', state)
    }
    
    // const postFolder = () => {
    //     fetch(`${config.API_ENDPOINT}/folders`)
    // }

    return (
        console.log('props AddFolder', props),
        <div className="AddFolder">
            <form>
                <label htmlFor="folder-name">Folder name</label>
                <input type="text" id="folder-name"
                    onChange={updateName} />
                <button>Save</button>
            </form>

        </div>
    );
}

export default AddFolder;