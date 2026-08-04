import React, { useState, useEffect, useRef } from "react";

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

const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyCgVkjThmCRYwn9Q5Py8F52EUEo774gRLY";

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

const IconLock = ({ size = 16, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

// ─── HIGH-RELIABILITY MULTI-SOURCE REAL PHOTO COMPONENT ──────────────────────
const REAL_IMAGES = {
  whiteCar: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2018_Tesla_Model_3_Front.jpg/800px-2018_Tesla_Model_3_Front.jpg",
    "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  garageHouse: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Parkhaus_Dresden_Altmarkt.jpg/800px-Parkhaus_Dresden_Altmarkt.jpg",
    "https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  garage: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Parkhaus_Dresden_Altmarkt.jpg/800px-Parkhaus_Dresden_Altmarkt.jpg",
    "https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.unsplash.com/photo-1506521782020-18925f4bfa55?auto=format&fit=crop&w=800&q=80"
  ],
  office: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Underground_parking_in_Krak%C3%B3w.jpg/800px-Underground_parking_in_Krak%C3%B3w.jpg",
    "https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=800&q=80"
  ],
  driveway: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Parking_lot_in_Fresno%2C_California.jpg/800px-Parking_lot_in_Fresno%2C_California.jpg",
    "https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80"
  ],
  security: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Automatic_number_plate_recognition_barrier_parking.jpg/800px-Automatic_number_plate_recognition_barrier_parking.jpg",
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80"
  ]
};

