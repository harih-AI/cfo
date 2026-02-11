import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockBudgets, formatFullCurrency, Budget } from '@/data/mockData';
import { useCRUD } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

export default function Budgets() {
  const { items } = useCRUD<Budget>('dairy_budgets', mockBudgets);

  return (
    <div className="p-6 space-y-4">
      <div><h1 className="text-2xl font-semibold text-foreground">Budgets</h1><p className="text-sm text-muted-foreground">March 2024</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(b => {
          const pct = Math.round((b.spent / b.allocated) * 100);
          const isOver = pct > 90;
          return (
            <Card key={b.id} className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{b.name}</p>
                  <span className={cn("text-xs font-medium", isOver ? 'text-destructive' : 'text-muted-foreground')}>{pct}%</span>
                </div>
                <Progress value={pct} className={cn("h-2", isOver && '[&>div]:bg-destructive')} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Spent: {formatFullCurrency(b.spent)}</span>
                  <span>Budget: {formatFullCurrency(b.allocated)}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Remaining: {formatFullCurrency(b.allocated - b.spent)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
