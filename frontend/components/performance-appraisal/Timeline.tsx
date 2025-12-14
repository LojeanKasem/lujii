import React from 'react';
import styles from './Timeline.module.css';

interface TimelineProps {
  items: string[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className={styles.timeline}>
      {items.map((item, index) => (
        <div key={index} className={styles.timelineItem}>
          <strong>Step {index + 1}:</strong> {item}
        </div>
      ))}
    </div>
  );
};

export default Timeline;