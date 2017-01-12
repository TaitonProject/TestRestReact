import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/StatementConstants';

const CHANGE_EVENT = 'change';

let _statements = [];
let _loadingError = null;
let _isLoading = true;
let _addStatementError = false;

function formatStatement(statement) {
    return {
        id: statement.idMessage,
        employee: statement.employee,
        requestedDate: statement.requestedDate,
        startTime: statement.requestedTime,
        endTime: statement.durationTime
    };
}

const StatementStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getStatements() {
        return _statements;
    },

    getStatementError(){
        return _addStatementError;
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
        case AppConstants.LOAD_STATEMENTS_REQUEST: {
            _isLoading = true;
            StatementStore.emitChange();
            break;
        }
        case AppConstants.LOAD_STATEMENTS_SUCCESS: {
            _isLoading = false;
            _statements = action.statements.map(formatStatement);
            _loadingError = null;
            StatementStore.emitChange();
            break;
        }

        case AppConstants.LOAD_STATEMENTS_FAIL: {
            _loadingError = action.error;
            StatementStore.emitChange();
            break;
        }

        case AppConstants.ADD_STATEMENT_SUCCESS:{
            _addStatementError = false;
            StatementStore.emitChange();
            break;
        }

        case AppConstants.ADD_STATEMENT_FAIL:{
            _addStatementError = true;
            StatementStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default StatementStore;
