import React from 'react';

import './Note.less';

import Timestamp from 'grommet/components/Timestamp';

const Note = React.createClass({
    render() {

        return (
            <div className='Note'>
                <span className='Note__del-icon' onClick={this.props.onDelete}> × </span>
                {
                    this.props.author
                    ?
                        <h4 className='Note__author'>{this.props.author}</h4>
                    :
                        null
                }
                <div className='Note__dateTimeStart'>{this.props.dateTimeStart}</div>
                <div className='Note__dateTimeEnd'>{this.props.dateTimeEnd}</div>
            </div>
        );
    }
});

export default Note;
