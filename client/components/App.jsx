import React from 'react';

import moment from 'moment';

import NotesStore from '../stores/NotesStore';
import NotesActions from '../actions/NotesActions';

import EmployeesStore from '../stores/EmployeesStore';
import EmployeesActions from '../actions/EmployeesActions';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoadingNotes: NotesStore.isLoading(),
        isLoadingEmployees: EmployeesStore.isLoading(),
        notes: NotesStore.getNotes(),
        employees: EmployeesStore.getEmployees()
    };
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        var date = moment(new Date()).format('YYYY-MM-DD');
        NotesActions.loadNotes(date);
        EmployeesActions.loadEmployees();
        console.log(EmployeesActions.loadEmployees());
    },

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
        EmployeesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
        EmployeesStore.removeChangeListener(this._onChange);
    },

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.idMessage);
    },

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    },

    handleChangeDateStart(date) {
        console.log(date);
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
