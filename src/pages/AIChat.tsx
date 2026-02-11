import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCRUD } from '@/hooks/useLocalStorage';
import { mockInvoices, Invoice } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
  timestamp: string;
  steps?: AgentStep[];
  actionType?: 'invoice_ravi' | 'pay_farmers' | 'freeze_budget';
  executed?: boolean;
}

interface AgentStep {
  agent: string;
  task: string;
  decision: string;
  impact: string;
  confidence: number;
  reason: string;
  evidence: string;
  status: 'running' | 'completed' | 'failed';
}

const initialMessages: ChatMessage[] = [
  {
    id: '1', role: 'ai', content: 'Welcome to the AI CFO Command Room. I can help you with invoices, payments, budgets, risk analysis, and more. Try commands like:\n\n• "Create invoice for Ravi ₹2.4L"\n• "Pay farmers ₹5L"\n• "Show March P&L"\n• "Freeze transport budget"',
    timestamp: new Date().toISOString()
  },
];

const simulateAgentResponse = (userMsg: string): ChatMessage => {
  const lower = userMsg.toLowerCase();

  if (lower.includes('invoice') && lower.includes('ravi')) {
    return {
      id: Date.now().toString(), role: 'ai',
      content: 'I\'ll create an invoice for Ravi Dairy Distributors. Here\'s my execution plan:',
      timestamp: new Date().toISOString(),
      actionType: 'invoice_ravi',
      steps: [
        { agent: 'Financial Planner', task: 'Validate invoice parameters', decision: 'Invoice amount ₹2,40,000 is within normal range for Ravi', impact: 'Receivables +₹2.4L', confidence: 96, reason: 'Historical average order from Ravi is ₹1.5-2.5L', evidence: 'Last 6 invoices averaged ₹1.89L', status: 'completed' },
        { agent: 'Risk Assessor', task: 'Credit risk check', decision: 'Ravi has good payment history — LOW risk', impact: 'No additional collateral needed', confidence: 92, reason: 'Payment within 12 days average', evidence: '95% on-time payment rate over 12 months', status: 'completed' },
        { agent: 'Compliance Auditor', task: 'GST & tax validation', decision: 'GST @5% applicable on milk products', impact: 'Tax: ₹12,000', confidence: 99, reason: 'HSN 0401 attracts 5% GST', evidence: 'FSSAI and GST Act Schedule I', status: 'completed' },
      ]
    };
  }

  if (lower.includes('pay') && lower.includes('farmer')) {
    return {
      id: Date.now().toString(), role: 'ai',
      content: 'Processing farmer payment request. This requires CFO approval (>₹50K):',
      timestamp: new Date().toISOString(),
      actionType: 'pay_farmers',
      steps: [
        { agent: 'Farmer Payment Optimizer', task: 'Optimize payment schedule', decision: 'Stagger ₹5L: ₹3L today + ₹2L on 28th', impact: 'Maintains ₹24.5L liquidity buffer', confidence: 94, reason: 'Staggering preserves cash for incoming receivables due 26th-28th', evidence: 'Cash flow forecast shows ₹4.2L inflow expected by 28th', status: 'completed' },
        { agent: 'Cash Flow Forecaster', task: 'Verify cash sufficiency', decision: 'Sufficient cash available — ₹33.9L balance', impact: 'Post-payment balance: ₹28.9L (safe)', confidence: 91, reason: 'Current balance exceeds payment + safety margin', evidence: 'Bank balance ₹24.5L + Cash ₹0.45L + incoming ₹9L', status: 'completed' },
        { agent: 'Budget Controller', task: 'Budget check', decision: 'Procurement budget has ₹1.29L remaining', impact: 'Budget utilization will reach 97%', confidence: 97, reason: 'March budget ₹8L, spent ₹6.71L', evidence: 'Budget ledger shows ₹1,28,800 available', status: 'running' },
      ]
    };
  }

  if (lower.includes('freeze') || lower.includes('budget')) {
    return {
      id: Date.now().toString(), role: 'ai',
      content: 'Budget freeze request analyzed:',
      timestamp: new Date().toISOString(),
      actionType: 'freeze_budget',
      steps: [
        { agent: 'Budget Controller', task: 'Analyze transport budget', decision: 'Transport budget at 85% (₹1.27L of ₹1.5L spent)', impact: 'Freeze will block ₹23K remaining', confidence: 97, reason: 'Current run rate suggests budget will be exceeded by month-end', evidence: 'Daily transport cost ₹4,200 × 10 remaining days = ₹42K needed vs ₹23K available', status: 'completed' },
        { agent: 'Risk Assessor', task: 'Impact analysis', decision: 'Freeze may cause delivery delays — MEDIUM risk', impact: '3-4 deliveries may need rescheduling', confidence: 85, reason: 'Insufficient budget for all scheduled deliveries', evidence: '8 deliveries scheduled, budget covers only 5', status: 'completed' },
      ]
    };
  }

  return {
    id: Date.now().toString(), role: 'ai',
    content: `I understand your request: "${userMsg}". Let me analyze this and provide a recommendation.\n\nBased on current data, I'll need to coordinate between agents to process this. The Financial Planner and relevant agents are being activated.\n\nWould you like me to proceed with execution, or would you prefer to see a detailed impact analysis first?`,
    timestamp: new Date().toISOString(),
  };
};

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { create: createInvoice } = useCRUD<Invoice>('dairy_invoices', mockInvoices);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = simulateAgentResponse(input);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleExecute = (messageId: string, actionType?: string) => {
    if (!actionType) return;

    if (actionType === 'invoice_ravi') {
      // Create actual invoice
      const newInvoice: Invoice = {
        id: `inv_${Date.now()}`,
        number: `INV-2024-${Math.floor(100 + Math.random() * 900)}`,
        customerId: 'cust_1',
        customerName: 'Ravi Dairy Distributors',
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [
          { itemName: 'Full Cream Milk', qty: 2000, rate: 62, amount: 124000 },
          { itemName: 'Ghee', qty: 223, rate: 520, amount: 116000 }
        ],
        total: 240000,
        status: 'sent'
      };

      createInvoice(newInvoice);

      toast({
        title: "Action Executed Successfully",
        description: "Invoice created for Ravi Dairy Distributors (₹2,40,000)",
        duration: 3000,
      });

      // Update message state to show executed
      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, executed: true } : msg
      ));

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'system',
        content: `✅ executed: Invoice #${newInvoice.number} has been created and sent to Ravi Dairy Distributors.`,
        timestamp: new Date().toISOString()
      }]);
    } else if (actionType === 'pay_farmers') {
      toast({
        title: "Payments Scheduled",
        description: "Farmer payments of ₹5,00,000 scheduled successfully.",
        duration: 3000,
      });

      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, executed: true } : msg
      ));

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'system',
        content: `✅ executed: Payment batch #PAY-${Date.now().toString().slice(-4)} scheduled. ₹3L immediate, ₹2L for 28th.`,
        timestamp: new Date().toISOString()
      }]);

    } else if (actionType === 'freeze_budget') {
      toast({
        title: "Budget Frozen",
        description: "Transport & Logistics budget has been frozen.",
        duration: 3000,
      });

      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, executed: true } : msg
      ));

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'system',
        content: `✅ executed: Transport budget frozen. Approvals now required for any new expenses >₹0.`,
        timestamp: new Date().toISOString()
      }]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">AI CFO Command Room</h1>
            <p className="text-xs text-muted-foreground">Chat-based financial control center</p>
          </div>
          <Badge variant="outline" className="ml-auto gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            7 agents ready
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            {msg.role === 'ai' && (
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            <div className={cn("max-w-[80%] space-y-3", msg.role === 'user' ? 'items-end' : 'items-start')}>
              <div className={cn(
                "rounded-lg px-4 py-3 text-sm",
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground'
              )}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>

              {msg.steps && (
                <div className="space-y-2 w-full">
                  {msg.steps.map((step, i) => (
                    <Card key={i} className="shadow-sm border-border">
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            step.status === 'completed' ? 'bg-success' : step.status === 'running' ? 'bg-warning animate-pulse-dot' : 'bg-destructive'
                          )} />
                          <span className="text-xs font-semibold text-primary">{step.agent}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{step.task}</span>
                          <Badge variant="outline" className="ml-auto text-[10px] h-5">{step.confidence}%</Badge>
                        </div>
                        <p className="text-xs font-medium text-foreground">{step.decision}</p>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div><span className="text-muted-foreground">Impact:</span> <span className="text-foreground">{step.impact}</span></div>
                          <div><span className="text-muted-foreground">Evidence:</span> <span className="text-foreground">{step.evidence}</span></div>
                        </div>
                        <p className="text-[11px] text-muted-foreground">Reason: {step.reason}</p>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="text-xs"
                      onClick={() => handleExecute(msg.id, msg.actionType)}
                      disabled={msg.executed}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      {msg.executed ? 'Executed' : 'Approve & Execute'}
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs" disabled={msg.executed}>Modify</Button>
                    <Button size="sm" variant="outline" className="text-xs text-destructive" disabled={msg.executed}>Reject</Button>
                  </div>
                </div>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <Input
            placeholder="Type a command... (e.g., 'Create invoice for Ravi ₹2.4L')"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          {['Create invoice for Ravi ₹2.4L', 'Pay farmers ₹5L', 'Freeze transport budget', 'Show March P&L'].map(cmd => (
            <button
              key={cmd}
              onClick={() => { setInput(cmd); }}
              className="text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary hover:bg-accent transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
