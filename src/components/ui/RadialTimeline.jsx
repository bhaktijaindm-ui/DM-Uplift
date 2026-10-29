import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import './RadialTimeline.css';

export default function RadialTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220; // Radius of the orbital ring
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "rt-status-completed";
      case "in-progress":
        return "rt-status-progress";
      case "pending":
        return "rt-status-pending";
      default:
        return "rt-status-pending";
    }
  };

  return (
    <div className="rt-container" ref={containerRef} onClick={handleContainerClick}>
      <div className="rt-wrapper">
        <div
          className="rt-orbit-layer"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center glowing core */}
          <div className="rt-center-sun">
            <div className="rt-center-ring-1"></div>
            <div className="rt-center-ring-2"></div>
            <div className="rt-center-core"></div>
          </div>

          <div className="rt-orbit-path"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="rt-node"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Node Energy Aura */}
                <div
                  className={`rt-node-pulse ${isPulsing ? 'is-pulsing' : ''}`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5) / 2}px`,
                    top: `-${(item.energy * 0.5) / 2}px`,
                  }}
                ></div>

                {/* Node Icon */}
                <div
                  className={`rt-node-icon ${isExpanded ? "expanded" : isRelated ? "related" : "normal"}`}
                >
                  <Icon size={16} />
                </div>

                {/* Node Label */}
                <div className={`rt-node-label ${isExpanded ? "expanded-label" : "normal-label"}`}>
                  {item.title}
                </div>

                {/* Expanded Details Card */}
                {isExpanded && (
                  <div className="rt-card">
                    <div className="rt-card-connector"></div>
                    
                    <div className="rt-card-header">
                      <div className="rt-card-header-top">
                        <span className={`rt-badge ${getStatusClass(item.status)}`}>
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </span>
                        <span className="rt-date">{item.date}</span>
                      </div>
                      <h3 className="rt-title">{item.title}</h3>
                    </div>
                    
                    <div className="rt-card-content">
                      <p>{item.content}</p>

                      <div className="rt-energy-section">
                        <div className="rt-energy-header">
                          <span className="rt-energy-label">
                            <Zap size={10} className="rt-mr-1" />
                            Energy Level
                          </span>
                          <span className="rt-energy-val">{item.energy}%</span>
                        </div>
                        <div className="rt-energy-bar-bg">
                          <div
                            className="rt-energy-bar-fill"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="rt-related-section">
                          <div className="rt-related-header">
                            <Link size={10} className="rt-mr-1" />
                            <h4>Connected Nodes</h4>
                          </div>
                          <div className="rt-related-list">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <button
                                  key={relatedId}
                                  className="rt-related-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={10} className="rt-ml-1" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
