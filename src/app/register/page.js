"use client";

import { useState, useEffect } from 'react';
import PageHero from '@/components/PageHero/PageHero';
import styles from './register.module.css';
import { User, Briefcase, Camera, Video, Phone, CheckCircle, ChevronRight, ChevronLeft, CreditCard, Users, Baby, Star, Scan, Check } from 'lucide-react';
import { sendToWhatsApp } from '@/lib/whatsapp';

const RegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [showPayment, setShowPayment] = useState(false);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error("Failed to load register config", err));
    }, []);
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        location: '',
        pincode: '',
        experience: '',
        languages: '',
        fullPhoto: null,
        halfPhoto: null,
        passportPhoto: null,
        characterType: '',
        paymentScreenshot: null,
        phone: '',
        email: '',
    });

    const characterPlans = [
        {
            id: 'main',
            title: 'Main Character',
            price: `₹${config?.enrollmentPrices?.main || 1999}`,
            contract: '1 Year Contract',
            prize: '10 Lakhs Prize Money',
            ads: '10+ Ads',
            icon: <Star />,
            color: '#FFD700'
        },
        {
            id: 'side',
            title: 'Side Character',
            price: `₹${config?.enrollmentPrices?.side || 1499}`,
            contract: '1 Year Contract',
            prize: '5 Lakhs Prize Money',
            ads: '10+ Ads',
            icon: <User />,
            color: '#FF8C00'
        },
        {
            id: 'couple',
            title: 'Couple Character',
            price: `₹${config?.enrollmentPrices?.couple || 2999}`,
            contract: '1 Year Contract',
            prize: '10 Lakhs Prize Money',
            ads: '10+ Ads',
            icon: <Users />,
            color: '#FF69B4'
        },
        {
            id: 'kid',
            title: 'Kid Character',
            price: `₹${config?.enrollmentPrices?.kid || 999}`,
            contract: '1 Year Contract',
            prize: '3 Lakhs Prize Money',
            ads: '10+ Ads',
            icon: <Baby />,
            color: '#87CEEB'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, [name]: files[0].name }));
        }
    };

    const handleNext = () => {
        if (step === 3 && !formData.characterType) {
            alert("Please select a character plan first.");
            return;
        }
        if (step === 3 && !formData.paymentScreenshot && !showPayment) {
            setShowPayment(true);
            return;
        }
        setStep(step + 1);
    };

    const handleBack = () => {
        if (step === 3 && showPayment) {
            setShowPayment(false);
            return;
        }
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendToWhatsApp(formData, "Actor Registration");
        setStep(6); // Success step
    };

    const steps = [
        { title: "Personal", icon: <User /> },
        { title: "Experience", icon: <Briefcase /> },
        { title: "Character", icon: <Star /> },
        { title: "Contact", icon: <Phone /> },
        { title: "Review", icon: <CheckCircle /> },
    ];

    const selectedPlan = characterPlans.find(p => p.id === formData.characterType);

    return (
        <div>
            <PageHero
                title="Register as an Actor"
                description="Join our elite talent pool and get noticed by the world's best filmmakers."
                image="https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=2070&auto=format&fit=crop"
            />

            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formWrapper}>
                        {/* Step Indicator */}
                        <div className={styles.stepper}>
                            {steps.map((s, i) => (
                                <div key={i} className={`${styles.stepItem} ${step >= i + 1 ? styles.active : ''}`}>
                                    <div className={styles.stepIcon}>{s.icon}</div>
                                    <span>{s.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className={styles.formContainer}>
                            {step === 1 && (
                                <div className={styles.stepContent}>
                                    <h3>Personal Information</h3>
                                    <div className={styles.fieldGrid}>
                                        <div className={styles.inputGroup}>
                                            <label>Full Name</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Age</label>
                                            <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Location</label>
                                            <input type="text" name="location" value={formData.location} onChange={handleInputChange} required placeholder="City, State" />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Pincode</label>
                                            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required placeholder="6-digit ZIP code" />
                                        </div>
                                    </div>
                                    <button type="button" onClick={handleNext} className={styles.nextBtn}>
                                        Continue <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className={styles.stepContent}>
                                    <h3>Professional Details</h3>
                                    <div className={styles.fieldGrid}>
                                        <div className={styles.inputGroup}>
                                            <label>Acting Experience (Years)</label>
                                            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Languages Known</label>
                                            <input type="text" name="languages" value={formData.languages} onChange={handleInputChange} required placeholder="Hindi, English, etc." />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Full Photo</label>
                                            <div className={styles.fileUpload}>
                                                <input type="file" name="fullPhoto" onChange={handleFileChange} accept="image/*" id="fullPhoto" />
                                                <label htmlFor="fullPhoto" className={styles.fileLabel}>
                                                    <Camera size={20} />
                                                    {formData.fullPhoto || "Upload Full Photo"}
                                                </label>
                                            </div>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Half Photo</label>
                                            <div className={styles.fileUpload}>
                                                <input type="file" name="halfPhoto" onChange={handleFileChange} accept="image/*" id="halfPhoto" />
                                                <label htmlFor="halfPhoto" className={styles.fileLabel}>
                                                    <Camera size={20} />
                                                    {formData.halfPhoto || "Upload Half Photo"}
                                                </label>
                                            </div>
                                        </div>
                                        <div className={styles.inputGroup + " " + styles.fullWidth}>
                                            <label>Passport Size Photo</label>
                                            <div className={styles.fileUpload}>
                                                <input type="file" name="passportPhoto" onChange={handleFileChange} accept="image/*" id="passportPhoto" />
                                                <label htmlFor="passportPhoto" className={styles.fileLabel}>
                                                    <Camera size={20} />
                                                    {formData.passportPhoto || "Upload Passport Size Photo"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.actionBtns}>
                                        <button type="button" onClick={handleBack} className={styles.backBtn}><ChevronLeft size={18} /> Back</button>
                                        <button type="button" onClick={handleNext} className={styles.nextBtn}>Continue <ChevronRight size={18} /></button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className={styles.stepContent}>
                                    {!showPayment ? (
                                        <>
                                            <h3>Choose Character Life</h3>
                                            <div className={styles.cardGrid}>
                                                {characterPlans.map((plan) => (
                                                    <div
                                                        key={plan.id}
                                                        className={`${styles.planCard} ${formData.characterType === plan.id ? styles.selectedPlan : ''}`}
                                                        onClick={() => handleInputChange({ target: { name: 'characterType', value: plan.id } })}
                                                    >
                                                        {formData.characterType === plan.id && (
                                                            <div className={styles.selectionIndicator}>
                                                                <Check size={16} />
                                                            </div>
                                                        )}
                                                        <div className={styles.planIcon} style={{ backgroundColor: plan.color }}>
                                                            {plan.icon}
                                                        </div>
                                                        <h4>{plan.title}</h4>
                                                        <div className={styles.planPrice}>{plan.price}</div>
                                                        <ul className={styles.planFeatures}>
                                                            <li>{plan.contract}</li>
                                                            <li>{plan.prize}</li>
                                                            <li>{plan.ads}</li>
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className={styles.refundNote}>
                                                📌 <strong>Note:</strong> The Amount collected is non-refundable as it is considered as a crowdfund contribution.
                                            </p>
                                            <div className={styles.actionBtns}>
                                                <button type="button" onClick={handleBack} className={styles.backBtn}><ChevronLeft size={18} /> Back</button>
                                                <button type="button" onClick={handleNext} className={styles.nextBtn}>Pay Now <CreditCard size={18} /></button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className={styles.paymentSection}>
                                            <h3>Complete Your Payment</h3>
                                            <div className={styles.paymentGrid}>
                                                <div className={styles.qrContainer}>
                                                    <img src="/images/payment-qr.png" alt="Payment QR Code" className={styles.qrCode} />
                                                    <p>Scan the QR code to pay <strong>{selectedPlan.price}</strong></p>
                                                </div>
                                                <div className={styles.paymentInfo}>
                                                    <div className={styles.planSummary}>
                                                        <span>Selected Plan:</span>
                                                        <strong>{selectedPlan.title}</strong>
                                                    </div>
                                                    <div className={styles.inputGroup + " " + styles.fullWidth}>
                                                        <label>Upload Payment Screenshot</label>
                                                        <div className={styles.fileUpload}>
                                                            <input type="file" name="paymentScreenshot" onChange={handleFileChange} accept="image/*" id="paymentScreenshot" required />
                                                            <label htmlFor="paymentScreenshot" className={styles.fileLabel}>
                                                                <Scan size={20} />
                                                                {formData.paymentScreenshot || "Select Screenshot"}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <p className={styles.paymentNote}>*Please upload the screenshot after successful payment to proceed.</p>
                                                </div>
                                            </div>
                                            <div className={styles.actionBtns}>
                                                <button type="button" onClick={handleBack} className={styles.backBtn}><ChevronLeft size={18} /> Back</button>
                                                <button type="button" onClick={handleNext} disabled={!formData.paymentScreenshot} className={styles.nextBtn}>Verify & Continue <ChevronRight size={18} /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 4 && (
                                <div className={styles.stepContent}>
                                    <h3>Contact Channels</h3>
                                    <div className={styles.fieldGrid}>
                                        <div className={styles.inputGroup}>
                                            <label>Phone Number</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Email Address</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className={styles.actionBtns}>
                                        <button type="button" onClick={handleBack} className={styles.backBtn}><ChevronLeft size={18} /> Back</button>
                                        <button type="button" onClick={handleNext} className={styles.nextBtn}>Review <ChevronRight size={18} /></button>
                                    </div>
                                </div>
                            )}

                            {step === 5 && (
                                <div className={styles.stepContent}>
                                    <h3>Review Your Application</h3>
                                    <div className={styles.reviewGrid}>
                                        <div className={styles.reviewItem}><span>Name:</span> {formData.fullName}</div>
                                        <div className={styles.reviewItem}><span>Age/Gender:</span> {formData.age} / {formData.gender}</div>
                                        <div className={styles.reviewItem}><span>Location:</span> {formData.location} ({formData.pincode})</div>
                                        <div className={styles.reviewItem}><span>Experience:</span> {formData.experience}</div>
                                        <div className={styles.reviewItem}><span>Plan:</span> {selectedPlan?.title} ({selectedPlan?.price})</div>
                                        <div className={styles.reviewItem}><span>Phone:</span> {formData.phone}</div>
                                        <div className={styles.reviewItem}><span>Photos:</span> Uploaded</div>
                                        <div className={styles.reviewItem}><span>Payment:</span> {formData.paymentScreenshot ? "Screenshot Uploaded" : "Not Provided"}</div>
                                    </div>
                                    <div className={styles.actionBtns}>
                                        <button type="button" onClick={handleBack} className={styles.backBtn}><ChevronLeft size={18} /> Back</button>
                                        <button type="submit" className={styles.submitBtn}>
                                            Send to WhatsApp
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 6 && (
                                <div className={styles.successStep}>
                                    <CheckCircle size={60} className={styles.successIcon} />
                                    <h3>Application Submitted!</h3>
                                    <p>Your details and payment screenshot have been sent. Our team will verify and contact you soon.</p>
                                    <button type="button" onClick={() => (window.location.href = "/")} className={styles.nextBtn}>
                                        Back to Home
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationPage;
