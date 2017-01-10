import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const EmployeeActions = {
    loadEmployees() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_EMPLOYEES_REQUEST
        });

        api.listEmployees()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_EMPLOYEES_SUCCESS,
                employees: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_EMPLOYEES_FAIL,
                error: err
            })
        );
    },
};

export default EmployeeActions;
