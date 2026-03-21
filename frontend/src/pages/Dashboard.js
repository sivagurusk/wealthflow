import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Sidebar from '../components/Sidebar';
import TransactionForm from '../components/TransactionForm';
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);
  const [showForm, setShowForm] = useState(false);
  const [chartType, setChartType] = useState('pie'); // 'pie' or 'bar'

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, current) => acc + current.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, current) => acc + current.amount, 0);

  const balance = income - expense;

  // Calculate expense breakdown by category
  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  const COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F97316'];

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Personal Wealth & Expense Tracker</h2>
            <p className="text-gray-500 mt-1">Manage your finances with ease</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md"
          >
            + Add Transaction
          </button>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Income</p>
                <h3 className="text-3xl font-bold text-emerald-600 mt-2">₹{income.toLocaleString()}</h3>
                <p className="text-xs text-gray-400 mt-1">All time earnings</p>
              </div>
              <TrendingUp className="text-emerald-400 opacity-20" size={48} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
                <h3 className="text-3xl font-bold text-red-600 mt-2">₹{expense.toLocaleString()}</h3>
                <p className="text-xs text-gray-400 mt-1">All time spending</p>
              </div>
              <TrendingDown className="text-red-400 opacity-20" size={48} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Net Balance</p>
                <h3 className="text-3xl font-bold text-emerald-600 mt-2">₹{balance.toLocaleString()}</h3>
                <p className="text-xs text-gray-400 mt-1">Current balance</p>
              </div>
              <PieChartIcon className="text-blue-400 opacity-20" size={48} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-8">
          {/* Expense Breakdown */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-800">Expense Breakdown</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    chartType === 'pie'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pie
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    chartType === 'bar'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bar
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">Expenses by category</p>
            
            {expenseByCategory.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <p>No expenses yet</p>
              </div>
            ) : chartType === 'pie' ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ₹${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Recent Transactions</h3>
            <p className="text-sm text-gray-500 mb-6">Your latest financial activity</p>
            
            {recentTransactions.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <p>No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map(t => (
                  <div key={t._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                    <div className="flex items-center gap-4 flex-1">
                      <div>
                        <p className="font-semibold text-gray-800">{t.title}</p>
                        <div className="text-xs text-gray-500">
                          <span className={`inline-block px-2 py-1 rounded text-white mr-2 ${t.type === 'income' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                            {t.type}
                          </span>
                          <span>{t.category}</span>
                          <span className="ml-2">•</span>
                          <span className="ml-2">{format(new Date(t.date), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className={`font-bold text-lg ${t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                      </p>
                      <button 
                        onClick={() => deleteTransaction(t._id)}
                        className="text-gray-300 hover:text-red-500 transition"
                        title="Delete transaction"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transaction Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-y-auto" style={{ width: '500px', height: '500px' }}>
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <TransactionForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
