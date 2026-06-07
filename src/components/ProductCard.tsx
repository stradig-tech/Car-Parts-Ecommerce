import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden card-hover"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.originalPrice && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md">
            SALE
          </span>
        )}
        {!product.inStock && (
          <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs font-bold rounded-md">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-neutral-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-neutral-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <div className="text-xs text-red-400 font-medium mb-1">{product.brand}</div>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-semibold mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-500 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="w-10 h-10 bg-red-500 hover:bg-red-400 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-lg flex items-center justify-center text-white transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}