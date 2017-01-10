import React from 'react';
import SelectField from '../../node_modules/material-ui/SelectField/SelectField';
import MenuItem from '../../node_modules/material-ui/MenuItem/MenuItem';
import RaisedButton from '../../node_modules/material-ui/RaisedButton/RaisedButton';

const NoteEditor = React.createClass({
    getInitialState() {
        return {
            employee: '',
            requestedTime: '',
            durationTime: '',
            requestedDate: ''
        };
    },

    componentWillMount(){

    },

    componentDidMount(){
        var select = document.getElementById("employeeSelect");
        console.log(this.props.employees);
        var a = ["aaa","bbb","aaa","bbb","aaa","bbb","aaa","bbb"];
        for(var i=0; i < a.length; i++){
            var newOption = document.createElement('option');
            newOption.textContent = a[i];
            select.appendChild(newOption);
        }
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
        this.setState({ requestedDate: event.target.value});
        this.props.getListByDate(event.target.value);
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
        var data = this.props.employees;
        console.log('tut ' + this.props.employees.map(function (item, index) {
                return (
                    <select key={index}>

                    </select>
                )
            }));
        return (
                <div>
                        <select id="employeeSelect">
                        </select>
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
                        <button onClick={this.handleNoteAdd}>Ok</button>
                </div>
        );
    }
});

export default NoteEditor;
