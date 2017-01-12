import React from 'react';
import Note from './Note.jsx';

import Masonry from 'react-masonry-component';

var injectTapEventPlugin = require("react-tap-event-plugin");

import './NotesGrid.less';

const NotesGrid = React.createClass({

    componentDidMount(){
    },

    render() {
        const masonryOptions = {
            itemSelector: '.Note',
            columnWidth: 500,
            gutter: 10,
            isFitWidth: true
        };
        return (
            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    (this.props.notes.length != 0) ?
                    this.props.notes.map(note =>
                        <Note
                            key={note.idMessage}
                            onDelete={this.props.onNoteDelete.bind(null, note)}
                            employee={note.employee}
                            requestedTime={note.requestedTime}
                            durationTime={note.durationTime}
                        >
                        </Note>
                    )
                        :
                        <h1>Нет записей</h1>
                }
            </Masonry>
        );
    }
});

export default NotesGrid;
