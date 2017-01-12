import React from 'react';
import SelectField from '../../node_modules/material-ui/SelectField/SelectField';
import MenuItem from '../../node_modules/material-ui/MenuItem/MenuItem';
import RaisedButton from '../../node_modules/material-ui/RaisedButton/RaisedButton';
import DatePicker from '../../node_modules/material-ui/DatePicker/DatePicker';

import TimePicker from '../../node_modules/material-ui/TimePicker/TimePicker';

const StatementEditor = React.createClass({

    getInitialState() {
        return {
            employee: '',
            startTime: null,
            endTime: null,
            requestedDate: new Date()
        };
    },

    componentWillMount(){

    },

    handleSelectDateChange(event, index, value) {
        this.setState({employee: value});
    },

    handleStartTimeChange(event, time) {
        this.setState({startTime: time});
    },

    handleEndTimeChange(event, time) {
        this.setState({endTime: time});
    },

    handleRequestedDateChange(event, date){
        this.setState({requestedDate: date});
        this.props.getListByDate(date);
    },

    handleStatementAdd() {
        const newStatement = {
            employee: this.state.employee,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            requestedDate: this.state.requestedDate
        };

        this.props.onStatementAdd(newStatement);
        this.setState({employee: '', startTime: null, endTime: null, requestedDate: null});
    },


    render() {
        return (
            <div>
                <SelectField
                    hintText="Выберите профиль"
                    value={this.state.employee}
                    onChange={this.handleSelectDateChange}>
                    {
                        this.props.employees.map(em =>
                            <MenuItem
                                key={em.id}
                                value={em.id}
                                primaryText={`Сотрудник ${em.name}` + ` ${em.id}`}
                            >
                            </MenuItem>)
                    }
                </SelectField>

                <DatePicker
                    hintText="Выберите дату"
                    okLabel="Выбрать"
                    cancelLabel="Отмена"
                    autoOk={true}
                    value={this.state.requestedDate}
                    onChange={this.handleRequestedDateChange}
                />

                <TimePicker
                    format="24hr"
                    hintText="Время начала"
                    value={this.state.startTime}
                    onChange={this.handleStartTimeChange}
                />

                <TimePicker
                    format="24hr"
                    hintText="Время окончания"
                    value={this.state.endTime}
                    onChange={this.handleEndTimeChange}
                />

                <RaisedButton
                    className="StatementEditor__button"
                    type="submit"
                    label="Отправить"
                    primary={true}
                    onClick={this.handleStatementAdd}
                />
            </div>
        );
    }
});

export default StatementEditor;
