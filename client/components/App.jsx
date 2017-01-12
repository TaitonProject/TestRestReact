import React from 'react';

import moment from 'moment';

import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
import CircularProgress from '../../node_modules/material-ui/CircularProgress/CircularProgress';
import Dialog from '../../node_modules/material-ui/Dialog/Dialog';
import FlatButton from '../../node_modules/material-ui/FlatButton/FlatButton';

import StatementsStore from '../stores/StatementsStore';
import StatementsActions from '../actions/StatementsActions';

import EmployeesStore from '../stores/EmployeesStore';
import EmployeesActions from '../actions/EmployeesActions';

import StatementEditor from './StatementEditor.jsx';
import StatementsGrid from './StatementsGrid.jsx';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import './App.less';

function getStateFromFlux() {
    return {
        isLoadingStatements: StatementsStore.isLoading(),
        isLoadingEmployees: EmployeesStore.isLoading(),
        statements: StatementsStore.getStatements(),
        employees: EmployeesStore.getEmployees(),
        addStatementError: StatementsStore.getStatementError()
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
        StatementsActions.loadStatements(date);
    },

    componentDidMount() {
        StatementsStore.addChangeListener(this._onChange);
        EmployeesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        StatementsStore.removeChangeListener(this._onChange);
        EmployeesStore.removeChangeListener(this._onChange);
    },

    handleStatementDelete(statement) {
        StatementsActions.deleteStatement(statement);
    },

    handleStatementAdd(statement) {
        StatementsActions.createStatement(statement);
    },

    handleChangeDateStart(date) {
        StatementsActions.loadStatements(date);
    },

    handleChangeAddStatementErr(){
        this.setState({addStatementError: false});
    },

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={this.handleChangeAddStatementErr}
            />,
        ];

        return (
            <MuiThemeProvider>
                <div className='App'>
                    <h2 className="App__header">Бронирование конференц-зала</h2>
                    <div>
                        <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.addStatementError}
                            onRequestClose={this.handleChangeAddStatementErr}
                        >
                            Ошибка, добавить Вашу заявку не удалось.
                            Проверьте введенные данные!
                        </Dialog>
                    </div>
                    <StatementEditor onStatementAdd={this.handleStatementAdd} getListByDate={this.handleChangeDateStart}
                                employees={this.state.employees}
                                addStatementError={this.handleChangeAddStatementErr}/>
                    {
                        (!this.state.isLoadingStatements ?
                            <StatementsGrid statements={this.state.statements} onStatementDelete={this.handleStatementDelete}/>
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
