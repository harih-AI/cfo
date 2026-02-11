import { Card, CardContent } from '@/components/ui/card';
import { FileText, Receipt, FileCheck, Shield } from 'lucide-react';

const documents = [
  { name: 'INV-2024-001.pdf', type: 'Invoice', date: '01 Mar 2024', size: '145 KB', icon: FileText },
  { name: 'INV-2024-010.pdf', type: 'Invoice', date: '14 Mar 2024', size: '132 KB', icon: FileText },
  { name: 'BILL-2024-001_scan.pdf', type: 'Bill Scan', date: '01 Mar 2024', size: '2.1 MB', icon: Receipt },
  { name: 'BILL-2024-005_scan.pdf', type: 'Bill Scan', date: '06 Mar 2024', size: '1.8 MB', icon: Receipt },
  { name: 'ColdChain_Contract_2024.pdf', type: 'Contract', date: '15 Jan 2024', size: '420 KB', icon: FileCheck },
  { name: 'FSSAI_License_2024.pdf', type: 'Compliance', date: '01 Apr 2023', size: '890 KB', icon: Shield },
  { name: 'GST_Registration.pdf', type: 'Compliance', date: '12 Jul 2022', size: '310 KB', icon: Shield },
  { name: 'Insurance_Policy_2024.pdf', type: 'Contract', date: '05 Mar 2024', size: '1.5 MB', icon: FileCheck },
];

export default function Documents() {
  return (
    <div className="p-6 space-y-4">
      <div><h1 className="text-2xl font-semibold text-foreground">Documents</h1><p className="text-sm text-muted-foreground">{documents.length} files</p></div>
      <Card className="shadow-sm"><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Size</th>
          </tr></thead>
          <tbody>
            {documents.map((doc, i) => (
              <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer">
                <td className="p-3"><div className="flex items-center gap-2"><doc.icon className="h-4 w-4 text-primary" /><span className="text-foreground">{doc.name}</span></div></td>
                <td className="p-3 text-muted-foreground">{doc.type}</td>
                <td className="p-3 text-muted-foreground">{doc.date}</td>
                <td className="p-3 text-right text-muted-foreground">{doc.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}
