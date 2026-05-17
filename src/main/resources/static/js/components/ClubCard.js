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
exports.default = ClubCard;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
function ClubCard({ club, onJoin, onLike }) {
    const [isJoined, setIsJoined] = (0, react_1.useState)(club.isJoined || false);
    const [isLiked, setIsLiked] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleJoin = async () => {
        setIsLoading(true);
        try {
            await onJoin(club.id);
            setIsJoined(!isJoined);
        }
        catch (error) {
            console.error('Error joining club:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleLike = () => {
        setIsLiked(!isLiked);
        onLike(club.id);
    };
    const getAvatarInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };
    return (react_1.default.createElement("div", { className: "club-card" },
        react_1.default.createElement("div", { className: "club-card-header" },
            react_1.default.createElement("div", { className: "club-avatar" }, club.avatar ? (react_1.default.createElement("img", { src: club.avatar, alt: club.name })) : (react_1.default.createElement("span", { className: "avatar-initials" }, getAvatarInitials(club.name)))),
            react_1.default.createElement("div", { className: "club-info" },
                react_1.default.createElement("h3", { className: "club-name" }, club.name),
                react_1.default.createElement("div", { className: "club-category" }, club.category)),
            react_1.default.createElement("button", { className: `like-btn ${isLiked ? 'liked' : ''}`, onClick: handleLike, "aria-label": "Like club" },
                react_1.default.createElement(lucide_react_1.Heart, { size: 18, fill: isLiked ? 'currentColor' : 'none' }))),
        react_1.default.createElement("p", { className: "club-description" }, club.description),
        react_1.default.createElement("div", { className: "club-stats" },
            react_1.default.createElement("div", { className: "stat" },
                react_1.default.createElement(lucide_react_1.Users, { size: 16 }),
                react_1.default.createElement("span", null,
                    club.members.toLocaleString(),
                    " members")),
            react_1.default.createElement("div", { className: "stat" },
                react_1.default.createElement(lucide_react_1.MessageSquare, { size: 16 }),
                react_1.default.createElement("span", null,
                    club.posts,
                    " posts")),
            react_1.default.createElement("div", { className: "stat" },
                react_1.default.createElement(lucide_react_1.Calendar, { size: 16 }),
                react_1.default.createElement("span", null, "Active"))),
        react_1.default.createElement("div", { className: "club-tags" }, club.tags.map((tag) => (react_1.default.createElement("span", { key: tag, className: "tag" }, tag)))),
        react_1.default.createElement("div", { className: "club-actions" },
            react_1.default.createElement("button", { className: `btn btn-primary ${isJoined ? 'btn-joined' : ''}`, onClick: handleJoin, disabled: isLoading }, isLoading ? (react_1.default.createElement("span", { className: "loading" }, "...")) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", null, isJoined ? 'Joined' : 'Join Club'),
                !isJoined && react_1.default.createElement(lucide_react_1.ExternalLink, { size: 16 })))),
            react_1.default.createElement("button", { className: "btn btn-secondary" },
                react_1.default.createElement(lucide_react_1.Share2, { size: 16 }),
                react_1.default.createElement("span", null, "Share")))));
}
//# sourceMappingURL=ClubCard.js.map