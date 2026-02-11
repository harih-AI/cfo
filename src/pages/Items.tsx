import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Search, Download, Trash2, Edit, Package } from 'lucide-react';
import { useCRUD } from '@/hooks/useLocalStorage';
import { mockItems, Item, formatFullCurrency } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function Items() {
  const [searchParams] = useSearchParams();
  const { items, create, update, remove } = useCRUD<Item>('dairy_items', mockItems);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const { toast } = useToast();

  // Read type from URL query parameter
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setTypeFilter(typeParam);
    } else {
      setTypeFilter('all');
    }
  }, [searchParams]);

  const [form, setForm] = useState({ name: '', type: 'milk' as Item['type'], unit: 'Litre', rate: 0, stock: 0, hsnCode: '' });

  const filtered = useMemo(() => items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    return matchSearch && matchType;
  }), [items, search, typeFilter]);

  const openCreate = () => { setEditItem(null); setForm({ name: '', type: 'milk', unit: 'Litre', rate: 0, stock: 0, hsnCode: '' }); setDialogOpen(true); };
  const openEdit = (item: Item) => { setEditItem(item); setForm({ name: item.name, type: item.type, unit: item.unit, rate: item.rate, stock: item.stock, hsnCode: item.hsnCode }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editItem) {
      update(editItem.id, form);
      toast({ title: 'Item updated', description: form.name });
    } else {
      create({ ...form, id: `item_${Date.now()}` });
      toast({ title: 'Item created', description: form.name });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    remove(id);
    toast({ title: 'Item deleted', description: name, variant: 'destructive' });
  };

  const handleExport = () => {
    const csv = ['Name,Type,Unit,Rate,Stock,HSN'].concat(
      filtered.map(i => `${i.name},${i.type},${i.unit},${i.rate},${i.stock},${i.hsnCode}`)
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'items.csv'; a.click();
    toast({ title: 'Exported', description: `${filtered.length} items exported` });
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Items</h1>
          <p className="text-sm text-muted-foreground">{items.length} products</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={handleExport} className="flex-1 sm:flex-none"><Download className="h-4 w-4 mr-1" />Export</Button>
          <Button size="sm" onClick={openCreate} className="flex-1 sm:flex-none"><Plus className="h-4 w-4 mr-1" />Add Item</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="milk">Milk</SelectItem>
            <SelectItem value="curd">Curd</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Unit</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Rate</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Stock</th>
                <th className="text-left p-3 font-medium text-muted-foreground">HSN</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{item.name}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-[10px]">{item.type}</Badge></td>
                  <td className="p-3 text-muted-foreground">{item.unit}</td>
                  <td className="p-3 text-right text-foreground">{formatFullCurrency(item.rate)}</td>
                  <td className="p-3 text-right text-foreground">{item.stock.toLocaleString()}</td>
                  <td className="p-3 text-muted-foreground">{item.hsnCode}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(item)}><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(item.id, item.name)}><Trash2 className="h-3.5 w-3.5" /></Button>
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
          <DialogHeader><DialogTitle>{editItem ? 'Edit Item' : 'New Item'}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as Item['type'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="milk">Milk</SelectItem><SelectItem value="curd">Curd</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label>Unit</Label><Input value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Rate (₹)</Label><Input type="number" value={form.rate} onChange={e => setForm(f => ({ ...f, rate: +e.target.value }))} /></div>
              <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: +e.target.value }))} /></div>
              <div><Label>HSN Code</Label><Input value={form.hsnCode} onChange={e => setForm(f => ({ ...f, hsnCode: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter><Button onClick={handleSave}>{editItem ? 'Update' : 'Create'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
