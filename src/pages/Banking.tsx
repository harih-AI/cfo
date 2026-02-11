import { Card, CardContent } from '@/components/ui/card';
import { mockBanks, formatFullCurrency, BankAccount } from '@/data/mockData';
import { useCRUD } from '@/hooks/useLocalStorage';
import { Landmark, Wallet } from 'lucide-react';

export default function Banking() {
  const { items } = useCRUD<BankAccount>('dairy_banks', mockBanks);
  const totalBalance = items.reduce((s, b) => s + b.balance, 0);

  return (
    <div className="p-6 space-y-4">
      <div><h1 className="text-2xl font-semibold text-foreground">Banking</h1><p className="text-sm text-muted-foreground">Total balance: {formatFullCurrency(totalBalance)}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(b => (
          <Card key={b.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {b.type === 'bank' ? <Landmark className="h-5 w-5 text-primary" /> : <Wallet className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.bankName} · {b.accountNumber}</p>
                  <p className="text-xl font-bold text-foreground mt-2">{formatFullCurrency(b.balance)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
