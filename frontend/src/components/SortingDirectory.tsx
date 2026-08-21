import { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles 
} from 'lucide-react';
import { SORTING_ENCYCLOPEDIA } from '../data/mockData';

export const SortingDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'recyclable', 'organic', 'e-waste', 'hazardous', 'landfill'];

  const filteredItems = SORTING_ENCYCLOPEDIA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tips.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <BookOpen size={16} />
            <span>Curbside Sorting Encyclopedia</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
            A-Z Household Waste Sorting Guide
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Instantly search any household product to see which bin it belongs in, contamination warnings, and circular upcycling alternatives.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search e.g. aerosol, battery, pizza box..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.8rem 0.65rem 2.5rem',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#0f172a',
              fontSize: '0.85rem'
            }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.4rem 0.95rem',
              borderRadius: '999px',
              border: selectedCategory === cat ? '2px solid #059669' : '1px solid #cbd5e1',
              background: selectedCategory === cat ? '#dcfce7' : '#ffffff',
              color: selectedCategory === cat ? '#047857' : '#475569',
              fontSize: '0.82rem',
              fontWeight: selectedCategory === cat ? 700 : 500,
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Directory Grid */}
      <div className="grid-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: item.canRecycle ? '4px solid #059669' : '4px solid #e11d48'
            }}
          >
            <div>
              {/* Header: Name, Target Bin & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    {item.name}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={item.canRecycle ? "badge badge-emerald" : "badge badge-rose"}>
                    {item.canRecycle ? "✓ Recyclable" : "✕ Non-Recyclable"}
                  </span>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669', marginTop: '0.25rem' }}>
                    Target: {item.binColor}
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '0.5rem'
              }}>
                <Sparkles size={14} color="#059669" />
                <span><strong>Guideline:</strong> {item.tips}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
