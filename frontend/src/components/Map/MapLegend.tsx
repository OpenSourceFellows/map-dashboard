import React from 'react';

/**
 * Legend component that explains the map's symbols and colors
 * @component
 * @returns {JSX.Element} A panel showing the map legend with point and area type descriptions
 */
export const MapLegend: React.FC = () => {
  return (
    <div className="map-legend">
      <div className="legend-section">
        <h3 className="legend-title">Legend</h3>

        <div style={{ marginBottom: '16px' }}>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#34495e',
            }}
          >
            Points
          </h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-icon landmark"></div>
              <span>Landmark</span>
            </div>
            <div className="legend-item">
              <div className="legend-icon animal"></div>
              <span>Animals</span>
            </div>
            <div className="legend-item">
              <div className="legend-icon insect"></div>
              <span>Insect</span>
            </div>
            <div className="legend-item">
              <div className="legend-icon plant"></div>
              <span>Plants</span>
            </div>
          </div>
        </div>

        <div>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#34495e',
            }}
          >
            Areas
          </h4>
          <div className="legend-items">
            <div className="area-legend-item">
              <div
                className="area-legend-icon"
                style={{
                  backgroundColor: 'rgba(255, 215, 0, 0.3)',
                  border: '1px solid #FFD700',
                }}
              ></div>
              <span>Species</span>
            </div>
            <div className="area-legend-item">
              <div
                className="area-legend-icon"
                style={{
                  backgroundColor: 'rgba(74, 144, 226, 0.3)',
                  border: '1px solid #4A90E2',
                }}
              ></div>
              <span>Water Bodies</span>
            </div>
            <div className="area-legend-item">
              <div
                className="area-legend-icon"
                style={{
                  backgroundColor: 'rgba(155, 89, 182, 0.3)',
                  border: '1px solid #9B59B6',
                }}
              ></div>
              <span>Soil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
