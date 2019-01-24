import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const trashCode = {
    drop(props, monitor, component) {
        return {
            toTargetId: 0
        };
    }
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        // item: monitor.getItem()
    }
}

class Trash extends Component {
    render() {
        const { connectDropTarget, hovered } = this.props;
        const backgroundColor = hovered ? 'salmon' : 'white';
        return connectDropTarget(
            <div className="target" style={{ backgroundColor }} >
                I am a trash can
            </div>);
    }
}

export default DropTarget('type1', trashCode, collect)(Trash);
