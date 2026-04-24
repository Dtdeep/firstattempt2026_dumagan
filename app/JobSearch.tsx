// KEY FILE: Main candidate navigation hub for job browsing flow.
'use client';

import { useRouter } from 'next/navigation';
import styles from './JobSearch.module.css';

interface JobCard {
  id: string;
  icon: string;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  type: string;
  postedTime: string;
  matchPercentage: number;
}

export default function JobSearch() {
  const router = useRouter();

  const jobCards: JobCard[] = [
    {
      id: '1',
      icon: '📋',
      title: 'Senior Product Designer',
      company: 'TechFlow Systems',
      location: 'San Francisco, CA',
      salaryMin: 140,
      salaryMax: 180,
      type: 'Full-time',
      postedTime: '2 days ago',
      matchPercentage: 98,
    },
    {
      id: '2',
      icon: '💻',
      title: 'Frontend Engineer (React)',
      company: 'Lumina Creative',
      location: 'Remote',
      salaryMin: 120,
      salaryMax: 155,
      type: 'Contract',
      postedTime: '5 hours ago',
      matchPercentage: 92,
    },
    {
      id: '3',
      icon: '🔍',
      title: 'UX Research Lead',
      company: 'Blue Knight Corp',
      location: 'Austin, TX',
      salaryMin: 150,
      salaryMax: 200,
      type: 'Full-time',
      postedTime: '1 week ago',
      matchPercentage: 89,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backBtn} onClick={() => router.push('/careerpassport-profile')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className={styles.headerTitle}>Job Search</h1>
          <button className={styles.notificationBtn} onClick={() => router.push('/application-status')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className={styles.notificationDot}></span>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search job title, company..."
            className={styles.searchInput}
            readOnly
          />
          <button className={styles.filterBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filterButtons}>
          <button className={styles.filterButton}>
            <span>Degree</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <button className={styles.filterButton}>
            <span>Skills</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <button className={styles.filterButton}>
            <span>Location</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <button className={styles.moreFiltersBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Hand-Picked Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Hand-Picked for You</h2>
            <button className={styles.seeAllBtn} onClick={() => router.push('/job-search')}>See all</button>
          </div>

          <div className={styles.jobsList}>
            {jobCards.map((job) => (
              <div key={job.id} className={styles.jobCard} onClick={() => router.push('/job-details')}>
                <div className={styles.jobHeader}>
                  <div className={styles.companyIcon}>{job.icon}</div>
                  <div className={styles.jobHeaderInfo}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <p className={styles.companyName}>{job.company}</p>
                    <p className={styles.location}>{job.location}</p>
                  </div>
                  <div className={styles.matchBadge}>
                    <span className={styles.matchPercentage}>{job.matchPercentage}%</span>
                    <p className={styles.matchLabel}>Match</p>
                  </div>
                </div>

                <div className={styles.jobDetails}>
                  <span className={styles.salaryDetail}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1"></circle>
                      <path d="M12 1v6m0 6v4"></path>
                    </svg>
                    ${job.salaryMin}k - ${job.salaryMax}k
                  </span>
                  <span className={styles.typeDetail}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1"></circle>
                    </svg>
                    {job.type}
                  </span>
                  <span className={styles.timeDetail}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {job.postedTime}
                  </span>
                </div>

                <div className={styles.jobActions}>
                  <button
                    className={styles.applyBtn}
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push('/job-details');
                    }}
                  >
                    Apply Now
                  </button>
                  <button
                    className={styles.bookmarkBtn}
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push('/application-status');
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <button className={styles.navItem} onClick={() => router.push('/job-search')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <span>Search</span>
        </button>
        <button className={styles.navItem} onClick={() => router.push('/application-status')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <path d="M3 9h18"></path>
          </svg>
          <span>Applied</span>
        </button>
        <button className={styles.navItem} onClick={() => router.push('/instant-application')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Messages</span>
        </button>
        <button className={styles.navItem} onClick={() => router.push('/careerpassport-profile')}>
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
