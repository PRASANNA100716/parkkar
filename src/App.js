import { useState, useEffect, useRef, useCallback } from "react";
import FullShowcaseBoard from "./components/FullShowcaseBoard";

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg: "#F4F6FA",
  card: "#FFFFFF",
  dark: "#1A2332",
  green: "#25C05A",
  greenDark: "#1a9645",
  greenLight: "#E8F9EF",
  amber: "#F59E0B",
  red: "#EF4444",
  gray1: "#F8FAFC",
  gray2: "#E2E8F0",
  gray3: "#94A3B8",
  gray4: "#64748B",
  white: "#FFFFFF",
  shadow: "0 2px 12px rgba(26,35,50,0.09)",
  shadowMd: "0 4px 24px rgba(26,35,50,0.13)",
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

const ALL_PLACES = [
  {
    id: "tn1",
    name: "Meenakshi Amman Temple",
    city: "Madurai",
    lat: 9.9195,
    lng: 78.1193,
  },
  {
    id: "tn2",
    name: "Marina Beach",
    city: "Chennai",
    lat: 13.05,
    lng: 80.2824,
  },
  {
    id: "tn3",
    name: "Brihadeeswarar Temple",
    city: "Thanjavur",
    lat: 10.7828,
    lng: 79.1318,
  },
  {
    id: "tn4",
    name: "Ooty Botanical Garden",
    city: "Ooty",
    lat: 11.4102,
    lng: 76.695,
  },
  {
    id: "tn5",
    name: "Velankanni Church",
    city: "Nagapattinam",
    lat: 10.6867,
    lng: 79.852,
  },
  {
    id: "tn6",
    name: "Coimbatore City Centre",
    city: "Coimbatore",
    lat: 11.0017,
    lng: 76.9673,
  },
  {
    id: "tn7",
    name: "Trichy Rock Fort",
    city: "Tiruchirappalli",
    lat: 10.8155,
    lng: 78.6934,
  },
  {
    id: "tn8",
    name: "Kanyakumari Shoreline",
    city: "Kanyakumari",
    lat: 8.0883,
    lng: 77.5385,
  },
  {
    id: "tn9",
    name: "T. Nagar Shopping District",
    city: "Chennai",
    lat: 13.0418,
    lng: 80.2341,
  },
  {
    id: "tn10",
    name: "Anna Salai",
    city: "Chennai",
    lat: 13.0569,
    lng: 80.2512,
  },
  {
    id: "tn11",
    name: "Mahabalipuram Shore Temple",
    city: "Mahabalipuram",
    lat: 12.6269,
    lng: 80.1927,
  },
];

const HOSTS = [
  {
    id: "h1",
    name: "Murugan S.",
    avatar: "https://i.pravatar.cc/150?img=11",
    phone: "98421 33210",
    rating: 4.9,
    reviews: 112,
  },
  {
    id: "h2",
    name: "Anand R.",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "94432 67890",
    rating: 4.6,
    reviews: 78,
  },
  {
    id: "h3",
    name: "Kavitha P.",
    avatar: "https://i.pravatar.cc/150?img=49",
    phone: "99421 11223",
    rating: 4.8,
    reviews: 43,
  },
  {
    id: "h4",
    name: "Selvam B.",
    avatar: "https://i.pravatar.cc/150?img=14",
    phone: "87654 32109",
    rating: 4.6,
    reviews: 55,
  },
  {
    id: "h5",
    name: "Priya M.",
    avatar: "https://i.pravatar.cc/150?img=47",
    phone: "98765 43210",
    rating: 4.8,
    reviews: 200,
  },
];

const PARKING_SPOTS = [
  {
    id: 1,
    placeId: "tn1",
    name: "West Masi Street Parking",
    host: HOSTS[0],
    price: 20,
    distance: "200m",
    address: "West Masi Street, Near Meenakshi Temple, Madurai",
    area: "Old Town, Madurai",
    type: "Open Lot",
    image:
      "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=600&q=80",
    amenities: ["24/7 Access", "CCTV", "Security Guard"],
    verified: true,
    available: true,
    slots: 8,
    lat: 9.9195,
    lng: 78.119,
  },
  {
    id: 2,
    placeId: "tn2",
    name: "Marina Beachside Parking",
    host: HOSTS[1],
    price: 30,
    distance: "150m",
    address: "Kamarajar Salai, Marina Beach, Chennai",
    area: "Marina, Chennai",
    type: "Open Lot",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80",
    amenities: ["24/7 Access", "CCTV"],
    verified: true,
    available: true,
    slots: 15,
    lat: 13.048,
    lng: 80.279,
  },
  {
    id: 3,
    placeId: "tn6",
    name: "RS Puram Home Driveway",
    host: HOSTS[2],
    price: 25,
    distance: "80m",
    address: "Nehru Street, RS Puram, Coimbatore",
    area: "RS Puram, Coimbatore",
    type: "Driveway",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80",
    amenities: ["Gated", "24/7 Access", "CCTV"],
    verified: true,
    available: true,
    slots: 2,
    lat: 11.002,
    lng: 76.965,
  },
  {
    id: 4,
    placeId: "tn7",
    name: "Rock Fort Terrace Spot",
    host: HOSTS[3],
    price: 18,
    distance: "400m",
    address: "Teppakulam Main Road, Near Rock Fort, Trichy",
    area: "Teppakulam, Trichy",
    type: "Terrace",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    amenities: ["Covered", "CCTV"],
    verified: true,
    available: true,
    slots: 4,
    lat: 10.815,
    lng: 78.69,
  },
  {
    id: 5,
    placeId: "tn9",
    name: "T. Nagar Basement Parking",
    host: HOSTS[4],
    price: 50,
    distance: "50m",
    address: "Pondy Bazaar, T. Nagar, Chennai",
    area: "T. Nagar, Chennai",
    type: "Basement",
    image:
      "https://images.unsplash.com/photo-1478958629394-4d9e4a4f8eff?w=600&q=80",
    amenities: ["Covered", "24/7 Access", "CCTV", "EV Charging", "Security"],
    verified: true,
    available: true,
    slots: 10,
    lat: 13.04,
    lng: 80.233,
  },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.bg}; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  input, button, textarea, select { font-family: 'Plus Jakarta Sans', sans-serif; }
  .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib { display: none !important; }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideUp { from { transform:translateY(100%); opacity:0; } to { transform:translateY(0); opacity:1; } }
  @keyframes scaleIn { from { transform:scale(0.92); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes pulse   { 0%,100% { transform:scale(1); } 50% { transform:scale(1.08); } }
  @keyframes ripple  { 0% { transform:scale(1); opacity:.6; } 100% { transform:scale(3); opacity:0; } }
  @keyframes bounce  { 0%,100% { transform:translateY(0); } 40% { transform:translateY(-8px); } }
  @keyframes ping    { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(1.4); } }
  @keyframes slideDown { from { transform:translateY(-16px); opacity:0; } to { transform:translateY(0); opacity:1; } }
  @keyframes barLoad { from { width:0%; } to { width:100%; } }
  .fu { animation: fadeUp .38s cubic-bezier(.22,.68,0,1.2) both; }
  .su { animation: slideUp .32s cubic-bezier(.22,.68,0,1.2) both; }
  .si { animation: scaleIn .28s cubic-bezier(.22,.68,0,1.2) both; }
  .tb { transition: transform .11s, opacity .11s; cursor: pointer; user-select: none; }
  .tb:active { transform: scale(0.96); opacity: 0.82; }
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = ({ n, s = 22, c = "currentColor", f = false }) => {
  const paths = {
    home: f ? (
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={c} />
    ) : (
      <path
        d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        fill="none"
        stroke={c}
        strokeWidth="1.6"
      />
    ),
    cal: (
      <>
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <line x1="16" y1="2" x2="16" y2="6" stroke={c} strokeWidth="1.6" />
        <line x1="8" y1="2" x2="8" y2="6" stroke={c} strokeWidth="1.6" />
        <line x1="3" y1="10" x2="21" y2="10" stroke={c} strokeWidth="1.6" />
      </>
    ),
    wallet: (
      <>
        <rect
          x="2"
          y="7"
          width="20"
          height="14"
          rx="2"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <circle cx="16" cy="14" r="1.2" fill={c} />
        <path d="M2 10h20" stroke={c} strokeWidth="1.6" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="7" r="4" fill="none" stroke={c} strokeWidth="1.6" />
        <path
          d="M2 21v-1a10 10 0 0 1 20 0v1"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    search: (
      <>
        <circle
          cx="11"
          cy="11"
          r="7"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <line
          x1="16.5"
          y1="16.5"
          x2="22"
          y2="22"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    back: (
      <path
        d="M19 12H5M12 5l-7 7 7 7"
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    star: (
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill={f ? "#F59E0B" : "none"}
        stroke="#F59E0B"
        strokeWidth="1.6"
      />
    ),
    check: (
      <path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" stroke={c} strokeWidth="2" />
        <line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth="2" />
      </>
    ),
    pin: (
      <>
        <path
          d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"
          fill={f ? c : "none"}
          stroke={c}
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="10"
          r="3"
          fill={f ? "white" : "none"}
          stroke={f ? "white" : c}
          strokeWidth="1.6"
        />
      </>
    ),
    bell: (
      <>
        <path
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <path
          d="M13.73 21a2 2 0 0 1-3.46 0"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    shield: (
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        fill="none"
        stroke={c}
        strokeWidth="1.6"
      />
    ),
    parking: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <path
          d="M9 17V7h4a3 3 0 0 1 0 6H9"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    phone: (
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.97-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        fill="none"
        stroke={c}
        strokeWidth="1.6"
      />
    ),
    verify: (
      <>
        <path
          d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <polyline
          points="22 4 12 14.01 9 11.01"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    arr: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth="2" />
        <polyline
          points="12 5 19 12 12 19"
          fill="none"
          stroke={c}
          strokeWidth="2"
        />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" stroke={c} strokeWidth="2" />
        <line x1="6" y1="6" x2="18" y2="18" stroke={c} strokeWidth="2" />
      </>
    ),
    locate: (
      <>
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <line x1="12" y1="2" x2="12" y2="5" stroke={c} strokeWidth="1.6" />
        <line x1="12" y1="19" x2="12" y2="22" stroke={c} strokeWidth="1.6" />
        <line x1="2" y1="12" x2="5" y2="12" stroke={c} strokeWidth="1.6" />
        <line x1="19" y1="12" x2="22" y2="12" stroke={c} strokeWidth="1.6" />
      </>
    ),
    car: (
      <>
        <rect
          x="1"
          y="9"
          width="22"
          height="10"
          rx="2"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <path
          d="M5 9V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <circle cx="7" cy="19" r="2" fill="none" stroke={c} strokeWidth="1.6" />
        <circle
          cx="17"
          cy="19"
          r="2"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    cam: (
      <>
        <path
          d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="13"
          r="4"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    upload: (
      <>
        <polyline
          points="16 16 12 12 8 16"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <line x1="12" y1="12" x2="12" y2="21" stroke={c} strokeWidth="1.6" />
        <path
          d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    host: (
      <>
        <rect
          x="3"
          y="11"
          width="18"
          height="11"
          rx="1"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <path
          d="M7 11V7a5 5 0 0 1 10 0v4"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    refer: (
      <>
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <circle cx="9" cy="7" r="4" fill="none" stroke={c} strokeWidth="1.6" />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    safety: (
      <>
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <polyline
          points="9 12 11 14 15 10"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    chat: (
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        fill="none"
        stroke={c}
        strokeWidth="1.6"
      />
    ),
    edit: (
      <>
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    lock: (
      <>
        <rect
          x="3"
          y="11"
          width="18"
          height="11"
          rx="2"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <path
          d="M7 11V7a5 5 0 0 1 10 0v4"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
    info: (
      <>
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <line x1="12" y1="8" x2="12" y2="12" stroke={c} strokeWidth="1.6" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.4" stroke={c} />
      </>
    ),
    timer: (
      <>
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
        <polyline
          points="12 7 12 12 15 15"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
        />
      </>
    ),
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {paths[n] || null}
    </svg>
  );
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Btn = ({
  children,
  onClick,
  disabled = false,
  ghost = false,
  danger = false,
  style = {},
}) => (
  <button
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    className={disabled ? "" : "tb"}
    style={{
      width: "100%",
      height: 52,
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
      border: ghost ? `2px solid ${T.green}` : "none",
      background: disabled
        ? T.gray2
        : danger
        ? T.red
        : ghost
        ? "transparent"
        : T.green,
      color: disabled ? T.gray3 : ghost ? T.green : T.white,
      boxShadow:
        disabled || ghost ? "none" : `0 4px 14px ${danger ? T.red : T.green}40`,
      ...style,
    }}
  >
    {children}
  </button>
);

const Tag = ({ children, bg = T.greenLight, color = T.green }) => (
  <span
    style={{
      background: bg,
      color,
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 99,
    }}
  >
    {children}
  </span>
);

const Avatar = ({ src, size = 44, online = false }) => (
  <div style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
    <img
      src={src}
      alt="av"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: `2px solid ${T.white}`,
        boxShadow: T.shadow,
        display: "block",
      }}
      onError={(e) => {
        e.target.src = `https://ui-avatars.com/api/?size=${size}&background=25C05A&color=fff&name=PK`;
      }}
    />
    {online && (
      <div
        style={{
          position: "absolute",
          bottom: 1,
          right: 1,
          width: 11,
          height: 11,
          borderRadius: "50%",
          background: T.green,
          border: `2px solid ${T.white}`,
        }}
      />
    )}
  </div>
);

const Card = ({ children, style = {}, onClick, className = "" }) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      background: T.white,
      borderRadius: 16,
      boxShadow: T.shadow,
      ...style,
    }}
  >
    {children}
  </div>
);

const Toast = ({ msg, visible }) =>
  visible ? (
    <div
      className="su"
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: T.dark,
        color: T.white,
        borderRadius: 12,
        padding: "12px 20px",
        fontSize: 13,
        fontWeight: 600,
        zIndex: 999,
        whiteSpace: "nowrap",
        boxShadow: T.shadowMd,
      }}
    >
      {msg}
    </div>
  ) : null;

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ active, onNav, mode = "user" }) => {
  const tabs =
    mode === "host"
      ? [
          { k: "hostDashboard", l: "Dashboard", i: "home" },
          { k: "hostBookings", l: "Requests", i: "bell" },
          { k: "hostWallet", l: "Wallet", i: "wallet" },
          { k: "profile", l: "Profile", i: "person" },
        ]
      : [
          { k: "home", l: "Home", i: "home" },
          { k: "bookings", l: "Bookings", i: "cal" },
          { k: "wallet", l: "Wallet", i: "wallet" },
          { k: "profile", l: "Profile", i: "person" },
        ];
  return (
    <div
      style={{
        display: "flex",
        background: T.white,
        borderTop: `1px solid ${T.gray2}`,
        padding: "8px 0 20px",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.07)",
        flexShrink: 0,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.k}
          onClick={() => onNav(t.k)}
          className="tb"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: active === t.k ? T.green : T.gray3,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: active === t.k ? T.greenLight : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background .2s",
            }}
          >
            <Ic
              n={t.i}
              s={20}
              c={active === t.k ? T.green : T.gray3}
              f={active === t.k}
            />
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {t.l}
          </span>
        </button>
      ))}
    </div>
  );
};

