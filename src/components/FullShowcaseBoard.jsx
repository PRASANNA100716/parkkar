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
  const [activeScreen, setActiveScreen] = useState("01"); // 01 to 50
  const [role, setRole] = useState(null); // driver | host
  const [otpVal, setOtpVal] = useState(["2", "4", "6", "8", "2", "1"]);
  const [tabIndex, setTabIndex] = useState("Nearby"); // Nearby | Favorites | Recent
  
  // Booking & Form state
  const [selectedDate, setSelectedDate] = useState("21 May");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [durationHours, setDurationHours] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [extendOption, setExtendOption] = useState("1 Hour");
  const [bookingFilter, setBookingFilter] = useState("Completed");
  const [notifFilter, setNotifFilter] = useState("All");

  // Host Space Form state
  const [spacePrice, setSpacePrice] = useState("40");
  const [vehicleType, setVehicleType] = useState("Car");
  const [withdrawAmount, setWithdrawAmount] = useState("2000");
  const [withdrawMethod, setWithdrawMethod] = useState("bank");

  const [selectedSpot, setSelectedSpot] = useState({
    title: "Home Garage",
    address: "Anna Nagar, Chennai",
    rating: "4.8 (120)",
    price: 40,
    distance: "0.2 km",
    image: "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=800&q=80",
    features: ["Covered", "CCTV", "24/7 Access", "EV Ready"],
    about: "Private garage with 24/7 access. Safe and secure. Suitable for all vehicle types."
  });

  const screensList = [
    { id: "01", name: "01 Splash" },
    { id: "02", name: "02 Onboard 1" },
    { id: "03", name: "03 Onboard 2" },
    { id: "04", name: "04 Onboard 3" },
    { id: "05", name: "05 Role" },
    { id: "06", name: "06 Login" },
    { id: "07", name: "07 OTP" },
    { id: "08", name: "08 Map View" },
    { id: "09", name: "09 List View" },
    { id: "10", name: "10 Details" },
    { id: "11", name: "11 Date & Time" },
    { id: "12", name: "12 Summary" },
    { id: "13", name: "13 Payment" },
    { id: "14", name: "14 Success" },
    { id: "15", name: "15 Active Parking" },
    { id: "16", name: "16 QR Check-in" },
    { id: "17", name: "17 Navigation" },
    { id: "18", name: "18 Extend Parking" },
    { id: "19", name: "19 Complete" },
    { id: "20", name: "20 My Bookings" },
    { id: "21", name: "21 Wallet" },
    { id: "22", name: "22 Notifications" },
    { id: "23", name: "23 Favorites" },
    { id: "24", name: "24 Profile" },
    { id: "25", name: "25 Settings" },
    { id: "26", name: "26 Help & Support" },
    { id: "27", name: "27 Invite & Earn" },
    { id: "28", name: "28 History Details" },
    { id: "29", name: "29 Host Dashboard" },
    { id: "30", name: "30 Add Space 1" },
    { id: "31", name: "31 Add Location" },
    { id: "32", name: "32 Add Pricing" },
    { id: "33", name: "33 Add Photos" },
    { id: "34", name: "34 Review & Publish" },
    { id: "35", name: "35 Space Submitted" },
    { id: "36", name: "36 My Listings" },
    { id: "37", name: "37 Booking Requests" },
    { id: "38", name: "38 Earnings Overview" },
    { id: "39", name: "39 Withdraw Earnings" },
    { id: "40", name: "40 Reviews & Ratings" },
    { id: "41", name: "41 Analytics" },
    { id: "42", name: "42 Payout History" },
    { id: "43", name: "43 My Vehicles" },
    { id: "44", name: "44 Address Book" },
    { id: "45", name: "45 Support Center" },
    { id: "46", name: "46 Payment Methods" },
    { id: "47", name: "47 Offers & Promos" },
    { id: "48", name: "48 Invite Friends" },
    { id: "49", name: "49 Notifs (Detailed)" },
    { id: "50", name: "50 Settings (More)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#CBD5E1", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
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
        <div style={{ width: "100%", maxWidth: 410, height: "100%", maxHeight: 840, background: activeScreen === "15" || activeScreen === "17" ? "#0F172A" : "#FFFFFF", borderRadius: 32, boxShadow: "0 25px 60px rgba(0,0,0,0.25)", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
          
          {/* STATUS BAR */}
          <div style={{ height: 40, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 700, color: activeScreen === "15" || activeScreen === "17" ? "#FFF" : "#0F172A", zIndex: 50 }}>
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
                    <path d="M80 150 Q 95 125 130 120 L 210 120 Q 240 125 260 148 Q 275 152 275 160 L 75 160 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3"/>
                    <path d="M130 125 L 160 125 L 160 142 L 115 142 Z" fill="#38BDF8" opacity="0.75"/>
                    <path d="M168 125 L 205 125 L 215 142 L 168 142 Z" fill="#38BDF8" opacity="0.75"/>
                    <circle cx="110" cy="160" r="12" fill="#1E293B" stroke="#94A3B8" strokeWidth="3"/>
                    <circle cx="230" cy="160" r="12" fill="#1E293B" stroke="#94A3B8" strokeWidth="3"/>
                  </svg>
                </div>

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
                    <rect x="90" y="140" width="120" height="40" rx="10" fill="#FFF" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="120" cy="180" r="10" fill="#1E293B" />
                    <circle cx="180" cy="180" r="10" fill="#1E293B" />
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Find Parking Anywhere</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0 }}>Discover safe and affordable parking spaces near you.</p>
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
                    <path d="M50 180 L50 100 L150 40 L250 100 L250 180 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
                    <rect x="90" y="110" width="120" height="70" fill="#334155" rx="6" />
                    <rect x="110" y="130" width="80" height="40" rx="8" fill="#FFF" stroke="#0F172A" strokeWidth="2" />
                    <circle cx="230" cy="70" r="22" fill="#22C55E" />
                    <text x="230" y="78" textAnchor="middle" fill="#FFF" fontSize="22" fontWeight="bold">₹</text>
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Earn From Your Extra Space</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0 }}>List your parking space and start earning passive income.</p>
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
                    <rect x="70" y="120" width="160" height="50" rx="10" fill="#FFF" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="110" cy="170" r="12" fill="#1E293B" />
                    <circle cx="190" cy="170" r="12" fill="#1E293B" />
                    <g transform="translate(125, 40)">
                      <path d="M25 0 L50 15 V40 C50 65 25 80 25 80 C25 80 0 65 0 40 V15 Z" fill="#22C55E" />
                      <path d="M15 38 L22 45 L35 30" stroke="#FFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </g>
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Safe. Secure. Trusted.</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0 }}>Verified hosts, secure payments and 24/7 support for a worry-free experience.</p>
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
                  
                  <div onClick={() => { setRole("driver"); setActiveScreen("06"); }} style={{ background: "#FFFFFF", borderRadius: 20, padding: 20, marginBottom: 16, border: "1.5px solid #E2E8F0", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 26 }}>👤</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>I'm Looking for Parking</h3>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Find and book parking spaces near you.</p>
                    </div>
                    <span style={{ color: "#94A3B8", fontSize: 18, fontWeight: "bold" }}>›</span>
                  </div>

                  <div onClick={() => { setRole("host"); setActiveScreen("29"); }} style={{ background: "#FFFFFF", borderRadius: 20, padding: 20, border: "1.5px solid #E2E8F0", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
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
                  
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 6 }}>Phone Number</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 16 }}>🇮🇳</span>
                    <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>+91</span>
                    <input type="text" defaultValue="98765 43210" style={{ border: "none", outline: "none", flex: 1, fontSize: 16, fontWeight: 600, color: "#0F172A" }} />
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 6 }}>Password</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <input type="password" defaultValue="12345678" style={{ border: "none", outline: "none", flex: 1, fontSize: 16, color: "#0F172A" }} />
                    <span style={{ color: "#94A3B8", cursor: "pointer" }}>👁</span>
                  </div>

                  <div style={{ textAlign: "right", marginBottom: 24 }}>
                    <span style={{ color: "#22C55E", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Forgot Password?</span>
                  </div>

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
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF" }}>
                  <button onClick={() => setActiveScreen("22")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>☰</button>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 900, fontSize: 16 }}>P</div>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Paarkkar</span>
                  </div>
                  <button onClick={() => setActiveScreen("22")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>🔔</button>
                </div>

                <div style={{ padding: "8px 16px 12px", background: "#FFF" }}>
                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "10px 14px", alignItems: "center", gap: 10 }}>
                    <span>🔍</span>
                    <input type="text" placeholder="Search location" defaultValue="Anna Nagar, Chennai" style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 600 }} />
                    <button style={{ background: "none", border: "none", cursor: "pointer" }}>𝄯</button>
                  </div>

                  <div style={{ display: "flex", gap: 24, marginTop: 14, borderBottom: "1px solid #E2E8F0" }}>
                    {["Nearby", "Favorites", "Recent"].map((t) => (
                      <span
                        key={t}
                        onClick={() => { setTabIndex(t); if (t === "Favorites") setActiveScreen("23"); }}
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

                <div style={{ flex: 1, background: "#E2E8F0", position: "relative", overflow: "hidden" }}>
                  <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <path d="M0 100 L400 120 M0 240 L400 220 M120 0 L140 400 M280 0 L260 400" stroke="#FFF" strokeWidth="24" />
                    <circle cx="200" cy="180" r="10" fill="#3B82F6" stroke="#FFF" strokeWidth="4" />
                  </svg>

                  <div style={{ position: "absolute", top: 80, left: 60, background: "#0F172A", color: "#FFF", padding: "4px 8px", borderRadius: 12, fontWeight: 800, fontSize: 12 }}>₹60</div>
                  <div style={{ position: "absolute", top: 50, right: 80, background: "#0F172A", color: "#FFF", padding: "4px 8px", borderRadius: 12, fontWeight: 800, fontSize: 12 }}>₹30</div>
                  <div style={{ position: "absolute", top: 160, right: 50, background: "#0F172A", color: "#FFF", padding: "4px 8px", borderRadius: 12, fontWeight: 800, fontSize: 12 }}>₹30</div>
                  <div style={{ position: "absolute", bottom: 140, left: 100, width: 26, height: 26, borderRadius: "50%", background: "#22C55E", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>P</div>

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
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF" }}>
                  <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", fontSize: 20 }}>☰</button>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 900, fontSize: 16 }}>P</div>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Paarkkar</span>
                  </div>
                  <button style={{ background: "none", border: "none", fontSize: 20 }}>🔔</button>
                </div>

                <div style={{ padding: "8px 16px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "10px 14px", alignItems: "center", gap: 10 }}>
                    <span>🔍</span>
                    <input type="text" placeholder="Search location" defaultValue="Anna Nagar, Chennai" style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 600 }} />
                    <button style={{ background: "none", border: "none" }}>𝄯</button>
                  </div>
                  <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
                    <span style={{ paddingBottom: 8, fontSize: 14, fontWeight: 800, color: "#22C55E", borderBottom: "2.5px solid #22C55E" }}>Nearby</span>
                    <span onClick={() => setActiveScreen("23")} style={{ paddingBottom: 8, fontSize: 14, fontWeight: 600, color: "#64748B", cursor: "pointer" }}>Favorites</span>
                    <span style={{ paddingBottom: 8, fontSize: 14, fontWeight: 600, color: "#64748B" }}>Recent</span>
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  {[
                    { title: "Home Garage", loc: "Anna Nagar, Chennai", dist: "0.2 km", rate: "4.8 (120)", price: 40, img: "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=400&q=80" },
                    { title: "Office Basement", loc: "T. Nagar, Chennai", dist: "0.4 km", rate: "4.6 (98)", price: 60, img: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=400&q=80" },
                    { title: "Apartment Parking", loc: "West Mambalam, Chennai", dist: "0.6 km", rate: "4.7 (76)", price: 35, img: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=400&q=80" },
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
                <div style={{ height: 220, position: "relative" }}>
                  <img src={selectedSpot.image} alt="Detail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
                    <button onClick={() => setActiveScreen("09")} style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setActiveScreen("23")} style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", fontSize: 16, cursor: "pointer" }}>♡</button>
                      <button style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", fontSize: 16, cursor: "pointer" }}>⎘</button>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 12, right: 16, background: "rgba(0,0,0,0.6)", color: "#FFF", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                    1/6
                  </div>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: 0 }}>{selectedSpot.title}</h2>
                      <span style={{ color: "#F59E0B", fontWeight: 800, fontSize: 14 }}>★ {selectedSpot.rating}</span>
                    </div>
                    <p style={{ color: "#64748B", fontSize: 13, margin: "0 0 16px" }}>{selectedSpot.address}</p>

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

                  <div style={{ display: "flex", gap: 12, paddingTop: 16, borderTop: "1px solid #E2E8F0" }}>
                    <button onClick={() => setActiveScreen("23")} style={{ flex: 1, padding: 14, borderRadius: 14, border: "1.5px solid #E2E8F0", background: "#FFF", color: "#0F172A", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                      ♡ Add to Favorites
                    </button>
                    <button onClick={() => setActiveScreen("11")} style={{ flex: 1, padding: 14, borderRadius: 14, border: "none", background: "#22C55E", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.3)" }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 11: SELECT DATE & TIME ─── */}
            {activeScreen === "11" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("10")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", textAlign: "center" }}>Select Date & Time</h2>
                  <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", margin: "0 0 24px" }}>Choose your parking duration</p>

                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 10 }}>Date</label>
                  <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 24, paddingBottom: 4 }}>
                    {[
                      { day: "Mon", date: "21", month: "May" },
                      { day: "Tue", date: "22", month: "May" },
                      { day: "Wed", date: "23", month: "May" },
                      { day: "Thu", date: "24", month: "May" },
                      { day: "Fri", date: "26", month: "May" },
                      { day: "Sat", date: "27", month: "May" },
                    ].map((d) => {
                      const isActive = selectedDate === `${d.date} May`;
                      return (
                        <div
                          key={d.date}
                          onClick={() => setSelectedDate(`${d.date} May`)}
                          style={{
                            minWidth: 54,
                            padding: "10px 8px",
                            borderRadius: 14,
                            border: isActive ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                            background: isActive ? "#F0FDF4" : "#FFF",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "all 0.15s"
                          }}
                        >
                          <div style={{ fontSize: 11, color: isActive ? "#22C55E" : "#64748B", fontWeight: 700 }}>{d.day}</div>
                          <div style={{ fontSize: 18, fontWeight: 900, color: isActive ? "#22C55E" : "#0F172A", margin: "2px 0" }}>{d.date}</div>
                          <div style={{ fontSize: 11, color: isActive ? "#22C55E" : "#94A3B8" }}>{d.month}</div>
                        </div>
                      );
                    })}
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 10 }}>Time</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
                    {["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM"].map((t) => {
                      const isActive = selectedTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          style={{
                            padding: "12px 6px",
                            borderRadius: 12,
                            border: isActive ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                            background: isActive ? "#F0FDF4" : "#FFF",
                            color: isActive ? "#22C55E" : "#0F172A",
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: "pointer"
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 8 }}>Duration</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "14px 16px", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>{durationHours} Hours</span>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => setDurationHours(Math.max(1, durationHours - 1))} style={{ width: 28, height: 28, borderRadius: "50%", background: "#F1F5F9", border: "none", fontWeight: 900, cursor: "pointer" }}>-</button>
                      <button onClick={() => setDurationHours(durationHours + 1)} style={{ width: 28, height: 28, borderRadius: "50%", background: "#F1F5F9", border: "none", fontWeight: 900, cursor: "pointer" }}>+</button>
                    </div>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("12")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Continue
                </button>
              </div>
            )}

            {/* ─── 12: BOOKING SUMMARY ─── */}
            {activeScreen === "12" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#F8FAFC" }}>
                <div>
                  <button onClick={() => setActiveScreen("11")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: "0 0 20px", textAlign: "center" }}>Booking Summary</h2>

                  <div style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                    <img src={selectedSpot.image} alt="Summary" style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{selectedSpot.title}</h4>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748B" }}>{selectedSpot.address}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                        <span style={{ color: "#F59E0B", fontWeight: 700 }}>★ {selectedSpot.rating}</span>
                        <span style={{ color: "#64748B", fontWeight: 600 }}>📍 {selectedSpot.distance}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Date</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>{selectedDate} 2025</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Time</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>10:00 AM - 12:00 PM</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Duration</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>{durationHours} Hours</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Price</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>₹{selectedSpot.price} / hr</span>
                    </div>
                    <div style={{ borderTop: "1px dashed #E2E8F0", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 16 }}>
                      <span style={{ fontWeight: 800, color: "#0F172A" }}>Total Price</span>
                      <span style={{ fontWeight: 900, color: "#22C55E" }}>₹{selectedSpot.price * durationHours}</span>
                    </div>
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 6 }}>Apply Coupon</label>
                  <div onClick={() => setActiveScreen("47")} style={{ background: "#FFF", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                    <span style={{ color: "#94A3B8", fontSize: 13 }}>Select a coupon</span>
                    <span style={{ color: "#64748B", fontWeight: "bold" }}>›</span>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("13")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Proceed to Payment
                </button>
              </div>
            )}

            {/* ─── 13: PAYMENT METHOD ─── */}
            {activeScreen === "13" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("12")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", textAlign: "center" }}>Payment</h2>
                  <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", margin: "0 0 20px" }}>Choose a payment method</p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Total Payable</span>
                    <span style={{ fontSize: 22, fontWeight: 900, color: "#22C55E" }}>₹80</span>
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 10 }}>Recommended</label>

                  {[
                    { id: "upi", title: "UPI", desc: "Pay instantly", icon: "🅿️" },
                    { id: "card", title: "Cards", desc: "Visa, Mastercard, RuPay", icon: "💳" },
                    { id: "wallet", title: "Wallet", desc: "Paarkkar Wallet (₹250 available)", icon: "👛" },
                    { id: "net", title: "Net Banking", desc: "All major banks", icon: "🏦" },
                    { id: "later", title: "Pay Later", desc: "Available for eligible users", icon: "⏳" },
                  ].map((p) => {
                    const isSelected = paymentMethod === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPaymentMethod(p.id)}
                        style={{
                          borderRadius: 16,
                          border: isSelected ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                          background: isSelected ? "#F0FDF4" : "#FFF",
                          padding: "14px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 10,
                          cursor: "pointer"
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{p.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 14 }}>{p.title}</div>
                          <div style={{ fontSize: 11, color: "#64748B" }}>{p.desc}</div>
                        </div>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: isSelected ? "5px solid #22C55E" : "2px solid #CBD5E1" }} />
                      </div>
                    );
                  })}

                  <div style={{ textAlign: "center", color: "#64748B", fontSize: 12, marginTop: 12 }}>
                    🔒 100% Secure Payments
                  </div>
                </div>

                <button onClick={() => setActiveScreen("14")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Pay ₹80 Securely
                </button>
              </div>
            )}

            {/* ─── 14: PAYMENT SUCCESS ─── */}
            {activeScreen === "14" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "30px 24px", justifyContent: "space-between", background: "#F8FAFC", textAlign: "center" }}>
                <div>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "20px auto 20px", color: "#FFF", fontSize: 40, boxShadow: "0 10px 30px rgba(34,197,94,0.4)" }}>
                    ✓
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Payment Successful!</h2>
                  <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 30px" }}>Your parking is confirmed</p>

                  <div style={{ background: "#FFF", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", textAlign: "left", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Booking ID</span>
                      <span style={{ fontWeight: 800, color: "#0F172A" }}>PKR89076543 📋</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Amount Paid</span>
                      <span style={{ fontWeight: 800, color: "#22C55E" }}>₹80</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Date & Time</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>21 May 2025, 10:00 AM</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <button onClick={() => setActiveScreen("15")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                    View Booking
                  </button>
                  <button onClick={() => setActiveScreen("20")} style={{ width: "100%", padding: 14, borderRadius: 16, background: "#FFF", border: "1.5px solid #E2E8F0", color: "#0F172A", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Go to My Bookings
                  </button>
                </div>
              </div>
            )}

            {/* ─── 15: ACTIVE PARKING (DARK THEME) ─── */}
            {activeScreen === "15" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#0F172A", color: "#FFF" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("14")} style={{ background: "none", border: "none", color: "#FFF", fontSize: 20, cursor: "pointer" }}>←</button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Active Parking</h3>
                    <span style={{ background: "rgba(34,197,94,0.2)", color: "#22C55E", border: "1px solid #22C55E", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 12 }}>🔴 Live</span>
                  </div>

                  <div style={{ background: "#1E293B", borderRadius: 18, padding: 14, display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                    <img src={selectedSpot.image} alt="Active" style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#FFF" }}>{selectedSpot.title}</h4>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#94A3B8" }}>{selectedSpot.address}</p>
                      <span style={{ fontSize: 11, color: "#94A3B8" }}>📍 {selectedSpot.distance}</span>
                    </div>
                    <button onClick={() => setActiveScreen("17")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "8px 12px", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                      Navigate ↗
                    </button>
                  </div>

                  <div style={{ background: "#1E293B", borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#94A3B8" }}>Booking ID</span>
                      <span style={{ fontWeight: 700, color: "#FFF" }}>PKR89076543</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#94A3B8" }}>Vehicle Number</span>
                      <span style={{ fontWeight: 700, color: "#FFF" }}>TN 09 AB 1234 📋</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#94A3B8" }}>Started From</span>
                      <span style={{ fontWeight: 700, color: "#FFF" }}>21 May 2025, 10:00 AM</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#94A3B8" }}>Started At</span>
                      <span style={{ fontWeight: 700, color: "#FFF" }}>21 May 2025, 12:00 PM</span>
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 700, marginBottom: 8, letterSpacing: "0.08em" }}>TIME REMAINING</div>
                    <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "0.05em", color: "#FFF" }}>
                      01 : 25 : 30
                    </div>
                    <div style={{ fontSize: 10, color: "#64748B", display: "flex", justifyContent: "center", gap: 36, marginTop: 4 }}>
                      <span>HRS</span><span>MINS</span><span>SECS</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => setActiveScreen("18")} style={{ flex: 1, padding: 14, borderRadius: 14, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    Extend Parking
                  </button>
                  <button onClick={() => setActiveScreen("16")} style={{ flex: 1, padding: 14, borderRadius: 14, background: "transparent", border: "1.5px solid #334155", color: "#FFF", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                    QR Check-in
                  </button>
                </div>
              </div>
            )}

            {/* ─── 16: QR CHECK-IN ─── */}
            {activeScreen === "16" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 30px", justifyContent: "space-between", background: "#FFF", textAlign: "center" }}>
                <div>
                  <button onClick={() => setActiveScreen("15")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12, alignSelf: "flex-start" }}>←</button>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>Check-in</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 30px" }}>Show this QR to the host</p>

                  <div style={{ width: 220, height: 220, margin: "0 auto 24px", background: "#FFF", borderRadius: 24, border: "2px solid #22C55E", padding: 16, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(34,197,94,0.15)" }}>
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                      <path d="M10 10 H40 V40 H10 Z M60 10 H90 V40 H60 Z M10 60 H40 V90 H10 Z" fill="#0F172A" />
                      <rect x="20" y="20" width="10" height="10" fill="#22C55E" />
                      <rect x="70" y="20" width="10" height="10" fill="#22C55E" />
                      <rect x="20" y="70" width="10" height="10" fill="#22C55E" />
                      <path d="M50 20 H60 V50 H50 Z M60 60 H90 V90 H60 Z M50 70 H60 V90 H50 Z" fill="#0F172A" />
                      <circle cx="50" cy="50" r="12" fill="#22C55E" />
                      <text x="50" y="54" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">P</text>
                    </svg>
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                    Booking ID <span style={{ color: "#64748B" }}>PKR89076543 📋</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#64748B" }}>
                    This QR is valid for <strong style={{ color: "#0F172A" }}>10:00 AM - 12:00 PM</strong>
                  </p>
                </div>

                <button onClick={() => setActiveScreen("17")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                  Start Navigation ↗
                </button>
              </div>
            )}

            {/* ─── 17: NAVIGATION TO PARKING ─── */}
            {activeScreen === "17" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", background: "#0B131F", color: "#FFF" }}>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, background: "#0F172A", zIndex: 10 }}>
                  <button onClick={() => setActiveScreen("15")} style={{ background: "none", border: "none", color: "#FFF", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Navigate</h3>
                </div>

                <div style={{ padding: "10px 16px", background: "#0F172A", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22C55E", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>P</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{selectedSpot.title}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{selectedSpot.address}</div>
                  </div>
                  <span style={{ fontSize: 12, color: "#22C55E", fontWeight: 700 }}>0.2 km</span>
                </div>

                <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                  <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <rect width="100%" height="100%" fill="#0B131F" />
                    <path d="M0 120 L400 140 M0 260 L400 240 M140 0 L160 400 M300 0 L280 400" stroke="#1E293B" strokeWidth="18" />
                    <path d="M200 320 L200 200 L300 140" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="200" cy="320" r="14" fill="#3B82F6" stroke="#FFF" strokeWidth="4" />
                    <circle cx="300" cy="140" r="16" fill="#22C55E" stroke="#FFF" strokeWidth="3" />
                  </svg>

                  <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, background: "#1E293B", borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span style={{ fontSize: 18, fontWeight: 900, color: "#22C55E" }}>2 min</span>
                        <span style={{ fontSize: 13, color: "#94A3B8", marginLeft: 6 }}>(0.2 km)</span>
                        <div style={{ fontSize: 11, color: "#64748B" }}>Fastest route</div>
                      </div>
                      <button onClick={() => setActiveScreen("18")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "12px 20px", borderRadius: 14, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                        Start Navigation ↗
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 18: EXTEND PARKING ─── */}
            {activeScreen === "18" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("15")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", textAlign: "center" }}>Extend Parking</h2>
                  <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", margin: "0 0 24px" }}>Choose new duration</p>

                  {[
                    { name: "+ 30 Minutes", price: "20" },
                    { name: "+ 1 Hour", price: "40" },
                    { name: "+ 2 Hours", price: "80" },
                    { name: "+ 3 Hours", price: "120" },
                  ].map((opt) => {
                    const isSelected = extendOption === opt.name;
                    return (
                      <div
                        key={opt.name}
                        onClick={() => setExtendOption(opt.name)}
                        style={{
                          borderRadius: 16,
                          border: isSelected ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                          background: isSelected ? "#F0FDF4" : "#FFF",
                          padding: "16px 18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 12,
                          cursor: "pointer"
                        }}
                      >
                        <span style={{ fontWeight: 800, color: "#0F172A", fontSize: 14 }}>{opt.name}</span>
                        <span style={{ fontWeight: 900, color: "#0F172A", fontSize: 15 }}>₹{opt.price}</span>
                      </div>
                    );
                  })}

                  <div style={{ marginTop: 24, textAlign: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748B" }}>New End Time</span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "4px 0 0" }}>21 May 2025, 01:00 PM</h3>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("19")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Extend Now - ₹40
                </button>
              </div>
            )}

            {/* ─── 19: BOOKING COMPLETE ─── */}
            {activeScreen === "19" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "30px 24px", justifyContent: "space-between", background: "#F8FAFC", textAlign: "center" }}>
                <div>
                  <div style={{ width: 140, height: 90, margin: "10px auto 20px", position: "relative" }}>
                    <svg viewBox="0 0 140 90" width="100%" height="100%">
                      <rect x="20" y="35" width="100" height="35" rx="8" fill="#22C55E" />
                      <circle cx="45" cy="70" r="8" fill="#1E293B" />
                      <circle cx="95" cy="70" r="8" fill="#1E293B" />
                      <circle cx="70" cy="20" r="16" fill="#22C55E" stroke="#FFF" strokeWidth="3" />
                      <path d="M64 20 L68 24 L76 16" stroke="#FFF" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Parking Completed!</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 28px" }}>Thank you for using Paarkkar.</p>

                  <div style={{ background: "#FFF", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", textAlign: "left", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Total Amount</span>
                      <span style={{ fontWeight: 900, color: "#22C55E" }}>₹80</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Duration</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>2 Hours</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>End Time</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>21 May 2025, 12:00 PM</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <button onClick={() => setActiveScreen("28")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                    View Receipt
                  </button>
                  <button onClick={() => setActiveScreen("08")} style={{ width: "100%", padding: 14, borderRadius: 16, background: "#FFF", border: "1.5px solid #E2E8F0", color: "#0F172A", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Go to Home
                  </button>
                </div>
              </div>
            )}

            {/* ─── 20: MY BOOKINGS (HISTORY) ─── */}
            {activeScreen === "20" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>My Bookings</h3>
                    <span style={{ width: 20 }} />
                  </div>

                  <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 14 }}>
                    {["Upcoming", "Completed", "Cancelled"].map((f) => (
                      <span
                        key={f}
                        onClick={() => setBookingFilter(f)}
                        style={{
                          padding: "6px 16px",
                          borderRadius: 20,
                          fontSize: 13,
                          fontWeight: 800,
                          background: bookingFilter === f ? "#DCFCE7" : "transparent",
                          color: bookingFilter === f ? "#22C55E" : "#64748B",
                          cursor: "pointer"
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "10px 14px", alignItems: "center", gap: 10 }}>
                    <span>🔍</span>
                    <input type="text" placeholder="Search bookings" style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 600 }} />
                    <span>𝄯</span>
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  {[
                    { title: "Home Garage", loc: "Anna Nagar, Chennai", date: "21 May 2025, 10:00 AM", dur: "2 Hours", price: "80", status: "Completed", img: "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=400&q=80" },
                    { title: "Office Basement", loc: "T. Nagar, Chennai", date: "19 May 2025, 06:00 PM", dur: "3 Hours", price: "120", status: "Completed", img: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=400&q=80" },
                    { title: "Shop Parking", loc: "Velachery, Chennai", date: "17 May 2025, 11:00 AM", dur: "1 Hour", price: "40", status: "Completed", img: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=400&q=80" },
                  ].map((b, idx) => (
                    <div key={idx} onClick={() => setActiveScreen("28")} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
                      <img src={b.img} alt="hist" style={{ width: 68, height: 68, borderRadius: 12, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <h4 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{b.title}</h4>
                          <span style={{ fontSize: 14, fontWeight: 900, color: "#0F172A" }}>₹{b.price}</span>
                        </div>
                        <p style={{ margin: "0 0 4px", fontSize: 11, color: "#64748B" }}>{b.loc}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                          <span style={{ color: "#94A3B8" }}>{b.date} • {b.dur}</span>
                          <span style={{ color: "#22C55E", fontWeight: 700 }}>{b.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ height: 60, background: "#FFF", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div onClick={() => setActiveScreen("08")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>🏠</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Home</div>
                  </div>
                  <div onClick={() => setActiveScreen("20")} style={{ textAlign: "center", cursor: "pointer", color: "#22C55E" }}>
                    <div style={{ fontSize: 18 }}>📑</div>
                    <div style={{ fontSize: 10, fontWeight: 800 }}>Bookings</div>
                  </div>
                  <div onClick={() => setActiveScreen("21")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>👛</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Wallet</div>
                  </div>
                  <div onClick={() => setActiveScreen("24")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>👤</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Profile</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 21: WALLET ─── */}
            {activeScreen === "21" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("20")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Wallet</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", gap: 20, overflowY: "auto" }}>
                  <div style={{ background: "#FFF", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                    <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Total Balance</span>
                    <h2 style={{ fontSize: 32, fontWeight: 900, color: "#0F172A", margin: "4px 0 16px" }}>₹1,250.00</h2>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 16 }}>
                      <span>Available Balance: <strong style={{ color: "#0F172A" }}>₹1,050.00</strong></span>
                      <span>In Hold: <strong style={{ color: "#0F172A" }}>₹200.00</strong></span>
                    </div>
                    <button style={{ width: "100%", padding: 14, borderRadius: 14, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                      Add Money
                    </button>
                  </div>

                  <div>
                    <label style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 12 }}>Quick Actions</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                      {[
                        { name: "Add Money", icon: "➕" },
                        { name: "Withdraw", icon: "🏦", screen: "39" },
                        { name: "Transactions", icon: "📄", screen: "42" },
                        { name: "Offers", icon: "🏷️", screen: "47" },
                      ].map((a, i) => (
                        <div key={i} onClick={() => a.screen && setActiveScreen(a.screen)} style={{ background: "#FFF", borderRadius: 16, padding: "12px 6px", border: "1px solid #E2E8F0", textAlign: "center", cursor: "pointer" }}>
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{a.icon}</div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#0F172A" }}>{a.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 12 }}>Recent Transactions</label>
                    <div style={{ background: "#FFF", borderRadius: 18, border: "1px solid #E2E8F0", padding: "8px 16px" }}>
                      {[
                        { title: "Booking Payment", desc: "Home Garage", val: "- ₹80", date: "21 May, 10:00 AM", neg: true },
                        { title: "Money Added", desc: "UPI Payment", val: "+ ₹500", date: "20 May, 06:30 PM", neg: false },
                        { title: "Refund", desc: "Shop Parking", val: "+ ₹40", date: "19 May, 11:45 AM", neg: false },
                      ].map((t, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: idx < 2 ? "1px solid #F1F5F9" : "none" }}>
                          <div>
                            <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 13 }}>{t.title}</div>
                            <div style={{ fontSize: 11, color: "#64748B" }}>{t.desc} • {t.date}</div>
                          </div>
                          <span style={{ fontWeight: 900, fontSize: 14, color: t.neg ? "#EF4444" : "#22C55E" }}>{t.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ height: 60, background: "#FFF", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div onClick={() => setActiveScreen("08")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>🏠</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Home</div>
                  </div>
                  <div onClick={() => setActiveScreen("20")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>📑</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Bookings</div>
                  </div>
                  <div onClick={() => setActiveScreen("21")} style={{ textAlign: "center", cursor: "pointer", color: "#22C55E" }}>
                    <div style={{ fontSize: 18 }}>👛</div>
                    <div style={{ fontSize: 10, fontWeight: 800 }}>Wallet</div>
                  </div>
                  <div onClick={() => setActiveScreen("24")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>👤</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Profile</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 22: NOTIFICATIONS ─── */}
            {activeScreen === "22" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Notifications</h3>
                    <button onClick={() => setActiveScreen("25")} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>⚙️</button>
                  </div>

                  <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
                    {["All", "Bookings", "Offers", "Updates"].map((f) => (
                      <span
                        key={f}
                        onClick={() => setNotifFilter(f)}
                        style={{
                          padding: "6px 16px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 800,
                          background: notifFilter === f ? "#22C55E" : "#F1F5F9",
                          color: notifFilter === f ? "#FFF" : "#64748B",
                          cursor: "pointer"
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  {[
                    { title: "Booking Confirmed", desc: "Home Garage • Your booking is confirmed.", time: "2m ago", icon: "🟢" },
                    { title: "Parking Reminder", desc: "Shop Parking • Your parking will expire in 30 mins.", time: "30m ago", icon: "🅿️" },
                    { title: "Payment Successful", desc: "₹80 has been paid successfully.", time: "1h ago", icon: "💳" },
                    { title: "Host Message", desc: "Ravi Kumar • Please park in slot No. 12.", time: "2h ago", icon: "💬" },
                    { title: "Offer Unlocked!", desc: "Flat 10% cashback on your next booking.", time: "1d ago", icon: "🏷️" },
                  ].map((n, i) => (
                    <div key={i} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 20 }}>{n.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{n.title}</h4>
                          <span style={{ fontSize: 11, color: "#94A3B8" }}>{n.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ height: 60, background: "#FFF", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div onClick={() => setActiveScreen("08")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>🏠</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Home</div>
                  </div>
                  <div onClick={() => setActiveScreen("20")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>📑</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Bookings</div>
                  </div>
                  <div onClick={() => setActiveScreen("21")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>👛</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Wallet</div>
                  </div>
                  <div onClick={() => setActiveScreen("24")} style={{ textAlign: "center", cursor: "pointer", color: "#22C55E" }}>
                    <div style={{ fontSize: 18 }}>👤</div>
                    <div style={{ fontSize: 10, fontWeight: 800 }}>Profile</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 23: FAVORITES ─── */}
            {activeScreen === "23" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>My Favorites</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  {[
                    { title: "Home Garage", loc: "Anna Nagar, Chennai", rate: "4.8 (120)", price: 40, fav: true, img: "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=400&q=80" },
                    { title: "Office Basement", loc: "T. Nagar, Chennai", rate: "4.6 (98)", price: 60, fav: true, img: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=400&q=80" },
                    { title: "Apartment Parking", loc: "West Mambalam, Chennai", rate: "4.7 (76)", price: 35, fav: true, img: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=400&q=80" },
                    { title: "Shop Parking", loc: "Velachery, Chennai", rate: "4.5 (64)", price: 40, fav: false, img: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=400&q=80" },
                  ].map((f, i) => (
                    <div key={i} onClick={() => setActiveScreen("10")} style={{ background: "#FFF", borderRadius: 16, padding: 12, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
                      <img src={f.img} alt="fav" style={{ width: 76, height: 76, borderRadius: 12, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{f.title}</h4>
                          <span style={{ fontSize: 16 }}>{f.fav ? "💚" : "♡"}</span>
                        </div>
                        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748B" }}>{f.loc}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "#F59E0B", fontSize: 12, fontWeight: 700 }}>★ {f.rate}</span>
                          <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 14 }}>₹{f.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ height: 60, background: "#FFF", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div onClick={() => setActiveScreen("08")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>🏠</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Home</div>
                  </div>
                  <div onClick={() => setActiveScreen("20")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>📑</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Bookings</div>
                  </div>
                  <div onClick={() => setActiveScreen("21")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>👛</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Wallet</div>
                  </div>
                  <div onClick={() => setActiveScreen("24")} style={{ textAlign: "center", cursor: "pointer", color: "#22C55E" }}>
                    <div style={{ fontSize: 18 }}>👤</div>
                    <div style={{ fontSize: 10, fontWeight: 800 }}>Profile</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 24: PROFILE ─── */}
            {activeScreen === "24" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={() => setActiveScreen("25")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>⚙️</button>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div style={{ background: "#FFF", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", textAlign: "center", position: "relative" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#CBD5E1", margin: "0 auto 10px", overflow: "hidden" }}>
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <h3 style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Dharani Prasanna</h3>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: "#64748B" }}>+91 98765 43210 • dharani@email.com</p>
                    <span style={{ background: "#DCFCE7", color: "#22C55E", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 12 }}>✓ Verified User</span>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 20, border: "1px solid #E2E8F0", overflow: "hidden" }}>
                    {[
                      { title: "Personal Information", icon: "👤", screen: "24" },
                      { title: "My Vehicles", icon: "🚘", screen: "43" },
                      { title: "Address Book", icon: "📍", screen: "44" },
                      { title: "Payment Methods", icon: "💳", screen: "46" },
                      { title: "Offers & Promotions", icon: "🏷️", screen: "47" },
                      { title: "Support Center", icon: "🎧", screen: "45" },
                      { title: "Invite Friends", icon: "🎁", screen: "48" },
                      { title: "Settings", icon: "⚙️", screen: "50" },
                    ].map((m, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveScreen(m.screen)}
                        style={{
                          padding: "14px 18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: i < 7 ? "1px solid #F1F5F9" : "none",
                          cursor: "pointer"
                        }}
                      >
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <span>{m.icon}</span>
                          <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>{m.title}</span>
                        </div>
                        <span style={{ color: "#94A3B8", fontWeight: "bold" }}>›</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setActiveScreen("06")} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#FFF5F5", border: "1.5px solid #FEE2E2", color: "#EF4444", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    Logout
                  </button>
                </div>

                <div style={{ height: 60, background: "#FFF", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div onClick={() => setActiveScreen("08")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>🏠</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Home</div>
                  </div>
                  <div onClick={() => setActiveScreen("20")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>📑</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Bookings</div>
                  </div>
                  <div onClick={() => setActiveScreen("21")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>👛</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Wallet</div>
                  </div>
                  <div onClick={() => setActiveScreen("24")} style={{ textAlign: "center", cursor: "pointer", color: "#22C55E" }}>
                    <div style={{ fontSize: 18 }}>👤</div>
                    <div style={{ fontSize: 10, fontWeight: 800 }}>Profile</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 25: SETTINGS ─── */}
            {activeScreen === "25" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Settings</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 800, color: "#64748B", display: "block", marginBottom: 8 }}>Account</label>
                    <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0" }}>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>Edit Profile</span>
                        <span style={{ color: "#94A3B8" }}>›</span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>Change Password</span>
                        <span style={{ color: "#94A3B8" }}>›</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 800, color: "#64748B", display: "block", marginBottom: 8 }}>Preferences</label>
                    <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0" }}>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>Language</span>
                        <span style={{ color: "#64748B", fontSize: 13 }}>English ›</span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>Notifications</span>
                        <div style={{ width: 42, height: 24, borderRadius: 12, background: "#22C55E", position: "relative", cursor: "pointer" }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FFF", position: "absolute", top: 2, right: 2 }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 800, color: "#64748B", display: "block", marginBottom: 8 }}>Support</label>
                    <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0" }}>
                      {[
                        { title: "Help Center", screen: "26" },
                        { title: "Contact Support", screen: "45" },
                        { title: "Terms & Conditions", screen: "25" },
                        { title: "Privacy Policy", screen: "25" },
                      ].map((s, i) => (
                        <div key={i} onClick={() => setActiveScreen(s.screen)} style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", borderBottom: i < 3 ? "1px solid #F1F5F9" : "none", cursor: "pointer" }}>
                          <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>{s.title}</span>
                          <span style={{ color: "#94A3B8" }}>›</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 26: HELP & SUPPORT ─── */}
            {activeScreen === "26" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Help & Support</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#22C55E", margin: "0 0 4px" }}>How can we help you?</h3>
                    <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 16px" }}>We're here to assist you anytime.</p>

                    <div style={{ display: "flex", background: "#FFF", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "10px 14px", alignItems: "center", gap: 10 }}>
                      <input type="text" placeholder="Search for help topics..." style={{ border: "none", outline: "none", flex: 1, fontSize: 13 }} />
                      <span>🔍</span>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 800, color: "#64748B", display: "block", marginBottom: 8 }}>Popular Topics</label>
                    <div style={{ background: "#FFF", borderRadius: 18, border: "1px solid #E2E8F0" }}>
                      {[
                        "How to book a parking space?",
                        "How to cancel a booking?",
                        "Payment failure - what to do?",
                        "How to extend parking time?",
                        "Refund & cancellation policy",
                      ].map((t, i) => (
                        <div key={i} style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", borderBottom: i < 4 ? "1px solid #F1F5F9" : "none", cursor: "pointer" }}>
                          <span style={{ fontWeight: 600, fontSize: 13, color: "#0F172A" }}>{t}</span>
                          <span style={{ color: "#94A3B8" }}>›</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: 16, background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
                  <button onClick={() => setActiveScreen("45")} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    💬 Chat with Support
                  </button>
                  <p style={{ fontSize: 10, color: "#94A3B8", textAlign: "center", margin: "6px 0 0" }}>We typically reply in a few minutes</p>
                </div>
              </div>
            )}

            {/* ─── 27: INVITE & EARN ─── */}
            {activeScreen === "27" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF", textAlign: "center" }}>
                <div>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12, alignSelf: "flex-start" }}>←</button>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Invite & Earn</h3>

                  <div style={{ width: 140, height: 100, margin: "0 auto 16px" }}>
                    <svg viewBox="0 0 140 100" width="100%" height="100%">
                      <circle cx="40" cy="50" r="22" fill="#F59E0B" />
                      <circle cx="100" cy="50" r="22" fill="#3B82F6" />
                      <rect x="55" y="40" width="30" height="30" rx="6" fill="#22C55E" />
                      <path d="M55 55 L85 55" stroke="#FFF" strokeWidth="3" />
                    </svg>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Invite your friends and earn rewards!</h3>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px", lineHeight: 1.4 }}>
                    You earn <strong>₹50</strong> when your friend completes their first booking.
                  </p>

                  <div style={{ background: "#F8FAFC", borderRadius: 16, border: "1.5px dashed #CBD5E1", padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontWeight: 900, fontSize: 16, color: "#0F172A", letterSpacing: "0.08em" }}>PAARKKAR123</span>
                    <span style={{ color: "#22C55E", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>📋 Copy</span>
                  </div>

                  <button style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                    Share Invite Link
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-around", background: "#F8FAFC", padding: 14, borderRadius: 16, border: "1px solid #E2E8F0" }}>
                  <div>
                    <span style={{ fontSize: 11, color: "#64748B" }}>Your Earnings</span>
                    <div style={{ fontWeight: 900, fontSize: 18, color: "#0F172A" }}>₹250</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: "#64748B" }}>Friends Invited</span>
                    <div style={{ fontWeight: 900, fontSize: 18, color: "#0F172A" }}>5</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 28: PARKING HISTORY DETAILS ─── */}
            {activeScreen === "28" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF" }}>
                <div style={{ height: 180, position: "relative" }}>
                  <img src={selectedSpot.image} alt="History Detail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button onClick={() => setActiveScreen("20")} style={{ position: "absolute", top: 12, left: 16, width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", fontSize: 16, cursor: "pointer" }}>←</button>
                  <span style={{ position: "absolute", top: 12, right: 16, background: "#22C55E", color: "#FFF", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 12 }}>Completed</span>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0F172A", margin: "0 0 2px" }}>{selectedSpot.title}</h3>
                    <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 16px" }}>{selectedSpot.address} • ★ {selectedSpot.rating}</p>

                    <div style={{ background: "#F8FAFC", borderRadius: 18, padding: 16, border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                        <span style={{ color: "#64748B" }}>Booking ID</span>
                        <span style={{ fontWeight: 800, color: "#0F172A" }}>PKR89076543</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                        <span style={{ color: "#64748B" }}>Date</span>
                        <span style={{ fontWeight: 700, color: "#0F172A" }}>21 May 2025</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                        <span style={{ color: "#64748B" }}>Time</span>
                        <span style={{ fontWeight: 700, color: "#0F172A" }}>10:00 AM - 12:00 PM</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                        <span style={{ color: "#64748B" }}>Duration</span>
                        <span style={{ fontWeight: 700, color: "#0F172A" }}>2 Hours</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                        <span style={{ color: "#64748B" }}>Amount Paid</span>
                        <span style={{ fontWeight: 900, color: "#22C55E" }}>₹80</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                        <span style={{ color: "#64748B" }}>Payment Method</span>
                        <span style={{ fontWeight: 700, color: "#0F172A" }}>UPI</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setActiveScreen("11")} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#FFF", border: "1.5px solid #22C55E", color: "#22C55E", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    📄 Book Again
                  </button>
                </div>
              </div>
            )}

            {/* ─── 29: HOST DASHBOARD ─── */}
            {activeScreen === "29" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>☰</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Host Dashboard</h3>
                  <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>🔔</button>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div style={{ background: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)", borderRadius: 20, padding: 20, color: "#FFF", boxShadow: "0 10px 25px rgba(34,197,94,0.3)" }}>
                    <span style={{ fontSize: 12, opacity: 0.8 }}>Total Earnings</span>
                    <h2 style={{ fontSize: 32, fontWeight: 900, margin: "4px 0 6px" }}>₹12,450</h2>
                    <span style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", padding: "3px 8px", borderRadius: 10 }}>+18.5% from last month</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div onClick={() => setActiveScreen("36")} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", cursor: "pointer" }}>
                      <span style={{ fontSize: 11, color: "#64748B" }}>Active Listings</span>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginTop: 4 }}>4</div>
                    </div>
                    <div onClick={() => setActiveScreen("37")} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", cursor: "pointer" }}>
                      <span style={{ fontSize: 11, color: "#64748B" }}>Today's Bookings</span>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginTop: 4 }}>3</div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 10 }}>Upcoming Bookings</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { title: "Home Garage", time: "21 May, 10:00 AM" },
                        { title: "Office Basement", time: "21 May, 02:00 PM" },
                      ].map((b, i) => (
                        <div key={i} onClick={() => setActiveScreen("37")} style={{ background: "#FFF", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 13, color: "#0F172A" }}>{b.title}</div>
                            <div style={{ fontSize: 11, color: "#64748B" }}>{b.time}</div>
                          </div>
                          <span style={{ background: "#DCFCE7", color: "#22C55E", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 8 }}>Upcoming</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setActiveScreen("30")} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#FFF", border: "1.5px solid #22C55E", color: "#22C55E", fontWeight: 800, fontSize: 14, cursor: "pointer", marginTop: 10 }}>
                    + Add New Space
                  </button>
                </div>
              </div>
            )}

            {/* ─── 30: ADD NEW SPACE (START) ─── */}
            {activeScreen === "30" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("29")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, color: "#0F172A", textAlign: "center" }}>Add New Space</h3>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, position: "relative" }}>
                    {[
                      { step: 1, name: "Space Details", active: true },
                      { step: 2, name: "Location", active: false },
                      { step: 3, name: "Pricing", active: false },
                      { step: 4, name: "Photos", active: false },
                    ].map((s) => (
                      <div key={s.step} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.active ? "#22C55E" : "#E2E8F0", color: s.active ? "#FFF" : "#64748B", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px" }}>{s.step}</div>
                        <span style={{ fontSize: 9, color: s.active ? "#22C55E" : "#64748B", fontWeight: 700 }}>{s.name}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ width: 140, height: 100, margin: "0 auto 16px" }}>
                    <svg viewBox="0 0 140 100" width="100%" height="100%">
                      <path d="M20 90 L20 45 L70 15 L120 45 L120 90 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2.5" />
                      <rect x="40" y="50" width="60" height="40" fill="#334155" rx="4" />
                      <rect x="50" y="60" width="40" height="20" fill="#FFF" rx="4" stroke="#0F172A" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", margin: "0 0 16px", textAlign: "center" }}>List your parking space and start earning!</h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 10px" }}>
                    {["Earn passive income", "Reach verified drivers", "You're in control"].map((b, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                        <span style={{ color: "#22C55E", fontWeight: 900 }}>✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => setActiveScreen("31")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Continue
                </button>
              </div>
            )}

            {/* ─── 31: ADD NEW SPACE (LOCATION) ─── */}
            {activeScreen === "31" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("30")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, color: "#0F172A", textAlign: "center" }}>Add New Space (Location)</h3>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    {[
                      { step: 1, name: "Details", done: true },
                      { step: 2, name: "Location", active: true },
                      { step: 3, name: "Pricing", active: false },
                      { step: 4, name: "Photos", active: false },
                    ].map((s) => (
                      <div key={s.step} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.active || s.done ? "#22C55E" : "#E2E8F0", color: "#FFF", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px" }}>{s.step}</div>
                        <span style={{ fontSize: 9, color: s.active ? "#22C55E" : "#64748B", fontWeight: 700 }}>{s.name}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "10px 14px", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span>🔍</span>
                    <input type="text" defaultValue="12, 4th Street, Anna Nagar, Chennai" style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 600, fontSize: 13 }} />
                  </div>

                  <div style={{ height: 180, background: "#E2E8F0", borderRadius: 16, overflow: "hidden", position: "relative", marginBottom: 16 }}>
                    <svg viewBox="0 0 300 180" width="100%" height="100%">
                      <rect width="100%" height="100%" fill="#E2E8F0" />
                      <path d="M0 60 L300 80 M0 140 L300 130 M90 0 L100 180 M210 0 L200 180" stroke="#FFF" strokeWidth="16" />
                      <g transform="translate(140, 70)">
                        <path d="M15 0 C 6 0, 0 6, 0 15 C 0 26, 15 38, 15 38 C 15 38, 30 26, 30 15 C 30 6, 24 0, 15 0 Z" fill="#22C55E" />
                        <circle cx="15" cy="15" r="6" fill="#FFF" />
                      </g>
                    </svg>
                  </div>

                  <div style={{ background: "#F8FAFC", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: 11, color: "#64748B", fontWeight: 700 }}>Selected Location</span>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginTop: 2 }}>12, 4th Street, Anna Nagar, Chennai - 600040</div>
                    <span style={{ color: "#22C55E", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>Change Location</span>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("32")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
                  Continue
                </button>
              </div>
            )}

            {/* ─── 32: ADD NEW SPACE (PRICING) ─── */}
            {activeScreen === "32" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("31")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, color: "#0F172A", textAlign: "center" }}>Add New Space (Pricing)</h3>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    {[
                      { step: 1, name: "Details", done: true },
                      { step: 2, name: "Location", done: true },
                      { step: 3, name: "Pricing", active: true },
                      { step: 4, name: "Photos", active: false },
                    ].map((s) => (
                      <div key={s.step} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.active || s.done ? "#22C55E" : "#E2E8F0", color: "#FFF", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px" }}>{s.step}</div>
                        <span style={{ fontSize: 9, color: s.active ? "#22C55E" : "#64748B", fontWeight: 700 }}>{s.name}</span>
                      </div>
                    ))}
                  </div>

                  <h4 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>Set your pricing</h4>
                  <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 16px" }}>Set an hourly price for your parking space.</p>

                  <label style={{ fontSize: 11, color: "#64748B", fontWeight: 700, display: "block", marginBottom: 6 }}>Price per hour</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: "#0F172A" }}>₹</span>
                    <input type="text" value={spacePrice} onChange={(e) => setSpacePrice(e.target.value)} style={{ border: "none", outline: "none", fontSize: 18, fontWeight: 800, color: "#0F172A", flex: 1 }} />
                  </div>

                  <label style={{ fontSize: 11, color: "#64748B", fontWeight: 700, display: "block", marginBottom: 8 }}>Vehicle Type</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
                    {[
                      { type: "Car", icon: "🚗" },
                      { type: "SUV", icon: "🚙" },
                      { type: "Bike", icon: "🚲" },
                      { type: "EV", icon: "⚡" },
                    ].map((v) => {
                      const isSelected = vehicleType === v.type;
                      return (
                        <div
                          key={v.type}
                          onClick={() => setVehicleType(v.type)}
                          style={{
                            padding: "12px 6px",
                            borderRadius: 12,
                            border: isSelected ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                            background: isSelected ? "#F0FDF4" : "#FFF",
                            textAlign: "center",
                            cursor: "pointer"
                          }}
                        >
                          <div style={{ fontSize: 20 }}>{v.icon}</div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: isSelected ? "#22C55E" : "#0F172A", marginTop: 2 }}>{v.type}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ background: "#F8FAFC", borderRadius: 14, padding: 14, border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: 11, color: "#64748B" }}>You will earn</span>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#22C55E", margin: "2px 0" }}>₹{(Number(spacePrice || 0) * 0.9).toFixed(2)} <span style={{ fontSize: 11, color: "#64748B" }}>/ hr</span></div>
                    <span style={{ fontSize: 10, color: "#94A3B8" }}>(After 10% Paarkkar fee)</span>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("33")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
                  Continue
                </button>
              </div>
            )}

            {/* ─── 33: ADD NEW SPACE (PHOTOS) ─── */}
            {activeScreen === "33" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("32")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, color: "#0F172A", textAlign: "center" }}>Add New Space (Photos)</h3>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    {[
                      { step: 1, name: "Details", done: true },
                      { step: 2, name: "Location", done: true },
                      { step: 3, name: "Pricing", done: true },
                      { step: 4, name: "Photos", active: true },
                    ].map((s) => (
                      <div key={s.step} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#22C55E", color: "#FFF", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px" }}>{s.step}</div>
                        <span style={{ fontSize: 9, color: "#22C55E", fontWeight: 700 }}>{s.name}</span>
                      </div>
                    ))}
                  </div>

                  <h4 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>Upload photos</h4>
                  <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 16px" }}>Add clear photos of your parking space.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=400&q=80",
                    ].map((img, idx) => (
                      <div key={idx} style={{ height: 110, borderRadius: 14, overflow: "hidden", position: "relative" }}>
                        <img src={img} alt="upload" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <button style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.6)", color: "#FFF", border: "none", cursor: "pointer", fontSize: 11 }}>✕</button>
                      </div>
                    ))}
                    <div style={{ height: 110, borderRadius: 14, border: "2px dashed #CBD5E1", background: "#F8FAFC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748B" }}>
                      <span style={{ fontSize: 20 }}>+</span>
                      <span style={{ fontSize: 11, fontWeight: 700, marginTop: 2 }}>Add More</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("34")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
                  Continue
                </button>
              </div>
            )}

            {/* ─── 34: REVIEW & PUBLISH ─── */}
            {activeScreen === "34" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#F8FAFC" }}>
                <div>
                  <button onClick={() => setActiveScreen("33")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, color: "#0F172A", textAlign: "center" }}>Review & Publish</h3>

                  <div style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                    <img src={selectedSpot.image} alt="Review" style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{selectedSpot.title}</h4>
                        <span style={{ color: "#22C55E", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Edit</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 11, color: "#64748B" }}>12, 4th Street, Anna Nagar, Chennai - 600040</p>
                    </div>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#64748B" }}>Price per hour</span>
                      <span style={{ fontWeight: 800, color: "#0F172A" }}>₹40</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#64748B" }}>Vehicle Type</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>Car, SUV</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#64748B" }}>Availability</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>Mon - Sun (6 AM - 11 PM)</span>
                    </div>
                    <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 8 }}>
                      <span style={{ fontSize: 11, color: "#64748B", display: "block", marginBottom: 6 }}>Amenities</span>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["Covered", "CCTV", "24/7 Access"].map((a, i) => (
                          <span key={i} style={{ background: "#F1F5F9", color: "#475569", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("35")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Publish Space
                </button>
              </div>
            )}

            {/* ─── 35: SPACE SUBMITTED ─── */}
            {activeScreen === "35" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "30px 24px", justifyContent: "space-between", background: "#F8FAFC", textAlign: "center" }}>
                <div>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "20px auto 20px", color: "#FFF", fontSize: 40, boxShadow: "0 10px 30px rgba(34,197,94,0.4)" }}>
                    ✓
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Space Submitted!</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px" }}>Your space has been submitted for verification.</p>

                  <div style={{ background: "#FFF", borderRadius: 18, padding: 14, border: "1px solid #E2E8F0", textAlign: "left", display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                    <img src={selectedSpot.image} alt="Submit" style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Home Garage</h4>
                      <p style={{ margin: "0 0 4px", fontSize: 11, color: "#64748B" }}>12, 4th Street, Anna Nagar, Chennai - 600040</p>
                      <span style={{ background: "#FEF3C7", color: "#D97706", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 6 }}>Under Review</span>
                    </div>
                  </div>

                  <p style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.4 }}>
                    We will notify you once your space is live and visible to drivers.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => setActiveScreen("29")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                    Go to Dashboard
                  </button>
                  <button onClick={() => setActiveScreen("30")} style={{ width: "100%", padding: 14, borderRadius: 16, background: "#FFF", border: "1.5px solid #E2E8F0", color: "#0F172A", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Add Another Space
                  </button>
                </div>
              </div>
            )}

            {/* ─── 36: MY LISTINGS ─── */}
            {activeScreen === "36" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <button onClick={() => setActiveScreen("29")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>My Listings</h3>
                    <span style={{ width: 20 }} />
                  </div>

                  <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
                    {["All (2)", "Active (1)", "Under Review (1)", "Inactive (0)"].map((f, i) => (
                      <span key={i} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 800, background: i === 1 ? "#DCFCE7" : "#F1F5F9", color: i === 1 ? "#22C55E" : "#64748B", cursor: "pointer", whiteSpace: "nowrap" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  {[
                    { title: "Home Garage", loc: "12, 4th Street, Anna Nagar, Chennai", price: "40", status: "Active", statusBg: "#DCFCE7", statusColor: "#22C55E", img: "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=400&q=80" },
                    { title: "Office Basement", loc: "T. Nagar, Chennai - 600017", price: "60", status: "Under Review", statusBg: "#FEF3C7", statusColor: "#D97706", img: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=400&q=80" },
                  ].map((item, idx) => (
                    <div key={idx} style={{ background: "#FFF", borderRadius: 16, padding: 12, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center" }}>
                      <img src={item.img} alt="list" style={{ width: 70, height: 70, borderRadius: 12, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h4 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{item.title}</h4>
                          <span style={{ background: item.statusBg, color: item.statusColor, fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 6 }}>{item.status}</span>
                        </div>
                        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#64748B" }}>{item.loc}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 13 }}>₹{item.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></div>
                          <div style={{ display: "flex", gap: 10, color: "#64748B", fontSize: 13 }}>
                            <span style={{ cursor: "pointer" }}>👁</span>
                            <span style={{ cursor: "pointer" }}>✏️</span>
                            <span style={{ cursor: "pointer" }}>⋮</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: 16, background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
                  <button onClick={() => setActiveScreen("30")} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    + Add New Space
                  </button>
                </div>
              </div>
            )}

            {/* ─── 37: BOOKING REQUESTS ─── */}
            {activeScreen === "37" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <button onClick={() => setActiveScreen("29")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Booking Requests</h3>
                    <span style={{ width: 20 }} />
                  </div>

                  <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    {["Pending (2)", "Accepted", "Declined"].map((f, i) => (
                      <span key={i} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 800, background: i === 0 ? "#DCFCE7" : "transparent", color: i === 0 ? "#22C55E" : "#64748B", cursor: "pointer" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  {[
                    { name: "Arun Kumar", rate: "4.8 (32)", time: "21 May 2025, 10:00 AM - 12:00 PM", space: "Home Garage", dur: "2 Hours", price: "80" },
                    { name: "Vikram S", rate: "4.6 (18)", time: "22 May 2025, 06:00 PM - 09:00 PM", space: "Office Basement", dur: "3 Hours", price: "180" },
                  ].map((req, idx) => (
                    <div key={idx} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#CBD5E1", overflow: "hidden" }}>
                            <img src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80`} alt="req" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 14, color: "#0F172A" }}>{req.name}</div>
                            <div style={{ fontSize: 10, color: "#64748B" }}>{req.time}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 700 }}>★ {req.rate}</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "8px 0", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <span style={{ color: "#64748B" }}>{req.space} • {req.dur}</span>
                        <span style={{ fontWeight: 900, color: "#0F172A" }}>₹{req.price}</span>
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <button style={{ flex: 1, padding: 10, borderRadius: 10, border: "1.5px solid #FEE2E2", background: "#FFF", color: "#EF4444", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Decline</button>
                        <button style={{ flex: 1, padding: 10, borderRadius: 10, border: "none", background: "#22C55E", color: "#FFF", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>Accept</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── 38: EARNINGS OVERVIEW ─── */}
            {activeScreen === "38" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("29")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Earnings Overview</h3>
                  <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>📅</button>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div style={{ background: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)", borderRadius: 20, padding: 20, color: "#FFF" }}>
                    <span style={{ fontSize: 12, opacity: 0.8 }}>Total Earnings</span>
                    <h2 style={{ fontSize: 32, fontWeight: 900, margin: "4px 0 4px" }}>₹12,450</h2>
                    <span style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", padding: "3px 8px", borderRadius: 10 }}>+18.5% from last month</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "#FFF", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: 10, color: "#64748B" }}>Bookings</span>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#0F172A" }}>32</div>
                    </div>
                    <div style={{ background: "#FFF", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: 10, color: "#64748B" }}>Hours Booked</span>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#0F172A" }}>64.5</div>
                    </div>
                    <div style={{ background: "#FFF", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: 10, color: "#64748B" }}>Pending Payout</span>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>₹2,350</div>
                    </div>
                    <div style={{ background: "#FFF", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: 10, color: "#64748B" }}>Completed Payout</span>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#22C55E" }}>₹10,100</div>
                    </div>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 18, padding: 16, border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 12 }}>Earnings Trend</span>
                    <div style={{ height: 100, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
                      {[40, 65, 80, 50, 95].map((h, i) => (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <div style={{ width: "100%", height: `${h}%`, background: "#22C55E", borderRadius: "6px 6px 0 0" }} />
                          <span style={{ fontSize: 9, color: "#94A3B8" }}>{["1 May", "8 May", "15 May", "22 May", "29 May"][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: 16, background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
                  <button onClick={() => setActiveScreen("39")} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    Withdraw Earnings
                  </button>
                </div>
              </div>
            )}

            {/* ─── 39: WITHDRAW EARNINGS ─── */}
            {activeScreen === "39" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("38")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>←</button>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, color: "#0F172A", textAlign: "center" }}>Withdraw Earnings</h3>

                  <div style={{ background: "#F8FAFC", borderRadius: 16, padding: 16, border: "1px solid #E2E8F0", marginBottom: 20 }}>
                    <span style={{ fontSize: 11, color: "#64748B" }}>Available Balance</span>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", marginTop: 2 }}>₹2,350</div>
                  </div>

                  <label style={{ fontSize: 11, color: "#64748B", fontWeight: 700, display: "block", marginBottom: 6 }}>Enter Amount</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: "#0F172A" }}>₹</span>
                    <input type="text" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} style={{ border: "none", outline: "none", fontSize: 18, fontWeight: 800, color: "#0F172A", flex: 1 }} />
                  </div>

                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    {["500", "1000", "2000", "All"].map((amt) => (
                      <button key={amt} onClick={() => setWithdrawAmount(amt === "All" ? "2350" : amt)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "1px solid #E2E8F0", background: "#F8FAFC", fontSize: 12, fontWeight: 700, color: "#0F172A", cursor: "pointer" }}>
                        ₹{amt}
                      </button>
                    ))}
                  </div>

                  <label style={{ fontSize: 11, color: "#64748B", fontWeight: 700, display: "block", marginBottom: 8 }}>Withdraw to</label>
                  {[
                    { id: "bank", title: "Bank Account", desc: "HDFC Bank - 1234", icon: "🏦" },
                    { id: "upi", title: "UPI", desc: "dharani@okaxis", icon: "🅿️" },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setWithdrawMethod(m.id)}
                      style={{
                        borderRadius: 14,
                        border: withdrawMethod === m.id ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                        background: withdrawMethod === m.id ? "#F0FDF4" : "#FFF",
                        padding: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 10,
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{m.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: "#0F172A" }}>{m.title}</div>
                        <div style={{ fontSize: 11, color: "#64748B" }}>{m.desc}</div>
                      </div>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: withdrawMethod === m.id ? "5px solid #22C55E" : "2px solid #CBD5E1" }} />
                    </div>
                  ))}
                </div>

                <button onClick={() => { alert("Withdrawal Request Submitted!"); setActiveScreen("38"); }} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
                  Withdraw Now
                </button>
              </div>
            )}

            {/* ─── 40: REVIEWS & RATINGS ─── */}
            {activeScreen === "40" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("10")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Reviews & Ratings</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  <div style={{ background: "#FFF", borderRadius: 18, padding: 16, border: "1px solid #E2E8F0", display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 32, fontWeight: 900, color: "#0F172A" }}>★ 4.8</div>
                      <div style={{ fontSize: 10, color: "#64748B" }}>Overall Rating<br/>(120 Reviews)</div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      {[
                        { star: 5, val: 80 },
                        { star: 4, val: 15 },
                        { star: 3, val: 3 },
                        { star: 2, val: 1 },
                        { star: 1, val: 1 },
                      ].map((r) => (
                        <div key={r.star} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#64748B" }}>
                          <span>{r.star}★</span>
                          <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${r.val}%`, height: "100%", background: "#22C55E" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 800, background: "#22C55E", color: "#FFF" }}>All (120)</span>
                    <span style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: "#FFF", color: "#64748B", border: "1px solid #E2E8F0" }}>Host Replies</span>
                  </div>

                  {[
                    { name: "Arun Kumar", date: "21 May 2025", rate: "5.0", text: "Great parking space! Very safe and easy to access." },
                    { name: "Priya Nair", date: "18 May 2025", rate: "4.5", text: "Good location and host is very responsive." },
                    { name: "Karthik R", date: "15 May 2025", rate: "5.0", text: "Highly recommended!" },
                  ].map((rev, i) => (
                    <div key={i} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: "#0F172A" }}>{rev.name} <span style={{ fontSize: 10, color: "#94A3B8", fontWeight: 400 }}>• {rev.date}</span></div>
                        <span style={{ color: "#F59E0B", fontSize: 11, fontWeight: 700 }}>★ {rev.rate}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── 41: ANALYTICS ─── */}
            {activeScreen === "41" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("29")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Analytics</h3>
                  <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>📅</button>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ background: "#FFF", padding: "6px 12px", borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12, fontWeight: 700, color: "#0F172A" }}>
                      This Month ∨
                    </div>
                  </div>

                  <div style={{ background: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)", borderRadius: 20, padding: 20, color: "#FFF" }}>
                    <span style={{ fontSize: 12, opacity: 0.8 }}>Total Earnings</span>
                    <h2 style={{ fontSize: 32, fontWeight: 900, margin: "4px 0 4px" }}>₹12,450</h2>
                    <span style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", padding: "3px 8px", borderRadius: 10 }}>+18.5% from last month</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    <div style={{ background: "#FFF", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: 10, color: "#64748B" }}>Bookings</span>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>32</div>
                      <span style={{ fontSize: 9, color: "#22C55E", fontWeight: 700 }}>+12%</span>
                    </div>
                    <div style={{ background: "#FFF", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: 10, color: "#64748B" }}>Hours Booked</span>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>64.5</div>
                      <span style={{ fontSize: 9, color: "#22C55E", fontWeight: 700 }}>+8%</span>
                    </div>
                    <div style={{ background: "#FFF", borderRadius: 14, padding: 12, border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: 10, color: "#64748B" }}>Occupancy</span>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>78%</div>
                      <span style={{ fontSize: 9, color: "#22C55E", fontWeight: 700 }}>+15%</span>
                    </div>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 18, padding: 16, border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 12 }}>Earnings Trend</span>
                    <div style={{ height: 110, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
                      {[45, 60, 85, 55, 90].map((h, i) => (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <div style={{ width: "100%", height: `${h}%`, background: "#22C55E", borderRadius: "6px 6px 0 0" }} />
                          <span style={{ fontSize: 9, color: "#94A3B8" }}>{["1 May", "8 May", "15 May", "22 May", "29 May"][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ height: 60, background: "#FFF", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div onClick={() => setActiveScreen("29")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>🏠</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Home</div>
                  </div>
                  <div onClick={() => setActiveScreen("37")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>📑</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Bookings</div>
                  </div>
                  <div onClick={() => setActiveScreen("36")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <div style={{ fontSize: 18 }}>🏢</div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Listings</div>
                  </div>
                  <div onClick={() => setActiveScreen("41")} style={{ textAlign: "center", cursor: "pointer", color: "#22C55E" }}>
                    <div style={{ fontSize: 18 }}>📈</div>
                    <div style={{ fontSize: 10, fontWeight: 800 }}>Earnings</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 42: PAYOUT HISTORY ─── */}
            {activeScreen === "42" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("38")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Payout History</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div style={{ background: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)", borderRadius: 20, padding: 20, color: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 12, opacity: 0.8 }}>Total Withdrawn</span>
                      <h2 style={{ fontSize: 28, fontWeight: 900, margin: "2px 0 0" }}>₹35,750</h2>
                    </div>
                    <div style={{ fontSize: 32 }}>👛</div>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 18, border: "1px solid #E2E8F0", padding: "8px 16px" }}>
                    {[
                      { amt: "₹5,000", to: "Paid to HDFC Bank •••• 1234", date: "28 May 2025", status: "Success" },
                      { amt: "₹4,500", to: "Paid to UPI • dharani@okaxis", date: "14 May 2025", status: "Success" },
                      { amt: "₹3,750", to: "Paid to HDFC Bank •••• 1234", date: "30 Apr 2025", status: "Success" },
                      { amt: "₹2,500", to: "Paid to UPI • dharani@okaxis", date: "16 Apr 2025", status: "Success" },
                      { amt: "₹5,000", to: "Paid to HDFC Bank •••• 1234", date: "02 Apr 2025", status: "Success" },
                    ].map((p, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: idx < 4 ? "1px solid #F1F5F9" : "none" }}>
                        <div>
                          <div style={{ fontWeight: 900, color: "#0F172A", fontSize: 15 }}>{p.amt}</div>
                          <div style={{ fontSize: 11, color: "#64748B" }}>{p.to} • {p.date}</div>
                        </div>
                        <span style={{ color: "#22C55E", fontSize: 11, fontWeight: 800 }}>{p.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── 43: MY VEHICLES ─── */}
            {activeScreen === "43" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>My Vehicles</h3>
                  <button style={{ background: "none", border: "none", fontSize: 22, fontWeight: 900, cursor: "pointer", color: "#22C55E" }}>+</button>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  {[
                    { number: "TN 09 AB 1234", name: "Honda City", type: "Sedan • White", status: "Active", activeBg: "#DCFCE7", activeColor: "#22C55E", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80" },
                    { number: "TN 22 CD 5678", name: "Hyundai Creta", type: "SUV • Black", status: "Active", activeBg: "#DCFCE7", activeColor: "#22C55E", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
                    { number: "TN 07 EF 9101", name: "Tata Nexon", type: "SUV • Blue", status: "Inactive", activeBg: "#F1F5F9", activeColor: "#64748B", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80" },
                  ].map((v, i) => (
                    <div key={i} style={{ background: "#FFF", borderRadius: 16, padding: 12, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center" }}>
                      <img src={v.img} alt="car" style={{ width: 70, height: 50, borderRadius: 10, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 900, color: "#0F172A" }}>{v.number}</h4>
                          <span style={{ fontSize: 16, cursor: "pointer", color: "#94A3B8" }}>⋮</span>
                        </div>
                        <p style={{ margin: "0 0 4px", fontSize: 11, color: "#64748B" }}>{v.name} • {v.type}</p>
                        <span style={{ background: v.activeBg, color: v.activeColor, fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 6 }}>{v.status}</span>
                      </div>
                    </div>
                  ))}

                  <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #E2E8F0", textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 4 }}>🚗</div>
                    <h4 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Add your vehicle</h4>
                    <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 12px" }}>Get better parking recommendations</p>
                    <button style={{ width: "100%", padding: 12, borderRadius: 12, background: "#FFF", border: "1.5px solid #22C55E", color: "#22C55E", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                      + Add Vehicle
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 44: ADDRESS BOOK ─── */}
            {activeScreen === "44" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Address Book</h3>
                  <button style={{ background: "none", border: "none", fontSize: 22, fontWeight: 900, cursor: "pointer", color: "#22C55E" }}>+</button>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  {[
                    { title: "Home", addr: "12, 4th Street, Anna Nagar, Chennai - 600040", icon: "🏠", default: true, checked: true },
                    { title: "Office", addr: "DLF IT Park, Manapakkam, Chennai - 600089", icon: "💼", default: false, checked: false },
                    { title: "Gym", addr: "Slim Fit Gym, Valasaravakkam, Chennai - 600087", icon: "🏋️", default: false, checked: false },
                    { title: "Parents Home", addr: "24, West Street, Madurai, Tamil Nadu - 625001", icon: "👤", default: false, checked: false },
                  ].map((a, idx) => (
                    <div key={idx} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{a.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{a.title}</h4>
                          {a.default && <span style={{ background: "#DCFCE7", color: "#22C55E", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 6 }}>Default</span>}
                        </div>
                        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748B" }}>{a.addr}</p>
                      </div>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: a.checked ? "5px solid #22C55E" : "2px solid #CBD5E1" }} />
                    </div>
                  ))}
                </div>

                <div style={{ padding: 16, background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
                  <button style={{ width: "100%", padding: 14, borderRadius: 14, background: "#FFF", border: "1.5px solid #22C55E", color: "#22C55E", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    + Add New Address
                  </button>
                </div>
              </div>
            )}

            {/* ─── 45: SUPPORT CENTER ─── */}
            {activeScreen === "45" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Support Center</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 40 }}>
                      🎧
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>How can we help you?</h3>
                    <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>We're here to assist you 24/7</p>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 20, border: "1px solid #E2E8F0" }}>
                    {[
                      { title: "FAQs", sub: "Find answers to common questions", icon: "ℹ️", screen: "26" },
                      { title: "Chat with Us", sub: "Talk to our support team", icon: "💬", screen: "26" },
                      { title: "Call Us", sub: "+91 98765 43210", icon: "📞", screen: "45" },
                      { title: "Raise a Ticket", sub: "Report an issue or feedback", icon: "📋", screen: "45" },
                    ].map((s, i) => (
                      <div key={i} onClick={() => setActiveScreen(s.screen)} style={{ padding: "14px 16px", display: "flex", gap: 12, alignItems: "center", borderBottom: i < 3 ? "1px solid #F1F5F9" : "none", cursor: "pointer" }}>
                        <span style={{ fontSize: 20 }}>{s.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, fontSize: 14, color: "#0F172A" }}>{s.title}</div>
                          <div style={{ fontSize: 11, color: "#64748B" }}>{s.sub}</div>
                        </div>
                        <span style={{ color: "#94A3B8" }}>›</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── 46: PAYMENT METHODS ─── */}
            {activeScreen === "46" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Payment Methods</h3>
                  <button style={{ background: "none", border: "none", fontSize: 22, fontWeight: 900, cursor: "pointer", color: "#22C55E" }}>+</button>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  {[
                    { title: "UPI", desc: "dharani@okaxis", primary: true, icon: "🅿️" },
                    { title: "HDFC Bank •••• 1234", desc: "Debit Card", logo: "VISA", icon: "💳" },
                    { title: "ICICI Bank •••• 5678", desc: "Credit Card", logo: "MC", icon: "💳" },
                    { title: "Paytm Wallet", desc: "₹1,250 Balance", primary: false, icon: "👛" },
                  ].map((pm, i) => (
                    <div key={i} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ fontSize: 22 }}>{pm.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{pm.title}</h4>
                          {pm.primary && <span style={{ background: "#DCFCE7", color: "#22C55E", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 6 }}>Primary</span>}
                        </div>
                        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748B" }}>{pm.desc}</p>
                      </div>
                      {pm.logo && <span style={{ fontWeight: 900, fontSize: 12, color: "#3B82F6" }}>{pm.logo}</span>}
                    </div>
                  ))}
                </div>

                <div style={{ padding: 16, background: "#FFF", borderTop: "1px solid #E2E8F0" }}>
                  <button style={{ width: "100%", padding: 14, borderRadius: 14, background: "#FFF", border: "1.5px solid #22C55E", color: "#22C55E", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    + Add New Payment Method
                  </button>
                </div>
              </div>
            )}

            {/* ─── 47: OFFERS & PROMOTIONS ─── */}
            {activeScreen === "47" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Offers & Promotions</h3>
                    <span style={{ width: 20 }} />
                  </div>

                  <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
                    <span style={{ paddingBottom: 6, fontSize: 13, fontWeight: 800, color: "#22C55E", borderBottom: "2px solid #22C55E" }}>Available</span>
                    <span style={{ paddingBottom: 6, fontSize: 13, fontWeight: 600, color: "#64748B" }}>Applied</span>
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  {[
                    { tag: "10% OFF", title: "Flat 10% off on your next booking", code: "Use code: PARK10", valid: "Valid till 31 May 2025" },
                    { tag: "20% OFF", title: "Get 20% cashback up to ₹100", code: "Min. booking ₹200", valid: "Valid till 10 June 2025" },
                    { tag: "₹50 OFF", title: "Flat ₹50 off on hourly bookings", code: "Min. booking 2 hours", valid: "Valid till 15 June 2025" },
                  ].map((o, idx) => (
                    <div key={idx} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ background: "#DCFCE7", color: "#22C55E", padding: "12px 10px", borderRadius: 12, fontWeight: 900, fontSize: 12, textAlign: "center" }}>
                        {o.tag}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{o.title}</h4>
                        <div style={{ fontSize: 11, color: "#22C55E", fontWeight: 700 }}>{o.code}</div>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>{o.valid}</div>
                      </div>
                      <button onClick={() => setActiveScreen("12")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "6px 12px", borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── 48: INVITE FRIENDS ─── */}
            {activeScreen === "48" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF", textAlign: "center" }}>
                <div>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", marginBottom: 12, alignSelf: "flex-start" }}>←</button>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Invite Friends</h3>

                  <div style={{ width: 150, height: 110, margin: "0 auto 16px" }}>
                    <svg viewBox="0 0 150 110" width="100%" height="100%">
                      <circle cx="45" cy="55" r="26" fill="#22C55E" opacity="0.2" />
                      <circle cx="105" cy="55" r="26" fill="#F59E0B" opacity="0.2" />
                      <rect x="60" y="40" width="30" height="30" rx="8" fill="#22C55E" />
                      <path d="M75 45 L75 65 M65 55 L85 55" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Invite friends & earn rewards!</h3>
                  <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 20px", lineHeight: 1.4 }}>
                    You both get <strong>₹100</strong> when your friend completes their first booking.
                  </p>

                  <div style={{ background: "#F8FAFC", borderRadius: 16, border: "1.5px dashed #CBD5E1", padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontWeight: 900, fontSize: 16, color: "#0F172A", letterSpacing: "0.08em" }}>PAARKKAR100</span>
                    <span style={{ color: "#22C55E", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>📋</span>
                  </div>

                  <button style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                    Share Invite Link
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-around", background: "#F8FAFC", padding: 14, borderRadius: 16, border: "1px solid #E2E8F0" }}>
                  <div>
                    <span style={{ fontSize: 11, color: "#64748B" }}>Friends Invited</span>
                    <div style={{ fontWeight: 900, fontSize: 18, color: "#0F172A" }}>12</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: "#64748B" }}>Rewards Earned</span>
                    <div style={{ fontWeight: 900, fontSize: 18, color: "#22C55E" }}>₹1,200</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── 49: NOTIFICATIONS (DETAILED) ─── */}
            {activeScreen === "49" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Notifications</h3>
                    <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>⚙️</button>
                  </div>

                  <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
                    {["All", "Bookings", "Offers", "Updates"].map((f, i) => (
                      <span key={i} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 800, background: i === 0 ? "#22C55E" : "#F1F5F9", color: i === 0 ? "#FFF" : "#64748B", cursor: "pointer" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  {[
                    { title: "Booking Confirmed", desc: "Home Garage • Your booking is confirmed.", time: "2m ago", icon: "🟢" },
                    { title: "Payment Successful", desc: "₹80 has been paid successfully.", time: "1h ago", icon: "💳" },
                    { title: "Payout Initiated", desc: "₹2,350 will be credited to your bank account.", time: "3h ago", icon: "🏦" },
                    { title: "New Booking Request", desc: "Office Basement requested a booking.", time: "5h ago", icon: "👤" },
                    { title: "Offer Unlocked!", desc: "You have unlocked a new offer.", time: "1d ago", icon: "🏷️" },
                  ].map((n, i) => (
                    <div key={i} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 20 }}>{n.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{n.title}</h4>
                          <span style={{ fontSize: 10, color: "#94A3B8" }}>{n.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 11, color: "#64748B", lineHeight: 1.4 }}>{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── 50: SETTINGS (MORE) ─── */}
            {activeScreen === "50" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Settings</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: "#64748B", display: "block", marginBottom: 8 }}>Preferences</label>
                    <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0" }}>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#0F172A" }}>🎨 Theme</span>
                        <span style={{ color: "#64748B", fontSize: 12 }}>Light ›</span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#0F172A" }}>📏 Units</span>
                        <span style={{ color: "#64748B", fontSize: 12 }}>Metric ›</span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#0F172A" }}>🔒 Privacy</span>
                        <span style={{ color: "#94A3B8" }}>›</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: "#64748B", display: "block", marginBottom: 8 }}>App</label>
                    <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0" }}>
                      <div onClick={() => setActiveScreen("48")} style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#0F172A" }}>📢 Share App</span>
                        <span style={{ color: "#94A3B8" }}>›</span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#0F172A" }}>⭐ Rate Us</span>
                        <span style={{ color: "#94A3B8" }}>›</span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#0F172A" }}>ℹ️ App Version</span>
                        <span style={{ color: "#94A3B8", fontSize: 11 }}>v1.0.0 ›</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "center", marginTop: 10 }}>
                    <button onClick={() => setActiveScreen("06")} style={{ background: "none", border: "none", color: "#EF4444", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                      Logout
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
