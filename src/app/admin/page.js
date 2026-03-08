"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './admin.module.css';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Search, MoreVertical, Image as ImageIcon, Youtube, IndianRupee, Save, Plus, X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('SiteContent');
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch('/api/config');
            const data = await res.json();
            setConfig(data);
        } catch (error) {
            console.error('Failed to fetch config', error);
        }
    };

    const handleSaveConfig = async () => {
        setLoading(true);
        try {
            await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });
            alert('Settings saved successfully!');
        } catch (error) {
            alert('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAd = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Upload failed');

            setConfig({
                ...config,
                adImages: [...(config.adImages || []), { src: data.url, label: "Advertisement" }]
            });

            alert('Image uploaded successfully! Click "Save All Changes" to make it live.');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveAd = (index) => {
        const newAds = [...config.adImages];
        newAds.splice(index, 1);
        setConfig({ ...config, adImages: newAds });
    };

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
                    <button className={activeTab === 'SiteContent' ? styles.active : ''} onClick={() => setActiveTab('SiteContent')}>
                        <Settings size={20} /> Site Content
                    </button>
                </nav>
                <button className={styles.logout}><LogOut size={20} /> Logout</button>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.header}>
                    <h2>{activeTab === 'SiteContent' ? 'Site Content' : activeTab} Management</h2>
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
                    ) : activeTab === 'SiteContent' ? (
                        <div className={styles.managementSection}>
                            <h3>Global Settings</h3>

                            {config && !config.error ? (
                                <>
                                    <div className={styles.formGroup}>
                                        <label><Youtube size={18} /> Home Featured YouTube Videos</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                            {config.youtubeLinks?.map((link, idx) => (
                                                <div key={idx}>
                                                    <small>Video {idx + 1}</small>
                                                    <input
                                                        type="text"
                                                        value={link}
                                                        onChange={(e) => {
                                                            const newLinks = [...config.youtubeLinks];
                                                            newLinks[idx] = e.target.value;
                                                            setConfig({ ...config, youtubeLinks: newLinks });
                                                        }}
                                                        placeholder={`Enter YouTube Link ${idx + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label><IndianRupee size={18} /> Enrollment Prices</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                                            {config.enrollmentPrices && (
                                                <>
                                                    <div>
                                                        <small>Main Character (₹)</small>
                                                        <input
                                                            type="number"
                                                            value={config.enrollmentPrices.main || 0}
                                                            onChange={(e) => setConfig({
                                                                ...config,
                                                                enrollmentPrices: { ...config.enrollmentPrices, main: parseInt(e.target.value) || 0 }
                                                            })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <small>Side Character (₹)</small>
                                                        <input
                                                            type="number"
                                                            value={config.enrollmentPrices.side || 0}
                                                            onChange={(e) => setConfig({
                                                                ...config,
                                                                enrollmentPrices: { ...config.enrollmentPrices, side: parseInt(e.target.value) || 0 }
                                                            })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <small>Couple Character (₹)</small>
                                                        <input
                                                            type="number"
                                                            value={config.enrollmentPrices.couple || 0}
                                                            onChange={(e) => setConfig({
                                                                ...config,
                                                                enrollmentPrices: { ...config.enrollmentPrices, couple: parseInt(e.target.value) || 0 }
                                                            })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <small>Kid Character (₹)</small>
                                                        <input
                                                            type="number"
                                                            value={config.enrollmentPrices.kid || 0}
                                                            onChange={(e) => setConfig({
                                                                ...config,
                                                                enrollmentPrices: { ...config.enrollmentPrices, kid: parseInt(e.target.value) || 0 }
                                                            })}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label><ImageIcon size={18} /> Advertisement Images</label>
                                        <div className={styles.adList}>
                                            {config.adImages?.map((ad, index) => (
                                                <div key={index} className={styles.adItem}>
                                                    <img src={ad.src} alt="Advertisement" />
                                                    <button onClick={() => handleRemoveAd(index)} className={styles.removeAd}><X size={14} /></button>
                                                </div>
                                            ))}
                                            {config.adImages && (
                                                <div className={styles.addAdBox} onClick={handleAddAd}>
                                                    {uploading ? <Loader2 className={styles.spinner} size={30} /> : <Plus size={30} />}
                                                    <span>{uploading ? 'Uploading...' : 'Add New Ad'}</span>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                        />
                                    </div>

                                    <button
                                        className={styles.saveBtn}
                                        onClick={handleSaveConfig}
                                        disabled={loading}
                                    >
                                        <Save size={20} /> {loading ? 'Saving...' : 'Save All Changes'}
                                    </button>
                                </>
                            ) : config?.error ? (
                                <div className={styles.errorBox}>
                                    <p>{config.error}</p>
                                    <button onClick={fetchConfig} className={styles.retryBtn}>Retry Connection</button>
                                </div>
                            ) : (
                                <div className={styles.loadingBox}>Loading configuration from Supabase...</div>
                            )}
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

