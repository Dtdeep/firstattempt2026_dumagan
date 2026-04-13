'use client';

import styles from './EmployerDashboard.module.css';

interface Candidate {
  id: string;
  name: string;
  title: string;
  photo: string;
}

interface PipelineStage {
  name: string;
  count: number;
}

export default function EmployerDashboard() {
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Alex Morgan',
      title: 'Senior UX Designer - 8 y...',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      title: 'Frontend Architect - 9...',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      id: '3',
      name: 'David Chen',
      title: 'Product Manager - 12...',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    },
  ];

  const pipelineStages: PipelineStage[] = [
    { name: 'SOURCED', count: 120 },
    { name: 'APPLIED', count: 98 },
    { name: 'SCREENED', count: 65 },
    { name: 'INTERVIEW', count: 24 },
    { name: 'OFFER', count: 8 },
  ];

  const maxCount = Math.max(...pipelineStages.map((s) => s.count));

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerBrand}>
            <div className={styles.brandIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <rect x="3" y="3" width="9" height="9" />
                <rect x="12" y="3" width="9" height="9" />
                <rect x="3" y="12" width="9" height="9" />
                <rect x="12" y="12" width="9" height="9" />
              </svg>
            </div>
            <h1 className={styles.headerTitle}>Employer Dashboard</h1>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.searchBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <button className={styles.notificationBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Stats Grid */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Active Posts</p>
            <div className={styles.statValue}>12</div>
            <div className={styles.statChange + ' ' + styles.positive}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <span>+2%</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Applicants</p>
            <div className={styles.statValue}>458</div>
            <div className={styles.statChange + ' ' + styles.positive}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <span>+15%</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Interviews</p>
            <div className={styles.statValue}>24</div>
            <div className={styles.statChange + ' ' + styles.negative}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <span>-5%</span>
            </div>
          </div>
        </section>

        {/* Pipeline Overview */}
        <section className={styles.pipelineSection}>
          <div className={styles.pipelineHeader}>
            <div>
              <h2 className={styles.pipelineTitle}>Pipeline Overview</h2>
              <p className={styles.pipelineSubtitle}>Real-time candidate conversion</p>
            </div>
            <button className={styles.filterBtn}>
              <span>Last 30 days</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          <div className={styles.pipeline}>
            {pipelineStages.map((stage, index) => {
              const heightPercent = (stage.count / maxCount) * 100;
              return (
                <div key={index} className={styles.pipelineStage}>
                  <div className={styles.pipelineBarContainer}>
                    <div
                      className={styles.pipelineBar}
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <p className={styles.stageName}>{stage.name}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Top Matches */}
        <section className={styles.topMatchesSection}>
          <div className={styles.topMatchesHeader}>
            <h2 className={styles.topMatchesTitle}>Top Matches</h2>
            <button className={styles.viewAllBtn}>View All</button>
          </div>

          <div className={styles.candidatesList}>
            {candidates.map((candidate) => (
              <div key={candidate.id} className={styles.candidateCard}>
                <div className={styles.candidatePhoto}>
                  <img src={candidate.photo} alt={candidate.name} />
                </div>
                <div className={styles.candidateInfo}>
                  <h3 className={styles.candidateName}>{candidate.name}</h3>
                  <p className={styles.candidateTitle}>{candidate.title}</p>
                </div>
                <button className={styles.quickInviteBtn}>Quick Invite</button>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Spacer */}
        <div className={styles.bottomSpacer}></div>
      </div>

      {/* Fixed Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <button className={styles.navItem + ' ' + styles.active}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="9" height="9" />
            <rect x="12" y="3" width="9" height="9" />
            <rect x="3" y="12" width="9" height="9" />
            <rect x="12" y="12" width="9" height="9" />
          </svg>
          <span>Dashboard</span>
        </button>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <path d="M3 9h18"></path>
          </svg>
          <span>Jobs</span>
        </button>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Candidates</span>
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
