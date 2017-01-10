import React from 'react';
import Note from './Note.jsx';

import Masonry from 'react-masonry-component';

import './NotesGrid.less';

const NotesGrid = React.createClass({
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
                }
            </Masonry>
        );
    }
});

export default NotesGrid;
