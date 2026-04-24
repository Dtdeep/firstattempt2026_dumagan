'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ApplicantScreening.module.css';

interface Applicant {
  id: string;
  name: string;
  position: string;
  company: string;
  matchPercentage: number;
  appliedTime: string;
  skills: string[];
  avatarColor: string;
  initials: string;
}

export default function ApplicantScreening() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  const applicants: Applicant[] = [
    {
      id: '1',
      name: 'Alex Rivera',
      position: 'Senior Designer',
      company: 'TechFlow',
      matchPercentage: 98,
      appliedTime: 'Applied 2h ago',
      skills: ['Figma', 'Prototyping', 'Design Ops'],
      avatarColor: '#f5a96d',
      initials: 'AR',
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      position: 'Product Designer',
      company: 'CreativeCo',
      matchPercentage: 92,
      appliedTime: 'Applied 1d ago',
      skills: ['User Research', 'Adobe XD'],
      avatarColor: '#d4a5a5',
      initials: 'SJ',
    },
    {
      id: '3',
      name: 'Marcus Chen',
      position: 'UX Consultant (Freelance)',
      company: '',
      matchPercentage: 86,
      appliedTime: 'Applied 3d ago',
      skills: ['Strategic Design', 'Workshop'],
      avatarColor: '#b89968',
      initials: 'MC',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/employer-dashboard')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 className={styles.headerTitle}>Applicant Screening</h1>
        <button className={styles.searchBtn} onClick={() => router.push('/admin-analytics')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Job Listing Info */}
        <div className={styles.listingInfo}>
          <span className={styles.listingLabel}>ACTIVE LISTING</span>
          <h2 className={styles.jobTitle}>Senior UX Designer</h2>
          <p className={styles.listingStats}>24 total applicants • 8 new today</p>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filterContainer}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Applicants
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'matched' ? styles.active : ''}`}
            onClick={() => setActiveFilter('matched')}
          >
            Highly Matched
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'recent' ? styles.active : ''}`}
            onClick={() => setActiveFilter('recent')}
          >
            Recent
          </button>
        </div>

        {/* Applicants List */}
        <div className={styles.applicantsList}>
          {applicants.map((applicant) => (
            <div key={applicant.id} className={styles.applicantCard}>
              {/* Match Badge & Time */}
              <div className={styles.cardHeader}>
                <div className={styles.matchBadge}>
                  {applicant.matchPercentage}% MATCH
                </div>
                <span className={styles.appliedTime}>{applicant.appliedTime}</span>
              </div>

              {/* Main Content */}
              <div className={styles.cardContent}>
                <div className={styles.applicantInfo}>
                  <h3 className={styles.applicantName}>{applicant.name}</h3>
                  <p className={styles.applicantPosition}>
                    {applicant.position}
                    {applicant.company && ` at ${applicant.company}`}
                  </p>

                  {/* Skills */}
                  {applicant.skills.length > 0 && (
                    <div className={styles.skillsContainer}>
                      {applicant.skills.map((skill, idx) => (
                        <span key={idx} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View Profile Link */}
                  <button className={styles.viewProfileLink} onClick={() => router.push('/careerpassport-profile')}>
                    View Profile
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Avatar & Bookmark */}
                <div className={styles.cardActions}>
                  <div
                    className={styles.applicantAvatar}
                    style={{ backgroundColor: applicant.avatarColor }}
                  >
                    {applicant.initials}
                  </div>
                  <button className={styles.bookmarkBtn} onClick={() => router.push('/admin-analytics')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer for fixed bottom */}
        <div className={styles.contentSpacer}></div>
      </div>

      {/* Fixed Bottom Navigation */}
      <nav className={styles.fixedNav}>
        <button className={`${styles.navItem} ${styles.active}`} onClick={() => router.push('/applicant-screening')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 3h-3V2h-2v1H8"></path>
          </svg>
          <span>Applicants</span>
        </button>
        <button className={styles.navItem} onClick={() => router.push('/employer-dashboard')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Candidates</span>
        </button>
        <button className={styles.navItem} onClick={() => router.push('/admin-analytics')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Messages</span>
        </button>
        <button className={styles.navItem} onClick={() => router.push('/careerpassport-profile')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"></path>
            <path d="M3.6 9h16.8M3.6 15h16.8"></path>
            <path d="M11.5 3c0 2.485-1.417 4.627-3.456 5.724M12.5 3c0 2.485 1.417 4.627 3.456 5.724M11.5 21c0-2.485-1.417-4.627-3.456-5.724M12.5 21c0-2.485 1.417-4.627 3.456-5.724"></path>
          </svg>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
