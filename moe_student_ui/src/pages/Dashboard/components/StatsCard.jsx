import React from 'react';
import { Card } from 'antd';
import styles from '../Dashboard.module.scss';

const StatsCard = ({ 
  title, 
  value, 
  subText, 
  icon, 
  variant = 'default', 
  iconColorClass, 
  valueColorClass, 
  children 
}) => {
  // Xác định class cho Card dựa trên variant
  const cardClassName = variant === 'action' 
    ? `${styles.statCard} ${styles.actionCard}` 
    : styles.statCard;


  const textStyle = variant === 'action' ? { color: '#d46b08' } : {};

  return (
    <Card className={cardClassName} variant='borderless'>
      <div className={styles.cardContent}>
        <div className={styles.infoBox}>
          <span className={styles.label} style={textStyle}>
            {title}
          </span>
          <span 
            className={`${styles.value} ${valueColorClass || ''}`} 
            style={textStyle}
          >
            {value}
          </span>
          <span 
            className={styles.subText}
            style={textStyle}
          >
            {subText}
          </span>
        </div>
        <div className={`${styles.iconBox} ${iconColorClass}`}>
          {icon}
        </div>
      </div>
      {children} 
    </Card>
  );
};

export default StatsCard;