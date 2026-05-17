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
exports.default = ToastContainer;
exports.useToast = useToast;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const toastIcons = {
    success: lucide_react_1.CheckCircle,
    error: lucide_react_1.XCircle,
    info: lucide_react_1.Info,
    warning: lucide_react_1.AlertTriangle
};
function ToastItem({ toast, onRemove }) {
    const [isExiting, setIsExiting] = (0, react_1.useState)(false);
    const IconComponent = toastIcons[toast.type];
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onRemove(toast.id), 300);
        }, toast.duration || 4000);
        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onRemove]);
    return (react_1.default.createElement("div", { className: `toast toast-${toast.type} ${isExiting ? 'toast-exit' : ''}` },
        react_1.default.createElement("div", { className: "toast-icon" },
            react_1.default.createElement(IconComponent, { size: 20 })),
        react_1.default.createElement("div", { className: "toast-content" },
            react_1.default.createElement("p", null, toast.message)),
        react_1.default.createElement("button", { className: "toast-close", onClick: () => {
                setIsExiting(true);
                setTimeout(() => onRemove(toast.id), 300);
            }, "aria-label": "Close" },
            react_1.default.createElement(lucide_react_1.X, { size: 16 }))));
}
function ToastContainer({ toasts, onRemove }) {
    return (react_1.default.createElement("div", { className: "toast-container" }, toasts.map(toast => (react_1.default.createElement(ToastItem, { key: toast.id, toast: toast, onRemove: onRemove })))));
}
function useToast() {
    const [toasts, setToasts] = (0, react_1.useState)([]);
    const addToast = (type, message, duration) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, type, message, duration }]);
    };
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };
    return {
        toasts,
        addToast,
        removeToast,
        showSuccess: (message, duration) => addToast('success', message, duration),
        showError: (message, duration) => addToast('error', message, duration),
        showInfo: (message, duration) => addToast('info', message, duration),
        showWarning: (message, duration) => addToast('warning', message, duration)
    };
}
//# sourceMappingURL=Toast.js.map