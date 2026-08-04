import React, { useState } from "react";

// Theme Palette matching Paarkkar UI Reference
const T = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  dark: "#0F172A",
  darkSoft: "#1E293B",
  green: "#22C55E", // Brand Vibrant Green
  greenDark: "#16A34A",
  greenLight: "#DCFCE7",
  amber: "#F59E0B",
  red: "#EF4444",
  gray1: "#F1F5F9",
  gray2: "#E2E8F0",
  gray3: "#94A3B8",
  gray4: "#64748B",
  white: "#FFFFFF",
};

export default function FullShowcaseBoard() {
  const [activeScreen, setActiveScreen] = useState("01"); // 01 to 10
  const [role, setRole] = useState(null); // driver | host
  const [otpVal, setOtpVal] = useState(["2", "4", "6", "8", "2", "1"]);
  const [tabIndex, setTabIndex] = useState("Nearby"); // Nearby | Favorites | Recent
  const [selectedSpot, setSelectedSpot] = useState({
    title: "Home Garage",
    address: "Anna Nagar, Chennai",
    rating: "4.8 (120)",
    price: "40",
    distance: "0.2 km",
    image: "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=800&q=80",
    features: ["Covered", "CCTV", "24/7 Access", "EV Ready"],
    about: "Private garage with 24/7 access. Safe and secure. Suitable for all vehicle types."
  });

  const screensList = [
    { id: "01", name: "01 Splash Screen" },
    { id: "02", name: "02 Onboarding 1" },
    { id: "03", name: "03 Onboarding 2" },
    { id: "04", name: "04 Onboarding 3" },
    { id: "05", name: "05 Choose Role" },
    { id: "06", name: "06 Login Screen" },
    { id: "07", name: "07 Enter OTP" },
    { id: "08", name: "08 Home / Map View" },
    { id: "09", name: "09 List View" },
    { id: "10", name: "10 Parking Details" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#E2E8F0", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* TOP SHOWCASE SWITCHER NAV BAR */}
      <div style={{ background: "#0F172A", padding: "10px 14px", display: "flex", gap: 8, overflowX: "auto", borderBottom: "2px solid #22C55E", zIndex: 100 }}>
        {screensList.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveScreen(s.id)}
            style={{
              padding: "6px 12px",
              borderRadius: 20,
              border: "none",
              background: activeScreen === s.id ? "#22C55E" : "#1E293B",
              color: activeScreen === s.id ? "#FFFFFF" : "#94A3B8",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* MOBILE FRAME CONTAINER */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "12px 0" }}>
        <div style={{ width: "100%", maxWidth: 410, height: "100%", maxHeight: 840, background: "#FFFFFF", borderRadius: 32, boxShadow: "0 25px 60px rgba(0,0,0,0.25)", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
          
          {/* STATUS BAR */}
          <div style={{ height: 40, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 700, color: activeScreen === "01" ? "#0F172A" : "#0F172A", zIndex: 50 }}>
            <span>9:41</span>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span>📶</span>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* SCREEN CONTENT SWITCHER */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", position: "relative" }}>
            
            {/* ─── 01: SPLASH SCREEN ─── */}
            {activeScreen === "01" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "40px 24px 30px" }}>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 10px 25px rgba(34,197,94,0.35)" }}>
                    <span style={{ color: "#FFF", fontSize: 42, fontWeight: 900 }}>P</span>
                  </div>
                  <h1 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.03em" }}>Paarkkar</h1>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#64748B", margin: 0 }}>
                    Park Anywhere. Earn <span style={{ color: "#22C55E", fontWeight: 800 }}>Everywhere.</span>
                  </p>
                </div>

                {/* Illustration graphic */}
                <div style={{ width: "100%", padding: "0 10px" }}>
                  <svg viewBox="0 0 340 190" width="100%" height="auto">
                    <path d="M30 140 L30 100 L55 100 L55 140 M65 140 L65 80 L95 80 L95 140 M105 140 L105 105 L135 105 L135 140 M200 140 L200 90 L230 90 L230 140 M240 140 L240 70 L275 70 L275 140 M285 140 L285 110 L310 110 L310 140" fill="#CBD5E1" opacity="0.6"/>
                    <ellipse cx="170" cy="155" rx="150" ry="20" fill="#E2E8F0" />
                    <g transform="translate(40, 105)">
                      <circle cx="16" cy="16" r="16" fill="#22C55E" />
                      <text x="16" y="21" textAnchor="middle" fill="#FFF" fontSize="14" fontWeight="bold">P</text>
                    </g>
                    <g transform="translate(270, 95)">
                      <circle cx="16" cy="16" r="16" fill="#22C55E" />
                      <text x="16" y="21" textAnchor="middle" fill="#FFF" fontSize="14" fontWeight="bold">P</text>
                    </g>
                    {/* Sedan Car */}
                    <path d="M80 150 Q 95 125 130 120 L 210 120 Q 240 125 260 148 Q 275 152 275 160 L 75 160 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3"/>
                    <path d="M130 125 L 160 125 L 160 142 L 115 142 Z" fill="#38BDF8" opacity="0.75"/>
                    <path d="M168 125 L 205 125 L 215 142 L 168 142 Z" fill="#38BDF8" opacity="0.75"/>
                    <circle cx="110" cy="160" r="12" fill="#1E293B" stroke="#94A3B8" strokeWidth="3"/>
                    <circle cx="230" cy="160" r="12" fill="#1E293B" stroke="#94A3B8" strokeWidth="3"/>
                  </svg>
                </div>

                {/* Pagination */}
                <div style={{ display: "flex", gap: 8, cursor: "pointer" }} onClick={() => setActiveScreen("02")}>
                  <div style={{ width: 28, height: 8, borderRadius: 4, background: "#22C55E" }} />
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                </div>
              </div>
            )}

            {/* ─── 02: ONBOARDING 1 ─── */}
            {activeScreen === "02" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px 30px" }}>
                <div style={{ width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 300 240" width="100%" height="100%">
                    <path d="M30 120 C 100 80, 200 160, 270 110" stroke="#DCFCE7" strokeWidth="40" strokeLinecap="round" fill="none" />
                    <g transform="translate(130, 40)">
                      <path d="M20 0 C 8 0, 0 8, 0 20 C 0 35, 20 50, 20 50 C 20 50, 40 35, 40 20 C 40 8, 32 0, 20 0 Z" fill="#22C55E" />
                      <circle cx="20" cy="20" r="8" fill="#FFF" />
                    </g>
                    {/* Car */}
                    <rect x="90" y="140" width="120" height="40" rx="10" fill="#FFF" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="120" cy="180" r="10" fill="#1E293B" />
                    <circle cx="180" cy="180" r="10" fill="#1E293B" />
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Find Parking Anywhere</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0, padding: "0 10px" }}>Discover safe and affordable parking spaces near you.</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Skip</button>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 24, height: 8, borderRadius: 4, background: "#22C55E" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                  </div>
                  <button onClick={() => setActiveScreen("03")} style={{ width: 44, height: 44, borderRadius: "50%", background: "#22C55E", border: "none", color: "#FFF", fontSize: 18, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
                </div>
              </div>
            )}

            {/* ─── 03: ONBOARDING 2 ─── */}
            {activeScreen === "03" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px 30px" }}>
                <div style={{ width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 300 240" width="100%" height="100%">
                    {/* Garage & House */}
                    <path d="M50 180 L50 100 L150 40 L250 100 L250 180 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
                    <rect x="90" y="110" width="120" height="70" fill="#334155" rx="6" />
                    {/* Parked Car */}
                    <rect x="110" y="130" width="80" height="40" rx="8" fill="#FFF" stroke="#0F172A" strokeWidth="2" />
                    {/* Rupee Coin */}
                    <circle cx="230" cy="70" r="22" fill="#22C55E" />
                    <text x="230" y="78" textAnchor="middle" fill="#FFF" fontSize="22" fontWeight="bold">₹</text>
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Earn From Your Extra Space</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0, padding: "0 10px" }}>List your parking space and start earning passive income.</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Skip</button>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 24, height: 8, borderRadius: 4, background: "#22C55E" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                  </div>
                  <button onClick={() => setActiveScreen("04")} style={{ width: 44, height: 44, borderRadius: "50%", background: "#22C55E", border: "none", color: "#FFF", fontSize: 18, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
                </div>
              </div>
            )}

            {/* ─── 04: ONBOARDING 3 ─── */}
            {activeScreen === "04" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px 30px" }}>
                <div style={{ width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 300 240" width="100%" height="100%">
                    <path d="M40 190 L260 190" stroke="#CBD5E1" strokeWidth="4" />
                    {/* SUV */}
                    <rect x="70" y="120" width="160" height="50" rx="10" fill="#FFF" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="110" cy="170" r="12" fill="#1E293B" />
                    <circle cx="190" cy="170" r="12" fill="#1E293B" />
                    {/* Shield */}
                    <g transform="translate(125, 40)">
                      <path d="M25 0 L50 15 V40 C50 65 25 80 25 80 C25 80 0 65 0 40 V15 Z" fill="#22C55E" />
                      <path d="M15 38 L22 45 L35 30" stroke="#FFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </g>
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Safe. Secure. Trusted.</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0, padding: "0 10px" }}>Verified hosts, secure payments and 24/7 support for a worry-free experience.</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Skip</button>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 24, height: 8, borderRadius: 4, background: "#22C55E" }} />
                  </div>
                  <button onClick={() => setActiveScreen("05")} style={{ width: 44, height: 44, borderRadius: "50%", background: "#22C55E", border: "none", color: "#FFF", fontSize: 18, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
                </div>
              </div>
            )}

            {/* ─── 05: CHOOSE ROLE ─── */}
            {activeScreen === "05" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 30px", justifyContent: "space-between" }}>
                <div>
                  <button onClick={() => setActiveScreen("04")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 20 }}>←</button>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 6px", textAlign: "center" }}>Choose Your Role</h2>
                  <p style={{ fontSize: 14, color: "#64748B", textAlign: "center", margin: "0 0 32px" }}>Let's get you started</p>
                  
                  {/* Card 1: Driver */}
                  <div
                    onClick={() => { setRole("driver"); setActiveScreen("06"); }}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: 20,
                      padding: 20,
                      marginBottom: 16,
                      border: "1.5px solid #E2E8F0",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.04)"
                    }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 26 }}>👤</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>I'm Looking for Parking</h3>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Find and book parking spaces near you.</p>
                    </div>
                    <span style={{ color: "#94A3B8", fontSize: 18, fontWeight: "bold" }}>›</span>
                  </div>

                  {/* Card 2: Host */}
                  <div
                    onClick={() => { setRole("host"); setActiveScreen("06"); }}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: 20,
                      padding: 20,
                      border: "1.5px solid #E2E8F0",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.04)"
                    }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 26 }}>🏠</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>I Have a Parking Space</h3>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>List your space and start earning.</p>
                    </div>
                    <span style={{ color: "#94A3B8", fontSize: 18, fontWeight: "bold" }}>›</span>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("08")} style={{ width: "100%", background: "none", border: "none", color: "#64748B", fontWeight: 600, fontSize: 14, cursor: "pointer", padding: 12 }}>
                  Skip for now
                </button>
              </div>
            )}

            {/* ─── 06: LOGIN SCREEN ─── */}
            {activeScreen === "06" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 30px", justifyContent: "space-between" }}>
                <div>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 20 }}>←</button>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Welcome Back!</h2>
                  <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 28px" }}>Login to continue</p>
                  
                  {/* Phone input */}
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 6 }}>Phone Number</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 16 }}>🇮🇳</span>
                    <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>+91</span>
                    <input type="text" defaultValue="98765 43210" style={{ border: "none", outline: "none", flex: 1, fontSize: 16, fontWeight: 600, color: "#0F172A" }} />
                  </div>

                  {/* Password input */}
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 6 }}>Password</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <input type="password" defaultValue="12345678" style={{ border: "none", outline: "none", flex: 1, fontSize: 16, color: "#0F172A" }} />
                    <span style={{ color: "#94A3B8", cursor: "pointer" }}>👁</span>
                  </div>

                  <div style={{ textAlign: "right", marginBottom: 24 }}>
                    <span style={{ color: "#22C55E", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Forgot Password?</span>
                  </div>

                  {/* Login button */}
                  <button onClick={() => setActiveScreen("07")} style={{ width: "100%", padding: "16px", borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                    Login
                  </button>

                  <div style={{ textAlign: "center", margin: "24px 0 16px", color: "#94A3B8", fontSize: 12 }}>or continue with</div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                    <button style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid #E2E8F0", background: "#FFF", fontSize: 18, cursor: "pointer" }}>G</button>
                    <button style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid #E2E8F0", background: "#FFF", fontSize: 18, cursor: "pointer" }}></button>
                    <button style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid #E2E8F0", background: "#FFF", fontSize: 18, cursor: "pointer" }}>📞</button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 07: ENTER OTP ─── */}
            {activeScreen === "07" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 20px", justifyContent: "space-between" }}>
                <div>
                  <button onClick={() => setActiveScreen("06")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 20 }}>←</button>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 6px", textAlign: "center" }}>Enter OTP</h2>
                  <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", margin: "0 0 24px" }}>
                    We've sent a 6 digit code to <br/><strong style={{ color: "#0F172A" }}>+91 98765 43210</strong>
                  </p>

                  {/* 6 OTP boxes */}
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                    {otpVal.map((v, idx) => (
                      <div key={idx} style={{ width: 48, height: 52, borderRadius: 12, border: "2px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#0F172A", background: "#F8FAFC" }}>
                        {v}
                      </div>
                    ))}
                  </div>

                  <p style={{ textAlign: "center", fontSize: 13, color: "#64748B" }}>
                    Resend OTP in <span style={{ color: "#22C55E", fontWeight: 700 }}>00:30</span>
                  </p>
                </div>

                {/* Keypad */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, padding: "10px 0" }}>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"].map((k) => (
                    <button
                      key={k}
                      onClick={() => { if (k === "✓") setActiveScreen("08"); }}
                      style={{
                        padding: "16px 0",
                        borderRadius: 14,
                        border: "none",
                        background: k === "✓" ? "#22C55E" : "#F1F5F9",
                        color: k === "✓" ? "#FFF" : "#0F172A",
                        fontSize: 20,
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── 08: HOME / SEARCH (MAP VIEW) ─── */}
            {activeScreen === "08" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
                {/* Header Bar */}
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF" }}>
                  <button style={{ background: "none", border: "none", fontSize: 20 }}>☰</button>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 900, fontSize: 16 }}>P</div>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Paarkkar</span>
                  </div>
                  <button style={{ background: "none", border: "none", fontSize: 20 }}>🔔</button>
                </div>

                {/* Search Bar */}
                <div style={{ padding: "8px 16px 12px", background: "#FFF" }}>
                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "10px 14px", alignItems: "center", gap: 10 }}>
                    <span>🔍</span>
                    <input type="text" placeholder="Search location" defaultValue="Anna Nagar, Chennai" style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 600 }} />
                    <button style={{ background: "none", border: "none", cursor: "pointer" }}>𝄯</button>
                  </div>

                  {/* Tabs */}
                  <div style={{ display: "flex", gap: 24, marginTop: 14, borderBottom: "1px solid #E2E8F0" }}>
                    {["Nearby", "Favorites", "Recent"].map((t) => (
                      <span
                        key={t}
                        onClick={() => { setTabIndex(t); if (t === "Favorites") setActiveScreen("09"); }}
                        style={{
                          paddingBottom: 8,
                          fontSize: 14,
                          fontWeight: tabIndex === t ? 800 : 600,
                          color: tabIndex === t ? "#22C55E" : "#64748B",
                          borderBottom: tabIndex === t ? "2.5px solid #22C55E" : "none",
                          cursor: "pointer"
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Map View Area */}
                <div style={{ flex: 1, background: "#E2E8F0", position: "relative", overflow: "hidden" }}>
                  <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <path d="M0 100 L400 120 M0 240 L400 220 M120 0 L140 400 M280 0 L260 400" stroke="#FFF" strokeWidth="24" />
                    <circle cx="200" cy="180" r="10" fill="#3B82F6" stroke="#FFF" strokeWidth="4" />
                  </svg>

                  {/* Map Price Pins */}
                  <div style={{ position: "absolute", top: 80, left: 60, background: "#0F172A", color: "#FFF", padding: "4px 8px", borderRadius: 12, fontWeight: 800, fontSize: 12 }}>₹60</div>
                  <div style={{ position: "absolute", top: 50, right: 80, background: "#0F172A", color: "#FFF", padding: "4px 8px", borderRadius: 12, fontWeight: 800, fontSize: 12 }}>₹30</div>
                  <div style={{ position: "absolute", top: 160, right: 50, background: "#0F172A", color: "#FFF", padding: "4px 8px", borderRadius: 12, fontWeight: 800, fontSize: 12 }}>₹30</div>
                  <div style={{ position: "absolute", bottom: 140, left: 100, width: 26, height: 26, borderRadius: "50%", background: "#22C55E", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>P</div>

                  {/* Floating Bottom Card */}
                  <div style={{ position: "absolute", bottom: 12, left: 16, right: 16, background: "#FFF", borderRadius: 18, padding: 14, boxShadow: "0 10px 25px rgba(0,0,0,0.12)", display: "flex", gap: 12, alignItems: "center" }}>
                    <img src={selectedSpot.image} alt="spot" style={{ width: 70, height: 70, borderRadius: 12, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{selectedSpot.title}</h4>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748B" }}>{selectedSpot.address}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                        <span style={{ color: "#F59E0B", fontWeight: 700 }}>★ {selectedSpot.rating}</span>
                        <span style={{ fontWeight: 800, color: "#0F172A" }}>₹{selectedSpot.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></span>
                      </div>
                    </div>
                    <button onClick={() => setActiveScreen("10")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "10px 14px", borderRadius: 12, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 09: NEARBY SPACES (LIST VIEW) ─── */}
            {activeScreen === "09" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                {/* Header Bar */}
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF" }}>
                  <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", fontSize: 20 }}>☰</button>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 900, fontSize: 16 }}>P</div>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Paarkkar</span>
                  </div>
                  <button style={{ background: "none", border: "none", fontSize: 20 }}>🔔</button>
                </div>

                {/* Search & Tabs */}
                <div style={{ padding: "8px 16px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "10px 14px", alignItems: "center", gap: 10 }}>
                    <span>🔍</span>
                    <input type="text" placeholder="Search location" defaultValue="Anna Nagar, Chennai" style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 600 }} />
                    <button style={{ background: "none", border: "none" }}>𝄯</button>
                  </div>
                  <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
                    <span style={{ paddingBottom: 8, fontSize: 14, fontWeight: 800, color: "#22C55E", borderBottom: "2.5px solid #22C55E" }}>Nearby</span>
                    <span style={{ paddingBottom: 8, fontSize: 14, fontWeight: 600, color: "#64748B" }}>Favorites</span>
                    <span style={{ paddingBottom: 8, fontSize: 14, fontWeight: 600, color: "#64748B" }}>Recent</span>
                  </div>
                </div>

                {/* List Cards */}
                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  {[
                    { title: "Home Garage", loc: "Anna Nagar, Chennai", dist: "0.2 km", rate: "4.8 (120)", price: "40", img: "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=400&q=80" },
                    { title: "Office Basement", loc: "T. Nagar, Chennai", dist: "0.4 km", rate: "4.6 (98)", price: "60", img: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=400&q=80" },
                    { title: "Apartment Parking", loc: "West Mambalam, Chennai", dist: "0.6 km", rate: "4.7 (76)", price: "35", img: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=400&q=80" },
                  ].map((item, idx) => (
                    <div key={idx} style={{ background: "#FFF", borderRadius: 16, padding: 12, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center" }}>
                      <img src={item.img} alt="parking" style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{item.title}</h4>
                          <span style={{ fontSize: 11, color: "#64748B" }}>📍 {item.dist}</span>
                        </div>
                        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748B" }}>{item.loc}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <span style={{ color: "#F59E0B", fontSize: 12, fontWeight: 700 }}>★ {item.rate}</span>
                            <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 14 }}>₹{item.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></div>
                          </div>
                          <button onClick={() => { setSelectedSpot({...selectedSpot, title: item.title, address: item.loc, price: item.price}); setActiveScreen("10"); }} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "8px 14px", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── 10: PARKING DETAILS ─── */}
            {activeScreen === "10" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF" }}>
                {/* Image Header with icons */}
                <div style={{ height: 220, position: "relative" }}>
                  <img src={selectedSpot.image} alt="Detail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
                    <button onClick={() => setActiveScreen("09")} style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", fontSize: 16, cursor: "pointer" }}>♡</button>
                      <button style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", fontSize: 16, cursor: "pointer" }}>⎘</button>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 12, right: 16, background: "rgba(0,0,0,0.6)", color: "#FFF", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                    1/6
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: 0 }}>{selectedSpot.title}</h2>
                      <span style={{ color: "#F59E0B", fontWeight: 800, fontSize: 14 }}>★ {selectedSpot.rating}</span>
                    </div>
                    <p style={{ color: "#64748B", fontSize: 13, margin: "0 0 16px" }}>{selectedSpot.address}</p>

                    {/* Facility Badges */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                      {selectedSpot.features.map((f, idx) => (
                        <span key={idx} style={{ background: "#F1F5F9", color: "#475569", fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 8 }}>
                          {f}
                        </span>
                      ))}
                    </div>

                    <div style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", marginBottom: 16 }}>
                      ₹{selectedSpot.price} <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>/hr</span>
                    </div>

                    <h4 style={{ fontSize: 15, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>About this space</h4>
                    <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                      {selectedSpot.about}
                    </p>
                  </div>

                  {/* Bottom Action Bar */}
                  <div style={{ display: "flex", gap: 12, paddingTop: 16, borderTop: "1px solid #E2E8F0" }}>
                    <button style={{ flex: 1, padding: 14, borderRadius: 14, border: "1.5px solid #E2E8F0", background: "#FFF", color: "#0F172A", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                      ♡ Add to Favorites
                    </button>
                    <button onClick={() => alert("Booking confirmed for " + selectedSpot.title)} style={{ flex: 1, padding: 14, borderRadius: 14, border: "none", background: "#22C55E", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.3)" }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
