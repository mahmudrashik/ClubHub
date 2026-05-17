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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PostCard;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
function PostCard({ post, onLike, onComment }) {
    const [isLiked, setIsLiked] = (0, react_1.useState)(post.isLiked || false);
    const [likeCount, setLikeCount] = (0, react_1.useState)(post.likes);
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        onLike(post.id);
    };
    const getAvatarInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        if (diffInHours < 1)
            return 'Just now';
        if (diffInHours < 24)
            return `${diffInHours}h ago`;
        if (diffInHours < 168)
            return `${Math.floor(diffInHours / 24)}d ago`;
        return date.toLocaleDateString();
    };
    return (react_1.default.createElement("div", { className: "post-card" },
        react_1.default.createElement("div", { className: "post-header" },
            react_1.default.createElement("div", { className: "post-author" },
                react_1.default.createElement("div", { className: "author-avatar" }, post.author.avatar ? (react_1.default.createElement("img", { src: post.author.avatar, alt: post.author.name })) : (react_1.default.createElement("span", { className: "avatar-initials" }, getAvatarInitials(post.author.name)))),
                react_1.default.createElement("div", { className: "author-info" },
                    react_1.default.createElement("div", { className: "author-name" }, post.author.name),
                    react_1.default.createElement("div", { className: "post-meta" },
                        post.club && react_1.default.createElement("span", { className: "club-name" }, post.club),
                        react_1.default.createElement("span", { className: "post-time" },
                            react_1.default.createElement(lucide_react_1.Clock, { size: 12 }),
                            formatTimestamp(post.timestamp))))),
            react_1.default.createElement("button", { className: "more-btn", "aria-label": "More options" },
                react_1.default.createElement(lucide_react_1.MoreHorizontal, { size: 20 }))),
        react_1.default.createElement("div", { className: "post-content" },
            react_1.default.createElement("p", null, post.content)),
        react_1.default.createElement("div", { className: "post-actions" },
            react_1.default.createElement("button", { className: `action-btn like-btn ${isLiked ? 'liked' : ''}`, onClick: handleLike },
                react_1.default.createElement(lucide_react_1.Heart, { size: 18, fill: isLiked ? 'currentColor' : 'none' }),
                react_1.default.createElement("span", null, likeCount)),
            react_1.default.createElement("button", { className: "action-btn", onClick: () => onComment(post.id) },
                react_1.default.createElement(lucide_react_1.MessageCircle, { size: 18 }),
                react_1.default.createElement("span", null, post.comments)),
            react_1.default.createElement("button", { className: "action-btn" },
                react_1.default.createElement(lucide_react_1.Share2, { size: 18 }),
                react_1.default.createElement("span", null, "Share")))));
}
//# sourceMappingURL=PostCard.js.map