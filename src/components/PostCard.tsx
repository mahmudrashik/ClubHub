import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Clock } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  club?: string;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike(post.id);
  };

  const getAvatarInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            {post.author.avatar ? (
              <img src={post.author.avatar} alt={post.author.name} />
            ) : (
              <span className="avatar-initials">
                {getAvatarInitials(post.author.name)}
              </span>
            )}
          </div>
          <div className="author-info">
            <div className="author-name">{post.author.name}</div>
            <div className="post-meta">
              {post.club && <span className="club-name">{post.club}</span>}
              <span className="post-time">
                <Clock size={12} />
                {formatTimestamp(post.timestamp)}
              </span>
            </div>
          </div>
        </div>
        
        <button className="more-btn" aria-label="More options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{likeCount}</span>
        </button>

        <button className="action-btn" onClick={() => onComment(post.id)}>
          <MessageCircle size={18} />
          <span>{post.comments}</span>
        </button>

        <button className="action-btn">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}