'use client';

import { useRouter } from 'next/navigation';
import styles from './DigitalVault.module.css';

interface VaultRecord {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  verificationDate: string;
  verified: boolean;
}

export default function DigitalVault() {
  const router = useRouter();

  const vaultRecords: VaultRecord[] = [
    {
      id: '1',
      icon: '🎓',
      title: 'e-Diploma',
      subtitle: 'University of Excellence • 2023',
      verificationDate: 'VERIFIED OCT 15',
      verified: true,
    },
    {
      id: '2',
      icon: '📄',
      title: 'Academic Transcript',
      subtitle: 'Official Grade Report',
      verificationDate: 'VERIFIED SEP 28',
      verified: true,
    },
    {
      id: '3',
      icon: '☁️',
      title: 'AWS Cloud Practitioner',
      subtitle: 'Certification ID: AWS-882219',
      verificationDate: 'VERIFIED AUG 15',
      verified: true,
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.branding}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.brandIcon}
            >
              <rect x="4" y="5" width="16" height="14" rx="2" stroke="white" strokeWidth="2" />
              <path d="M12 5V2" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 10L10 12L12 14L14 12L12 10Z" fill="white" />
            </svg>
            <div>
              <h1 className={styles.brandTitle}>Digital Vault</h1>
              <p className={styles.brandSubtitle}>SECURE STORAGE</p>
            </div>
          </div>
          <button className={styles.settingsBtn} onClick={() => router.push('/careerpassport-profile')}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </header>

      <div className={styles.content}>
        {/* Vault Status Section */}
        <section className={styles.statusSection}>
          <div className={styles.statusCard}>
            <div className={styles.statusContent}>
              <p className={styles.statusLabel}>Vault Status</p>
              <h2 className={styles.statusTitle}>Encrypted & Secure</h2>
            </div>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.statusIcon}
            >
              <path
                d="M12 2C12 2 4 5.5 4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12C20 5.5 12 2 12 2Z"
                stroke="#003d82"
                strokeWidth="2"
                fill="none"
              />
              <path d="M10 14L14 18L18 10" stroke="#003d82" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </section>

        {/* Verified Records Section */}
        <section className={styles.recordsSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Verified Records</h3>
            <span className={styles.recordCount}>{vaultRecords.length} items</span>
          </div>

          <div className={styles.recordsList}>
            {vaultRecords.map((record) => (
              <div
                key={record.id}
                className={styles.recordCard}
                onClick={() => router.push(`/vault/${record.id}`)}
              >
                <div className={styles.recordHeader}>
                  <div className={styles.recordIcon}>{record.icon}</div>
                  <div className={styles.recordInfo}>
                    <h4 className={styles.recordTitle}>{record.title}</h4>
                    <p className={styles.recordSubtitle}>{record.subtitle}</p>
                  </div>
                  {record.verified && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.verifiedBadge}
                    >
                      <circle cx="12" cy="12" r="10" fill="#e0f2fe" />
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                        fill="#0284c7"
                      />
                    </svg>
                  )}
                </div>

                <p className={styles.verificationDate}>{record.verificationDate}</p>

                <div className={styles.recordActions}>
                  <div
                    className={styles.actionBtn}
                    title="Download"
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push(`/vault/${record.id}`);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <div
                    className={styles.actionBtn}
                    title="Share"
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push('/application-status');
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </div>
                  <div
                    className={styles.viewBtn}
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push(`/vault/${record.id}`);
                    }}
                  >
                    View
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vault Auto-Lock Section */}
        <section className={styles.autoLockSection}>
          <div className={styles.autoLockContent}>
            <div className={styles.autoLockInfo}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={styles.lockIcon}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <div>
                <p className={styles.autoLockTitle}>Vault Auto-Lock</p>
                <p className={styles.autoLockDesc}>Lock vault after 5 minutes of inactivity</p>
              </div>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                defaultChecked={true}
                disabled
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <div
          className={styles.navItem}
          role="button"
          tabIndex={0}
          onClick={() => router.push('/job-search')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </div>
        <div className={styles.navItem + ' ' + styles.active} role="button" tabIndex={0} onClick={() => router.push('/vault')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="6" width="18" height="12" rx="2"></rect>
            <path d="M3 10h18"></path>
            <path d="M9 6V3h6v3"></path>
          </svg>
          <span>Vault</span>
        </div>
        <div
          className={styles.navItem}
          role="button"
          tabIndex={0}
          onClick={() => router.push('/application-status')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Identity</span>
        </div>
        <div
          className={styles.navItem}
          role="button"
          tabIndex={0}
          onClick={() => router.push('/careerpassport-profile')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Profile</span>
        </div>
      </nav>
    </div>
  );
}
