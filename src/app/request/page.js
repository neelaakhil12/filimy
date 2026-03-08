"use client";

import { useState } from 'react';
import PageHero from '@/components/PageHero/PageHero';
import styles from './request.module.css';
import { Send, CheckCircle, ChevronRight } from 'lucide-react';
import { sendToWhatsApp } from '@/lib/whatsapp';

const ClientRequestPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        projectType: '',
        actorCount: '',
        ageRange: '',
        gender: '',
        location: '',
        budget: '',
        description: '',
        phone: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendToWhatsApp(formData, "Client Casting Request");
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={styles.successContainer}>
                <div className="container">
                    <div className={styles.successCard}>
                        <CheckCircle size={80} className={styles.successIcon} />
                        <h2>Request Received!</h2>
                        <p>Your casting requirements have been sent to our team via WhatsApp. We will look into it and get back to you shortly.</p>
                        <button onClick={() => window.location.href = "/"} className={styles.homeBtn}>Back to Home</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <PageHero
                title="Hire Talent"
                description="Tell us about your project and we'll help you find the perfect actors for your production."
                image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
            />

            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2>Casting Request Form</h2>
                            <p>Please provide as much detail as possible to help us shortlist the right candidates.</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.gridForm}>
                            <div className={styles.fieldGroup}>
                                <label>Name or Company Name</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label>Project Type</label>
                                <select name="projectType" value={formData.projectType} onChange={handleInputChange} required>
                                    <option value="">Select Project Type</option>
                                    <option value="Movie">Movie</option>
                                    <option value="Web Series">Web Series</option>
                                    <option value="Advertisement">Advertisement</option>
                                    <option value="Short Film">Short Film</option>
                                    <option value="Music Video">Music Video</option>
                                    <option value="TV Show">TV Show</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label>Number of Actors Required</label>
                                <input type="number" name="actorCount" value={formData.actorCount} onChange={handleInputChange} required />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label>Age Range</label>
                                <input type="text" name="ageRange" value={formData.ageRange} onChange={handleInputChange} required placeholder="e.g., 20-30 years" />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label>Preferred Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Any">Any</option>
                                </select>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label>Project Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label>Estimated Budget</label>
                                <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="e.g., ₹50,000" />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label>Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                            </div>

                            <div className={styles.fieldGroup + " " + styles.fullWidth}>
                                <label>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                            </div>

                            <div className={styles.fieldGroup + " " + styles.fullWidth}>
                                <label>Project Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Briefly describe the roles and project requirements..."></textarea>
                            </div>

                            <div className={styles.fullWidth}>
                                <button type="submit" className={styles.submitBtn}>
                                    Submit via WhatsApp <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClientRequestPage;
