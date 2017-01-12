import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppNoteConstants';

import moment from 'moment';

import api from '../api';

const NoteActions = {
    loadNotes(date) {

        AppDispatcher.dispatch({
            type: Constants.LOAD_NOTES_REQUEST
        });
        var dateTrue = moment(date).format('YYYY-MM-DD');
        api.listNotes(dateTrue)
            .then(({data}) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_NOTES_SUCCESS,
                    notes: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_NOTES_FAIL,
                    error: err
                })
            );
    },

    createNote(note) {
        var newNote = {
            employee: note.employee,
            requestedTime: moment(note.requestedTime).format('HH:mm'),
            durationTime: moment(note.durationTime).format('HH:mm'),
            requestedDate: moment(note.requestedDate).format('YYYY-MM-DD')
        };

        api.createNote(newNote)
            .then(() =>
                AppDispatcher.dispatch({
                    type: Constants.ADD_NOTE_SUCCESS
                }),
                this.loadNotes(newNote.requestedDate)
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.ADD_NOTE_FAIL,
                    error: err
                },
                    console.log(err))
            );
    },

    deleteNote(note) {
        var dateNote = note.requestedDate;
        api.deleteNote(note.idMessage)
            .then(() =>
                this.loadNotes(dateNote)
            )
            .catch(err =>
                console.error(err)
            );
    }
};

export default NoteActions;
