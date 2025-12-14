import React from 'react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  label: string;
  value: number | string;
  status?: 'active' | 'pending' | 'completed';
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, status }) => {
  const getStatusLabel = () => {
    switch (status) {
      case 'active':
        return 'In Progress';
      case 'pending':
        return 'Awaiting';
      case 'completed':
        return 'Done';
      default:
        return null;
    }
  };

  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
      {status && (
        <div className={`${styles.statusBadge} ${styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}>
          {getStatusLabel()}
        </div>
      )}
    </div>
  );
};

export default StatsCard;