import React, { useState } from 'react';
import ProcessColumn from './ProcessColumn';
import '../styles/ProcessDashboard.css';
import { DragDropContext } from '@hello-pangea/dnd';
import { FaSearch } from 'react-icons/fa';

const MAX_SELECTED_ORDERS = 5;

const initialOrderState = {
    "Unprocessed": [
        { id: 'u1', staffName: 'John Doe', orderId: '#ORD001', deliveryDate: '2025-06-01', paymentStatus: 'Paid', isSelected: false },
        { id: 'u2', staffName: 'Jane Smith', orderId: '#ORD002', deliveryDate: '2025-06-02', paymentStatus: 'Pending', isSelected: false },
        { id: 'u3', staffName: 'Alice Johnson', orderId: '#ORD003', deliveryDate: '2025-06-03', paymentStatus: 'Paid', isSelected: false },
    ],
    "In-Processing": [
        { id: 'ip1', staffName: 'Bob Williams', orderId: '#ORD004', deliveryDate: '2025-06-04', paymentStatus: 'Paid', isSelected: false },
        { id: 'ip2', staffName: 'Charlie Brown', orderId: '#ORD005', deliveryDate: '2025-06-05', paymentStatus: 'Pending', isSelected: false },
    ],
    "Ready": [],
    "Out For Delivery": [],
    "Delivered": [],
};

const ProcessDashboard = () => {
    const [orders, setOrders] = useState(initialOrderState);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchById, setSearchById] = useState(false);
    const [sendSms, setSendSms] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleSearchById = () => {
        setSearchById(prev => !prev);
    };

    const toggleSendSms = () => {
        setSendSms(prev => !prev);
    };

    const toggleSendEmail = () => {
        setSendEmail(prev => !prev);
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = source.droppableId;
        const destCol = destination.droppableId;

        const sourceItems = Array.from(orders[sourceCol]);
        const destItems = Array.from(orders[destCol]);
        const [movedItem] = sourceItems.splice(source.index, 1);

        if (sourceCol === destCol) {
            sourceItems.splice(destination.index, 0, movedItem);
            setOrders(prev => ({
                ...prev,
                [sourceCol]: sourceItems,
            }));
        } else {
            destItems.splice(destination.index, 0, movedItem);
            setOrders(prev => ({
                ...prev,
                [sourceCol]: sourceItems,
                [destCol]: destItems,
            }));
        }
    };

    const handleToggleSelect = (orderId, columnTitle) => {
        const selectedCount = Object.values(orders).flat().filter(o => o.isSelected).length;
        setOrders(prev => {
            const updatedColumn = prev[columnTitle].map(order => {
                if (order.id === orderId) {
                    if (!order.isSelected && selectedCount >= MAX_SELECTED_ORDERS) {
                        alert(`You can select a maximum of ${MAX_SELECTED_ORDERS} orders.`);
                        return order;
                    }
                    return { ...order, isSelected: !order.isSelected };
                }
                return order;
            });
            return { ...prev, [columnTitle]: updatedColumn };
        });
    };

    const getFilteredOrders = (columnTitle) => {
        const term = searchTerm.toLowerCase();
        return orders[columnTitle].filter(order => {
            return searchById
                ? order.orderId.toLowerCase().includes(term)
                : order.staffName.toLowerCase().includes(term) ||
                order.orderId.toLowerCase().includes(term);
        });
    };

    return (
        <div className="process-dashboard-container">
            <div className="process-dashboard-header">
                <div className="dashboard-title">
                    <h1>Process</h1>
                    <p>Dashboard - Process</p>
                </div>
                <div className="dashboard-actions">
                    <button
                        className={`checkbox-label ${sendSms ? 'active' : ''}`}
                        onClick={toggleSendSms}
                    >
                        Send SMS
                    </button>
                    <button
                        className={`checkbox-label ${sendEmail ? 'active' : ''}`}
                        onClick={toggleSendEmail}
                    >
                        Send Email
                    </button>
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="process-search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div>
                            <label className="search-toggle-label">
                                <input
                                    type="checkbox"
                                    className={`search-toggle-button ${searchById ? 'active' : ''}`}
                                    checked={searchById}
                                    onChange={toggleSearchById}
                                />
                                Search By Order ID
                            </label>
                        </div>
                        </div>

                        <button className="action-button secondary">
                            Show Advance Filters
                        </button>
                    </div>
                    <div className="selection-note">
                        Note: You can select a maximum of {MAX_SELECTED_ORDERS} orders at a time.
                    </div>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="process-columns-wrapper">
                        {Object.keys(orders).map(columnTitle => (
                            <ProcessColumn
                                key={columnTitle}
                                title={columnTitle}
                                orders={getFilteredOrders(columnTitle)}
                                onToggleSelect={(id) => handleToggleSelect(id, columnTitle)}
                            />
                        ))}
                    </div>
                </DragDropContext>
            </div>
            );
};

            export default ProcessDashboard;