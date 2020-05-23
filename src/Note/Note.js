import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'
import './Note.css'

export default class Note extends React.Component {
  constructor(props) {
    super(props)
    this.titleWasClicked = this.titleWasClicked.bind(this)
  }
  static defaultProps = {
    onDeleteNote: () => { },
  }
  static contextType = ApiContext;


  // handleClickDelete = e => {
  //   e.preventDefault()
  //   const noteId = this.props.id
  //   console.log('this.props.id', this.props.id)

  //   fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         return res.json().then(error => Promise.reject(error))
  //       }
  //       console.log('`${config.API_ENDPOINT}/api/notes/${noteId}`', `${config.API_ENDPOINT}/api/notes/${noteId}`)

  //     })
  //     .then(() => {
  //       // this.context.deleteNote(noteId)
  //       console.log('this.context.deleteNote(noteId)', this.context.deleteNote(noteId))
  //       this.props.onDeleteNote(noteId)
  //       console.log('this.props.onDeleteNote(noteId)', this.props.onDeleteNote(noteId))
  //       console.log('this.props', this.props)
  //     })
  //     .catch(error => {
  //       console.error({ error })
  //     })
  // }

  doSomething = () => {
    console.log('doSeomthing ran')
    console.log('this.props', this.props)
  }

  titleWasClicked = (e) => {
    e.preventDefault()
    console.log('Click happened');
    const { dataCallback } = this.props
    dataCallback('hello')
  }

  render() {
    const { title, id, date_modified } = this.props
    // if (name === 'asdf') {
    //   throw new Error('cant be asdf')
    // }
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {title}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          // onClick={this.handleClickDelete}
          onClick={this.titleWasClicked}

        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(date_modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  date_modified: PropTypes.string,
}