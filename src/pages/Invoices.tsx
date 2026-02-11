import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Download, Trash2, Edit } from 'lucide-react';
import { useCRUD } from '@/hooks/useLocalStorage';
import { mockInvoices, Invoice, formatFullCurrency } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const statusColors: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  sent: 'bg-info/10 text-info',
  paid: 'bg-success/10 text-success',
  overdue: 'bg-destructive/10 text-destructive',
};

export default function Invoices() {
  const { items: invoices, create, update, remove } = useCRUD<Invoice>('dairy_invoices', mockInvoices);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editInv, setEditInv] = useState<Invoice | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({ number: '', customerName: '', date: '', dueDate: '', total: 0, status: 'draft' as Invoice['status'] });

  const filtered = useMemo(() => invoices.filter(inv => {
    const matchSearch = inv.customerName.toLowerCase().includes(search.toLowerCase()) || inv.number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  }), [invoices, search, statusFilter]);

  const openCreate = () => {
    setEditInv(null);
    const num = `INV-2024-${(invoices.length + 1).toString().padStart(3, '0')}`;
    setForm({ number: num, customerName: '', date: new Date().toISOString().slice(0, 10), dueDate: '', total: 0, status: 'draft' });
    setDialogOpen(true);
  };

  const openEdit = (inv: Invoice) => {
    setEditInv(inv);
    setForm({ number: inv.number, customerName: inv.customerName, date: inv.date, dueDate: inv.dueDate, total: inv.total, status: inv.status });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.customerName) return;
    if (editInv) {
      update(editInv.id, { ...form, items: editInv.items });
      toast({ title: 'Invoice updated', description: form.number });
    } else {
      create({ id: `inv_${Date.now()}`, customerId: '', items: [{ itemName: 'Misc', qty: 1, rate: form.total, amount: form.total }], ...form });
      toast({ title: 'Invoice created', description: form.number });
    }
    setDialogOpen(false);
  };

  const totals = useMemo(() => ({
    total: invoices.reduce((s, i) => s + i.total, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0),
  }), [invoices]);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Invoices</h1>
          <p className="text-sm text-muted-foreground">{invoices.length} invoices · {formatFullCurrency(totals.total)} total</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><Download className="h-4 w-4 mr-1" />Export</Button>
          <Button size="sm" onClick={openCreate} className="flex-1 sm:flex-none"><Plus className="h-4 w-4 mr-1" />New Invoice</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm"><CardContent className="pt-4 pb-3"><p className="text-xs text-muted-foreground">Total Invoiced</p><p className="text-lg font-bold text-foreground">{formatFullCurrency(totals.total)}</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 pb-3"><p className="text-xs text-muted-foreground">Collected</p><p className="text-lg font-bold text-success">{formatFullCurrency(totals.paid)}</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 pb-3"><p className="text-xs text-muted-foreground">Overdue</p><p className="text-lg font-bold text-destructive">{formatFullCurrency(totals.overdue)}</p></CardContent></Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Invoice #</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Due Date</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
                <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-primary">{inv.number}</td>
                  <td className="p-3 text-foreground">{inv.customerName}</td>
                  <td className="p-3 text-muted-foreground">{inv.date}</td>
                  <td className="p-3 text-muted-foreground">{inv.dueDate}</td>
                  <td className="p-3 text-right font-medium text-foreground">{formatFullCurrency(inv.total)}</td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(inv)}><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { remove(inv.id); toast({ title: 'Deleted', description: inv.number, variant: 'destructive' }); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-popover">
          <DialogHeader><DialogTitle>{editInv ? 'Edit Invoice' : 'New Invoice'}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Invoice #</Label><Input value={form.number} readOnly className="bg-muted" /></div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as Invoice['status'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="sent">Sent</SelectItem><SelectItem value="paid">Paid</SelectItem><SelectItem value="overdue">Overdue</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Customer Name</Label><Input value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
              <div><Label>Due Date</Label><Input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} /></div>
            </div>
            <div><Label>Total Amount (₹)</Label><Input type="number" value={form.total} onChange={e => setForm(f => ({ ...f, total: +e.target.value }))} /></div>
          </div>
          <DialogFooter><Button onClick={handleSave}>{editInv ? 'Update' : 'Create'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
