import React from 'react';
import Statement from './Statement.jsx';

import Masonry from 'react-masonry-component';

import './StatementsGrid.less';

const StatementsGrid = React.createClass({


    render() {
        const masonryOptions = {
            itemSelector: '.Statement',
            columnWidth: 500,
            gutter: 10,
            isFitWidth: true
        };
        return (
            <Masonry
                className='StatementsGrid'
                options={masonryOptions}
            >
                {
                    (this.props.statements.length != 0) ?
                        this.props.statements.map(statement =>
                            <Statement
                                key={statement.id}
                                onDelete={this.props.onStatementDelete.bind(null, statement)}
                                employee={statement.employee}
                                startTime={statement.startTime}
                                endTime={statement.endTime}
                            >
                            </Statement>
                        )
                        :
                        <h2>Нет записей</h2>
                }
            </Masonry>
        );
    }
});

export default StatementsGrid;
