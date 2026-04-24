'use client';

import { useRouter } from 'next/navigation';
import styles from './JobDetails.module.css';

interface SkillItem {
  name: string;
  icon: string;
}

export default function JobDetails() {
  const router = useRouter();

  const matchedSkills: SkillItem[] = [
    { name: 'React Basics', icon: '⚛️' },
    { name: 'Motion Design', icon: '✨' },
  ];

  const potentialGaps: SkillItem[] = [
    { name: 'React Basics', icon: '⚛️' },
    { name: 'Motion Design', icon: '✨' },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backBtn} onClick={() => router.push('/job-search')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className={styles.headerTitle}>Job Details</h1>
          <button className={styles.shareBtn} onClick={() => router.push('/application-status')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Company Icon */}
        <div className={styles.companyIconSection}>
          <div className={styles.companyIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M4 6h16V4H4v2zm0 4h16v-2H4v2zm0 4h16v-2H4v2zm0 4h16v-2H4v2z" />
            </svg>
          </div>
        </div>

        {/* Job Title Section */}
        <section className={styles.jobTitleSection}>
          <h2 className={styles.jobTitle}>Senior Product Designer</h2>
          <p className={styles.jobMeta}>TechFlow Inc • San Francisco, CA</p>
          <p className={styles.jobPostedInfo}>Posted 2 days ago • 142 applicants</p>
        </section>

        {/* Passport Match Score */}
        <section className={styles.matchScoreSection}>
          <div className={styles.matchScoreContent}>
            <div className={styles.matchScoreText}>
              <h3 className={styles.matchScoreTitle}>Passport Match Score</h3>
              <p className={styles.matchScoreDesc}>Based on verified data and past experience</p>
            </div>
            <div className={styles.matchScoreCircle}>
              <svg width="100" height="100" viewBox="0 0 120 120" className={styles.matchCircle}>
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="8"
                  strokeDasharray="85 100"
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }}
                />
                <text
                  x="60"
                  y="70"
                  textAnchor="middle"
                  fontSize="32"
                  fontWeight="700"
                  fill="#003d82"
                >
                  85%
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Skill Match Analysis */}
        <section className={styles.skillMatchSection}>
          <h3 className={styles.sectionTitle}>Skill Match Analysis</h3>

          <div className={styles.skillGroup}>
            <h4 className={styles.skillGroupTitle}>MATCHED SKILLS (6)</h4>
            <div className={styles.skillsList}>
              {matchedSkills.map((skill, index) => (
                <div key={index} className={styles.skillTag}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.skillGroup}>
            <h4 className={styles.skillGroupTitle}>POTENTIAL GAPS (2)</h4>
            <div className={styles.skillsList}>
              {potentialGaps.map((skill, index) => (
                <div key={index} className={styles.skillTag + ' ' + styles.gapTag}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the Role */}
        <section className={styles.aboutSection}>
          <h3 className={styles.sectionTitle}>About the Role</h3>
          <p className={styles.aboutText}>
            We are looking for a Senior Product Designer to join our creative and innovative team. You will be responsible for leading the design of new features from concept to execution, working closely with engineering and product management.
          </p>
          <ul className={styles.aboutList}>
            <li>Drive the design vision for our flagship platform.</li>
            <li>Collaborate with cross-functional teams to define requirements.</li>
            <li>Create high-fidelity prototypes and design specifications.</li>
            <li>Mentor junior designers and contribute to our design system.</li>
          </ul>
        </section>

        {/* Location */}
        <section className={styles.locationSection}>
          <h3 className={styles.sectionTitle}>Location</h3>
          <div className={styles.locationMap}>
            <div className={styles.mapPlaceholder}></div>
            <div className={styles.locationBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3" fill="white"></circle>
              </svg>
              San Francisco, CA
            </div>
          </div>
        </section>

        {/* Spacer for fixed bottom bar */}
        <div className={styles.bottomSpacer}></div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={styles.fixedActionBar}>
        <button className={styles.applyBtn} onClick={() => router.push('/instant-application')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.2L4.8 12m-1.4 1.4L9 19 21 7" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          Apply with Career Passport
        </button>
        <button className={styles.bookmarkBtnFixed} onClick={() => router.push('/application-status')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
