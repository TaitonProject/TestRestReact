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
            requestedDate: ''
        };
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

    handleRequestedDateChange(event){
        this.props.getListByDate(this.state.requestedDate);
        console.log(this.state.requestedDate);
        this.setState({ requestedDate: event.target.value});
        console.log(event.target.value);


    },

    handleNoteAdd() {
        const newNote = {
            employee: this.state.employee,
            requestedTime: this.state.requestedTime,
            durationTime: this.state.durationTime,
            requestedDate: this.state.requestedDate
        };

        this.props.onNoteAdd(newNote);
        this.setState({ employee: null, requestedTime: null , durationTime: null, requestedDate: null});
    },

    render() {
        return (
                <div>
                    <Select
                        onChange={this.handleSelectChange}
                        options={this.props.employees}
                    />
                    <input
                        type="date"
                        value={this.state.requestedDate}
                        onChange={this.handleRequestedDateChange}/>
                        <input
                            type="time"
                            value={this.state.requestedTime}
                            onChange={this.handleTimeStartChange}/>
                        <input
                            type="time"
                            value={this.state.durationTime}
                            onChange={this.handleTimeEndChange}/>
                    <Button
                        onClick={this.handleNoteAdd}
                        type='submit'
                        label='Ok'
                    >
                    </Button>
                </div>
        );
    }
});

export default NoteEditor;
