import {
  TrendingUp, TrendingDown, DollarSign, Wallet, CreditCard, Receipt,
  ArrowUpRight, ArrowDownRight, AlertTriangle, Bot, Clock, CheckCircle, ExternalLink,
  Users, Scale, Server, Megaphone, Activity, Database, Clipboard, Palette, Heart, ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatFullCurrency, mockInvoices, mockBills, mockExpenses, mockRisks, mockAgents, mockApprovals } from '@/data/mockData';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';

const revenueData = [
  { month: 'Oct', revenue: 1420000, expenses: 980000 },
  { month: 'Nov', revenue: 1580000, expenses: 1050000 },
  { month: 'Dec', revenue: 1350000, expenses: 920000 },
  { month: 'Jan', revenue: 1680000, expenses: 1120000 },
  { month: 'Feb', revenue: 1520000, expenses: 1080000 },
  { month: 'Mar', revenue: 1890000, expenses: 1250000 },
];

const cashFlowData = [
  { week: 'W1', inflow: 340000, outflow: 290000 },
  { week: 'W2', inflow: 420000, outflow: 350000 },
  { week: 'W3', inflow: 380000, outflow: 410000 },
  { week: 'W4', inflow: 510000, outflow: 320000 },
];

const expenseCatData = [
  { name: 'Procurement', value: 671200, color: 'hsl(271, 83%, 49%)' },
  { name: 'Salaries', value: 280000, color: 'hsl(217, 91%, 60%)' },
  { name: 'Transport', value: 127000, color: 'hsl(142, 71%, 45%)' },
  { name: 'Packaging', value: 40000, color: 'hsl(38, 92%, 50%)' },
  { name: 'Utilities', value: 45000, color: 'hsl(0, 84%, 60%)' },
  { name: 'Other', value: 87000, color: 'hsl(220, 9%, 46%)' },
];

const marginData = [
  { month: 'Oct', margin: 13.1 },
  { month: 'Nov', margin: 13.8 },
  { month: 'Dec', margin: 12.5 },
  { month: 'Jan', margin: 14.6 },
  { month: 'Feb', margin: 13.9 },
  { month: 'Mar', margin: 14.2 },
];

const kpiCards = [
  { label: 'Revenue', value: 1890000, trend: 8.2, icon: TrendingUp, positive: true },
  { label: 'Expenses', value: 1250000, trend: 4.1, icon: TrendingDown, positive: false },
  { label: 'Net Profit', value: 640000, trend: 12.5, icon: DollarSign, positive: true },
  { label: 'Cash Balance', value: 3395000, trend: 5.2, icon: Wallet, positive: true },
  { label: 'Receivables', value: 1566000, trend: -2.1, icon: CreditCard, positive: false },
  { label: 'Payables', value: 836000, trend: 3.4, icon: Receipt, positive: false },
];

