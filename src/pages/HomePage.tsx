import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Award, Star, Quote, ChevronRight, Zap, Percent, Package } from 'lucide-react';
import VehicleSearch from '../components/VehicleSearch';
import ProductCard from '../components/ProductCard';
import { products, categories, reviews } from '../data/products';

export default function HomePage() {
  const bestSellers = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/70 z-10" />
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920"
            alt="Performance Car"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-6"
              >
                <Zap className="w-4 h-4" />
                <span>New Arrivals - Up to 30% Off</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6"
              >
                <span className="text-white">Premium</span>
                <br />
                <span className="gradient-text">Performance Parts</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-neutral-400 mb-8 max-w-lg"
              >
                Transform your ride with top-tier automotive parts. Expert support, fast shipping, and unbeatable prices on the brands you trust.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-red-500/25"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products?sale=true"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl border border-neutral-700 transition-all"
                >
                  <Percent className="w-5 h-5 text-red-400" />
                  View Deals
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 mt-10 pt-10 border-t border-neutral-800"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-900" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-white font-semibold">50K+</span>
                    <span className="text-neutral-500"> Happy Customers</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-neutral-400 ml-1">4.9/5</span>
                </div>
              </motion.div>
            </div>

            {/* Vehicle Search */}
            <div className="hidden lg:block">
              <VehicleSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Vehicle Search */}
      <section className="lg:hidden py-8 px-4">
        <VehicleSearch />
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold font-heading text-white">Shop by Category</h2>
              <p className="text-neutral-400 mt-1">Browse our extensive collection of performance parts</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="group relative block overflow-hidden rounded-2xl aspect-[4/3]"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-neutral-400">{category.count} Products</p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-8 md:p-12"
          >
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-3">
                  <Clock className="w-4 h-4" />
                  Limited Time Offer
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Summer Sale - Up to 40% Off!</h3>
                <p className="text-white/80">Use code SUMMER40 at checkout. Free shipping on orders $199+</p>
              </div>
              <Link
                to="/products?sale=true"
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap"
              >
                Shop Sale Items
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold font-heading text-white">Best Sellers</h2>
              <p className="text-neutral-400 mt-1">Top-rated products loved by our customers</p>
            </div>
            <Link to="/products?sort=bestselling" className="hidden md:inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $199' },
              { icon: Shield, title: 'Secure Payments', desc: '256-bit SSL encryption' },
              { icon: Clock, title: 'Fast Delivery', desc: 'Same-day shipping available' },
              { icon: Award, title: 'Expert Support', desc: 'Certified technicians on staff' },
            ].map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <badge.icon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{badge.title}</h3>
                <p className="text-sm text-neutral-400">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold font-heading text-white">New Arrivals</h2>
              <p className="text-neutral-400 mt-1">The latest additions to our catalog</p>
            </div>
            <Link to="/products?sort=newest" className="hidden md:inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-heading text-white mb-2">What Our Customers Say</h2>
            <p className="text-neutral-400">Real reviews from real car enthusiasts</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6"
              >
                <Quote className="w-8 h-8 text-red-500/30 mb-4" />
                <p className="text-neutral-300 mb-6">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{review.name}</div>
                    <div className="text-sm text-neutral-500">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4 pt-4 border-t border-neutral-800">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-neutral-500 ml-2">on {review.product}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-8 md:p-16"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-500/10 to-transparent" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
                Ready to Upgrade Your Ride?
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                Join thousands of satisfied customers who trust AutoParts for their performance needs. Get expert advice, competitive prices, and fast shipping.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-red-500/25"
                >
                  <Package className="w-5 h-5" />
                  Browse All Parts
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl border border-neutral-700 transition-all"
                >
                  Contact Our Experts
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}