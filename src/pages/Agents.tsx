import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { mockAgents, formatCurrency, Agent } from '@/data/mockData';
import { Bot, Zap, Target, RefreshCw, ChevronRight, Activity, CheckCircle2, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  running: 'bg-success',
  completed: 'bg-info',
  idle: 'bg-muted-foreground',
  failed: 'bg-destructive',
};

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">AI Agents</h1>
          <p className="text-sm text-muted-foreground">{mockAgents.length} agents · {mockAgents.filter(a => a.status === 'running').length} active</p>
        </div>
        <Badge variant="outline" className="gap-1.5 w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
          System Online
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockAgents.map(agent => (
          <Card
            key={agent.id}
            className="shadow-sm cursor-pointer hover:border-primary/50 transition-colors group"
            onClick={() => setSelectedAgent(agent)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", statusColors[agent.status], agent.status === 'running' && 'animate-pulse-dot')} />
                  {agent.name}
                </CardTitle>
                <Badge variant="outline" className="text-[10px] group-hover:bg-primary/5 transition-colors">{agent.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5em]">{agent.role}</p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="text-center p-2 rounded-md bg-muted/50 group-hover:bg-muted/80 transition-colors">
                  <Target className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
                  <p className="text-sm font-bold text-foreground">{agent.accuracy}%</p>
                  <p className="text-[10px] text-muted-foreground">Accuracy</p>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/50 group-hover:bg-muted/80 transition-colors">
                  <Zap className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
                  <p className="text-sm font-bold text-foreground">{agent.tasksCompleted}</p>
                  <p className="text-[10px] text-muted-foreground">Tasks</p>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/50 group-hover:bg-muted/80 transition-colors">
                  <Bot className="h-3.5 w-3.5 mx-auto text-primary mb-1" />
                  <p className="text-sm font-bold text-foreground">{formatCurrency(agent.savedAmount)}</p>
                  <p className="text-[10px] text-muted-foreground">Saved</p>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-[11px] text-muted-foreground mb-1">Last Decision</p>
                <div className="flex items-start gap-2">
                  <p className="text-xs text-foreground leading-relaxed flex-1 line-clamp-2 h-[2.5em]">{agent.lastDecision}</p>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 self-center" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={!!selectedAgent} onOpenChange={(open) => !open && setSelectedAgent(null)}>
        <SheetContent className="w-[85vw] sm:w-[540px] overflow-y-auto p-4 sm:p-6">
          <SheetHeader className="pb-6 border-b border-border text-left">
            <div className="flex items-start gap-3 mb-2">
              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary shrink-0 mt-1")}>
                <Bot className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <SheetTitle className="text-lg sm:text-xl leading-tight">{selectedAgent?.name}</SheetTitle>
                <Badge variant={selectedAgent?.status === 'running' ? 'default' : 'secondary'} className="capitalize">
                  {selectedAgent?.status}
                </Badge>
              </div>
            </div>
            <SheetDescription className="text-sm text-foreground/80 leading-relaxed text-left">
              {selectedAgent?.role}
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-lg border bg-card text-center space-y-1">
                <div className="text-lg sm:text-2xl font-bold text-primary">{selectedAgent?.accuracy}%</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">Accuracy</div>
              </div>
              <div className="p-3 sm:p-4 rounded-lg border bg-card text-center space-y-1">
                <div className="text-lg sm:text-2xl font-bold text-primary">{selectedAgent?.tasksCompleted}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">Tasks</div>
              </div>
              <div className="p-3 sm:p-4 rounded-lg border bg-card text-center space-y-1">
                <div className="text-lg sm:text-2xl font-bold text-primary">{selectedAgent ? formatCurrency(selectedAgent.savedAmount) : '₹0'}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">Saved</div>
              </div>
            </div>

            {/* Performance Goals */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Target className="h-4 w-4 text-primary" />
                Performance Goals
              </h3>
              <div className="space-y-3">
                {selectedAgent?.performanceGoals?.map((goal, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/90">{goal}</span>
                  </div>
                ))}
                {!selectedAgent?.performanceGoals?.length && (
                  <div className="text-sm text-muted-foreground italic pl-7">No specific goals defined.</div>
                )}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <ListTodo className="h-4 w-4 text-primary" />
                Core Responsibilities
              </h3>
              <div className="space-y-3">
                {selectedAgent?.responsibilities?.map((task, i) => (
                  <div key={i} className="flex items-start gap-3 pl-2 border-l-2 border-primary/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-sm text-foreground/90">{task}</span>
                  </div>
                ))}
                {!selectedAgent?.responsibilities?.length && (
                  <div className="text-sm text-muted-foreground italic pl-5">No specific responsibilities defined.</div>
                )}
              </div>
            </div>

            {/* Recent Activity / Last Decision */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Activity className="h-4 w-4 text-primary" />
                Recent Activity
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Decision Analysis</span>
                  <span className="text-xs text-muted-foreground">{new Date(selectedAgent?.lastRun || '').toLocaleString()}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed bg-background p-3 rounded border border-border/50 shadow-sm">
                  {selectedAgent?.lastDecision}
                </p>
                <div className="mt-4 flex gap-3">
                  <Button size="sm" variant="outline" className="w-full text-xs">Verify Decision</Button>
                  <Button size="sm" className="w-full text-xs">View Full Log</Button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
