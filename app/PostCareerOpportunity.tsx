'use client';

import { useState } from 'react';
import styles from './PostCareerOpportunity.module.css';

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export default function PostCareerOpportunity() {
  const [locationPreference, setLocationPreference] = useState('on-site');
  const [showSalaryRange, setShowSalaryRange] = useState(true);
  const [alumniExclusive, setAlumniExclusive] = useState(false);

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'John Doe', initials: 'JD', color: '#3b82f6' },
    { id: '2', name: 'Jane Smith', initials: 'JS', color: '#8b5cf6' },
    { id: '3', name: 'Mike Johnson', initials: 'MJ', color: '#10b981' },
    { id: '4', name: 'Sarah Wilson', initials: 'SW', color: '#f59e0b' },
  ];

  const currentStep = 1;
  const totalSteps = 4;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.closeBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h1 className={styles.headerTitle}>Post a Career Opportunity</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Progress Indicator */}
        <div className={styles.progressContainer}>
          <div className={styles.progressDots}>
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${
                  index < currentStep ? styles.completed : index === currentStep ? styles.active : ''
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>
          <p className={styles.sectionDescription}>
            Step {currentStep} of {totalSteps}. Tell us the fundamentals of the role you're hiring for.
          </p>

          {/* Job Title Input */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Job Title</label>
            <input
              type="text"
              placeholder="e.g. Senior Product Designer"
              className={styles.input}
              readOnly
            />
          </div>

          {/* Employment Type */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Employment Type</label>
            <select className={styles.select} disabled>
              <option>Select employment type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
            </select>
          </div>

          {/* Location Preference */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Location Preference</label>
            <div className={styles.locationButtons}>
              <button
                className={`${styles.locationBtn} ${locationPreference === 'on-site' ? styles.active : ''}`}
                disabled
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>On-site</span>
              </button>
              <button className={styles.locationBtn} disabled>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 17v-7l-10-6-10 6v7"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <span>Remote</span>
              </button>
              <button className={styles.locationBtn} disabled>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="11" r="3"></circle>
                  <path d="M2 12a10 10 0 1 1 20 0"></path>
                </svg>
                <span>Hybrid</span>
              </button>
            </div>
          </div>

          {/* Show Salary Range Toggle */}
          <div className={styles.toggleGroup}>
            <div className={styles.toggleContent}>
              <div className={styles.toggleIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4M12 8h.01"></path>
                </svg>
              </div>
              <div>
                <p className={styles.toggleLabel}>Show salary range</p>
                <p className={styles.toggleDescription}>Recommended for 2x more applications</p>
              </div>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={showSalaryRange}
                disabled
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          {/* Alumni Exclusive Toggle */}
          <div className={styles.toggleGroup}>
            <div className={styles.toggleContent}>
              <div className={styles.toggleIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <p className={styles.toggleLabel}>Alumni Exclusive</p>
                <p className={styles.toggleDescription}>Only show this role to verified alumni</p>
              </div>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={alumniExclusive}
                disabled
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </section>

        {/* Spacer for fixed bottom */}
        <div className={styles.contentSpacer}></div>
      </div>

      {/* Fixed Bottom Section */}
      <div className={styles.fixedBottom}>
        <button className={styles.continueBtn}>
          Continue to Description
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className={styles.draftMessage}>Drafts are saved automatically as you type.</p>

        {/* Hiring Team */}
        <div className={styles.hiringTeam}>
          <div className={styles.teamAvatars}>
            {teamMembers.slice(0, 3).map((member, index) => (
              <div
                key={member.id}
                className={styles.avatar}
                style={{
                  backgroundColor: member.color,
                  marginLeft: index > 0 ? '-12px' : '0',
                  zIndex: 3 - index,
                }}
                title={member.name}
              >
                {member.initials}
              </div>
            ))}
            <div className={styles.avatarOverflow}>
              +{teamMembers.length - 3}
            </div>
          </div>
          <p className={styles.teamLabel}>Hiring Team ({teamMembers.length})</p>
        </div>
      </div>
    </div>
  );
}
