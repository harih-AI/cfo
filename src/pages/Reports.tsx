import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { formatFullCurrency } from '@/data/mockData';

const pnlData = [
  { month: 'Oct', revenue: 1420000, cogs: 780000, opex: 200000, profit: 440000 },
  { month: 'Nov', revenue: 1580000, cogs: 850000, opex: 200000, profit: 530000 },
  { month: 'Dec', revenue: 1350000, cogs: 720000, opex: 200000, profit: 430000 },
  { month: 'Jan', revenue: 1680000, cogs: 900000, opex: 220000, profit: 560000 },
  { month: 'Feb', revenue: 1520000, cogs: 820000, opex: 260000, profit: 440000 },
  { month: 'Mar', revenue: 1890000, cogs: 1010000, opex: 240000, profit: 640000 },
];

const balanceSheet = [
  { category: 'Cash & Bank', amount: 3395000 },
  { category: 'Accounts Receivable', amount: 1566000 },
  { category: 'Inventory', amount: 890000 },
  { category: 'Fixed Assets', amount: 2200000 },
  { category: 'Accounts Payable', amount: -836000 },
  { category: 'Loans', amount: -1500000 },
];

const cashFlowData = [
  { month: 'Oct', in: 1400000, out: 1000000 },
  { month: 'Nov', in: 1600000, out: 1100000 },
  { month: 'Dec', in: 1300000, out: 950000 },
  { month: 'Jan', in: 1700000, out: 1200000 },
  { month: 'Feb', in: 1500000, out: 1150000 },
  { month: 'Mar', in: 1900000, out: 1300000 },
];

const taxData = [
  { type: 'GST Collected', amount: 340200 },
  { type: 'GST Paid', amount: 180500 },
  { type: 'Net GST Payable', amount: 159700 },
  { type: 'Income Tax (Est)', amount: 163200 },
  { type: 'TDS Deducted', amount: 45000 },
];

export default function Reports() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'pnl';

  const renderContent = () => {
    switch (type) {
      case 'pnl':
        return (
          <>
            <Card className="shadow-sm mb-6">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Profit & Loss (Monthly)</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pnlData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} />
                      <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip formatter={(v: number) => formatFullCurrency(v)} />
                      <Bar dataKey="revenue" fill="hsl(271, 83%, 49%)" radius={[3, 3, 0, 0]} name="Revenue" />
                      <Bar dataKey="cogs" fill="hsl(220, 14%, 85%)" radius={[3, 3, 0, 0]} name="COGS" />
                      <Bar dataKey="profit" fill="hsl(142, 71%, 45%)" radius={[3, 3, 0, 0]} name="Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">P&L Statement — March 2024</CardTitle></CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <tbody>
                    {[
                      { label: 'Total Revenue', value: 1890000, bold: true },
                      { label: 'Cost of Goods Sold', value: -1010000 },
                      { label: 'Gross Profit', value: 880000, bold: true },
                      { label: 'Operating Expenses', value: -240000 },
                      { label: 'Salaries', value: -280000 },
                      { label: 'Net Profit Before Tax', value: 640000, bold: true },
                      { label: 'Tax (estimated)', value: -96000 },
                      { label: 'Net Profit After Tax', value: 544000, bold: true, primary: true },
                    ].map(row => (
                      <tr key={row.label} className="border-b border-border hover:bg-muted/30">
                        <td className={`p-3 ${row.bold ? 'font-semibold text-foreground' : 'text-muted-foreground pl-6'}`}>{row.label}</td>
                        <td className={`p-3 text-right ${row.bold ? 'font-bold' : 'font-medium'} ${row.primary ? 'text-primary' : row.value < 0 ? 'text-destructive' : 'text-foreground'}`}>
                          {row.value < 0 ? '-' : ''}{formatFullCurrency(Math.abs(row.value))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        );

      case 'balance':
        return (
          <Card className="shadow-sm max-w-2xl mx-auto">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Balance Sheet Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {balanceSheet.map(item => (
                  <div key={item.category} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{item.category}</span>
                    <span className={`text-sm font-medium ${item.amount < 0 ? 'text-destructive' : 'text-foreground'}`}>
                      {item.amount < 0 ? '-' : ''}{formatFullCurrency(Math.abs(item.amount))}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t-2 border-border">
                  <span className="text-sm font-semibold text-foreground">Net Worth</span>
                  <span className="text-sm font-bold text-primary">{formatFullCurrency(balanceSheet.reduce((s, i) => s + i.amount, 0))}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'cashflow':
        return (
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Cash Flow Analysis</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip formatter={(v: number) => formatFullCurrency(v)} />
                    <Bar dataKey="in" fill="hsl(142, 71%, 45%)" name="Inflow" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="out" fill="hsl(0, 84%, 60%)" name="Outflow" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );

      case 'tax':
        return (
          <Card className="shadow-sm max-w-2xl mx-auto">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Tax Liability Report</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {taxData.map(item => (
                  <div key={item.type} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{item.type}</span>
                    <span className="text-sm font-medium text-foreground">
                      {formatFullCurrency(item.amount)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t-2 border-border mt-4">
                  <span className="text-sm font-semibold text-foreground">Total Payable</span>
                  <span className="text-sm font-bold text-destructive">
                    {formatFullCurrency(taxData.reduce((acc, curr) => acc + curr.amount, 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return <div>Select a report...</div>;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'pnl': return 'Profit & Loss Statement';
      case 'balance': return 'Balance Sheet';
      case 'cashflow': return 'Cash Flow';
      case 'tax': return 'Tax Reports';
      default: return 'Reports';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{getTitle()}</h1>
        <p className="text-sm text-muted-foreground">Financial overview · FY 2023-24</p>
      </div>
      {renderContent()}
    </div>
  );
}
