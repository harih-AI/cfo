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
import { mockCustomers, Customer, formatFullCurrency } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function Customers() {
  const { items, create, update, remove } = useCRUD<Customer>('dairy_customers', mockCustomers);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Customer | null>(null);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', balance: 0, type: 'dealer' as Customer['type'] });

  const filtered = useMemo(() => items.filter(c => c.name.toLowerCase().includes(search.toLowerCase())), [items, search]);

  const openCreate = () => { setEditItem(null); setForm({ name: '', phone: '', email: '', address: '', balance: 0, type: 'dealer' }); setDialogOpen(true); };
  const openEdit = (c: Customer) => { setEditItem(c); setForm({ name: c.name, phone: c.phone, email: c.email, address: c.address, balance: c.balance, type: c.type }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editItem) { update(editItem.id, form); toast({ title: 'Customer updated' }); }
    else { create({ ...form, id: `cust_${Date.now()}` }); toast({ title: 'Customer created' }); }
    setDialogOpen(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div><h1 className="text-2xl font-semibold text-foreground">Customers</h1><p className="text-sm text-muted-foreground">{items.length} customers</p></div>
        <Button size="sm" onClick={openCreate} className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-1" />Add Customer</Button>
      </div>
      <div className="relative max-w-sm w-full"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>

      <Card className="shadow-sm"><CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Phone</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Balance</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{c.name}</td>
                <td className="p-3"><Badge variant="secondary" className="text-[10px]">{c.type}</Badge></td>
                <td className="p-3 text-muted-foreground">{c.phone}</td>
                <td className="p-3 text-muted-foreground">{c.email}</td>
                <td className="p-3 text-right font-medium text-foreground">{formatFullCurrency(c.balance)}</td>
                <td className="p-3 text-right"><div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(c)}><Edit className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { remove(c.id); toast({ title: 'Deleted', variant: 'destructive' }); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-popover">
          <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'New'} Customer</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
            </div>
            <div><Label>Address</Label><Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Balance (₹)</Label><Input type="number" value={form.balance} onChange={e => setForm(f => ({ ...f, balance: +e.target.value }))} /></div>
              <div><Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as Customer['type'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="dealer">Dealer</SelectItem><SelectItem value="distributor">Distributor</SelectItem><SelectItem value="retail">Retail</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter><Button onClick={handleSave}>{editItem ? 'Update' : 'Create'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
