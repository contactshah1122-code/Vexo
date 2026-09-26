import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#d4af37] shrink-0" />,
    error: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/20 bg-[#121614]',
    info: 'border-[#d4af37]/30 bg-[#171512]',
    error: 'border-rose-500/20 bg-[#191113]',
  };

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-6 right-6 z-50 max-w-sm pointer-events-none"
    >
      <div
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-2xl backdrop-blur-md transition-all duration-200 transform translate-y-0 ${borders[toast.type]}`}
      >
        {icons[toast.type]}
        <p className="text-xs text-zinc-200 font-medium leading-relaxed">
          {toast.message}
        </p>
      </div>
    </aside>
  );
};