export default function Dashboard() {
  const pendingApprovals = mockApprovals.filter(a => a.status === 'pending');
  const activeRisks = mockRisks.filter(r => r.status === 'active');
  const runningAgents = mockAgents.filter(a => a.status === 'running');

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">March 2024 · Dairy AI CFO Overview</p>
        </div>
        <Badge variant="outline" className="gap-1.5 hidden sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
          {runningAgents.length} agents active
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {kpiCards.map(kpi => (
          <Card key={kpi.label} className="shadow-sm">
            <CardContent className="pt-4 pb-3 px-3 md:px-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
                <span className={`text-[10px] font-medium flex items-center gap-0.5 ${kpi.trend > 0 ? (kpi.positive ? 'text-success' : 'text-destructive') : (kpi.positive ? 'text-destructive' : 'text-success')
                  }`}>
                  {kpi.trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(kpi.trend)}%
                </span>
              </div>
              <p className="text-lg font-bold text-foreground">{formatCurrency(kpi.value)}</p>
              <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI C-Suite Pods */}
      <div>
        <h2 className="text-lg font-semibold mb-3">AI C-Suite Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "DealCloser & Finance AI",
              role: "CFO & Sales",
              desc: "Ensures financial sustainability, capital efficiency, and real-time resource allocation.",
              benefit: "Reduces OpEx by 30%",
              icon: DollarSign,
              color: "text-emerald-500"
            },
            {
              name: "Revenue Engine AI",
              role: "CRO",
              desc: "Drives revenue generation, pipeline health, and market penetration.",
              benefit: "24/7 Lead Qualification",
              icon: TrendingUp,
              color: "text-blue-500"
            },
            {
              name: "Tech Architect AI",
              role: "CTO",
              desc: "Drives technical excellence, infrastructure scalability, and innovative R&D.",
              benefit: "Zero Technical Debt",
              icon: Server,
              color: "text-slate-500"
            },
            {
              name: "Growth Marketing AI",
              role: "CMO",
              desc: "Manages brand positioning, customer acquisition, and market intelligence.",
              benefit: "10x Marketing ROI",
              icon: Megaphone,
              color: "text-pink-500"
            },
            {
              name: "Talent & Culture AI",
              role: "CHRO",
              desc: "Optimizes organizational capability, talent allocation, and culture.",
              benefit: "Streamlined Hiring",
              icon: Users,
              color: "text-purple-500"
            },
            {
              name: "Legal Guardian AI",
              role: "CLO",
              desc: "Provides legal protection, contract review, and risk mitigation.",
              benefit: "Instant Contract Review",
              icon: Scale,
              color: "text-amber-700"
            },
            {
              name: "Operations Ninja AI",
              role: "COO",
              desc: "Ensures operational excellence, process efficiency, and automation.",
              benefit: "Flawless Execution",
              icon: Activity,
              color: "text-orange-500"
            },
            {
              name: "Market Intel AI",
              role: "CIO",
              desc: "Gathers strategic intelligence and deep market understanding.",
              benefit: "Data-Driven Strategy",
              icon: Database,
              color: "text-cyan-600"
            },
            {
              name: "Product Delivery AI",
              role: "PMO",
              desc: "Oversees product execution, roadmap delivery, and feature tradeoffs.",
              benefit: "On-Time Delivery",
              icon: Clipboard,
              color: "text-indigo-500"
            },
            {
              name: "Creative Director AI",
              role: "CDO",
              desc: "Guarantees user experience excellence and brand consistency.",
              benefit: "World-Class UX",
              icon: Palette,
              color: "text-rose-500"
            },
            {
              name: "Customer Hero AI",
              role: "CXO",
              desc: "Manages customer success, satisfaction, and retention risks.",
              benefit: "Zero Churn",
              icon: Heart,
              color: "text-red-500",
              link: "https://customerheroexperience.netlify.app/"
            },
            {
              name: "AI Governance AI",
              role: "Ethics",
              desc: "Enforces responsible AI, ethical operations, and bias mitigation.",
              benefit: "100% Compliance",
              icon: ShieldCheck,
              color: "text-green-600",
              link: "https://ethicsaiaiai.netlify.app/"
            }
          ].map((pod, i) => (
            <div key={i} className="group relative">
              {pod.link ? (
                <a href={pod.link} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer text-inherit no-underline">
                  <Card className="h-full hover:shadow-md transition-all border-l-4" style={{ borderLeftColor: pod.color.replace('text-', '').replace('-500', '').replace('-600', '').replace('-700', '') === 'emerald' ? '#10b981' : pod.color.replace('text-', '').replace('-500', '').replace('-600', '').replace('-700', '') === 'blue' ? '#3b82f6' : 'currentColor' }}>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                      <div className={`p-2 rounded-lg bg-muted ${pod.color}`}>
                        <pod.icon className="h-5 w-5" />
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-base">{pod.name}</h3>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{pod.role}</p>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{pod.desc}</p>
                      <Badge variant="secondary" className="w-full justify-center text-[10px] py-0.5 mb-3 bg-secondary/50">
                        {pod.benefit}
                      </Badge>
                      <div className="w-full py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium text-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Hire {pod.role}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ) : (
                <Card className="h-full hover:shadow-md transition-all border-l-4" style={{ borderLeftColor: 'transparent' }}>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className={`p-2 rounded-lg bg-muted ${pod.color}`}>
                      <pod.icon className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-base">{pod.name}</h3>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{pod.role}</p>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{pod.desc}</p>
                    <Badge variant="secondary" className="w-full justify-center text-[10px] py-0.5 mb-3 bg-secondary/50">
                      {pod.benefit}
                    </Badge>
                    <button className="w-full py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium text-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      Hire {pod.role}
                    </button>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value: number) => formatFullCurrency(value)} />
                <Bar dataKey="revenue" fill="hsl(271, 83%, 49%)" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="hsl(220, 14%, 90%)" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => formatFullCurrency(value)} />
                <Area type="monotone" dataKey="inflow" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.1} name="Inflow" />
                <Area type="monotone" dataKey="outflow" stroke="hsl(0, 84%, 60%)" fill="hsl(0, 84%, 60%)" fillOpacity={0.1} name="Outflow" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expense Categories</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
            <div className="w-full sm:w-1/2 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseCatData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                    {expenseCatData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatFullCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 space-y-2 pl-0 sm:pl-4">
              {expenseCatData.map(cat => (
                <div key={cat.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-muted-foreground flex-1">{cat.name}</span>
                  <span className="font-medium text-foreground">{formatCurrency(cat.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Margin Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 9%, 46%)' }} domain={[10, 18]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Line type="monotone" dataKey="margin" stroke="hsl(271, 83%, 49%)" strokeWidth={2} dot={{ fill: 'hsl(271, 83%, 49%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk Alerts */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Risk Alerts ({activeRisks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {activeRisks.map(risk => (
              <div key={risk.id} className="p-2 rounded-md border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={risk.severity === 'high' ? 'destructive' : 'secondary'} className="text-[10px] h-5">
                    {risk.severity}
                  </Badge>
                  <span className="text-xs font-medium text-foreground truncate">{risk.title}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{risk.impact}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Agent Status */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockAgents.slice(0, 5).map(agent => (
              <div key={agent.id} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${agent.status === 'running' ? 'bg-success animate-pulse-dot' :
                  agent.status === 'completed' ? 'bg-info' :
                    agent.status === 'failed' ? 'bg-destructive' : 'bg-muted-foreground'
                  }`} />
                <span className="text-xs text-foreground flex-1 truncate">{agent.name}</span>
                <span className="text-[10px] text-muted-foreground">{agent.accuracy}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              Pending Approvals ({pendingApprovals.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingApprovals.map(appr => (
              <div key={appr.id} className="p-2 rounded-md border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{appr.type}</span>
                  <Badge variant="outline" className="text-[10px] h-5">{appr.approver}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{appr.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
