'use client';

import { useState } from 'react';
import styles from './CareerPassportProfile.module.css';

export default function CareerPassportProfile() {
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Career Passport</h1>
        <button className={styles.settingsBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="12" cy="5" r="2" fill="currentColor"/>
            <circle cx="12" cy="19" r="2" fill="currentColor"/>
          </svg>
        </button>
      </header>

      <div className={styles.content}>
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.profilePicture}>
            <img src="https://via.placeholder.com/120?text=AJ" alt="Alex Johnson" />
          </div>
          <h2 className={styles.name}>Alex Johnson</h2>
          <p className={styles.subtext}>
            <span className={styles.verified}>Verified Alumnus</span>
            <span className={styles.separator}>•</span>
            <span className={styles.classYear}>Class of 2020</span>
          </p>
          <button className={styles.cvButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="2" width="16" height="20" rx="2" stroke="white" strokeWidth="2"/>
              <path d="M8 6H16M8 10H16M8 14H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Generate Professional CV
          </button>
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <p className={styles.statValue}>3.9</p>
            <p className={styles.statLabel}>GPA</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statValue}>12</p>
            <p className={styles.statLabel}>CERTIFICATES</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statValue}>5</p>
            <p className={styles.statLabel}>HONORS</p>
          </div>
        </div>

        {/* Academic Honors Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Academic Honors</h3>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.honorsList}>
            <div className={styles.honorItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26H21.77L16.84 12.58L19.09 18.85L12 14.54L4.91 18.85L7.16 12.58L2.23 8.26H8.91L12 2Z" fill="#003d82"/>
              </svg>
              <div>
                <p className={styles.honorTitle}>Dean's List</p>
                <p className={styles.honorDesc}>Awarded for 6 consecutive semesters</p>
              </div>
            </div>
            <div className={styles.honorItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26H21.77L16.84 12.58L19.09 18.85L12 14.54L4.91 18.85L7.16 12.58L2.23 8.26H8.91L12 2Z" fill="#003d82"/>
              </svg>
              <div>
                <p className={styles.honorTitle}>Summa Cum Laude</p>
                <p className={styles.honorDesc}>Top 1% of the graduating class</p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Skills Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Professional Skills</h3>
            <button className={styles.editBtn} onClick={() => setIsEditingSkills(!isEditingSkills)}>
              {isEditingSkills ? 'Done' : 'Edit'}
            </button>
          </div>
          <div className={styles.skillsList}>
            <span className={styles.skill}>Product Strategy</span>
            <span className={styles.skill}>Data Analysis</span>
            <span className={styles.skill}>SQL</span>
            <span className={styles.skill}>Python</span>
            <span className={styles.skill}>Project Management</span>
            <span className={styles.skill}>UX Research</span>
            <span className={styles.addSkill}>+ Add Skill</span>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <button className={styles.navItem + ' ' + styles.active}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z"/>
          </svg>
          <span>PASSPORT</span>
        </button>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>NETWORK</span>
        </button>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 4V2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
          </svg>
          <span>JOBS</span>
        </button>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>MESSAGES</span>
        </button>
      </nav>
    </div>
  );
}
