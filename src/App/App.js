import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNavHook from '../NoteListNavHook/NoteListNavHook';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        test:0
    };

    componentDidMount() {
        // console.log('componentDidMount ran')
        this.fetchUpdates()
    }
    newTime() {
        return new Date()
    }

    fetchUpdates = () => {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/notes`),
            fetch(`${config.API_ENDPOINT}/api/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));
                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({ notes, folders });
                console.log('this.state', this.state)         
                // console.log('this.state.test', this.state.test)
            })
            .catch(error => {
                console.error({ error });
            });
    }

    handleDeleteNote = noteId => {
        const newNotes = this.state.notes.filter(note => note.id !== noteId)
        this.setState({
            notes: newNotes
        });
    };

    handleDeleteFolder = folderId => {
        const newFolders = this.state.folders.filter(folder => folder.id !== folderId)
        this.setState({
            folders: newFolders
        });
    };
    

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <ErrorBoundary key={path}>
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={() => <NoteListNavHook
                                state={this.state}
                                handleDeleteFolder={this.handleDeleteFolder}
                            />}
                        />
                    </ErrorBoundary>

                ))}

                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <ErrorBoundary key={path}>
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListMain}
                        />
                    </ErrorBoundary>

                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder"
                    component={(routeProps) => <AddFolder
                        fetchUpdates={this.fetchUpdates}
                        state={this.state}
                        routeProps={routeProps} />} />
                <Route path="/add-note"
                    component={(routeProps) => <AddNote
                        fetchUpdates={this.fetchUpdates}
                        state={this.state}
                        routeProps={routeProps} />} />
            </>
        );
    }

    render() {
        // this.fetchUpdates()

        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            deleteFolder: this.handleDeleteFolder,
        };
        // console.log('folders', this.state.folders)
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
