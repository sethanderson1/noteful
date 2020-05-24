import React, { useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNavHook.css'
import config from '../config';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';

function NoteListNavHook(props) {
  const [state, setState] = useState(props.state)
  const context = useContext(ApiContext)

  function handleClickDelete(folderId) {
    fetch(`${config.API_ENDPOINT}/api/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
      })
      .then(() => {
        props.handleDeleteFolder(folderId)
        props.fetchUpdates()
        props.history.push('/')
        
      })
      .catch(error => {
        console.error({ error })
      })
  }

  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {state.folders.map(folder => (
          <li key={folder.id}>

            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(state.notes, folder.id)}
              </span>

              {folder.folder_name}
            </NavLink>
            <button
              className='Folder__delete'
              type='button'
              onClick={() => handleClickDelete(folder.id)}
              aria-label="delete folder"
            >
              <FontAwesomeIcon icon='trash-alt' />

            </button>
          </li>

        ))}
      </ul>

      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
            Folder
          </CircleButton>
      </div>
    </div>
  )
}

NoteListNavHook.propTypes = {
  handleDeleteFolder: PropTypes.func
}

export default withRouter(NoteListNavHook)