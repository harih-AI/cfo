import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockRisks } from '@/data/mockData';
import { AlertTriangle, Shield, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const severityColors: Record<string, string> = {
  low: 'bg-success/10 text-success',
  medium: 'bg-warning/10 text-warning',
  high: 'bg-destructive/10 text-destructive',
  critical: 'bg-destructive text-destructive-foreground',
};

export default function Risks() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Risk Center</h1>
          <p className="text-sm text-muted-foreground">{mockRisks.filter(r => r.status === 'active').length} active risks</p>
        </div>
        <div className="flex gap-3 text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-destructive/10">
            <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
            <span className="font-medium text-destructive">{mockRisks.filter(r => r.severity === 'high').length} High</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-warning/10">
            <Shield className="h-3.5 w-3.5 text-warning" />
            <span className="font-medium text-warning">{mockRisks.filter(r => r.severity === 'medium').length} Medium</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {mockRisks.map(risk => (
          <Card key={risk.id} className={cn("shadow-sm border-l-4", risk.severity === 'high' ? 'border-l-destructive' : risk.severity === 'medium' ? 'border-l-warning' : 'border-l-success')}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${severityColors[risk.severity]}`}>{risk.severity}</span>
                    <Badge variant="outline" className="text-[10px]">{risk.category}</Badge>
                    <Badge variant={risk.status === 'active' ? 'secondary' : 'outline'} className="text-[10px]">{risk.status}</Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">{risk.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{risk.description}</p>
                  <p className="text-xs text-foreground mt-1"><span className="text-muted-foreground">Impact:</span> {risk.impact}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs shrink-0 ml-4">
                  <Eye className="h-3.5 w-3.5 mr-1" />Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
