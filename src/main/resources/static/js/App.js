"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Navbar_1 = __importDefault(require("./components/Navbar"));
const Hero_1 = __importDefault(require("./components/Hero"));
const ClubCard_1 = __importDefault(require("./components/ClubCard"));
const PostCard_1 = __importDefault(require("./components/PostCard"));
const FloatingActionButton_1 = __importDefault(require("./components/FloatingActionButton"));
const Toast_1 = __importStar(require("./components/Toast"));
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
    const [darkMode, setDarkMode] = (0, react_1.useState)(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });
    const { toasts, removeToast, showSuccess, showInfo, showError } = (0, Toast_1.useToast)();
    const [currentView, setCurrentView] = (0, react_1.useState)('home');
    (0, react_1.useEffect)(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);
    const handleJoinClub = (clubId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const club = mockClubs.find(c => c.id === clubId);
                if (club?.isJoined) {
                    showInfo(`Left ${club.name}`, 2000);
                }
                else {
                    showSuccess(`Successfully joined ${club?.name}!`, 3000);
                }
                resolve(true);
            }, 800);
        });
    };
    const handleLikeClub = (clubId) => {
        const club = mockClubs.find(c => c.id === clubId);
        showInfo(`Liked ${club?.name}!`, 1500);
    };
    const handleLikePost = (postId) => {
        console.log('Liked post:', postId);
    };
    const handleCommentPost = (postId) => {
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
    return (react_1.default.createElement("div", { className: "app" },
        react_1.default.createElement(Navbar_1.default, { darkMode: darkMode, toggleDarkMode: () => setDarkMode(!darkMode), notificationCount: 5 }),
        react_1.default.createElement("main", { className: "main-content" },
            react_1.default.createElement(Hero_1.default, null),
            react_1.default.createElement("section", { className: "content-section" },
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement("div", { className: "section-header" },
                        react_1.default.createElement("h2", { className: "section-title" }, "Discover Amazing Communities"),
                        react_1.default.createElement("p", { className: "section-subtitle" }, "Join clubs that match your interests and connect with like-minded people")),
                    react_1.default.createElement("div", { className: "clubs-grid" }, mockClubs.map(club => (react_1.default.createElement(ClubCard_1.default, { key: club.id, club: club, onJoin: handleJoinClub, onLike: handleLikeClub })))))),
            react_1.default.createElement("section", { className: "content-section" },
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement("div", { className: "section-header" },
                        react_1.default.createElement("h2", { className: "section-title" }, "Latest from the Community"),
                        react_1.default.createElement("p", { className: "section-subtitle" }, "Stay connected with the latest updates and discussions")),
                    react_1.default.createElement("div", { className: "posts-container" }, mockPosts.map(post => (react_1.default.createElement(PostCard_1.default, { key: post.id, post: post, onLike: handleLikePost, onComment: handleCommentPost }))))))),
        react_1.default.createElement(FloatingActionButton_1.default, { onNewPost: handleNewPost, onNewClub: handleNewClub, onNewEvent: handleNewEvent }),
        react_1.default.createElement(Toast_1.default, { toasts: toasts, onRemove: removeToast })));
}
exports.default = App;
//# sourceMappingURL=App.js.map