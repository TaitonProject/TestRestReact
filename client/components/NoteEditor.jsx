import React from 'react';


import './NoteEditor.less';

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
        const date = {
            dateTimeStart : this.state.dateTimeStart
        };

        this.setState({ dateTimeStart: event.target.value });
        this.props.getListByDate(date);
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
        this.setState({ author: null, dateTimeStart: null , dateTimeEnd: null});
    },

    render() {
        return (
            <div className='NoteEditor'>
                <input
                    type='text'
                    className='NoteEditor__author'
                    placeholder='Enter author'
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="time"
                    className="NoteEditor__dateTimeStart"
                    value={this.state.dateTimeStart}
                    onChange={this.handleDateTimeStartChange}
                />
                <input
                    type="time"
                    className="NoteEditor__dateTimeEnd"
                    value={this.state.dateTimeEnd}
                    onChange={this.handleDateTimeEndChange}
                />
                <div className='NoteEditor__footer'>
                    <button
                        className='NoteEditor__button'
                        disabled={!this.state.author}
                        onClick={this.handleNoteAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
});

export default NoteEditor;
