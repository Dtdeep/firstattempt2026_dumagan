'use client';

import { useState } from 'react';
import styles from './AdminAnalytics.module.css';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  subtext: string;
}

interface Placement {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  company: string;
  role: string;
}

interface SectorData {
  name: string;
  percentage: number;
  color: string;
}

export default function AdminAnalytics() {
  const metrics: MetricCard[] = [
    {
      title: 'Employment Rate',
      value: '94.2%',
      change: '+1.08%',
      subtext: 'year-on-year',
    },
    {
      title: 'Total Placements',
      value: '1,250',
      change: '+5%',
      subtext: 'last month',
    },
    {
      title: 'Avg. Package',
      value: '$85K',
      change: '+10%',
      subtext: 'industry avg. 5%',
    },
    {
      title: 'Alumni Network',
      value: '15,000',
      change: '+2%',
      subtext: 'global reach',
    },
  ];

  const employmentTrendsData = [
    { month: 'JAN', value: 45 },
    { month: 'FEB', value: 52 },
    { month: 'MAR', value: 48 },
    { month: 'APR', value: 85 },
    { month: 'MAY', value: 92 },
    { month: 'JUN', value: 78 },
  ];

  const sectorData: SectorData[] = [
    { name: 'Technology', percentage: 45, color: '#003d82' },
    { name: 'Finance', percentage: 35, color: '#0284c7' },
    { name: 'Healthcare', percentage: 20, color: '#93c5e7' },
  ];

  const recentPlacements: Placement[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      initials: 'AJ',
      avatarColor: '#f5a96d',
      company: 'TechCorp Inc.',
      role: 'Full Stack Dev',
    },
    {
      id: '2',
      name: 'Sarah Chen',
      initials: 'SC',
      avatarColor: '#d4a5a5',
      company: 'FitEdge Solutions',
      role: 'Data Analyst',
    },
    {
      id: '3',
      name: 'Marcus Wright',
      initials: 'MW',
      avatarColor: '#b89968',
      company: 'Creative Agency',
      role: 'Content Lead',
    },
  ];

  const maxTrendValue = Math.max(...employmentTrendsData.map(d => d.value));

  // Calculate donut chart dimensions
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;
  const sectorOffsets = sectorData.map(sector => {
    const offset = currentOffset;
    currentOffset += (sector.percentage / 100) * circumference;
    return offset;
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Admin Analytics</h1>
        <div className={styles.headerActions}>
          <button className={styles.headerBtn} disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <button className={styles.headerBtn} disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <h3 className={styles.metricTitle}>{metric.title}</h3>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricChange}>
                <span className={styles.changePositive}>{metric.change}</span>
                <span className={styles.metricSubtext}>{metric.subtext}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Employment Trends Chart */}
        <section className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Employment Trends</h2>
            <button className={styles.periodBtn} disabled>Last 6 Months</button>
          </div>

          <div className={styles.barChart}>
            {employmentTrendsData.map((data, index) => (
              <div key={index} className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    height: `${(data.value / maxTrendValue) * 100}%`,
                    backgroundColor: index === 3 || index === 4 ? '#0284c7' : '#bfdbfe',
                  }}
                ></div>
                <label className={styles.barLabel}>{data.month}</label>
              </div>
            ))}
          </div>
        </section>

        {/* Sector Distribution */}
        <section className={styles.chartSection}>
          <h2 className={styles.chartTitle}>Sector Distribution</h2>

          <div className={styles.sectorContainer}>
            <div className={styles.donutChart}>
              <svg width="220" height="220" viewBox="0 0 220 220">
                {sectorData.map((sector, index) => {
                  const dasharray = (sector.percentage / 100) * circumference;
                  const dashoffset = -sectorOffsets[index];
                  return (
                    <circle
                      key={index}
                      cx="110"
                      cy="110"
                      r={radius}
                      fill="none"
                      stroke={sector.color}
                      strokeWidth="20"
                      strokeDasharray={dasharray}
                      strokeDashoffset={dashoffset}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  );
                })}
              </svg>
              <div className={styles.donutCenter}>
                <span className={styles.donutPercentage}>45%</span>
                <span className={styles.donutLabel}>Tech</span>
              </div>
            </div>

            <div className={styles.sectorLegend}>
              {sectorData.map((sector, index) => (
                <div key={index} className={styles.legendItem}>
                  <div
                    className={styles.legendColor}
                    style={{ backgroundColor: sector.color }}
                  ></div>
                  <div className={styles.legendInfo}>
                    <span className={styles.legendName}>{sector.name}</span>
                    <span className={styles.legendPercentage}>{sector.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Placements */}
        <section className={styles.chartSection}>
          <div className={styles.placementsHeader}>
            <h2 className={styles.chartTitle}>Recent Placements</h2>
            <button className={styles.viewAllBtn} disabled>View All</button>
          </div>

          <div className={styles.placementsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCol}>STUDENT</div>
              <div className={styles.tableCol}>COMPANY</div>
              <div className={styles.tableCol}>ROLE</div>
            </div>

            {recentPlacements.map((placement) => (
              <div key={placement.id} className={styles.tableRow}>
                <div className={styles.tableCol}>
                  <div className={styles.placementCell}>
                    <div
                      className={styles.placementAvatar}
                      style={{ backgroundColor: placement.avatarColor }}
                    >
                      {placement.initials}
                    </div>
                    <span>{placement.name}</span>
                  </div>
                </div>
                <div className={styles.tableCol}>{placement.company}</div>
                <div className={styles.tableCol}>{placement.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer for fixed nav */}
        <div className={styles.contentSpacer}></div>
      </div>

      {/* Fixed Bottom Navigation */}
      <nav className={styles.fixedNav}>
        <button className={styles.navItem} disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Dashboard</span>
        </button>
        <button className={`${styles.navItem} ${styles.active}`} disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span>Analytics</span>
        </button>
        <button className={styles.navItem} disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>
          <span>Reports</span>
        </button>
        <button className={styles.navItem} disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"></circle>
            <path d="M12 1v6m6.16-1.86l-4.24 4.24m1 6.16l4.24-4.24m-12.32 0l4.24 4.24m-1-6.16l-4.24 4.24"></path>
          </svg>
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
