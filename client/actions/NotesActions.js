import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import moment from 'moment';

import api from '../api';

const NoteActions = {
    loadNotes(date) {

        AppDispatcher.dispatch({
            type: Constants.LOAD_NOTES_REQUEST
        });
        var dateTrue = moment(date).format('YYYY-MM-DD');
        console.log(dateTrue);
        api.listNotes(dateTrue)
        .then(({ data }) =>
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

    createNote(note, date) {
        api.createNote(note)
        .then(() =>
            this.loadNotes(date)
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteNote(idMessage, date) {
        api.deleteNote(idMessage)
        .then(() =>
            this.loadNotes(date)
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default NoteActions;
