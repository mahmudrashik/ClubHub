"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hero;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
function Hero() {
    const stats = [
        { icon: lucide_react_1.Users, label: 'Active Members', value: '2,847' },
        { icon: lucide_react_1.MessageSquare, label: 'Posts Today', value: '156' },
        { icon: lucide_react_1.Calendar, label: 'Upcoming Events', value: '23' }
    ];
    return (react_1.default.createElement("section", { className: "hero-section" },
        react_1.default.createElement("div", { className: "hero-background" },
            react_1.default.createElement("div", { className: "hero-gradient" }),
            react_1.default.createElement("div", { className: "hero-pattern" })),
        react_1.default.createElement("div", { className: "hero-content" },
            react_1.default.createElement("div", { className: "hero-text" },
                react_1.default.createElement("h1", { className: "hero-title" },
                    "Connect. Share. Grow.",
                    react_1.default.createElement("span", { className: "hero-accent" }, "Together.")),
                react_1.default.createElement("p", { className: "hero-subtitle" }, "Join thousands of students building meaningful connections through clubs, events, and shared interests. Your community awaits."),
                react_1.default.createElement("div", { className: "hero-buttons" },
                    react_1.default.createElement("button", { className: "btn btn-primary" },
                        react_1.default.createElement("span", null, "Explore Clubs"),
                        react_1.default.createElement(lucide_react_1.ArrowRight, { size: 20 })),
                    react_1.default.createElement("button", { className: "btn btn-secondary" }, "Join Community"))),
            react_1.default.createElement("div", { className: "hero-stats" }, stats.map((stat) => {
                const IconComponent = stat.icon;
                return (react_1.default.createElement("div", { key: stat.label, className: "stat-card" },
                    react_1.default.createElement("div", { className: "stat-icon" },
                        react_1.default.createElement(IconComponent, { size: 24 })),
                    react_1.default.createElement("div", { className: "stat-content" },
                        react_1.default.createElement("div", { className: "stat-value" }, stat.value),
                        react_1.default.createElement("div", { className: "stat-label" }, stat.label))));
            })))));
}
//# sourceMappingURL=Hero.js.map