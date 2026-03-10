"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './admin.module.css';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Search, MoreVertical, Image as ImageIcon, Youtube, IndianRupee, Save, Plus, X, Upload, Loader2, Scan } from 'lucide-react';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [activeTab, setActiveTab] = useState('Dashboard');
    const [config, setConfig] = useState(null);
    const [actorData, setActorData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Check local storage for session
        const session = localStorage.getItem('adminSession');
        if (session === 'true') {
            setIsAuthenticated(true);
        }
        if (isAuthenticated) {
            fetchConfig();
            fetchActors();
            fetchRequests();
        }
    }, [isAuthenticated]);

    const fetchConfig = async () => {
        try {
            const res = await fetch('/api/config');
            const data = await res.json();
            setConfig(data);
        } catch (error) {
            console.error('Failed to fetch config', error);
        }
    };

    const fetchActors = async () => {
        try {
            const res = await fetch('/api/register');
            const data = await res.json();
            if (data && data.data) {
                const mappedData = data.data.map(a => ({
                    id: a.id,
                    name: a.full_name,
                    age: a.age,
                    gender: a.gender,
                    location: a.location,
                    pincode: a.pincode,
                    experience: a.experience,
                    languages: a.languages,
                    characterType: a.character_type,
                    email: a.email,
                    phone: a.phone,
                    status: a.status,
                    fullPhoto: a.full_photo,
                    halfPhoto: a.half_photo,
                    passportPhoto: a.passport_photo,
                    payment: a.payment_screenshot,
                    createdAt: a.created_at ? new Date(a.created_at).toISOString().split('T')[0] : 'N/A'
                }));
                setActorData(mappedData);
            }
        } catch (err) {
            console.error("Failed to fetch actors", err);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await fetch('/api/request');
            const data = await res.json();
            if (data && data.data) {
                const mappedData = data.data.map(r => ({
                    id: r.id,
                    client: r.company_name,
                    type: r.project_type,
                    actorCount: r.actor_count,
                    ageRange: r.age_range,
                    gender: r.gender,
                    location: r.location,
                    budget: r.budget || 'N/A',
                    description: r.description,
                    phone: r.phone,
                    email: r.email,
                    date: r.created_at ? new Date(r.created_at).toISOString().split('T')[0] : 'N/A',
                    status: r.status || 'Pending'
                }));
                setRequestData(mappedData);
            }
        } catch (err) {
            console.error("Failed to fetch requests", err);
        }
    };

    const handleStatusChange = async (e, type, id) => {
        const newStatus = e.target.value;
        const endpoint = type === 'actor' ? '/api/register' : '/api/request';

        try {
            const res = await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });

            if (res.ok) {
                if (type === 'actor') fetchActors();
                else fetchRequests();
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const deleteEntry = async (type, id) => {
        if (!window.confirm('Are you sure you want to delete this entry? This cannot be undone.')) return;
        const endpoint = type === 'actor' ? '/api/register' : '/api/request';
        try {
            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                if (type === 'actor') fetchActors();
                else fetchRequests();
            } else {
                alert('Failed to delete entry.');
            }
        } catch (err) {
            console.error('Error deleting entry:', err);
        }
    };

    const handleSaveConfig = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Failed to save');

            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save settings: ' + error.message);
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

    const handleQRUpload = async (e) => {
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
                enrollmentPrices: { ...config.enrollmentPrices, paymentQR: data.url }
            });
            alert('QR uploaded successfully! Click "Save All Changes" to make it live.');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload QR: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Dynamic actorData is fetched from DB

    // Dynamic requestData is fetched from DB

    const handleLogin = (e) => {
        e.preventDefault();
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@movielifez.com';
        const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin@123';

        if (email === adminEmail && password === adminPass) {
            setIsAuthenticated(true);
            localStorage.setItem('adminSession', 'true');
            setLoginError('');
        } else {
            setLoginError('Invalid email or password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminSession');
        setEmail('');
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.logo} style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Movie<span style={{ color: '#FFD700' }}>lifez</span> Admin</span>
                    </div>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter admin email"
                                className={styles.loginInput}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter admin password"
                                className={styles.loginInput}
                            />
                        </div>
                        {loginError && <p className={styles.errorMessage} style={{ color: '#ff4444', marginBottom: '10px' }}>{loginError}</p>}
                        <button type="submit" className={styles.saveBtn} style={{ width: '100%', marginTop: '10px' }}>
                            Login to Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

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
                        <Users size={20} /> Actor Registrations
                    </button>
                    <button className={activeTab === 'Requests' ? styles.active : ''} onClick={() => setActiveTab('Requests')}>
                        <FileText size={20} /> Client Requests
                    </button>
                    <button className={activeTab === 'SiteContent' ? styles.active : ''} onClick={() => setActiveTab('SiteContent')}>
                        <Settings size={20} /> Site Content
                    </button>
                </nav>
                <button className={styles.logout} onClick={handleLogout}><LogOut size={20} /> Logout</button>
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
                                        <th>Photos</th>
                                        <th>Payment</th>
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actorData.map(actor => {
                                        const isOpen = expandedRow === actor.id;
                                        return (
                                            <React.Fragment key={actor.id}>
                                                <tr className={styles.expandRow} onClick={() => setExpandedRow(isOpen ? null : actor.id)}>
                                                    <td><strong>{actor.name}</strong></td>
                                                    <td>{actor.email}</td>
                                                    <td>{actor.phone}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
                                                            {actor.fullPhoto && <a href={actor.fullPhoto} target="_blank" onClick={e => e.stopPropagation()} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Full</a>}
                                                            {actor.halfPhoto && <a href={actor.halfPhoto} target="_blank" onClick={e => e.stopPropagation()} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Half</a>}
                                                            {actor.passportPhoto && <a href={actor.passportPhoto} target="_blank" onClick={e => e.stopPropagation()} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Pass</a>}
                                                        </div>
                                                    </td>
                                                    <td>{actor.payment && <a href={actor.payment} target="_blank" onClick={e => e.stopPropagation()} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>View</a>}</td>
                                                    <td onClick={e => e.stopPropagation()}>
                                                        <select value={actor.status} onChange={(e) => handleStatusChange(e, 'actor', actor.id)} className={styles.statusBadge + ' ' + (actor.status === 'Active' ? styles.activeBadge : styles.pendingBadge)} style={{ cursor: 'pointer', border: 'none', appearance: 'none', outline: 'none' }}>
                                                            <option value="Pending" style={{ color: '#000' }}>Pending</option>
                                                            <option value="Active" style={{ color: '#000' }}>Completed</option>
                                                        </select>
                                                    </td>
                                                    <td onClick={e => e.stopPropagation()}>
                                                        <button onClick={() => deleteEntry('actor', actor.id)} style={{ background: '#EF4444', color: 'white', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', border: 'none' }}>Delete</button>
                                                    </td>
                                                </tr>
                                                {isOpen && (
                                                    <tr className={styles.detailRow}>
                                                        <td colSpan={7}>
                                                            <div className={styles.detailPanel}>
                                                                <div className={styles.detailSection}>
                                                                    <h4>Personal & Professional Details</h4>
                                                                    <div className={styles.detailGrid}>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Full Name</span><span className={styles.detailValue}>{actor.name || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Phone</span><span className={styles.detailValue}>{actor.phone || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Email</span><span className={styles.detailValue}>{actor.email || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Age</span><span className={styles.detailValue}>{actor.age || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Gender</span><span className={styles.detailValue}>{actor.gender || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Location</span><span className={styles.detailValue}>{actor.location || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Pincode</span><span className={styles.detailValue}>{actor.pincode || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Experience</span><span className={styles.detailValue}>{actor.experience || '-'} yrs</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Languages</span><span className={styles.detailValue}>{actor.languages || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Character Type</span><span className={styles.detailValue}>{actor.characterType || '-'}</span></div>
                                                                        <div className={styles.detailItem}><span className={styles.detailLabel}>Applied On</span><span className={styles.detailValue}>{actor.createdAt}</span></div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className={styles.detailSection}>
                                                                    <h4>Uploaded Documents & Photos</h4>
                                                                    <div className={styles.imageGrid}>
                                                                        {actor.fullPhoto && (
                                                                            <div className={styles.imageItem}>
                                                                                <span className={styles.detailLabel}>Full Photo</span>
                                                                                <a href={actor.fullPhoto} target="_blank"><img src={actor.fullPhoto} alt="Full" className={styles.detailThumb} /></a>
                                                                            </div>
                                                                        )}
                                                                        {actor.halfPhoto && (
                                                                            <div className={styles.imageItem}>
                                                                                <span className={styles.detailLabel}>Half Photo</span>
                                                                                <a href={actor.halfPhoto} target="_blank"><img src={actor.halfPhoto} alt="Half" className={styles.detailThumb} /></a>
                                                                            </div>
                                                                        )}
                                                                        {actor.passportPhoto && (
                                                                            <div className={styles.imageItem}>
                                                                                <span className={styles.detailLabel}>Passport Photo</span>
                                                                                <a href={actor.passportPhoto} target="_blank"><img src={actor.passportPhoto} alt="Passport" className={styles.detailThumb} /></a>
                                                                            </div>
                                                                        )}
                                                                        {actor.payment && (
                                                                            <div className={styles.imageItem}>
                                                                                <span className={styles.detailLabel}>Payment Screenshot</span>
                                                                                <a href={actor.payment} target="_blank"><img src={actor.payment} alt="Payment" className={styles.detailThumb} /></a>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
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
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestData.map(req => (
                                        <React.Fragment key={req.id}>
                                            <tr className={styles.expandRow} onClick={() => setExpandedRow(expandedRow === req.id ? null : req.id)}>
                                                <td><strong>{req.client}</strong></td>
                                                <td>{req.type}</td>
                                                <td>{req.budget}</td>
                                                <td>{req.date}</td>
                                                <td onClick={e => e.stopPropagation()}>
                                                    <select
                                                        value={req.status}
                                                        onChange={(e) => handleStatusChange(e, 'request', req.id)}
                                                        className={styles.statusBadge + " " + (req.status === 'Active' ? styles.activeBadge : styles.pendingBadge)}
                                                        style={{ cursor: 'pointer', border: 'none', appearance: 'none', outline: 'none' }}
                                                    >
                                                        <option value="Pending" style={{ color: '#000' }}>Pending</option>
                                                        <option value="Active" style={{ color: '#000' }}>Completed</option>
                                                    </select>
                                                </td>
                                                <td onClick={e => e.stopPropagation()}>
                                                    <button onClick={() => deleteEntry('request', req.id)} style={{ background: '#EF4444', color: 'white', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', border: 'none' }}>Delete</button>
                                                </td>
                                            </tr>
                                            {expandedRow === req.id && (
                                                <tr className={styles.detailRow}>
                                                    <td colSpan={6}>
                                                        <div className={styles.detailPanel}>
                                                            <div className={styles.detailSection}>
                                                                <h4>Request Details</h4>
                                                                <div className={styles.detailGrid}>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Client / Company</span><span className={styles.detailValue}>{req.client || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Project Type</span><span className={styles.detailValue}>{req.type || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Phone</span><span className={styles.detailValue}>{req.phone || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Email</span><span className={styles.detailValue}>{req.email || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Actor Count</span><span className={styles.detailValue}>{req.actorCount || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Age Range</span><span className={styles.detailValue}>{req.ageRange || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Gender</span><span className={styles.detailValue}>{req.gender || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Location</span><span className={styles.detailValue}>{req.location || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Budget</span><span className={styles.detailValue}>{req.budget || '-'}</span></div>
                                                                    <div className={styles.detailItem}><span className={styles.detailLabel}>Submission Date</span><span className={styles.detailValue}>{req.date}</span></div>
                                                                </div>
                                                            </div>
                                                            <div className={styles.detailSection}>
                                                                <h4>Project Description</h4>
                                                                <div className={styles.detailValue} style={{ whiteSpace: 'pre-wrap', padding: '10px', background: '#f1f5f9', borderRadius: '8px', marginTop: '10px' }}>
                                                                    {req.description || 'No description provided.'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
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
                                        <div className={styles.videoList}>
                                            {(config.youtubeLinks || []).map((link, idx) => (
                                                <div key={idx} className={styles.videoItem}>
                                                    <div className={styles.videoInputWrapper}>
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
                                                        <button
                                                            onClick={() => {
                                                                const newLinks = [...config.youtubeLinks];
                                                                newLinks.splice(idx, 1);
                                                                setConfig({ ...config, youtubeLinks: newLinks });
                                                            }}
                                                            className={styles.removeVideo}
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                className={styles.addVideoBtn}
                                                onClick={() => {
                                                    const newLinks = [...(config.youtubeLinks || []), ""];
                                                    setConfig({ ...config, youtubeLinks: newLinks });
                                                }}
                                            >
                                                <Plus size={18} /> Add Video Link
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label><IndianRupee size={18} /> Enrollment Plans & Details</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '10px' }}>
                                            {config.enrollmentPrices && ['main', 'side', 'couple', 'kid'].map((key) => {
                                                const plan = config.enrollmentPrices[key];
                                                if (!plan) return null;
                                                const label = key.charAt(0).toUpperCase() + key.slice(1) + ' Character';
                                                return (
                                                    <div key={key} style={{ border: '1px solid #2a2a2a', padding: '15px', borderRadius: '8px', backgroundColor: '#1a1a1a' }}>
                                                        <h4 style={{ marginBottom: '15px', color: '#fff', fontSize: '16px' }}>{label}</h4>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            <div>
                                                                <small style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Price (₹)</small>
                                                                <input
                                                                    type="number"
                                                                    value={plan.price || 0}
                                                                    onChange={(e) => setConfig({
                                                                        ...config,
                                                                        enrollmentPrices: { ...config.enrollmentPrices, [key]: { ...plan, price: parseInt(e.target.value) || 0 } }
                                                                    })}
                                                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <small style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Contract</small>
                                                                <input
                                                                    type="text"
                                                                    value={plan.contract || ''}
                                                                    onChange={(e) => setConfig({
                                                                        ...config,
                                                                        enrollmentPrices: { ...config.enrollmentPrices, [key]: { ...plan, contract: e.target.value } }
                                                                    })}
                                                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <small style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Prize Money</small>
                                                                <input
                                                                    type="text"
                                                                    value={plan.prize || ''}
                                                                    onChange={(e) => setConfig({
                                                                        ...config,
                                                                        enrollmentPrices: { ...config.enrollmentPrices, [key]: { ...plan, prize: e.target.value } }
                                                                    })}
                                                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <small style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Ads</small>
                                                                <input
                                                                    type="text"
                                                                    value={plan.ads || ''}
                                                                    onChange={(e) => setConfig({
                                                                        ...config,
                                                                        enrollmentPrices: { ...config.enrollmentPrices, [key]: { ...plan, ads: e.target.value } }
                                                                    })}
                                                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label><Scan size={18} /> Payment QR Code</label>
                                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            {config.enrollmentPrices?.paymentQR && (
                                                <div style={{ width: '150px', height: '150px', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
                                                    <img src={config.enrollmentPrices.paymentQR} alt="Payment QR" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }} />
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <button
                                                    onClick={() => document.getElementById('qrUploadInput').click()}
                                                    className={styles.addVideoBtn}
                                                    style={{ width: 'fit-content' }}
                                                >
                                                    <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload New QR'}
                                                </button>
                                                <input
                                                    id="qrUploadInput"
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    accept="image/*"
                                                    onChange={handleQRUpload}
                                                />
                                                <small style={{ color: '#888' }}>Upload a new QR code to replace the old one for user payments.</small>
                                            </div>
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
                                <span>{actorData.length}</span>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Pending Requests</h4>
                                <span>{requestData.length}</span>
                            </div>
                            <div className={styles.statCard} onClick={() => setActiveTab('Actors')} style={{ cursor: 'pointer', background: '#2a2a2a', border: '1px solid #444' }}>
                                <h4>View All Actors</h4>
                                <span style={{ fontSize: '16px', color: '#FFD700', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>Manage <span style={{ fontSize: '20px' }}>→</span></span>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;

