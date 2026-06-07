import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Check, Truck, Shield, RotateCcw, Minus, Plus, Package } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'compatibility'>('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/products" className="text-red-400 hover:text-red-300 transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-neutral-500 hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <Link to="/products" className="text-neutral-500 hover:text-white transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <Link to={`/products?category=${product.category.toLowerCase()}`} className="text-neutral-500 hover:text-white transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <span className="text-white">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.originalPrice && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">
                SALE
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="text-sm text-red-400 font-medium mb-2">{product.brand}</div>
            <h1 className="text-3xl font-bold font-heading text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-neutral-400">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-white">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-400 mb-6">{product.description}</p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-red-400 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* SKU */}
            <div className="text-sm text-neutral-500 mb-6">SKU: {product.sku}</div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-white font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-neutral-700 disabled:to-neutral-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-900/50 rounded-xl border border-neutral-800">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-400" />
                <span className="text-xs text-neutral-400">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-xs text-neutral-400">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-400" />
                <span className="text-xs text-neutral-400">30 Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex border-b border-neutral-800 mb-8">
            {(['description', 'specs', 'compatibility'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab ? 'text-red-400' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                  />
                )}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/50 rounded-2xl border border-neutral-800 p-6"
          >
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-neutral-300 leading-relaxed">{product.description}</p>
                <p className="text-neutral-400 mt-4">
                  This premium {product.brand} product is designed for enthusiasts who demand the best. Engineered with precision and built to last, it delivers exceptional performance and reliability for your vehicle.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-neutral-800">
                    <span className="text-neutral-400">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div>
                <h4 className="text-white font-semibold mb-4">Compatible Vehicles</h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {product.compatibleVehicles.map((vehicle, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-neutral-800 rounded-lg">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-neutral-300">{vehicle}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-heading text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}