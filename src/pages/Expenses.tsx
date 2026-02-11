import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { useCRUD } from '@/hooks/useLocalStorage';
import { mockExpenses, Expense, formatFullCurrency } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function Expenses() {
  const { items, create, update, remove } = useCRUD<Expense>('dairy_expenses', mockExpenses);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Expense | null>(null);
  const { toast } = useToast();
  const [form, setForm] = useState({ date: '', category: '', description: '', amount: 0, paidVia: '', vendor: '' });

  const filtered = useMemo(() => items.filter(e => e.description.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase())), [items, search]);

  const openCreate = () => { setEditItem(null); setForm({ date: new Date().toISOString().slice(0, 10), category: '', description: '', amount: 0, paidVia: '', vendor: '' }); setDialogOpen(true); };
  const openEdit = (e: Expense) => { setEditItem(e); setForm({ date: e.date, category: e.category, description: e.description, amount: e.amount, paidVia: e.paidVia, vendor: e.vendor }); setDialogOpen(true); };
  const handleSave = () => {
    if (!form.description) return;
    if (editItem) { update(editItem.id, form); toast({ title: 'Expense updated' }); }
    else { create({ ...form, id: `exp_${Date.now()}` }); toast({ title: 'Expense recorded' }); }
    setDialogOpen(false);
  };

  const total = useMemo(() => items.reduce((s, e) => s + e.amount, 0), [items]);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div><h1 className="text-2xl font-semibold text-foreground">Expenses</h1><p className="text-sm text-muted-foreground">{items.length} expenses · {formatFullCurrency(total)} total</p></div>
        <Button size="sm" onClick={openCreate} className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-1" />Record Expense</Button>
      </div>
      <div className="relative max-w-sm w-full"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
      <Card className="shadow-sm"><CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Description</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Vendor</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Paid Via</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-3 text-muted-foreground">{e.date}</td>
                <td className="p-3 text-foreground">{e.category}</td>
                <td className="p-3 text-foreground">{e.description}</td>
                <td className="p-3 text-muted-foreground">{e.vendor}</td>
                <td className="p-3 text-muted-foreground">{e.paidVia}</td>
                <td className="p-3 text-right font-medium text-foreground">{formatFullCurrency(e.amount)}</td>
                <td className="p-3 text-right"><div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(e)}><Edit className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { remove(e.id); toast({ title: 'Deleted', variant: 'destructive' }); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-popover">
          <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'New'} Expense</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
              <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} /></div>
            </div>
            <div><Label>Description</Label><Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Amount (₹)</Label><Input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: +e.target.value }))} /></div>
              <div><Label>Paid Via</Label><Input value={form.paidVia} onChange={e => setForm(f => ({ ...f, paidVia: e.target.value }))} /></div>
              <div><Label>Vendor</Label><Input value={form.vendor} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter><Button onClick={handleSave}>{editItem ? 'Update' : 'Create'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
