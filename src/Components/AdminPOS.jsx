import { useState, useEffect } from "react";
import { Plus, History, Download } from "lucide-react";

const AdminPOS = () => {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem("juice_sales");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("juice_sales", JSON.stringify(sales));
  }, [sales]);

  const logSale = (size, price) => {
    const entry = { id: Date.now(), size, price, time: new Date().toLocaleString() };
    setSales([entry, ...sales]);
  };

  const downloadReport = () => {
    const reportData = sales.map(s => `${s.time} - ${s.size}: ₹${s.price}`).join('\n');
    const blob = new Blob([`DAILY SALES REPORT\n\n${reportData}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sales-report-${new Date().toLocaleDateString()}.txt`;
    link.click();
  };

  const totalRevenue = sales.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Panchkula Shop</h1>
          <p className="text-gray-500 text-lg">Daily Operations Dashboard</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button onClick={downloadReport} className="flex items-center gap-2 text-xs text-blue-600 hover:underline">
            <Download size={14} /> Download Report
          </button>
          <div className="text-right">
            <p className="text-sm uppercase tracking-widest text-gray-400">Revenue</p>
            <p className="text-3xl font-medium text-green-700">₹{totalRevenue}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductCard size="60ml" name="Standard Shot" price={80} onLog={logSale} />
        <ProductCard size="120ml" name="Double Power" price={100} onLog={logSale} />
      </div>

      <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-2 text-gray-700">
          <History size={20} className="text-gray-400" />
          <h3 className="font-medium">Recent Transactions</h3>
        </div>
        <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
          {sales.length === 0 ? (
            <p className="p-10 text-center text-gray-400">No logs found.</p>
          ) : (
            sales.map((sale) => (
              <div key={sale.id} className="flex justify-between p-5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium">{sale.size} Wheatgrass</p>
                  <p className="text-xs text-gray-400 font-mono">{sale.time}</p>
                </div>
                <p className="font-semibold text-gray-800">₹{sale.price}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

// Internal sub-component for the buttons
const ProductCard = ({ size, name, price, onLog }) => (
  <div onClick={() => onLog(size, price)} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-gray-100 active:scale-95">
    <div className="flex justify-between items-center mb-4">
      <span className="text-green-600 font-bold italic text-xl tracking-tighter">{size}</span>
      <Plus className="text-gray-300 group-hover:text-green-500 transition-colors" />
    </div>
    <h2 className="text-2xl font-medium">{name}</h2>
    <p className="text-gray-400">₹{price}</p>
  </div>
);

export default AdminPOS;