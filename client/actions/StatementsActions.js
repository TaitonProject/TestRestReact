import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/StatementConstants';

import moment from 'moment';

import api from '../api';

const StatementActions = {
    loadStatements(date) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_STATEMENTS_REQUEST
        });
        var dateTrue = moment(date).format('YYYY-MM-DD');
        api.listStatements(dateTrue)
            .then(({data}) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_STATEMENTS_SUCCESS,
                    statements: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_STATEMENTS_FAIL,
                    error: err
                })
            );
    },

    createStatement(statement) {
        var newStatement = {
            employee: statement.employee,
            startTime: moment(statement.startTime).format('HH:mm'),
            endTime: moment(statement.endTime).format('HH:mm'),
            requestedDate: moment(statement.requestedDate).format('YYYY-MM-DD')
        };

        api.createStatement(newStatement)
            .then(() =>
                AppDispatcher.dispatch({
                    type: Constants.ADD_STATEMENTS_SUCCESS
                }, this.loadStatements(newStatement.requestedDate))

            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.ADD_STATEMENTS_FAIL,
                    error: err
                },console.log(err))
            );
    },


    deleteStatement(Statement) {
        var dateStatement = Statement.requestedDate;
        api.deleteStatement(Statement.id)
            .then(() =>
                this.loadStatements(dateStatement)
            )
            .catch(err =>
                console.error(err)
            );
    }
};

export default StatementActions;
