import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Car } from 'lucide-react';
import { vehicleMakes, vehicleModels, years } from '../data/products';

export default function VehicleSearch() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const models = make ? vehicleModels[make] || [] : [];

  const handleSearch = () => {
    if (make && model && year) {
      window.location.href = `/products?make=${make}&model=${model}&year=${year}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-700/50 rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
          <Car className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Find Parts For Your Vehicle</h3>
          <p className="text-sm text-neutral-400">Select your vehicle to see compatible parts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Make Select */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(isOpen === 'make' ? null : 'make')}
            className="w-full px-4 py-3.5 bg-neutral-800 border border-neutral-700 rounded-xl text-left flex items-center justify-between text-white hover:border-red-500/50 transition-colors"
          >
            <span className={make ? 'text-white' : 'text-neutral-500'}>
              {make || 'Select Make'}
            </span>
            <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen === 'make' ? 'rotate-180' : ''}`} />
          </button>
          {isOpen === 'make' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto"
            >
              {vehicleMakes.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMake(m);
                    setModel('');
                    setIsOpen(null);
                  }}
                  className="w-full px-4 py-2.5 text-left text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  {m}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Model Select */}
        <div className="relative">
          <button
            onClick={() => make && setIsOpen(isOpen === 'model' ? null : 'model')}
            disabled={!make}
            className="w-full px-4 py-3.5 bg-neutral-800 border border-neutral-700 rounded-xl text-left flex items-center justify-between text-white hover:border-red-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className={model ? 'text-white' : 'text-neutral-500'}>
              {model || 'Select Model'}
            </span>
            <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen === 'model' ? 'rotate-180' : ''}`} />
          </button>
          {isOpen === 'model' && models.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto"
            >
              {models.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setModel(m);
                    setIsOpen(null);
                  }}
                  className="w-full px-4 py-2.5 text-left text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  {m}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Year Select */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(isOpen === 'year' ? null : 'year')}
            className="w-full px-4 py-3.5 bg-neutral-800 border border-neutral-700 rounded-xl text-left flex items-center justify-between text-white hover:border-red-500/50 transition-colors"
          >
            <span className={year ? 'text-white' : 'text-neutral-500'}>
              {year || 'Select Year'}
            </span>
            <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen === 'year' ? 'rotate-180' : ''}`} />
          </button>
          {isOpen === 'year' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto"
            >
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    setYear(y.toString());
                    setIsOpen(null);
                  }}
                  className="w-full px-4 py-2.5 text-left text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  {y}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!make || !model || !year}
          className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-neutral-700 disabled:to-neutral-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed group"
        >
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Search</span>
        </button>
      </div>
    </motion.div>
  );
}