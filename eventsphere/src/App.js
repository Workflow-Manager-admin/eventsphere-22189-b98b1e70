import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Global App State: just stubs for demonstration
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [isAdmin, setIsAdmin] = useState(false);

  // UI Theme palette (could move to context or CSS vars)
  const colors = {
    primary: '#1A73E8',
    secondary: '#F5F6FA',
    accent: '#FF7043',
    darkBG: 'var(--kavia-dark)',
  };

  return (
    <div className="app" style={{background: colors.darkBG}}>
      <Navbar
        user={user}
        onLogin={() => setUser({ name: "Demo User" })}
        onLogout={() => setUser(null)}
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      <main className="container" style={{paddingTop: 112}}>
        <section>
          <SearchBar />
          <EventCategories />
          <FeaturedEvents />
        </section>

        <section>
          <EventListings />
        </section>

        <section>
          <NotificationsPanel />
        </section>

        <section>
          <UserDashboard user={user} />
        </section>

        <section>
          <SupportWidget />
        </section>

        {isAdmin && (
          <section>
            <AdminDashboard />
          </section>
        )}
      </main>
    </div>
  );
}

// ----- NAVIGATION BAR -----
function Navbar({ user, onLogin, onLogout, lang, setLang, currency, setCurrency, isAdmin, setIsAdmin }) {
  return (
    <nav className="navbar" role="navigation">
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className="logo">
          <span className="logo-symbol" style={{color: '#1A73E8'}}>&#9679;</span> EventSphere
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <LangSelector lang={lang} setLang={setLang} />
          <CurrencySelector currency={currency} setCurrency={setCurrency} />
          {user ? (
            <>
              <button className="btn" onClick={onLogout}>Logout</button>
              <button className="btn" onClick={() => setIsAdmin(a => !a)}>{isAdmin ? "User" : "Admin"}</button>
            </>
          ) : (
            <AuthButton onLogin={onLogin} />
          )}
        </div>
      </div>
    </nav>
  );
}

// ----- SEARCH BAR -----
function SearchBar() {
  return (
    <div style={{margin: '32px 0', display: 'flex', justifyContent: 'center'}}>
      <input
        type="text"
        placeholder="Search events, venues, categories..."
        style={{
          width: '60%',
          padding: '14px 20px',
          borderRadius: 6,
          border: 'none',
          fontSize: '1.1rem',
          background: '#20232a',
          color: 'white',
        }}
      />
      <button className="btn" style={{marginLeft: 12, fontWeight: 600}}>Search</button>
    </div>
  );
}

// ----- EVENT CATEGORY NAV -----
function EventCategories() {
  const categories = [
    { label: 'Theme Parks', icon: '🎢' },
    { label: 'Sports', icon: '🏟️' },
    { label: 'Movies', icon: '🎬' },
    { label: 'Concerts', icon: '🎤' },
    { label: 'Travel', icon: '✈️' },
  ];
  return (
    <div style={{
      display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 24,
      flexWrap: 'wrap'
    }}>
      {categories.map(({label, icon}) =>
        <div
          key={label}
          style={{
            background: '#222',
            color: '#1A73E8',
            borderRadius: 10,
            padding: '12px 26px',
            fontWeight: 500,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 6px rgba(10,10,30,0.13)'
          }}
        >
          <span style={{marginRight: 10, fontSize: '1.4rem'}}>{icon}</span>
          {label}
        </div>
      )}
    </div>
  );
}

