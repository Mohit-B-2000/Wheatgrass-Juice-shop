import { useCart } from "../context/CartContext";
import { Trash2, X } from "lucide-react";

export default function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-morphism w-full max-w-md h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold">Your Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-20">Your tray is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white/20">
                <div>
                  <h4 className="font-medium">{item.name} ({item.size})</h4>
                  <p className="text-sm text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="pt-8 border-t border-gray-200 mt-auto">
          <div className="flex justify-between text-xl font-medium mb-6">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
          <button className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:bg-gray-800 transition-all active:scale-[0.98]">
            Checkout (Panchkula Only)
          </button>
        </div>
      </div>
    </div>
  );
}