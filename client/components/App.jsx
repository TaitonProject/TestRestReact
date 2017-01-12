import React from 'react';

import moment from 'moment';

import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
import CircularProgress from '../../node_modules/material-ui/CircularProgress/CircularProgress';

import NotesStore from '../stores/NotesStore';
import NotesActions from '../actions/NotesActions';

import EmployeesStore from '../stores/EmployeesStore';
import EmployeesActions from '../actions/EmployeesActions';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import './App.less';

function getStateFromFlux() {
    return {
        isLoadingNotes: NotesStore.isLoading(),
        isLoadingEmployees: EmployeesStore.isLoading(),
        notes: NotesStore.getNotes(),
        employees: EmployeesStore.getEmployees(),
        addNoteError: NotesStore.getNoteError()
    };
}

const App = React.createClass({
    getInitialState() {
        return (
            getStateFromFlux()
        );
    },

    componentWillMount() {
        var date = moment(new Date()).format('YYYY-MM-DD');
        EmployeesActions.loadEmployees();
        NotesActions.loadNotes(date);
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
        NotesActions.deleteNote(note);
    },

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    },

    handleChangeDateStart(date) {
        NotesActions.loadNotes(date);
    },

    render() {
        return (
            <MuiThemeProvider>
                <div className='App'>
                    <h2 className="App__header">Бронирование конференц-зала</h2>
                    <NoteEditor onNoteAdd={this.handleNoteAdd} getListByDate={this.handleChangeDateStart}
                                employees={this.state.employees}
                                addNoteError={this.state.addNoteError}/>
                    {
                        (!this.state.isLoadingNotes ?
                            <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete}/>
                            :
                            <CircularProgress size={80} thickness={5} />)
                    }
                </div>
            </MuiThemeProvider>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
