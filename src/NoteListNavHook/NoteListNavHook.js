import React, { useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNavHook.css'
import config from '../config';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'


export default function NoteListNavHook(props) {
  const [state, setState] = useState(props.state)
  const context = useContext(ApiContext)
  console.log('context', context)

  function handleClickDelete(folderId) {

    // console.log('e.target', e.target)
    // const folderId = context.folders
    // console.log('folderId', folderId)
    console.log('props.id', props)
    console.log('handleClickDelete clicked')

    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {

        // context.deleteFolder(folderId)
        console.log('folderId', folderId)
        props.handleDeleteFolder(folderId)

        // make sure history push back to home
      })
      .catch(error => {
        console.error({ error })
      })
  }

  // const errorThrower = (name) => {
  //   if (name === 'Super') {
  //     throw new Error('cant be Important')
  //   }
  //   console.log('errorThrower ran')
  // }

  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {state.folders.map(folder => (
          // errorThrower(folder.name),
            <li key={folder.id}>

              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(state.notes, folder.id)}
                </span>

                {folder.name}
              </NavLink>
              <button
                className='Folder__delete'
                type='button'
                onClick={() => handleClickDelete(folder.id)}
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