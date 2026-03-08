"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './admin.module.css';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Search, MoreVertical, Image as ImageIcon, Youtube, IndianRupee, Save, Plus, X, Upload, Loader2, Scan } from 'lucide-react';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [activeTab, setActiveTab] = useState('SiteContent');
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Check local storage for session
        const session = localStorage.getItem('adminSession');
        if (session === 'true') {
            setIsAuthenticated(true);
        }
        if (isAuthenticated) {
            fetchConfig();
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

    const actorData = [
        { id: 1, name: "Arjun Reddy", email: "arjun@example.com", phone: "+91 98765 43210", status: "Active" },
        { id: 2, name: "Sneha Kapoor", email: "sneha@example.com", phone: "+91 88765 43211", status: "Pending" },
        { id: 3, name: "Rohan Mehra", email: "rohan@example.com", phone: "+91 78765 43212", status: "Active" },
    ];

    const requestData = [
        { id: 101, client: "Red Chillies", type: "Web Series", budget: "₹5 Lakhs", date: "2024-03-10" },
        { id: 102, client: "Dharma Prod", type: "Movie", budget: "₹15 Lakhs", date: "2024-03-12" },
    ];

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