// ─── SPLASH ───────────────────────────────────────────────────────────────────
const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      style={{
        height: "100%",
        background: `linear-gradient(145deg, #0b131f 0%, #16283d 50%, #0d1e30 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 180 + i * 120,
            height: 180 + i * 120,
            borderRadius: "50%",
            border: `1px solid rgba(37,192,90,${0.14 - i * 0.03})`,
            animation: `pulse ${2.5 + i * 0.4}s ease-in-out infinite ${i * 0.3}s`,
            boxShadow: i === 0 ? `0 0 40px rgba(37,192,90,0.15)` : "none",
          }}
        />
      ))}
      <div className="fu" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 26,
            background: `linear-gradient(135deg, ${T.green} 0%, #1ba349 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 22px",
            boxShadow: `0 14px 44px rgba(37,192,90,0.55)`,
            transform: "scale(1.05)",
          }}
        >
          <Ic n="parking" s={48} c={T.white} />
        </div>
        <h1
          style={{
            color: T.white,
            fontSize: 46,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            margin: "0 0 6px",
            background: `linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          parkkar
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            margin: 0,
          }}
        >
          India's #1 P2P Parking Network
        </p>
      </div>
      <div style={{ display: "flex", gap: 8, zIndex: 2, marginTop: 8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: T.green,
              animation: `ping 1.4s ease ${i * 0.25}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [gen, setGen] = useState("");
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const t = setInterval(() => setTimer((v) => v - 1), 1000);
      return () => clearInterval(t);
    }
  }, [step, timer]);

  const sendOtp = () => {
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit number");
      return;
    }
    setLoading(true);
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGen(code);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setTimer(30);
      setError("");
    }, 900);
  };

  const handleQuickGuestLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin({ phone: "9876543210", name: "Guest User" });
    }, 600);
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) refs[i + 1].current?.focus();
    if (!val && i > 0) refs[i - 1].current?.focus();
    setError("");
  };

  const verifyOtp = () => {
    if (otp.join("").length !== 4) {
      setError("Enter all 4 digits");
      return;
    }
    if (otp.join("") !== gen) {
      setError("Incorrect OTP. Try again.");
      setOtp(["", "", "", ""]);
      refs[0].current?.focus();
      return;
    }
    setLoading(true);
    setTimeout(() => onLogin({ phone, name: "Yuvan" }), 700);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.white,
        minHeight: "100%",
        overflowY: "auto",
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          background: `linear-gradient(160deg, #0d1726 0%, #1A2332 50%, #11253c 100%)`,
          padding: "36px 24px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(37,192,90,0.18)",
            filter: "blur(40px)",
          }}
        />

        {/* Live Network Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(37,192,90,0.15)",
            border: "1px solid rgba(37,192,90,0.3)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            color: T.green,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.green,
              boxShadow: `0 0 8px ${T.green}`,
            }}
          />
          50,000+ VERIFIED SPOTS ACTIVE
        </div>

        {/* Logo Card */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${T.green} 0%, #189842 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
            boxShadow: `0 10px 30px rgba(37,192,90,0.45)`,
          }}
        >
          <Ic n="parking" s={36} c={T.white} />
        </div>

        <h1
          style={{
            color: T.white,
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          parkkar
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "4px 0 0",
          }}
        >
          India's Peer-to-Peer Parking Marketplace
        </p>
      </div>

      {/* Main Body */}
      <div
        style={{
          flex: 1,
          padding: "24px 22px 32px",
          background: T.white,
          borderRadius: "24px 24px 0 0",
          marginTop: -18,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Promotional Ad Banner Card */}
        <div
          style={{
            background: `linear-gradient(135deg, #101c2c 0%, #1c2e44 100%)`,
            borderRadius: 16,
            padding: "16px 18px",
            marginBottom: 24,
            boxShadow: `0 8px 24px rgba(16,28,44,0.12)`,
            border: `1px solid rgba(255,255,255,0.08)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -10,
              bottom: -10,
              opacity: 0.1,
              transform: "rotate(-15deg)",
            }}
          >
            <Ic n="parking" s={100} c={T.white} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span
              style={{
                background: T.amber,
                color: T.dark,
                fontSize: 10,
                fontWeight: 900,
                padding: "2px 8px",
                borderRadius: 6,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              PROMO
            </span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600 }}>
              Rent Your Spot & Earn Money
            </span>
          </div>
          <h4 style={{ color: T.white, fontSize: 15, fontWeight: 800, margin: "0 0 8px" }}>
            Got an Empty Gate, Plot or Driveway? 🚗
          </h4>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, margin: "0 0 12px", lineHeight: 1.4 }}>
            List your space on Parkkar & earn up to <strong>₹15,000/month</strong> with zero hassle!
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["🔒 Insured", "⚡ EV Friendly", "💰 Daily Payouts"].map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#E2E8F0",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 6,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {step === "phone" ? (
          <div className="fu">
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: T.dark,
                margin: "0 0 4px",
              }}
            >
              Log in or Sign up 👋
            </h2>
            <p style={{ color: T.gray4, fontSize: 13, margin: "0 0 20px" }}>
              Enter your mobile number to discover & book parking
            </p>

            <div
              style={{
                display: "flex",
                borderRadius: 14,
                overflow: "hidden",
                border: `1.5px solid ${error ? T.red : T.gray2}`,
                marginBottom: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  background: T.gray1,
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  borderRight: `1px solid ${T.gray2}`,
                }}
              >
                <span style={{ fontSize: 16 }}>🇮🇳</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: T.dark }}>
                  +91
                </span>
              </div>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                placeholder="98765 43210"
                type="tel"
                maxLength={10}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "14px 16px",
                  fontSize: 17,
                  background: "transparent",
                  color: T.dark,
                  fontWeight: 600,
                }}
              />
            </div>

            {error && (
              <p style={{ color: T.red, fontSize: 13, margin: "4px 0 10px" }}>
                {error}
              </p>
            )}

            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              <Btn onClick={sendOtp} disabled={loading}>
                {loading ? "Sending OTP…" : "Continue with Mobile →"}
              </Btn>

              {/* Quick Guest Access Button */}
              <button
                onClick={handleQuickGuestLogin}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 14,
                  background: T.gray1,
                  border: `1.5px dashed ${T.gray2}`,
                  color: T.dark,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.15s",
                }}
              >
                <span>⚡</span>
                <span>One-Tap Quick Demo Access</span>
              </button>
            </div>

            {/* Security Trust Badges */}
            <div
              style={{
                marginTop: 28,
                paddingTop: 18,
                borderTop: `1px solid ${T.gray2}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                color: T.gray4,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              <span>🔒 256-bit Encrypted</span>
              <span>•</span>
              <span>⚡ Instant Confirmation</span>
              <span>•</span>
              <span>⭐ 4.9 Rating</span>
            </div>
          </div>
        ) : (
          <div className="su">
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: T.dark,
                margin: "0 0 4px",
              }}
            >
              Verify your number
            </h2>
            <p style={{ color: T.gray4, fontSize: 13, margin: "0 0 18px" }}>
              OTP sent to +91 {phone}
            </p>
            <div
              style={{
                background: T.greenLight,
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Ic n="info" s={16} c={T.green} />
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: T.greenDark,
                    fontWeight: 600,
                  }}
                >
                  Demo OTP:{" "}
                  <strong style={{ fontSize: 18, letterSpacing: "0.1em" }}>
                    {gen}
                  </strong>
                </p>
              </div>
              <button
                onClick={() => {
                  setOtp(gen.split(""));
                  setError("");
                }}
                style={{
                  background: T.green,
                  color: T.white,
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Autofill
              </button>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  value={d}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !d && i > 0)
                      refs[i - 1].current?.focus();
                    if (e.key === "Enter") verifyOtp();
                  }}
                  style={{
                    width: "22%",
                    height: 62,
                    textAlign: "center",
                    fontSize: 28,
                    fontWeight: 800,
                    border: `2px solid ${d ? T.green : T.gray2}`,
                    borderRadius: 12,
                    outline: "none",
                    background: d ? T.greenLight : T.white,
                    color: T.dark,
                    transition: "all .15s",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <span style={{ color: T.gray4, fontSize: 13 }}>
                Didn't receive?
              </span>
              {timer > 0 ? (
                <span style={{ color: T.gray3, fontSize: 13, fontWeight: 600 }}>
                  Resend in {timer}s
                </span>
              ) : (
                <button
                  onClick={() => {
                    setOtp(["", "", "", ""]);
                    sendOtp();
                  }}
                  style={{
                    color: T.green,
                    fontSize: 13,
                    fontWeight: 700,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Resend OTP
                </button>
              )}
            </div>
            {error && (
              <p style={{ color: T.red, fontSize: 13, marginBottom: 10 }}>
                {error}
              </p>
            )}
            <Btn onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying…" : "Verify OTP →"}
            </Btn>
            <button
              onClick={() => {
                setStep("phone");
                setOtp(["", "", "", ""]);
                setError("");
              }}
              style={{
                marginTop: 12,
                width: "100%",
                background: "none",
                border: "none",
                color: T.gray4,
                fontSize: 13,
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              ← Change number
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAP SCREEN ───────────────────────────────────────────────────────────────
const MapScreen = ({ onSelectParking, onNav }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState(null);
  const [nearbySpots, setNearbySpots] = useState([]);
  const [matching, setMatching] = useState(false);
  const [matched, setMatched] = useState(null);

  const filtered = ALL_PLACES.filter(
    (p) =>
      query.length > 0 &&
      (p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.city.toLowerCase().includes(query.toLowerCase()))
  );

  const flyTo = useCallback((lat, lng, zoom = 14) => {
    if (mapRef.current)
      mapRef.current.flyTo({ center: [lng, lat], zoom, speed: 1.5, pitch: 48 });
  }, []);

  const confirmSpot = useCallback(
    (spot) => {
      setMatching(true);
      setNearbySpots([]);
      flyTo(spot.lat, spot.lng, 16);
      setTimeout(() => {
        setMatching(false);
        setMatched({ ...spot, eta: "3 mins" });
      }, 2800);
    },
    [flyTo]
  );

  useEffect(() => {
    if (mapRef.current) return;
    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js";
    script.onload = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
      document.head.appendChild(link);
      setTimeout(() => {
        if (!mapContainer.current) return;
        window.mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new window.mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [80.2707, 13.0827],
          zoom: 11,
          pitch: 45,
        });
        map.on("load", () => {
          // 3D buildings
          const layers = map.getStyle().layers;
          const labelLayerId = layers.find(
            (l) => l.type === "symbol" && l.layout["text-field"]
          )?.id;
          map.addLayer(
            {
              id: "3d-buildings",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 13,
              paint: {
                "fill-extrusion-color": "#E8F5E9",
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  13,
                  0,
                  13.05,
                  ["get", "height"],
                ],
                "fill-extrusion-base": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  13,
                  0,
                  13.05,
                  ["get", "min_height"],
                ],
                "fill-extrusion-opacity": 0.7,
              },
            },
            labelLayerId
          );
          setMapLoaded(true);

          // Parking markers
          PARKING_SPOTS.forEach((spot) => {
            const el = document.createElement("div");
            el.innerHTML = `<div style="background:#25C05A;color:white;font-weight:800;font-size:12px;font-family:'Plus Jakarta Sans',sans-serif;padding:6px 12px;border-radius:20px;cursor:pointer;box-shadow:0 4px 14px rgba(37,192,90,0.5);border:2px solid white;">₹${spot.price}/hr</div>`;
            el.onclick = () => confirmSpot(spot);
            const marker = new window.mapboxgl.Marker({ element: el })
              .setLngLat([spot.lng, spot.lat])
              .addTo(map);
            markersRef.current.push(marker);
          });

          // User location
          const pulse = document.createElement("div");
          pulse.innerHTML = `<div style="position:relative;width:22px;height:22px;"><div style="position:absolute;inset:0;border-radius:50%;background:rgba(59,130,246,0.22);animation:ripple 2s ease-out infinite;"></div><div style="width:16px;height:16px;border-radius:50%;background:#3B82F6;border:3px solid white;box-shadow:0 2px 8px rgba(59,130,246,0.5);position:absolute;top:3px;left:3px;"></div></div>`;
          new window.mapboxgl.Marker({ element: pulse })
            .setLngLat([80.2707, 13.0827])
            .addTo(map);
        });
        mapRef.current = map;
      }, 200);
    };
    document.head.appendChild(script);
    return () => {
      markersRef.current.forEach((m) => m.remove());
    };
  }, [confirmSpot]);

  const selectPlace = (p) => {
    setDestination(p);
    setQuery(p.name);
    setShowSearch(false);
    setNearbySpots(PARKING_SPOTS.slice(0, 3));
    setMatched(null);
    flyTo(p.lat, p.lng, 13);
  };

  const clearDestination = (e) => {
    e.stopPropagation();
    setDestination(null);
    setNearbySpots([]);
    setMatched(null);
    setQuery("");
  };

  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />

      {!mapLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#E8F5E9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: `3px solid ${T.green}`,
                borderTopColor: "transparent",
                margin: "0 auto 14px",
                animation: "spin .8s linear infinite",
              }}
            />
            <p style={{ color: T.green, fontSize: 14, fontWeight: 600 }}>
              Loading map…
            </p>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          padding: "14px 14px 0",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div
            onClick={() => setShowSearch(true)}
            className="tb"
            style={{
              flex: 1,
              background: T.white,
              borderRadius: 14,
              padding: "13px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: destination ? T.green : T.gray3,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                flex: 1,
                fontSize: 15,
                fontWeight: destination ? 700 : 400,
                color: destination ? T.dark : T.gray3,
                fontFamily: "'Plus Jakarta Sans',sans-serif",
              }}
            >
              {destination ? destination.name : "Where do you want to park?"}
            </span>
            {destination ? (
              <button
                onClick={clearDestination}
                className="tb"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <Ic n="close" s={16} c={T.gray4} />
              </button>
            ) : (
              <Ic n="search" s={18} c={T.gray4} />
            )}
          </div>
        </div>
        {!destination && (
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 8,
              overflowX: "auto",
            }}
          >
            {["Temples", "Beaches", "Malls", "Stations"].map((cat) => (
              <button
                key={cat}
                className="tb"
                onClick={() => {
                  setQuery(cat);
                  setShowSearch(true);
                }}
                style={{
                  background: T.white,
                  border: "none",
                  padding: "7px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.dark,
                  cursor: "pointer",
                  boxShadow: T.shadow,
                  borderRadius: 99,
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Locate button */}
      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: nearbySpots.length > 0 || matched || matching ? 230 : 80,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => flyTo(13.0827, 80.2707, 12)}
          className="tb"
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: T.white,
            border: "none",
            cursor: "pointer",
            boxShadow: T.shadowMd,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ic n="locate" s={20} c={T.green} />
        </button>
      </div>

      {/* Become a host FAB */}
      {!destination && !nearbySpots.length && !matching && !matched && (
        <div style={{ position: "absolute", left: 14, bottom: 80, zIndex: 10 }}>
          <button
            onClick={() => onNav("hostDashboard")}
            className="tb"
            style={{
              background: T.dark,
              border: "none",
              borderRadius: 12,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              color: T.white,
              boxShadow: T.shadowMd,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Ic n="plus" s={16} c={T.white} /> Become a Host
          </button>
        </div>
      )}

      {/* Search overlay */}
      {showSearch && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: T.white,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            animation: "slideDown .22s ease",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderBottom: `1px solid ${T.gray2}`,
            }}
          >
            <button
              onClick={() => setShowSearch(false)}
              className="tb"
              style={{
                background: T.gray1,
                border: "none",
                borderRadius: 10,
                width: 38,
                height: 38,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic n="back" s={18} c={T.dark} />
            </button>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                background: T.gray1,
                borderRadius: 12,
                padding: "0 14px",
                gap: 10,
                border: `1.5px solid ${T.gray2}`,
              }}
            >
              <Ic n="search" s={16} c={T.gray3} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                placeholder="Search temples, beaches, malls…"
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  padding: "13px 0",
                  fontSize: 15,
                  color: T.dark,
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="tb"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Ic n="close" s={14} c={T.gray3} />
                </button>
              )}
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.gray3,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "16px 0 10px",
              }}
            >
              Tamil Nadu Destinations
            </p>
            {(query.length > 0 ? filtered : ALL_PLACES).map((p, i) => (
              <div
                key={p.id}
                onClick={() => selectPlace(p)}
                className="tb"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 8px",
                  borderBottom: `1px solid ${T.gray2}`,
                  animation: `fadeUp .3s ${i * 0.03}s both`,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: T.greenLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Ic n="pin" s={18} c={T.green} />
                </div>
                <div>
                  <p
                    style={{
                      margin: "0 0 2px",
                      fontWeight: 700,
                      fontSize: 14,
                      color: T.dark,
                    }}
                  >
                    {p.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: T.gray3 }}>
                    {p.city} · Tamil Nadu
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby spots */}
      {nearbySpots.length > 0 && !matching && !matched && (
        <div
          className="su"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: T.white,
            borderRadius: "22px 22px 0 0",
            boxShadow: "0 -4px 30px rgba(0,0,0,0.13)",
            padding: "12px 0 0",
            maxHeight: "54%",
            overflowY: "auto",
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 99,
              background: T.gray2,
              margin: "0 auto 14px",
            }}
          />
          <div style={{ padding: "0 16px 20px" }}>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: T.dark,
                margin: "0 0 4px",
              }}
            >
              Spots near {destination?.city}
            </h3>
            <p style={{ color: T.gray3, fontSize: 13, margin: "0 0 14px" }}>
              {nearbySpots.length} spots available
            </p>
            {nearbySpots.map((spot, i) => (
              <div
                key={spot.id}
                className="fu"
                style={{
                  background: T.white,
                  borderRadius: 14,
                  boxShadow: T.shadow,
                  marginBottom: 10,
                  overflow: "hidden",
                  display: "flex",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <img
                  src={spot.image}
                  alt={spot.name}
                  style={{
                    width: 96,
                    height: 96,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div style={{ padding: "10px 12px", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: 13,
                        color: T.dark,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                      }}
                    >
                      {spot.name}
                    </p>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 14,
                        color: T.green,
                        flexShrink: 0,
                        marginLeft: 6,
                      }}
                    >
                      ₹{spot.price}
                      <span
                        style={{
                          fontSize: 10,
                          color: T.gray3,
                          fontWeight: 400,
                        }}
                      >
                        /hr
                      </span>
                    </span>
                  </div>
                  <p
                    style={{ margin: "0 0 4px", fontSize: 11, color: T.gray3 }}
                  >
                    {spot.distance} · {spot.area}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginBottom: 8,
                    }}
                  >
                    <Ic n="star" s={11} f />
                    <span
                      style={{ fontSize: 12, fontWeight: 700, color: T.dark }}
                    >
                      {spot.host.rating}
                    </span>
                    <span style={{ fontSize: 11, color: T.gray3 }}>
                      · {spot.slots} slots
                    </span>
                  </div>
                  <button
                    onClick={() => confirmSpot(spot)}
                    className="tb"
                    style={{
                      background: T.green,
                      border: "none",
                      borderRadius: 8,
                      padding: "5px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      color: T.white,
                      boxShadow: `0 2px 6px ${T.green}40`,
                    }}
                  >
                    Select →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matching */}
      {matching && (
        <div
          className="su"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: T.white,
            borderRadius: "22px 22px 0 0",
            boxShadow: "0 -4px 30px rgba(0,0,0,0.13)",
            padding: "36px 24px 48px",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 80,
              height: 80,
              margin: "0 auto 20px",
            }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `2px solid ${T.green}`,
                  animation: `ripple 1.4s ease-out infinite ${i * 0.5}s`,
                  opacity: 0,
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: T.greenLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic n="parking" s={34} c={T.green} />
            </div>
          </div>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: T.dark,
              margin: "0 0 8px",
            }}
          >
            Finding your host…
          </h3>
          <p style={{ color: T.gray4, fontSize: 14, margin: "0 0 24px" }}>
            Connecting near {destination?.city}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: T.green,
                  animation: `ping 1.2s ease ${i * 0.25}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Matched */}
      {matched && !matching && (
        <div
          className="su"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: T.white,
            borderRadius: "22px 22px 0 0",
            boxShadow: "0 -4px 30px rgba(0,0,0,0.13)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              background: T.greenLight,
              borderRadius: "22px 22px 0 0",
              padding: "16px 20px 14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: T.green,
                    textTransform: "uppercase",
                  }}
                >
                  🎉 Host Found!
                </p>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 19,
                    fontWeight: 800,
                    color: T.dark,
                  }}
                >
                  {matched.name}
                </h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: "0 0 2px", fontSize: 12, color: T.gray4 }}>
                  Arriving in
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 800,
                    color: T.green,
                  }}
                >
                  {matched.eta}
                </p>
              </div>
            </div>
          </div>
          <div style={{ padding: "16px 20px 28px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <Avatar src={matched.host.avatar} size={54} online />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: "0 0 3px",
                    fontWeight: 800,
                    fontSize: 16,
                    color: T.dark,
                  }}
                >
                  {matched.host.name}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Ic n="star" s={13} f />
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: T.dark }}
                  >
                    {matched.host.rating}
                  </span>
                  <span style={{ color: T.gray3, fontSize: 12 }}>
                    ({matched.host.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                background: T.gray1,
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 14,
                display: "flex",
              }}
            >
              {[
                { l: "Price", v: `₹${matched.price}/hr` },
                { l: "Distance", v: matched.distance },
                { l: "Slots", v: matched.slots },
              ].map((s, i) => (
                <div
                  key={s.l}
                  style={{
                    flex: 1,
                    borderLeft: i > 0 ? `1px solid ${T.gray2}` : "none",
                    paddingLeft: i > 0 ? 16 : 0,
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 2px",
                      fontSize: 10,
                      color: T.gray3,
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {s.l}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 17,
                      fontWeight: 800,
                      color: T.dark,
                    }}
                  >
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
            <Btn onClick={() => onSelectParking(matched)}>
              View Spot & Book →
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── PARKING DETAIL ───────────────────────────────────────────────────────────
const ParkingDetailScreen = ({ space, onBack, onBook }) => {
  const [hours, setHours] = useState(2);
  const total = space.price * hours;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <div style={{ overflowY: "auto", flex: 1, paddingBottom: 90 }}>
        <div style={{ position: "relative", height: 260 }}>
          <img
            src={space.image}
            alt={space.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom,rgba(0,0,0,0.35) 0%,transparent 50%)",
            }}
          />
          <button
            onClick={onBack}
            className="tb"
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(255,255,255,0.92)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ic n="back" s={18} c={T.dark} />
          </button>
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.92)",
              borderRadius: 99,
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Ic n="star" s={14} f />
            <span style={{ fontWeight: 700, fontSize: 13, color: T.dark }}>
              {space.host.rating}
            </span>
          </div>
        </div>

        <div style={{ padding: "16px 16px 0" }}>
          <Card style={{ padding: 18, marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 8,
                gap: 8,
              }}
            >
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: T.dark,
                  margin: 0,
                  flex: 1,
                  lineHeight: 1.3,
                }}
              >
                {space.name}
              </h1>
              {space.verified && <Tag>✓ Verified</Tag>}
            </div>
            <p
              style={{
                color: T.gray4,
                fontSize: 13,
                margin: "0 0 14px",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Ic n="pin" s={13} c={T.gray4} />
              {space.address}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingTop: 12,
                borderTop: `1px solid ${T.gray2}`,
              }}
            >
              <Avatar src={space.host.avatar} size={46} online />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    margin: "0 0 2px",
                    color: T.dark,
                  }}
                >
                  Hosted by {space.host.name}
                </p>
                <p style={{ color: T.gray3, fontSize: 12, margin: 0 }}>
                  Verified Host · {space.area}
                </p>
              </div>
            </div>
          </Card>

          <Card style={{ padding: 14, marginBottom: 12 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                { l: "Hourly Rate", v: `₹${space.price}` },
                { l: "Distance", v: space.distance },
                { l: "Type", v: space.type },
                { l: "Available", v: `${space.slots} slots` },
              ].map((s) => (
                <div
                  key={s.l}
                  style={{
                    background: T.gray1,
                    borderRadius: 12,
                    padding: "12px 14px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: 10,
                      color: T.gray3,
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {s.l}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 17,
                      fontWeight: 800,
                      color: T.dark,
                    }}
                  >
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: 14, marginBottom: 12 }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: T.dark,
                margin: "0 0 12px",
              }}
            >
              Amenities
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {space.amenities.map((a) => (
                <div
                  key={a}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: T.greenLight,
                    padding: "6px 12px",
                    borderRadius: 99,
                  }}
                >
                  <Ic n="verify" s={12} c={T.green} />
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: T.greenDark,
                    }}
                  >
                    {a}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: 16 }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: T.dark,
                margin: "0 0 14px",
              }}
            >
              Parking Duration
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => setHours((h) => Math.max(1, h - 1))}
                className="tb"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  border: `1.5px solid ${T.gray2}`,
                  background: T.white,
                  fontSize: 24,
                  cursor: "pointer",
                  color: T.dark,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                −
              </button>
              <div style={{ flex: 1, textAlign: "center" }}>
                <span style={{ fontSize: 34, fontWeight: 800, color: T.dark }}>
                  {hours}
                </span>
                <span style={{ fontSize: 14, color: T.gray3 }}>
                  {" "}
                  hr{hours > 1 ? "s" : ""}
                </span>
              </div>
              <button
                onClick={() => setHours((h) => Math.min(12, h + 1))}
                className="tb"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  border: "none",
                  background: T.green,
                  fontSize: 24,
                  cursor: "pointer",
                  color: T.white,
                  fontWeight: 700,
                  boxShadow: `0 2px 8px ${T.green}40`,
                  flexShrink: 0,
                }}
              >
                +
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div
        style={{
          background: T.white,
          borderTop: `1px solid ${T.gray2}`,
          padding: "14px 16px 28px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              color: T.gray3,
              textTransform: "uppercase",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Total
          </p>
          <p
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: T.dark,
              margin: "2px 0 0",
            }}
          >
            ₹{total}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <Btn onClick={() => onBook(space, hours)} disabled={!space.available}>
            {space.available ? "Book Now →" : "Spot Full"}
          </Btn>
        </div>
      </div>
    </div>
  );
};

// ─── BOOKING / PAYMENT ────────────────────────────────────────────────────────
const BookingConfirmScreen = ({ space, hours, onDone, onAddBooking }) => {
  const [payStep, setPayStep] = useState("method"); // method → tnc → processing → done
  const [method, setMethod] = useState("upi");
  const [upiApp, setUpiApp] = useState("gpay");
  const [tncChecked, setTncChecked] = useState(false);
  const total = space.price * hours;
  const bookingId = useRef(`PK${Date.now().toString().slice(-6)}`).current;

  const UPI_APPS = [
    { k: "gpay", name: "Google Pay", emoji: "🔵" },
    { k: "phonepe", name: "PhonePe", emoji: "🟣" },
    { k: "paytm", name: "Paytm", emoji: "🔷" },
    { k: "bhim", name: "BHIM UPI", emoji: "🟠" },
  ];

  const handlePay = () => {
    setPayStep("processing");
    setTimeout(() => {
      onAddBooking({ space, hours, total, bookingId });
      setPayStep("done");
    }, 3000);
  };

  // ── Processing screen
  if (payStep === "processing")
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: T.white,
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 90,
            height: 90,
            margin: "0 auto 24px",
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `2px solid ${T.green}`,
                animation: `ripple 1.6s ease-out infinite ${i * 0.6}s`,
                opacity: 0,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: T.greenLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 40 }}>
              {UPI_APPS.find((a) => a.k === upiApp)?.emoji || "📱"}
            </span>
          </div>
        </div>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 8px",
            textAlign: "center",
          }}
        >
          Processing payment…
        </h2>
        <p
          style={{
            color: T.gray4,
            fontSize: 14,
            margin: "0 0 24px",
            textAlign: "center",
          }}
        >
          Please wait while we confirm your ₹{total} payment via{" "}
          {UPI_APPS.find((a) => a.k === upiApp)?.name}
        </p>
        <div
          style={{
            width: "100%",
            height: 6,
            background: T.gray2,
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: T.green,
              borderRadius: 99,
              animation: "barLoad 3s linear forwards",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Ic n="lock" s={14} c={T.gray3} />
          <p style={{ margin: 0, fontSize: 12, color: T.gray3 }}>
            Secured by 256-bit SSL
          </p>
        </div>
      </div>
    );

  // ── Success screen
  if (payStep === "done")
    return (
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: T.bg,
          padding: "40px 20px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="si"
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: T.greenLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            boxShadow: `0 0 50px ${T.green}25`,
          }}
        >
          <Ic n="check" s={50} c={T.green} />
        </div>
        <h1
          className="fu"
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: T.dark,
            textAlign: "center",
            margin: "0 0 8px",
          }}
        >
          Booking Confirmed!
        </h1>
        <p
          className="fu"
          style={{
            color: T.gray4,
            textAlign: "center",
            margin: "0 0 6px",
            fontSize: 14,
            animationDelay: "0.1s",
          }}
        >
          <strong style={{ color: T.dark }}>{space.name}</strong> reserved for{" "}
          {hours} hr{hours > 1 ? "s" : ""}.
        </p>
        <div style={{ marginBottom: 24 }}>
          <Tag bg="#FEF3C7" color="#92400E">
            ⏳ Awaiting host confirmation
          </Tag>
        </div>

        <Card
          style={{
            padding: 20,
            marginBottom: 14,
            width: "100%",
            textAlign: "center",
          }}
          className="fu"
        >
          <p
            style={{
              fontWeight: 600,
              color: T.gray4,
              fontSize: 12,
              margin: "0 0 4px",
            }}
          >
            Booking ID
          </p>
          <p
            style={{
              fontWeight: 900,
              color: T.dark,
              fontSize: 22,
              letterSpacing: "0.1em",
              margin: "0 0 16px",
            }}
          >
            {bookingId}
          </p>
          <div
            style={{
              width: 110,
              height: 110,
              margin: "0 auto 10px",
              background: T.gray1,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
            }}
          >
            🅿️
          </div>
          <p
            style={{ fontWeight: 600, color: T.gray4, fontSize: 12, margin: 0 }}
          >
            Show QR to host on arrival
          </p>
        </Card>

        <Card
          style={{ padding: 16, width: "100%", marginBottom: 14 }}
          className="fu"
        >
          {[
            { l: "Spot", v: space.name },
            { l: "Host", v: space.host.name },
            { l: "Duration", v: `${hours} hr${hours > 1 ? "s" : ""}` },
            { l: "Amount", v: `₹${total}` },
          ].map((d) => (
            <div
              key={d.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "9px 0",
                borderBottom: `1px solid ${T.gray2}`,
              }}
            >
              <span style={{ color: T.gray3, fontSize: 13 }}>{d.l}</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: T.dark }}>
                {d.v}
              </span>
            </div>
          ))}
        </Card>

        <Card
          style={{
            padding: 14,
            width: "100%",
            marginBottom: 20,
            background: "#FFF8E7",
            border: `1px solid #F59E0B25`,
          }}
          className="fu"
        >
          <div style={{ display: "flex", gap: 10 }}>
            <Ic n="timer" s={18} c={T.amber} />
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#92400E",
                lineHeight: 1.5,
              }}
            >
              Host has <strong>15 minutes</strong> to accept. If rejected, full
              refund credited within 24 hours.
            </p>
          </div>
        </Card>

        <Btn onClick={onDone}>View My Bookings →</Btn>
      </div>
    );

  // ── T&C screen
  if (payStep === "tnc")
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: T.white,
        }}
      >
        <div
          style={{
            padding: "16px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: `1px solid ${T.gray2}`,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setPayStep("method")}
            className="tb"
            style={{
              background: T.gray1,
              border: "none",
              borderRadius: 10,
              width: 38,
              height: 38,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ic n="back" s={18} c={T.dark} />
          </button>
          <h2
            style={{ fontSize: 17, fontWeight: 800, color: T.dark, margin: 0 }}
          >
            Terms & Conditions
          </h2>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
          <div
            style={{
              background: T.greenLight,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 18,
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.greenDark,
                margin: "0 0 2px",
              }}
            >
              📋 Please read before paying
            </p>
            <p style={{ fontSize: 13, color: T.gray4, margin: 0 }}>
              These terms govern your use of parkkar parking spots.
            </p>
          </div>
          {[
            {
              t: "1. Booking & Access",
              b: "Your booking is valid only for the reserved duration. Entry is via QR code scan. Arrive within 15 minutes of your booking start time or the slot may be reallocated.",
            },
            {
              t: "2. Cancellation Policy",
              b: "Cancel 30+ mins before: 100% refund. Cancel 15–30 mins: 50% refund. Cancel under 15 mins or no-show: No refund. Refunds processed in 3–5 business days.",
            },
            {
              t: "3. Vehicle Responsibility",
              b: "parkkar and hosts are not liable for theft, damage, or loss of your vehicle or belongings. Park at your own risk. Ensure vehicle is locked at all times.",
            },
            {
              t: "4. Duration Overrun",
              b: "Exceeding booked time attracts ₹50 per additional 30 minutes. You'll receive a notification before your slot expires.",
            },
            {
              t: "5. Host Rejection",
              b: "If a host doesn't accept within 15 minutes, your booking is auto-cancelled and 100% refund is issued within 24 hours.",
            },
            {
              t: "6. Prohibited Activities",
              b: "No overnight parking unless explicitly allowed. No vehicle repairs, washing, or commercial activities in the spot.",
            },
          ].map((s) => (
            <div
              key={s.t}
              style={{
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: `1px solid ${T.gray2}`,
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: T.dark,
                  margin: "0 0 6px",
                }}
              >
                {s.t}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: T.gray4,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {s.b}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "14px 16px 32px",
            flexShrink: 0,
            borderTop: `1px solid ${T.gray2}`,
          }}
        >
          <div
            onClick={() => setTncChecked((v) => !v)}
            className="tb"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "14px",
              background: T.gray1,
              borderRadius: 12,
              cursor: "pointer",
              marginBottom: 14,
              border: `1.5px solid ${tncChecked ? T.green : T.gray2}`,
              transition: "border-color .15s",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                border: `2px solid ${tncChecked ? T.green : T.gray3}`,
                background: tncChecked ? T.green : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all .15s",
              }}
            >
              {tncChecked && <Ic n="check" s={13} c={T.white} />}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: T.dark,
                lineHeight: 1.5,
              }}
            >
              I have read and agree to parkkar's{" "}
              <strong>Terms & Conditions</strong> and{" "}
              <strong>Cancellation Policy</strong>
            </p>
          </div>
          <Btn onClick={handlePay} disabled={!tncChecked}>
            Agree & Pay ₹{total} →
          </Btn>
        </div>
      </div>
    );

  // ── Method selection (default)
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <div
        style={{
          background: T.white,
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${T.gray2}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onDone}
          className="tb"
          style={{
            background: T.gray1,
            border: "none",
            borderRadius: 10,
            width: 38,
            height: 38,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ic n="back" s={18} c={T.dark} />
        </button>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: T.dark, margin: 0 }}>
          Choose Payment
        </h2>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 100px" }}>
        {/* Summary */}
        <Card style={{ padding: 16, marginBottom: 14 }} className="fu">
          <h3
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.gray3,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "0 0 12px",
            }}
          >
            Order Summary
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <img
              src={space.image}
              alt={space.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: T.dark,
                  margin: "0 0 2px",
                }}
              >
                {space.name}
              </p>
              <p style={{ fontSize: 12, color: T.gray3, margin: 0 }}>
                {hours} hr{hours > 1 ? "s" : ""} · {space.host.name}
              </p>
            </div>
          </div>
          {[
            { l: "Parking fee", v: `₹${space.price} × ${hours}hr` },
            { l: "Service fee", v: "₹5" },
            { l: "GST (18%)", v: `₹${Math.round(total * 0.18)}` },
          ].map((d) => (
            <div
              key={d.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
              }}
            >
              <span style={{ color: T.gray3, fontSize: 13 }}>{d.l}</span>
              <span style={{ fontSize: 13, color: T.dark }}>{d.v}</span>
            </div>
          ))}
          <div
            style={{
              borderTop: `2px solid ${T.gray2}`,
              marginTop: 8,
              paddingTop: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: 700, color: T.dark }}>Total</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: T.green }}>
              ₹{total}
            </span>
          </div>
        </Card>

        {/* Payment method */}
        <Card style={{ padding: 14, marginBottom: 12 }} className="fu">
          <h3
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: T.dark,
              margin: "0 0 12px",
            }}
          >
            Payment Method
          </h3>
          {[
            {
              k: "upi",
              l: "UPI Apps",
              e: "📱",
              d: "GPay, PhonePe, Paytm, BHIM",
            },
            {
              k: "card",
              l: "Debit / Credit Card",
              e: "💳",
              d: "Visa, Mastercard, RuPay",
            },
            { k: "wallet", l: "parkkar Wallet", e: "🏦", d: "Balance: ₹250" },
          ].map((m) => (
            <div
              key={m.k}
              onClick={() => setMethod(m.k)}
              className="tb"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                border: `1.5px solid ${method === m.k ? T.green : T.gray2}`,
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 8,
                background: method === m.k ? T.greenLight : T.white,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 22 }}>{m.e}</span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 700,
                    margin: 0,
                    fontSize: 14,
                    color: T.dark,
                  }}
                >
                  {m.l}
                </p>
                <p style={{ color: T.gray3, fontSize: 12, margin: 0 }}>{m.d}</p>
              </div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: `2px solid ${method === m.k ? T.green : T.gray3}`,
                  background: method === m.k ? T.green : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all .15s",
                }}
              >
                {method === m.k && <Ic n="check" s={12} c={T.white} />}
              </div>
            </div>
          ))}
        </Card>

        {/* UPI app selector */}
        {method === "upi" && (
          <Card style={{ padding: 14, marginBottom: 12 }} className="fu">
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: T.dark,
                margin: "0 0 12px",
              }}
            >
              Select UPI App
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {UPI_APPS.map((app) => (
                <div
                  key={app.k}
                  onClick={() => setUpiApp(app.k)}
                  className="tb"
                  style={{
                    border: `1.5px solid ${
                      upiApp === app.k ? T.green : T.gray2
                    }`,
                    borderRadius: 12,
                    padding: "12px 10px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: upiApp === app.k ? T.greenLight : T.white,
                    transition: "all .15s",
                  }}
                >
                  <div style={{ fontSize: 26, marginBottom: 4 }}>
                    {app.emoji}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: 13,
                      color: upiApp === app.k ? T.green : T.dark,
                    }}
                  >
                    {app.name}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <div
        style={{
          background: T.white,
          borderTop: `1px solid ${T.gray2}`,
          padding: "14px 16px 32px",
          flexShrink: 0,
        }}
      >
        <Btn onClick={() => setPayStep("tnc")}>
          Review Terms & Pay ₹{total} →
        </Btn>
      </div>
    </div>
  );
};

