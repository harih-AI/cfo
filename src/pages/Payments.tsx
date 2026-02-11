import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPayments, formatFullCurrency, Payment } from '@/data/mockData';
import { useCRUD } from '@/hooks/useLocalStorage';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function Payments() {
  const { items } = useCRUD<Payment>('dairy_payments', mockPayments);

  const totalReceived = useMemo(() => items.filter(p => p.type === 'received').reduce((s, p) => s + p.amount, 0), [items]);
  const totalMade = useMemo(() => items.filter(p => p.type === 'made').reduce((s, p) => s + p.amount, 0), [items]);

  return (
    <div className="p-6 space-y-4">
      <div><h1 className="text-2xl font-semibold text-foreground">Payments</h1><p className="text-sm text-muted-foreground">{items.length} transactions</p></div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-sm"><CardContent className="pt-4 pb-3"><p className="text-xs text-muted-foreground">Total Received</p><p className="text-lg font-bold text-success">{formatFullCurrency(totalReceived)}</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 pb-3"><p className="text-xs text-muted-foreground">Total Paid</p><p className="text-lg font-bold text-destructive">{formatFullCurrency(totalMade)}</p></CardContent></Card>
      </div>

      <Card className="shadow-sm"><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Party</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Method</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Reference</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
          </tr></thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-3 text-muted-foreground">{p.date}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5">
                    {p.type === 'received' ? <ArrowDownLeft className="h-3.5 w-3.5 text-success" /> : <ArrowUpRight className="h-3.5 w-3.5 text-destructive" />}
                    <span className="text-foreground capitalize">{p.type}</span>
                  </div>
                </td>
                <td className="p-3 text-foreground">{p.party}</td>
                <td className="p-3 text-muted-foreground">{p.method}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{p.reference}</td>
                <td className={`p-3 text-right font-medium ${p.type === 'received' ? 'text-success' : 'text-destructive'}`}>{p.type === 'received' ? '+' : '-'}{formatFullCurrency(p.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}
