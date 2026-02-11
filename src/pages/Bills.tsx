import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { useCRUD } from '@/hooks/useLocalStorage';
import { mockBills, Bill, formatFullCurrency } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const statusColors: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  received: 'bg-info/10 text-info',
  paid: 'bg-success/10 text-success',
  overdue: 'bg-destructive/10 text-destructive',
};

export default function Bills() {
  const { items, create, update, remove } = useCRUD<Bill>('dairy_bills', mockBills);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Bill | null>(null);
  const { toast } = useToast();
  const [form, setForm] = useState({ number: '', vendorName: '', date: '', dueDate: '', total: 0, status: 'draft' as Bill['status'] });

  const filtered = useMemo(() => items.filter(b => {
    const m = b.vendorName.toLowerCase().includes(search.toLowerCase()) || b.number.toLowerCase().includes(search.toLowerCase());
    const s = statusFilter === 'all' || b.status === statusFilter;
    return m && s;
  }), [items, search, statusFilter]);

  const openCreate = () => { setEditItem(null); setForm({ number: `BILL-2024-${(items.length + 1).toString().padStart(3, '0')}`, vendorName: '', date: new Date().toISOString().slice(0, 10), dueDate: '', total: 0, status: 'draft' }); setDialogOpen(true); };
  const openEdit = (b: Bill) => { setEditItem(b); setForm({ number: b.number, vendorName: b.vendorName, date: b.date, dueDate: b.dueDate, total: b.total, status: b.status }); setDialogOpen(true); };
  const handleSave = () => {
    if (!form.vendorName) return;
    if (editItem) { update(editItem.id, { ...form, items: editItem.items }); toast({ title: 'Bill updated' }); }
    else { create({ id: `bill_${Date.now()}`, vendorId: '', items: [{ itemName: 'Misc', qty: 1, rate: form.total, amount: form.total }], ...form }); toast({ title: 'Bill created' }); }
    setDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-semibold text-foreground">Bills</h1><p className="text-sm text-muted-foreground">{items.length} bills</p></div>
        <Button size="sm" onClick={openCreate}><Plus className="h-4 w-4 mr-1" />New Bill</Button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="received">Received</SelectItem><SelectItem value="paid">Paid</SelectItem><SelectItem value="overdue">Overdue</SelectItem></SelectContent>
        </Select>
      </div>
      <Card className="shadow-sm"><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-3 font-medium text-muted-foreground">Bill #</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Vendor</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
            <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-primary">{b.number}</td>
                <td className="p-3 text-foreground">{b.vendorName}</td>
                <td className="p-3 text-muted-foreground">{b.date}</td>
                <td className="p-3 text-right font-medium text-foreground">{formatFullCurrency(b.total)}</td>
                <td className="p-3 text-center"><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[b.status]}`}>{b.status}</span></td>
                <td className="p-3 text-right"><div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(b)}><Edit className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { remove(b.id); toast({ title: 'Deleted', variant: 'destructive' }); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-popover">
          <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'New'} Bill</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Bill #</Label><Input value={form.number} readOnly className="bg-muted" /></div>
              <div><Label>Status</Label><Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as Bill['status'] }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="received">Received</SelectItem><SelectItem value="paid">Paid</SelectItem><SelectItem value="overdue">Overdue</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Vendor</Label><Input value={form.vendorName} onChange={e => setForm(f => ({ ...f, vendorName: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
              <div><Label>Due Date</Label><Input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} /></div>
            </div>
            <div><Label>Total (₹)</Label><Input type="number" value={form.total} onChange={e => setForm(f => ({ ...f, total: +e.target.value }))} /></div>
          </div>
          <DialogFooter><Button onClick={handleSave}>{editItem ? 'Update' : 'Create'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
