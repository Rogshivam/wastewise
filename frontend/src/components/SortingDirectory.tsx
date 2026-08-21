import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Tag
} from 'lucide-react';
import { SORTING_ENCYCLOPEDIA } from '../data/mockData';
import type { WasteCategory } from '../types';

export const SortingDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: { label: string; value: string }[] = [
    { label: 'All Items', value: 'All' },
    { label: 'Recyclables', value: 'recyclable' },
    { label: 'Compostables', value: 'organic' },
    { label: 'E-Waste', value: 'e-waste' },
    { label: 'Hazardous', value: 'hazardous' },
    { label: 'Landfill / Other', value: 'landfill' }
  ];

  const filteredItems = SORTING_ENCYCLOPEDIA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.searchTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          item.tips.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: WasteCategory) => {
    switch (category) {
      case 'recyclable': return '#06b6d4';
      case 'organic': return '#10b981';
      case 'e-waste': return '#fbbf24';
      case 'hazardous': return '#f43f5e';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <BookOpen size={16} />
          <span>Curbside Encyclopedia</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
          Waste Sorting & Recycling Directory
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Search any household item to find exactly which bin it belongs to, how to clean it, and how to avoid cross-contamination.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="glass-card" style={{
        padding: '1.25rem',
        marginBottom: '1.75rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '0.6rem 1rem',
          flex: 1,
          minWidth: '280px'
        }}>
          <Search size={18} color="#94a3b8" />
          <input 
            type="text"
            placeholder="Search items (e.g. coffee cup, batteries, pizza box, lightbulb)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '0.9rem',
              width: '100%'
            }}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: selectedCategory === cat.value ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat.value ? '#34d399' : '#94a3b8',
                borderBottom: selectedCategory === cat.value ? '2px solid #10b981' : '2px solid transparent',
                fontWeight: selectedCategory === cat.value ? 700 : 500,
                transition: 'all 0.2s'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Encyclopedia Items Grid */}
      <div className="grid-2">
        {filteredItems.map((item) => {
          const accentColor = getCategoryColor(item.category);

          return (
            <div 
              key={item.id}
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${accentColor}`
              }}
            >
              <div>
                {/* Top Row: Category & Recyclable status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: accentColor,
                    letterSpacing: '0.04em'
                  }}>
                    {item.category}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: item.canRecycle ? '#34d399' : '#fb7185' }}>
                    {item.canRecycle ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    <span>{item.canRecycle ? 'Recyclable' : 'Special Handling / Landfill'}</span>
                  </div>
                </div>

                {/* Name */}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
                  {item.name}
                </h3>

                {/* Target Bin Pill */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.78rem',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  marginBottom: '0.85rem'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: accentColor }} />
                  <span>Target Bin: <strong>{item.binColor}</strong></span>
                </div>

                {/* Tips */}
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {item.tips}
                </p>
              </div>

              {/* Search Tags Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                flexWrap: 'wrap',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <Tag size={13} color="#64748b" />
                {item.searchTags.map(t => (
                  <span 
                    key={t}
                    onClick={() => setSearchTerm(t)}
                    style={{
                      fontSize: '0.7rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#94a3b8',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <HelpCircle size={48} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '0.5rem' }}>No matching items found</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Try searching for "bottle", "battery", "box", or upload a photo in the AI Scanner.
          </p>
          <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="btn-secondary">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
