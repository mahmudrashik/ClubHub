import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, Heart, Share2, ExternalLink } from 'lucide-react';

interface Club {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  category: string;
  avatar?: string;
  tags: string[];
  isJoined?: boolean;
}

interface ClubCardProps {
  club: Club;
  onJoin: (clubId: string) => void;
  onLike: (clubId: string) => void;
}

export default function ClubCard({ club, onJoin, onLike }: ClubCardProps) {
  const [isJoined, setIsJoined] = useState(club.isJoined || false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async () => {
    setIsLoading(true);
    try {
      await onJoin(club.id);
      setIsJoined(!isJoined);
    } catch (error) {
      console.error('Error joining club:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(club.id);
  };

  const getAvatarInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="club-card">
      <div className="club-card-header">
        <div className="club-avatar">
          {club.avatar ? (
            <img src={club.avatar} alt={club.name} />
          ) : (
            <span className="avatar-initials">
              {getAvatarInitials(club.name)}
            </span>
          )}
        </div>
        
        <div className="club-info">
          <h3 className="club-name">{club.name}</h3>
          <div className="club-category">{club.category}</div>
        </div>

        <button 
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label="Like club"
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <p className="club-description">{club.description}</p>

      <div className="club-stats">
        <div className="stat">
          <Users size={16} />
          <span>{club.members.toLocaleString()} members</span>
        </div>
        <div className="stat">
          <MessageSquare size={16} />
          <span>{club.posts} posts</span>
        </div>
        <div className="stat">
          <Calendar size={16} />
          <span>Active</span>
        </div>
      </div>

      <div className="club-tags">
        {club.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="club-actions">
        <button 
          className={`btn btn-primary ${isJoined ? 'btn-joined' : ''}`}
          onClick={handleJoin}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading">...</span>
          ) : (
            <>
              <span>{isJoined ? 'Joined' : 'Join Club'}</span>
              {!isJoined && <ExternalLink size={16} />}
            </>
          )}
        </button>
        
        <button className="btn btn-secondary">
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}