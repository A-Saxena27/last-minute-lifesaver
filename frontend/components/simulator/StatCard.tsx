import type { FC } from 'react';

interface StatCardProps {
  title: string;
  description: string;
  color?: string;
  icon?: string;
  statusLabel?: string;
  progress?: number;
}

const StatCard: FC<StatCardProps> = ({
  title,
  description,
  color = 'primary',
  icon = 'rocket_launch',
  statusLabel = 'OPTIMIZED',
  progress = 100,
}) => {
  return (
    <div className="glass-panel glow-border-primary p-6 rounded-lg relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <span className="material-symbols-outlined text-primary text-[32px]">{icon}</span>
        <span className="font-label-mono text-primary text-[10px] bg-primary/10 px-2 py-1 rounded">
          {statusLabel}
        </span>
      </div>
      <h4 className="font-headline-md text-[18px] text-on-surface mb-2">{title}</h4>
      <p className="text-on-surface-variant text-sm">{description}</p>
      <div className="mt-4 h-1 bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className="h-full bg-primary shadow-[0_0_8px_rgba(173,198,255,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;
