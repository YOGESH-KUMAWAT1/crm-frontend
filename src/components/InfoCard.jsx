import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListUl, faBell, faClock, faMoneyBill, faCreditCard, faUndo,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/InfoCard.css';

const iconMap = {
  'list-ul': faListUl,
  bell: faBell,
  clock: faClock,
  'money-bill': faMoneyBill,
  'credit-card': faCreditCard,
  undo: faUndo,
};

const InfoCard = ({ title, value, icon, backgroundColor }) => {
  return (
    <div className="info-card" style={{ backgroundColor }}>
      <div className="icon">
        <FontAwesomeIcon icon={iconMap[icon]} size="lg" />
      </div>
      <div className="details">
        <div className="info-title">{title}</div>
        <div className="info-value">{value}</div>
      </div>
    </div>
  );
};

export default InfoCard;
