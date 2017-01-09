import React from 'react';
import DateTime from '../../node_modules/grommet/components/DateTime';
import Form from '../../node_modules/grommet/components/Form';
import FormFiled from '../../node_modules/grommet/components/FormField';
import Button from '../../node_modules/grommet/components/Button';
import TextInput from '../../node_modules/grommet/components/TextInput';


const NoteEditor = React.createClass({
    getInitialState() {
        return {
            author: '',
            dateTimeStart: '',
            dateTimeEnd: ''
        };
    },

    handleAuthorChange(event) {
        this.setState({ author: event.target.value });
    },

    handleDateTimeStartChange(event) {
        this.setState({ dateTimeStart: event.target.value });
    },

    handleDateTimeEndChange(event) {
        this.setState({ dateTimeEnd: event.target.value });
    },


    handleNoteAdd() {
        const newNote = {
            author: this.state.author,
            dateTimeStart: this.state.dateTimeStart,
            dateTimeEnd: this.state.dateTimeEnd
        };

        this.props.onNoteAdd(newNote);
        this.setState({ author: '', dateTimeStart: null , dateTimeEnd: null});
    },

    render() {
        return (
                <Form>
                    <FormFiled
                        <TextInput></TextInput>
                        type='text'
                        placeholder='Enter author'
                        value={this.state.author}
                        onChange={this.handleAuthorChange}>
                    </FormFiled>
                    <FormFiled>
                        <DateTime
                            value={this.state.dateTimeStart}
                            onChange={this.handleDateTimeStartChange}/>
                    </FormFiled>
                    <FormFiled>
                        <DateTime
                            value={this.state.dateTimeEnd}
                            onChange={this.handleDateTimeEndChange}/>
                    </FormFiled>
                    <Button
                        onClick={this.handleNoteAdd}
                        type='submit'
                        label='Отправить'
                    >
                    </Button>
                </Form>
        );
    }
});

export default NoteEditor;
