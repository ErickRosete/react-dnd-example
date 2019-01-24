import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const itemCode = {
  beginDrag(props) {
    return {
      itemId: props.item.itemId ? props.item.itemId : props.item.id,
      fromTargetId: props.targetId
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const { itemId, fromTargetId } = monitor.getItem();
    const { toTargetId } = monitor.getDropResult();

    if (fromTargetId === toTargetId) {
      return;
    }

    console.log(itemId, fromTargetId, toTargetId)
    return props.handleDrop(itemId, fromTargetId, toTargetId);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Item extends Component {
  render() {
    const { isDragging, connectDragSource, item } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div className="item" style={{ opacity }}>
        <span>{item.name}</span>
      </div>
    );
  }
}

export default DragSource('type1', itemCode, collect)(Item);
