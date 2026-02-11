import { Card } from '@/components/ui/card';
import { mockAuditLog } from '@/data/mockData';
import { Bot, User, Search, Filter, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AuditLog() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Audit Log</h1>
          <p className="text-sm text-muted-foreground">Comprehensive system activity trail</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search logs..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2 shrink-0">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" className="gap-2 shrink-0">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <Card className="border-border/60 shadow-sm overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[800px]">
            <thead className="bg-muted/40 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-6 py-3 w-[160px]">Timestamp</th>
                <th className="px-6 py-3 w-[200px]">Actor</th>
                <th className="px-6 py-3">Activity</th>
                <th className="px-6 py-3 text-right w-[220px]">Changes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockAuditLog.map((entry) => {
                const time = new Date(entry.timestamp);
                const formattedDate = time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });

                // Format ID: risk_1 -> RISK-001
                const [entPrefix, entId] = entry.entityId.split('_');
                const displayId = `${entPrefix.toUpperCase()}-${entId.padStart(3, '0')}`;

                return (
                  <tr key={entry.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground tabular-nums">{formattedDate}</span>
                        <span className="text-xs text-muted-foreground tabular-nums opacity-80">{formattedTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-8 w-8 rounded flex items-center justify-center shrink-0 border shadow-sm",
                          entry.actorType === 'ai'
                            ? "bg-primary/5 border-primary/20 text-primary"
                            : "bg-background border-border text-muted-foreground"
                        )}>
                          {entry.actorType === 'ai'
                            ? <Bot className="h-4 w-4" />
                            : <User className="h-4 w-4" />
                          }
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">{entry.actor}</span>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                            {entry.actorType}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-1.5 max-w-2xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-foreground">{entry.action}</span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border uppercase tracking-wide font-mono">
                            {displayId}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {entry.reason}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right align-top">
                      <div className="flex flex-col items-end gap-2">
                        {entry.amount && (
                          <span className="font-mono text-sm font-medium text-foreground">
                            ₹{entry.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        )}

                        {(entry.before || entry.after) && (
                          <div className="flex flex-col items-end gap-1">
                            {entry.before && (
                              <span className={cn("text-xs font-mono text-muted-foreground/60 line-through decoration-muted-foreground/30",
                                entry.before.includes('Start') && "no-underline decoration-transparent"
                              )}>
                                {entry.before.replace('Start: ', '')}
                              </span>
                            )}
                            {entry.after && (
                              <span className="text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-foreground w-fit">
                                {entry.after}
                              </span>
                            )}
                          </div>
                        )}
                        {!entry.amount && !entry.before && !entry.after && (
                          <span className="text-muted-foreground/20 text-sm font-mono">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
