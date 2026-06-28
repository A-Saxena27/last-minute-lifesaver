import React from 'react';

const DelayPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pr-12 pt-12 scan-effect relative">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-md text-headline-md text-error uppercase tracking-widest">Path of Delay</h3>
          <p className="font-label-mono text-label-mono text-on-surface-variant mt-1">Reactive Inertia Model v4.2</p>
        </div>
        <div className="text-right">
          <span className="font-display-lg text-[48px] font-bold text-error leading-none">32%</span>
          <p className="font-label-mono text-[10px] text-error/60 tracking-widest">STABILITY SCORE</p>
        </div>
      </div>
    </div>
  );
};

export default DelayPanel;
