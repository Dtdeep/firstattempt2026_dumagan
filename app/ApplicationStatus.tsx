'use client';

import styles from './ApplicationStatus.module.css';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  isDone: boolean;
}

export default function ApplicationStatus() {
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'Interview Invitation Sent',
      date: 'Today',
      time: '10:45 AM',
      isDone: true,
    },
    {
      id: '2',
      title: 'Application Shortlisted',
      date: 'Yesterday',
      isDone: true,
    },
    {
      id: '3',
      title: 'Resume Viewed by Hiring Manager',
      date: 'Oct 24, 2023',
      isDone: true,
    },
    {
      id: '4',
      title: 'Application Submitted',
      date: 'Oct 22, 2023',
      isDone: true,
    },
  ];

  const progressSteps = ['Applied', 'Viewed', 'Shortlisted', 'Interview', 'Offer'];
  const currentStep = 3;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className={styles.headerTitle}>Application Status</h1>
          <button className={styles.moreBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Job Card */}
        <section className={styles.jobCard}>
          <div className={styles.jobCardHeader}>
            <div className={styles.companyIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#6b7280">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </div>
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>Senior Software Engineer</h2>
              <p className={styles.jobCompany}>Google · Mountain View, CA</p>
            </div>
          </div>

          <div className={styles.statusBadge}>In Progress</div>
        </section>

        {/* Progress Steps */}
        <section className={styles.progressSection}>
          <div className={styles.progressSteps}>
            {progressSteps.map((step, index) => (
              <div key={index} className={styles.stepContainer}>
                <div
                  className={`${styles.step} ${
                    index < currentStep ? styles.completed : ''
                  } ${index === currentStep ? styles.active : ''}`}
                >
                  {index < currentStep ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <p className={styles.stepLabel}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Message Section */}
        <section className={styles.messageSection}>
          <div className={styles.messageHeader}>
            <div className={styles.recruiterPhoto}>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt="Sarah Jenkins"
              />
            </div>
            <div className={styles.recruiterInfo}>
              <h3 className={styles.recruiterName}>Sarah Jenkins</h3>
              <p className={styles.recruiterTitle}>Senior Technical Recruiter</p>
            </div>
            <button className={styles.bookmarkBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
          <p className={styles.messageText}>
            "Hi Alex! Great news–the team was really impressed with your portfolio. We'd like to move forward with a technical interview. Are you available this Friday?"
          </p>
        </section>

        {/* Timeline Section */}
        <section className={styles.timelineSection}>
          <h3 className={styles.sectionTitle}>Timeline of Events</h3>
          <div className={styles.timeline}>
            {timelineEvents.map((event, index) => (
              <div key={event.id} className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                {index < timelineEvents.length - 1 && (
                  <div className={styles.timelineLine}></div>
                )}
                <div className={styles.timelineContent}>
                  <p className={styles.timelineTitle}>{event.title}</p>
                  <p className={styles.timelineDate}>
                    {event.date}
                    {event.time && `, ${event.time}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer for fixed nav */}
        <div className={styles.bottomSpacer}></div>
      </div>

      {/* Fixed Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Jobs</span>
        </button>
        <button className={styles.navItem + ' ' + styles.active}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <path d="M3 9h18"></path>
          </svg>
          <span>Applied</span>
        </button>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Messages</span>
        </button>
        <button className={styles.navItem}>
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