// ─── BOOKINGS SCREEN ──────────────────────────────────────────────────────────
const BookingsScreen = ({ dynamicBookings = [] }) => {
  const [tab, setTab] = useState("active");
  const [bookings, setBookings] = useState(dynamicBookings);
  const [cancelId, setCancelId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    setBookings(dynamicBookings);
  }, [dynamicBookings]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const doCancel = () => {
    setBookings((b) =>
      b.map((bk) => (bk.id === cancelId ? { ...bk, status: "cancelled" } : bk))
    );
    setCancelId(null);
    setCancelReason("");
    showToast("Booking cancelled successfully");
  };

  const statusMap = {
    pending: { label: "Pending", bg: "#FEF3C7", color: "#92400E" },
    active: { label: "Confirmed", bg: T.greenLight, color: T.green },
    cancelled: { label: "Cancelled", bg: "#FEF2F2", color: T.red },
    done: { label: "Done", bg: T.gray1, color: T.gray4 },
  };

  const activeList = bookings.filter(
    (b) => b.status === "active" || b.status === "pending"
  );
  const historyList = bookings.filter(
    (b) => b.status === "cancelled" || b.status === "done"
  );
  const displayList = tab === "active" ? activeList : historyList;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <Toast msg={toast} visible={!!toast} />

      {/* Cancel modal */}
      {cancelId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            className="su"
            style={{
              background: T.white,
              borderRadius: "20px 20px 0 0",
              padding: 24,
              width: "100%",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: T.dark,
                margin: "0 0 14px",
              }}
            >
              Cancel Booking?
            </h3>
            {[
              "Changed my mind",
              "Found a better spot",
              "Emergency",
              "Vehicle issue",
              "Other",
            ].map((r) => (
              <div
                key={r}
                onClick={() => setCancelReason(r)}
                className="tb"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 12px",
                  border: `1.5px solid ${
                    cancelReason === r ? T.green : T.gray2
                  }`,
                  borderRadius: 10,
                  marginBottom: 8,
                  cursor: "pointer",
                  background: cancelReason === r ? T.greenLight : T.white,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: `2px solid ${
                      cancelReason === r ? T.green : T.gray3
                    }`,
                    background: cancelReason === r ? T.green : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {cancelReason === r && <Ic n="check" s={11} c={T.white} />}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.dark }}>
                  {r}
                </span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <Btn
                ghost
                onClick={() => {
                  setCancelId(null);
                  setCancelReason("");
                }}
              >
                Go Back
              </Btn>
              <Btn
                danger
                onClick={doCancel}
                disabled={!cancelReason}
                style={{ background: T.red, boxShadow: "none" }}
              >
                Yes, Cancel
              </Btn>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          background: T.white,
          padding: "20px 16px 0",
          borderBottom: `1px solid ${T.gray2}`,
          flexShrink: 0,
        }}
      >
        <h2
          className="fu"
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 14px",
          }}
        >
          My Bookings
        </h2>
        <div
          style={{
            display: "flex",
            background: T.gray1,
            borderRadius: 12,
            padding: 4,
          }}
        >
          {[
            ["active", "Active"],
            ["history", "History"],
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className="tb"
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 10,
                border: "none",
                background: tab === k ? T.white : "transparent",
                color: tab === k ? T.dark : T.gray3,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: tab === k ? T.shadow : "none",
                transition: "all .18s",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 30px" }}>
        {displayList.length === 0 ? (
          <div
            className="fu"
            style={{ textAlign: "center", padding: "80px 0" }}
          >
            <div
              style={{
                fontSize: 54,
                marginBottom: 14,
                animation: "bounce 2s ease infinite",
              }}
            >
              🅿️
            </div>
            <p style={{ fontWeight: 700, fontSize: 17, color: T.dark }}>
              No {tab} bookings
            </p>
            <p style={{ fontSize: 13, color: T.gray3, marginTop: 6 }}>
              {tab === "active"
                ? "Book a spot to see it here"
                : "Completed bookings appear here"}
            </p>
          </div>
        ) : (
          displayList.map((b, i) => {
            const st = statusMap[b.status] || statusMap.done;
            return (
              <Card
                key={b.id}
                className="fu"
                style={{
                  overflow: "hidden",
                  marginBottom: 12,
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <div
                  style={{
                    height: 100,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={b.space.image}
                    alt={b.space.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ position: "absolute", top: 10, left: 10 }}>
                    <span
                      style={{
                        background: st.bg,
                        color: st.color,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 99,
                      }}
                    >
                      {st.label}
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "rgba(255,255,255,0.92)",
                      borderRadius: 8,
                      padding: "3px 10px",
                    }}
                  >
                    <span
                      style={{ fontWeight: 700, fontSize: 12, color: T.dark }}
                    >
                      #{b.id?.slice(-6)}
                    </span>
                  </div>
                </div>
                <div style={{ padding: 14 }}>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: T.dark,
                      margin: "0 0 3px",
                    }}
                  >
                    {b.space.name}
                  </h4>
                  <p
                    style={{ color: T.gray3, fontSize: 12, margin: "0 0 3px" }}
                  >
                    {b.date} · {b.time}
                  </p>
                  <p
                    style={{ color: T.gray4, fontSize: 12, margin: "0 0 10px" }}
                  >
                    📍 {b.space.area}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      borderTop: `1px solid ${T.gray2}`,
                      paddingTop: 10,
                    }}
                  >
                    <Avatar src={b.space.host.avatar} size={30} />
                    <span style={{ flex: 1, color: T.gray4, fontSize: 13 }}>
                      {b.space.host.name}
                    </span>
                    <span
                      style={{ fontWeight: 800, color: T.dark, fontSize: 16 }}
                    >
                      ₹{b.total}
                    </span>
                  </div>
                  {(b.status === "active" || b.status === "pending") && (
                    <button
                      onClick={() => setCancelId(b.id)}
                      className="tb"
                      style={{
                        marginTop: 10,
                        width: "100%",
                        background: "transparent",
                        border: `1.5px solid ${T.red}40`,
                        borderRadius: 10,
                        padding: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        color: T.red,
                        cursor: "pointer",
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

// ─── HOST BOOKING REQUESTS ────────────────────────────────────────────────────
const HostBookingRequests = ({ bookings, onAccept, onReject }) => {
  const pending = bookings.filter((b) => b.status === "pending");
  const others = bookings.filter((b) => b.status !== "pending");

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <div
        style={{
          background: T.white,
          padding: "20px 16px 14px",
          borderBottom: `1px solid ${T.gray2}`,
          flexShrink: 0,
        }}
      >
        <h2
          className="fu"
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 6px",
          }}
        >
          Booking Requests
        </h2>
        {pending.length > 0 && (
          <Tag bg="#FEF3C7" color="#92400E">
            ⏰ {pending.length} pending approval
          </Tag>
        )}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 30px" }}>
        {pending.length > 0 && (
          <>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.gray3,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "0 0 10px",
              }}
            >
              Awaiting Your Response
            </p>
            {pending.map((b, i) => (
              <Card
                key={b.id}
                className="fu"
                style={{
                  padding: 16,
                  marginBottom: 12,
                  border: `1.5px solid #F59E0B30`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: T.amber,
                      animation: "pulse 1.5s ease infinite",
                      marginRight: 8,
                    }}
                  />
                  <Tag bg="#FEF3C7" color="#92400E">
                    New Request
                  </Tag>
                  <span
                    style={{ fontSize: 12, color: T.gray3, marginLeft: "auto" }}
                  >
                    {b.date}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 0",
                    borderTop: `1px solid ${T.gray2}`,
                    borderBottom: `1px solid ${T.gray2}`,
                    marginBottom: 12,
                  }}
                >
                  <Avatar
                    src={`https://i.pravatar.cc/150?img=${20 + i}`}
                    size={48}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: T.dark,
                        margin: "0 0 2px",
                      }}
                    >
                      Driver · #{b.id?.slice(-4)}
                    </p>
                    <p style={{ fontSize: 12, color: T.gray3, margin: 0 }}>
                      🚗 {b.vehicle}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: T.green,
                        margin: 0,
                      }}
                    >
                      ₹{b.total}
                    </p>
                    <p style={{ fontSize: 11, color: T.gray3, margin: 0 }}>
                      {b.hours} hr{b.hours > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    background: T.gray1,
                    borderRadius: 10,
                    padding: "10px 12px",
                    marginBottom: 12,
                  }}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: T.dark,
                      margin: "0 0 2px",
                    }}
                  >
                    {b.space.name}
                  </p>
                  <p style={{ fontSize: 12, color: T.gray3, margin: 0 }}>
                    {b.space.area}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => onReject(b.id)}
                    className="tb"
                    style={{
                      flex: 1,
                      height: 44,
                      borderRadius: 10,
                      border: `1.5px solid ${T.red}40`,
                      background: "#FFF5F5",
                      color: T.red,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    ✕ Decline
                  </button>
                  <button
                    onClick={() => onAccept(b.id)}
                    className="tb"
                    style={{
                      flex: 2,
                      height: 44,
                      borderRadius: 10,
                      border: "none",
                      background: T.green,
                      color: T.white,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: `0 4px 12px ${T.green}40`,
                    }}
                  >
                    ✓ Accept Booking
                  </button>
                </div>
              </Card>
            ))}
          </>
        )}
        {others.length > 0 && (
          <>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.gray3,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "16px 0 10px",
              }}
            >
              Recent
            </p>
            {others.map((b, i) => (
              <Card
                key={b.id}
                className="fu"
                style={{
                  padding: 14,
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <Avatar
                  src={`https://i.pravatar.cc/150?img=${30 + i}`}
                  size={44}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: T.dark,
                      margin: "0 0 2px",
                    }}
                  >
                    Driver · #{b.id?.slice(-4)}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: T.gray3,
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.date} · {b.vehicle}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <Tag
                    bg={b.status === "active" ? T.greenLight : "#FEF2F2"}
                    color={b.status === "active" ? T.green : T.red}
                  >
                    {b.status === "active" ? "✓ Accepted" : "✕ Declined"}
                  </Tag>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: T.dark,
                      margin: "4px 0 0",
                    }}
                  >
                    ₹{b.total}
                  </p>
                </div>
              </Card>
            ))}
          </>
        )}
        {bookings.length === 0 && (
          <div
            className="fu"
            style={{ textAlign: "center", padding: "80px 0" }}
          >
            <div
              style={{
                fontSize: 54,
                marginBottom: 14,
                animation: "bounce 2s ease infinite",
              }}
            >
              📭
            </div>
            <p style={{ fontWeight: 700, fontSize: 17, color: T.dark }}>
              No requests yet
            </p>
            <p style={{ fontSize: 13, color: T.gray3, marginTop: 6 }}>
              New bookings will appear here for your approval
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── HOST DASHBOARD ───────────────────────────────────────────────────────────
const HostDashboard = ({ onNav, pendingCount = 0 }) => {
  const [available, setAvailable] = useState(true);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <div
        style={{
          background: `linear-gradient(150deg,#1A2332 0%,#1e3a5f 100%)`,
          padding: "24px 16px 44px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 22,
          }}
        >
          <Avatar src="https://i.pravatar.cc/150?img=12" size={48} online />
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: T.white,
                margin: 0,
              }}
            >
              Host Dashboard
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                margin: 0,
              }}
            >
              Tamil Nadu
            </p>
          </div>
          <button
            onClick={() => onNav("hostBookings")}
            className="tb"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: 12,
              width: 44,
              height: 44,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Ic n="bell" s={20} c={T.white} />
            {pendingCount > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: T.amber,
                  border: `2px solid #1A2332`,
                }}
              />
            )}
          </button>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {[
            {
              l: "Today's Earnings",
              v: "₹1,240",
              t: "+15% vs yesterday",
              c: T.green,
            },
            {
              l: "Total Bookings",
              v: "4",
              t: `${pendingCount} pending`,
              c: T.amber,
            },
          ].map((s, i) => (
            <div
              key={s.l}
              className="fu"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 16,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 700,
                  margin: "0 0 8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {s.l}
              </p>
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: T.white,
                  margin: "0 0 4px",
                }}
              >
                {s.v}
              </p>
              <p
                style={{ fontSize: 12, color: s.c, fontWeight: 700, margin: 0 }}
              >
                {s.t}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px 30px",
          marginTop: -20,
        }}
      >
        {/* Availability toggle */}
        <Card
          style={{
            padding: 16,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: 700,
                color: T.dark,
                margin: "0 0 3px",
                fontSize: 15,
              }}
            >
              Spot Availability
            </p>
            <p style={{ color: T.gray3, fontSize: 13, margin: 0 }}>
              {available ? "Visible to drivers on map" : "Hidden from map"}
            </p>
          </div>
          <div
            onClick={() => setAvailable((v) => !v)}
            className="tb"
            style={{
              width: 54,
              height: 30,
              borderRadius: 99,
              background: available ? T.green : T.gray2,
              cursor: "pointer",
              position: "relative",
              transition: "background .3s",
              boxShadow: available ? `0 2px 8px ${T.green}40` : "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: available ? 27 : 3,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: T.white,
                transition: "left .3s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </Card>

        {/* Pending alert */}
        {pendingCount > 0 && (
          <Card
            onClick={() => onNav("hostBookings")}
            className="tb fu"
            style={{
              padding: 16,
              marginBottom: 12,
              background: "#FFF8E7",
              border: `1.5px solid ${T.amber}40`,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "#FEF3C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ic n="bell" s={20} c={T.amber} />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 700,
                    color: T.dark,
                    margin: "0 0 2px",
                    fontSize: 14,
                  }}
                >
                  {pendingCount} booking{pendingCount > 1 ? "s" : ""} need your
                  approval
                </p>
                <p style={{ color: T.gray3, fontSize: 13, margin: 0 }}>
                  Tap to accept or decline
                </p>
              </div>
              <Ic n="arr" s={18} c={T.amber} />
            </div>
          </Card>
        )}

        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: T.dark,
            margin: "14px 0 12px",
          }}
        >
          Upcoming Bookings
        </h3>
        {[
          {
            driver: "Ravi Kumar",
            vehicle: "White Swift · TN 59 AB 1234",
            avatar: "https://i.pravatar.cc/150?img=11",
            time: "2:00 PM",
            status: "arriving",
          },
          {
            driver: "Priya S.",
            vehicle: "Grey i20 · TN 59 CD 5678",
            avatar: "https://i.pravatar.cc/150?img=45",
            time: "4:30 PM",
            status: "scheduled",
          },
          {
            driver: "Arun M.",
            vehicle: "Blue Creta · TN 05 EF 9012",
            avatar: "https://i.pravatar.cc/150?img=67",
            time: "6:15 PM",
            status: "scheduled",
          },
        ].map((b, i) => (
          <Card
            key={i}
            className="fu"
            style={{
              padding: "12px 14px",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <Avatar src={b.avatar} size={44} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontWeight: 700,
                  color: T.dark,
                  margin: "0 0 2px",
                  fontSize: 14,
                }}
              >
                {b.driver}
              </p>
              <p
                style={{
                  color: T.gray3,
                  fontSize: 12,
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {b.vehicle}
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <Tag
                bg={b.status === "arriving" ? T.greenLight : T.gray1}
                color={b.status === "arriving" ? T.green : T.gray4}
              >
                {b.status}
              </Tag>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  margin: "4px 0 0",
                  color: T.dark,
                }}
              >
                {b.time}
              </p>
            </div>
          </Card>
        ))}

        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: T.dark,
            margin: "16px 0 12px",
          }}
        >
          This Week
        </h3>
        <Card style={{ padding: 16 }}>
          {[
            { l: "Mon", v: "₹320", slots: 3 },
            { l: "Tue", v: "₹480", slots: 5 },
            { l: "Wed", v: "₹240", slots: 2 },
            { l: "Thu", v: "₹640", slots: 7 },
            { l: "Fri", v: "₹1,240", slots: 4 },
          ].map((d, i) => (
            <div
              key={d.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "9px 0",
                borderBottom: i < 4 ? `1px solid ${T.gray2}` : "none",
              }}
            >
              <span
                style={{
                  color: T.gray4,
                  fontSize: 13,
                  fontWeight: 600,
                  width: 36,
                }}
              >
                {d.l}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  background: T.gray1,
                  borderRadius: 99,
                  margin: "0 12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: T.green,
                    borderRadius: 99,
                    width: `${(d.slots / 7) * 100}%`,
                    opacity: 0.8,
                  }}
                />
              </div>
              <span
                style={{
                  color: T.dark,
                  fontSize: 13,
                  fontWeight: 700,
                  width: 50,
                  textAlign: "right",
                }}
              >
                {d.v}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ─── WALLET ───────────────────────────────────────────────────────────────────
