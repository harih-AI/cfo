import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockApprovals, formatFullCurrency } from '@/data/mockData';
import { CheckCircle, XCircle, Clock, Undo2 } from 'lucide-react';
import { useCRUD } from '@/hooks/useLocalStorage';
import { Approval } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
};

export default function Approvals() {
  const { items, update } = useCRUD<Approval>('dairy_approvals', mockApprovals);
  const { toast } = useToast();

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    update(id, { status: action });
    toast({ title: action === 'approved' ? 'Approved ✓' : 'Rejected ✗' });
  };

  const pending = items.filter(a => a.status === 'pending');
  const resolved = items.filter(a => a.status !== 'pending');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Approvals</h1>
        <p className="text-sm text-muted-foreground">{pending.length} pending · {resolved.length} resolved</p>
      </div>

      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2"><Clock className="h-4 w-4 text-warning" />Pending Approval</h2>
          {pending.map(appr => (
            <Card key={appr.id} className="shadow-sm border-l-4 border-l-warning">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-[10px]">{appr.type}</Badge>
                      <Badge variant="outline" className="text-[10px]">{appr.approver}</Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground">{appr.description}</p>
                    {appr.amount > 0 && <p className="text-sm font-bold text-primary mt-1">{formatFullCurrency(appr.amount)}</p>}
                    <p className="text-[11px] text-muted-foreground mt-1">Requested by: {appr.requester}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" className="text-xs" onClick={() => handleAction(appr.id, 'approved')}>
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs text-destructive" onClick={() => handleAction(appr.id, 'rejected')}>
                      <XCircle className="h-3.5 w-3.5 mr-1" />Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">History</h2>
        {resolved.map(appr => (
          <Card key={appr.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[10px]">{appr.type}</Badge>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[appr.status]}`}>{appr.status}</span>
                  </div>
                  <p className="text-sm text-foreground">{appr.description}</p>
                  {appr.amount > 0 && <p className="text-xs text-muted-foreground mt-0.5">{formatFullCurrency(appr.amount)}</p>}
                </div>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => { update(appr.id, { status: 'pending' }); toast({ title: 'Reverted to pending' }); }}>
                  <Undo2 className="h-3.5 w-3.5 mr-1" />Undo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
