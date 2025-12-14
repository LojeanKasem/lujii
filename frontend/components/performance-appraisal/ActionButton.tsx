import React from 'react';
import { useRouter } from 'next/router';
import styles from './ActionButton.module.css';

interface ActionButtonProps {
  label: string;
  primary: boolean;
  onClick?: () => void;
  href?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, primary, onClick, href }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      // Default behavior - show alert for demo
      alert(`"${label}" clicked! This button needs to be connected to a page or function.`);
    }
  };

  return (
    <button 
      className={`${styles.actionBtn} ${primary ? styles.btnPrimary : styles.btnSecondary}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;