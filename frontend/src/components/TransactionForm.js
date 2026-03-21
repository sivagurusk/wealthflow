import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { toast } from 'react-hot-toast';

const TransactionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const { addTransaction } = useContext(GlobalContext);

  const categories = {
    expense: ['Bills & Utilities', 'Groceries', 'Entertainment', 'Transport', 'Healthcare', 'Shopping', 'Food', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Bonus', 'Other']
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
      return toast.error("Please fill all required fields");
    }

    const res = await addTransaction({
      title: formData.title,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      notes: formData.notes
    });

    if (res.success) {
      toast.success("Transaction added!");
      setFormData({ 
        title: '', 
        amount: '', 
        type: 'expense', 
        category: '', 
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast.error(res.message || "Failed to add transaction");
    }
  };

  const currentCategories = categories[formData.type] || [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Transaction</h2>
      <p className="text-gray-600 text-sm mb-6">Enter your transaction details</p>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value, category: '' })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 font-medium"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
          <input
            type="text"
            placeholder="e.g., Grocery Shopping"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Amount (₹)</label>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 font-medium"
          >
            <option value="">Select category</option>
            {currentCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Notes (optional)</label>
          <textarea
            placeholder="Add any additional notes..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