const WalletScreen = () => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: T.bg,
    }}
  >
    <div
      style={{
        background: `linear-gradient(150deg,#1A2332 0%,#1e3a5f 100%)`,
        padding: "28px 16px 48px",
        flexShrink: 0,
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: T.white,
          margin: "0 0 18px",
        }}
      >
        My Wallet
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: 11,
          margin: "0 0 4px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Available Balance
      </p>
      <p
        style={{
          fontSize: 44,
          fontWeight: 900,
          margin: "0 0 20px",
          color: T.white,
          letterSpacing: "-0.04em",
        }}
      >
        ₹250.00
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        {["+ Add Money", "⬇ Withdraw"].map((a) => (
          <button
            key={a}
            className="tb"
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: T.white,
              borderRadius: 10,
              padding: 12,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "0 16px 30px",
        marginTop: -20,
      }}
    >
      <Card style={{ padding: 16 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: T.gray3,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: "0 0 14px",
          }}
        >
          Recent Transactions
        </p>
        {[
          {
            l: "Temple Parking Booking",
            a: -40,
            d: "Today · 2:30 PM",
            e: "🅿️",
          },
          { l: "Wallet Top-up", a: 200, d: "Dec 27 · 10:00 AM", e: "⬆" },
          { l: "Marina Parking", a: -60, d: "Dec 28 · 4:00 PM", e: "🅿️" },
          { l: "Referral Bonus", a: 50, d: "Dec 26 · 9:00 AM", e: "🎁" },
        ].map((t, i) => (
          <div
            key={i}
            className="fu"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "13px 0",
              borderBottom: `1px solid ${T.gray2}`,
              animationDelay: `${i * 0.06}s`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: t.a > 0 ? T.greenLight : T.gray1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                {t.e}
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    color: T.dark,
                    margin: "0 0 2px",
                    fontSize: 14,
                  }}
                >
                  {t.l}
                </p>
                <p style={{ color: T.gray3, fontSize: 12, margin: 0 }}>{t.d}</p>
              </div>
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: 16,
                color: t.a > 0 ? T.green : T.dark,
              }}
            >
              {t.a > 0 ? "+" : ""}₹{Math.abs(t.a)}
            </span>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

