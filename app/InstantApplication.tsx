'use client';

import styles from './InstantApplication.module.css';

interface AcademicRecord {
  id: string;
  title: string;
  date: string;
}

export default function InstantApplication() {
  const academicRecords: AcademicRecord[] = [
    {
      id: '1',
      title: 'Official Transcript.pdf',
      date: 'Uploaded Sep 25',
    },
    {
      id: '2',
      title: 'Bachelor Degree Certificate.pdf',
      date: 'Uploaded Aug 05 2023',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className={styles.headerTitle}>Instant Application</h1>
          <button className={styles.moreBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Profile Section */}
        <section className={styles.profileSection}>
          <div className={styles.profilePhoto}>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              alt="Alex Knight"
            />
          </div>
          <h2 className={styles.profileName}>Alex Knight</h2>
          <div className={styles.verifiedBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0284c7">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Verified Student
          </div>
          <p className={styles.profileTitle}>Master of Computer Science</p>
        </section>

        {/* University Verification Section */}
        <section className={styles.verificationSection}>
          <h3 className={styles.verificationTitle}>University of Tech Verification</h3>
          <p className={styles.verificationText}>
            This profile has been officially verified by the university registrar's office for the 2023-2024 academic year
          </p>
          <button className={styles.viewCredentialsBtn}>
            View Credentials
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </section>

        {/* Academic Records Section */}
        <section className={styles.academicSection}>
          <h3 className={styles.sectionTitle}>Academic Records</h3>
          <div className={styles.recordsList}>
            {academicRecords.map((record) => (
              <div key={record.id} className={styles.recordItem}>
                <div className={styles.recordIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0284c7">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                </div>
                <div className={styles.recordInfo}>
                  <p className={styles.recordTitle}>{record.title}</p>
                  <p className={styles.recordDate}>{record.date}</p>
                </div>
                <button className={styles.downloadBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cover Letter Section */}
        <section className={styles.coverLetterSection}>
          <div className={styles.coverLetterHeader}>
            <h3 className={styles.sectionTitle}>Cover Letter</h3>
            <button className={styles.editBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit
            </button>
          </div>
          <p className={styles.coverLetterText}>
            Dear Hiring Committee, I am writing to express my strong interest in the Research Assistant position. My Master's in Computer Science has provided me with a deep foundation in algorithm design and machine learning, which I am eager to apply to your current project. I have previously worked on several collaborative academic papers and value the rigor of research.
          </p>
        </section>

        {/* Preview Application Button */}
        <button className={styles.previewBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Preview Application
        </button>

        {/* Spacer for fixed bottom */}
        <div className={styles.bottomSpacer}></div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className={styles.fixedButtonBar}>
        <button className={styles.submitBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          Submit Application
        </button>
      </div>
    </div>
  );
}
