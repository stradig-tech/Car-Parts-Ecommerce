import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Shield, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = subtotal >= 199 ? 0 : 19.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-neutral-900 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-neutral-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h1>
          <p className="text-neutral-400 mb-8">Looks like you haven't added any parts to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-heading text-white mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 bg-neutral-900/50 rounded-2xl border border-neutral-800"
              >
                <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-white font-semibold hover:text-red-400 transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm text-neutral-500 mt-1">${item.price.toLocaleString()} each</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-neutral-800 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-white">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-neutral-900/50 rounded-2xl border border-neutral-800 p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <button className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl border border-neutral-700 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Tax (est.)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-800 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-lg font-bold text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {subtotal < 199 && (
                <div className="mb-6 p-3 bg-neutral-800/50 rounded-lg border border-neutral-700">
                  <p className="text-sm text-neutral-400">
                    Add <span className="text-red-400 font-medium">${(199 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                </div>
              )}

              <button className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 mb-4">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/products"
                className="block text-center text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-800 space-y-3">
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <Truck className="w-4 h-4 text-red-400" />
                  <span>Free shipping on orders $199+</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <Shield className="w-4 h-4 text-red-400" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}