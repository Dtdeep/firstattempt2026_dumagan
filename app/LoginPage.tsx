'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';

type TabType = 'alumni' | 'employer' | 'staff';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('alumni');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.branding}>Career Passport</span>
      </div>

      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Welcome Back</h1>
        <p className={styles.heroSubtitle}>
          Access your professional network and career tools.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.tabs}>
          {(['alumni', 'employer', 'staff'] as const).map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email or ID</label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4C2 2.9 2.9 2 4 2H16C17.1 2 18 2.9 18 4V16C18 17.1 17.1 18 16 18H4C2.9 18 2 17.1 2 16V4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M2 4L10 10L18 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <input
                type="email"
                placeholder="Enter your email or ID"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10C4 7.79 5.79 6 8 6H12C14.21 6 16 7.79 16 10V14C16 15.1 15.1 16 14 16H6C4.9 16 4 15.1 4 14V10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M8 6V5C8 4.45 8.45 4 9 4H11C11.55 4 12 4.45 12 5V6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="10" cy="11" r="1" fill="currentColor" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4C5.58 4 1.73 6.61 0.36 10.5C1.73 14.39 5.58 17 10 17C14.42 17 18.27 14.39 19.64 10.5C18.27 6.61 14.42 4 10 4ZM10 14.5C8.07 14.5 6.5 12.93 6.5 11C6.5 9.07 8.07 7.5 10 7.5C11.93 7.5 13.5 9.07 13.5 11C13.5 12.93 11.93 14.5 10 14.5Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>

          <button type="button" className={styles.submitButton} onClick={() => router.push('/careerpassport-profile')}>
            Sign In →
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>OR CONTINUE WITH</span>
        </div>

        <div className={styles.oauthButtons}>
          <button className={styles.oauthButton}>
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Sign in with Google
          </button>
          <button className={styles.oauthButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.89543 7 7 7.89543 7 9C7 10.1046 7.89543 11 9 11Z"
                fill="currentColor"
              />
            </svg>
            Single Sign-On (SSO)
          </button>
        </div>
      </div>
    </div>
  );
}