// ----- FEATURED EVENTS CAROUSEL (STUB) -----
function FeaturedEvents() {
  // In real app this would be a carousel, but for structure use a simple grid stub
  return (
    <div style={{margin: '24px 0'}}>
      <h2 className="subtitle" style={{marginBottom:10}}>Featured Events</h2>
      <div style={{
        display: 'flex',
        gap: 18,
        overflowX: 'auto',
        paddingBottom: 10
      }}>
        {[1,2,3].map(i =>
          <div
            key={i}
            style={{
              background: '#161616',
              minWidth: 240,
              borderRadius: 10,
              padding: 16,
              color: '#fff',
              boxShadow: '0 2px 8px #2227',
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{
              width: 180, height: 90, background: '#333', borderRadius: 5, marginBottom: 15
            }}>
              <span style={{fontSize:30, color: '#FF7043', lineHeight: '90px', marginLeft: 16}}>★</span>
            </div>
            <div style={{fontWeight: 600}}>Sample Event {i}</div>
            <button className="btn" style={{marginTop:10}}>View Details</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ----- EVENT LISTINGS -----
function EventListings() {
  // This section would display a list fetched from backend; stub with repeat cards for demo
  return (
    <div style={{margin: '32px 0'}}>
      <h2 className="subtitle">All Events</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))',
        gap: 22
      }}>
        {[...Array(4)].map((_, i) =>
          <EventCard key={i} />
        )}
      </div>
    </div>
  );
}

function EventCard() {
  // PUBLIC_INTERFACE
  // Card includes seat map launch & booking button for real-time seat selection
  return (
    <div style={{
      background: '#20232a',
      borderRadius: 10,
      padding: 18,
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 230
    }}>
      <div style={{fontWeight: 600, marginBottom: 6}}>Event Name</div>
      <div style={{fontSize: 14, color: 'var(--text-secondary)'}}>Venue, Date, Category</div>
      <div style={{margin: '14px 0', background: '#181920', borderRadius: 6, height: 48}}></div>
      <div style={{display: 'flex', gap: 10}}>
        <button className="btn" style={{flex: 1, background: '#1A73E8'}}>Book</button>
        <button className="btn" style={{background: '#FF7043'}}>Seat Map</button>
      </div>
      <div style={{marginTop: 10}}>
        <span style={{color: '#FFC107'}}>★★★★☆</span>
        <span style={{fontSize: 12, color:'var(--text-secondary)', marginLeft: 5}}>(172 reviews)</span>
      </div>
    </div>
  );
}

// ----- NOTIFICATIONS PANEL (STUB) -----
function NotificationsPanel() {
  // Stub for showing notification alerts
  return (
    <div style={{margin:'36px 0 0'}}>
      <h3 style={{color:'#FF7043', fontWeight:500}}>Notifications</h3>
      <div style={{background:'#272633', borderRadius:8, padding:16, color:'#fff',marginTop:5}}>
        <span role="img" aria-label="alert">🔔</span> New events and ticket flash sales coming soon!
      </div>
    </div>
  );
}

// ----- USER DASHBOARD (STUB) -----
function UserDashboard({ user }) {
  // Show quick profile and tickets; in real app is routed/dashboard page
  if (!user) return null;
  return (
    <div style={{margin:'44px 0 0'}}>
      <h2 style={{color:'#1A73E8'}}>User Dashboard</h2>
      <div style={{background:'#161930',borderRadius:10,padding:22}}>
        <div>Welcome, <b>{user.name}</b> (Bookings, Tickets, Loyalty, etc...)</div>
        <button className="btn btn-large" style={{marginTop:10}}>My Bookings</button>
      </div>
    </div>
  );
}

// ----- AUTH BUTTON (STUB) -----
function AuthButton({ onLogin }) {
  return (
    <button className="btn" onClick={onLogin}>Sign In</button>
  );
}

// ----- LANGUAGE SELECTOR (STUB) -----
function LangSelector({lang, setLang}) {
  return (
    <select
      value={lang}
      onChange={e=>setLang(e.target.value)}
      style={{background:'#1A73E8',color:'white',border:'none',borderRadius:4,padding:'7px 10px',fontWeight:500}}
      aria-label="Language selector"
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
      <option value="fr">FR</option>
      <option value="hi">HI</option>
      <option value="zh">中文</option>
    </select>
  );
}

// ----- CURRENCY SELECTOR (STUB) -----
function CurrencySelector({currency, setCurrency}) {
  return (
    <select
      value={currency}
      onChange={e=>setCurrency(e.target.value)}
      style={{ background: '#FF7043', color: 'white', border: 'none', borderRadius: 4, padding: '7px 10px', fontWeight: 500 }}
      aria-label="Currency selector"
    >
      <option value="USD">USD $</option>
      <option value="EUR">EUR €</option>
      <option value="INR">INR ₹</option>
      <option value="CNY">CNY ¥</option>
      <option value="GBP">GBP £</option>
    </select>
  );
}

// ----- SUPPORT WIDGET (STUB) -----
function SupportWidget() {
  return (
    <div style={{position:'fixed',bottom:24,right:24,zIndex:1500}}>
      <button
        className="btn"
        style={{background:'#1A73E8',borderRadius:'50%',width:56,height:56,fontSize:30,boxShadow:'0 2px 10px #225'}}
        title="Customer Support"
      >
        💬
      </button>
    </div>
  );
}

// ----- ADMIN DASHBOARD (STUB) -----
function AdminDashboard() {
  // Stubs for admin analytic and management panels
  return (
    <div style={{margin:'44px 0 40px'}}>
      <h2 style={{color:'#FF7043'}}>Admin Dashboard</h2>
      <div style={{
        background:'#1A233a',borderRadius:10,padding:24,marginTop:6,
        display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:18
      }}>
        <div style={{background:'#181b2a',borderRadius:8,padding:15}}>
          <h4 style={{margin:0,color:'#1A73E8'}}>Revenue Analytics</h4>
          <div style={{fontSize:30,margin:'8px 0'}}>₹72,313</div>
        </div>
        <div style={{background:'#181b2a',borderRadius:8,padding:15}}>
          <h4 style={{margin:0,color:'#FF7043'}}>Inventory</h4>
          <div style={{fontSize:18,margin:'10px 0'}}>Tickets: 481 | Venues: 7</div>
        </div>
        <div style={{background:'#181b2a',borderRadius:8,padding:15}}>
          <h4 style={{margin:0,color:'#22CF8C'}}>Users</h4>
          <div style={{fontSize:18,margin:'10px 0'}}>548 Registered</div>
        </div>
        <div style={{background:'#181b2a',borderRadius:8,padding:15}}>
          <h4 style={{margin:0,color:'#1A73E8'}}>CRM</h4>
          <div style={{fontSize:14}}>View support tickets (demo stub)</div>
        </div>
      </div>
    </div>
  );
}

export default App;
