"use client";

import { useState } from 'react';
import styles from './admin.module.css';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Search, MoreVertical } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Actors');

    const actorData = [
        { id: 1, name: "Arjun Reddy", email: "arjun@example.com", phone: "+91 98765 43210", status: "Active" },
        { id: 2, name: "Sneha Kapoor", email: "sneha@example.com", phone: "+91 88765 43211", status: "Pending" },
        { id: 3, name: "Rohan Mehra", email: "rohan@example.com", phone: "+91 78765 43212", status: "Active" },
    ];

    const requestData = [
        { id: 101, client: "Red Chillies", type: "Web Series", budget: "₹5 Lakhs", date: "2024-03-10" },
        { id: 102, client: "Dharma Prod", type: "Movie", budget: "₹15 Lakhs", date: "2024-03-12" },
    ];

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <span>Movie<span>lifez</span> Admin</span>
                </div>
                <nav className={styles.nav}>
                    <button className={activeTab === 'Dashboard' ? styles.active : ''} onClick={() => setActiveTab('Dashboard')}>
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className={activeTab === 'Actors' ? styles.active : ''} onClick={() => setActiveTab('Actors')}>
                        <Users size={20} /> Actors
                    </button>
                    <button className={activeTab === 'Requests' ? styles.active : ''} onClick={() => setActiveTab('Requests')}>
                        <FileText size={20} /> Casting Requests
                    </button>
                    <button><Settings size={20} /> Settings</button>
                </nav>
                <button className={styles.logout}><LogOut size={20} /> Logout</button>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.header}>
                    <h2>{activeTab} Management</h2>
                    <div className={styles.headerActions}>
                        <div className={styles.adminSearch}>
                            <Search size={18} />
                            <input type="text" placeholder="Search entries..." />
                        </div>
                        <div className={styles.adminProfile}>AK</div>
                    </div>
                </header>

                <section className={styles.content}>
                    {activeTab === 'Actors' ? (
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Actor Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actorData.map(actor => (
                                        <tr key={actor.id}>
                                            <td>{actor.name}</td>
                                            <td>{actor.email}</td>
                                            <td>{actor.phone}</td>
                                            <td><span className={styles.statusBadge + " " + (actor.status === 'Active' ? styles.activeBadge : styles.pendingBadge)}>{actor.status}</span></td>
                                            <td><button className={styles.iconBtn}><MoreVertical size={16} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : activeTab === 'Requests' ? (
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Client / Company</th>
                                        <th>Project Type</th>
                                        <th>Budget</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestData.map(req => (
                                        <tr key={req.id}>
                                            <td>{req.client}</td>
                                            <td>{req.type}</td>
                                            <td>{req.budget}</td>
                                            <td>{req.date}</td>
                                            <td><button className={styles.iconBtn}><MoreVertical size={16} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <h4>Total Actors</h4>
                                <span>5,234</span>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Pending Requests</h4>
                                <span>12</span>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Active Projects</h4>
                                <span>45</span>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
