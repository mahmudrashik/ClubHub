import React, { useState } from 'react';
import { Plus, Edit3, Users, Calendar } from 'lucide-react';

interface FloatingActionButtonProps {
  onNewPost: () => void;
  onNewClub: () => void;
  onNewEvent: () => void;
}

export default function FloatingActionButton({ onNewPost, onNewClub, onNewEvent }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Edit3, label: 'New Post', action: onNewPost },
    { icon: Users, label: 'Create Club', action: onNewClub },
    { icon: Calendar, label: 'Plan Event', action: onNewEvent }
  ];

  const handleActionClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className={`fab-container ${isOpen ? 'fab-open' : ''}`}>
      <div className="fab-backdrop" onClick={() => setIsOpen(false)} />
      
      <div className="fab-actions">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.label}
              className="fab-action"
              onClick={() => handleActionClick(action.action)}
              style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              aria-label={action.label}
            >
              <IconComponent size={20} />
              <span className="fab-tooltip">{action.label}</span>
            </button>
          );
        })}
      </div>

      <button 
        className={`fab-main ${isOpen ? 'fab-main-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open actions"
      >
        <Plus size={24} className={`plus-icon ${isOpen ? 'plus-rotated' : ''}`} />
      </button>
    </div>
  );
}