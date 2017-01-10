import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const EmployeeActions = {
    getListEmployee() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_EMPLOYEES_REQUEST
        });

        api.getListEmployee()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_EMPLOYEES_SUCCESS,
                notes: data
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