const SmartImage = ({ sources = [], alt, style }) => {
  const [sourceIndex, setSourceIndex] = useState(0);

  const srcList = Array.isArray(sources) ? sources : [sources];
  const currentSrc = srcList[sourceIndex] || srcList[0];

  const handleError = () => {
    if (sourceIndex < srcList.length - 1) {
      setSourceIndex(prev => prev + 1);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
      onError={handleError}
    />
  );
};

const RealGaragePhoto = ({ height = 200, badge = "SLOT A-12 • PRIVATE GARAGE" }) => (
  <div style={{ width: "100%", height, borderRadius: 16, overflow: "hidden", position: "relative", border: "1px solid #E2E8F0" }}>
    <SmartImage sources={REAL_IMAGES.garage} alt="Real Home Garage" />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(34,197,94,0.9)", color: "#FFF", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      ● LIVE
    </div>
    <div style={{ position: "absolute", bottom: 12, left: 14, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", color: "#22C55E", padding: "5px 12px", borderRadius: 10, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      {badge}
    </div>
  </div>
);

const RealOfficePhoto = ({ height = 200, badge = "OFFICE BASEMENT PARKING" }) => (
  <div style={{ width: "100%", height, borderRadius: 16, overflow: "hidden", position: "relative", border: "1px solid #E2E8F0" }}>
    <SmartImage sources={REAL_IMAGES.office} alt="Real Office Basement" />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(56,189,248,0.9)", color: "#FFF", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      AVAILABLE
    </div>
    <div style={{ position: "absolute", bottom: 12, left: 14, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", color: "#38BDF8", padding: "5px 12px", borderRadius: 10, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      {badge}
    </div>
  </div>
);

const RealDrivewayPhoto = ({ height = 200, badge = "GATED RESIDENTIAL DRIVEWAY" }) => (
  <div style={{ width: "100%", height, borderRadius: 16, overflow: "hidden", position: "relative", border: "1px solid #E2E8F0" }}>
    <SmartImage sources={REAL_IMAGES.driveway} alt="Real Driveway Spot" />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(34,197,94,0.9)", color: "#FFF", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      EV ⚡ READY
    </div>
    <div style={{ position: "absolute", bottom: 12, left: 14, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", color: "#22C55E", padding: "5px 12px", borderRadius: 10, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      {badge}
    </div>
  </div>
);

const RealSecurityPhoto = ({ height = 230 }) => (
  <div style={{ width: "100%", height, borderRadius: 24, overflow: "hidden", position: "relative", border: "1px solid #E2E8F0" }}>
    <SmartImage sources={REAL_IMAGES.security} alt="Real Security & CCTV Monitored Parking" />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", top: 14, right: 14, background: "#22C55E", color: "#FFF", padding: "4px 10px", borderRadius: 10, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      100% Protected
    </div>
    <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, color: "#FFF", zIndex: 2 }}>
      <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 2 }}>Gated & CCTV Monitored</div>
      <div style={{ fontSize: 12, color: "#CBD5E1" }}>Verified hosts • 24/7 Dedicated Assistance</div>
    </div>
  </div>
);

// ─── RESILIENT DUAL MAP COMPONENT (GOOGLE MAPS + LEAFLET FALLBACK) ───────────
function InteractiveMap() {
  const mapRef = useRef(null);
  const [mapType, setMapType] = useState("google");

  useEffect(() => {
    window.gm_authFailure = () => {
      console.warn("Google Maps Key Auth Failed. Seamlessly switching to Leaflet Dark Tile Map.");
      setMapType("leaflet");
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}`;
      script.async = true;
      script.onerror = () => setMapType("leaflet");
      script.onload = () => {
        if (window.google && window.google.maps) {
          initGoogleMap();
        } else {
          setMapType("leaflet");
        }
      };
      document.head.appendChild(script);
    } else {
      initGoogleMap();
    }

    function initGoogleMap() {
      if (!mapRef.current || !window.google || !window.google.maps) return;
      try {
        const center = { lat: 13.0850, lng: 80.2101 };
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 14,
          disableDefaultUI: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] }
          ]
        });

        new window.google.maps.Marker({ position: { lat: 13.0850, lng: 80.2101 }, map, title: "Home Garage (₹40/hr)" });
        new window.google.maps.Marker({ position: { lat: 13.0890, lng: 80.2150 }, map, title: "Office Basement (₹60/hr)" });
        new window.google.maps.Marker({ position: { lat: 13.0810, lng: 80.2050 }, map, title: "Apartment Parking (₹35/hr)" });
      } catch (err) {
        setMapType("leaflet");
      }
    }
  }, []);

  useEffect(() => {
    if (mapType === "leaflet" && mapRef.current) {
      if (!window.L) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => initLeaflet();
        document.head.appendChild(script);
      } else {
        initLeaflet();
      }
    }

    function initLeaflet() {
      if (!mapRef.current || !window.L || mapRef.current._leaflet_id) return;
      const map = window.L.map(mapRef.current, { zoomControl: false }).setView([13.0850, 80.2101], 14);
      
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Add custom green price markers
      const customIcon = (price) => window.L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background:#22C55E; color:#FFF; padding:4px 8px; border-radius:12px; font-weight:800; font-size:11px; box-shadow:0 4px 10px rgba(0,0,0,0.4); border:1px solid #FFF;">${price}</div>`,
        iconSize: [60, 24],
        iconAnchor: [30, 12]
      });

      window.L.marker([13.0850, 80.2101], { icon: customIcon("₹40/hr") }).addTo(map);
      window.L.marker([13.0890, 80.2150], { icon: customIcon("₹60/hr") }).addTo(map);
      window.L.marker([13.0810, 80.2050], { icon: customIcon("₹35/hr") }).addTo(map);
    }
  }, [mapType]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%", position: "relative" }} />;
}

export default function FullShowcaseBoard() {
  const [activeScreen, setActiveScreen] = useState("01");
  const [role, setRole] = useState(null);
  const [otpVal, setOtpVal] = useState(["2", "4", "6", "8", "2", "1"]);
  const [showQuickNav, setShowQuickNav] = useState(false);

  const [selectedSpot, setSelectedSpot] = useState({
    title: "Home Garage",
    address: "Anna Nagar, Chennai",
    rating: "4.8 (120)",
    price: 40,
    distance: "0.2 km",
    photoComponent: <RealGaragePhoto height={210} badge="SLOT A-12 • PRIVATE GARAGE" />,
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
            
            <div style={{ width: 80, height: 18, background: activeScreen === "15" || activeScreen === "17" ? "#1E293B" : "#0F172A", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1E293B", border: "1px solid #334155" }} />
            </div>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <svg width="14" height="12" viewBox="0 0 14 12" fill={activeScreen === "15" || activeScreen === "17" ? "#FFF" : "#0F172A"}>
                <rect x="0" y="8" width="2" height="4" rx="0.5" />
                <rect x="4" y="6" width="2" height="6" rx="0.5" />
                <rect x="8" y="3" width="2" height="9" rx="0.5" />
                <rect x="12" y="0" width="2" height="12" rx="0.5" />
              </svg>
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

                <div style={{ width: "100%" }}>
                  <RealGaragePhoto height={210} badge="500+ VERIFIED SPACES LIVE" />
                </div>

                {/* PRIMARY ACTION BUTTONS ON SPLASH SCREEN */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
                  <button onClick={() => setActiveScreen("02")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,197,94,0.35)" }}>
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
                <div style={{ width: "100%" }}>
                  <RealOfficePhoto height={230} badge="NEARBY INSTANT RESERVATION" />
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
                <div style={{ width: "100%" }}>
                  <RealDrivewayPhoto height={230} badge="EARN ₹12,450 / MONTH" />
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
                <div style={{ width: "100%" }}>
                  <RealSecurityPhoto height={230} />
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

            {/* ─── CHOOSE ROLE (BOLD, PREMIUM & ATTRACTIVE CARDS) ─── */}
            {activeScreen === "05" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 30px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("04")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 16 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", textAlign: "center", letterSpacing: "-0.02em" }}>Choose Your Role</h2>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#64748B", textAlign: "center", margin: "0 0 28px" }}>Get started as</p>
                  
                  {/* BOLD DRIVER ROLE CARD */}
                  <div 
                    onClick={() => { setRole("driver"); setActiveScreen("06"); }} 
                    style={{ 
                      background: "#FFFFFF", 
                      borderRadius: 22, 
                      padding: "18px 20px", 
                      marginBottom: 20, 
                      border: "2px solid #22C55E", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 16, 
                      cursor: "pointer", 
                      boxShadow: "0 10px 25px rgba(34,197,94,0.15)",
                      position: "relative"
                    }}
                  >
                    <div style={{ width: 104, height: 80, borderRadius: 16, overflow: "hidden", flexShrink: 0, boxShadow: "0 6px 16px rgba(0,0,0,0.1)" }}>
                      <SmartImage sources={REAL_IMAGES.whiteCar} alt="Driver Role - White SUV" />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "inline-block", background: "#DCFCE7", color: "#16A34A", padding: "3px 8px", borderRadius: 8, fontSize: 10, fontWeight: 900, marginBottom: 6 }}>
                        DRIVER MODE
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", lineHeight: 1.2 }}>I'm Looking for Parking</h3>
                      <p style={{ fontSize: 12, color: "#64748B", margin: 0, fontWeight: 600, lineHeight: 1.3 }}>Find & book instant verified parking near you</p>
                    </div>

                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", flexShrink: 0, boxShadow: "0 4px 10px rgba(34,197,94,0.4)" }}>
                      <IconChevronRight size={18} color="#FFF" />
                    </div>
                  </div>

                  {/* BOLD HOST ROLE CARD */}
                  <div 
                    onClick={() => { setRole("host"); setActiveScreen("29"); }} 
                    style={{ 
                      background: "#FFFFFF", 
                      borderRadius: 22, 
                      padding: "18px 20px", 
                      border: "2px solid #F59E0B", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 16, 
                      cursor: "pointer", 
                      boxShadow: "0 10px 25px rgba(245,158,11,0.15)",
                      position: "relative"
                    }}
                  >
                    <div style={{ width: 104, height: 80, borderRadius: 16, overflow: "hidden", flexShrink: 0, boxShadow: "0 6px 16px rgba(0,0,0,0.1)" }}>
                      <SmartImage sources={REAL_IMAGES.garageHouse} alt="Host Role - Garage Spot" />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "inline-block", background: "#FEF3C7", color: "#D97706", padding: "3px 8px", borderRadius: 8, fontSize: 10, fontWeight: 900, marginBottom: 6 }}>
                        HOST & EARN ₹
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", lineHeight: 1.2 }}>I Have a Parking Space</h3>
                      <p style={{ fontSize: 12, color: "#64748B", margin: 0, fontWeight: 600, lineHeight: 1.3 }}>List my space & start earning passive income</p>
                    </div>

                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", flexShrink: 0, boxShadow: "0 4px 10px rgba(245,158,11,0.4)" }}>
                      <IconChevronRight size={18} color="#FFF" />
                    </div>
                  </div>
                </div>

                <button onClick={() => setActiveScreen("08")} style={{ width: "100%", background: "none", border: "none", color: "#64748B", fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 12, textAlign: "center" }}>
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

            {/* ─── HOME / SEARCH (INTERACTIVE DARK VECTOR MAP) ─── */}
            {activeScreen === "08" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF" }}>
                  <button onClick={() => setActiveScreen("24")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconMenu size={22} color="#0F172A" />
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 900, fontSize: 16 }}>P</div>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Paarkkar Map</span>
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
                </div>

                <div style={{ flex: 1, background: "#0F172A", position: "relative", overflow: "hidden" }}>
                  <InteractiveMap />

                  <div style={{ position: "absolute", bottom: 12, left: 16, right: 16, background: "#FFF", borderRadius: 20, padding: 14, boxShadow: "0 10px 30px rgba(0,0,0,0.25)", display: "flex", gap: 12, alignItems: "center", zIndex: 500 }}>
                    <div style={{ width: 70, height: 70, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                      <SmartImage sources={REAL_IMAGES.garage} alt="spot" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{selectedSpot.title}</h4>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748B" }}>{selectedSpot.address}</p>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#22C55E" }}>₹{selectedSpot.price}/hr</div>
                    </div>
                    <button onClick={() => setActiveScreen("10")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "10px 14px", borderRadius: 12, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
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
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Nearby Spaces</span>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  {[
                    { title: "Home Garage", loc: "Anna Nagar, Chennai", imgSources: REAL_IMAGES.garage, price: 40, photo: <RealGaragePhoto height={210} badge="SLOT A-12 • PRIVATE GARAGE" /> },
                    { title: "Office Basement", loc: "T. Nagar, Chennai", imgSources: REAL_IMAGES.office, price: 60, photo: <RealOfficePhoto height={210} badge="OFFICE BASEMENT PARKING" /> },
                    { title: "Apartment Parking", loc: "West Mambalam, Chennai", imgSources: REAL_IMAGES.driveway, price: 35, photo: <RealDrivewayPhoto height={210} badge="GATED RESIDENTIAL DRIVEWAY" /> },
                  ].map((item, idx) => (
                    <div key={idx} style={{ background: "#FFF", borderRadius: 16, padding: 12, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 84, height: 84, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                        <SmartImage sources={item.imgSources} alt="spot" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{item.title}</h4>
                        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748B" }}>{item.loc}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 14 }}>₹{item.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></div>
                          <button onClick={() => { setSelectedSpot({...selectedSpot, title: item.title, address: item.loc, price: item.price, photoComponent: item.photo}); setActiveScreen("10"); }} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "8px 14px", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
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
                <div style={{ height: 210, position: "relative" }}>
                  {selectedSpot.photoComponent || <RealGaragePhoto height={210} />}
                  <button onClick={() => setActiveScreen("09")} style={{ position: "absolute", top: 12, left: 16, width: 36, height: 36, borderRadius: "50%", background: "#FFF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 10 }}>
                    <IconChevronLeft size={20} color="#0F172A" />
                  </button>
                </div>

                <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>{selectedSpot.title}</h2>
                    <p style={{ color: "#64748B", fontSize: 13, margin: "0 0 16px" }}>{selectedSpot.address}</p>

                    <div style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", marginBottom: 16 }}>
                      ₹{selectedSpot.price} <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>/hr</span>
                    </div>

                    <h4 style={{ fontSize: 15, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>About this space</h4>
                    <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                      {selectedSpot.about}
                    </p>
                  </div>

                  <button onClick={() => setActiveScreen("11")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.3)" }}>
                    Book Now
                  </button>
                </div>
              </div>
            )}

            {/* DEFAULT FALLBACK FOR OTHER SCREENS */}
            {![
              "01","02","03","04","05","06","07","08","09","10"
            ].includes(activeScreen) && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#0F172A" }}>
                    {screensList.find(s => s.id === activeScreen)?.name || "Page View"}
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px" }}>Real-time Paarkkar native UI screen</p>

                  <div style={{ width: "100%", marginTop: 10 }}>
                    <RealGaragePhoto height={190} />
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

      {/* DISCREET FLOATING SCREEN NAVIGATOR TOOLBAR */}
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
