import React from 'react';
import styles from './PhaseCard.module.css';
import RoleSection from './RoleSection';
import Timeline from './Timeline';
import ActionButton from './ActionButton';

interface RoleItem {
  title: string;
  items: string[];
}

interface Action {
  label: string;
  primary: boolean;
}

interface PhaseCardProps {
  phase: {
    id: number;
    number: string;
    title: string;
    description: string;
    roles: RoleItem[];
    timeline?: string[];
    actions: Action[];
    status: string;
  };
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase }) => {
  // Map button labels to routes or actions
  const getButtonAction = (label: string) => {
    const routeMap: { [key: string]: string } = {
      // Phase 1 buttons
      'Create Template': '/hr/create-template',
      'Manage Cycles': '/hr/manage-cycles',
      'Configure Structure': '/hr/configure-structure',
      
      // Phase 2 buttons
      'Start Evaluation': '/manager/start-evaluation',
      'View Dashboard': '/hr/dashboard',
      
      // Phase 3 buttons
      'View My Appraisal': '/employee-profile',
      'Acknowledge Receipt': '/employee/acknowledge',
      'View History': '/employee/history',
      
      // Phase 4 buttons
      'Submit Dispute': '/employee/submit-dispute',
      'Review Cases': '/hr/review-cases',
      'Track Status': '/employee/track-status',
      
      // Phase 5 buttons
      'Generate Report': '/hr/generate-report',
      'View Analytics': '/hr/analytics',
      'Export Data': '/hr/export-data',
    };

    return routeMap[label];
  };

  const handleActionClick = (action: Action) => {
    const route = getButtonAction(action.label);
    
    if (!route) {
      // If no route is mapped, show a message
      console.log(`Action clicked: ${action.label} for ${phase.title}`);
      alert(`"${action.label}" clicked!\n\nThis would navigate to the ${action.label} page.\nRoute needs to be created.`);
    }
  };

  return (
    <div className={styles.phaseCard} style={{ animationDelay: `${phase.id * 0.1}s` }}>
      <div className={styles.phaseHeader}>
        <div className={styles.phaseNumber}>{phase.number}</div>
        <h2 className={styles.phaseTitle}>{phase.title}</h2>
        <p className={styles.phaseDescription}>{phase.description}</p>
      </div>

      <div className={styles.phaseContent}>
        {phase.roles.map((role, index) => (
          <RoleSection key={index} role={role} />
        ))}

        {phase.timeline && (
          <Timeline items={phase.timeline} />
        )}

        <div className={styles.actionButtons}>
          {phase.actions.map((action, index) => {
            const route = getButtonAction(action.label);
            return (
              <ActionButton
                key={index}
                label={action.label}
                primary={action.primary}
                href={route}
                onClick={route ? undefined : () => handleActionClick(action)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;