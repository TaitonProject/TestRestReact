import React from 'react';

import moment from 'moment';

import NotesStore from '../stores/NotesStore';
import NotesActions from '../actions/NotesActions';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoadingNotes: NotesStore.isLoadingNote(),
        isLoadingEmployees: NotesStore.isLoadingEmployee(),
        notes: NotesStore.getNotes(),
        employees: NotesStore.getEmployees()
    };
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        var date = moment(new Date()).format('YYYY-MM-DD');
        NotesActions.loadNotes(date);
        NotesActions.loadEmployees();
    },

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
        NotesActions.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
        NotesActions.removeChangeListener(this._onChange);
    },

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    },

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    },

    handleChangeDateStart(date) {
        NotesActions.loadNotes(date);
    },

    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} getListByDate={this.handleChangeDateStart} employees={this.state.employees}/>
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
