// src/components/CustomerFilterSection.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
// Import your global CSS or specific CSS module here if applicable

function CustomerFilterSection({
  customerCreatedDate,
  onCustomerCreatedDateChange,
  storeName,
  onStoreNameChange,
  onApplyFilter,
  onResetChanges,
  visibleColumns,
  onToggleColumn,
  uniqueStoreNames
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // <--- New state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toggleDropdown = () => { // <--- New function
    setIsDropdownOpen(prev => !prev);
  };
  const dropdownRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  // --- UPDATED columnOptions ARRAY ---
  const columnOptions = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'member', label: 'Member' },
    { key: 'primaryStore', label: 'Primary Store' },
    { key: 'customerPhone', label: 'Customer Phone' }, // New
    { key: 'emailAddress', label: 'Email Address' },
    { key: 'addressCity', label: 'Address / City' }, // New
    { key: 'state', label: 'State' }, // New
    { key: 'zipCode', label: 'Zip Code' }, // New
    { key: 'company', label: 'Company' }, // New
    { key: 'gstin', label: 'GSTIN' }, // New
    { key: 'taxExemptCertificateDate', label: 'Tax Exempt Certificate Date' }, // New
    { key: 'dob', label: 'DOB' }, // New
    { key: 'anniversary', label: 'Anniversary' }, // New
    { key: 'lastOrderDate', label: 'Last Order Date' }, // New
    { key: 'lastOrderAmt', label: 'Last Order Amt' }, // New
    { key: 'preferredComm', label: 'Preferred Comm' }, // New
    { key: 'birthdayAnniversaryRem', label: 'Birthday Anniversary Rem' }, // New
    { key: 'customerSince', label: 'Customer Since' }, // New
    { key: 'remarks', label: 'Remarks' }, // New
    { key: 'totalCreditBalance', label: 'Total Credit Balance' }, // New
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="customer-filter-section-container">
      <div className="customer-filter-inputs">
        <div className="date-range-picker">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                isClearable
                placeholderText="Customer Created Date"
              />
            </div>
        <select
          className="customer-filter-input"
          value={storeName}
          onChange={onStoreNameChange}
        >
          {uniqueStoreNames.map(store => (
            <option key={store} value={store}>{store}</option>
          ))}
        </select>
      </div>
      <div className="customer-filter-actions">
        <button className="customer-action-button" onClick={onApplyFilter}>
          <span className="customer-icon">☰</span> Filter
        </button>
        <button className="customer-action-button">
          <span className="customer-icon">⬇</span> Export
        </button>
        <div className="customer-dropdown">
            <button className="customer-action-button customer-dropdown-toggle">
                <span className="customer-icon">📊</span> Show Columns
            </button>
            <div className="customer-dropdown-content">
                {columnOptions.map((col) => (
                    <label key={col.key}>
                        <input
                            type="checkbox"
                            checked={visibleColumns[col.key]}
                            onChange={() => onToggleColumn(col.key)}
                        />
                        {col.label}
                    </label>
                ))}
            </div>
        </div>
        <button className="customer-action-button" onClick={onResetChanges}>
          <span className="customer-icon">🔄</span> Reset Changes
        </button>
      </div>
    </div>
  );
}

export default CustomerFilterSection;