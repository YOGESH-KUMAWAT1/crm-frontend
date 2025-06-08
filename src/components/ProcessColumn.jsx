import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import OrderCard from './OrderCard';
import '../styles/ProcessColumn.css';

const ProcessColumn = ({ title, orders, onToggleSelect }) => {
    return (
        <div className="process-column">
            <div className="column-header">
                <h3>{title}</h3>
                {/* Optional checkbox logic can go here if needed */}
            </div>
            <Droppable droppableId={title}>
                {(provided, snapshot) => (
                    <div
                        className={`column-cards ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {orders.map((order) => ( // Removed 'index' from here
                            <OrderCard
                                key={order.id} // <--- CHANGE IS HERE: Use order.id as the key
                                order={order}
                                // You still need to pass the index to Draggable,
                                // but not as the React key for the component itself.
                                // The Draggable component expects 'index' as a prop.
                                index={orders.findIndex(o => o.id === order.id)} // Find the correct index in the *filtered* array
                                onToggleSelect={() => onToggleSelect(order.id, title)}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ProcessColumn;