import React from 'react';
import api from '../api';
import moment from 'moment';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './App.less';

const App = React.createClass({

    getDefaultProps: function(){
        return{

        };
    },

    getInitialState() {
        return {
            notes: [],
            employees: []
        }
    },

    componentWillMount() {
        var date = moment(new Date()).format('YYYY-MM-DD');
            props.notes = api.listNotes(date)
            props.employees = api.listEmployees()

    },

    componentDidMount() {

    },

    componentWillUnmount() {

    },

    handleNoteDelete(note) {
        api.deleteNote(note.id);
    },

    handleNoteAdd(noteData) {
        api.createNote(noteData);
    },

    handleChangeDateStart(date) {
        api.listNotes(date);
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
