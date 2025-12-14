import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './PerformanceAppraisal.module.css';
import performanceService from '../../api/performance.service';

const PerformanceAppraisal: React.FC = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    activeAppraisals: 0,
    pendingReviews: 0,
    completedThisCycle: 0,
    avgRating: 0,
    pendingDisputes: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);
      setError(null);
      const data = await performanceService.getStats();
      
      setStats({
        activeAppraisals: data.active_appraisals || 0,
        pendingReviews: data.pending_reviews || 0,
        completedThisCycle: data.completed || 0,
        avgRating: data.avg_rating || 0,
        pendingDisputes: data.pending_disputes || 0
      });
    } catch (err: any) {
      console.error('Error loading stats:', err);
      setError('Failed to load statistics from backend');
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    { 
      title: 'Create Appraisal Template', 
      description: 'Define rating scales and evaluation criteria',
      icon: '📝',
      route: '/hr/create-template'
    },
    { 
      title: 'Start New Evaluation',
      description: 'Evaluate employee performance',
      icon: '⭐',
      route: '/manager/start-evaluation'
    },
    { 
      title: 'View My Appraisal',
      description: 'Check your performance review',
      icon: '👤',
      route: '/employee/my-appraisals'
    },
    { 
      title: 'Review Disputes',
      description: 'Manage evaluation appeals',
      icon: '⚖️',
      route: '/hr/review-disputes'
    },
    {
      title: 'Generate Reports',
      description: 'Analytics and performance trends',
      icon: '📊',
      route: '/hr/reports'
    },
    {
      title: 'Manage Cycles',
      description: 'Set up appraisal periods',
      icon: '🔄',
      route: '/hr/manage-cycles'
    }
  ];

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>Loading statistics...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Performance Appraisal Management</h1>
        <p>Manage employee evaluations, reviews, and performance tracking</p>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '16px',
          marginBottom: '24px',
          background: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          color: '#c00'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statContent}>
            <h3>{stats.activeAppraisals}</h3>
            <p>Active Appraisals</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statContent}>
            <h3>{stats.pendingReviews}</h3>
            <p>Pending Reviews</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <h3>{stats.completedThisCycle}</h3>
            <p>Completed This Cycle</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statContent}>
            <h3>{stats.avgRating > 0 ? stats.avgRating.toFixed(1) : 'N/A'}</h3>
            <p>Average Rating</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⚠️</div>
          <div className={styles.statContent}>
            <h3>{stats.pendingDisputes}</h3>
            <p>Pending Disputes</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className={styles.actionCard}
              onClick={() => router.push(action.route)}
            >
              <div className={styles.actionIcon}>{action.icon}</div>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.section}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>✅</div>
            <div className={styles.activityContent}>
              <h4>Annual review completed</h4>
              <p>John Doe - Engineering Department</p>
              <span>2 hours ago</span>
            </div>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>📝</div>
            <div className={styles.activityContent}>
              <h4>New template created</h4>
              <p>Q4 2024 Performance Review Template</p>
              <span>5 hours ago</span>
            </div>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>⚖️</div>
            <div className={styles.activityContent}>
              <h4>Dispute submitted</h4>
              <p>Jane Smith - Marketing Department</p>
              <span>1 day ago</span>
            </div>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>🔄</div>
            <div className={styles.activityContent}>
              <h4>Appraisal cycle started</h4>
              <p>Q1 2025 Performance Reviews</p>
              <span>3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Overview */}
      <div className={styles.section}>
        <h2>Appraisal Process</h2>
        <div className={styles.processFlow}>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>1</div>
            <h3>Setup</h3>
            <p>Create templates, define cycles, and assign reviewers</p>
          </div>

          <div className={styles.processArrow}>→</div>

          <div className={styles.processStep}>
            <div className={styles.stepNumber}>2</div>
            <h3>Evaluation</h3>
            <p>Managers review and rate employee performance</p>
          </div>

          <div className={styles.processArrow}>→</div>

          <div className={styles.processStep}>
            <div className={styles.stepNumber}>3</div>
            <h3>Feedback</h3>
            <p>Employees review and acknowledge appraisals</p>
          </div>

          <div className={styles.processArrow}>→</div>

          <div className={styles.processStep}>
            <div className={styles.stepNumber}>4</div>
            <h3>Resolution</h3>
            <p>Handle disputes and finalize ratings</p>
          </div>

          <div className={styles.processArrow}>→</div>

          <div className={styles.processStep}>
            <div className={styles.stepNumber}>5</div>
            <h3>Archive</h3>
            <p>Store records and generate analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAppraisal;