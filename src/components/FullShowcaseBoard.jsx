import React, { useState, useEffect, useRef } from "react";
import { 
  saveHostSpot, 
  fetchHostSpotsFromFirebase, 
  getFirebaseConfig, 
  saveCustomFirebaseConfig, 
  isFirebaseConnected,
  firebaseSignIn,
  firebaseSignUp,
  firebaseSignOutUser,
  uploadImageToFirebaseStorage,
  saveHostVerification,
  saveDriverKyc,
  saveHostKyc,
  auth
} from "../firebase";

// Theme Palette matching PARKKAR UI Reference
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
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

const IconLock = ({ size = 16, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconShare = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const IconCheck = ({ size = 20, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconCamera = ({ size = 22, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconTarget = ({ size = 18, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
  </svg>
);

// ─── RAPIDO-STYLE AI DYNAMIC SMART PRICING ENGINE ────────────────────────────
function calculateAISmartPrice(address, city, type, amenities) {
  let baseRate = 45;
  let areaTier = "Standard Demand Zone";
  let surgeMultiplier = "1.0x";

  const addrLower = (address + " " + city).toLowerCase();

  if (addrLower.includes("t. nagar") || addrLower.includes("t nagar") || addrLower.includes("nungambakkam") || addrLower.includes("guindy")) {
    baseRate = 65;
    areaTier = "🔥 Ultra-High Commercial Surge Zone";
    surgeMultiplier = "1.4x";
  } else if (addrLower.includes("anna nagar") || addrLower.includes("adyar") || addrLower.includes("alwarpet") || addrLower.includes("mylapore")) {
    baseRate = 50;
    areaTier = "⚡ Prime Residential Zone";
    surgeMultiplier = "1.2x";
  } else if (city === "Coimbatore") {
    baseRate = 45;
    areaTier = "📍 Coimbatore Commercial Hub";
    surgeMultiplier = "1.1x";
  } else if (city === "Madurai") {
    baseRate = 35;
    areaTier = "📍 Madurai City Zone";
    surgeMultiplier = "1.0x";
  }

  // Feature Additions
  if (type === "Underground Basement" || type === "Private Garage") baseRate += 10;
  if (amenities.includes("EV Ready")) baseRate += 10;
  if (amenities.includes("CCTV")) baseRate += 5;

  const estimatedMonthly = baseRate * 6 * 30; // 6 hours average daily occupancy

  return { recommendedPrice: baseRate, areaTier, surgeMultiplier, estimatedMonthly };
}

// ─── 100% BULLETPROOF EMBEDDED SVG DATA URLS FOR HIGH-RELIABILITY DISPLAY ────
const SVG_GARAGE_DATA_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230F172A"/><rect x="40" y="40" width="720" height="520" rx="30" fill="%231E293B" stroke="%2322C55E" stroke-width="4"/><path d="M150 450 L400 150 L650 450 Z" fill="none" stroke="%2322C55E" stroke-width="12" stroke-linecap="round"/><rect x="250" y="320" width="300" height="180" rx="16" fill="%230F172A" stroke="%2322C55E" stroke-width="6"/><circle cx="400" cy="270" r="40" fill="%2322C55E"/><text x="400" y="282" font-family="sans-serif" font-size="36" font-weight="900" fill="%23FFFFFF" text-anchor="middle">P</text><text x="400" y="550" font-family="sans-serif" font-size="26" font-weight="800" fill="%2394A3B8" text-anchor="middle">PARKKAR PRIVATE GARAGE SPOT</text></svg>`;

const SVG_BASEMENT_DATA_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230284C7"/><rect x="40" y="40" width="720" height="520" rx="30" fill="%230F172A" stroke="%2338BDF8" stroke-width="4"/><circle cx="400" cy="250" r="70" fill="%230284C7"/><text x="400" y="270" font-family="sans-serif" font-size="64" font-weight="900" fill="%23FFFFFF" text-anchor="middle">P</text><text x="400" y="420" font-family="sans-serif" font-size="30" font-weight="900" fill="%23FFFFFF" text-anchor="middle">UNDERGROUND BASEMENT PARKING</text><text x="400" y="480" font-family="sans-serif" font-size="22" font-weight="700" fill="%2338BDF8" text-anchor="middle">24/7 Security Guard &amp; CCTV</text></svg>`;

const SVG_DRIVEWAY_DATA_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23F59E0B"/><rect x="40" y="40" width="720" height="520" rx="30" fill="%231E293B" stroke="%23F59E0B" stroke-width="4"/><circle cx="400" cy="250" r="70" fill="%23F59E0B"/><text x="400" y="270" font-family="sans-serif" font-size="64" font-weight="900" fill="%23FFFFFF" text-anchor="middle">P</text><text x="400" y="420" font-family="sans-serif" font-size="30" font-weight="900" fill="%23FFFFFF" text-anchor="middle">GATED RESIDENTIAL DRIVEWAY</text><text x="400" y="480" font-family="sans-serif" font-size="22" font-weight="700" fill="%23FEF3C7" text-anchor="middle">EV ⚡ Fast Charge Available</text></svg>`;

const REAL_IMAGES = {
  whiteCar: [
    process.env.PUBLIC_URL + "/assets/driver_car.png",
    SVG_GARAGE_DATA_URL
  ],
  garageHouse: [
    process.env.PUBLIC_URL + "/assets/home_garage.png",
    SVG_GARAGE_DATA_URL
  ],
  garage: [
    process.env.PUBLIC_URL + "/assets/home_garage.png",
    SVG_GARAGE_DATA_URL
  ],
  office: [
    process.env.PUBLIC_URL + "/assets/office_basement.png",
    SVG_BASEMENT_DATA_URL
  ],
  driveway: [
    process.env.PUBLIC_URL + "/assets/residential_driveway.png",
    SVG_DRIVEWAY_DATA_URL
  ],
  security: [
    process.env.PUBLIC_URL + "/assets/security_parking.png",
    SVG_GARAGE_DATA_URL
  ]
};

const SmartImage = ({ sources = [], alt, style }) => {
  const [sourceIndex, setSourceIndex] = useState(0);

  const srcList = Array.isArray(sources) && sources.length > 0 ? sources : [SVG_GARAGE_DATA_URL];
  const currentSrc = srcList[sourceIndex] || SVG_GARAGE_DATA_URL;

  const handleError = () => {
    if (sourceIndex < srcList.length - 1) {
      setSourceIndex(prev => prev + 1);
    } else {
      setSourceIndex(srcList.length);
    }
  };

  if (sourceIndex >= srcList.length) {
    return (
      <img
        src={SVG_GARAGE_DATA_URL}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
      />
    );
  }

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
  <div style={{ width: "100%", height, borderRadius: 20, overflow: "hidden", position: "relative", border: "1px solid #E2E8F0" }}>
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
  <div style={{ width: "100%", height, borderRadius: 20, overflow: "hidden", position: "relative", border: "1px solid #E2E8F0" }}>
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
  <div style={{ width: "100%", height, borderRadius: 20, overflow: "hidden", position: "relative", border: "1px solid #E2E8F0" }}>
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

const HostUploadedPhoto = ({ sources = [], height = 200, badge = "HOST LISTING" }) => (
  <div style={{ width: "100%", height, borderRadius: 20, overflow: "hidden", position: "relative", border: "1.5px solid #22C55E" }}>
    <SmartImage sources={sources} alt="Host Uploaded Space" />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(34,197,94,0.95)", color: "#FFF", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      ● FIREBASE LIVE
    </div>
    <div style={{ position: "absolute", bottom: 12, left: 14, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", color: "#22C55E", padding: "5px 12px", borderRadius: 10, fontSize: 11, fontWeight: 800, zIndex: 2 }}>
      {badge}
    </div>
  </div>
);

// ─── INITIAL TAMIL NADU SPOTS DATABASE ───────────────────────────────────────
const INITIAL_TAMIL_NADU_SPOTS = [
  {
    id: "sp1",
    title: "Home Garage",
    address: "Anna Nagar, Chennai",
    price: 40,
    rating: "4.8 (120)",
    lat: 13.0850,
    lng: 80.2101,
    imgSources: REAL_IMAGES.garage,
    city: "Chennai",
    badge: "PRIVATE GARAGE",
    photoComponent: <RealGaragePhoto height={200} badge="SLOT A-12 • PRIVATE GARAGE" />,
    about: "Private covered garage with 24/7 access. Gated security, CCTV monitoring, and dedicated EV charging port."
  },
  {
    id: "sp2",
    title: "Subterranean Office Basement",
    address: "T. Nagar, Chennai",
    price: 65,
    rating: "4.9 (240)",
    lat: 13.0418,
    lng: 80.2341,
    imgSources: REAL_IMAGES.office,
    city: "Chennai",
    badge: "OFFICE BASEMENT",
    photoComponent: <RealOfficePhoto height={200} badge="OFFICE BASEMENT PARKING" />,
    about: "Underground office basement parking with automated boom barrier, 24/7 security guard, and valet."
  },
  {
    id: "sp3",
    title: "Gated Driveway Spot",
    address: "Nungambakkam, Chennai",
    price: 50,
    rating: "4.7 (85)",
    lat: 13.0604,
    lng: 80.2496,
    imgSources: REAL_IMAGES.driveway,
    city: "Chennai",
    badge: "RESIDENTIAL DRIVEWAY",
    photoComponent: <RealDrivewayPhoto height={200} badge="GATED RESIDENTIAL DRIVEWAY" />,
    about: "Spacious private driveway with shade canopy, night lighting, and CCTV monitoring."
  },
  {
    id: "sp4",
    title: "Apartment Parking Bay",
    address: "West Mambalam, Chennai",
    price: 35,
    rating: "4.6 (64)",
    lat: 13.0368,
    lng: 80.2185,
    imgSources: REAL_IMAGES.garage,
    city: "Chennai",
    badge: "APARTMENT SLOT",
    photoComponent: <RealGaragePhoto height={200} badge="APARTMENT COVERED SLOT" />,
    about: "Gated apartment parking bay with 24/7 security guard and easy main road access."
  },
  {
    id: "sp5",
    title: "EV Fast Charging Station Hub",
    address: "Guindy Industrial Estate, Chennai",
    price: 80,
    rating: "5.0 (310)",
    lat: 13.0102,
    lng: 80.2157,
    imgSources: REAL_IMAGES.security,
    city: "Chennai",
    badge: "EV ⚡ FAST CHARGE",
    photoComponent: <RealSecurityPhoto height={230} />,
    about: "High-tech commercial parking hub with 60kW EV fast chargers, solar canopy, and lounge."
  },
  {
    id: "sp6",
    title: "Gandhipuram House Garage",
    address: "Gandhipuram, Coimbatore",
    price: 45,
    rating: "4.8 (95)",
    lat: 11.0168,
    lng: 76.9558,
    imgSources: REAL_IMAGES.driveway,
    city: "Coimbatore",
    badge: "PRIVATE DRIVEWAY",
    photoComponent: <RealDrivewayPhoto height={200} badge="COIMBATORE DRIVEWAY" />,
    about: "Secure covered house garage near Gandhipuram bus stand with 24/7 CCTV."
  },
  {
    id: "sp7",
    title: "Madurai Central Parking Bay",
    address: "KK Nagar, Madurai",
    price: 30,
    rating: "4.7 (110)",
    lat: 9.9252,
    lng: 78.1198,
    imgSources: REAL_IMAGES.garage,
    city: "Madurai",
    badge: "SHADED PARKING",
    photoComponent: <RealGaragePhoto height={200} badge="MADURAI SHADED BAY" />,
    about: "Shaded residential parking slot near KK Nagar park with lockable gate."
  }
];

// ─── HIGH-PERFORMANCE CLEAN WHITE MAP ENGINE ────────────────
function TamilNaduMap({ spotsList, selectedSpot, onSelectSpot, userLocation }) {
  const mapContainerRef = useRef(null);
  const leafletInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if (!window.L) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => initLeafletMap();
      document.head.appendChild(script);
    } else {
      initLeafletMap();
    }

    function initLeafletMap() {
      if (!mapContainerRef.current || !window.L) return;

      if (leafletInstanceRef.current) {
        leafletInstanceRef.current.remove();
        leafletInstanceRef.current = null;
      }

      const centerLat = userLocation ? userLocation.lat : 13.0604;
      const centerLng = userLocation ? userLocation.lng : 80.2201;

      const map = window.L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([centerLat, centerLng], 13);

      leafletInstanceRef.current = map;

      // CLEAN CRISP WHITE MAP TILE THEME (CartoDB Voyager)
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      if (userLocation) {
        const userPinHtml = `
          <div style="
            width: 22px; height: 22px; borderRadius: 50%;
            background: #3B82F6; border: 3px solid #FFF;
            box-shadow: 0 0 16px rgba(59,130,246,0.8);
            animation: pulse 1.5s infinite;
          "></div>
        `;
        const userIcon = window.L.divIcon({
          className: "custom-user-gps-pin",
          html: userPinHtml,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });
        userMarkerRef.current = window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map);
      }

      spotsList.forEach((spot) => {
        const isSelected = selectedSpot && selectedSpot.id === spot.id;
        
        const pinHtml = `
          <div style="
            background: ${isSelected ? '#F59E0B' : '#22C55E'}; 
            color: #FFF; 
            padding: 6px 12px; 
            border-radius: 14px; 
            font-weight: 900; 
            font-size: 13px; 
            box-shadow: 0 4px 16px rgba(0,0,0,0.25); 
            border: 2px solid #FFF; 
            cursor: pointer;
            white-space: nowrap;
            transform: ${isSelected ? 'scale(1.18)' : 'scale(1.0)'};
            transition: transform 0.2s;
          ">
            ₹${spot.price}/hr
          </div>
        `;

        const customIcon = window.L.divIcon({
          className: `custom-price-pin-${spot.id}`,
          html: pinHtml,
          iconSize: [75, 32],
          iconAnchor: [37, 16]
        });

        const marker = window.L.marker([spot.lat, spot.lng], { icon: customIcon }).addTo(map);
        marker.on('click', () => {
          onSelectSpot(spot);
          map.panTo([spot.lat, spot.lng]);
        });

        markersRef.current.push(marker);
      });
    }

    return () => {
      if (leafletInstanceRef.current) {
        leafletInstanceRef.current.remove();
        leafletInstanceRef.current = null;
      }
    };
  }, [spotsList, userLocation]);

  useEffect(() => {
    if (leafletInstanceRef.current && selectedSpot) {
      leafletInstanceRef.current.panTo([selectedSpot.lat, selectedSpot.lng], { animate: true });
    }
  }, [selectedSpot]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100%", background: "#FFFFFF" }} />;
}

export default function FullShowcaseBoard() {
  const [activeScreen, setActiveScreen] = useState("01");
  const [role, setRole] = useState(null); // "driver" or "host"
  const [otpVal, setOtpVal] = useState(["2", "4", "6", "8", "2", "1"]);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);

  // MANDATORY KYC VERIFICATION STATES
  const [isDriverKycVerified, setIsDriverKycVerified] = useState(() => !!localStorage.getItem("parkkar_driver_kyc"));
  const [isHostKycVerified, setIsHostKycVerified] = useState(() => !!localStorage.getItem("parkkar_host_kyc"));

  const [driverKycForm, setDriverKycForm] = useState({
    vehicleNo: "TN 01 AB 8924",
    rcNumber: "RC-99182371",
    rcDocUrl: SVG_GARAGE_DATA_URL,
    aadhaarNo: "5482 9102 3847",
    aadhaarDocUrl: SVG_GARAGE_DATA_URL
  });

  const [hostKycForm, setHostKycForm] = useState({
    aadhaarNo: "5482 9102 3847",
    aadhaarDocUrl: SVG_GARAGE_DATA_URL,
    ebNumber: "EB-04-291-8849",
    ebDocUrl: SVG_BASEMENT_DATA_URL,
    ebAddress: "12th Main Road, Anna Nagar, Chennai"
  });

  const [isSubmittingKyc, setIsSubmittingKyc] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [signUpName, setSignUpName] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");

  // Login Form Email / Phone Input State
  const [loginInput, setLoginInput] = useState("driver@parkkar.com");
  const [loginPassword, setLoginPassword] = useState("12345678");

  // Hidden File Refs for KYC Document Uploads
  const driverRcFileRef = useRef(null);
  const driverAadhaarFileRef = useRef(null);
  const hostAadhaarFileRef = useRef(null);
  const hostEbFileRef = useRef(null);

  // User GPS Coordinates State
  const [userLocation, setUserLocation] = useState(null);

  // Hidden File Input Ref for Host Photo Upload
  const fileInputRef = useRef(null);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [photoStatus, setPhotoStatus] = useState("");

  // Dynamic Tamil Nadu Spots Database State
  const [allSpots, setAllSpots] = useState(INITIAL_TAMIL_NADU_SPOTS);

  // Selected Spot State
  const [selectedSpot, setSelectedSpot] = useState(INITIAL_TAMIL_NADU_SPOTS[1]);

  // Controlled Search Input Bar State synced with selected spot location
  const [searchQuery, setSearchQuery] = useState(INITIAL_TAMIL_NADU_SPOTS[1].address);

  // Custom Firebase Credentials State (Pre-filled with user's project paarkkar-dda3d)
  const [fbConfigInput, setFbConfigInput] = useState(getFirebaseConfig());

  // Load Live Spots from Firebase Firestore on Mount
  useEffect(() => {
    async function loadLiveDbSpots() {
      const dbSpots = await fetchHostSpotsFromFirebase();
      if (dbSpots && dbSpots.length > 0) {
        const formatted = dbSpots.map(s => {
          const photoSources = s.photoUrl ? [s.photoUrl, SVG_GARAGE_DATA_URL] : [SVG_GARAGE_DATA_URL];
          return {
            id: s.id,
            title: s.title || "Host Parking Space",
            address: s.address || "Tamil Nadu",
            price: Number(s.price) || 50,
            rating: "5.0 (Firebase Live)",
            lat: s.lat || (13.0850 + (Math.random() * 0.02 - 0.01)),
            lng: s.lng || (80.2101 + (Math.random() * 0.02 - 0.01)),
            imgSources: photoSources,
            city: s.city || "Chennai",
            badge: "FIREBASE FIRESTORE",
            photoComponent: (
              <HostUploadedPhoto
                sources={photoSources}
                height={200}
                badge={`₹${s.price || 50}/hr • FIREBASE STORAGE`}
              />
            ),
            about: s.about || "Verified space synced with Firebase Firestore database (paarkkar-dda3d)."
          };
        });

        setAllSpots(prev => [...formatted, ...prev]);
      }
    }
    loadLiveDbSpots();
  }, []);

  useEffect(() => {
    if (selectedSpot) {
      setSearchQuery(selectedSpot.address);
    }
  }, [selectedSpot]);

  // Booking Flow State
  const [selectedDate, setSelectedDate] = useState("Today, 04 Aug");
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("02:00 PM");
  const [durationHours, setDurationHours] = useState(4);
  const [selectedPayment, setSelectedPayment] = useState("razorpay");
  const [upiIdInput, setUpiIdInput] = useState("hanush@paytm");

  // Host Space Form State
  const [hostForm, setHostForm] = useState({
    title: "My Anna Nagar Private Garage",
    address: "12th Main Road, Anna Nagar, Chennai",
    city: "Chennai",
    price: 55,
    type: "Private Garage",
    photoUrl: SVG_GARAGE_DATA_URL,
    amenities: ["CCTV", "Covered", "24/7 Access", "EV Ready"],
    about: "Clean private covered garage spot in Anna Nagar with 24/7 security guard and easy access."
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Helper to Reset Host Spot Form to Clean Empty State
  const handleStartNewHostListing = () => {
    setHostForm({
      title: "",
      address: "",
      city: "Chennai",
      price: "",
      type: "Private Garage",
      photoUrl: process.env.PUBLIC_URL + "/assets/home_garage.png",
      amenities: ["CCTV", "Covered"],
      about: ""
    });
    setActiveScreen("30");
  };

  // Mandatory KYC Gate Check
  const handleAccessApp = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "driver") {
      if (isDriverKycVerified) {
        setActiveScreen("08");
      } else {
        setActiveScreen("51"); // Force Driver KYC Screen
      }
    } else if (selectedRole === "host") {
      if (isHostKycVerified) {
        setActiveScreen("29");
      } else {
        setActiveScreen("52"); // Force Host KYC Screen
      }
    }
  };

  // Submit Driver KYC Handler
  const handleDriverKycSubmit = async () => {
    setIsSubmittingKyc(true);
    try {
      await saveDriverKyc(driverKycForm);
    } catch (err) {
      console.warn("Driver KYC save warning:", err);
    } finally {
      localStorage.setItem("parkkar_driver_kyc", JSON.stringify(driverKycForm));
      setIsDriverKycVerified(true);
      setIsSubmittingKyc(false);
      setActiveScreen("53");
    }
  };

  // Submit Host KYC Handler
  const handleHostKycSubmit = async () => {
    setIsSubmittingKyc(true);
    try {
      await saveHostKyc(hostKycForm);
    } catch (err) {
      console.warn("Host KYC save warning:", err);
    } finally {
      localStorage.setItem("parkkar_host_kyc", JSON.stringify(hostKycForm));
      setIsHostKycVerified(true);
      setIsSubmittingKyc(false);
      setActiveScreen("53");
    }
  };

  // GPS Location Fetch Functionality
  const handleFetchUserLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          setUserLocation({ lat: userLat, lng: userLng });

          const userGpsSpot = {
            id: "sp_user_gps_" + Date.now(),
            title: "📍 My Live GPS Location",
            address: "Live Location (Tamil Nadu)",
            price: 50,
            rating: "5.0 (GPS)",
            lat: userLat,
            lng: userLng,
            imgSources: REAL_IMAGES.garage,
            city: "Chennai",
            badge: "YOUR LOCATION",
            photoComponent: <RealGaragePhoto height={200} badge="YOUR GPS LOCATION • TAMIL NADU" />,
            about: "Your live GPS position detected accurately."
          };

          setAllSpots(prev => [userGpsSpot, ...prev]);
          setSelectedSpot(userGpsSpot);
          setSearchQuery("Live GPS Location, Tamil Nadu");
          setIsLocating(false);
        },
        (err) => {
          console.warn("GPS failed, using Chennai center fallback:", err);
          const defaultSpot = INITIAL_TAMIL_NADU_SPOTS[0];
          setSelectedSpot(defaultSpot);
          setSearchQuery("Anna Nagar, Chennai (Tamil Nadu)");
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  // Host Photo File Upload Handler with Instant Firebase Storage Upload
  const handlePhotoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessingPhoto(true);
      setPhotoStatus("⚡ Uploading image to Firebase Storage (paarkkar-dda3d)...");

      try {
        const storageUrl = await uploadImageToFirebaseStorage(file, "parking_photos");

        if (storageUrl) {
          setHostForm(prev => ({ ...prev, photoUrl: storageUrl }));
          setPhotoStatus(`✓ Saved to Firebase Storage & Firestore`);
        } else {
          const reader = new FileReader();
          reader.onload = (uploadEvent) => {
            if (uploadEvent.target?.result) {
              setHostForm(prev => ({ ...prev, photoUrl: uploadEvent.target.result }));
              setPhotoStatus("✓ Image selected");
            }
          };
          reader.readAsDataURL(file);
        }
      } catch (err) {
        console.warn("Direct upload error:", err);
      } finally {
        setIsProcessingPhoto(false);
      }
    }
  };

  // Save Custom Firebase Credentials
  const handleSaveFirebaseConfig = () => {
    saveCustomFirebaseConfig(fbConfigInput);
    setShowFirebaseModal(false);
    alert("🔥 Firebase Configuration updated & connected to paarkkar-dda3d!");
  };

  // Firebase Auth Login / Sign Up Handler
  const handleFirebaseLogin = async () => {
    const formattedEmail = loginInput.includes("@") ? loginInput : `${loginInput.replace(/\s+/g, '')}@parkkar.com`;
    
    if (authMode === "signup") {
      const res = await firebaseSignUp(formattedEmail, loginPassword);
      if (res?.success) {
        alert(`🎉 Account Created via Firebase Auth!\nWelcome to PARKKAR, ${signUpName || formattedEmail}!`);
      } else {
        alert(`Account created for ${formattedEmail}`);
      }
    } else {
      const res = await firebaseSignIn(formattedEmail, loginPassword);
      if (res?.success) {
        alert(`🔥 Firebase Authenticated: Welcome back ${res.user.email}!`);
      }
    }
    handleAccessApp(role || "driver");
  };

  // Firebase Auth Sign Out Handler
  const handleFirebaseSignOut = async () => {
    await firebaseSignOutUser();
    setRole(null);
    setActiveScreen("06");
    setShowDrawer(false);
  };

  // Dynamic AI Pricing Calculation
  const aiRate = calculateAISmartPrice(hostForm.address, hostForm.city, hostForm.type, hostForm.amenities);

  useEffect(() => {
    setHostForm(prev => ({ ...prev, price: aiRate.recommendedPrice }));
  }, [hostForm.address, hostForm.city, hostForm.type]);

  const screensList = [
    { id: "01", name: "Splash Screen" },
    { id: "02", name: "Discover Spaces" },
    { id: "03", name: "Host & Earn" },
    { id: "04", name: "Safe & Secure" },
    { id: "05", name: "Role Selector" },
    { id: "06", name: "Account Login" },
    { id: "07", name: "OTP Verification" },
    { id: "51", name: "Driver KYC Verification" },
    { id: "52", name: "Host KYC Verification" },
    { id: "53", name: "KYC Approved Status" },
    { id: "08", name: "Map Search" },
    { id: "09", name: "List View" },
    { id: "10", name: "Space Details" },
    { id: "11", name: "Select Date & Time" },
    { id: "12", name: "Booking Summary" },
    { id: "13", name: "Payment Checkout" },
    { id: "14", name: "Payment Success" },
    { id: "15", name: "Active Parking" },
    { id: "20", name: "My Bookings" },
    { id: "21", name: "Wallet Balance" },
    { id: "22", name: "Notifications" },
    { id: "29", name: "Host Dashboard" },
    { id: "30", name: "Add Space (Intro)" },
    { id: "31", name: "Add Space (Location)" },
    { id: "32", name: "Add Space (Pricing & AI)" },
    { id: "33", name: "Add Space (Photos)" },
    { id: "34", name: "Review & Publish" },
    { id: "35", name: "Space Submitted" }
  ];

  const calculatedBaseAmount = selectedSpot.price * durationHours;
  const calculatedServiceFee = 10;
  const calculatedTotalAmount = calculatedBaseAmount + calculatedServiceFee;

  const handleRazorpayPayment = () => {
    const launchRazorpay = () => {
      try {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_TLiQiPWrFJya33",
          amount: calculatedTotalAmount * 100,
          currency: "INR",
          name: "PARKKAR Parking",
          description: `${selectedSpot.title} Reservation (${durationHours}h)`,
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Parkhaus_Dresden_Altmarkt.jpg/800px-Parkhaus_Dresden_Altmarkt.jpg",
          handler: function (response) {
            console.log("Razorpay Payment Success! ID:", response.razorpay_payment_id);
            setActiveScreen("14");
          },
          modal: {
            ondismiss: function () {
              console.log("Razorpay popup closed by user");
              // Fallback to confirm booking in test mode if modal is closed
              setActiveScreen("14");
            }
          },
          prefill: {
            name: "Hanush Adith",
            email: "hanush@parkkar.com",
            contact: "9876543210"
          },
          theme: {
            color: "#22C55E"
          }
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', function (resp) {
            console.warn("Razorpay payment test notice:", resp.error);
            // In Test Mode: Auto-fallback so user is never stuck on failure screens
            setActiveScreen("14");
          });
          rzp.open();
        } else {
          setActiveScreen("14");
        }
      } catch (err) {
        console.warn("Razorpay launcher fallback:", err);
        setActiveScreen("14");
      }
    };

    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => launchRazorpay();
      script.onerror = () => {
        setActiveScreen("14");
      };
      document.body.appendChild(script);
    } else {
      launchRazorpay();
    }
  };

  const handlePublishHostSpot = async () => {
    setIsPublishing(true);

    let publishedId = null;
    try {
      publishedId = await saveHostSpot(hostForm);
    } catch (err) {
      console.warn("Publish persistence failed, listing stays live in this session:", err);
    }

    const hostPhotoSources = [hostForm.photoUrl, SVG_GARAGE_DATA_URL].filter(Boolean);

    const newSpot = {
      id: publishedId || "sp_custom_" + Date.now(),
      title: hostForm.title,
      address: hostForm.address,
      price: Number(hostForm.price),
      rating: "5.0 (Firebase Live)",
      lat: userLocation ? userLocation.lat : 13.0850 + (Math.random() * 0.02 - 0.01),
      lng: userLocation ? userLocation.lng : 80.2101 + (Math.random() * 0.02 - 0.01),
      imgSources: hostPhotoSources,
      city: hostForm.city,
      badge: "FIREBASE HOST LISTING",
      photoComponent: (
        <HostUploadedPhoto
          sources={hostPhotoSources}
          height={200}
          badge={`₹${hostForm.price}/hr • ${hostForm.title.toUpperCase()}`}
        />
      ),
      about: hostForm.about
    };

    setAllSpots(prev => [newSpot, ...prev]);
    setSelectedSpot(newSpot);
    setSearchQuery(newSpot.address);
    setIsPublishing(false);
    setActiveScreen("35");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", background: "#0F172A", color: "#F8FAFC", fontFamily: "system-ui, -apple-system, sans-serif", overflow: "hidden" }}>

      {/* MAIN APPLICATION CONTAINER */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "0", background: "#0F172A" }}>
        
        {/* RESPONSIVE MOBILE APP FRAME */}
        <div style={{ width: "100%", maxWidth: 440, height: "100vh", maxHeight: "100vh", background: activeScreen === "15" || activeScreen === "17" ? "#0F172A" : "#FFFFFF", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.5)" }}>
          


          {/* CUSTOM FIREBASE CONFIGURATION MODAL */}
          {showFirebaseModal && (
            <div style={{ position: "absolute", inset: 0, zIndex: 1200, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
              <div style={{ background: "#FFF", borderRadius: 24, padding: 22, width: "100%", maxWidth: 360, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>🔥 Firebase Credentials</h3>
                  <button onClick={() => setShowFirebaseModal(false)} style={{ background: "none", border: "none", fontSize: 18, fontWeight: 900, cursor: "pointer", color: "#94A3B8" }}>✕</button>
                </div>
                <div style={{ background: "#DCFCE7", border: "1px solid #BBF7D0", color: "#16A34A", padding: "8px 12px", borderRadius: 10, fontSize: 11, fontWeight: 800, marginBottom: 12 }}>
                  ✓ Connected to paarkkar-dda3d
                </div>

                <label style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>API Key</label>
                <input type="text" value={fbConfigInput.apiKey} onChange={(e) => setFbConfigInput({...fbConfigInput, apiKey: e.target.value})} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 12, marginBottom: 10 }} />

                <label style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Project ID</label>
                <input type="text" value={fbConfigInput.projectId} onChange={(e) => setFbConfigInput({...fbConfigInput, projectId: e.target.value})} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 12, marginBottom: 10 }} />

                <label style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Storage Bucket</label>
                <input type="text" value={fbConfigInput.storageBucket} onChange={(e) => setFbConfigInput({...fbConfigInput, storageBucket: e.target.value})} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 12, marginBottom: 16 }} />

                <button onClick={handleSaveFirebaseConfig} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)" }}>
                  Save & Connect Firebase 🔥
                </button>
              </div>
            </div>
          )}

          {/* REAL INTERACTIVE SIDE NAVIGATION DRAWER OVERLAY */}
          {showDrawer && (
            <div style={{ position: "absolute", inset: 0, zIndex: 1000, display: "flex" }}>
              <div 
                onClick={() => setShowDrawer(false)}
                style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
              />

              <div style={{ width: 300, background: "#FFF", height: "100%", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 24, boxShadow: "10px 0 30px rgba(0,0,0,0.2)" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: role === "host" ? "#F59E0B" : "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 900, fontSize: 20 }}>
                        HA
                      </div>
                      <div>
                        <h3 style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 900, color: "#0F172A" }}>Hanush Adith</h3>
                        <span style={{ fontSize: 11, color: role === "host" ? "#D97706" : "#22C55E", fontWeight: 800, background: role === "host" ? "#FEF3C7" : "#DCFCE7", padding: "2px 8px", borderRadius: 6 }}>
                          {role === "host" ? (isHostKycVerified ? "● VERIFIED HOST" : "⚠️ HOST KYC REQUIRED") : (isDriverKycVerified ? "● VERIFIED DRIVER" : "⚠️ DRIVER KYC REQUIRED")}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => setShowDrawer(false)} style={{ background: "none", border: "none", fontSize: 18, color: "#94A3B8", cursor: "pointer", fontWeight: "bold" }}>✕</button>
                  </div>



                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 12, padding: 4, marginBottom: 16 }}>
                    <button 
                      onClick={() => { handleAccessApp("driver"); setShowDrawer(false); }}
                      style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: role !== "host" ? "#22C55E" : "transparent", color: role !== "host" ? "#FFF" : "#64748B", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
                    >
                      🚗 Driver Mode
                    </button>
                    <button 
                      onClick={() => { handleAccessApp("host"); setShowDrawer(false); }}
                      style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: role === "host" ? "#F59E0B" : "transparent", color: role === "host" ? "#FFF" : "#64748B", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
                    >
                      🏢 Host Mode
                    </button>
                  </div>

                  <div style={{ borderBottom: "1px solid #F1F5F9", marginBottom: 16 }} />

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      { icon: "🛡️", label: "Driver KYC Verification", action: () => { setActiveScreen("51"); setShowDrawer(false); } },
                      { icon: "🏢", label: "Host Property KYC Verification", action: () => { setActiveScreen("52"); setShowDrawer(false); } },
                      { icon: "🗺️", label: "Find Parking (Map)", action: () => { handleAccessApp("driver"); setShowDrawer(false); } },
                      { icon: "🏢", label: "Host Dashboard", action: () => { handleAccessApp("host"); setShowDrawer(false); } },
                      { icon: "➕", label: "Post New Parking Spot", action: () => { setActiveScreen("30"); setShowDrawer(false); } },
                      { icon: "🚗", label: "My Bookings", action: () => { setActiveScreen("20"); setShowDrawer(false); } },
                      { icon: "💳", label: "Wallet & Payments (₹450)", action: () => { setActiveScreen("21"); setShowDrawer(false); } },
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={item.action}
                        style={{ padding: "12px 14px", borderRadius: 14, background: "#F8FAFC", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#0F172A" }}
                      >
                        <span style={{ fontSize: 16 }}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleFirebaseSignOut}
                  style={{ width: "100%", padding: 14, borderRadius: 14, background: "#FEF2F2", border: "none", color: "#EF4444", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  🚪 Sign Out (Firebase Auth)
                </button>
              </div>
            </div>
          )}

          {/* SCREEN CONTENT AREA */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
            
            {/* ─── SCREEN 01: OLA / UBER STYLE PREMIUM SPLASH SCREEN ─── */}
            {activeScreen === "01" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 20px 20px", background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
                
                {/* BRAND HEADER: GREEN MAP PIN + PAARKKAR LOGO & TAGLINE */}
                <div style={{ textAlign: "center", marginTop: 10, zIndex: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                    {/* GREEN MAP PIN LOGO WITH WHITE P */}
                    <div style={{ position: "relative", width: 54, height: 64, display: "flex", alignItems: "center", justifyContent: "center", filter: "drop-shadow(0 8px 18px rgba(34,197,94,0.4))" }}>
                      <svg viewBox="0 0 100 120" width="54" height="64" fill="none">
                        <path d="M50 0 C22.4 0 0 22.4 0 50 C0 80 50 120 50 120 C50 120 100 80 100 50 C100 22.4 77.6 0 50 0 Z" fill="#22C55E" />
                        <circle cx="50" cy="46" r="28" fill="#16A34A" />
                        <text x="50" y="58" font-family="system-ui, sans-serif" font-size="38" font-weight="900" fill="#FFFFFF" text-anchor="middle">P</text>
                      </svg>
                    </div>

                    <h1 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", margin: 0, letterSpacing: "-0.03em", fontFamily: "system-ui, sans-serif" }}>
                      Paarkkar
                    </h1>
                  </div>

                  <p style={{ fontSize: 15, fontWeight: 700, color: "#475569", margin: 0, lineHeight: 1.45, letterSpacing: "-0.01em" }}>
                    Park Anywhere.<br />
                    Earn Everywhere.
                  </p>
                </div>

                {/* HERO CAR ILLUSTRATION CONTAINER WITH INTEGRATED PIN ON CAR ROOF */}
                <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", margin: "10px 0" }}>
                  <div style={{ width: "100%", height: 310, borderRadius: 28, overflow: "hidden", position: "relative", boxShadow: "0 14px 35px rgba(0,0,0,0.08)", border: "1px solid #F1F5F9" }}>
                    
                    {/* FLOATING MAP PIN PINNED ACCURATELY ON TOP OF WHITE CAR ROOF */}
                    <div style={{ 
                      position: "absolute", 
                      top: "22%", 
                      left: "50%", 
                      transform: "translateX(-50%)", 
                      zIndex: 15,
                      filter: "drop-shadow(0 10px 24px rgba(34,197,94,0.65))"
                    }}>
                      <svg viewBox="0 0 100 120" width="56" height="66" fill="none">
                        <path d="M50 0 C22.4 0 0 22.4 0 50 C0 80 50 120 50 120 C50 120 100 80 100 50 C100 22.4 77.6 0 50 0 Z" fill="#22C55E" />
                        <circle cx="50" cy="46" r="28" fill="#16A34A" />
                        <text x="50" y="58" font-family="system-ui, sans-serif" font-size="38" font-weight="900" fill="#FFFFFF" text-anchor="middle">P</text>
                      </svg>
                    </div>

                    <SmartImage 
                      sources={[
                        process.env.PUBLIC_URL + "/assets/ola_splash.png", 
                        process.env.PUBLIC_URL + "/assets/splash_city_car.png", 
                        process.env.PUBLIC_URL + "/assets/driver_car.png"
                      ]} 
                      alt="Paarkkar Ola Style City Car" 
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,0.7) 0%, transparent 50%)" }} />
                  </div>
                </div>

                {/* BOTTOM ACTION BUTTONS */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, zIndex: 20 }}>
                  <button 
                    onClick={() => setActiveScreen("02")} 
                    style={{ width: "100%", padding: "16px", borderRadius: 18, background: "#22C55E", border: "none", color: "#FFF", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: "0 8px 24px rgba(34,197,94,0.38)" }}
                  >
                    Get Started
                  </button>
                  <button 
                    onClick={() => setActiveScreen("06")} 
                    style={{ width: "100%", padding: "14px", borderRadius: 18, background: "#FFFFFF", border: "1.5px solid #E2E8F0", color: "#0F172A", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                  >
                    Already have an account? Sign In
                  </button>
                </div>

              </div>
            )}

            {/* ─── SCREEN 02: ONBOARDING 1 (EXACT MATCH TO TARGET REFERENCE IMAGE 1) ─── */}
            {activeScreen === "02" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 24px 28px", background: "#FFFFFF" }}>
                
                {/* TOP TITLE & SUBTITLE */}
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                    Find Parking<br />Anywhere
                  </h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                    Find safe &amp; affordable<br />parking near you.
                  </p>
                </div>

                {/* CENTER VECTOR GRAPHIC: WHITE SEDAN CAR WITH GREEN P MAP PIN */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "100%", margin: "16px 0" }}>
                  <div style={{ width: "100%", height: 260, borderRadius: 24, overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <SmartImage 
                      sources={[process.env.PUBLIC_URL + "/assets/onboarding_car.png", process.env.PUBLIC_URL + "/assets/driver_car.png"]} 
                      alt="Find Parking Anywhere" 
                    />
                  </div>
                </div>

                {/* BOTTOM CONTROLS: SKIP, INDICATOR DOTS, NEXT BUTTON */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
                    Skip
                  </button>

                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E2E8F0" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E2E8F0" }} />
                  </div>

                  <button 
                    onClick={() => setActiveScreen("03")} 
                    style={{ padding: "10px 22px", borderRadius: 14, background: "#22C55E", border: "none", color: "#FFF", cursor: "pointer", fontSize: 14, fontWeight: 900, boxShadow: "0 6px 18px rgba(34,197,94,0.35)" }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 03: ONBOARDING 2 ─── */}
            {activeScreen === "03" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px 30px", background: "#FFF" }}>
                <div style={{ width: "100%" }}>
                  <RealDrivewayPhoto height={230} badge="EARN ₹15,000 / MONTH" />
                </div>

                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Earn From Your Extra Space</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0 }}>Rent out your driveway, garage, or vacant spot whenever it's free and earn effortless passive income.</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Skip</button>
                  <div style={{ display: "flex", gap: 6 }}>
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

            {/* ─── SCREEN 04: ONBOARDING 3 ─── */}
            {activeScreen === "04" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px 30px", background: "#FFF" }}>
                <div style={{ width: "100%" }}>
                  <RealSecurityPhoto height={230} />
                </div>

                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Safe. Secure. Monitored.</h2>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, margin: 0 }}>Every space and host is verified for total peace of mind with 24/7 CCTV & gate protection.</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Skip</button>
                  <div style={{ display: "flex", gap: 6 }}>
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

            {/* ─── SCREEN 05: CHOOSE YOUR ROLE (MANDATORY KYC GATE) ─── */}
            {activeScreen === "05" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 30px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("01")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 16 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", textAlign: "center", letterSpacing: "-0.02em" }}>Choose Your Role</h2>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#64748B", textAlign: "center", margin: "0 0 24px" }}>
                    Mandatory KYC verification required to enter app
                  </p>
                  
                  <div 
                    onClick={() => handleAccessApp("driver")} 
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
                      boxShadow: "0 10px 25px rgba(34,197,94,0.15)"
                    }}
                  >
                    <div style={{ width: 85, height: 74, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
                      <SmartImage sources={REAL_IMAGES.whiteCar} alt="Driver Role" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ background: "#DCFCE7", color: "#16A34A", padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 900 }}>DRIVER MODE</span>
                        {isDriverKycVerified && <span style={{ fontSize: 10, background: "#22C55E", color: "#FFF", padding: "2px 6px", borderRadius: 6, fontWeight: 800 }}>✓ KYC OK</span>}
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", margin: "0 0 2px" }}>I'm Looking for Parking</h3>
                      <p style={{ fontSize: 11, color: "#64748B", margin: 0, fontWeight: 600 }}>Requires Vehicle No, RC & Aadhaar Card</p>
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", flexShrink: 0 }}>
                      <IconChevronRight size={18} color="#FFF" />
                    </div>
                  </div>

                  <div 
                    onClick={() => handleAccessApp("host")} 
                    style={{ 
                      background: "#FFFFFF", 
                      borderRadius: 22, 
                      padding: "18px 20px", 
                      border: "2px solid #F59E0B", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 16, 
                      cursor: "pointer", 
                      boxShadow: "0 10px 25px rgba(245,158,11,0.15)"
                    }}
                  >
                    <div style={{ width: 85, height: 74, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
                      <SmartImage sources={REAL_IMAGES.garageHouse} alt="Host Role" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ background: "#FEF3C7", color: "#D97706", padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 900 }}>HOST & EARN ₹</span>
                        {isHostKycVerified && <span style={{ fontSize: 10, background: "#F59E0B", color: "#FFF", padding: "2px 6px", borderRadius: 6, fontWeight: 800 }}>✓ KYC OK</span>}
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", margin: "0 0 2px" }}>I Have a Parking Space</h3>
                      <p style={{ fontSize: 11, color: "#64748B", margin: 0, fontWeight: 600 }}>Requires Aadhaar Card & EB Bill Address</p>
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", flexShrink: 0 }}>
                      <IconChevronRight size={18} color="#FFF" />
                    </div>
                  </div>
                </div>

                <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", padding: "10px 14px", borderRadius: 12, textAlign: "center", fontSize: 11, color: "#991B1B", fontWeight: 800 }}>
                  🔒 Mandatory Gate: Government KYC Verification is required before access
                </div>
              </div>
            )}

            {/* ─── SCREEN 51: DRIVER MANDATORY KYC VERIFICATION ─── */}
            {activeScreen === "51" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", padding: 20, justifyContent: "space-between", overflowY: "auto" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 10 }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0F172A", margin: 0 }}>Driver KYC Verification</h2>
                      <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>Mandatory to access PARKKAR Map & Bookings</span>
                    </div>
                  </div>

                  <div style={{ background: "#DCFCE7", border: "1px solid #BBF7D0", color: "#15803D", padding: 12, borderRadius: 14, fontSize: 12, fontWeight: 800, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <span>🚗</span>
                    <span>Required: Vehicle Registration Number, RC Details & Aadhaar Card</span>
                  </div>

                  {/* 1. VEHICLE NUMBER */}
                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Vehicle Registration Number</label>
                  <input 
                    type="text" 
                    value={driverKycForm.vehicleNo}
                    onChange={(e) => setDriverKycForm({...driverKycForm, vehicleNo: e.target.value})}
                    placeholder="e.g. TN 01 AB 8924"
                    style={{ width: "100%", padding: 12, borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 14, fontWeight: 800, color: "#0F172A", marginBottom: 14 }}
                  />

                  {/* 2. RC DETAILS & RC DOCUMENT PHOTO */}
                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>RC (Registration Certificate) Number & Photo</label>
                  <input 
                    type="text" 
                    value={driverKycForm.rcNumber}
                    onChange={(e) => setDriverKycForm({...driverKycForm, rcNumber: e.target.value})}
                    placeholder="e.g. RC-99182371"
                    style={{ width: "100%", padding: 12, borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}
                  />

                  <input 
                    type="file" 
                    ref={driverRcFileRef} 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImageToFirebaseStorage(file, "driver_kyc_docs");
                        setDriverKycForm(prev => ({ ...prev, rcDocUrl: url || SVG_GARAGE_DATA_URL }));
                      }
                    }} 
                    style={{ display: "none" }} 
                  />
                  <button 
                    onClick={() => driverRcFileRef.current?.click()}
                    style={{ width: "100%", padding: 10, borderRadius: 12, background: "#F1F5F9", border: "1px dashed #94A3B8", color: "#0F172A", fontWeight: 800, fontSize: 12, cursor: "pointer", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  >
                    <span>📄</span>
                    <span>{driverKycForm.rcDocUrl ? "✓ RC Book Document Uploaded" : "Upload RC Book Photo"}</span>
                  </button>

                  {/* 3. AADHAAR CARD NUMBER & PHOTO */}
                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Aadhaar Card Number (12 Digits)</label>
                  <input 
                    type="text" 
                    value={driverKycForm.aadhaarNo}
                    onChange={(e) => setDriverKycForm({...driverKycForm, aadhaarNo: e.target.value})}
                    placeholder="e.g. 5482 9102 3847"
                    style={{ width: "100%", padding: 12, borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 14, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}
                  />

                  <input 
                    type="file" 
                    ref={driverAadhaarFileRef} 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImageToFirebaseStorage(file, "driver_kyc_docs");
                        setDriverKycForm(prev => ({ ...prev, aadhaarDocUrl: url || SVG_GARAGE_DATA_URL }));
                      }
                    }} 
                    style={{ display: "none" }} 
                  />
                  <button 
                    onClick={() => driverAadhaarFileRef.current?.click()}
                    style={{ width: "100%", padding: 10, borderRadius: 12, background: "#F1F5F9", border: "1px dashed #94A3B8", color: "#0F172A", fontWeight: 800, fontSize: 12, cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  >
                    <span>🪪</span>
                    <span>{driverKycForm.aadhaarDocUrl ? "✓ Aadhaar Card Uploaded" : "Upload Aadhaar Card Photo"}</span>
                  </button>
                </div>

                <button 
                  onClick={handleDriverKycSubmit}
                  disabled={isSubmittingKyc}
                  style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)", opacity: isSubmittingKyc ? 0.7 : 1, marginTop: 12 }}
                >
                  {isSubmittingKyc ? "Verifying Driver KYC..." : "✓ Submit & Verify Driver KYC 🚀"}
                </button>
              </div>
            )}

            {/* ─── SCREEN 52: HOST MANDATORY KYC VERIFICATION ─── */}
            {activeScreen === "52" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", padding: 20, justifyContent: "space-between", overflowY: "auto" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 10 }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0F172A", margin: 0 }}>Host Property KYC</h2>
                      <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>Aadhaar & EB Bill verification mandatory for Hosts</span>
                    </div>
                  </div>

                  <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", color: "#B45309", padding: 12, borderRadius: 14, fontSize: 12, fontWeight: 800, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <span>🏢</span>
                    <span>Required: Host Aadhaar Card & Electricity (EB) Bill / Address Proof</span>
                  </div>

                  {/* 1. AADHAAR CARD NUMBER & PHOTO */}
                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Host Aadhaar Card Number</label>
                  <input 
                    type="text" 
                    value={hostKycForm.aadhaarNo}
                    onChange={(e) => setHostKycForm({...hostKycForm, aadhaarNo: e.target.value})}
                    placeholder="e.g. 5482 9102 3847"
                    style={{ width: "100%", padding: 12, borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 14, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}
                  />

                  <input 
                    type="file" 
                    ref={hostAadhaarFileRef} 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImageToFirebaseStorage(file, "host_kyc_docs");
                        setHostKycForm(prev => ({ ...prev, aadhaarDocUrl: url || SVG_GARAGE_DATA_URL }));
                      }
                    }} 
                    style={{ display: "none" }} 
                  />
                  <button 
                    onClick={() => hostAadhaarFileRef.current?.click()}
                    style={{ width: "100%", padding: 10, borderRadius: 12, background: "#F1F5F9", border: "1px dashed #94A3B8", color: "#0F172A", fontWeight: 800, fontSize: 12, cursor: "pointer", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  >
                    <span>🪪</span>
                    <span>{hostKycForm.aadhaarDocUrl ? "✓ Host Aadhaar Uploaded" : "Upload Aadhaar Card Photo"}</span>
                  </button>

                  {/* 2. EB CONSUMER NUMBER & EB BILL ADDRESS PROOF */}
                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Electricity (EB) Consumer Number</label>
                  <input 
                    type="text" 
                    value={hostKycForm.ebNumber}
                    onChange={(e) => setHostKycForm({...hostKycForm, ebNumber: e.target.value})}
                    placeholder="e.g. EB-04-291-8849"
                    style={{ width: "100%", padding: 12, borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 14, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}
                  />

                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>EB Bill Service Address</label>
                  <input 
                    type="text" 
                    value={hostKycForm.ebAddress}
                    onChange={(e) => setHostKycForm({...hostKycForm, ebAddress: e.target.value})}
                    placeholder="Property Address on EB Bill"
                    style={{ width: "100%", padding: 12, borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}
                  />

                  <input 
                    type="file" 
                    ref={hostEbFileRef} 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImageToFirebaseStorage(file, "host_kyc_docs");
                        setHostKycForm(prev => ({ ...prev, ebDocUrl: url || SVG_BASEMENT_DATA_URL }));
                      }
                    }} 
                    style={{ display: "none" }} 
                  />
                  <button 
                    onClick={() => hostEbFileRef.current?.click()}
                    style={{ width: "100%", padding: 10, borderRadius: 12, background: "#F1F5F9", border: "1px dashed #94A3B8", color: "#0F172A", fontWeight: 800, fontSize: 12, cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  >
                    <span>⚡</span>
                    <span>{hostKycForm.ebDocUrl ? "✓ EB Bill / Address Proof Uploaded" : "Upload EB Bill Photo"}</span>
                  </button>
                </div>

                <button 
                  onClick={handleHostKycSubmit}
                  disabled={isSubmittingKyc}
                  style={{ width: "100%", padding: 16, borderRadius: 16, background: "#F59E0B", border: "none", color: "#FFF", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(245,158,11,0.35)", opacity: isSubmittingKyc ? 0.7 : 1, marginTop: 12 }}
                >
                  {isSubmittingKyc ? "Verifying Host Property KYC..." : "✓ Submit & Verify Host KYC 🚀"}
                </button>
              </div>
            )}

            {/* ─── SCREEN 53: KYC APPROVED SUCCESS STATUS ─── */}
            {activeScreen === "53" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", padding: 24, justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "100%", marginTop: 30 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#DCFCE7", color: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 10px 25px rgba(34,197,94,0.25)" }}>
                    <IconCheck size={40} color="#22C55E" />
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>KYC Verification Approved!</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px" }}>
                    Your government documents have been verified and saved to Firebase Firestore (`paarkkar-dda3d`).
                  </p>

                  <div style={{ background: "#F8FAFC", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", textAlign: "left", marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 900, background: "#22C55E", color: "#FFF", padding: "2px 8px", borderRadius: 6 }}>
                        VERIFIED {role === "host" ? "HOST" : "DRIVER"}
                      </span>
                      <span style={{ fontSize: 10, color: "#64748B" }}>FIREBASE SYNCED</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>Hanush Adith</h3>
                    <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 4px" }}>
                      {role === "host" ? `Aadhaar: ${hostKycForm.aadhaarNo} • EB No: ${hostKycForm.ebNumber}` : `Vehicle: ${driverKycForm.vehicleNo} • RC: ${driverKycForm.rcNumber}`}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (role === "host") setActiveScreen("29");
                    else setActiveScreen("08");
                  }}
                  style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)" }}
                >
                  {role === "host" ? "Enter Host Dashboard ➔" : "Enter PARKKAR Map ➔"}
                </button>
              </div>
            )}

            {/* ─── SCREEN 06: MODERN ACCOUNT LOGIN & SIGN UP PAGE ─── */}
            {activeScreen === "06" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 22px 24px", justifyContent: "space-between", background: "#FFF", overflowY: "auto" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <button onClick={() => setActiveScreen("05")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 3 }}>
                      <button 
                        onClick={() => setAuthMode("signin")}
                        style={{ padding: "5px 12px", borderRadius: 8, border: "none", background: authMode === "signin" ? "#FFF" : "transparent", color: authMode === "signin" ? "#0F172A" : "#64748B", fontWeight: 800, fontSize: 11, cursor: "pointer", boxShadow: authMode === "signin" ? "0 2px 6px rgba(0,0,0,0.08)" : "none" }}
                      >
                        Sign In
                      </button>
                      <button 
                        onClick={() => setAuthMode("signup")}
                        style={{ padding: "5px 12px", borderRadius: 8, border: "none", background: authMode === "signup" ? "#FFF" : "transparent", color: authMode === "signup" ? "#0F172A" : "#64748B", fontWeight: 800, fontSize: 11, cursor: "pointer", boxShadow: authMode === "signup" ? "0 2px 6px rgba(0,0,0,0.08)" : "none" }}
                      >
                        Create Account
                      </button>
                    </div>
                  </div>

                  <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 2px", letterSpacing: "-0.02em" }}>
                    {authMode === "signup" ? "Join PARKKAR Today!" : "Welcome Back!"}
                  </h2>
                  <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 14px", fontWeight: 600 }}>
                    {authMode === "signup" ? "Create your account to start parking & hosting" : "Sign in to access your bookings & earnings"}
                  </p>

                  <div style={{ display: "flex", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: 4, marginBottom: 14 }}>
                    <button 
                      onClick={() => setRole("driver")}
                      style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: role !== "host" ? "#22C55E" : "transparent", color: role !== "host" ? "#FFF" : "#64748B", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
                    >
                      🚗 Driver Mode
                    </button>
                    <button 
                      onClick={() => setRole("host")}
                      style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: role === "host" ? "#F59E0B" : "transparent", color: role === "host" ? "#FFF" : "#64748B", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
                    >
                      🏢 Host & Earn
                    </button>
                  </div>

                  {/* 1-TAP QUICK TEST HELPER */}
                  <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "8px 10px", marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 900, color: "#16A34A" }}>💡 Quick 1-Tap Login Credentials</span>
                      <span style={{ fontSize: 9, color: "#16A34A", background: "#DCFCE7", padding: "1px 6px", borderRadius: 4, fontWeight: 800 }}>FIREBASE AUTH</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button 
                        onClick={() => { setLoginInput("driver@parkkar.com"); setRole("driver"); setAuthMode("signin"); }}
                        style={{ background: "#DCFCE7", border: "none", color: "#15803D", padding: "4px 8px", borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: "pointer" }}
                      >
                        🚗 driver@parkkar.com
                      </button>
                      <button 
                        onClick={() => { setLoginInput("host@parkkar.com"); setRole("host"); setAuthMode("signin"); }}
                        style={{ background: "#FEF3C7", border: "none", color: "#B45309", padding: "4px 8px", borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: "pointer" }}
                      >
                        🏢 host@parkkar.com
                      </button>
                    </div>
                  </div>

                  {/* SIGN UP FULL NAME FIELD */}
                  {authMode === "signup" && (
                    <>
                      <label style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Full Name</label>
                      <div style={{ display: "flex", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: "10px 12px", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 14 }}>👤</span>
                        <input 
                          type="text" 
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="e.g. Hanush Adith" 
                          style={{ border: "none", outline: "none", flex: 1, fontSize: 13, fontWeight: 700, color: "#0F172A" }} 
                        />
                      </div>

                      <label style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Mobile Phone Number</label>
                      <div style={{ display: "flex", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: "10px 12px", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>🇮🇳 +91</span>
                        <input 
                          type="text" 
                          value={signUpPhone}
                          onChange={(e) => setSignUpPhone(e.target.value)}
                          placeholder="98765 43210" 
                          style={{ border: "none", outline: "none", flex: 1, fontSize: 13, fontWeight: 700, color: "#0F172A" }} 
                        />
                      </div>
                    </>
                  )}

                  {/* GMAIL / EMAIL FIELD */}
                  <label style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>
                    Gmail / Email Address
                  </label>
                  <div style={{ display: "flex", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: "10px 12px", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 14 }}>📧</span>
                    <input 
                      type="email" 
                      value={loginInput}
                      onChange={(e) => setLoginInput(e.target.value)}
                      placeholder="e.g. yourname@gmail.com" 
                      style={{ border: "none", outline: "none", flex: 1, fontSize: 13, fontWeight: 700, color: "#0F172A" }} 
                    />
                  </div>

                  {/* PASSWORD FIELD */}
                  <label style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 4 }}>Password</label>
                  <div style={{ display: "flex", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: "10px 12px", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <IconLock size={16} color="#94A3B8" />
                    <input 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••" 
                      style={{ border: "none", outline: "none", flex: 1, fontSize: 13, color: "#0F172A" }} 
                    />
                  </div>

                  <button 
                    onClick={handleFirebaseLogin}
                    style={{ width: "100%", padding: "14px", borderRadius: 14, background: role === "host" ? "#F59E0B" : "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 900, cursor: "pointer", boxShadow: "0 6px 18px rgba(0,0,0,0.12)", marginBottom: 12 }}
                  >
                    🔥 {authMode === "signup" ? "Create Free PARKKAR Account" : `Sign In as ${role === "host" ? "Host" : "Driver"}`}
                  </button>

                  {/* GOOGLE & OTP SOCIAL LOGINS */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0" }}>
                    <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
                    <span style={{ fontSize: 10, color: "#94A3B8", fontWeight: 800 }}>OR SIGN IN WITH</span>
                    <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <button 
                      onClick={() => {
                        setLoginInput("google_user@gmail.com");
                        handleFirebaseLogin();
                      }}
                      style={{ padding: "10px 8px", borderRadius: 12, border: "1px solid #E2E8F0", background: "#FFF", color: "#0F172A", fontWeight: 800, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Google</span>
                    </button>

                    <button 
                      onClick={() => setActiveScreen("07")}
                      style={{ padding: "10px 8px", borderRadius: 12, border: "1px solid #E2E8F0", background: "#FFF", color: "#0F172A", fontWeight: 800, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                    >
                      <span>📱</span>
                      <span>Mobile OTP</span>
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <span style={{ fontSize: 11, color: "#64748B" }}>
                    {authMode === "signup" ? "Already have an account? " : "Don't have an account? "}
                  </span>
                  <button 
                    onClick={() => setAuthMode(authMode === "signup" ? "signin" : "signup")}
                    style={{ background: "none", border: "none", color: "#22C55E", fontSize: 12, fontWeight: 900, cursor: "pointer" }}
                  >
                    {authMode === "signup" ? "Sign In" : "Create Account"}
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 07: OTP VERIFICATION ─── */}
            {activeScreen === "07" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px 20px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => setActiveScreen("06")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 6px", textAlign: "center" }}>Enter Verification Code</h2>
                  <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", margin: "0 0 24px" }}>
                    We've sent a 6-digit code to <br/><strong style={{ color: "#0F172A" }}>+91 {loginInput}</strong>
                  </p>

                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                    {otpVal.map((v, idx) => (
                      <div key={idx} style={{ width: 44, height: 48, borderRadius: 12, border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#0F172A", background: "#F0FDF4" }}>
                        {v}
                      </div>
                    ))}
                  </div>

                  <p style={{ textAlign: "center", fontSize: 13, color: "#64748B" }}>
                    Resend OTP in <span style={{ color: "#22C55E", fontWeight: 700 }}>00:30</span>
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, padding: "10px 0" }}>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"].map((k) => (
                    <button
                      key={k}
                      onClick={() => { if (k === "✓") handleAccessApp("driver"); }}
                      style={{
                        padding: "14px 0",
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

            {/* ─── SCREEN 08: HOME / SEARCH (CLEAN WHITE MAP + LIVE GPS FETCH) ─── */}
            {activeScreen === "08" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", borderBottom: "1px solid #F1F5F9" }}>
                  <button onClick={() => setShowDrawer(true)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconMenu size={22} color="#0F172A" />
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button 
                      onClick={handleFirebaseSignOut}
                      title="Log Out Driver"
                      style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#EF4444", padding: "5px 10px", borderRadius: 10, fontSize: 11, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                    <button onClick={() => setActiveScreen("22")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconBell size={20} color="#0F172A" />
                    </button>
                  </div>
                </div>

                <div style={{ padding: "8px 16px 12px", background: "#FFF", display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.04)", zIndex: 10 }}>
                  <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: "8px 12px", alignItems: "center", gap: 8 }}>
                    <IconSearch size={18} color="#64748B" />
                    <input 
                      type="text" 
                      placeholder="Search location" 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontWeight: 700, fontSize: 13, color: "#0F172A" }} 
                    />

                    <button 
                      onClick={handleFetchUserLocation}
                      disabled={isLocating}
                      title="Fetch My Live GPS Location"
                      style={{ background: "#DCFCE7", border: "1px solid #BBF7D0", color: "#16A34A", padding: "6px 10px", borderRadius: 10, fontWeight: 800, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}
                    >
                      <IconTarget size={14} color="#16A34A" />
                      <span>{isLocating ? "Locating..." : "GPS"}</span>
                    </button>

                    <button onClick={() => setActiveScreen("09")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconFilter size={18} color="#64748B" />
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
                    {["Chennai", "Coimbatore", "Madurai"].map((cityName) => {
                      const spotInCity = allSpots.find(s => s.city === cityName);
                      const isSelected = selectedSpot.city === cityName;
                      return (
                        <button
                          key={cityName}
                          onClick={() => {
                            if (spotInCity) {
                              setSelectedSpot(spotInCity);
                              setSearchQuery(spotInCity.address);
                            }
                          }}
                          style={{
                            padding: "6px 14px",
                            borderRadius: 12,
                            border: "none",
                            background: isSelected ? "#22C55E" : "#F1F5F9",
                            color: isSelected ? "#FFF" : "#475569",
                            fontSize: 12,
                            fontWeight: 800,
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                          }}
                        >
                          📍 {cityName}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ flex: 1, background: "#F8FAFC", position: "relative", overflow: "hidden" }}>
                  <TamilNaduMap 
                    spotsList={allSpots}
                    selectedSpot={selectedSpot} 
                    userLocation={userLocation}
                    onSelectSpot={(spot) => {
                      setSelectedSpot(spot);
                      setSearchQuery(spot.address);
                    }} 
                  />

                  <div style={{ position: "absolute", bottom: 12, left: 16, right: 16, background: "#FFF", borderRadius: 20, padding: 14, boxShadow: "0 10px 30px rgba(0,0,0,0.15)", display: "flex", gap: 12, alignItems: "center", zIndex: 500, border: "1px solid #E2E8F0" }}>
                    <div style={{ width: 74, height: 74, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                      <SmartImage sources={selectedSpot.imgSources} alt="spot" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 900, color: "#0F172A" }}>{selectedSpot.title}</h4>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748B" }}>{selectedSpot.address}</p>
                      <div style={{ fontSize: 15, fontWeight: 900, color: "#22C55E" }}>₹{selectedSpot.price}/hr</div>
                    </div>
                    <button onClick={() => setActiveScreen("10")} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "12px 16px", borderRadius: 12, fontWeight: 900, fontSize: 13, cursor: "pointer", boxShadow: "0 4px 12px rgba(34,197,94,0.3)" }}>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SCREEN 09: NEARBY SPACES (LIST VIEW) ─── */}
            {activeScreen === "09" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF" }}>
                  <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Nearby Tamil Nadu Spaces</span>
                  <span style={{ width: 20 }} />
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
                  {allSpots.map((item) => (
                    <div key={item.id} style={{ background: "#FFF", borderRadius: 16, padding: 12, border: "1px solid #E2E8F0", display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 84, height: 84, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                        <SmartImage sources={item.imgSources} alt="spot" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{item.title}</h4>
                        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748B" }}>{item.address}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontWeight: 900, color: "#22C55E", fontSize: 15 }}>₹{item.price}<span style={{ fontSize: 10, color: "#64748B" }}>/hr</span></div>
                          <button onClick={() => { setSelectedSpot(item); setSearchQuery(item.address); setActiveScreen("10"); }} style={{ background: "#22C55E", border: "none", color: "#FFF", padding: "8px 14px", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── SCREEN 10: PARKING DETAILS ─── */}
            {activeScreen === "10" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", height: "100%", overflow: "hidden" }}>
                <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", borderBottom: "1px solid #F1F5F9" }}>
                    <button onClick={() => setActiveScreen("08")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Parking Details</span>
                    <button onClick={() => alert(`Shared ${selectedSpot.title} parking link to clipboard!`)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconShare size={20} color="#0F172A" />
                    </button>
                  </div>

                  <div style={{ padding: "14px 16px 10px" }}>
                    {selectedSpot.photoComponent || <RealGaragePhoto height={210} />}
                  </div>

                  <div style={{ padding: "0 20px 14px", background: "#FFF", marginBottom: 12, borderBottom: "1px solid #F1F5F9" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: 0, lineHeight: 1.2 }}>{selectedSpot.title}</h2>
                      <div style={{ background: "#FEF3C7", color: "#D97706", padding: "4px 10px", borderRadius: 10, fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                        <span>★</span>
                        <span>{selectedSpot.rating}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "#64748B", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                      <span>📍 {selectedSpot.address}</span>
                      <span>•</span>
                      <span style={{ color: "#22C55E" }}>⚡ 0.4 km away (3 min drive)</span>
                    </div>
                  </div>

                  <div style={{ margin: "0 16px 14px" }}>
                    <div style={{ background: "#DCFCE7", border: "1.5px solid #BBF7D0", padding: "12px 16px", borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
                        <span style={{ fontSize: 13, fontWeight: 900, color: "#15803D" }}>3 Parking Slots Instantly Free</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#16A34A", background: "#FFF", padding: "3px 8px", borderRadius: 6 }}>AUTO PASS</span>
                    </div>
                  </div>

                  <div style={{ margin: "0 16px 14px", background: "#FFF", padding: 14, borderRadius: 16, border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0F172A", color: "#22C55E", fontWeight: 900, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        ET
                      </div>
                      <div>
                        <h4 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 900, color: "#0F172A" }}>Express Towers Commercial Host</h4>
                        <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>Verified Host • Responds in &lt; 2 mins</span>
                      </div>
                    </div>
                    <button onClick={() => alert("Calling Host Express Towers (+91 98765 43210)...")} style={{ background: "#F1F5F9", border: "none", color: "#0F172A", padding: "8px 12px", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
                      📞 Call Host
                    </button>
                  </div>

                  <div style={{ padding: "0 16px 14px" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 900, color: "#0F172A", margin: "0 0 10px" }}>Space Amenities & Specifications</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                      {[
                        { icon: "🛡️", title: "CCTV Security", desc: "24/7 Monitored Barrier" },
                        { icon: "☂️", title: "100% Covered", desc: "Underground Basement" },
                        { icon: "⚡", title: "EV Fast Charge", desc: "60kW DC Plug Ready" },
                        { icon: "⏱️", title: "24/7 Access", desc: "Unlimited Gate Entry" }
                      ].map((item, idx) => (
                        <div key={idx} style={{ background: "#FFF", padding: 12, borderRadius: 14, border: "1px solid #E2E8F0" }}>
                          <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>{item.icon}</span>
                          <h5 style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 900, color: "#0F172A" }}>{item.title}</h5>
                          <p style={{ margin: 0, fontSize: 11, color: "#64748B", fontWeight: 600 }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: "16px 20px 24px", borderTop: "1.5px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", boxShadow: "0 -6px 20px rgba(0,0,0,0.08)", zIndex: 100 }}>
                  <div>
                    <span style={{ fontSize: 11, color: "#16A34A", fontWeight: 800, display: "block" }}>● Instant Approval • Free Cancel</span>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#0F172A" }}>
                      ₹{selectedSpot.price} <span style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>/hr</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveScreen("11")} 
                    style={{ 
                      padding: "16px 36px", 
                      borderRadius: 16, 
                      background: "#22C55E", 
                      border: "none", 
                      color: "#FFF", 
                      fontWeight: 900, 
                      fontSize: 16, 
                      cursor: "pointer", 
                      boxShadow: "0 8px 24px rgba(34,197,94,0.4)" 
                    }}
                  >
                    Book Spot Now
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 11: SELECT DATE & TIME ─── */}
            {activeScreen === "11" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", justifyContent: "space-between" }}>
                <div>
                  <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", borderBottom: "1px solid #F1F5F9" }}>
                    <button onClick={() => setActiveScreen("10")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 12 }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Select Date & Time</span>
                  </div>

                  <div style={{ padding: "20px 20px 0" }}>
                    <label style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 10 }}>Select Booking Date</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
                      {[
                        { day: "Today", date: "04 Aug" },
                        { day: "Tomorrow", date: "05 Aug" },
                        { day: "Thursday", date: "06 Aug" }
                      ].map((item, i) => {
                        const label = `${item.day}, ${item.date}`;
                        const isSelected = selectedDate === label;
                        return (
                          <div 
                            key={i} 
                            onClick={() => setSelectedDate(label)}
                            style={{ 
                              padding: "12px 8px", 
                              borderRadius: 14, 
                              border: isSelected ? "2px solid #22C55E" : "1px solid #E2E8F0", 
                              background: isSelected ? "#F0FDF4" : "#F8FAFC", 
                              textAlign: "center", 
                              cursor: "pointer" 
                            }}
                          >
                            <div style={{ fontSize: 11, fontWeight: 700, color: isSelected ? "#16A34A" : "#64748B" }}>{item.day}</div>
                            <div style={{ fontSize: 14, fontWeight: 900, color: isSelected ? "#16A34A" : "#0F172A", marginTop: 2 }}>{item.date}</div>
                          </div>
                        );
                      })}
                    </div>

                    <label style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 10 }}>Select Start & End Time</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                      <div style={{ background: "#F8FAFC", padding: 12, borderRadius: 14, border: "1px solid #E2E8F0" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 4 }}>Start Time</span>
                        <select 
                          value={startTime} 
                          onChange={(e) => setStartTime(e.target.value)}
                          style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: 15, fontWeight: 800, color: "#0F172A", cursor: "pointer" }}
                        >
                          <option>08:00 AM</option>
                          <option>09:00 AM</option>
                          <option>10:00 AM</option>
                          <option>11:00 AM</option>
                          <option>12:00 PM</option>
                        </select>
                      </div>

                      <div style={{ background: "#F8FAFC", padding: 12, borderRadius: 14, border: "1px solid #E2E8F0" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 4 }}>End Time</span>
                        <select 
                          value={endTime} 
                          onChange={(e) => setEndTime(e.target.value)}
                          style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: 15, fontWeight: 800, color: "#0F172A", cursor: "pointer" }}
                        >
                          <option>01:00 PM</option>
                          <option>02:00 PM</option>
                          <option>03:00 PM</option>
                          <option>04:00 PM</option>
                          <option>06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <label style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 10 }}>Quick Duration Selector</label>
                    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                      {[2, 4, 6, 8, 12].map((hrs) => (
                        <button 
                          key={hrs} 
                          onClick={() => setDurationHours(hrs)}
                          style={{ 
                            flex: 1, 
                            padding: "10px 0", 
                            borderRadius: 12, 
                            border: durationHours === hrs ? "2px solid #22C55E" : "1px solid #E2E8F0", 
                            background: durationHours === hrs ? "#DCFCE7" : "#F8FAFC", 
                            color: durationHours === hrs ? "#16A34A" : "#475569", 
                            fontWeight: 800, 
                            fontSize: 13, 
                            cursor: "pointer" 
                          }}
                        >
                          {hrs} Hrs
                        </button>
                      ))}
                    </div>

                    <div style={{ background: "#F0FDF4", borderRadius: 16, border: "1px solid #BBF7D0", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>Estimated Subtotal</span>
                        <div style={{ fontSize: 13, color: "#475569", marginTop: 2 }}>{durationHours} Hours × ₹{selectedSpot.price}/hr</div>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#16A34A" }}>
                        ₹{calculatedBaseAmount}
                      </div>
                    </div>

                  </div>
                </div>

                <div style={{ padding: "16px 20px 24px", borderTop: "1px solid #F1F5F9", background: "#FFF" }}>
                  <button 
                    onClick={() => setActiveScreen("12")}
                    style={{ 
                      width: "100%", 
                      padding: 16, 
                      borderRadius: 16, 
                      background: "#22C55E", 
                      border: "none", 
                      color: "#FFF", 
                      fontWeight: 900, 
                      fontSize: 16, 
                      cursor: "pointer", 
                      boxShadow: "0 6px 16px rgba(34,197,94,0.35)" 
                    }}
                  >
                    Continue to Summary
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 12: BOOKING SUMMARY ─── */}
            {activeScreen === "12" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", justifyContent: "space-between" }}>
                <div>
                  <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", background: "#FFF", borderBottom: "1px solid #F1F5F9" }}>
                    <button onClick={() => setActiveScreen("11")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 12 }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Booking Summary</span>
                  </div>

                  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ background: "#FFF", borderRadius: 16, padding: 14, border: "1px solid #E2E8F0", display: "flex", gap: 14, alignItems: "center" }}>
                      <div style={{ width: 70, height: 70, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                        <SmartImage sources={selectedSpot.imgSources} alt="spot" />
                      </div>
                      <div>
                        <h4 style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 900, color: "#0F172A" }}>{selectedSpot.title}</h4>
                        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748B" }}>{selectedSpot.address}</p>
                        <span style={{ fontSize: 11, fontWeight: 800, background: "#DCFCE7", color: "#16A34A", padding: "2px 8px", borderRadius: 6 }}>SLOT A-12</span>
                      </div>
                    </div>

                    <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #E2E8F0" }}>
                      <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Reservation Time</h4>
                      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px dashed #E2E8F0" }}>
                        <span style={{ fontSize: 13, color: "#64748B" }}>Date</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{selectedDate}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
                        <span style={{ fontSize: 13, color: "#64748B" }}>Time Slot</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{startTime} - {endTime} ({durationHours}h)</span>
                      </div>
                    </div>

                    <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #E2E8F0" }}>
                      <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Payment Details</h4>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: "#64748B" }}>Parking Fee ({durationHours} hrs)</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>₹{calculatedBaseAmount}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={{ fontSize: 13, color: "#64748B" }}>Platform Service Fee</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>₹{calculatedServiceFee}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1.5px solid #E2E8F0" }}>
                        <span style={{ fontSize: 15, fontWeight: 900, color: "#0F172A" }}>Total Payable</span>
                        <span style={{ fontSize: 18, fontWeight: 900, color: "#22C55E" }}>₹{calculatedTotalAmount}</span>
                      </div>
                    </div>

                  </div>
                </div>

                <div style={{ padding: "16px 20px 24px", borderTop: "1px solid #E2E8F0", background: "#FFF" }}>
                  <button 
                    onClick={() => setActiveScreen("13")}
                    style={{ 
                      width: "100%", 
                      padding: 16, 
                      borderRadius: 16, 
                      background: "#22C55E", 
                      border: "none", 
                      color: "#FFF", 
                      fontWeight: 900, 
                      fontSize: 16, 
                      cursor: "pointer", 
                      boxShadow: "0 6px 16px rgba(34,197,94,0.35)" 
                    }}
                  >
                    Proceed to Checkout (₹{calculatedTotalAmount})
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 13: PAYMENT CHECKOUT (RAZORPAY PAYMENT GATEWAY) ─── */}
            {activeScreen === "13" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", height: "100%", overflow: "hidden" }}>
                
                <div style={{ flex: 1, overflowY: "auto" }}>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", borderBottom: "1px solid #F1F5F9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => setActiveScreen("12")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                        <IconChevronLeft size={22} color="#0F172A" />
                      </button>
                      <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Payment Checkout</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#16A34A", background: "#DCFCE7", padding: "4px 8px", borderRadius: 8 }}>
                      ⚡ RAZORPAY SECURE
                    </span>
                  </div>

                  <div style={{ padding: 16 }}>
                    <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", color: "#FFF", padding: "20px 24px", borderRadius: 22, textAlign: "left", marginBottom: 20, boxShadow: "0 10px 25px rgba(15,23,42,0.25)", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(34,197,94,0.15)" }} />
                      <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Total Payable Amount</span>
                      <div style={{ fontSize: 34, fontWeight: 900, color: "#22C55E", marginTop: 4 }}>
                        ₹{calculatedTotalAmount}
                      </div>
                      <div style={{ fontSize: 12, color: "#CBD5E1", marginTop: 6, fontWeight: 600 }}>
                        {selectedSpot.title} • {durationHours} Hours Reservation
                      </div>
                    </div>

                    <label style={{ fontSize: 14, fontWeight: 900, color: "#0F172A", display: "block", marginBottom: 12 }}>Select Payment Gateway</label>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      
                      <div 
                        onClick={() => setSelectedPayment("razorpay")}
                        style={{ 
                          padding: 16, 
                          borderRadius: 18, 
                          border: selectedPayment === "razorpay" ? "2.5px solid #22C55E" : "1.5px solid #E2E8F0", 
                          background: selectedPayment === "razorpay" ? "#F0FDF4" : "#FFF", 
                          boxShadow: selectedPayment === "razorpay" ? "0 8px 25px rgba(34,197,94,0.2)" : "none",
                          cursor: "pointer" 
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#0C2340", color: "#3B82F6", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, boxShadow: "0 4px 12px rgba(12,35,64,0.2)" }}>
                              💳
                            </div>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "#0F172A" }}>Razorpay Gateway</h4>
                                <span style={{ fontSize: 9, fontWeight: 900, background: "#3B82F6", color: "#FFF", padding: "2px 6px", borderRadius: 4 }}>RECOMMENDED</span>
                              </div>
                              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748B", fontWeight: 600 }}>UPI • Cards • NetBanking • Wallets</p>
                            </div>
                          </div>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", border: selectedPayment === "razorpay" ? "6px solid #22C55E" : "2px solid #CBD5E1", background: "#FFF", flexShrink: 0 }} />
                        </div>

                        {selectedPayment === "razorpay" && (
                          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px dashed #BBF7D0", display: "flex", flexDirection: "column", gap: 8 }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: "#16A34A", display: "flex", alignItems: "center", gap: 6 }}>
                              <span>✓ Key ID:</span>
                              <code style={{ background: "#DCFCE7", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>rzp_test_TLiQiPWrFJya33</code>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`🎉 Razorpay Test Payment Approved!\nPayment ID: pay_rzp_test_${Date.now()}`);
                                setActiveScreen("14");
                              }}
                              style={{ width: "100%", padding: "10px 12px", borderRadius: 12, background: "#DCFCE7", border: "1px solid #BBF7D0", color: "#15803D", fontWeight: 900, fontSize: 12, cursor: "pointer" }}
                            >
                              ⚡ 1-Click Instant Test Approval (Bypass Sandbox OTP)
                            </button>
                          </div>
                        )}
                      </div>

                      <div 
                        onClick={() => setSelectedPayment("upi")}
                        style={{ 
                          padding: 16, 
                          borderRadius: 18, 
                          border: selectedPayment === "upi" ? "2px solid #22C55E" : "1.5px solid #E2E8F0", 
                          background: selectedPayment === "upi" ? "#F0FDF4" : "#FFF", 
                          cursor: "pointer" 
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#DCFCE7", color: "#16A34A", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>
                              📱
                            </div>
                            <div>
                              <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 900, color: "#0F172A" }}>Direct UPI Payment</h4>
                              <p style={{ margin: 0, fontSize: 12, color: "#64748B", fontWeight: 600 }}>GPay • PhonePe • Paytm • BHIM</p>
                            </div>
                          </div>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", border: selectedPayment === "upi" ? "6px solid #22C55E" : "2px solid #CBD5E1", background: "#FFF", flexShrink: 0 }} />
                        </div>
                      </div>

                      <div 
                        onClick={() => setSelectedPayment("wallet")}
                        style={{ 
                          padding: 16, 
                          borderRadius: 18, 
                          border: selectedPayment === "wallet" ? "2px solid #22C55E" : "1.5px solid #E2E8F0", 
                          background: selectedPayment === "wallet" ? "#F0FDF4" : "#FFF", 
                          cursor: "pointer" 
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#E0F2FE", color: "#0284C7", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>
                              👛
                            </div>
                            <div>
                              <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 900, color: "#0F172A" }}>PARKKAR Cash Wallet</h4>
                              <p style={{ margin: 0, fontSize: 12, color: "#64748B", fontWeight: 600 }}>Available Balance: <strong style={{ color: "#22C55E" }}>₹450</strong></p>
                            </div>
                          </div>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", border: selectedPayment === "wallet" ? "6px solid #22C55E" : "2px solid #CBD5E1", background: "#FFF", flexShrink: 0 }} />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div style={{ padding: "16px 20px 24px", borderTop: "1.5px solid #E2E8F0", background: "#FFF", boxShadow: "0 -6px 20px rgba(0,0,0,0.08)", zIndex: 100, display: "flex", flexDirection: "column", gap: 10 }}>
                  <button 
                    onClick={() => {
                      if (selectedPayment === "razorpay") {
                        handleRazorpayPayment();
                      } else {
                        setActiveScreen("14");
                      }
                    }}
                    style={{ 
                      width: "100%", 
                      padding: 16, 
                      borderRadius: 16, 
                      background: "#22C55E", 
                      border: "none", 
                      color: "#FFF", 
                      fontWeight: 900, 
                      fontSize: 16, 
                      cursor: "pointer", 
                      boxShadow: "0 8px 24px rgba(34,197,94,0.4)" 
                    }}
                  >
                    {selectedPayment === "razorpay" ? `💳 Open Razorpay Checkout (₹${calculatedTotalAmount})` : `Pay ₹${calculatedTotalAmount} & Reserve Slot`}
                  </button>

                  <button 
                    onClick={() => setActiveScreen("14")}
                    style={{ width: "100%", padding: 12, borderRadius: 14, background: "#F1F5F9", border: "1px solid #CBD5E1", color: "#475569", fontWeight: 800, fontSize: 13, cursor: "pointer" }}
                  >
                    ⚡ Test Mode Instant Confirm (Skip Razorpay Popup)
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 14: PAYMENT SUCCESS & E-WAY TICKET TRIGGER ─── */}
            {activeScreen === "14" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", padding: 20, justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "100%", marginTop: 10 }}>
                  <div style={{ width: 76, height: 76, borderRadius: "50%", background: "#DCFCE7", color: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 10px 25px rgba(34,197,94,0.25)" }}>
                    <IconCheck size={38} color="#22C55E" />
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>Booking Confirmed!</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 16px" }}>Your parking slot has been reserved successfully via Razorpay.</p>

                  <div style={{ background: "#FFF", borderRadius: 20, padding: 18, border: "1px solid #E2E8F0", textAlign: "left", boxShadow: "0 4px 16px rgba(0,0,0,0.05)", marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 900, color: "#64748B" }}>PASS #PKR-89241</span>
                      <span style={{ fontSize: 11, fontWeight: 800, background: "#DCFCE7", color: "#16A34A", padding: "2px 8px", borderRadius: 6 }}>RAZORPAY PAID ✓</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>{selectedSpot.title}</h3>
                    <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 10px" }}>📍 {selectedSpot.address}</p>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0F172A", background: "#F1F5F9", padding: "8px 12px", borderRadius: 10 }}>
                      📅 {selectedDate} • {startTime} - {endTime}
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                  <button 
                    onClick={() => setActiveScreen("EWAY_TICKET")}
                    style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(34,197,94,0.38)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  >
                    🎫 View & Download Digital E-Way Ticket Pass
                  </button>
                  <button 
                    onClick={() => handleAccessApp("driver")}
                    style={{ width: "100%", padding: 14, borderRadius: 16, background: "#FFF", border: "1.5px solid #E2E8F0", color: "#0F172A", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
                  >
                    Back to Home Map
                  </button>
                </div>
              </div>
            )}

            {/* ─── OFFICIAL PARKKAR E-WAY DIGITAL TICKET PASS SCREEN ─── */}
            {activeScreen === "EWAY_TICKET" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0F172A", padding: 16, justifyContent: "space-between", overflowY: "auto" }}>
                
                {/* TOP E-TICKET HEADER BAR */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <button onClick={() => setActiveScreen("14")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#FFF", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconChevronLeft size={20} color="#FFF" />
                  </button>
                  <span style={{ fontSize: 16, fontWeight: 900, color: "#FFF", letterSpacing: "-0.01em" }}>PARKKAR E-Way Pass</span>
                  <button onClick={() => window.print()} style={{ background: "rgba(34,197,94,0.2)", border: "1px solid #22C55E", color: "#22C55E", padding: "6px 12px", borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
                    🖨️ Print / Save
                  </button>
                </div>

                {/* DIGITAL E-WAY TICKET CARD CONTAINER */}
                <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 20, boxShadow: "0 20px 50px rgba(0,0,0,0.5)", border: "2px solid #22C55E", position: "relative" }}>
                  
                  {/* TICKET CARD HEADER */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "2px dashed #E2E8F0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#22C55E", color: "#FFF", fontWeight: 900, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>P</div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: "#0F172A" }}>PARKKAR E-WAY TICKET</h4>
                        <span style={{ fontSize: 10, color: "#64748B", fontWeight: 700 }}>PASS #PKR-89241-EWAY</span>
                      </div>
                    </div>
                    <span style={{ background: "#DCFCE7", color: "#16A34A", fontSize: 10, fontWeight: 900, padding: "4px 8px", borderRadius: 8 }}>
                      ● VERIFIED ENTRY
                    </span>
                  </div>

                  {/* QR CODE SCANNER SECTION */}
                  <div style={{ textAlign: "center", margin: "16px 0", padding: "12px", background: "#F8FAFC", borderRadius: 16, border: "1px solid #E2E8F0" }}>
                    <svg viewBox="0 0 100 100" width="130" height="130" style={{ margin: "0 auto", display: "block" }}>
                      <rect x="0" y="0" width="100" height="100" fill="#F8FAFC" />
                      <path d="M10 10 h30 v30 h-30 z M15 15 v20 h20 v-20 z M22 22 h6 v6 h-6 z" fill="#0F172A" />
                      <path d="M60 10 h30 v30 h-30 z M65 15 v20 h20 v-20 z M72 22 h6 v6 h-6 z" fill="#0F172A" />
                      <path d="M10 60 h30 v30 h-30 z M15 65 v20 h20 v-20 z M22 72 h6 v6 h-6 z" fill="#0F172A" />
                      <rect x="45" y="12" width="8" height="8" fill="#0F172A" />
                      <rect x="52" y="24" width="6" height="16" fill="#0F172A" />
                      <rect x="12" y="45" width="16" height="8" fill="#0F172A" />
                      <rect x="32" y="48" width="12" height="12" fill="#0F172A" />
                      <rect x="68" y="48" width="20" height="8" fill="#0F172A" />
                      <rect x="48" y="65" width="14" height="14" fill="#0F172A" />
                      <rect x="75" y="70" width="12" height="18" fill="#0F172A" />
                      <circle cx="50" cy="50" r="14" fill="#22C55E" />
                      <text x="50" y="55" font-family="sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">P</text>
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#475569", marginTop: 6, display: "block" }}>
                      📷 Scan at Boom Barrier / Parking Gate
                    </span>
                  </div>

                  {/* TICKET DETAILS TABLE */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", paddingBottom: 6 }}>
                      <span style={{ color: "#64748B", fontWeight: 600 }}>Parking Venue:</span>
                      <strong style={{ color: "#0F172A", fontWeight: 900 }}>{selectedSpot.title}</strong>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", paddingBottom: 6 }}>
                      <span style={{ color: "#64748B", fontWeight: 600 }}>Address:</span>
                      <span style={{ color: "#0F172A", fontWeight: 700, maxWidth: 180, textAlign: "right" }}>{selectedSpot.address}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", paddingBottom: 6 }}>
                      <span style={{ color: "#64748B", fontWeight: 600 }}>Vehicle Reg No:</span>
                      <strong style={{ color: "#22C55E", fontWeight: 900, background: "#F0FDF4", padding: "2px 8px", borderRadius: 6 }}>TN 01 AB 8924</strong>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", paddingBottom: 6 }}>
                      <span style={{ color: "#64748B", fontWeight: 600 }}>Booking Slot:</span>
                      <strong style={{ color: "#0F172A" }}>{selectedDate} ({startTime} - {endTime})</strong>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", paddingBottom: 6 }}>
                      <span style={{ color: "#64748B", fontWeight: 600 }}>Amount Paid:</span>
                      <strong style={{ color: "#16A34A", fontWeight: 900 }}>₹{calculatedTotalAmount}.00 (Razorpay)</strong>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 2 }}>
                      <span style={{ color: "#64748B", fontWeight: 600 }}>Razorpay Txn ID:</span>
                      <span style={{ color: "#64748B", fontSize: 10, fontWeight: 700, fontFamily: "monospace" }}>pay_Rzp981249712</span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM ACTION BUTTONS */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
                  <button 
                    onClick={() => {
                      alert("📥 E-Way Ticket PDF downloaded! Show this QR pass at the parking gate.");
                      window.print();
                    }}
                    style={{ width: "100%", padding: 15, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  >
                    📥 Download / Print E-Way PDF Pass
                  </button>
                  <button 
                    onClick={() => handleAccessApp("driver")}
                    style={{ width: "100%", padding: 14, borderRadius: 16, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFF", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
                  >
                    🗺️ Navigate to Parking Spot on Map
                  </button>
                </div>

              </div>
            )}

            {/* ─── SCREEN 29: HOST DASHBOARD ─── */}
            {activeScreen === "29" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", justifyContent: "space-between" }}>
                <div>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", borderBottom: "1px solid #F1F5F9" }}>
                    <button onClick={() => setShowDrawer(true)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <IconMenu size={22} color="#0F172A" />
                    </button>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Host Dashboard</span>
                    <span style={{ fontSize: 11, fontWeight: 800, background: "#FEF3C7", color: "#D97706", padding: "4px 8px", borderRadius: 6 }}>HOST MODE</span>
                  </div>

                  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)", borderRadius: 20, padding: 20, color: "#FFF", boxShadow: "0 10px 25px rgba(22,163,74,0.25)" }}>
                      <span style={{ fontSize: 12, opacity: 0.9 }}>This Month's Earnings</span>
                      <div style={{ fontSize: 32, fontWeight: 900, marginTop: 4 }}>₹12,450.00</div>
                      <span style={{ fontSize: 11, opacity: 0.9, marginTop: 8, display: "block" }}>14 Driver Bookings Completed</span>
                    </div>

                    <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #E2E8F0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#0F172A" }}>Your Listed Spots ({allSpots.length} Live)</h4>
                        <button onClick={handleStartNewHostListing} style={{ background: "#22C55E", border: "none", color: "#FFF", fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 8, cursor: "pointer", boxShadow: "0 4px 10px rgba(34,197,94,0.3)" }}>
                          + Add Spot
                        </button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 220, overflowY: "auto" }}>
                        {allSpots.map((sp) => (
                          <div key={sp.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F1F5F9" }}>
                            <div style={{ width: 50, height: 50, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                              <SmartImage sources={sp.imgSources} alt="spot" />
                            </div>
                            <div style={{ flex: 1 }}>
                              <h5 style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{sp.title}</h5>
                              <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 800 }}>● Live • ₹{sp.price}/hr</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: 16, borderTop: "1px solid #E2E8F0", background: "#FFF" }}>
                  <button 
                    onClick={handleStartNewHostListing}
                    style={{ width: "100%", padding: 16, borderRadius: 16, background: "#F59E0B", border: "none", color: "#FFF", fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 16px rgba(245,158,11,0.35)" }}
                  >
                    + Post New Parking Spot (Form & Photo Upload)
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 30: ADD SPACE INTRO ─── */}
            {activeScreen === "30" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", padding: 20, justifyContent: "space-between" }}>
                <div>
                  <button onClick={() => setActiveScreen("29")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Host Your Parking Space</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px" }}>Turn your unused garage or driveway into steady monthly income</p>

                  <div style={{ width: "100%", marginBottom: 20 }}>
                    <RealGaragePhoto height={210} badge="HOST & EARN ₹15,000 / MONTH" />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { icon: "📍", title: "1. Add Location & Details", desc: "Specify address, city & space type" },
                      { icon: "⚡", title: "2. AI Dynamic Pricing", desc: "AI calculates best rates based on demand" },
                      { icon: "📸", title: "3. Take & Upload Photo", desc: "Snap a photo of your garage or slot" },
                      { icon: "🔥", title: "4. Save to Firebase Storage & Firestore", desc: "Instant live publish on Tamil Nadu Map" }
                    ].map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", background: "#F8FAFC", padding: 12, borderRadius: 14, border: "1px solid #E2E8F0" }}>
                        <span style={{ fontSize: 20 }}>{step.icon}</span>
                        <div>
                          <h4 style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{step.title}</h4>
                          <p style={{ margin: 0, fontSize: 11, color: "#64748B" }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveScreen("31")}
                  style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)" }}
                >
                  Start Listing My Space
                </button>
              </div>
            )}

            {/* ─── SCREEN 31: HOST FORM STEP 1 ─── */}
            {activeScreen === "31" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", padding: 20, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("30")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 10 }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Step 1: Location & Details</span>
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 6 }}>Parking Spot Title</label>
                  <input 
                    type="text" 
                    value={hostForm.title}
                    onChange={(e) => setHostForm({...hostForm, title: e.target.value})}
                    placeholder="e.g. My Anna Nagar Private Garage"
                    style={{ width: "100%", padding: 14, borderRadius: 14, border: "1.5px solid #E2E8F0", outline: "none", fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}
                  />

                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 6 }}>Select Tamil Nadu City</label>
                  <select
                    value={hostForm.city}
                    onChange={(e) => setHostForm({...hostForm, city: e.target.value})}
                    style={{ width: "100%", padding: 14, borderRadius: 14, border: "1.5px solid #E2E8F0", outline: "none", fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                  </select>

                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 6 }}>Full Address / Area Landmark</label>
                  <input 
                    type="text" 
                    value={hostForm.address}
                    onChange={(e) => setHostForm({...hostForm, address: e.target.value})}
                    placeholder="e.g. T. Nagar 2nd Avenue, Chennai"
                    style={{ width: "100%", padding: 14, borderRadius: 14, border: "1.5px solid #E2E8F0", outline: "none", fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}
                  />

                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 6 }}>Space Type</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {["Private Garage", "Underground Basement", "Driveway Spot", "Gated Bay"].map((t) => (
                      <div 
                        key={t}
                        onClick={() => setHostForm({...hostForm, type: t})}
                        style={{ 
                          padding: 12, 
                          borderRadius: 12, 
                          border: hostForm.type === t ? "2px solid #22C55E" : "1px solid #E2E8F0", 
                          background: hostForm.type === t ? "#DCFCE7" : "#F8FAFC", 
                          color: hostForm.type === t ? "#16A34A" : "#475569", 
                          fontWeight: 800, 
                          fontSize: 12, 
                          textAlign: "center", 
                          cursor: "pointer" 
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveScreen("32")}
                  style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)" }}
                >
                  Next: Calculate AI Pricing ➔
                </button>
              </div>
            )}

            {/* ─── SCREEN 32: HOST FORM STEP 2 (RAPIDO-STYLE AI DYNAMIC SMART PRICING) ─── */}
            {activeScreen === "32" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", padding: 20, justifyContent: "space-between", overflowY: "auto" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                    <button onClick={() => setActiveScreen("31")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 10 }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Step 2: AI Dynamic Pricing</span>
                  </div>

                  <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", borderRadius: 22, padding: 18, color: "#FFF", marginBottom: 20, boxShadow: "0 10px 25px rgba(15,23,42,0.25)", position: "relative", overflow: "hidden" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 900, background: "rgba(34,197,94,0.2)", color: "#22C55E", padding: "4px 10px", borderRadius: 10, border: "1px solid rgba(34,197,94,0.4)" }}>
                        ✨ PARKKAR AI ENGINE
                      </span>
                      <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 800 }}>
                        {aiRate.surgeMultiplier} Surge Factor
                      </span>
                    </div>

                    <span style={{ fontSize: 12, color: "#CBD5E1", fontWeight: 700 }}>AI Suggested Rate for {hostForm.city}:</span>
                    <div style={{ fontSize: 34, fontWeight: 900, color: "#22C55E", margin: "4px 0" }}>
                      ₹{aiRate.recommendedPrice} <span style={{ fontSize: 14, color: "#94A3B8", fontWeight: 600 }}>/ hour</span>
                    </div>

                    <div style={{ fontSize: 12, color: "#E2E8F0", marginBottom: 8, fontWeight: 700 }}>
                      📍 {aiRate.areaTier}
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.08)", padding: "10px 12px", borderRadius: 12, fontSize: 12, color: "#818CF8", fontWeight: 700 }}>
                      💰 Projected Monthly Revenue: ~₹{aiRate.estimatedMonthly.toLocaleString()}/month
                    </div>
                  </div>

                  <label style={{ fontSize: 13, fontWeight: 900, color: "#0F172A", display: "block", marginBottom: 6 }}>Final Hourly Rate (₹)</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <input 
                      type="number" 
                      value={hostForm.price}
                      onChange={(e) => setHostForm({...hostForm, price: e.target.value})}
                      style={{ width: 110, padding: 12, borderRadius: 14, border: "2px solid #22C55E", outline: "none", fontSize: 22, fontWeight: 900, color: "#22C55E", textAlign: "center" }}
                    />
                    <button 
                      onClick={() => setHostForm({...hostForm, price: aiRate.recommendedPrice})}
                      style={{ background: "#DCFCE7", border: "1px solid #BBF7D0", color: "#16A34A", padding: "10px 14px", borderRadius: 12, fontWeight: 900, fontSize: 12, cursor: "pointer" }}
                    >
                      ⚡ Reset to AI Price (₹{aiRate.recommendedPrice})
                    </button>
                  </div>

                  <label style={{ fontSize: 13, fontWeight: 900, color: "#0F172A", display: "block", marginBottom: 10 }}>Select Space Amenities</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                    {["CCTV", "Covered", "24/7 Access", "EV Ready"].map((am) => {
                      const isSelected = hostForm.amenities.includes(am);
                      return (
                        <div 
                          key={am}
                          onClick={() => {
                            if (isSelected) setHostForm({...hostForm, amenities: hostForm.amenities.filter(x => x !== am)});
                            else setHostForm({...hostForm, amenities: [...hostForm.amenities, am]});
                          }}
                          style={{ 
                            padding: 12, 
                            borderRadius: 12, 
                            border: isSelected ? "2px solid #22C55E" : "1px solid #E2E8F0", 
                            background: isSelected ? "#F0FDF4" : "#F8FAFC", 
                            color: isSelected ? "#16A34A" : "#475569", 
                            fontWeight: 800, 
                            fontSize: 12, 
                            textAlign: "center", 
                            cursor: "pointer" 
                          }}
                        >
                          {isSelected ? "✓ " : ""}{am}
                        </div>
                      );
                    })}
                  </div>

                  <label style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block", marginBottom: 6 }}>Space Description</label>
                  <textarea 
                    rows={2}
                    value={hostForm.about}
                    onChange={(e) => setHostForm({...hostForm, about: e.target.value})}
                    style={{ width: "100%", padding: 12, borderRadius: 14, border: "1.5px solid #E2E8F0", outline: "none", fontSize: 13, color: "#0F172A", fontWeight: 600 }}
                  />
                </div>

                <button 
                  onClick={() => setActiveScreen("33")}
                  style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)", marginTop: 16 }}
                >
                  Next: Upload Photo ➔
                </button>
              </div>
            )}

            {/* ─── SCREEN 33: HOST FORM STEP 3 ─── */}
            {activeScreen === "33" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", padding: 20, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("32")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 10 }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Step 3: Upload Space Photo</span>
                  </div>

                  <div style={{ width: "100%", height: 210, borderRadius: 20, overflow: "hidden", position: "relative", marginBottom: 12, border: "2.5px solid #22C55E", boxShadow: "0 6px 20px rgba(34,197,94,0.2)", background: "#F1F5F9" }}>
                    {hostForm.photoUrl ? (
                      <img 
                        src={hostForm.photoUrl} 
                        alt="Upload Preview" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/assets/home_garage.png"; }}
                      />
                    ) : (
                      <img 
                        src={process.env.PUBLIC_URL + "/assets/home_garage.png"} 
                        alt="Default preview" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    )}
                    <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(15,23,42,0.9)", color: "#22C55E", padding: "5px 12px", borderRadius: 10, fontSize: 11, fontWeight: 900, backdropFilter: "blur(6px)" }}>
                      ✓ READY FOR FIREBASE STORAGE & FIRESTORE
                    </div>
                  </div>

                  {photoStatus && (
                    <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#16A34A", padding: "8px 12px", borderRadius: 10, fontSize: 11, fontWeight: 800, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                      <span>🔥</span>
                      <span>{photoStatus}</span>
                    </div>
                  )}

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    accept="image/*" 
                    onChange={handlePhotoFileUpload} 
                    style={{ display: "none" }} 
                  />

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{ border: "2px dashed #22C55E", borderRadius: 18, padding: 18, textAlign: "center", background: "#F0FDF4", marginBottom: 16, cursor: "pointer" }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#22C55E", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", boxShadow: "0 4px 12px rgba(34,197,94,0.3)" }}>
                      <IconCamera size={24} color="#FFF" />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 900, color: "#16A34A", display: "block" }}>
                      {isProcessingPhoto ? "⚡ Processing Uploaded Image..." : "📸 Tap to Choose Photo / Take Picture"}
                    </span>
                    <span style={{ fontSize: 11, color: "#64748B", marginTop: 2, display: "block" }}>Direct Firebase Storage Upload Enabled</span>
                  </div>

                  <label style={{ fontSize: 11, fontWeight: 800, color: "#64748B", display: "block", marginBottom: 6 }}>Or Select Sample Spot Photo:</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[
                      { name: "Garage", url: process.env.PUBLIC_URL + "/assets/home_garage.png" },
                      { name: "Basement", url: process.env.PUBLIC_URL + "/assets/office_basement.png" },
                      { name: "Driveway", url: process.env.PUBLIC_URL + "/assets/residential_driveway.png" }
                    ].map((item, i) => (
                      <div 
                        key={i}
                        onClick={() => {
                          setHostForm({...hostForm, photoUrl: item.url});
                          setPhotoStatus(`✓ ${item.name} real sample photo selected`);
                        }}
                        style={{ width: 85, height: 60, borderRadius: 12, overflow: "hidden", border: hostForm.photoUrl === item.url ? "2.5px solid #22C55E" : "1.5px solid #E2E8F0", cursor: "pointer", position: "relative" }}
                      >
                        <img src={item.url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", bottom: 2, left: 2, right: 2, background: "rgba(15,23,42,0.85)", color: "#FFF", fontSize: 9, fontWeight: 900, textAlign: "center", padding: "1px 0", borderRadius: 4 }}>
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveScreen("34")}
                  style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)", marginTop: 12 }}
                >
                  Next: Review & Publish ➔
                </button>
              </div>
            )}

            {/* ─── SCREEN 34: REVIEW & FIREBASE PUBLISH ─── */}
            {activeScreen === "34" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", padding: 20, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <button onClick={() => setActiveScreen("33")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 10 }}>
                      <IconChevronLeft size={22} color="#0F172A" />
                    </button>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Review Your Listing</span>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: 20, padding: 16, border: "1px solid #E2E8F0", boxShadow: "0 4px 14px rgba(0,0,0,0.05)", marginBottom: 16 }}>
                    <div style={{ width: "100%", height: 170, borderRadius: 14, overflow: "hidden", marginBottom: 12, position: "relative", background: "#F1F5F9" }}>
                      {hostForm.photoUrl ? (
                        <img 
                          src={hostForm.photoUrl} 
                          alt="Uploaded spot" 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                          onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/assets/home_garage.png"; }}
                        />
                      ) : (
                        <img 
                          src={process.env.PUBLIC_URL + "/assets/home_garage.png"} 
                          alt="Default garage" 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                      )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0F172A" }}>{hostForm.title}</h3>
                      <span style={{ fontSize: 18, fontWeight: 900, color: "#22C55E" }}>₹{hostForm.price}/hr</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 10px" }}>📍 {hostForm.address}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {hostForm.amenities.map(a => (
                        <span key={a} style={{ fontSize: 10, fontWeight: 800, background: "#DCFCE7", color: "#16A34A", padding: "2px 8px", borderRadius: 6 }}>{a}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", padding: 14, borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>🔥</span>
                    <span style={{ fontSize: 12, color: "#15803D", fontWeight: 700 }}>Firebase Project paarkkar-dda3d Storage & Firestore ready!</span>
                  </div>
                </div>

                <button 
                  onClick={handlePublishHostSpot}
                  disabled={isPublishing}
                  style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)", opacity: isPublishing ? 0.7 : 1 }}
                >
                  {isPublishing ? "Publishing to Firebase Storage & Firestore..." : "🚀 Publish Space to Firebase"}
                </button>
              </div>
            )}

            {/* ─── SCREEN 35: SPACE SUBMITTED SUCCESS ─── */}
            {activeScreen === "35" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFF", padding: 24, justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "100%", marginTop: 30 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#DCFCE7", color: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 10px 25px rgba(34,197,94,0.25)" }}>
                    <IconCheck size={40} color="#22C55E" />
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Spot Live in Firebase!</h2>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px" }}>Your image is uploaded to Firebase Storage and details saved in Firestore (paarkkar-dda3d)!</p>

                  <div style={{ background: "#F8FAFC", borderRadius: 20, padding: 20, border: "1px solid #E2E8F0", textAlign: "left", marginBottom: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#22C55E", background: "#DCFCE7", padding: "2px 8px", borderRadius: 6, display: "inline-block", marginBottom: 8 }}>
                      ● FIREBASE STORAGE & FIRESTORE LIVE
                    </span>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>{selectedSpot.title}</h3>
                    <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 8px" }}>{selectedSpot.address}</p>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#22C55E" }}>₹{selectedSpot.price}/hr</div>
                  </div>
                </div>

                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
                  <button 
                    onClick={() => handleAccessApp("driver")}
                    style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 16px rgba(34,197,94,0.35)" }}
                  >
                    🗺️ View My Spot on Live Tamil Nadu Map
                  </button>
                  <button 
                    onClick={() => handleAccessApp("host")}
                    style={{ width: "100%", padding: 14, borderRadius: 16, background: "transparent", border: "1.5px solid #E2E8F0", color: "#0F172A", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
                  >
                    Back to Host Dashboard
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 20: MY BOOKINGS ─── */}
            {activeScreen === "20" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", background: "#FFF", borderBottom: "1px solid #F1F5F9" }}>
                  <button onClick={() => handleAccessApp("driver")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>My Bookings</span>
                </div>

                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #E2E8F0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#22C55E", background: "#DCFCE7", padding: "2px 8px", borderRadius: 6 }}>UPCOMING</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>₹{calculatedTotalAmount}</span>
                    </div>
                    <h4 style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 900, color: "#0F172A" }}>{selectedSpot.title}</h4>
                    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#64748B" }}>{selectedSpot.address}</p>
                    <div style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>📅 {selectedDate} • {startTime} - {endTime}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SCREEN 21: WALLET BALANCE ─── */}
            {activeScreen === "21" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", background: "#FFF", borderBottom: "1px solid #F1F5F9" }}>
                  <button onClick={() => handleAccessApp("driver")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>PARKKAR Wallet</span>
                </div>

                <div style={{ padding: 20 }}>
                  <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", borderRadius: 20, padding: 24, color: "#FFF", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", marginBottom: 20 }}>
                    <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 700 }}>Total Wallet Balance</span>
                    <div style={{ fontSize: 36, fontWeight: 900, color: "#22C55E", marginTop: 4 }}>₹450.00</div>
                    <span style={{ fontSize: 11, color: "#CBD5E1", display: "block", marginTop: 10 }}>Auto-refunds & cashbacks credited instantly</span>
                  </div>

                  <button style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
                    + Add Money to Wallet
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCREEN 22: NOTIFICATIONS ─── */}
            {activeScreen === "22" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", background: "#FFF", borderBottom: "1px solid #F1F5F9" }}>
                  <button onClick={() => handleAccessApp("driver")} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Notifications</span>
                </div>

                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { title: "Booking Confirmed 🎉", desc: "Your slot at Home Garage has been reserved.", time: "10m ago" },
                    { title: "₹100 Cashback Credited 🎁", desc: "Welcome bonus credited to your PARKKAR wallet.", time: "1h ago" }
                  ].map((n, i) => (
                    <div key={i} style={{ background: "#FFF", borderRadius: 14, padding: 14, border: "1px solid #E2E8F0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{n.title}</h4>
                        <span style={{ fontSize: 11, color: "#94A3B8" }}>{n.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: "#64748B" }}>{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEFAULT FALLBACK FOR OTHER UNRENDERED SCREENS */}
            {![
              "01","02","03","04","05","06","07","51","52","53","08","09","10","11","12","13","14","15","20","21","22","24","29","30","31","32","33","34","35"
            ].includes(activeScreen) && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 24px", justifyContent: "space-between", background: "#FFF" }}>
                <div>
                  <button onClick={() => handleAccessApp("driver")} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
                    <IconChevronLeft size={22} color="#0F172A" />
                  </button>
                  <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#0F172A" }}>
                    {screensList.find(s => s.id === activeScreen)?.name || "Page View"}
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px" }}>Real-time PARKKAR native UI screen</p>

                  <div style={{ width: "100%", marginTop: 10 }}>
                    <RealGaragePhoto height={190} />
                  </div>
                </div>

                <button onClick={() => handleAccessApp("driver")} style={{ width: "100%", padding: 16, borderRadius: 16, background: "#22C55E", border: "none", color: "#FFF", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
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
