import React from 'react';

import './Statement.less';

const Statement = React.createClass({

    render() {

        return (
            <div className='Statement'>
                <span className='Statement__del-icon' onClick={this.props.onDelete}> × </span>
                {
                    <h4 className='Statement__author'>{this.props.employee}</h4>
                }
                <div className='Statement__dateTimeStart'>{this.props.startTime} - {this.props.endTime}</div>
            </div>
        );
    }
});

export default Statement;
