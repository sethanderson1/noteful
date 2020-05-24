import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = () => {

    const {noteId} = this.props.match.params
    console.log('this.props', this.props)
    console.log('noteId', noteId)
    // console.log('handleDeleteNote ran')
    this.context.deleteNote(noteId)
    console.log('this.props.history', this.props.history)
    // console.log('this.context', this.context)
    // this.props.history.push(`/`)  

    
  }

  render() {
    const { notes = [] } = this.context
    console.log('notes', notes)
    console.log('this.context', this.context)
    const { noteId } = this.props.match.params
    console.log('this.props', this.props)
    console.log('noteId', noteId)
    const note = findNote(notes, noteId) || { content: '' }
    console.log('note', note)
    console.log('notepagemain rendered')
    return (
      <section className='NotePageMain'>
        <Note
          id={String(note.id)}
          title={note.title}
          date_modified={note.date_modified}
          onDeleteNote={this.handleDeleteNote}
          history={this.props.history}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
