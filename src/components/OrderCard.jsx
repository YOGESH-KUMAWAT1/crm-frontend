import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import '../styles/OrderCard.css';

const OrderCard = ({ order, index, onToggleSelect }) => {
    return (
        <Draggable draggableId={order.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`order-card ${order.isSelected ? 'selected' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <h4>{order.orderId}</h4>
                    <p>Staff: {order.staffName}</p>
                    <p>Delivery: {order.deliveryDate}</p>
                    <p>Payment: {order.paymentStatus}</p>
                </div>
            )}
        </Draggable>
    );
};

export default OrderCard;
