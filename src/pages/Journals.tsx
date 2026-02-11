import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { useCRUD } from '@/hooks/useLocalStorage';
import { JournalEntry, formatFullCurrency } from '@/data/mockData';
import { Plus, Search, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const initialJournals: JournalEntry[] = [
  { id: 'jrn_1', date: '2024-03-15', reference: 'JRN-001', description: 'Depreciation entry - Plant & Machinery', entries: [{ account: 'Depreciation Expense', debit: 25000, credit: 0 }, { account: 'Accumulated Depreciation', debit: 0, credit: 25000 }], total: 25000 },
  { id: 'jrn_2', date: '2024-03-20', reference: 'JRN-002', description: 'Accrued salary - March 2024', entries: [{ account: 'Salary Expense', debit: 280000, credit: 0 }, { account: 'Salary Payable', debit: 0, credit: 280000 }], total: 280000 },
  { id: 'jrn_3', date: '2024-03-22', reference: 'JRN-003', description: 'Bad debt write-off', entries: [{ account: 'Bad Debt Expense', debit: 12400, credit: 0 }, { account: 'Accounts Receivable', debit: 0, credit: 12400 }], total: 12400 },
];

export default function Journals() {
  const { items, create, remove } = useCRUD<JournalEntry>('dairy_journals', initialJournals);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ date: '', reference: '', description: '', debitAccount: '', creditAccount: '', amount: 0 });

  const filtered = useMemo(() => items.filter(j => j.description.toLowerCase().includes(search.toLowerCase())), [items, search]);

  const handleSave = () => {
    if (!form.description || !form.amount) return;
    create({
      id: `jrn_${Date.now()}`,
      date: form.date,
      reference: `JRN-${(items.length + 1).toString().padStart(3, '0')}`,
      description: form.description,
      entries: [
        { account: form.debitAccount, debit: form.amount, credit: 0 },
        { account: form.creditAccount, debit: 0, credit: form.amount },
      ],
      total: form.amount,
    });
    toast({ title: 'Journal entry created' });
    setDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-semibold text-foreground">Manual Journals</h1><p className="text-sm text-muted-foreground">{items.length} entries</p></div>
        <Button size="sm" onClick={() => { setForm({ date: new Date().toISOString().slice(0, 10), reference: '', description: '', debitAccount: '', creditAccount: '', amount: 0 }); setDialogOpen(true); }}><Plus className="h-4 w-4 mr-1" />New Entry</Button>
      </div>
      <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>

      <div className="space-y-3">
        {filtered.map(j => (
          <Card key={j.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-primary">{j.reference}</span>
                    <span className="text-xs text-muted-foreground">{j.date}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{j.description}</p>
                  <div className="mt-2 space-y-1">
                    {j.entries.map((e, i) => (
                      <div key={i} className="flex items-center gap-4 text-xs">
                        <span className="text-muted-foreground w-40">{e.account}</span>
                        <span className="text-foreground w-24 text-right">{e.debit ? formatFullCurrency(e.debit) : '-'}</span>
                        <span className="text-foreground w-24 text-right">{e.credit ? formatFullCurrency(e.credit) : '-'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { remove(j.id); toast({ title: 'Deleted', variant: 'destructive' }); }}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-popover">
          <DialogHeader><DialogTitle>New Journal Entry</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
            <div><Label>Description</Label><Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Debit Account</Label><Input value={form.debitAccount} onChange={e => setForm(f => ({ ...f, debitAccount: e.target.value }))} /></div>
              <div><Label>Credit Account</Label><Input value={form.creditAccount} onChange={e => setForm(f => ({ ...f, creditAccount: e.target.value }))} /></div>
            </div>
            <div><Label>Amount (₹)</Label><Input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: +e.target.value }))} /></div>
          </div>
          <DialogFooter><Button onClick={handleSave}>Create Entry</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
