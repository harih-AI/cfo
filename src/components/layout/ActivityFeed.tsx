import {
  Bot, CheckCircle, CreditCard, AlertTriangle, Edit3, ShieldAlert, X
} from 'lucide-react';
import { mockActivities } from '@/data/mockData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  agent: Bot,
  approval: CheckCircle,
  payment: CreditCard,
  error: AlertTriangle,
  edit: Edit3,
  risk: ShieldAlert,
};

const colorMap: Record<string, string> = {
  agent: 'text-primary',
  approval: 'text-success',
  payment: 'text-info',
  error: 'text-warning',
  edit: 'text-muted-foreground',
  risk: 'text-destructive',
};

interface ActivityFeedProps {
  onClose?: () => void;
}

export default function ActivityFeed({ onClose }: ActivityFeedProps) {
  return (
    <aside className="w-72 border-l border-border bg-background flex flex-col shrink-0">
      <div className="p-4 border-b border-border flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-foreground">Live Activity</h2>
          <p className="text-[10px] text-muted-foreground mt-0.5">Real-time system updates</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-sm transition-colors -mt-1 -mr-1"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
        {mockActivities.map(activity => {
          const Icon = iconMap[activity.type] || Bot;
          const color = colorMap[activity.type] || 'text-muted-foreground';
          const time = new Date(activity.timestamp);
          const timeStr = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
          const dateStr = `${time.getDate()} Mar`;

          return (
            <div
              key={activity.id}
              className="flex gap-3 p-2.5 rounded-md hover:bg-muted transition-colors animate-fade-in"
            >
              <div className={cn("shrink-0 mt-0.5", color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">{activity.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{activity.description}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{dateStr} · {timeStr}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
