import React, { useState } from 'react';
import './ServiceShowcase.css';

const DEFAULT_SERVICES = [
  {
    id: '1',
    name: 'Website Development',
    role: 'DIGITAL MANIFESTATION',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'SEO / Local SEO',
    role: 'COSMIC REACH',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'Social Media',
    role: 'ASTRAL ENGAGEMENT',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    name: 'Professional Shoots',
    role: 'AURA CAPTURE',
    image: 'https://images.unsplash.com/photo-1554048612-b6a8a3182b8a?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    name: 'Paid Campaigns',
    role: 'TARGETED ENERGY',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '6',
    name: 'SXO / AEO',
    role: 'OMNIPRESENCE',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
  },
];

export default function ServiceShowcase({ services = DEFAULT_SERVICES }) {
  const [hoveredId, setHoveredId] = useState(null);

  const col1 = services.filter((_, i) => i % 3 === 0);
  const col2 = services.filter((_, i) => i % 3 === 1);
  const col3 = services.filter((_, i) => i % 3 === 2);

  return (
    <div className="ss-container">
      {/* ── Left: photo grid ── */}
      <div className="ss-photo-grid">
        {/* Column 1 */}
        <div className="ss-col">
          {col1.map((service) => (
            <PhotoCard
              key={service.id}
              service={service}
              className="ss-card-col1"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="ss-col ss-col-offset-1">
          {col2.map((service) => (
            <PhotoCard
              key={service.id}
              service={service}
              className="ss-card-col2"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="ss-col ss-col-offset-2">
          {col3.map((service) => (
            <PhotoCard
              key={service.id}
              service={service}
              className="ss-card-col3"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: service name list*/}
      <div className="ss-list">
        {services.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({ service, className, hoveredId, onHover }) {
  const isActive = hoveredId === service.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={`ss-photo-wrapper ${className} ${isDimmed ? 'dimmed' : ''}`}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={service.image}
        alt={service.name}
        className={`ss-photo ${isActive ? 'active' : ''}`}
      />
    </div>
  );
}

function ServiceRow({ service, hoveredId, onHover }) {
  const isActive = hoveredId === service.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={`ss-row ${isDimmed ? 'dimmed' : ''}`}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="ss-row-header">
        <span className={`ss-indicator ${isActive ? 'active' : ''}`} />
        <span className={`ss-name ${isActive ? 'active' : ''}`}>
          {service.name}
        </span>
      </div>
      <p className="ss-role">{service.role}</p>
    </div>
  );
}
