import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Sidebar from '../components/Sidebar';
import { TrendingUp, TrendingDown, Trash2, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

const Transactions = () => {
  const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);

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

  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">All Transactions</h2>
          <p className="text-gray-500 mt-1">View and manage all your income and expense transactions.</p>
        </header>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Income</p>
                <h3 className="text-2xl font-bold text-gray-800">₹{income.toLocaleString()}</h3>
                <p className="text-xs text-gray-400 mt-1">{incomeTransactions.length} transactions</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-2xl text-red-600">
                <TrendingDown size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Expenses</p>
                <h3 className="text-2xl font-bold text-gray-800">₹{expense.toLocaleString()}</h3>
                <p className="text-xs text-gray-400 mt-1">{expenseTransactions.length} transactions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Income Transactions */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Income Transactions</h3>
            {incomeTransactions.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center text-gray-400 border border-dashed border-gray-300">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No income transactions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {incomeTransactions.map(t => (
                  <div key={t._id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-green-100 p-3 rounded-xl text-green-600">
                        <TrendingUp size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{t.title}</p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span className="capitalize">{t.category}</span>
                          <span>{format(new Date(t.date), 'dd MMM yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-lg text-green-600">+₹{t.amount.toLocaleString()}</p>
                      <button 
                        onClick={() => deleteTransaction(t._id)}
                        className="text-gray-300 hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Expense Transactions */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Expense Transactions</h3>
            {expenseTransactions.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center text-gray-400 border border-dashed border-gray-300">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No expense transactions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {expenseTransactions.map(t => (
                  <div key={t._id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-red-100 p-3 rounded-xl text-red-600">
                        <TrendingDown size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{t.title}</p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span className="capitalize">{t.category}</span>
                          <span>{format(new Date(t.date), 'dd MMM yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-lg text-red-600">-₹{t.amount.toLocaleString()}</p>
                      <button 
                        onClick={() => deleteTransaction(t._id)}
                        className="text-gray-300 hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
