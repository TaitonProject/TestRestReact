import React from 'react';
import SelectField from '../../node_modules/material-ui/SelectField/SelectField';
import MenuItem from '../../node_modules/material-ui/MenuItem/MenuItem';
import RaisedButton from '../../node_modules/material-ui/RaisedButton/RaisedButton';
import DatePicker from '../../node_modules/material-ui/DatePicker/DatePicker';

import TimePicker from '../../node_modules/material-ui/TimePicker/TimePicker';

const NoteEditor = React.createClass({

    getInitialState() {
        return {
            employee: '',
            requestedTime: '',
            durationTime: '',
            requestedDate: new Date()
        };
    },

    componentWillMount(){

    },


    handleSelectChange(event, index, value) {
        console.log(value);

        this.setState({employee: value});
    },

    handleTimeStartChange(event, time) {
        console.log(time);
        this.setState({ requestedTime: time });
    },

    handleTimeEndChange(event, time) {
        console.log(time);
        this.setState({ durationTime: time });
    },

    handleRequestedDateChange(event, date){
        /*var dateTrueFormat = moment(date).format('YYYY-MM-DD');*/
        console.log(date);
        this.setState({ requestedDate: date});
        this.props.getListByDate(date);
    },

    handleNoteAdd() {
        const newNote = {
            employee: this.state.employee,
            requestedTime: this.state.requestedTime,
            durationTime: this.state.durationTime,
            requestedDate: this.state.requestedDate
        };

        this.props.onNoteAdd(newNote);
        this.setState({employee: '', requestedTime: null , durationTime: null, requestedDate: null});
    },

    render() {
        console.log('tut ' + this.props.employees);
        return (
                <div>
                        <SelectField
                            value={this.state.employee}
                            onChange={this.handleSelectChange}>
                            {
                                this.props.employees.map(em =>
                                    <MenuItem
                                        key={em.id}
                                        value={em.id}
                                        primaryText={`Сотрудник ${em.name}` + ` ${em.id}`}
                                    >
                                    </MenuItem>
                                )
                            }
                        </SelectField>

                        <DatePicker
                            hintText="Выберите дату"
                            okLabel="OK"
                            cancelLabel="Cancelar"
                            autoOk={true}
                            defaultDate={new Date()}
                            onChange={this.handleRequestedDateChange}
                        />

                        <TimePicker
                            format="24hr"
                            hintText="24hr Format"
                            onChange={this.handleTimeStartChange}
                        />

                        <TimePicker
                            format="24hr"
                            hintText="24hr Format"
                            onChange={this.handleTimeEndChange}
                        />

                    <RaisedButton
                        type="submit"
                        label="Отправить"
                        primary={true}
                        onClick={this.handleNoteAdd}
                    />
                </div>
        );
    }
});

export default NoteEditor;
