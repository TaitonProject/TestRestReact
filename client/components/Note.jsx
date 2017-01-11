import React from 'react';

import './Note.less';

var injectTapEventPlugin = require("react-tap-event-plugin");

const Note = React.createClass({

    render() {

        return (
            <div className='Note'>
                <span className='Note__del-icon' onClick={this.props.onDelete}> × </span>
                {
                        <h4 className='Note__author'>{this.props.employee}</h4>
                }
                <div className='Note__dateTimeStart'>{this.props.requestedTime}</div>
                <div className='Note__dateTimeEnd'>{this.props.durationTime}</div>
            </div>
        );
    }
});

export default Note;
