import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import LazyImage from '../components/LazyImage/LazyImage';
import theme from '../theme';
import SimpleLineChart from '../components/SimpleLineChart/SimpleLineChart';

// ─── Chart data ────────────────────────────────────────────
const chartData = [
  { month: 'Jan', avg: 2.8, exams: 1.5 },
  { month: 'Feb', avg: 2.2, exams: 2.8 },
  { month: 'Mar', avg: 3.1, exams: 2.2 },
  { month: 'Apr', avg: 2.5, exams: 3.5 },
  { month: 'May', avg: 3.8, exams: 2.8 },
  { month: 'Jun', avg: 3.2, exams: 4.2 },
  { month: 'Jul', avg: 4.1, exams: 3.5 },
  { month: 'Aug', avg: 3.7, exams: 4.8 },
  { month: 'Sep', avg: 4.5, exams: 3.8 },
  { month: 'Oct', avg: 3.9, exams: 5.1 },
  { month: 'Nov', avg: 4.8, exams: 4.3 },
  { month: 'Dec', avg: 4.2, exams: 5.5 },
];

// ─── Top Drivers ────────────────────────────────────────────
const topDrivers = [
  { id: 1, name: 'Maharrm Hasanli', phone: '+998 (99) 436-46-15', orders: 5, income: 98,  img: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 2, name: 'Gina Garza',      phone: '+998 (99) 150-10-15', orders: 5, income: 15,  img: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 3, name: 'Brian Reed',      phone: '+998 (95) 489-46-20', orders: 5, income: 23,  img: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { id: 4, name: 'Tammy Spencer',   phone: '+998 (95) 765-10-02', orders: 5, income: 98,  img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 5, name: 'Joseph Brooks',   phone: '+998 (99) 436-46-15', orders: 5, income: 98,  img: 'https://randomuser.me/api/portraits/men/55.jpg' },
  { id: 6, name: 'Juan Steward',    phone: '+998 (99) 436-46-15', orders: 5, income: 98,  img: 'https://randomuser.me/api/portraits/men/66.jpg' },
];

// ─── Orders table ────────────────────────────────────────────
const orders = [
  { id: 1, user: 'Sierra Ferguson', phone: '+998 (99) 436-46-15', comfort: 'simple',    time: '04.12.2021 20:30', start: 'пл. Беш Агач, Furkat Street, Tashkent, O\'zbekiston',   end: 'kat Street, ston',  income: '50 300 000 SUM',  img: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 2, user: 'Sierra Ferguson', phone: '+998 (99) 436-46-15', comfort: 'otra',       time: '04.12.2021 20:24', start: '21 Hamidulla Oripov ko\'chasi, Toshkent, O\'zbekiston',   end: 'ov ko\'chasi, Toshkent, O\'zbekiston',    income: '300 000 SUM',     img: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 3, user: 'Sierra Ferguson', phone: '+998 (99) 436-46-15', comfort: 'convenient', time: '04.12.2021 20:23', start: '78 Фаргона Йўли, Тошкент, O\'zbekiston',               end: '76 Фаргона Йўли, Тошкент, O\'zbekiston', income: '5 300 000 SUM',  img: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 4, user: 'Sierra Ferguson', phone: '+998 (99) 436-46-15', comfort: 'convenient', time: '17.11.2021 12:19', start: '13 Kumarik ko\'chasi, Tashkent 100167, O\'zbekiston',     end: '13 Kumarik ko\'chasi, Tashkent 100167,',         income: '500 300 100 SUM', img: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 5, user: 'Sierra Ferguson', phone: '+998 (99) 436-46-15', comfort: 'convenient', time: '04.12.2021 20:30', start: '1 Kuyi Talarik ko\'chasi, Toshkent 100091, O\'zbekiston', end: '1 Kuyi Talarik ko\'chasi, Toshkent 100091,',          income: '50 300 000 SUM',  img: 'https://randomuser.me/api/portraits/women/10.jpg' },
];

const ITEMS_PER_PAGE = 3;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth > 768 : true));
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const [currentPeriod] = useState('Aug 2021');
  const [page, setPage] = useState(1);
  const [profileName, setProfileName] = useState('Maharram');

  useEffect(() => {
    const storedUserRaw = localStorage.getItem('registeredUser');
    if (storedUserRaw) {
      try {
        const user = JSON.parse(storedUserRaw);
        if (user.email) {
          const prefix = user.email.split('@')[0];
          setProfileName(prefix.charAt(0).toUpperCase() + prefix.slice(1));
        }
      } catch (e) {
        // Fallback to Maharram
      }
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic page title
    document.title = 'Dashboard | Admin Panel';
    return () => {
      window.removeEventListener('resize', handleResize);
      document.title = 'Admin Panel';
    };
  }, []);

  const handleLogout = () => {
    // Navigate to login
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Pagination Math
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, orders.length);
  const paginatedOrders = orders.slice(startIdx, endIdx);

  return (
    <div className="dashboard-outer-wrapper">
      <div className="dashboard-layout">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="dashboard-main page-enter">
        {/* ── Header ── */}
        <header className="dashboard-header" style={{ padding: '18px 32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                className="mobile-menu-btn"
                onClick={toggleSidebar}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', display: isMobile ? 'flex' : 'none', alignItems: 'center', padding: 0 }}
                aria-label="Toggle sidebar"
              >
                <i className="fas fa-bars" style={{ color: theme.colors.textPrimary }} />
              </button>
              <div>
                <div className="header-greeting" style={{ fontSize: '1.35rem', fontWeight: 700, color: theme.colors.textPrimary, display: 'flex', alignItems: 'center', gap: 6 }}>
                  Good morning, {profileName} <span style={{ fontSize: '1.25rem' }}>👋</span>
                </div>
                <div className="header-subtitle" style={{ fontSize: '0.8rem', color: theme.colors.textMuted, marginTop: 2 }}>
                  you have <span style={{ color: '#4f8ef7', fontWeight: 600 }}>1 new message</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Logout button with tooltip */}
            <div style={{ position: 'relative' }} className="logout-wrapper">
              <style>{`
                .logout-wrapper:hover .logout-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
                .logout-tooltip { position: absolute; bottom: -36px; left: 50%; transform: translateX(-50%) translateY(-4px); background: #1a1a2e; color: #fff; font-size: 0.72rem; font-weight: 500; padding: 5px 10px; border-radius: 6px; white-space: nowrap; opacity: 0; pointer-events: none; transition: all 0.2s; z-index: 200; }
                .logout-tooltip::before { content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%); border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 4px solid #1a1a2e; }
              `}</style>
              <button
                onClick={handleLogout}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: '#ffffff',
                  border: '1.5px solid #e8eaf0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ef4444',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff5f5';
                  e.currentTarget.style.borderColor = '#fecaca';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e8eaf0';
                  e.currentTarget.style.transform = 'none';
                }}
                aria-label="Logout"
                id="logout-btn"
              >
                <i className="fas fa-sign-out-alt" style={{ fontSize: '1.05rem' }} />
              </button>
              <div className="logout-tooltip">Logout</div>
            </div>
          </div>
        </header>

        {/* ── Main Content ── */}
        <div className="dashboard-content">
          <div className="row g-4">

            {/* LEFT COLUMN */}
            <div className="col-12 col-xl-8">

              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme.colors.textPrimary, marginBottom: 16 }}>
                Knowledge base
              </h2>

              {/* Stat cards matching mockup style */}
              <div className="stat-cards-row" style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
                {/* Total Orders Card (Blue) */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 180,
                    background: '#e8f0ff',
                    borderRadius: 12,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(79, 142, 247, 0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <i className="fas fa-folder" style={{ color: '#4f8ef7', fontSize: '1.3rem' }} />
                    <span style={{ color: '#4f8ef7', fontWeight: 600, fontSize: '0.85rem' }}>Total Orders</span>
                  </div>
                  <i className="fas fa-chevron-right" style={{ color: '#4f8ef7', fontSize: '0.8rem' }} />
                </div>

                {/* Total Earnings Card (Pink/Red) */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 180,
                    background: '#ffe8e8',
                    borderRadius: 12,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <i className="fas fa-folder" style={{ color: '#ef4444', fontSize: '1.3rem' }} />
                    <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.85rem' }}>Total Earnings</span>
                  </div>
                  <i className="fas fa-chevron-right" style={{ color: '#ef4444', fontSize: '0.8rem' }} />
                </div>

                {/* Profit Card (Orange) */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 180,
                    background: '#fff3e0',
                    borderRadius: 12,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <i className="fas fa-folder" style={{ color: '#f59e0b', fontSize: '1.3rem' }} />
                    <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.85rem' }}>Profit</span>
                  </div>
                  <i className="fas fa-chevron-right" style={{ color: '#f59e0b', fontSize: '0.8rem' }} />
                </div>
              </div>

              {/* Chart Card */}
              <div className="chart-card">
                <div className="chart-header" style={{ marginBottom: 12 }}>
                  <div>
                    <div className="chart-title" style={{ fontSize: '1.1rem', fontWeight: 700 }}>Statistic</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
                      <span style={{ fontSize: '0.78rem', color: theme.colors.textMuted, fontWeight: 600 }}>
                        Progress score
                      </span>
                      {/* Legend aligned horizontally on the left side, next to title */}
                      <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem', color: theme.colors.textMuted }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: theme.colors.secondary }} />
                          Average grade
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: theme.colors.success }} />
                          Exams
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-period">
                    <button
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.textMuted, padding: 4 }}
                      aria-label="Previous period"
                    >
                      <i className="fas fa-chevron-left" />
                    </button>
                    <span style={{ fontWeight: 600, color: theme.colors.textPrimary, fontSize: '0.82rem', margin: '0 4px' }}>
                      {currentPeriod}
                    </span>
                    <button
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.textMuted, padding: 4 }}
                      aria-label="Next period"
                    >
                      <i className="fas fa-chevron-right" />
                    </button>
                  </div>
                </div>

                <SimpleLineChart data={chartData} />
              </div>
            </div>

            {/* RIGHT COLUMN: Top Drivers */}
            <div className="col-12 col-xl-4">
              <div
                style={{
                  background: '#fff',
                  borderRadius: theme.borderRadius.md,
                  padding: '20px 20px 8px',
                  boxShadow: theme.colors.shadowMd,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: theme.colors.textPrimary, margin: 0, flex: 1 }}>
                    Top Drivers
                  </h2>
                  <a href="#" style={{ color: theme.colors.textMuted, fontSize: '0.8rem', textDecoration: 'none' }} aria-label="View all drivers">
                    <i className="fas fa-chevron-right" />
                  </a>
                </div>

                {topDrivers.map((d) => (
                  <div className="driver-item" key={d.id} style={{ padding: '12px 0' }}>
                    <LazyImage
                      src={d.img}
                      alt={d.name}
                      style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0 }}
                      className="driver-avatar"
                    />
                    <div className="driver-info" style={{ marginLeft: 12 }}>
                      <div className="name" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.name}</div>
                      <div className="phone" style={{ fontSize: '0.72rem', color: theme.colors.textMuted, marginTop: 1 }}>{d.phone}</div>
                    </div>
                    <div className="driver-stats" style={{ marginLeft: 'auto', textAlign: 'right', fontSize: '0.75rem' }}>
                      <div style={{ color: theme.colors.textMuted }}>Orders: <strong style={{ color: theme.colors.textPrimary }}>{d.orders}</strong></div>
                      <div className="income" style={{ marginTop: 2, color: theme.colors.textMuted }}>Income: <strong style={{ color: theme.colors.textPrimary, fontSize: '0.9rem' }}>$ {d.income}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FULL WIDTH COLUMN: Orders Table */}
            <div className="col-12" style={{ marginTop: 16 }}>
              <div className="data-table">
                <div className="table-scroll-wrapper">
                  <table style={{ width: '100%', minWidth: 700, tableLayout: 'fixed' }}>
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}><input type="checkbox" /></th>
                        <th style={{ width: 170 }}>User</th>
                        <th style={{ width: 120 }}>Car Comfort</th>
                        <th style={{ width: 130 }}>Ordered Time</th>
                        <th>Start Location</th>
                        <th>Finish Location</th>
                        <th style={{ width: 140 }}>Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.map((o) => (
                        <tr key={o.id}>
                          <td data-label="Select"><input type="checkbox" /></td>
                          <td data-label="User">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <LazyImage
                                src={o.img}
                                alt={o.user}
                                style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0 }}
                              />
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{o.user}</div>
                                <div style={{ fontSize: '0.72rem', color: theme.colors.textMuted }}>{o.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td data-label="Car Comfort">
                            <span style={{
                              background: '#f0f4ff', color: theme.colors.secondary,
                              borderRadius: 6, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600,
                            }}>
                              {o.comfort}
                            </span>
                          </td>
                          <td data-label="Ordered Time" style={{ fontSize: '0.8rem', color: theme.colors.textSecondary }}>{o.time}</td>
                          <td data-label="Start Location" style={{ fontSize: '0.75rem', maxWidth: 160, whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.3 }}>{o.start}</td>
                          <td data-label="Finish Location" style={{ fontSize: '0.75rem', maxWidth: 140, whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.3 }}>{o.end}</td>
                          <td data-label="Income">
                            <span className="income-badge">{o.income}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Functioning Pagination matching mockup layout */}
                <div className="data-table-footer">
                  <span style={{ color: theme.colors.textMuted }}>{startIdx + 1}–{endIdx} of {orders.length} items</span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {/* Previous Button */}
                    <button 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: page > 1 ? 'pointer' : 'not-allowed',
                        color: page > 1 ? theme.colors.textSecondary : theme.colors.textMuted,
                        padding: 4
                      }}
                      disabled={page === 1}
                      onClick={() => setPage(Math.max(1, page - 1))} 
                      aria-label="Previous page"
                    >
                      <i className="fas fa-chevron-left" />
                    </button>

                    {/* Numeric Buttons */}
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const p = idx + 1;
                      const active = page === p;
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          style={{
                            width: 28, height: 28, borderRadius: 6,
                            border: 'none',
                            background: active ? '#4f8ef7' : 'transparent',
                            color: active ? '#fff' : theme.colors.textSecondary,
                            fontWeight: active ? 700 : 400,
                            cursor: 'pointer', fontSize: '0.8rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}
                        >
                          {p}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: page < totalPages ? 'pointer' : 'not-allowed',
                        color: page < totalPages ? theme.colors.textSecondary : theme.colors.textMuted,
                        padding: 4
                      }}
                      disabled={page === totalPages}
                      onClick={() => setPage(Math.min(totalPages, page + 1))} 
                      aria-label="Next page"
                    >
                      <i className="fas fa-chevron-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default DashboardPage;
