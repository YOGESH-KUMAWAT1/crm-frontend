// src/components/CustomerTable.jsx
import React from 'react';
// Import your global CSS or specific CSS module here if applicable

function CustomerTable({ customers, visibleColumns, onEditCustomer, onDeleteCustomer }) {
  // --- UPDATED HEADERS ARRAY ---
  const headers = [
    { key: 'fullName', label: 'Full Name', visible: visibleColumns.fullName },
    { key: 'member', label: 'Member', visible: visibleColumns.member },
    { key: 'primaryStore', label: 'Primary Store', visible: visibleColumns.primaryStore },
    { key: 'customerPhone', label: 'Customer Phone', visible: visibleColumns.customerPhone }, // New
    { key: 'emailAddress', label: 'Email Address', visible: visibleColumns.emailAddress },
    { key: 'addressCity', label: 'Address / City', visible: visibleColumns.addressCity }, // New
    { key: 'state', label: 'State', visible: visibleColumns.state }, // New
    { key: 'zipCode', label: 'Zip Code', visible: visibleColumns.zipCode }, // New
    { key: 'company', label: 'Company', visible: visibleColumns.company }, // New
    { key: 'gstin', label: 'GSTIN', visible: visibleColumns.gstin }, // New
    { key: 'taxExemptCertificateDate', label: 'Tax Exempt Certificate Date', visible: visibleColumns.taxExemptCertificateDate }, // New
    { key: 'dob', label: 'DOB', visible: visibleColumns.dob }, // New
    { key: 'anniversary', label: 'Anniversary', visible: visibleColumns.anniversary }, // New
    { key: 'lastOrderDate', label: 'Last Order Date', visible: visibleColumns.lastOrderDate }, // New
    { key: 'lastOrderAmt', label: 'Last Order Amt', visible: visibleColumns.lastOrderAmt }, // New
    { key: 'preferredComm', label: 'Preferred Comm', visible: visibleColumns.preferredComm }, // New
    { key: 'birthdayAnniversaryRem', label: 'Birthday Anniversary Rem', visible: visibleColumns.birthdayAnniversaryRem }, // New
    { key: 'customerSince', label: 'Customer Since', visible: visibleColumns.customerSince }, // New
    { key: 'remarks', label: 'Remarks', visible: visibleColumns.remarks }, // New
    { key: 'totalCreditBalance', label: 'Total Credit Balance', visible: visibleColumns.totalCreditBalance }, // New
    { key: 'actions', label: 'Actions', visible: visibleColumns.actions },
  ];

  const visibleHeaders = headers.filter(header => header.visible);

  return (
    <div className="customer-table-container">
      <table className="customer-data-table">
        <thead>
          <tr>
            {visibleHeaders.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={visibleHeaders.length} style={{ textAlign: 'center', padding: '20px' }}>
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id}>
                {visibleColumns.fullName && <td>{customer.fullName}</td>}
                {visibleColumns.member && <td>{customer.member}</td>}
                {visibleColumns.primaryStore && <td>{customer.primaryStore}</td>}
                {visibleColumns.customerPhone && <td>{customer.customerPhone}</td>} {/* New */}
                {visibleColumns.emailAddress && <td>{customer.emailAddress}</td>}
                {visibleColumns.addressCity && <td>{customer.addressCity}</td>} {/* New */}
                {visibleColumns.state && <td>{customer.state}</td>} {/* New */}
                {visibleColumns.zipCode && <td>{customer.zipCode}</td>} {/* New */}
                {visibleColumns.company && <td>{customer.company}</td>} {/* New */}
                {visibleColumns.gstin && <td>{customer.gstin}</td>} {/* New */}
                {visibleColumns.taxExemptCertificateDate && <td>{customer.taxExemptCertificateDate}</td>} {/* New */}
                {visibleColumns.dob && <td>{customer.dob}</td>} {/* New */}
                {visibleColumns.anniversary && <td>{customer.anniversary}</td>} {/* New */}
                {visibleColumns.lastOrderDate && <td>{customer.lastOrderDate}</td>} {/* New */}
                {visibleColumns.lastOrderAmt && <td>{customer.lastOrderAmt}</td>} {/* New */}
                {visibleColumns.preferredComm && <td>{customer.preferredComm}</td>} {/* New */}
                {visibleColumns.birthdayAnniversaryRem && <td>{customer.birthdayAnniversaryRem}</td>} {/* New */}
                {visibleColumns.customerSince && <td>{customer.customerSince}</td>} {/* New */}
                {visibleColumns.remarks && <td>{customer.remarks}</td>} {/* New */}
                {visibleColumns.totalCreditBalance && <td>{customer.totalCreditBalance !== undefined ? `$${customer.totalCreditBalance.toFixed(2)}` : ''}</td>} {/* New, formatted as currency */}
                {visibleColumns.actions && (
                  <td>
                    <button className="customer-action-button-small" onClick={() => onEditCustomer(customer.id)}>Edit</button>
                    <button className="customer-action-button-small customer-delete-button" onClick={() => onDeleteCustomer(customer.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;