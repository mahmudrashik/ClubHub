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
exports.default = FloatingActionButton;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
function FloatingActionButton({ onNewPost, onNewClub, onNewEvent }) {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const actions = [
        { icon: lucide_react_1.Edit3, label: 'New Post', action: onNewPost },
        { icon: lucide_react_1.Users, label: 'Create Club', action: onNewClub },
        { icon: lucide_react_1.Calendar, label: 'Plan Event', action: onNewEvent }
    ];
    const handleActionClick = (action) => {
        action();
        setIsOpen(false);
    };
    return (react_1.default.createElement("div", { className: `fab-container ${isOpen ? 'fab-open' : ''}` },
        react_1.default.createElement("div", { className: "fab-backdrop", onClick: () => setIsOpen(false) }),
        react_1.default.createElement("div", { className: "fab-actions" }, actions.map((action, index) => {
            const IconComponent = action.icon;
            return (react_1.default.createElement("button", { key: action.label, className: "fab-action", onClick: () => handleActionClick(action.action), style: { '--delay': `${index * 0.1}s` }, "aria-label": action.label },
                react_1.default.createElement(IconComponent, { size: 20 }),
                react_1.default.createElement("span", { className: "fab-tooltip" }, action.label)));
        })),
        react_1.default.createElement("button", { className: `fab-main ${isOpen ? 'fab-main-open' : ''}`, onClick: () => setIsOpen(!isOpen), "aria-label": "Open actions" },
            react_1.default.createElement(lucide_react_1.Plus, { size: 24, className: `plus-icon ${isOpen ? 'plus-rotated' : ''}` }))));
}
//# sourceMappingURL=FloationActionButton.js.map