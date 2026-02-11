import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Building2, Users, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div><h1 className="text-2xl font-semibold text-foreground">Settings</h1><p className="text-sm text-muted-foreground">Manage your company profile and preferences</p></div>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Company Profile</h2>
          </div>
          <div className="grid gap-3">
            <div><Label>Company Name</Label><Input defaultValue="Gokul Dairy Pvt. Ltd." /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>GSTIN</Label><Input defaultValue="08AABCG1234F1ZT" /></div>
              <div><Label>PAN</Label><Input defaultValue="AABCG1234F" /></div>
            </div>
            <div><Label>Address</Label><Input defaultValue="Industrial Area, Phase-II, Jaipur, Rajasthan" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Phone</Label><Input defaultValue="+91-141-2345678" /></div>
              <div><Label>Email</Label><Input defaultValue="accounts@gokuldairy.in" /></div>
            </div>
          </div>
          <Button size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Approval Rules</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Amount &lt; ₹5,000</span>
              <span className="font-medium text-success">Auto-approved</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">₹5,000 – ₹50,000</span>
              <span className="font-medium text-foreground">Manager approval</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">&gt; ₹50,000</span>
              <span className="font-medium text-primary">CFO approval</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Users & Roles</h2>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { name: 'Admin User', role: 'CFO', email: 'admin@gokuldairy.in' },
              { name: 'Rajesh Sharma', role: 'Manager', email: 'rajesh@gokuldairy.in' },
              { name: 'Priya Patel', role: 'Accountant', email: 'priya@gokuldairy.in' },
              { name: 'Vikram Singh', role: 'Plant Manager', email: 'vikram@gokuldairy.in' },
            ].map(u => (
              <div key={u.email} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div><p className="font-medium text-foreground">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{u.role}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
