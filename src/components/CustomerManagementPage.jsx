// src/pages/CustomerManagementPage.jsx (or integrate into an existing page)
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { customersData } from '../data/customersData'; // Adjust path
import CustomerFilterSection from './CustomerFilterSection'; // Adjust path
import CustomerTable from './CustomerTable'; // Adjust path
import '../styles/CustomerDashboard.css'; // Create this CSS file or integrate into your existing one

function CustomerManagementPage() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerCreatedDate, setCustomerCreatedDate] = useState('');
  const [storeName, setStoreName] = useState('All');
  const [visibleColumns, setVisibleColumns] = useState({
    fullName: true,
    member: true,
    primaryStore: true,
    customerPhone: true, // New
    emailAddress: true,
    addressCity: true, // New
    state: true, // New
    zipCode: true, // New
    company: true, // New
    gstin: true, // New
    taxExemptCertificateDate: true, // New
    dob: true, // New
    anniversary: true, // New
    lastOrderDate: true, // New
    lastOrderAmt: true, // New
    preferredComm: true, // New
    birthdayAnniversaryRem: true, // New
    customerSince: true, // New
    remarks: true, // New
    totalCreditBalance: true, // New
    actions: true,
  });

  // Simulate fetching data or use initial data
  useEffect(() => {
    // In a real app, you'd fetch from an API here:
    // fetch('/api/customers')
    //   .then(res => res.json())
    //   .then(data => setCustomers(data))
    //   .catch(error => console.error("Error fetching customers:", error));

    setCustomers(customersData); // Using mock data for now
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleDateChange = useCallback((e) => {
    setCustomerCreatedDate(e.target.value);
  }, []);

  const handleStoreChange = useCallback((e) => {
    setStoreName(e.target.value);
  }, []);

  const handleFilterApply = useCallback(() => {
    // This function can be used to explicitly apply filters if there's a "Filter" button
    // For now, filtering happens directly in `filteredCustomers`
    console.log("Applying filters...");
  }, []);

  const handleResetChanges = useCallback(() => {
    setSearchTerm('');
    setCustomerCreatedDate('');
    setStoreName('All');
    setVisibleColumns({
      fullName: true,
      member: true,
      primaryStore: true,
      customerPhone: true,
      emailAddress: true,
      addressCity: true,
      state: true,
      zipCode: true,
      company: true,
      gstin: true,
      taxExemptCertificateDate: true,
      dob: true,
      anniversary: true,
      lastOrderDate: true,
      lastOrderAmt: true,
      preferredComm: true,
      birthdayAnniversaryRem: true,
      customerSince: true,
      remarks: true,
      totalCreditBalance: true,
      actions: true,
    });
  }, []);

  const handleToggleColumn = useCallback((columnName) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  }, []);

  const handleAddCustomer = useCallback(() => {
    alert("Add Customer functionality goes here!");
    // In a real app, this would typically open a modal form
    // or navigate to an "Add Customer" page.
  }, []);

  const handleEditCustomer = useCallback((id) => {
    alert(`Edit customer with ID: ${id}`);
    // Implement your edit logic (e.g., open a modal with customer data)
  }, []);

  const handleDeleteCustomer = useCallback((id) => {
    if (window.confirm(`Are you sure you want to delete customer ${id}?`)) {
      // In a real app, you'd make an API call to delete the customer
      // Example:
      // fetch(`/api/customers/${id}`, { method: 'DELETE' })
      //   .then(response => {
      //     if (response.ok) {
      //       setCustomers(prevCustomers => prevCustomers.filter(cust => cust.id !== id));
      //       alert('Customer deleted successfully!');
      //     } else {
      //       alert('Failed to delete customer.');
      //     }
      //   })
      //   .catch(error => console.error("Error deleting customer:", error));

      setCustomers(prevCustomers => prevCustomers.filter(cust => cust.id !== id));
      alert('Customer deleted successfully!'); // For mock data
    }
  }, []);


  const filteredCustomers = useMemo(() => {
    let currentFiltered = customers;

    if (searchTerm) {
      currentFiltered = currentFiltered.filter((customer) =>
        Object.values(customer).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (customerCreatedDate) {
      currentFiltered = currentFiltered.filter(
        (customer) => customer.createdDate === customerCreatedDate
      );
    }

    if (storeName !== 'All') {
      currentFiltered = currentFiltered.filter(
        (customer) => customer.primaryStore === storeName
      );
    }

    return currentFiltered;
  }, [customers, searchTerm, customerCreatedDate, storeName]);

  const uniqueStoreNames = useMemo(() => {
    const stores = new Set(customersData.map(customer => customer.primaryStore));
    return ['All', ...Array.from(stores)];
  }, []);

  return (
    <div className="customer-dashboard-container">
      <CustomerFilterSection
        customerCreatedDate={customerCreatedDate}
        onCustomerCreatedDateChange={handleDateChange}
        storeName={storeName}
        onStoreNameChange={handleStoreChange}
        onApplyFilter={handleFilterApply}
        onResetChanges={handleResetChanges}
        visibleColumns={visibleColumns}
        onToggleColumn={handleToggleColumn}
        uniqueStoreNames={uniqueStoreNames}
      />
      <CustomerTable
        customers={filteredCustomers}
        visibleColumns={visibleColumns}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />
    </div>
  );
}

export default CustomerManagementPage;