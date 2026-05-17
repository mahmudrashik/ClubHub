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
exports.default = Navbar;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
function Navbar({ darkMode, toggleDarkMode, notificationCount = 0 }) {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const navLinks = [
        { label: 'Clubs', href: '#clubs' },
        { label: 'Posts', href: '#posts' },
        { label: 'Members', href: '#members' },
        { label: 'Events', href: '#events' }
    ];
    return (react_1.default.createElement("nav", { className: "navbar" },
        react_1.default.createElement("div", { className: "nav-container" },
            react_1.default.createElement("div", { className: "nav-left" },
                react_1.default.createElement("div", { className: "logo" },
                    react_1.default.createElement("span", { className: "logo-text" }, "ClubHub"),
                    react_1.default.createElement("div", { className: "logo-accent" }))),
            react_1.default.createElement("div", { className: `nav-center ${isMenuOpen ? 'nav-center-open' : ''}` },
                react_1.default.createElement("div", { className: "search-container" },
                    react_1.default.createElement(lucide_react_1.Search, { className: "search-icon", size: 20 }),
                    react_1.default.createElement("input", { type: "text", placeholder: "Search clubs, posts, members...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" }))),
            react_1.default.createElement("div", { className: "nav-right" },
                react_1.default.createElement("div", { className: `nav-links ${isMenuOpen ? 'nav-links-open' : ''}` }, navLinks.map((link) => (react_1.default.createElement("a", { key: link.label, href: link.href, className: "nav-link" }, link.label)))),
                react_1.default.createElement("div", { className: "nav-actions" },
                    react_1.default.createElement("button", { className: "icon-btn", onClick: toggleDarkMode, "aria-label": "Toggle theme" }, darkMode ? react_1.default.createElement(lucide_react_1.Sun, { size: 20 }) : react_1.default.createElement(lucide_react_1.Moon, { size: 20 })),
                    react_1.default.createElement("button", { className: "icon-btn notification-btn", "aria-label": "Notifications" },
                        react_1.default.createElement(lucide_react_1.Bell, { size: 20 }),
                        notificationCount > 0 && (react_1.default.createElement("span", { className: "notification-badge" }, notificationCount > 99 ? '99+' : notificationCount))),
                    react_1.default.createElement("div", { className: "user-menu" },
                        react_1.default.createElement("div", { className: "user-avatar" }, "JD"))),
                react_1.default.createElement("button", { className: "mobile-menu-btn", onClick: () => setIsMenuOpen(!isMenuOpen), "aria-label": "Toggle menu" }, isMenuOpen ? react_1.default.createElement(lucide_react_1.X, { size: 24 }) : react_1.default.createElement(lucide_react_1.Menu, { size: 24 }))))));
}
//# sourceMappingURL=Navbar.js.map