import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes = [] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    console.log('this.context.folder.length', this.context.folders.length)
    const circleButton = this.context.folders.length > 0 
    ?  <CircleButton
    tag={Link}
    to='/add-note'
    type='button'
    className='NoteListMain__add-note-button'
  >
    <FontAwesomeIcon icon='plus' />
    <br />
    Note
  </CircleButton>
  : null;

    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <ErrorBoundary>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </ErrorBoundary>

            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
         {circleButton}
        </div>
      </section>
    )
  }
}
