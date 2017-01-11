import React from 'react';
import SelectField from '../../node_modules/material-ui/SelectField/SelectField';
import MenuItem from '../../node_modules/material-ui/MenuItem/MenuItem';
import RaisedButton from '../../node_modules/material-ui/RaisedButton/RaisedButton';
import DatePicker from '../../node_modules/material-ui/DatePicker/DatePicker';
import moment from 'moment';


const NoteEditor = React.createClass({
    getInitialState() {
        return {
            employee: '',
            requestedTime: '',
            durationTime: '',
            requestedDate: null
        };
    },

    componentWillMount(){

    },



    handleSelectChange(event) {
        this.setState({employee: event.target.value});
    },

    handleTimeStartChange(event) {
        this.setState({ requestedTime: event.target.value });
    },

    handleTimeEndChange(event) {
        this.setState({ durationTime: event.target.value });
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
        this.setState({ employee: '', requestedTime: null , durationTime: null, requestedDate: null});
    },

    render() {
        console.log('tut ' + this.props.employees);
        return (
                <div>
                        <SelectField
                            value={this.state.employee}
                            onChange={this.handleSelectChange}
                        >
                            {
                                this.props.employees.map(em =>
                                    <MenuItem
                                        key={em.employee}
                                        employee={em.employee}
                                        primaryText={`Item ${em.employee}`}
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

                        <input
                            type="time"
                            value={this.state.requestedTime}
                            onChange={this.handleTimeStartChange}/>
                        <input
                            type="time"
                            value={this.state.durationTime}
                            onChange={this.handleTimeEndChange}/>
                        <button onClick={this.handleNoteAdd}>Ok</button>
                </div>
        );
    }
});

export default NoteEditor;
