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

// ─── CRISP PRODUCTION SVG ICONS ──────────────────────────────────────────────
const IconSearch = ({ size = 18, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconBell = ({ size = 18, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconMenu = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const IconFilter = ({ size = 18, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const IconHome = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconBookings = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconWallet = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const IconProfile = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconStar = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconHeart = ({ size = 18, color = "currentColor", fill = "none" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const IconChevronRight = ({ size = 16, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const IconChevronLeft = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const IconLocation = ({ size = 16, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconCar = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const IconShield = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconCreditCard = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const IconBank = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="11" y2="19" />
    <line x1="10" x2="10" y1="11" y2="19" />
    <line x1="14" x2="14" y1="11" y2="19" />
    <line x1="18" x2="18" y1="11" y2="19" />
    <polygon points="12 2 20 7 4 7 12 2" />
  </svg>
);

const IconSettings = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconBuilding = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="6" x2="9" y2="6.01" />
    <line x1="15" y1="6" x2="15" y2="6.01" />
    <line x1="9" y1="10" x2="9" y2="10.01" />
    <line x1="15" y1="10" x2="15" y2="10.01" />
    <path d="M9 22v-4h6v4" />
  </svg>
);

const IconAnalytics = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconHelp = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconInvite = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="17" y1="11" x2="23" y2="11" />
  </svg>
);

const IconNavigation = ({ size = 18, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const IconCheck = ({ size = 18, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconLock = ({ size = 16, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconTag = ({ size = 18, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

export default function FullShowcaseBoard() {
  const [activeScreen, setActiveScreen] = useState("01");
  const [role, setRole] = useState(null); // driver | host
  const [otpVal, setOtpVal] = useState(["2", "4", "6", "8", "2", "1"]);
  const [tabIndex, setTabIndex] = useState("Nearby");
  const [showQuickNav, setShowQuickNav] = useState(false);
  
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
    about: "Private covered garage with 24/7 access. Gated security, CCTV monitoring, and dedicated EV charging port."
  });

  const screensList = [
    { id: "01", name: "Splash Screen" },
    { id: "02", name: "Discover Spaces" },
    { id: "03", name: "Host & Earn" },
    { id: "04", name: "Safe & Secure" },
    { id: "05", name: "Role Selector" },
    { id: "06", name: "Account Login" },
    { id: "07", name: "OTP Verification" },
    { id: "08", name: "Map Search" },
    { id: "09", name: "List View" },
    { id: "10", name: "Space Details" },
    { id: "11", name: "Select Date & Time" },
    { id: "12", name: "Booking Summary" },
    { id: "13", name: "Payment Checkout" },
    { id: "14", name: "Payment Success" },
    { id: "15", name: "Active Parking" },
    { id: "16", name: "Host QR Check-in" },
    { id: "17", name: "GPS Navigation" },
    { id: "18", name: "Extend Parking" },
    { id: "19", name: "Parking Complete" },
    { id: "20", name: "My Bookings" },
    { id: "21", name: "Wallet Balance" },
    { id: "22", name: "Notifications" },
    { id: "23", name: "Saved Favorites" },
    { id: "24", name: "User Profile" },
    { id: "25", name: "Account Settings" },
    { id: "26", name: "Help Center" },
    { id: "27", name: "Invite & Earn" },
    { id: "28", name: "Booking Receipt" },
    { id: "29", name: "Host Dashboard" },
    { id: "30", name: "Add Space (Intro)" },
    { id: "31", name: "Add Space (Location)" },
    { id: "32", name: "Add Space (Pricing)" },
    { id: "33", name: "Add Space (Photos)" },
    { id: "34", name: "Review & Publish" },
    { id: "35", name: "Space Submitted" },
    { id: "36", name: "My Space Listings" },
    { id: "37", name: "Booking Requests" },
    { id: "38", name: "Earnings Overview" },
    { id: "39", name: "Withdraw Payout" },
    { id: "40", name: "Reviews & Ratings" },
    { id: "41", name: "Host Analytics" },
    { id: "42", name: "Payout History" },
    { id: "43", name: "My Vehicles" },
    { id: "44", name: "Address Book" },
    { id: "45", name: "Support Center" },
    { id: "46", name: "Payment Methods" },
    { id: "47", name: "Offers & Promos" },
    { id: "48", name: "Invite Friends" },
    { id: "49", name: "Notification Log" },
    { id: "50", name: "App Settings" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", background: "#0F172A", color: "#F8FAFC", fontFamily: "system-ui, -apple-system, sans-serif", overflow: "hidden" }}>

      {/* MAIN APPLICATION CONTAINER */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "0", background: "#0F172A" }}>
        
        {/* RESPONSIVE MOBILE APP FRAME */}
        <div style={{ width: "100%", maxWidth: 440, height: "100vh", maxHeight: "100vh", background: activeScreen === "15" || activeScreen === "17" ? "#0F172A" : "#FFFFFF", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.5)" }}>
          
          {/* REALISTIC MOBILE STATUS BAR */}
          <div style={{ height: 44, padding: "0 22px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 700, color: activeScreen === "15" || activeScreen === "17" ? "#FFF" : "#0F172A", zIndex: 50, background: activeScreen === "15" || activeScreen === "17" ? "#0F172A" : "#FFFFFF" }}>
            <span>9:41</span>
            
            {/* Dynamic Island / Speaker notch effect */}
            <div style={{ width: 80, height: 18, background: activeScreen === "15" || activeScreen === "17" ? "#1E293B" : "#0F172A", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1E293B", border: "1px solid #334155" }} />
            </div>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {/* Signal SVG */}
              <svg width="14" height="12" viewBox="0 0 14 12" fill={activeScreen === "15" || activeScreen === "17" ? "#FFF" : "#0F172A"}>
                <rect x="0" y="8" width="2" height="4" rx="0.5" />
                <rect x="4" y="6" width="2" height="6" rx="0.5" />
                <rect x="8" y="3" width="2" height="9" rx="0.5" />
                <rect x="12" y="0" width="2" height="12" rx="0.5" />
              </svg>
              {/* Battery SVG */}
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke={activeScreen === "15" || activeScreen === "17" ? "#FFF" : "#0F172A"} strokeWidth="1.2">
                <rect x="0.5" y="0.5" width="14" height="9" rx="2" />
                <rect x="2" y="2" width="9" height="6" rx="1" fill="#22C55E" stroke="none" />
                <path d="M16 3.5v3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* SCREEN CONTENT AREA */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", position: "relative" }}>
            
            {/* ─── SPLASH SCREEN ─── */}
            {activeScreen === "01" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "30px 24px 30px", background: "#FFF" }}>
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 10px 25px rgba(34,197,94,0.35)" }}>
                    <span style={{ color: "#FFF", fontSize: 48, fontWeight: 900 }}>P</span>
                  </div>
                  <h1 style={{ fontSize: 38, fontWeight: 900, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.03em" }}>Paarkkar</h1>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#64748B", margin: 0 }}>
                    Park Anywhere. Earn <span style={{ color: "#22C55E", fontWeight: 800 }}>Everywhere.</span>
                  </p>
                </div>

                {/* REALISTIC HERO SPOT CARDS & MAP SHOWCASE */}
                <div style={{ width: "100%", borderRadius: 24, overflow: "hidden", boxShadow: "0 14px 30px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0", background: "#F8FAFC", position: "relative" }}>
                  <img src="https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=600&q=80" alt="Paarkkar Garage" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,0.75)", backdropFilter: "blur(6px)", color: "#FFF", padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", gap: 4 }}>
                    <IconLocation size={12} color="#22C55E" /> 500+ Spots Live
                  </div>
                  <div style={{ padding: 14, background: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: "#0F172A" }}>Peer-to-Peer Parking</div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>India's #1 Smart Parking App</div>
                    </div>
                    <div style={{ background: "#DCFCE7", color: "#22C55E", padding: "6px 10px", borderRadius: 10, fontWeight: 900, fontSize: 13 }}>
                      ₹30/hr
                    </div>
                  </div>
                </div>

                {/* PRIMARY ACTION BUTTONS ON SPLASH SCREEN */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
                  <button onClick={() => setActiveScreen("02")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.35)", transition: "all 0.2s" }}>
                    Get Started
                  </button>
                  <button onClick={() => setActiveScreen("06")} style={{ width: "100%", padding: 12, borderRadius: 16, background: "transparent", border: "1.5px solid #E2E8F0", color: "#0F172A", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Already have an account? Sign In
                  </button>
                </div>
              </div>
            )}

            {/* ─── ONBOARDING 1 ─── */}
            {activeScreen === "02" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px 30px", background: "#FFF" }}>
                <div style={{ width: "100%", borderRadius: 24, overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 10px 25px rgba(0,0,0,0.06)", position: "relative" }}>
                  <img src="https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=600&q=80" alt="Find Parking" style={{ width: "100%", height: 240, objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, color: "#FFF", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF" }}>
                      <IconLocation size={18} color="#FFF" />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800 }}>Nearby Parking Found</div>
                      <div style={{ fontSize: 11, color: "#CBD5E1" }}>0.2 km away • Instant Reservation</div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Find Parking Anywhere</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0 }}>Discover safe, verified, and affordable parking spaces around your location in real time.</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Skip</button>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 24, height: 8, borderRadius: 4, background: "#22C55E" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                  </div>
                  <button onClick={() => setActiveScreen("03")} style={{ width: 48, height: 48, borderRadius: "50%", background: "#22C55E", border: "none", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(34,197,94,0.3)" }}>
                    <IconChevronRight size={20} color="#FFF" />
                  </button>
                </div>
              </div>
            )}

            {/* ─── ONBOARDING 2 ─── */}
            {activeScreen === "03" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px 30px", background: "#FFF" }}>
                <div style={{ width: "100%", borderRadius: 24, overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 10px 25px rgba(0,0,0,0.06)", position: "relative" }}>
                  <img src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80" alt="Host Garage" style={{ width: "100%", height: 240, objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, color: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#94A3B8" }}>Host Earnings</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#22C55E" }}>₹12,450 / month</div>
                    </div>
                    <span style={{ background: "#22C55E", color: "#FFF", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 10 }}>Active Space</span>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Earn From Your Extra Space</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0 }}>Rent out your driveway, garage, or vacant spot whenever it's free and earn effortless passive income.</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Skip</button>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 24, height: 8, borderRadius: 4, background: "#22C55E" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                  </div>
                  <button onClick={() => setActiveScreen("04")} style={{ width: 48, height: 48, borderRadius: "50%", background: "#22C55E", border: "none", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(34,197,94,0.3)" }}>
                    <IconChevronRight size={20} color="#FFF" />
                  </button>
                </div>
              </div>
            )}

            {/* ─── ONBOARDING 3 ─── */}
            {activeScreen === "04" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px 30px", background: "#FFF" }}>
                <div style={{ width: "100%", borderRadius: 24, overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 10px 25px rgba(0,0,0,0.06)", background: "#0F172A", padding: 24, color: "#FFF", display: "flex", flexDirection: "column", justifyContent: "space-between", height: 240 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconShield size={24} color="#FFF" />
                    </div>
                    <span style={{ background: "#DCFCE7", color: "#16A34A", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 8 }}>100% Protected</span>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 900 }}>Gated & CCTV Monitored</h3>
                    <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>Verified hosts, instant digital check-ins, and 24/7 dedicated customer assistance.</p>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#CBD5E1" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><IconCheck size={14} color="#22C55E" /> CCTV Security</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><IconCheck size={14} color="#22C55E" /> Instant Refunds</span>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Safe. Secure. Trusted.</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0 }}>Every space and user is verified for total peace of mind and hassle-free parking.</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Skip</button>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E2E8F0" }} />
                    <div style={{ width: 24, height: 8, borderRadius: 4, background: "#22C55E" }} />
                  </div>
                  <button onClick={() => setActiveScreen("05")} style={{ width: 48, height: 48, borderRadius: "50%", background: "#22C55E", border: "none", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(34,197,94,0.3)" }}>
                    <IconChevronRight size={20} color="#FFF" />
                  </button>
                </div>
              </div>
            )}

            {/* ─── CHOOSE ROLE ─── */}
            {activeScreen === "05" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 30px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("04")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 6px", textAlign: "center" }}>Choose Your Role</h2>
                  <p style={{ fontSize: 14, color: "#64748B", textAlign: "center", margin: "0 0 32px" }}>Select how you want to use Paarkkar</p>
                  
                  <div onClick={() => { setRole("driver"); setActiveScreen("06"); }} style={{ background: "#FFFFFF", borderRadius: 20, padding: 20, marginBottom: 16, border: "1.5px solid #E2E8F0", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", color: "#22C55E" }}>
                      <IconCar size={26} color="#22C55E" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>I'm Looking for Parking</h3>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Find, reserve, and navigate to parking spaces.</p>
                    </div>
                    <IconChevronRight size={18} color="#94A3B8" />
                  </div>

                  <div onClick={() => { setRole("host"); setActiveScreen("29"); }} style={{ background: "#FFFFFF", borderRadius: 20, padding: 20, border: "1.5px solid #E2E8F0", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", color: "#22C55E" }}>
                      <IconBuilding size={26} color="#22C55E" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>I Have a Parking Space</h3>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>List your spot and accept driver bookings.</p>
                    </div>
                    <IconChevronRight size={18} color="#94A3B8" />
                  </div>
                </div>

                <button onClick={() => setActiveScreen("08")} style={{ width: "100%", background: "none", border: "none", color: "#64748B", fontWeight: 600, fontSize: 14, cursor: "pointer", padding: 12 }}>
                  Skip for now
                </button>
              </div>
            )}

            {/* ─── LOGIN SCREEN ─── */}
            {activeScreen === "06" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 30px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Welcome Back!</h2>
                  <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 28px" }}>Sign in to continue your parking experience</p>
                  
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 6 }}>Phone Number</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>🇮🇳 +91</span>
                    <input type="text" defaultValue="98765 43210" style={{ border: "none", outline: "none", flex: 1, fontSize: 15, fontWeight: 600, color: "#0F172A" }} />
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 6 }}>Password</label>
                  <div style={{ display: "flex", borderRadius: 14, border: "1.5px solid #E2E8F0", padding: "12px 14px", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <IconLock size={18} color="#94A3B8" />
                    <input type="password" defaultValue="12345678" style={{ border: "none", outline: "none", flex: 1, fontSize: 15, color: "#0F172A" }} />
                  </div>

                  <div style={{ textAlign: "right", marginBottom: 24 }}>
                    <span style={{ color: "#22C55E", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Forgot Password?</span>
                  </div>

                  <button onClick={() => setActiveScreen("07")} style={{ width: "100%", padding: "16px", borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                    Login
                  </button>

                  <div style={{ textAlign: "center", margin: "24px 0 16px", color: "#94A3B8", fontSize: 12 }}>or continue with</div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                    <button style={{ width: 48, height: 48, borderRadius: 14, border: "1px solid #E2E8F0", background: "#FFF", fontWeight: 800, color: "#0F172A", cursor: "pointer" }}>G</button>
                    <button style={{ width: 48, height: 48, borderRadius: 14, border: "1px solid #E2E8F0", background: "#FFF", fontWeight: 800, color: "#0F172A", cursor: "pointer" }}>Apple</button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── ENTER OTP ─── */}
            {activeScreen === "07" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 20px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("06")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 6px", textAlign: "center" }}>Enter Verification Code</h2>
                  <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", margin: "0 0 24px" }}>
                    We've sent a 6-digit code to <br/><strong style={{ color: "#0F172A" }}>+91 98765 43210</strong>
                  </p>

                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                    {otpVal.map((v, idx) => (
                      <div key={idx} style={{ width: 48, height: 52, borderRadius: 12, border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#0F172A", background: "#F0FDF4" }}>
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

            {/* ─── HOME / SEARCH (REALISTIC MAP VIEW) ─── */}
            {activeScreen === "08" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconMenu size={22} color="#0F172A" />
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 900, fontSize: 16 }}>P</div>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Paarkkar</span>
                  </div>
                  <button onClick={() => setActiveScreen("22")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconBell size={20} color="#0F172A" />
                  </button>
                </div>

                <div style={{ padding: "8px 16px 12px", background: "#FFF" }}>
                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "10px 14px", alignItems: "center", gap: 10 }}>
                    <IconSearch size={18} color="#64748B" />
                    <input type="text" placeholder="Search location" defaultValue="Anna Nagar, Chennai" style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 600 }} />
                    <button onClick={() => setActiveScreen("09")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconFilter size={18} color="#64748B" />
                    </button>
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

                <div style={{ flex: 1, background: "#0F172A", position: "relative", overflow: "hidden" }}>
                  {/* REALISTIC DARK VECTOR MAP TILES */}
                  <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <rect width="100%" height="100%" fill="#0F172A" />
                    <path d="M0 100 L400 120 M0 240 L400 220 M120 0 L140 400 M280 0 L260 400" stroke="#1E293B" strokeWidth="24" />
                    <path d="M0 100 L400 120 M0 240 L400 220 M120 0 L140 400 M280 0 L260 400" stroke="#334155" strokeWidth="4" />
                    <circle cx="200" cy="180" r="10" fill="#3B82F6" stroke="#FFF" strokeWidth="4" />
                  </svg>

                  <div style={{ position: "absolute", top: 70, left: 60, background: "#22C55E", color: "#FFF", padding: "6px 12px", borderRadius: 16, fontWeight: 900, fontSize: 13, boxShadow: "0 4px 14px rgba(34,197,94,0.4)" }}>₹40/hr</div>
                  <div style={{ position: "absolute", top: 40, right: 80, background: "#1E293B", color: "#FFF", padding: "5px 10px", borderRadius: 14, fontWeight: 800, fontSize: 12 }}>₹60/hr</div>
                  <div style={{ position: "absolute", top: 160, right: 50, background: "#1E293B", color: "#FFF", padding: "5px 10px", borderRadius: 14, fontWeight: 800, fontSize: 12 }}>₹35/hr</div>

                  <div style={{ position: "absolute", bottom: 12, left: 16, right: 16, background: "#FFF", borderRadius: 20, padding: 14, boxShadow: "0 10px 30px rgba(0,0,0,0.25)", display: "flex", gap: 12, alignItems: "center" }}>
                    <img src={selectedSpot.image} alt="spot" style={{ width: 76, height: 76, borderRadius: 14, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{selectedSpot.title}</h4>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748B", display: "flex", alignItems: "center", gap: 4 }}>
                        <IconLocation size={12} color="#64748B" /> {selectedSpot.address}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                        <span style={{ color: "#F59E0B", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                          <IconStar size={12} /> {selectedSpot.rating}
                        </span>
                        <span style={{ fontWeight: 800, color: "#0F172A" }}>₹{selectedSpot.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></span>
                      </div>
                    </div>
                    <button onClick={() => setActiveScreen("10")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "10px 14px", borderRadius: 12, fontWeight: 800, fontSize: 12, cursor: "pointer", boxShadow: "0 4px 12px rgba(34,197,94,0.3)" }}>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── NEARBY SPACES (LIST VIEW) ─── */}
            {activeScreen === "09" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF" }}>
                  <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 900, fontSize: 16 }}>P</div>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Paarkkar</span>
                  </div>
                  <button onClick={() => setActiveScreen("22")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconBell size={20} color="#0F172A" />
                  </button>
                </div>

                <div style={{ padding: "8px 16px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "10px 14px", alignItems: "center", gap: 10 }}>
                    <IconSearch size={18} color="#64748B" />
                    <input type="text" placeholder="Search location" defaultValue="Anna Nagar, Chennai" style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 600 }} />
                    <IconFilter size={18} color="#64748B" />
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
                      <img src={item.img} alt="parking" style={{ width: 84, height: 84, borderRadius: 12, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{item.title}</h4>
                          <span style={{ fontSize: 11, color: "#64748B" }}>📍 {item.dist}</span>
                        </div>
                        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748B" }}>{item.loc}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <span style={{ color: "#F59E0B", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                              <IconStar size={12} /> {item.rate}
                            </span>
                            <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 14 }}>₹{item.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></div>
                          </div>
                          <button onClick={() => { setSelectedSpot({...selectedSpot, title: item.title, address: item.loc, price: item.price}); setActiveScreen("10"); }} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "8px 14px", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── PARKING DETAILS ─── */}
            {activeScreen === "10" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF" }}>
                <div style={{ height: 220, position: "relative" }}>
                  <img src={selectedSpot.image} alt="Detail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
                    <button onClick={() => setActiveScreen("09")} style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconChevronLeft size={20} color="#0F172A" />
                    </button>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setActiveScreen("23")} style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconHeart size={18} color="#EF4444" />
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: 0 }}>{selectedSpot.title}</h2>
                      <span onClick={() => setActiveScreen("40")} style={{ color: "#F59E0B", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
                        <IconStar size={14} /> {selectedSpot.rating}
                      </span>
                    </div>
                    <p style={{ color: "#64748B", fontSize: 13, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 4 }}>
                      <IconLocation size={14} color="#64748B" /> {selectedSpot.address}
                    </p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                      {selectedSpot.features.map((f, idx) => (
                        <span key={idx} style={{ background: "#F1F5F9", color: "#475569", fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 8, display: "flex", alignItems: "center", gap: 4 }}>
                          <IconCheck size={12} color="#22C55E" /> {f}
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
                    <button onClick={() => setActiveScreen("23")} style={{ flex: 1, padding: 14, borderRadius: 14, border: "1.5px solid #E2E8F0", background: "#FFF", color: "#0F172A", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <IconHeart size={16} color="#0F172A" /> Save
                    </button>
                    <button onClick={() => setActiveScreen("11")} style={{ flex: 1, padding: 14, borderRadius: 14, border: "none", background: "#22C55E", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.3)" }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SELECT DATE & TIME ─── */}
            {activeScreen === "11" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("10")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
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
                      <button onClick={() => setDurationHours(Math.max(1, durationHours - 1))} style={{ width: 32, height: 32, borderRadius: "50%", background: "#F1F5F9", border: "none", fontWeight: 900, cursor: "pointer" }}>-</button>
                      <button onClick={() => setDurationHours(durationHours + 1)} style={{ width: 32, height: 32, borderRadius: "50%", background: "#F1F5F9", border: "none", fontWeight: 900, cursor: "pointer" }}>+</button>
                    </div>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("12")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Continue
                </button>
              </div>
            )}

            {/* ─── BOOKING SUMMARY ─── */}
            {activeScreen === "12" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#F8FAFC" }}>
                <div>
                  <button onClick={() => setActiveScreen("11")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
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
                    <span style={{ color: "#94A3B8", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><IconTag size={16} color="#22C55E" /> Select promo coupon</span>
                    <IconChevronRight size={16} color="#64748B" />
                  </div>
                </div>

                <button onClick={() => setActiveScreen("13")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Proceed to Payment
                </button>
              </div>
            )}

            {/* ─── PAYMENT METHOD ─── */}
            {activeScreen === "13" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("12")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", textAlign: "center" }}>Payment</h2>
                  <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", margin: "0 0 20px" }}>Choose a payment method</p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Total Payable</span>
                    <span style={{ fontSize: 22, fontWeight: 900, color: "#22C55E" }}>₹80</span>
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 10 }}>Recommended Options</label>

                  {[
                    { id: "upi", title: "UPI Payment", desc: "Google Pay, PhonePe, Paytm", icon: <IconWallet size={20} color="#22C55E" /> },
                    { id: "card", title: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: <IconCreditCard size={20} color="#22C55E" /> },
                    { id: "wallet", title: "Paarkkar Wallet", desc: "Available Balance: ₹1,250", icon: <IconWallet size={20} color="#22C55E" /> },
                    { id: "net", title: "Net Banking", desc: "All Indian banks supported", icon: <IconBank size={20} color="#22C55E" /> },
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
                        {p.icon}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 14 }}>{p.title}</div>
                          <div style={{ fontSize: 11, color: "#64748B" }}>{p.desc}</div>
                        </div>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: isSelected ? "5px solid #22C55E" : "2px solid #CBD5E1" }} />
                      </div>
                    );
                  })}

                  <div style={{ textAlign: "center", color: "#64748B", fontSize: 12, marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <IconLock size={14} color="#64748B" /> 256-Bit Encrypted Secure Payments
                  </div>
                </div>

                <button onClick={() => setActiveScreen("14")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Pay ₹80 Securely
                </button>
              </div>
            )}

            {/* ─── PAYMENT SUCCESS ─── */}
            {activeScreen === "14" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "30px 24px", justifyContent: "space-between", background: "#F8FAFC", textAlign: "center" }}>
                <div>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "20px auto 20px", color: "#FFF", boxShadow: "0 10px 30px rgba(34,197,94,0.4)" }}>
                    <IconCheck size={40} color="#FFF" />
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Payment Successful!</h2>
                  <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 30px" }}>Your parking space has been reserved</p>

                  <div style={{ background: "#FFF", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", textAlign: "left", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Booking ID</span>
                      <span style={{ fontWeight: 800, color: "#0F172A" }}>PKR89076543</span>
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
                    View Active Parking
                  </button>
                  <button onClick={() => setActiveScreen("20")} style={{ width: "100%", padding: 14, borderRadius: 16, background: "#FFF", border: "1.5px solid #E2E8F0", color: "#0F172A", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Go to My Bookings
                  </button>
                </div>
              </div>
            )}

            {/* ─── ACTIVE PARKING (DARK THEME) ─── */}
            {activeScreen === "15" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#0F172A", color: "#FFF" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("14")} style={{ background: "none", border: "none", color: "#FFF", cursor: "pointer" }}>
                      <IconChevronLeft size={22} color="#FFF" />
                    </button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Active Parking</h3>
                    <span style={{ background: "rgba(34,197,94,0.2)", color: "#22C55E", border: "1px solid #22C55E", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 12 }}>● Live</span>
                  </div>

                  <div style={{ background: "#1E293B", borderRadius: 18, padding: 14, display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                    <img src={selectedSpot.image} alt="Active" style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#FFF" }}>{selectedSpot.title}</h4>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#94A3B8" }}>{selectedSpot.address}</p>
                      <span style={{ fontSize: 11, color: "#94A3B8" }}>📍 {selectedSpot.distance}</span>
                    </div>
                    <button onClick={() => setActiveScreen("17")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "8px 12px", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <IconNavigation size={14} color="#FFF" /> Go
                    </button>
                  </div>

                  <div style={{ background: "#1E293B", borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#94A3B8" }}>Booking ID</span>
                      <span style={{ fontWeight: 700, color: "#FFF" }}>PKR89076543</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#94A3B8" }}>Vehicle Number</span>
                      <span style={{ fontWeight: 700, color: "#FFF" }}>TN 09 AB 1234</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#94A3B8" }}>Started From</span>
                      <span style={{ fontWeight: 700, color: "#FFF" }}>21 May 2025, 10:00 AM</span>
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
                    Extend Time
                  </button>
                  <button onClick={() => setActiveScreen("16")} style={{ flex: 1, padding: 14, borderRadius: 14, background: "transparent", border: "1.5px solid #334155", color: "#FFF", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                    QR Check-in
                  </button>
                </div>
              </div>
            )}

            {/* ─── QR CHECK-IN ─── */}
            {activeScreen === "16" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 30px", justifyContent: "space-between", background: "#FFF", textAlign: "center" }}>
                <div>
                  <button onClick={() => setActiveScreen("15")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12, alignSelf: "flex-start" }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>Check-in Pass</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 30px" }}>Scan this QR code at entry gate</p>

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
                    Booking ID <span style={{ color: "#64748B" }}>PKR89076543</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#64748B" }}>
                    Valid for slot: <strong style={{ color: "#0F172A" }}>A-12 (Ground Floor)</strong>
                  </p>
                </div>

                <button onClick={() => setActiveScreen("17")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <IconNavigation size={18} color="#FFF" /> Start Navigation
                </button>
              </div>
            )}

            {/* ─── NAVIGATION TO PARKING ─── */}
            {activeScreen === "17" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", background: "#0B131F", color: "#FFF" }}>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, background: "#0F172A", zIndex: 10 }}>
                  <button onClick={() => setActiveScreen("15")} style={{ background: "none", border: "none", color: "#FFF", cursor: "pointer" }}>
                    <IconChevronLeft size={22} color="#FFF" />
                  </button>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>GPS Navigation</h3>
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
                        <div style={{ fontSize: 11, color: "#64748B" }}>Turn right on 4th Street</div>
                      </div>
                      <button onClick={() => setActiveScreen("18")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "12px 20px", borderRadius: 14, fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <IconNavigation size={16} color="#FFF" /> Start
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── EXTEND PARKING ─── */}
            {activeScreen === "18" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("15")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", textAlign: "center" }}>Extend Parking</h2>
                  <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", margin: "0 0 24px" }}>Choose new duration extension</p>

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
                </div>

                <button onClick={() => setActiveScreen("19")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                  Confirm & Extend - ₹40
                </button>
              </div>
            )}

            {/* ─── BOOKING COMPLETE ─── */}
            {activeScreen === "19" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "30px 24px", justifyContent: "space-between", background: "#F8FAFC", textAlign: "center" }}>
                <div>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "20px auto 20px" }}>
                    <IconCheck size={40} color="#22C55E" />
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Parking Completed!</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 28px" }}>Thank you for parking with Paarkkar.</p>

                  <div style={{ background: "#FFF", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", textAlign: "left", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Total Amount</span>
                      <span style={{ fontWeight: 900, color: "#22C55E" }}>₹80</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#64748B" }}>Duration</span>
                      <span style={{ fontWeight: 700, color: "#0F172A" }}>2 Hours</span>
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

            {/* ─── MY BOOKINGS (HISTORY) ─── */}
            {activeScreen === "20" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
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
                    <IconHome size={20} color="#64748B" />
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Home</div>
                  </div>
                  <div onClick={() => setActiveScreen("20")} style={{ textAlign: "center", cursor: "pointer", color: "#22C55E" }}>
                    <IconBookings size={20} color="#22C55E" />
                    <div style={{ fontSize: 10, fontWeight: 800 }}>Bookings</div>
                  </div>
                  <div onClick={() => setActiveScreen("21")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <IconWallet size={20} color="#64748B" />
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Wallet</div>
                  </div>
                  <div onClick={() => setActiveScreen("24")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <IconProfile size={20} color="#64748B" />
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Profile</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── WALLET ─── */}
            {activeScreen === "21" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("20")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Paarkkar Wallet</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", gap: 20, overflowY: "auto" }}>
                  <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", borderRadius: 20, padding: 20, color: "#FFF", boxShadow: "0 8px 24px rgba(15,23,42,0.3)" }}>
                    <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>Total Balance</span>
                    <h2 style={{ fontSize: 32, fontWeight: 900, color: "#FFF", margin: "4px 0 16px" }}>₹1,250.00</h2>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 16, color: "#CBD5E1" }}>
                      <span>Available: <strong style={{ color: "#22C55E" }}>₹1,050.00</strong></span>
                      <span>In Hold: <strong style={{ color: "#F59E0B" }}>₹200.00</strong></span>
                    </div>
                    <button style={{ width: "100%", padding: 14, borderRadius: 14, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                      Add Money
                    </button>
                  </div>

                  <div>
                    <label style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 12 }}>Quick Actions</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                      {[
                        { name: "Add Money", icon: <IconWallet size={18} color="#22C55E" /> },
                        { name: "Withdraw", icon: <IconBank size={18} color="#22C55E" />, screen: "39" },
                        { name: "Statement", icon: <IconBookings size={18} color="#22C55E" />, screen: "42" },
                        { name: "Offers", icon: <IconTag size={18} color="#22C55E" />, screen: "47" },
                      ].map((a, i) => (
                        <div key={i} onClick={() => a.screen && setActiveScreen(a.screen)} style={{ background: "#FFF", borderRadius: 16, padding: "14px 6px", border: "1px solid #E2E8F0", textAlign: "center", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                          {a.icon}
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>{a.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ height: 60, background: "#FFF", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div onClick={() => setActiveScreen("08")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <IconHome size={20} color="#64748B" />
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Home</div>
                  </div>
                  <div onClick={() => setActiveScreen("20")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <IconBookings size={20} color="#64748B" />
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Bookings</div>
                  </div>
                  <div onClick={() => setActiveScreen("21")} style={{ textAlign: "center", cursor: "pointer", color: "#22C55E" }}>
                    <IconWallet size={20} color="#22C55E" />
                    <div style={{ fontSize: 10, fontWeight: 800 }}>Wallet</div>
                  </div>
                  <div onClick={() => setActiveScreen("24")} style={{ textAlign: "center", cursor: "pointer", color: "#64748B" }}>
                    <IconProfile size={20} color="#64748B" />
                    <div style={{ fontSize: 10, fontWeight: 600 }}>Profile</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── NOTIFICATIONS ─── */}
            {activeScreen === "22" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px 12px", background: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Notifications</h3>
                    <button onClick={() => setActiveScreen("50")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconSettings size={18} color="#0F172A" />
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  {[
                    { title: "Booking Confirmed", desc: "Home Garage • Your booking is confirmed.", time: "2m ago", icon: <IconCheck size={18} color="#22C55E" /> },
                    { title: "Parking Reminder", desc: "Shop Parking • Your parking will expire in 30 mins.", time: "30m ago", icon: <IconCar size={18} color="#F59E0B" /> },
                    { title: "Payment Successful", desc: "₹80 has been paid successfully.", time: "1h ago", icon: <IconCreditCard size={18} color="#3B82F6" /> },
                  ].map((n, i) => (
                    <div key={i} style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {n.icon}
                      </div>
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
              </div>
            )}

            {/* ─── FAVORITES ─── */}
            {activeScreen === "23" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>My Favorites</h3>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  {[
                    { title: "Home Garage", loc: "Anna Nagar, Chennai", rate: "4.8 (120)", price: 40, img: "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=400&q=80" },
                    { title: "Office Basement", loc: "T. Nagar, Chennai", rate: "4.6 (98)", price: 60, img: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=400&q=80" },
                  ].map((f, i) => (
                    <div key={i} onClick={() => setActiveScreen("10")} style={{ background: "#FFF", borderRadius: 16, padding: 12, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
                      <img src={f.img} alt="fav" style={{ width: 76, height: 76, borderRadius: 12, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{f.title}</h4>
                          <IconHeart size={18} color="#EF4444" fill="#EF4444" />
                        </div>
                        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748B" }}>{f.loc}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "#F59E0B", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                            <IconStar size={12} /> {f.rate}
                          </span>
                          <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 14 }}>₹{f.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── PROFILE ─── */}
            {activeScreen === "24" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={() => setActiveScreen("50")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconSettings size={20} color="#0F172A" />
                  </button>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div style={{ background: "#FFF", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", textAlign: "center", position: "relative" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#CBD5E1", margin: "0 auto 10px", overflow: "hidden", border: "2px solid #22C55E" }}>
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <h3 style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Dharani Prasanna</h3>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: "#64748B" }}>+91 98765 43210 • dharani@email.com</p>
                    <span style={{ background: "#DCFCE7", color: "#22C55E", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 12, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <IconCheck size={12} color="#22C55E" /> Verified User
                    </span>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 20, border: "1px solid #E2E8F0", overflow: "hidden" }}>
                    {[
                      { title: "Personal Information", icon: <IconProfile size={18} color="#64748B" />, screen: "24" },
                      { title: "My Vehicles", icon: <IconCar size={18} color="#64748B" />, screen: "43" },
                      { title: "Address Book", icon: <IconLocation size={18} color="#64748B" />, screen: "44" },
                      { title: "Payment Methods", icon: <IconCreditCard size={18} color="#64748B" />, screen: "46" },
                      { title: "Offers & Promotions", icon: <IconTag size={18} color="#64748B" />, screen: "47" },
                      { title: "Support Center", icon: <IconHelp size={18} color="#64748B" />, screen: "45" },
                      { title: "Invite Friends", icon: <IconInvite size={18} color="#64748B" />, screen: "48" },
                    ].map((m, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveScreen(m.screen)}
                        style={{
                          padding: "14px 18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: i < 6 ? "1px solid #F1F5F9" : "none",
                          cursor: "pointer"
                        }}
                      >
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          {m.icon}
                          <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>{m.title}</span>
                        </div>
                        <IconChevronRight size={16} color="#94A3B8" />
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setActiveScreen("06")} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#FFF5F5", border: "1.5px solid #FEE2E2", color: "#EF4444", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* ─── HOST DASHBOARD ─── */}
            {activeScreen === "29" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "16px 20px", background: "#FFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconMenu size={20} color="#0F172A" />
                  </button>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Host Dashboard</h3>
                  <button onClick={() => setActiveScreen("49")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconBell size={20} color="#0F172A" />
                  </button>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                  <div onClick={() => setActiveScreen("41")} style={{ background: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)", borderRadius: 20, padding: 20, color: "#FFF", boxShadow: "0 10px 25px rgba(34,197,94,0.3)", cursor: "pointer" }}>
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

                  <button onClick={() => setActiveScreen("30")} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#FFF", border: "1.5px solid #22C55E", color: "#22C55E", fontWeight: 800, fontSize: 14, cursor: "pointer", marginTop: 10 }}>
                    + Add New Space
                  </button>
                </div>
              </div>
            )}

            {/* DEFAULT FALLBACK / GENERIC RENDER FOR REMAINING FLOW SCREENS */}
            {![
              "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","29"
            ].includes(activeScreen) && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#0F172A" }}>
                    {screensList.find(s => s.id === activeScreen)?.name || "Screen View"}
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px" }}>Real-time Paarkkar workflow interactive page</p>

                  <div style={{ background: "#F8FAFC", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#DCFCE7", color: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconCheck size={20} color="#22C55E" />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Live Verified Status</div>
                        <div style={{ fontSize: 11, color: "#64748B" }}>Connected to Paarkkar Backend</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("08")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                  Back to Home Map
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* DISCREET FLOATING SCREEN NAVIGATOR TOOLBAR FOR QUICK JUMP */}
      <div style={{ position: "fixed", bottom: 12, right: 12, zIndex: 1000 }}>
        {showQuickNav ? (
          <div style={{ background: "#1E293B", borderRadius: 16, padding: 12, border: "1px solid #334155", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", width: 260, maxHeight: 320, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, borderBottom: "1px solid #334155", paddingBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#22C55E" }}>Jump to Page</span>
              <button onClick={() => setShowQuickNav(false)} style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontWeight: "bold" }}>✕</button>
            </div>
            <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              {screensList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setActiveScreen(s.id); setShowQuickNav(false); }}
                  style={{
                    textAlign: "left",
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: "none",
                    background: activeScreen === s.id ? "#22C55E" : "transparent",
                    color: activeScreen === s.id ? "#FFF" : "#CBD5E1",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowQuickNav(true)}
            style={{
              padding: "8px 14px",
              borderRadius: 20,
              background: "#22C55E",
              color: "#FFF",
              border: "none",
              fontWeight: 800,
              fontSize: 12,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(34,197,94,0.4)"
            }}
          >
            ⚙️ Switch Screen
          </button>
        )}
      </div>

    </div>
  );
}
