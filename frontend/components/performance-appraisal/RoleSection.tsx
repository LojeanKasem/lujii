import React from 'react';
import styles from './RoleSection.module.css';

interface RoleSectionProps {
  role: {
    title: string;
    items: string[];
  };
}

const RoleSection: React.FC<RoleSectionProps> = ({ role }) => {
  return (
    <div className={styles.roleSection}>
      <h3 className={styles.roleTitle}>{role.title}</h3>
      <div className={styles.roleContent}>
        <ul>
          {role.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoleSection;