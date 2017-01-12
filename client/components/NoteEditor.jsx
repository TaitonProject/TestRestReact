import React from 'react';
import SelectField from '../../node_modules/material-ui/SelectField/SelectField';
import MenuItem from '../../node_modules/material-ui/MenuItem/MenuItem';
import RaisedButton from '../../node_modules/material-ui/RaisedButton/RaisedButton';
import DatePicker from '../../node_modules/material-ui/DatePicker/DatePicker';
import Dialog from '../../node_modules/material-ui/Dialog/Dialog';
import FlatButton from '../../node_modules/material-ui/FlatButton/FlatButton';


import TimePicker from '../../node_modules/material-ui/TimePicker/TimePicker';

const NoteEditor = React.createClass({

    getInitialState() {
        return {
            employee: '',
            requestedTime: null,
            durationTime: null,
            requestedDate: new Date(),
            open: false
        };
    },

    componentWillMount(){

    },

    handleSelectChange(event, index, value) {
        this.setState({employee: value});
    },

    handleTimeStartChange(event, time) {
        this.setState({requestedTime: time});
    },

    handleTimeEndChange(event, time) {
        this.setState({durationTime: time});
    },

    handleRequestedDateChange(event, date){
        this.setState({requestedDate: date});
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
        this.setState({employee: '', requestedTime: null, durationTime: null, requestedDate: null});
    },

    handleOpen(){
        return this.setState({open: true});
    },

    handleClose (){
        return this.setState({open: false});
    },

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Discard"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <div>
                    {/*{this.props.addNoteError ? this.handleOpen : null}*/}
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Discard draft?
                    </Dialog>
                </div>

                <SelectField
                    hintText="Выберите профиль"
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
                    okLabel="Выбрать"
                    cancelLabel="Отмена"
                    autoOk={true}
                    value={this.state.requestedDate}
                    onChange={this.handleRequestedDateChange}
                />

                <TimePicker
                    format="24hr"
                    hintText="Время начала"
                    value={this.state.requestedTime}
                    onChange={this.handleTimeStartChange}
                />

                <TimePicker
                    format="24hr"
                    hintText="Время окончания"
                    value={this.state.durationTime}
                    onChange={this.handleTimeEndChange}
                />

                <RaisedButton
                    className="NoteEditor__button"
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
