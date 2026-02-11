// Mock data for Dairy AI CFO ERP

// Simple ID generator
let _id = 0;
const genId = () => `id_${++_id}_${Date.now().toString(36)}`;

export interface Item {
  id: string;
  name: string;
  type: 'milk' | 'curd' | 'other';
  unit: string;
  rate: number;
  stock: number;
  hsnCode: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  balance: number;
  type: 'dealer' | 'distributor' | 'retail';
}

export interface Vendor {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  balance: number;
  type: 'farmer' | 'supplier' | 'transporter';
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  date: string;
  dueDate: string;
  items: { itemName: string; qty: number; rate: number; amount: number }[];
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface Bill {
  id: string;
  number: string;
  vendorId: string;
  vendorName: string;
  date: string;
  dueDate: string;
  items: { itemName: string; qty: number; rate: number; amount: number }[];
  total: number;
  status: 'draft' | 'received' | 'paid' | 'overdue';
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paidVia: string;
  vendor: string;
}

export interface Payment {
  id: string;
  date: string;
  type: 'received' | 'made';
  party: string;
  amount: number;
  method: string;
  reference: string;
}

export interface BankAccount {
  id: string;
  name: string;
  type: 'bank' | 'cash';
  balance: number;
  bankName: string;
  accountNumber: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  entries: { account: string; debit: number; credit: number }[];
  total: number;
}

export interface Budget {
  id: string;
  name: string;
  period: string;
  allocated: number;
  spent: number;
  category: string;
}

export interface RiskItem {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  impact: string;
  status: 'active' | 'mitigated' | 'monitoring';
  date: string;
}



export interface Approval {
  id: string;
  type: string;
  description: string;
  amount: number;
  requester: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  agentId?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'human' | 'ai';
  action: string;
  entity: string;
  entityId: string;
  before?: string;
  after?: string;
  amount?: number;
  reason: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'running' | 'completed' | 'idle' | 'failed';
  accuracy: number;
  tasksCompleted: number;
  savedAmount: number;
  lastDecision: string;
  lastRun: string;
  performanceGoals?: string[];
  responsibilities?: string[];
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'agent' | 'approval' | 'payment' | 'error' | 'edit' | 'risk';
  title: string;
  description: string;
  icon?: string;
}

// ===== MOCK DATA =====

export const mockItems: Item[] = [
  { id: 'item_1', name: 'Full Cream Milk', type: 'milk', unit: 'Litre', rate: 62, stock: 5200, hsnCode: '0401' },
  { id: 'item_2', name: 'Toned Milk', type: 'milk', unit: 'Litre', rate: 50, stock: 8400, hsnCode: '0401' },
  { id: 'item_3', name: 'Standardized Milk', type: 'milk', unit: 'Litre', rate: 54, stock: 6100, hsnCode: '0401' },
  { id: 'item_4', name: 'Skimmed Milk', type: 'milk', unit: 'Litre', rate: 42, stock: 3200, hsnCode: '0401' },
  { id: 'item_5', name: 'A2 Milk (Desi Cow)', type: 'milk', unit: 'Litre', rate: 80, stock: 1500, hsnCode: '0401' },
  { id: 'item_6', name: 'Buffalo Milk', type: 'milk', unit: 'Litre', rate: 70, stock: 4300, hsnCode: '0401' },
  { id: 'item_7', name: 'Plain Curd', type: 'curd', unit: 'Kg', rate: 55, stock: 2800, hsnCode: '0403' },
  { id: 'item_8', name: 'Greek Yogurt', type: 'curd', unit: 'Kg', rate: 120, stock: 800, hsnCode: '0403' },
  { id: 'item_9', name: 'Buttermilk', type: 'curd', unit: 'Litre', rate: 25, stock: 3500, hsnCode: '0403' },
  { id: 'item_10', name: 'Lassi (Sweet)', type: 'curd', unit: 'Litre', rate: 35, stock: 2200, hsnCode: '0403' },
  { id: 'item_11', name: 'Paneer', type: 'other', unit: 'Kg', rate: 320, stock: 600, hsnCode: '0406' },
  { id: 'item_12', name: 'Ghee', type: 'other', unit: 'Kg', rate: 520, stock: 400, hsnCode: '0405' },
];

export const mockCustomers: Customer[] = [
  { id: 'cust_1', name: 'Ravi Dairy Distributors', phone: '9876543210', email: 'ravi@dairy.in', address: 'MG Road, Jaipur', balance: 240000, type: 'dealer' },
  { id: 'cust_2', name: 'Metro Milk Mart', phone: '9876543211', email: 'metro@milk.in', address: 'Station Road, Delhi', balance: 185000, type: 'distributor' },
  { id: 'cust_3', name: 'Krishna Dairy Chain', phone: '9876543212', email: 'krishna@dairy.in', address: 'Ring Road, Ahmedabad', balance: 320000, type: 'dealer' },
  { id: 'cust_4', name: 'GoMilk Express', phone: '9876543213', email: 'go@milk.in', address: 'NH-8, Udaipur', balance: 95000, type: 'distributor' },
  { id: 'cust_5', name: 'Annapurna Foods', phone: '9876543214', email: 'anna@foods.in', address: 'Industrial Area, Pune', balance: 450000, type: 'dealer' },
  { id: 'cust_6', name: 'Fresh & Pure Retail', phone: '9876543215', email: 'fresh@pure.in', address: 'Mall Road, Mumbai', balance: 72000, type: 'retail' },
  { id: 'cust_7', name: 'Daily Needs Store', phone: '9876543216', email: 'daily@needs.in', address: 'Market Street, Bangalore', balance: 48000, type: 'retail' },
  { id: 'cust_8', name: 'Sharma Provisions', phone: '9876543217', email: 'sharma@prov.in', address: 'Civil Lines, Lucknow', balance: 156000, type: 'dealer' },
];

export const mockVendors: Vendor[] = [
  { id: 'ven_1', name: 'Ramesh Kumar (Farmer)', phone: '9812345671', email: 'ramesh@farm.in', address: 'Village Gopalnagar', balance: 125000, type: 'farmer' },
  { id: 'ven_2', name: 'Suresh Yadav (Farmer)', phone: '9812345672', email: 'suresh@farm.in', address: 'Village Keshavpura', balance: 98000, type: 'farmer' },
  { id: 'ven_3', name: 'Laxmi Dairy Farm', phone: '9812345673', email: 'laxmi@farm.in', address: 'Village Shivnagar', balance: 210000, type: 'farmer' },
  { id: 'ven_4', name: 'Mahesh Cattle Ranch', phone: '9812345674', email: 'mahesh@ranch.in', address: 'Tehsil Malpura', balance: 175000, type: 'farmer' },
  { id: 'ven_5', name: 'Geeta Goat & Cow Farm', phone: '9812345675', email: 'geeta@farm.in', address: 'Village Chandpura', balance: 88000, type: 'farmer' },
  { id: 'ven_6', name: 'PakMaster Packaging', phone: '9812345676', email: 'pak@master.in', address: 'GIDC, Ahmedabad', balance: 45000, type: 'supplier' },
  { id: 'ven_7', name: 'ColdChain Logistics', phone: '9812345677', email: 'cold@chain.in', address: 'Transport Nagar, Delhi', balance: 62000, type: 'transporter' },
  { id: 'ven_8', name: 'Bharat Chemicals', phone: '9812345678', email: 'bharat@chem.in', address: 'Industrial Estate, Vadodara', balance: 33000, type: 'supplier' },
  { id: 'ven_9', name: 'Singh Transport Co.', phone: '9812345679', email: 'singh@trans.in', address: 'Highway Plaza, Rajkot', balance: 41000, type: 'transporter' },
  { id: 'ven_10', name: 'Kisan Dairy Coop', phone: '9812345680', email: 'kisan@coop.in', address: 'Block HQ, Sikar', balance: 155000, type: 'farmer' },
];

export const mockInvoices: Invoice[] = [
  { id: 'inv_1', number: 'INV-2024-001', customerId: 'cust_1', customerName: 'Ravi Dairy Distributors', date: '2024-03-01', dueDate: '2024-03-15', items: [{ itemName: 'Full Cream Milk', qty: 2000, rate: 62, amount: 124000 }, { itemName: 'Plain Curd', qty: 500, rate: 55, amount: 27500 }], total: 151500, status: 'paid' },
  { id: 'inv_2', number: 'INV-2024-002', customerId: 'cust_2', customerName: 'Metro Milk Mart', date: '2024-03-03', dueDate: '2024-03-17', items: [{ itemName: 'Toned Milk', qty: 3000, rate: 50, amount: 150000 }], total: 150000, status: 'paid' },
  { id: 'inv_3', number: 'INV-2024-003', customerId: 'cust_3', customerName: 'Krishna Dairy Chain', date: '2024-03-05', dueDate: '2024-03-19', items: [{ itemName: 'A2 Milk (Desi Cow)', qty: 1000, rate: 80, amount: 80000 }, { itemName: 'Ghee', qty: 100, rate: 520, amount: 52000 }, { itemName: 'Paneer', qty: 200, rate: 320, amount: 64000 }], total: 196000, status: 'sent' },
  { id: 'inv_4', number: 'INV-2024-004', customerId: 'cust_5', customerName: 'Annapurna Foods', date: '2024-03-07', dueDate: '2024-03-21', items: [{ itemName: 'Greek Yogurt', qty: 300, rate: 120, amount: 36000 }, { itemName: 'Buttermilk', qty: 1500, rate: 25, amount: 37500 }], total: 73500, status: 'overdue' },
  { id: 'inv_5', number: 'INV-2024-005', customerId: 'cust_4', customerName: 'GoMilk Express', date: '2024-03-08', dueDate: '2024-03-22', items: [{ itemName: 'Buffalo Milk', qty: 2500, rate: 70, amount: 175000 }], total: 175000, status: 'sent' },
  { id: 'inv_6', number: 'INV-2024-006', customerId: 'cust_1', customerName: 'Ravi Dairy Distributors', date: '2024-03-10', dueDate: '2024-03-24', items: [{ itemName: 'Full Cream Milk', qty: 1800, rate: 62, amount: 111600 }, { itemName: 'Lassi (Sweet)', qty: 800, rate: 35, amount: 28000 }], total: 139600, status: 'draft' },
  { id: 'inv_7', number: 'INV-2024-007', customerId: 'cust_6', customerName: 'Fresh & Pure Retail', date: '2024-03-11', dueDate: '2024-03-25', items: [{ itemName: 'Standardized Milk', qty: 500, rate: 54, amount: 27000 }, { itemName: 'Plain Curd', qty: 200, rate: 55, amount: 11000 }], total: 38000, status: 'paid' },
  { id: 'inv_8', number: 'INV-2024-008', customerId: 'cust_7', customerName: 'Daily Needs Store', date: '2024-03-12', dueDate: '2024-03-26', items: [{ itemName: 'Toned Milk', qty: 300, rate: 50, amount: 15000 }], total: 15000, status: 'paid' },
  { id: 'inv_9', number: 'INV-2024-009', customerId: 'cust_8', customerName: 'Sharma Provisions', date: '2024-03-13', dueDate: '2024-03-27', items: [{ itemName: 'Skimmed Milk', qty: 1200, rate: 42, amount: 50400 }, { itemName: 'Paneer', qty: 150, rate: 320, amount: 48000 }], total: 98400, status: 'sent' },
  { id: 'inv_10', number: 'INV-2024-010', customerId: 'cust_2', customerName: 'Metro Milk Mart', date: '2024-03-14', dueDate: '2024-03-28', items: [{ itemName: 'Full Cream Milk', qty: 4000, rate: 62, amount: 248000 }], total: 248000, status: 'overdue' },
  { id: 'inv_11', number: 'INV-2024-011', customerId: 'cust_3', customerName: 'Krishna Dairy Chain', date: '2024-03-15', dueDate: '2024-03-29', items: [{ itemName: 'Ghee', qty: 200, rate: 520, amount: 104000 }], total: 104000, status: 'sent' },
  { id: 'inv_12', number: 'INV-2024-012', customerId: 'cust_5', customerName: 'Annapurna Foods', date: '2024-03-16', dueDate: '2024-03-30', items: [{ itemName: 'Buffalo Milk', qty: 1500, rate: 70, amount: 105000 }, { itemName: 'Greek Yogurt', qty: 200, rate: 120, amount: 24000 }], total: 129000, status: 'draft' },
  { id: 'inv_13', number: 'INV-2024-013', customerId: 'cust_4', customerName: 'GoMilk Express', date: '2024-03-17', dueDate: '2024-03-31', items: [{ itemName: 'Toned Milk', qty: 2000, rate: 50, amount: 100000 }], total: 100000, status: 'paid' },
  { id: 'inv_14', number: 'INV-2024-014', customerId: 'cust_1', customerName: 'Ravi Dairy Distributors', date: '2024-03-18', dueDate: '2024-04-01', items: [{ itemName: 'A2 Milk (Desi Cow)', qty: 800, rate: 80, amount: 64000 }, { itemName: 'Buttermilk', qty: 1000, rate: 25, amount: 25000 }], total: 89000, status: 'sent' },
  { id: 'inv_15', number: 'INV-2024-015', customerId: 'cust_6', customerName: 'Fresh & Pure Retail', date: '2024-03-19', dueDate: '2024-04-02', items: [{ itemName: 'Plain Curd', qty: 400, rate: 55, amount: 22000 }], total: 22000, status: 'paid' },
  { id: 'inv_16', number: 'INV-2024-016', customerId: 'cust_8', customerName: 'Sharma Provisions', date: '2024-03-20', dueDate: '2024-04-03', items: [{ itemName: 'Standardized Milk', qty: 1500, rate: 54, amount: 81000 }, { itemName: 'Lassi (Sweet)', qty: 600, rate: 35, amount: 21000 }], total: 102000, status: 'overdue' },
  { id: 'inv_17', number: 'INV-2024-017', customerId: 'cust_7', customerName: 'Daily Needs Store', date: '2024-03-21', dueDate: '2024-04-04', items: [{ itemName: 'Skimmed Milk', qty: 500, rate: 42, amount: 21000 }], total: 21000, status: 'draft' },
  { id: 'inv_18', number: 'INV-2024-018', customerId: 'cust_2', customerName: 'Metro Milk Mart', date: '2024-03-22', dueDate: '2024-04-05', items: [{ itemName: 'Paneer', qty: 100, rate: 320, amount: 32000 }, { itemName: 'Ghee', qty: 50, rate: 520, amount: 26000 }], total: 58000, status: 'sent' },
  { id: 'inv_19', number: 'INV-2024-019', customerId: 'cust_3', customerName: 'Krishna Dairy Chain', date: '2024-03-23', dueDate: '2024-04-06', items: [{ itemName: 'Full Cream Milk', qty: 3000, rate: 62, amount: 186000 }], total: 186000, status: 'paid' },
  { id: 'inv_20', number: 'INV-2024-020', customerId: 'cust_5', customerName: 'Annapurna Foods', date: '2024-03-24', dueDate: '2024-04-07', items: [{ itemName: 'Toned Milk', qty: 2500, rate: 50, amount: 125000 }, { itemName: 'Plain Curd', qty: 300, rate: 55, amount: 16500 }], total: 141500, status: 'sent' },
];

export const mockBills: Bill[] = [
  { id: 'bill_1', number: 'BILL-2024-001', vendorId: 'ven_1', vendorName: 'Ramesh Kumar (Farmer)', date: '2024-03-01', dueDate: '2024-03-10', items: [{ itemName: 'Raw Milk', qty: 3000, rate: 38, amount: 114000 }], total: 114000, status: 'paid' },
  { id: 'bill_2', number: 'BILL-2024-002', vendorId: 'ven_2', vendorName: 'Suresh Yadav (Farmer)', date: '2024-03-02', dueDate: '2024-03-11', items: [{ itemName: 'Raw Milk', qty: 2500, rate: 38, amount: 95000 }], total: 95000, status: 'paid' },
  { id: 'bill_3', number: 'BILL-2024-003', vendorId: 'ven_3', vendorName: 'Laxmi Dairy Farm', date: '2024-03-03', dueDate: '2024-03-12', items: [{ itemName: 'A2 Raw Milk', qty: 2000, rate: 52, amount: 104000 }], total: 104000, status: 'received' },
  { id: 'bill_4', number: 'BILL-2024-004', vendorId: 'ven_6', vendorName: 'PakMaster Packaging', date: '2024-03-05', dueDate: '2024-03-20', items: [{ itemName: 'Milk Pouches (1L)', qty: 10000, rate: 2.5, amount: 25000 }, { itemName: 'Curd Cups (200g)', qty: 5000, rate: 3, amount: 15000 }], total: 40000, status: 'paid' },
  { id: 'bill_5', number: 'BILL-2024-005', vendorId: 'ven_7', vendorName: 'ColdChain Logistics', date: '2024-03-06', dueDate: '2024-03-20', items: [{ itemName: 'Cold Transport - March', qty: 1, rate: 85000, amount: 85000 }], total: 85000, status: 'overdue' },
  { id: 'bill_6', number: 'BILL-2024-006', vendorId: 'ven_4', vendorName: 'Mahesh Cattle Ranch', date: '2024-03-08', dueDate: '2024-03-17', items: [{ itemName: 'Raw Milk', qty: 3500, rate: 40, amount: 140000 }], total: 140000, status: 'received' },
  { id: 'bill_7', number: 'BILL-2024-007', vendorId: 'ven_5', vendorName: 'Geeta Goat & Cow Farm', date: '2024-03-10', dueDate: '2024-03-19', items: [{ itemName: 'Raw Milk', qty: 1800, rate: 39, amount: 70200 }], total: 70200, status: 'draft' },
  { id: 'bill_8', number: 'BILL-2024-008', vendorId: 'ven_8', vendorName: 'Bharat Chemicals', date: '2024-03-12', dueDate: '2024-03-27', items: [{ itemName: 'Cleaning Agents', qty: 50, rate: 450, amount: 22500 }], total: 22500, status: 'paid' },
  { id: 'bill_9', number: 'BILL-2024-009', vendorId: 'ven_10', vendorName: 'Kisan Dairy Coop', date: '2024-03-14', dueDate: '2024-03-23', items: [{ itemName: 'Raw Milk', qty: 4000, rate: 37, amount: 148000 }], total: 148000, status: 'received' },
  { id: 'bill_10', number: 'BILL-2024-010', vendorId: 'ven_9', vendorName: 'Singh Transport Co.', date: '2024-03-16', dueDate: '2024-03-30', items: [{ itemName: 'Local Distribution - March', qty: 1, rate: 42000, amount: 42000 }], total: 42000, status: 'draft' },
];

export const mockExpenses: Expense[] = [
  { id: 'exp_1', date: '2024-03-02', category: 'Electricity', description: 'Plant electricity - March', amount: 45000, paidVia: 'Bank Transfer', vendor: 'State Electricity Board' },
  { id: 'exp_2', date: '2024-03-05', category: 'Salary', description: 'Staff salary - February', amount: 280000, paidVia: 'Bank Transfer', vendor: 'Internal' },
  { id: 'exp_3', date: '2024-03-08', category: 'Maintenance', description: 'Chiller repair', amount: 18500, paidVia: 'Cash', vendor: 'Cool Tech Services' },
  { id: 'exp_4', date: '2024-03-10', category: 'Fuel', description: 'Delivery vehicles diesel', amount: 32000, paidVia: 'Fuel Card', vendor: 'Indian Oil' },
  { id: 'exp_5', date: '2024-03-12', category: 'Insurance', description: 'Vehicle insurance renewal', amount: 65000, paidVia: 'Bank Transfer', vendor: 'ICICI Lombard' },
  { id: 'exp_6', date: '2024-03-15', category: 'Quality Testing', description: 'Lab testing fees', amount: 12000, paidVia: 'UPI', vendor: 'FSSAI Lab' },
  { id: 'exp_7', date: '2024-03-18', category: 'Office', description: 'Office supplies & stationery', amount: 5500, paidVia: 'Cash', vendor: 'Stationery Mart' },
  { id: 'exp_8', date: '2024-03-20', category: 'Marketing', description: 'Local newspaper ad', amount: 15000, paidVia: 'Bank Transfer', vendor: 'Dainik Bhaskar' },
];

export const mockPayments: Payment[] = [
  { id: 'pay_1', date: '2024-03-02', type: 'received', party: 'Ravi Dairy Distributors', amount: 151500, method: 'RTGS', reference: 'UTR001234' },
  { id: 'pay_2', date: '2024-03-04', type: 'received', party: 'Metro Milk Mart', amount: 150000, method: 'NEFT', reference: 'UTR001235' },
  { id: 'pay_3', date: '2024-03-05', type: 'made', party: 'Ramesh Kumar (Farmer)', amount: 114000, method: 'RTGS', reference: 'UTR001236' },
  { id: 'pay_4', date: '2024-03-06', type: 'made', party: 'Suresh Yadav (Farmer)', amount: 95000, method: 'RTGS', reference: 'UTR001237' },
  { id: 'pay_5', date: '2024-03-08', type: 'received', party: 'Fresh & Pure Retail', amount: 38000, method: 'UPI', reference: 'UPI001238' },
  { id: 'pay_6', date: '2024-03-10', type: 'made', party: 'PakMaster Packaging', amount: 40000, method: 'NEFT', reference: 'UTR001239' },
  { id: 'pay_7', date: '2024-03-12', type: 'received', party: 'Daily Needs Store', amount: 15000, method: 'UPI', reference: 'UPI001240' },
  { id: 'pay_8', date: '2024-03-14', type: 'received', party: 'GoMilk Express', amount: 100000, method: 'RTGS', reference: 'UTR001241' },
  { id: 'pay_9', date: '2024-03-15', type: 'made', party: 'Bharat Chemicals', amount: 22500, method: 'NEFT', reference: 'UTR001242' },
  { id: 'pay_10', date: '2024-03-18', type: 'received', party: 'Krishna Dairy Chain', amount: 186000, method: 'RTGS', reference: 'UTR001243' },
  { id: 'pay_11', date: '2024-03-20', type: 'received', party: 'Fresh & Pure Retail', amount: 22000, method: 'UPI', reference: 'UPI001244' },
];

export const mockBanks: BankAccount[] = [
  { id: 'bank_1', name: 'Main Operating Account', type: 'bank', balance: 2450000, bankName: 'HDFC Bank', accountNumber: 'XXXX4521' },
  { id: 'bank_2', name: 'Salary Account', type: 'bank', balance: 380000, bankName: 'SBI', accountNumber: 'XXXX7832' },
  { id: 'bank_3', name: 'Petty Cash', type: 'cash', balance: 45000, bankName: '-', accountNumber: '-' },
  { id: 'bank_4', name: 'Tax Reserve Account', type: 'bank', balance: 520000, bankName: 'ICICI Bank', accountNumber: 'XXXX1190' },
];

export const mockBudgets: Budget[] = [
  { id: 'bud_1', name: 'Farmer Procurement', period: 'March 2024', allocated: 800000, spent: 671200, category: 'Procurement' },
  { id: 'bud_2', name: 'Transport & Logistics', period: 'March 2024', allocated: 150000, spent: 127000, category: 'Operations' },
  { id: 'bud_3', name: 'Staff Salary', period: 'March 2024', allocated: 300000, spent: 280000, category: 'HR' },
  { id: 'bud_4', name: 'Marketing', period: 'March 2024', allocated: 50000, spent: 15000, category: 'Marketing' },
  { id: 'bud_5', name: 'Maintenance', period: 'March 2024', allocated: 40000, spent: 18500, category: 'Operations' },
  { id: 'bud_6', name: 'Packaging', period: 'March 2024', allocated: 60000, spent: 40000, category: 'Operations' },
];

export const mockRisks: RiskItem[] = [
  { id: 'risk_1', title: 'Metro Milk Mart — ₹2.48L overdue', severity: 'high', category: 'Receivables', description: 'Invoice INV-2024-010 is 15 days overdue. Customer has history of late payments.', impact: 'Cash flow pressure on farmer payments', status: 'active', date: '2024-03-28' },
  { id: 'risk_2', title: 'ColdChain Logistics — transport bill overdue', severity: 'medium', category: 'Payables', description: 'BILL-2024-005 for ₹85,000 is overdue. Risk of service disruption.', impact: 'Delivery delays possible', status: 'active', date: '2024-03-20' },
  { id: 'risk_3', title: 'Procurement budget 84% utilized', severity: 'medium', category: 'Budget', description: 'Farmer procurement budget is at 84% with 10 days remaining in March.', impact: 'May need emergency budget approval', status: 'monitoring', date: '2024-03-20' },
  { id: 'risk_4', title: 'A2 Milk stock low — 1,500L only', severity: 'high', category: 'Inventory', description: 'A2 Milk stock dropping below safety threshold. Weekly demand is ~1,200L.', impact: 'Potential stockout within 9 days', status: 'active', date: '2024-03-22' },
  { id: 'risk_5', title: 'GST filing deadline approaching', severity: 'low', category: 'Compliance', description: 'GSTR-3B due by March 20. All data available for filing.', impact: 'Late fee penalty of ₹5,000+', status: 'mitigated', date: '2024-03-15' },
  { id: 'risk_6', title: 'Ghee margin declining — down 3%', severity: 'medium', category: 'Margin', description: 'Ghee production cost increased due to higher milk prices, margin dropped from 18% to 15%.', impact: '₹15,600 less profit per month on current volumes', status: 'active', date: '2024-03-18' },
];

export const mockAgents: Agent[] = [
  {
    id: 'agent_1',
    name: 'Financial Planner',
    role: 'Analyzes P&L, forecasts revenue, suggests cost optimization',
    status: 'completed',
    accuracy: 94,
    tasksCompleted: 47,
    savedAmount: 320000,
    lastDecision: 'Recommended shifting ₹50K from marketing to procurement budget',
    lastRun: '2024-03-24T14:30:00',
    performanceGoals: ['Maintain forecast accuracy >90%', 'Optimize budget allocation to reduce waste by 5%', 'Identify revenue leakage points'],
    responsibilities: ['Analyze daily P&L statements', 'Forecast monthly revenue based on historical data', 'Recommend budget reallocations']
  },
  {
    id: 'agent_2',
    name: 'Budget Controller',
    role: 'Monitors spending against allocated budgets',
    status: 'running',
    accuracy: 97,
    tasksCompleted: 62,
    savedAmount: 185000,
    lastDecision: 'Flagged transport budget at 85% utilization',
    lastRun: '2024-03-24T15:00:00',
    performanceGoals: ['Prevent budget overruns >2%', 'Ensure real-time expense tracking', 'Alert stakeholders on critical thresholds'],
    responsibilities: ['Monitor category-wise spending', 'Flag abnormal expense patterns', 'Auto-freeze budgets entering critical zones']
  },
  {
    id: 'agent_3',
    name: 'Cash Flow Forecaster',
    role: 'Predicts cash position for next 30/60/90 days',
    status: 'completed',
    accuracy: 91,
    tasksCompleted: 31,
    savedAmount: 0,
    lastDecision: 'Forecasted ₹4.2L cash shortfall in April if overdue invoices not collected',
    lastRun: '2024-03-24T13:00:00',
    performanceGoals: ['Predict cash crunch 15 days in advance', 'Optimize working capital cycle'],
    responsibilities: ['Analyze receivable vs payable timelines', 'Simulate cash flow scenarios', 'Recommend payment scheduling adjustments']
  },
  {
    id: 'agent_4',
    name: 'Risk Assessor',
    role: 'Identifies and scores financial risks across operations',
    status: 'running',
    accuracy: 89,
    tasksCompleted: 28,
    savedAmount: 450000,
    lastDecision: 'Elevated Metro Milk Mart risk to HIGH due to payment pattern',
    lastRun: '2024-03-24T15:15:00',
    performanceGoals: ['Detect high-risk counterparties early', 'Minimise bad debt exposure'],
    responsibilities: ['Score customer creditworthiness', 'Monitor market volatility risks', 'Assess operational dependency risks']
  },
  {
    id: 'agent_5',
    name: 'Compliance Auditor',
    role: 'Monitors GST, TDS, and regulatory compliance',
    status: 'idle',
    accuracy: 99,
    tasksCompleted: 15,
    savedAmount: 75000,
    lastDecision: 'Confirmed GSTR-3B data ready for March filing',
    lastRun: '2024-03-24T10:00:00',
    performanceGoals: ['Zero compliance penalty target', '100% accurate tax computation'],
    responsibilities: ['Verify invoice tax codes (HSN)', 'Reconcile input tax credit', 'Schedule statutory filings']
  },
  {
    id: 'agent_6',
    name: 'Pricing & Margin Agent',
    role: 'Optimizes product pricing based on costs and market',
    status: 'completed',
    accuracy: 87,
    tasksCompleted: 22,
    savedAmount: 210000,
    lastDecision: 'Suggested ₹3/L price increase on A2 Milk to maintain 20% margin',
    lastRun: '2024-03-24T12:00:00',
    performanceGoals: ['Maintain product margins >15%', 'Respond to input cost changes within 24h'],
    responsibilities: ['Analyze input cost fluctuations', 'Monitor competitor pricing', 'Suggest logic-backed price adjustments']
  },
  {
    id: 'agent_7',
    name: 'Farmer Payment Optimizer',
    role: 'Schedules and optimizes farmer payments for cash flow',
    status: 'running',
    accuracy: 93,
    tasksCompleted: 38,
    savedAmount: 165000,
    lastDecision: 'Proposed staggered payments: ₹3L today, ₹2L on 28th to maintain liquidity',
    lastRun: '2024-03-24T14:45:00',
    performanceGoals: ['Maintain vendor satisfaction score >4.5', 'Optimize float interest'],
    responsibilities: ['Schedule payment batches', 'Balance liquidity vs vendor trust', 'Execute bulk payout transactions']
  },
  {
    id: 'agent_8',
    name: 'Collection Agent',
    role: 'Tracks overdue invoices and suggests collection actions',
    status: 'completed',
    accuracy: 86,
    tasksCompleted: 19,
    savedAmount: 520000,
    lastDecision: 'Sent payment reminder to Annapurna Foods for ₹73.5K overdue',
    lastRun: '2024-03-24T11:30:00',
    performanceGoals: ['Reduce Days Sales Outstanding (DSO) by 10%', 'Automate 80% of reminders'],
    responsibilities: ['Track aging receivables', 'Send automated payment nudges', 'Escalate chronic defaulters to Risk Agent']
  },
];

export const mockApprovals: Approval[] = [
  { id: 'appr_1', type: 'Payment', description: 'Pay farmers ₹5,00,000 — staggered batch', amount: 500000, requester: 'Farmer Payment Optimizer', approver: 'CFO', status: 'pending', date: '2024-03-24T14:45:00', agentId: 'agent_7' },
  { id: 'appr_2', type: 'Budget Reallocation', description: 'Move ₹50K from Marketing to Procurement', amount: 50000, requester: 'Financial Planner', approver: 'Manager', status: 'pending', date: '2024-03-24T14:30:00', agentId: 'agent_1' },
  { id: 'appr_3', type: 'Price Change', description: 'Increase A2 Milk price by ₹3/L', amount: 0, requester: 'Pricing & Margin Agent', approver: 'Manager', status: 'pending', date: '2024-03-24T12:00:00', agentId: 'agent_6' },
  { id: 'appr_4', type: 'Invoice', description: 'Generate credit note for Ravi ₹12,400 (quality issue)', amount: 12400, requester: 'Accountant', approver: 'Manager', status: 'approved', date: '2024-03-23T16:00:00' },
  { id: 'appr_5', type: 'Expense', description: 'Emergency chiller repair ₹18,500', amount: 18500, requester: 'Plant Manager', approver: 'Manager', status: 'approved', date: '2024-03-22T09:30:00' },
];

export const mockAuditLog: AuditLogEntry[] = [
  { id: 'aud_1', timestamp: '2024-03-24T15:15:00', actor: 'Risk Assessor', actorType: 'ai', action: 'Risk Elevated', entity: 'Risk', entityId: 'risk_1', before: 'Start: Medium', after: 'High', reason: 'Payment pattern analysis shows consistent delays from Metro Milk Mart' },
  { id: 'aud_2', timestamp: '2024-03-24T14:45:00', actor: 'Farmer Payment Optimizer', actorType: 'ai', action: 'Payment Proposed', entity: 'Approval', entityId: 'appr_1', amount: 500000, reason: 'Staggered payment maintains liquidity while ensuring farmer trust' },
  { id: 'aud_3', timestamp: '2024-03-24T14:30:00', actor: 'Financial Planner', actorType: 'ai', action: 'Budget Reallocated', entity: 'Budget', entityId: 'bud_4', amount: 50000, before: 'Marketing', after: 'Procurement', reason: 'Marketing underspent, procurement needs more due to seasonal demand' },
  { id: 'aud_4', timestamp: '2024-03-24T12:00:00', actor: 'Pricing Agent', actorType: 'ai', action: 'Price Increased', entity: 'Item', entityId: 'item_5', before: '₹80 / L', after: '₹83 / L', reason: 'Input cost increase of 4%, need to maintain 20% margin target' },
  { id: 'aud_5', timestamp: '2024-03-23T16:00:00', actor: 'Admin User', actorType: 'human', action: 'Approval Granted', entity: 'Approval', entityId: 'appr_4', amount: 12400, reason: 'Quality issue confirmed by lab report' },
  { id: 'aud_6', timestamp: '2024-03-23T11:00:00', actor: 'Admin User', actorType: 'human', action: 'Invoice Created', entity: 'Invoice', entityId: 'inv_20', amount: 141500, reason: 'Monthly order from Annapurna Foods' },
  { id: 'aud_7', timestamp: '2024-03-22T09:30:00', actor: 'Plant Manager', actorType: 'human', action: 'Expense Approved', entity: 'Expense', entityId: 'exp_3', amount: 18500, reason: 'Critical equipment failure' },
  { id: 'aud_8', timestamp: '2024-03-22T08:00:00', actor: 'Collection Agent', actorType: 'ai', action: 'Reminder Sent', entity: 'Invoice', entityId: 'inv_4', amount: 73500, reason: 'Invoice 7 days overdue, automated reminder triggered' },
];

export const mockActivities: ActivityItem[] = [
  { id: 'act_1', timestamp: '2024-03-24T15:15:00', type: 'risk', title: 'Risk Elevated', description: 'Metro Milk Mart risk raised to HIGH — ₹2.48L overdue' },
  { id: 'act_2', timestamp: '2024-03-24T15:00:00', type: 'agent', title: 'Budget Controller Running', description: 'Scanning all budget categories for March utilization' },
  { id: 'act_3', timestamp: '2024-03-24T14:45:00', type: 'approval', title: 'Approval Required', description: 'Farmer payment ₹5L needs CFO approval' },
  { id: 'act_4', timestamp: '2024-03-24T14:30:00', type: 'agent', title: 'Financial Planner Complete', description: 'Recommended budget reallocation: Marketing → Procurement' },
  { id: 'act_5', timestamp: '2024-03-24T14:00:00', type: 'payment', title: 'Payment Received', description: '₹22,000 from Fresh & Pure Retail via UPI' },
  { id: 'act_6', timestamp: '2024-03-24T13:00:00', type: 'agent', title: 'Cash Flow Forecast', description: 'April shortfall predicted: ₹4.2L if overdue not collected' },
  { id: 'act_7', timestamp: '2024-03-24T12:00:00', type: 'agent', title: 'Price Suggestion', description: 'A2 Milk price increase ₹80→₹83/L recommended' },
  { id: 'act_8', timestamp: '2024-03-24T11:30:00', type: 'agent', title: 'Collection Reminder', description: 'Payment reminder sent to Annapurna Foods — ₹73.5K overdue' },
  { id: 'act_9', timestamp: '2024-03-24T10:00:00', type: 'agent', title: 'Compliance Check', description: 'GSTR-3B data validated and ready for filing' },
  { id: 'act_10', timestamp: '2024-03-23T16:00:00', type: 'approval', title: 'Approval Granted', description: 'Credit note ₹12,400 for Ravi approved by Admin' },
  { id: 'act_11', timestamp: '2024-03-23T11:00:00', type: 'edit', title: 'Invoice Created', description: 'INV-2024-020 created for Annapurna Foods — ₹1,41,500' },
  { id: 'act_12', timestamp: '2024-03-22T09:30:00', type: 'approval', title: 'Expense Approved', description: 'Emergency chiller repair ₹18,500 approved' },
  { id: 'act_13', timestamp: '2024-03-22T08:00:00', type: 'agent', title: 'Auto Reminder', description: 'Overdue reminder sent to Annapurna Foods for INV-2024-004' },
  { id: 'act_14', timestamp: '2024-03-21T15:00:00', type: 'error', title: 'Sync Warning', description: 'Bank reconciliation mismatch detected — ₹2,340 difference' },
];

// Helper to format currency
export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatFullCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
