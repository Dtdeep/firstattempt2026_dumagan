'use client';

import { useRouter, useParams } from 'next/navigation';
import styles from '../../DigitalVault.module.css';

export default function VaultDetailPage() {
  const router = useRouter();
  const params = useParams();
  const recordId = params.id as string;

  const records: Record<string, any> = {
    '1': {
      icon: '🎓',
      title: 'e-Diploma',
      subtitle: 'University of Excellence • 2023',
      verificationDate: 'VERIFIED OCT 15',
    },
    '2': {
      icon: '📄',
      title: 'Academic Transcript',
      subtitle: 'Official Grade Report',
      verificationDate: 'VERIFIED SEP 28',
    },
    '3': {
      icon: '☁️',
      title: 'AWS Cloud Practitioner',
      subtitle: 'Certification ID: AWS-882219',
      verificationDate: 'VERIFIED AUG 15',
    },
  };

  const record = records[recordId];

  if (!record) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>
              ←
            </button>
            <h1 className={styles.brandTitle}>Record Not Found</h1>
          </div>
        </header>
        <div className={styles.content}>
          <p>The record you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '24px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            ←
          </button>
          <h1 className={styles.brandTitle}>Record Details</h1>
          <div style={{ width: '40px' }}></div>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.recordCard}>
          <div className={styles.recordHeader}>
            <div className={styles.recordIcon}>{record.icon}</div>
            <div className={styles.recordInfo}>
              <h4 className={styles.recordTitle}>{record.title}</h4>
              <p className={styles.recordSubtitle}>{record.subtitle}</p>
            </div>
          </div>

          <p className={styles.verificationDate}>{record.verificationDate}</p>

          <div style={{ marginTop: '20px', padding: '20px', background: '#f0f9ff', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#1f2937', fontWeight: 600 }}>
              Record Details
            </p>
            <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#6b7280' }}>
              This is the detailed view of your verified record. You can download, share, or manage this credential from here.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </button>
        <button className={styles.navItem + ' ' + styles.active}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="6" width="18" height="12" rx="2"></rect>
            <path d="M3 10h18"></path>
            <path d="M9 6V3h6v3"></path>
          </svg>
          <span>Vault</span>
        </button>
        <button className={styles.navItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Identity</span>
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
