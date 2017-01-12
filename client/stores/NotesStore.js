import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppNoteConstants';

const CHANGE_EVENT = 'change';

let _notes = [];
let _loadingError = null;
let _isLoading = true;
let _addNoteError = false;

function formatNote(note) {
    return {
        idMessage: note.idMessage,
        employee: note.employee,
        requestedDate: note.requestedDate,
        durationTime: note.durationTime,
        requestedTime: note.requestedTime
    };
}

const NoteStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getNotes() {
        return _notes;
    },

    getNoteError(){
        return _addNoteError;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (action) {
    switch (action.type) {
        case AppConstants.LOAD_NOTES_REQUEST: {
            _isLoading = true;
            NoteStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_SUCCESS: {
            _isLoading = false;
            _notes = action.notes.map(formatNote);
            _loadingError = null;
            NoteStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_FAIL: {
            _loadingError = action.error;
            NoteStore.emitChange();
            break;
        }

        case AppConstants.ADD_NOTE_SUCCESS:{
            _notes = action.notes.push(action.data);
            _addNoteError = false;
            NoteStore.emitChange();
            break;
        }

        case AppConstants.ADD_NOTE_FAIL:{
            _addNoteError = true;
            NoteStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default NoteStore;
