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
    console.log('this.props.match.params', this.props.match.params)
    const { notes = [] } = this.context
    console.log('notes', notes)
    const notesForFolder = getNotesForFolder(notes, folderId)
    console.log('folderId', folderId)
    console.log('notesForFolder', notesForFolder)
    // console.log('this.context.folder.length', this.context.folders.length)
    const circleButton = this.context.folders && this.context.folders.length > 0 
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
                  id={String(note.id)}
                  title={note.title}
                  date_modified={note.date_modified}
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
