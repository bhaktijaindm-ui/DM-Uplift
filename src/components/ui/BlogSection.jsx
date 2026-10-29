import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Bookmark } from 'lucide-react';
import './BlogSection.css';

const blogPosts = [
  {
    id: 1,
    category: "Strategy",
    title: "Mastering the Art of Digital Divination",
    author: "Sage Thompson",
    date: "May 10, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    category: "Marketing",
    title: "How to Build a Brand That Aligns With the Stars",
    author: "Luna Moon",
    date: "May 08, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1515023115689-589c39715ee1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    category: "Social Media",
    title: "Viral Content Strategies for Spiritual Guides",
    author: "Elena Star",
    date: "May 05, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1475139450941-3b6464b2dde3?auto=format&fit=crop&q=80&w=800"
  }
];

const BlogSection = () => {
  return (
    <section className="blog-section-wrapper">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-badge">Insights & Wisdom</span>
          <h2 className="section-title-premium">Cosmic Insights</h2>
          <p className="section-desc">Advance your knowledge with our latest marketing strategies for the spiritual niche.</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <motion.article 
              key={post.id}
              className="blog-card"
              whileHover={{ y: -10 }}
            >
              <div className="blog-img-box">
                <img src={post.image} alt={post.title} className="blog-img" />
                <div className="blog-category">{post.category}</div>
                <button className="save-btn"><Bookmark size={14} /></button>
              </div>
              
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="meta-item"><Clock size={12} /> {post.readTime}</span>
                  <span className="meta-item"><User size={12} /> {post.author}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <div className="blog-footer">
                  <span className="blog-date">{post.date}</span>
                  <button className="read-btn">Read Article</button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
