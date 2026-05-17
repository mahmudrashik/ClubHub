import React from 'react';
import { ArrowRight, Users, MessageSquare, Calendar } from 'lucide-react';

export default function Hero() {
  const stats = [
    { icon: Users, label: 'Active Members', value: '2,847' },
    { icon: MessageSquare, label: 'Posts Today', value: '156' },
    { icon: Calendar, label: 'Upcoming Events', value: '23' }
  ];

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Connect. Share. Grow.
            <span className="hero-accent">Together.</span>
          </h1>
          <p className="hero-subtitle">
            Join thousands of students building meaningful connections through clubs, 
            events, and shared interests. Your community awaits.
          </p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary">
              <span>Explore Clubs</span>
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary">
              Join Community
            </button>
          </div>
        </div>

        <div className="hero-stats">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="stat-card">
                <div className="stat-icon">
                  <IconComponent size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}