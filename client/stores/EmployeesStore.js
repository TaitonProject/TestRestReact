import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppEmployeeConstants';

const CHANGE_EVENT = 'change';

let _employees = [];
let _loadingError = null;
let _isLoading = true;

function formatEmployee(employee) {
    return {
        id: employee.idEmployee,
        name: employee.name
    };
}

const EmployeeStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getEmployees() {
        return _employees;
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
        case AppConstants.LOAD_EMPLOYEES_REQUEST: {
            console.log('LOAD_EMPLOYEES_REQUEST - employee');

            _isLoading = true;
            EmployeeStore.emitChange();
            break;
        }

        case AppConstants.LOAD_EMPLOYEES_SUCCESS: {
            console.log('LOAD_EMPLOYEES_SUCCESS - employee');
            _isLoading = false;
            _employees = action.employees.map(formatEmployee);
            _loadingError = null;
            EmployeeStore.emitChange();
            break;
        }

        case AppConstants.LOAD_EMPLOYEES_FAIL: {
            console.log('LOAD_EMPLOYEES_FAIL - employee');
            _loadingError = action.error;
            EmployeeStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default EmployeeStore;