// ─── MY VEHICLES (sub-screen) ─────────────────────────────────────────────────
const MyVehiclesScreen = ({ onBack, vehicleNumber, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(vehicleNumber);
  const [vType, setVType] = useState("Car");
  const [toast, setToast] = useState("");

  // Keep draft in sync when vehicleNumber prop changes
  useEffect(() => {
    if (!editing) setDraft(vehicleNumber);
  }, [vehicleNumber, editing]);

  const handleSave = () => {
    if (!draft.trim()) return;
    onSave(draft.trim().toUpperCase());
    setEditing(false);
    setToast("Vehicle saved!");
    setTimeout(() => setToast(""), 2500);
  };

  const handleCancel = () => {
    setDraft(vehicleNumber);
    setEditing(false);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <Toast msg={toast} visible={!!toast} />
      <div
        style={{
          background: T.white,
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${T.gray2}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          className="tb"
          style={{
            background: T.gray1,
            border: "none",
            borderRadius: 10,
            width: 38,
            height: 38,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ic n="back" s={18} c={T.dark} />
        </button>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: T.dark, margin: 0 }}>
          My Vehicles
        </h2>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 30px" }}>
        <Card style={{ padding: 20, marginBottom: 14 }} className="fu">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: T.greenLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic n="car" s={26} c={T.green} />
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: "0 0 2px",
                  fontWeight: 800,
                  fontSize: 16,
                  color: T.dark,
                }}
              >
                Primary Vehicle
              </p>
              <p style={{ margin: 0, fontSize: 13, color: T.gray3 }}>
                Used for all bookings
              </p>
            </div>
            {!editing && (
              <button
                onClick={() => {
                  setDraft(vehicleNumber);
                  setEditing(true);
                }}
                className="tb"
                style={{
                  background: T.greenLight,
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 14px",
                  color: T.green,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Ic n="edit" s={14} c={T.green} /> Edit
              </button>
            )}
          </div>

          {/* Registration number */}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.gray3,
                marginBottom: 6,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Registration Number
            </label>
            {editing ? (
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value.toUpperCase())}
                autoFocus
                placeholder="TN 59 AB 1234"
                style={{
                  width: "100%",
                  border: `2px solid ${T.green}`,
                  borderRadius: 10,
                  padding: "13px 14px",
                  fontSize: 20,
                  fontWeight: 800,
                  outline: "none",
                  background: T.greenLight,
                  color: T.dark,
                  letterSpacing: "0.1em",
                }}
              />
            ) : (
              <div
                style={{
                  background: T.gray1,
                  borderRadius: 10,
                  padding: "13px 14px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 800,
                    color: T.dark,
                    letterSpacing: "0.1em",
                  }}
                >
                  {vehicleNumber || (
                    <span
                      style={{ color: T.gray3, fontWeight: 400, fontSize: 15 }}
                    >
                      Not set
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Vehicle type */}
          <div style={{ marginBottom: editing ? 18 : 0 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.gray3,
                marginBottom: 8,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Vehicle Type
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}
            >
              {[
                ["Bike", "🏍️"],
                ["Car", "🚗"],
                ["SUV", "🚙"],
              ].map(([t, e]) => (
                <div
                  key={t}
                  onClick={() => editing && setVType(t)}
                  className={editing ? "tb" : ""}
                  style={{
                    border: `1.5px solid ${vType === t ? T.green : T.gray2}`,
                    borderRadius: 10,
                    padding: "10px 4px",
                    textAlign: "center",
                    background: vType === t ? T.greenLight : T.gray1,
                    fontWeight: 600,
                    fontSize: 13,
                    color: vType === t ? T.green : T.gray4,
                    cursor: editing ? "pointer" : "default",
                    transition: "all .15s",
                  }}
                >
                  {e} {t}
                </div>
              ))}
            </div>
          </div>

          {editing && (
            <div style={{ display: "flex", gap: 10 }}>
              <Btn
                ghost
                onClick={handleCancel}
                style={{ height: 44, fontSize: 14 }}
              >
                Cancel
              </Btn>
              <Btn
                onClick={handleSave}
                disabled={!draft.trim()}
                style={{ height: 44, fontSize: 14 }}
              >
                Save Vehicle →
              </Btn>
            </div>
          )}
        </Card>

        {/* Add another vehicle placeholder */}
        <Card
          className="tb"
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: T.gray1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ic n="plus" s={22} c={T.gray3} />
          </div>
          <div>
            <p
              style={{
                fontWeight: 700,
                color: T.dark,
                margin: "0 0 2px",
                fontSize: 14,
              }}
            >
              Add Another Vehicle
            </p>
            <p style={{ color: T.gray3, fontSize: 12, margin: 0 }}>
              Up to 3 vehicles allowed
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── SAFETY (sub-screen) ──────────────────────────────────────────────────────
const SafetyScreen = ({ onBack }) => {
  const [contacts, setContacts] = useState([
    { name: "Ravi Kumar", phone: "98765 00001", relation: "Brother" },
  ]);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRel, setNewRel] = useState("");

  const addContact = () => {
    if (!newName.trim() || newPhone.length < 10) return;
    setContacts((c) => [
      ...c,
      { name: newName.trim(), phone: newPhone, relation: newRel || "Contact" },
    ]);
    setAdding(false);
    setNewName("");
    setNewPhone("");
    setNewRel("");
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <div
        style={{
          background: T.white,
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${T.gray2}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          className="tb"
          style={{
            background: T.gray1,
            border: "none",
            borderRadius: 10,
            width: 38,
            height: 38,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ic n="back" s={18} c={T.dark} />
        </button>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: T.dark, margin: 0 }}>
          Safety
        </h2>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 30px" }}>
        <Card
          style={{
            padding: 16,
            marginBottom: 12,
            background: "#FFF8E7",
            border: `1px solid ${T.amber}30`,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🆘</span>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  color: "#92400E",
                  margin: "0 0 4px",
                  fontSize: 14,
                }}
              >
                Emergency Contacts
              </p>
              <p style={{ color: "#78350F", fontSize: 13, margin: 0 }}>
                Notified if you trigger SOS during a booking.
              </p>
            </div>
          </div>
        </Card>
        {contacts.map((c, i) => (
          <Card
            key={i}
            className="fu"
            style={{
              padding: "14px 16px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: T.greenLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 18,
                color: T.green,
              }}
            >
              {c.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontWeight: 700,
                  color: T.dark,
                  margin: "0 0 2px",
                  fontSize: 14,
                }}
              >
                {c.name}
              </p>
              <p style={{ color: T.gray3, fontSize: 12, margin: 0 }}>
                {c.relation} · +91 {c.phone}
              </p>
            </div>
            <button
              onClick={() => setContacts((cs) => cs.filter((_, j) => j !== i))}
              className="tb"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 6,
              }}
            >
              <Ic n="close" s={16} c={T.gray4} />
            </button>
          </Card>
        ))}
        {adding ? (
          <Card className="si" style={{ padding: 16, marginBottom: 12 }}>
            {[
              ["Name", "Full name", newName, setNewName, "text"],
              [
                "Phone",
                "10-digit number",
                newPhone,
                (v) => setNewPhone(v.replace(/\D/g, "").slice(0, 10)),
                "tel",
              ],
              ["Relation", "e.g. Brother", newRel, setNewRel, "text"],
            ].map(([l, ph, v, sv, t]) => (
              <div key={l} style={{ marginBottom: 12 }}>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: T.gray3,
                    marginBottom: 4,
                    display: "block",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {l}
                </label>
                <input
                  value={v}
                  onChange={(e) => sv(e.target.value)}
                  placeholder={ph}
                  type={t}
                  style={{
                    width: "100%",
                    border: `1.5px solid ${T.gray2}`,
                    borderRadius: 10,
                    padding: 12,
                    fontSize: 14,
                    outline: "none",
                    background: T.gray1,
                    color: T.dark,
                  }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10 }}>
              <Btn
                ghost
                onClick={() => setAdding(false)}
                style={{ height: 44, fontSize: 14 }}
              >
                Cancel
              </Btn>
              <Btn
                onClick={addContact}
                disabled={!newName.trim() || newPhone.length < 10}
                style={{ height: 44, fontSize: 14 }}
              >
                Add Contact →
              </Btn>
            </div>
          </Card>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="tb"
            style={{
              width: "100%",
              background: "transparent",
              border: `1.5px dashed ${T.gray2}`,
              borderRadius: 14,
              padding: 16,
              color: T.gray3,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            + Add Emergency Contact
          </button>
        )}
      </div>
    </div>
  );
};

// ─── KYC SHARED HELPERS ──────────────────────────────────────────────────────
const KycProgress = ({ step, total, title, onBack }) => (
  <div
    style={{
      background: T.white,
      padding: "16px 16px 14px",
      borderBottom: `1px solid ${T.gray2}`,
      flexShrink: 0,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
      }}
    >
      <button
        onClick={onBack}
        className="tb"
        style={{
          background: T.gray1,
          border: "none",
          borderRadius: 10,
          width: 38,
          height: 38,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ic n="back" s={18} c={T.dark} />
      </button>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: T.gray3, margin: 0 }}>
          {title} · Step {step} of {total}
        </p>
      </div>
      <span style={{ fontSize: 13, fontWeight: 800, color: T.green }}>
        {Math.round((step / total) * 100)}%
      </span>
    </div>
    <div
      style={{
        height: 5,
        background: T.gray2,
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${(step / total) * 100}%`,
          background: T.green,
          borderRadius: 99,
          transition: "width .4s cubic-bezier(.22,.68,0,1.2)",
        }}
      />
    </div>
  </div>
);

const UploadBox = ({ label, value, onChange }) => {
  const ref = useRef();
  const handleFile = (f) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = (e) => onChange(e.target.result);
    r.readAsDataURL(f);
  };
  return (
    <div
      onClick={() => ref.current?.click()}
      className="tb"
      style={{
        border: `2px dashed ${value ? T.green : T.gray2}`,
        borderRadius: 14,
        padding: 18,
        textAlign: "center",
        cursor: "pointer",
        background: value ? T.greenLight : T.gray1,
        transition: "border-color .2s",
      }}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])}
        style={{ display: "none" }}
      />
      {value ? (
        <div className="si">
          {value.startsWith("data:image") && (
            <img
              src={value}
              alt="preview"
              style={{
                width: "100%",
                height: 80,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
          )}
          <p
            style={{ color: T.green, fontWeight: 700, margin: 0, fontSize: 13 }}
          >
            {label} uploaded ✓
          </p>
          <p style={{ color: T.gray3, fontSize: 11, margin: "3px 0 0" }}>
            Tap to change
          </p>
        </div>
      ) : (
        <>
          <div style={{ animation: "bounce 2s ease infinite" }}>
            <Ic n="upload" s={28} c={T.gray3} />
          </div>
          <p
            style={{
              color: T.gray4,
              fontWeight: 600,
              margin: "8px 0 3px",
              fontSize: 14,
            }}
          >
            Tap to upload {label}
          </p>
          <p style={{ color: T.gray3, fontSize: 12, margin: 0 }}>
            JPG, PNG supported
          </p>
        </>
      )}
    </div>
  );
};

const SelfieBox = ({ value, onChange }) => {
  const ref = useRef();
  const handleFile = (f) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = (e) => onChange(e.target.result);
    r.readAsDataURL(f);
  };
  return (
    <div
      onClick={() => ref.current?.click()}
      className="tb"
      style={{
        border: `2px dashed ${value ? T.green : T.gray2}`,
        borderRadius: 16,
        padding: "28px 20px",
        textAlign: "center",
        cursor: "pointer",
        background: value ? T.greenLight : T.gray1,
        marginBottom: 14,
      }}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        capture="user"
        onChange={(e) => handleFile(e.target.files[0])}
        style={{ display: "none" }}
      />
      {value ? (
        <div className="si">
          <img
            src={value}
            alt="selfie"
            style={{
              width: 78,
              height: 78,
              borderRadius: "50%",
              objectFit: "cover",
              border: `3px solid ${T.green}`,
              marginBottom: 10,
            }}
          />
          <p style={{ color: T.green, fontWeight: 800, margin: 0 }}>
            Selfie taken ✅
          </p>
          <p style={{ color: T.gray3, fontSize: 12, margin: "4px 0 0" }}>
            Tap to retake
          </p>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 42, animation: "pulse 2s ease infinite" }}>
            🤳
          </div>
          <p style={{ color: T.gray4, fontWeight: 600, margin: "8px 0 0" }}>
            Tap to take selfie
          </p>
          <p style={{ color: T.gray3, fontSize: 12, margin: "3px 0 0" }}>
            Use front camera
          </p>
        </>
      )}
    </div>
  );
};

const KycField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLen,
}) => (
  <div style={{ marginBottom: 14 }}>
    <label
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: T.gray3,
        marginBottom: 6,
        display: "block",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}
    >
      {label}
    </label>
    <input
      value={value}
      onChange={(e) =>
        onChange(maxLen ? e.target.value.slice(0, maxLen) : e.target.value)
      }
      placeholder={placeholder}
      type={type}
      style={{
        width: "100%",
        border: `1.5px solid ${value ? T.green : T.gray2}`,
        borderRadius: 10,
        padding: "13px 14px",
        fontSize: 16,
        fontWeight: 600,
        outline: "none",
        background: value ? T.greenLight : T.gray1,
        color: T.dark,
        transition: "all .15s",
      }}
    />
  </div>
);

// ─── KYC DRIVER ───────────────────────────────────────────────────────────────
const KYCDriver = ({ onDone, onSkip }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    aadhaar: "",
    dob: "",
    selfie: null,
    rcNumber: "",
    vehicleType: "Car",
    vehicleModel: "",
    rcPhoto: null,
  });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canNext = [
    form.aadhaar.length === 12 && !!form.dob,
    !!form.selfie,
    form.rcNumber.length >= 6 && !!form.vehicleModel,
  ];

  const stepContent = [
    // Step 1 – Aadhaar
    <div key="s1" className="fu">
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 4px",
          }}
        >
          Aadhaar Verification
        </h2>
        <p style={{ color: T.gray4, fontSize: 14, margin: 0 }}>
          Required for driver activation
        </p>
      </div>
      <KycField
        label="Aadhaar Number"
        value={form.aadhaar}
        onChange={(v) => up("aadhaar", v.replace(/\D/g, ""))}
        placeholder="XXXX XXXX XXXX"
        maxLen={12}
      />
      <KycField
        label="Date of Birth"
        value={form.dob}
        onChange={(v) => up("dob", v)}
        placeholder=""
        type="date"
      />
      <Card
        style={{
          padding: "12px 14px",
          background: "#F0FDF4",
          border: `1px solid ${T.green}30`,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <Ic n="shield" s={16} c={T.green} />
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: T.greenDark,
              lineHeight: 1.5,
            }}
          >
            Aadhaar details are encrypted and compliant with UIDAI norms. Never
            shared with third parties.
          </p>
        </div>
      </Card>
    </div>,

    // Step 2 – Selfie
    <div key="s2" className="fu">
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 4px",
          }}
        >
          Face Verification
        </h2>
        <p style={{ color: T.gray4, fontSize: 14, margin: 0 }}>
          Live selfie to verify your identity
        </p>
      </div>
      <SelfieBox value={form.selfie} onChange={(v) => up("selfie", v)} />
      <Card
        style={{
          padding: "12px 14px",
          background: "#FFF8E7",
          border: `1px solid ${T.amber}30`,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <span>⚠️</span>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "#92400E",
              lineHeight: 1.5,
            }}
          >
            Ensure good lighting. Face must clearly match your Aadhaar photo. No
            glasses or masks.
          </p>
        </div>
      </Card>
    </div>,

    // Step 3 – RC Book
    <div key="s3" className="fu">
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 4px",
          }}
        >
          RC Book Details
        </h2>
        <p style={{ color: T.gray4, fontSize: 14, margin: 0 }}>
          Vehicle registration certificate
        </p>
      </div>
      <KycField
        label="Registration Number"
        value={form.rcNumber}
        onChange={(v) => up("rcNumber", v.toUpperCase())}
        placeholder="TN 59 AB 1234"
      />
      <div style={{ marginBottom: 14 }}>
        <label
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.gray3,
            marginBottom: 8,
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Vehicle Type
        </label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          {[
            ["Bike", "🏍️"],
            ["Car", "🚗"],
            ["SUV", "🚙"],
          ].map(([t, e]) => (
            <div
              key={t}
              onClick={() => up("vehicleType", t)}
              className="tb"
              style={{
                border: `1.5px solid ${
                  form.vehicleType === t ? T.green : T.gray2
                }`,
                borderRadius: 10,
                padding: "10px 4px",
                textAlign: "center",
                cursor: "pointer",
                background: form.vehicleType === t ? T.greenLight : T.gray1,
                fontWeight: 600,
                fontSize: 13,
                color: form.vehicleType === t ? T.green : T.gray4,
                transition: "all .15s",
              }}
            >
              {e} {t}
            </div>
          ))}
        </div>
      </div>
      <KycField
        label="Vehicle Model"
        value={form.vehicleModel}
        onChange={(v) => up("vehicleModel", v)}
        placeholder="e.g. Honda Activa, Maruti Swift"
      />
      <UploadBox
        label="RC Book photo"
        value={form.rcPhoto}
        onChange={(v) => up("rcPhoto", v)}
      />
    </div>,
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <KycProgress
        step={step}
        total={3}
        title="Driver KYC"
        onBack={step === 1 ? onSkip : () => setStep((s) => s - 1)}
      />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 16px" }}>
        {stepContent[step - 1]}
      </div>
      <div
        style={{
          padding: "0 16px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flexShrink: 0,
          borderTop: `1px solid ${T.gray2}`,
          paddingTop: 14,
        }}
      >
        <Btn
          onClick={() => {
            if (step < 3) setStep((s) => s + 1);
            else onDone();
          }}
          disabled={!canNext[step - 1]}
        >
          {step < 3 ? "Continue →" : "Complete Verification ✓"}
        </Btn>
        <button
          onClick={onSkip}
          style={{
            background: "none",
            border: "none",
            color: T.gray3,
            fontSize: 13,
            cursor: "pointer",
            padding: "6px 0",
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

// ─── KYC HOST ─────────────────────────────────────────────────────────────────
const KYCHost = ({ onDone, onSkip }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    docType: "Aadhaar",
    docNum: "",
    docPhoto: null,
    addrType: "Electricity Bill",
    addrPhoto: null,
    photos: [],
  });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const photoRef = useRef();

  const canNext = [
    form.docNum.length >= 6 && !!form.docPhoto,
    !!form.addrPhoto,
    form.photos.length >= 2,
  ];

  const stepContent = [
    // Step 1 – ID Proof
    <div key="h1" className="fu">
      <div style={{ marginBottom: 18 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 4px",
          }}
        >
          Identity Proof
        </h2>
        <p style={{ color: T.gray4, fontSize: 14, margin: 0 }}>
          Required to activate host listing
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 14,
        }}
      >
        {["Aadhaar", "Voter ID", "Passport", "Driving Licence"].map((t) => (
          <div
            key={t}
            onClick={() => up("docType", t)}
            className="tb"
            style={{
              border: `1.5px solid ${form.docType === t ? T.green : T.gray2}`,
              borderRadius: 10,
              padding: 12,
              textAlign: "center",
              cursor: "pointer",
              background: form.docType === t ? T.greenLight : T.gray1,
              fontWeight: 600,
              fontSize: 13,
              color: form.docType === t ? T.green : T.gray4,
              transition: "all .15s",
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <KycField
        label={`${form.docType} Number`}
        value={form.docNum}
        onChange={(v) => up("docNum", v)}
        placeholder={`Enter ${form.docType} number`}
      />
      <UploadBox
        label={`${form.docType} photo`}
        value={form.docPhoto}
        onChange={(v) => up("docPhoto", v)}
      />
    </div>,

    // Step 2 – Address Proof
    <div key="h2" className="fu">
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 4px",
          }}
        >
          Address Proof
        </h2>
        <p style={{ color: T.gray4, fontSize: 14, margin: 0 }}>
          Upload any one document
        </p>
      </div>
      {[
        ["⚡", "Electricity Bill"],
        ["🔥", "Gas Bill"],
        ["💧", "Water Bill"],
        ["🏦", "Bank Statement"],
      ].map(([e, l]) => (
        <div
          key={l}
          onClick={() => up("addrType", l)}
          className="tb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: `1.5px solid ${form.addrType === l ? T.green : T.gray2}`,
            borderRadius: 12,
            padding: "12px 14px",
            cursor: "pointer",
            background: form.addrType === l ? T.greenLight : T.white,
            marginBottom: 8,
            transition: "all .15s",
          }}
        >
          <span style={{ fontSize: 22 }}>{e}</span>
          <p
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: T.dark,
              margin: 0,
              flex: 1,
            }}
          >
            {l}
          </p>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: `2px solid ${form.addrType === l ? T.green : T.gray3}`,
              background: form.addrType === l ? T.green : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .15s",
            }}
          >
            {form.addrType === l && <Ic n="check" s={12} c={T.white} />}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 14 }}>
        <UploadBox
          label={form.addrType}
          value={form.addrPhoto}
          onChange={(v) => up("addrPhoto", v)}
        />
      </div>
    </div>,

    // Step 3 – Spot Photos
    <div key="h3" className="fu">
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: T.dark,
            margin: "0 0 4px",
          }}
        >
          Spot Photos
        </h2>
        <p style={{ color: T.gray4, fontSize: 14, margin: 0 }}>
          Upload at least 2 clear photos of your parking spot
        </p>
      </div>
      <input
        ref={photoRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          Array.from(e.target.files)
            .slice(0, 4 - form.photos.length)
            .forEach((f) => {
              const r = new FileReader();
              r.onload = (ev) =>
                setForm((prev) => ({
                  ...prev,
                  photos: [...prev.photos, ev.target.result].slice(0, 4),
                }));
              r.readAsDataURL(f);
            });
        }}
        style={{ display: "none" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {form.photos.map((p, i) => (
          <div
            key={i}
            className="si"
            style={{
              height: 100,
              borderRadius: 12,
              overflow: "hidden",
              border: `2px solid ${T.green}`,
              position: "relative",
            }}
          >
            <img
              src={p}
              alt={`p${i}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <button
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  photos: prev.photos.filter((_, j) => j !== i),
                }))
              }
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "rgba(0,0,0,0.5)",
                border: "none",
                borderRadius: "50%",
                width: 22,
                height: 22,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic n="close" s={12} c={T.white} />
            </button>
          </div>
        ))}
        {form.photos.length < 4 && (
          <div
            onClick={() => photoRef.current?.click()}
            className="tb"
            style={{
              height: 100,
              borderRadius: 12,
              background: T.gray1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: `2px dashed ${T.gray2}`,
              cursor: "pointer",
            }}
          >
            <Ic n="plus" s={24} c={T.gray3} />
            <p style={{ margin: "6px 0 0", fontSize: 12, color: T.gray3 }}>
              Add Photo
            </p>
          </div>
        )}
      </div>
      {form.photos.length < 2 && (
        <Card
          style={{
            padding: "12px 14px",
            background: "#FFF8E7",
            border: `1px solid ${T.amber}30`,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span>⚠️</span>
            <p style={{ margin: 0, fontSize: 12, color: "#92400E" }}>
              At least 2 photos required. Clear, well-lit photos increase
              bookings by 3×.
            </p>
          </div>
        </Card>
      )}
    </div>,
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <KycProgress
        step={step}
        total={3}
        title="Host KYC"
        onBack={step === 1 ? onSkip : () => setStep((s) => s - 1)}
      />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 16px" }}>
        {stepContent[step - 1]}
      </div>
      <div
        style={{
          padding: "14px 16px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flexShrink: 0,
          borderTop: `1px solid ${T.gray2}`,
        }}
      >
        <Btn
          onClick={() => {
            if (step < 3) setStep((s) => s + 1);
            else onDone();
          }}
          disabled={!canNext[step - 1]}
        >
          {step < 3 ? "Continue →" : "Submit for Review ✓"}
        </Btn>
        <button
          onClick={onSkip}
          style={{
            background: "none",
            border: "none",
            color: T.gray3,
            fontSize: 13,
            cursor: "pointer",
            padding: "6px 0",
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

// ─── REFER (sub-screen) ───────────────────────────────────────────────────────
const ReferScreen = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const code = "PARK50TN";
  const copy = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      <div
        style={{
          background: T.white,
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${T.gray2}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          className="tb"
          style={{
            background: T.gray1,
            border: "none",
            borderRadius: 10,
            width: 38,
            height: 38,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ic n="back" s={18} c={T.dark} />
        </button>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: T.dark, margin: 0 }}>
          Refer & Earn
        </h2>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 30px" }}>
        <Card
          className="si"
          style={{
            padding: "28px 20px",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 52,
              marginBottom: 14,
              animation: "bounce 2s ease infinite",
            }}
          >
            🎁
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: T.dark,
              margin: "0 0 8px",
            }}
          >
            Earn ₹50
          </h2>
          <p style={{ color: T.gray4, fontSize: 14, margin: "0 0 22px" }}>
            for every friend who books their first spot
          </p>
          <div
            style={{
              background: T.gray1,
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                color: T.dark,
                flex: 1,
                letterSpacing: "0.12em",
              }}
            >
              {code}
            </p>
            <button
              onClick={copy}
              className="tb"
              style={{
                background: copied ? T.green : T.dark,
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                color: T.white,
                transition: "background .2s",
              }}
            >
              {copied ? "Copied! ✓" : "Copy"}
            </button>
          </div>
        </Card>
        {[
          { e: "💰", l: "You earn ₹50 wallet credit" },
          { e: "🎉", l: "Friend gets ₹30 off first booking" },
          { e: "♾️", l: "No limit on referrals" },
        ].map((s, i) => (
          <Card
            key={i}
            className="fu"
            style={{
              padding: "14px 16px",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <span style={{ fontSize: 24 }}>{s.e}</span>
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                color: T.dark,
                fontSize: 14,
              }}
            >
              {s.l}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── PROFILE ──────────────────────────────────────────────────────────────────
const ProfileScreen = ({
  user,
  onLogout,
  onSwitchMode,
  mode,
  vehicleNumber,
  onNav,
  kycStatus,
}) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarRef = useRef();
  const kycDone = kycStatus === "done";

  const kycBadge = kycDone
    ? { bg: "rgba(37,192,90,0.18)", icon: T.green, text: "KYC Verified ✓" }
    : { bg: "rgba(245,158,11,0.18)", icon: T.amber, text: "KYC Pending ⚠️" };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(150deg,#1A2332 0%,#1e3a5f 100%)`,
          padding: "28px 16px 50px",
          flexShrink: 0,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: 12,
            }}
          >
            <img
              src={avatarPreview || "https://i.pravatar.cc/150?img=12"}
              alt="profile"
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                border: `3px solid ${T.white}`,
                objectFit: "cover",
              }}
            />
            <button
              onClick={() => avatarRef.current?.click()}
              className="tb"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: T.green,
                border: `2px solid ${T.white}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic n="cam" s={14} c={T.white} />
            </button>
            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) {
                  const r = new FileReader();
                  r.onload = (ev) => setAvatarPreview(ev.target.result);
                  r.readAsDataURL(f);
                }
              }}
              style={{ display: "none" }}
            />
          </div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: T.white,
              margin: "0 0 4px",
            }}
          >
            {user?.name || "User"}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
              margin: "0 0 12px",
            }}
          >
            +91 {user?.phone}
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: kycBadge.bg,
              borderRadius: 99,
              padding: "5px 14px",
            }}
          >
            <Ic n={kycDone ? "verify" : "shield"} s={14} c={kycBadge.icon} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.white }}>
              {kycBadge.text}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px 30px",
          marginTop: -20,
        }}
      >
        {/* KYC Banner — shown when not verified */}
        {!kycDone && (
          <Card
            className="fu tb"
            onClick={() => onNav("kyc_driver")}
            style={{
              padding: "14px 16px",
              marginBottom: 12,
              background: "#FFFBEB",
              border: `1.5px solid ${T.amber}60`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 13,
                background: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Ic n="shield" s={24} c={T.amber} />
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontWeight: 800,
                  color: "#92400E",
                  margin: "0 0 2px",
                  fontSize: 14,
                }}
              >
                Complete KYC Verification
              </p>
              <p style={{ color: "#B45309", fontSize: 12, margin: 0 }}>
                Required to book & host spots
              </p>
            </div>
            <div
              style={{
                background: T.amber,
                borderRadius: 8,
                padding: "6px 12px",
                flexShrink: 0,
              }}
            >
              <span style={{ color: T.white, fontSize: 12, fontWeight: 700 }}>
                Start →
              </span>
            </div>
          </Card>
        )}

        {/* Switch mode */}
        <Card
          className="fu tb"
          onClick={onSwitchMode}
          style={{
            padding: "16px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
            border: `1.5px solid ${T.green}25`,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: T.greenLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ic n="host" s={22} c={T.green} />
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontWeight: 700,
                color: T.dark,
                margin: "0 0 2px",
                fontSize: 15,
              }}
            >
              {mode === "host" ? "Switch to Driver" : "Switch to Host"}
            </p>
            <p style={{ color: T.gray3, fontSize: 13, margin: 0 }}>
              {mode === "host"
                ? "Find & book parking"
                : "List your space, earn money"}
            </p>
          </div>
          <Ic n="arr" s={18} c={T.green} />
        </Card>

        {/* Menu items */}
        {[
          {
            l: "KYC Verification",
            i: "shield",
            d: kycDone ? "Verified ✓" : "Pending – Tap to complete",
            k: "kyc_driver",
            hi: !kycDone,
          },
          {
            l: "My Vehicles",
            i: "car",
            d: vehicleNumber || "Add vehicle",
            k: "vehicles",
          },
          { l: "Safety", i: "safety", d: "Emergency contacts", k: "safety" },
          {
            l: "Refer & Earn",
            i: "refer",
            d: "Get ₹50 per referral",
            k: "refer",
          },
          {
            l: "Community",
            i: "chat",
            d: "Parking tips & discussions",
            k: null,
          },
        ].map((item, i) => (
          <Card
            key={item.l}
            className="fu tb"
            onClick={() => item.k && onNav(item.k)}
            style={{
              padding: "14px 16px",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: item.k ? "pointer" : "default",
              animationDelay: `${i * 0.04}s`,
              border: item.hi ? `1.5px solid ${T.amber}40` : "none",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: item.hi ? "#FEF3C7" : T.gray1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic n={item.i} s={20} c={item.hi ? T.amber : T.dark} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontWeight: 600,
                  color: T.dark,
                  margin: "0 0 2px",
                  fontSize: 14,
                }}
              >
                {item.l}
              </p>
              <p
                style={{
                  color: item.hi ? T.amber : T.gray3,
                  fontSize: 12,
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.d}
              </p>
            </div>
            {item.hi ? (
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: T.amber,
                  animation: "ping 1.4s ease infinite",
                }}
              />
            ) : (
              <Ic n="arr" s={16} c={T.gray3} />
            )}
          </Card>
        ))}

        <button
          onClick={onLogout}
          className="tb"
          style={{
            width: "100%",
            marginTop: 16,
            padding: 14,
            borderRadius: 12,
            border: `1.5px solid ${T.red}30`,
            background: "#FFF5F5",
            color: T.red,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [subScreen, setSubScreen] = useState(null); // vehicles | safety | refer | kyc_driver | kyc_host
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [appMode, setAppMode] = useState("user"); // user | host
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [bookingSpace, setBookingSpace] = useState(null);
  const [bookingHours, setBookingHours] = useState(2);
  const [allBookings, setAllBookings] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState("TN 59 AB 1234");
  const [kycStatus, setKycStatus] = useState("pending"); // pending | done

  const pendingBookings = allBookings.filter((b) => b.status === "pending");

  const addBooking = ({ space, hours, total, bookingId }) => {
    const now = new Date();
    const fmt = (d) =>
      d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setAllBookings((prev) => [
      {
        id: bookingId || `PK${Date.now().toString().slice(-6)}`,
        space,
        hours,
        date: "Today",
        time: `${fmt(now)} – ${fmt(new Date(now.getTime() + hours * 3600000))}`,
        vehicle: vehicleNumber,
        status: "pending",
        total,
      },
      ...prev,
    ]);
  };

  const acceptBooking = (id) =>
    setAllBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "active" } : b))
    );
  const rejectBooking = (id) =>
    setAllBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );

  const handleNav = (dest) => {
    const subScreens = [
      "vehicles",
      "safety",
      "refer",
      "kyc_driver",
      "kyc_host",
    ];
    if (subScreens.includes(dest)) {
      setSubScreen(dest);
      return;
    }
    if (["hostDashboard", "hostBookings", "hostWallet"].includes(dest))
      setAppMode("host");
    if (["home", "bookings", "wallet"].includes(dest)) setAppMode("user");
    setActiveTab(dest);
    setScreen("main");
    setSubScreen(null);
    setSelectedSpace(null);
    setBookingSpace(null);
  };

  const handleSwitchMode = () => {
    const next = appMode === "user" ? "host" : "user";
    setAppMode(next);
    setActiveTab(next === "host" ? "hostDashboard" : "home");
    setScreen("main");
    setSubScreen(null);
  };

  // ── KYC sub-screens
  if (subScreen === "kyc_driver")
    return (
      <AppShell>
        <style>{CSS}</style>
        <KYCDriver
          onDone={() => {
            setKycStatus("done");
            setSubScreen(null);
          }}
          onSkip={() => setSubScreen(null)}
        />
      </AppShell>
    );
  if (subScreen === "kyc_host")
    return (
      <AppShell>
        <style>{CSS}</style>
        <KYCHost
          onDone={() => {
            setKycStatus("done");
            setSubScreen(null);
          }}
          onSkip={() => setSubScreen(null)}
        />
      </AppShell>
    );

  // ── Other sub-screens
  if (subScreen === "vehicles")
    return (
      <AppShell>
        <style>{CSS}</style>
        <MyVehiclesScreen
          onBack={() => setSubScreen(null)}
          vehicleNumber={vehicleNumber}
          onSave={(v) => {
            setVehicleNumber(v);
            setSubScreen(null);
          }}
        />
      </AppShell>
    );
  if (subScreen === "safety")
    return (
      <AppShell>
        <style>{CSS}</style>
        <SafetyScreen onBack={() => setSubScreen(null)} />
      </AppShell>
    );
  if (subScreen === "refer")
    return (
      <AppShell>
        <style>{CSS}</style>
        <ReferScreen onBack={() => setSubScreen(null)} />
      </AppShell>
    );

  // ── Main content resolver
  const renderContent = () => {
    if (screen === "parkingDetail" && selectedSpace)
      return (
        <ParkingDetailScreen
          space={selectedSpace}
          onBack={() => setScreen("main")}
          onBook={(s, h) => {
            setBookingSpace(s);
            setBookingHours(h);
            setScreen("booking");
          }}
        />
      );

    if (screen === "booking" && bookingSpace)
      return (
        <BookingConfirmScreen
          space={bookingSpace}
          hours={bookingHours}
          onAddBooking={addBooking}
          onDone={() => {
            setActiveTab("bookings");
            setAppMode("user");
            setScreen("main");
            setBookingSpace(null);
          }}
        />
      );

    if (appMode === "host") {
      if (activeTab === "hostDashboard")
        return (
          <HostDashboard
            onNav={handleNav}
            pendingCount={pendingBookings.length}
          />
        );
      if (activeTab === "hostBookings")
        return (
          <HostBookingRequests
            bookings={allBookings}
            onAccept={acceptBooking}
            onReject={rejectBooking}
          />
        );
      if (activeTab === "hostWallet") return <WalletScreen />;
    } else {
      if (activeTab === "home")
        return (
          <MapScreen
            onSelectParking={(s) => {
              setSelectedSpace(s);
              setScreen("parkingDetail");
            }}
            onNav={handleNav}
          />
        );
      if (activeTab === "bookings")
        return <BookingsScreen dynamicBookings={allBookings} />;
      if (activeTab === "wallet") return <WalletScreen />;
    }
    if (activeTab === "profile")
      return (
        <ProfileScreen
          user={user}
          onLogout={() => {
            setUser(null);
            setScreen("login");
          }}
          onSwitchMode={handleSwitchMode}
          mode={appMode}
          vehicleNumber={vehicleNumber}
          onNav={handleNav}
          kycStatus={kycStatus}
        />
      );

    return (
      <MapScreen
        onSelectParking={(s) => {
          setSelectedSpace(s);
          setScreen("parkingDetail");
        }}
        onNav={handleNav}
      />
    );
  };

  return <FullShowcaseBoard />;
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
function AppShell({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#DDE1EA",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          minHeight: "100vh",
          background: T.bg,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 0 50px rgba(0,0,0,0.12)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
