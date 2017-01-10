import React from 'react';
import DateTime from '../../node_modules/grommet/components/DateTime';
import Form from '../../node_modules/grommet/components/Form';
import FormFiled from '../../node_modules/grommet/components/FormField';
import Button from '../../node_modules/grommet/components/Button';
import Select from '../../node_modules/grommet/components/Select';

const NoteEditor = React.createClass({
    getInitialState() {
        return {
            employee: '',
            requestedTime: '',
            durationTime: '',
        };
    },

    handleSelectChange(event) {
        this.setState({value: event.target.value});
    },

    handleDateTimeStartChange(event) {
        this.props.getListByDate(this.state.requestedTime);
        this.setState({ requestedTime: event.target.value });
    },

    handleDateTimeEndChange(event) {
        this.setState({ durationTime: event.target.value });
    },

    handleNoteAdd() {
        const newNote = {
            employee: this.state.employee,
            dateTimeStart: this.state.requestedTime,
            dateTimeEnd: this.state.durationTime
        };

        this.props.onNoteAdd(newNote);
        this.setState({ employee: '', requestedTime: null , durationTime: null});
    },

    render() {
        return (
                <div>
                    <Select
                        value={this.state.employee}
                        onChange={this.handleSelectChange}
                        options={this.props.employees}
                    >
                    </Select>
                        <input
                            type="time"
                            value={this.state.requestedTime}
                            onChange={this.handleDateTimeStartChange}/>
                        <input
                            type="time"
                            value={this.state.durationTime}
                            onChange={this.handleDateTimeEndChange}/>
                    <button
                        onClick={this.handleNoteAdd}
                        type='submit'

                    >
                        Ok
                    </button>
                </div>
        );
    }
});

export default NoteEditor;
