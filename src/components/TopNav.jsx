import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Package, RefreshCw, Briefcase, Users,
    BarChart, Settings, FileText as FileTextIcon,
    ChevronDown, Search, Bell, User
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchPopup from './SearchPopup'; // Ensure this component exists
import '../styles/TopNav.css'; // Ensure this CSS exists

// --- Start: Updated menuItems structure with specific paths for dropdowns ---
const menuItems = [
    { label: 'Dashboard', icon: <Package size={16} />, path: '/dashboard' },
    { label: 'Process', icon: <RefreshCw size={16} />, path: '/process' },
    {
        label: 'Jobs',
        icon: <Briefcase size={16} />,
        dropdown: [
            { label: 'Job Management', path: '/jobs/job' },
            { label: 'Rider Location', path: '/jobs/rider' }
        ],
        path: '/jobs' // Parent path for general grouping
    },
    {
        label: 'Customers',
        icon: <Users size={16} />,
        dropdown: [
            { label: 'Customer List', path: '/customers/list' },
            { label: 'All Customer', path: '/allCustomers' }
        ],
        path: '/customers'
    },
    {
        label: 'Reports',
        icon: <BarChart size={16} />,
        dropdown: [
            { label: 'Sales Report', path: '/reports/sales' },
            { label: 'Order Report', path: '/reports/orders' }
        ],
        path: '/reports'
    },
    { label: 'Orders', icon: <FileTextIcon size={16} />, path: '/orders' },
    {
        label: 'Admin',
        icon: <Settings size={16} />,
        dropdown: [
            { label: 'User Management', path: '/admin/users' },
            { label: 'Settings', path: '/admin/settings' }
        ],
        path: '/admin'
    }
];

const userDropdownItems = [
    { label: 'Profile', path: '/profile' },
    { label: 'Logout', path: '/logout' } // Added path for logout, though it might trigger a function
];
// --- End: Updated menuItems structure ---

// Mock data for search popup
const mockUsers = [
    { id: 1, name: 'Alice Anderson' },
    { id: 2, name: 'Bob Brown' },
    { id: 3, name: 'Charlie Chaplin' },
    { id: 4, name: 'Dana Davis' }
];

const TopNav = () => {
    const [openDropdown, setOpenDropdown] = useState(null); // State for which main dropdown is open
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State for user dropdown
    const [showSearchModal, setShowSearchModal] = useState(false); // State for search modal visibility
    const [searchResults, setSearchResults] = useState([]); // State for search results

    const navRef = useRef(); // Ref for detecting clicks outside navigation

    const navigate = useNavigate(); // Hook to programmatically navigate
    const location = useLocation(); // Hook to get current URL path

    // --- Start: Logic to determine active parent and sub-item based on current URL ---
    const activeParent = menuItems.find(item => {
        // If the item has a dropdown, check if the current path starts with the item's parent path
        // OR if any of the dropdown item paths match the current path exactly
        if (item.dropdown) {
            const subPathMatch = item.dropdown.some(subItem => location.pathname === subItem.path);
            return subPathMatch || location.pathname.startsWith(item.path);
        }
        // Otherwise (for non-dropdown items), exact match the path
        return location.pathname === item.path;
    })?.label || '';

    const activeSubItem = menuItems.flatMap(item => item.dropdown || [])
        .find(subItem => subItem.path === location.pathname)?.label || '';
    // --- End: Logic to determine active parent and sub-item ---

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpenDropdown(null);
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search logic for the SearchPopup
    const handleSearch = useCallback((term, type) => {
        const filtered = mockUsers.filter(user =>
            user.name.toLowerCase().includes(term.toLowerCase()) &&
            (type === 'general' || user.name.toLowerCase().includes(type.toLowerCase()))
        );
        setSearchResults(filtered);
    }, []);

    // Handler for clicking main navigation items
    const handleNavClick = (item) => {
        if (item.dropdown) {
            // Toggle dropdown for items with sub-menus
            setOpenDropdown(openDropdown === item.label ? null : item.label);
            setIsUserDropdownOpen(false); // Close user dropdown
        } else {
            // Navigate to the path associated with the menu item
            navigate(item.path);
            setOpenDropdown(null); // Close any open dropdown
            setIsUserDropdownOpen(false); // Close user dropdown
        }
    };

    // Handler for clicking dropdown sub-items
    const handleSubItemClick = (subItem) => {
        navigate(subItem.path); // Navigate to the specific sub-item path
        setOpenDropdown(null); // Close dropdown
        setIsUserDropdownOpen(false); // Close user dropdown
    };

    return (
        <div className="top-nav" ref={navRef}>
            <div className="nav-left">
                {menuItems.map((item) => (
                    <div
                        key={item.label}
                        className={`nav-item ${activeParent === item.label ? 'active' : ''}`}
                        onClick={() => handleNavClick(item)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.dropdown && <ChevronDown size={14} className="dropdown-icon" />}
                        {openDropdown === item.label && (
                            <div className="dropdown-menu">
                                {item.dropdown.map((sub) => (
                                    <div
                                        key={sub.label}
                                        className={`dropdown-item ${activeSubItem === sub.label ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent parent nav-item click from propagating
                                            handleSubItemClick(sub); // Pass the sub-item object
                                        }}
                                    >
                                        {sub.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="nav-right">
                <div className="icon-button" onClick={() => setShowSearchModal(true)}>
                    <Search size={20} />
                </div>

                <div className="icon-with-badge">
                    <Bell size={20} />
                    <span className="badge">3</span> {/* Example badge content */}
                </div>

                <div
                    className="user-menu"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent document click from closing immediately
                        setIsUserDropdownOpen(!isUserDropdownOpen);
                        setOpenDropdown(null); // Close other dropdowns
                    }}
                >
                    <div className="user-info-display">
                        <User size={20} />
                        <ChevronDown size={14} className="dropdown-icon" />
                    </div>
                    {isUserDropdownOpen && (
                        <div className="dropdown-menu user-dropdown">
                            {userDropdownItems.map((sub) => (
                                <div
                                    key={sub.label}
                                    className="dropdown-item"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent parent user-menu click from propagating
                                        setIsUserDropdownOpen(false); // Close user dropdown after selection
                                        if (sub.path === '/logout') {
                                            console.log('Logging out...');
                                            // Implement your actual logout logic here (e.g., clear tokens, redirect to login)
                                            // navigate('/login'); // Example redirect
                                        } else {
                                            navigate(sub.path); // Navigate to profile or other user menu paths
                                        }
                                    }}
                                >
                                    {sub.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button className="pos-button">POS</button>
            </div>

            {/* Search Popup Component */}
            <SearchPopup
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                onSearch={handleSearch}
                results={searchResults}
                title="Search Users"
                placeholder="Type a name..."
                filters={[
                    { label: 'General', value: 'general' },
                    { label: 'Customer', value: 'customer' }
                ]}
            />
        </div>
    );
};

export default TopNav;