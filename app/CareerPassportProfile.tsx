'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CareerPassportProfile.module.css';

export default function CareerPassportProfile() {
  const router = useRouter();
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Career Passport</h1>
        <button className={styles.settingsBtn} onClick={() => router.push('/application-status')}>
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
          <button className={styles.cvButton} onClick={() => router.push('/vault')}>
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
            <button
              type="button"
              className={styles.viewAll}
              onClick={() => router.push('/application-status')}
            >
              View All
            </button>
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
        <button className={styles.navItem} onClick={() => router.push('/job-search')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span>Home</span>
        </button>
        <button className={styles.navItem} onClick={() => router.push('/vault')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="6" width="18" height="12" rx="2"></rect>
            <path d="M3 10h18"></path>
            <path d="M9 6V3h6v3"></path>
          </svg>
          <span>Vault</span>
        </button>
        <button className={styles.navItem} onClick={() => router.push('/application-status')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Identity</span>
        </button>
        <button className={styles.navItem + ' ' + styles.active} onClick={() => router.push('/careerpassport-profile')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
