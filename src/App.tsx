import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClubCard from './components/ClubCard';
import PostCard from './components/PostCard';
import FloatingActionButton from './components/FloatingActionButton';
import ToastContainer from './components/Toast';
import { useToast } from './hooks/useToast';

const mockClubs = [
  {
    id: '1',
    name: 'Photography Club',
    description: 'Capture moments, share stories, and explore the art of photography with fellow enthusiasts.',
    members: 324,
    posts: 128,
    category: 'Arts & Creativity',
    tags: ['Photography', 'Visual Arts', 'Creative'],
    isJoined: false
  },
  {
    id: '2',
    name: 'Tech Innovators',
    description: 'Building the future through code, innovation, and collaborative problem-solving.',
    members: 567,
    posts: 89,
    category: 'Technology',
    tags: ['Programming', 'Innovation', 'Startups'],
    isJoined: true
  },
  {
    id: '3',
    name: 'Environmental Action',
    description: 'Making a difference through sustainable practices and environmental awareness.',
    members: 234,
    posts: 56,
    category: 'Environment',
    tags: ['Sustainability', 'Climate', 'Action'],
    isJoined: false
  },
  {
    id: '4',
    name: 'Book Discussion',
    description: 'Dive deep into literature, share insights, and discover your next favorite read.',
    members: 189,
    posts: 145,
    category: 'Literature',
    tags: ['Reading', 'Discussion', 'Literature'],
    isJoined: false
  },
  {
    id: '5',
    name: 'Fitness & Wellness',
    description: 'Supporting each other on our journey to physical and mental well-being.',
    members: 445,
    posts: 203,
    category: 'Health',
    tags: ['Fitness', 'Wellness', 'Health'],
    isJoined: true
  },
  {
    id: '6',
    name: 'Music Creators',
    description: 'Compose, perform, and appreciate music in all its forms and genres.',
    members: 298,
    posts: 167,
    category: 'Music',
    tags: ['Music', 'Performance', 'Creative'],
    isJoined: false
  }
];

const mockPosts = [
  {
    id: '1',
    author: { name: 'Sarah Chen', role: 'Photography Club' },
    content: 'Just captured this amazing sunset from our photography workshop! The golden hour never disappoints. Can\'t wait to share more techniques with everyone at our next meetup.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 8,
    club: 'Photography Club',
    isLiked: false
  },
  {
    id: '2',
    author: { name: 'Marcus Johnson', role: 'Tech Innovators' },
    content: 'Excited to announce our hackathon winners! 🏆 Amazing projects focusing on AI for social good. The innovation happening in our community is incredible.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 67,
    comments: 15,
    club: 'Tech Innovators',
    isLiked: true
  },
  {
    id: '3',
    author: { name: 'Emma Rodriguez', role: 'Environmental Action' },
    content: 'Our campus cleanup event was a huge success! 200+ volunteers, 500 lbs of recycling collected. Small actions, big impact. Thank you to everyone who participated!',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 89,
    comments: 22,
    club: 'Environmental Action',
    isLiked: false
  },
  {
    id: '4',
    author: { name: 'David Kim', role: 'Book Discussion' },
    content: 'Currently reading "The Seven Husbands of Evelyn Hugo" and can\'t put it down! Who else has read this masterpiece? Let\'s discuss at our next meeting.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes: 31,
    comments: 12,
    club: 'Book Discussion',
    isLiked: false
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  
  const { toasts, removeToast, showSuccess, showInfo } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleJoinClub = (clubId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const club = mockClubs.find(c => c.id === clubId);
        if (club?.isJoined) {
          showInfo(`Left ${club.name}`, 2000);
        } else {
          showSuccess(`Successfully joined ${club?.name}!`, 3000);
        }
        resolve(true);
      }, 800);
    });
  };

  const handleLikeClub = (clubId: string) => {
    const club = mockClubs.find(c => c.id === clubId);
    showInfo(`Liked ${club?.name}!`, 1500);
  };

  const handleLikePost = (postId: string) => {
    console.log('Liked post:', postId);
  };

  const handleCommentPost = () => {
    showInfo('Comments coming soon!', 2000);
  };

  const handleNewPost = () => {
    showInfo('New post feature coming soon!', 2500);
  };

  const handleNewClub = () => {
    showInfo('Create club feature coming soon!', 2500);
  };

  const handleNewEvent = () => {
    showInfo('Event planning feature coming soon!', 2500);
  };

  return (
    <div className="app">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)}
        notificationCount={5}
      />
      
      <main className="main-content">
        <Hero />
        
        <section className="content-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Discover Amazing Communities</h2>
              <p className="section-subtitle">
                Join clubs that match your interests and connect with like-minded people
              </p>
            </div>
            
            <div className="clubs-grid">
              {mockClubs.map(club => (
                <ClubCard
                  key={club.id}
                  club={club}
                  onJoin={handleJoinClub}
                  onLike={handleLikeClub}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Latest from the Community</h2>
              <p className="section-subtitle">
                Stay connected with the latest updates and discussions
              </p>
            </div>
            
            <div className="posts-container">
              {mockPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onComment={handleCommentPost}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <FloatingActionButton
        onNewPost={handleNewPost}
        onNewClub={handleNewClub}
        onNewEvent={handleNewEvent}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
