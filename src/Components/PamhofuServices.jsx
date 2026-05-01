import { useState, useRef } from "react";

// ─── COLOUR TOKENS ───────────────────────────────────────────────
const C = {
  gold:       "#D4A017",
  goldLight:  "#F5C842",
  goldDim:    "#9B7210",
  purple:     "#37187e",
  purpleMid:  "#4B2D8F",
  purpleLight:"#6B46C1",
  dark:       "#0F0A1E",
  darkCard:   "#1A1035",
  darkBorder: "#2D1F50",
  text:       "#F0E8FF",
  textMuted:  "#9E8DC0",
  white:      "#FFFFFF",
  error:      "#FF6B6B",
  errorDim:   "#FF6B6B33",
};

// ─── INLINE STYLES ───────────────────────────────────────────────
const S = {
  overlay: {
    position:"fixed", inset:0, background:"rgba(15,10,30,0.88)",
    backdropFilter:"blur(6px)", zIndex:1050,
    display:"flex", alignItems:"center", justifyContent:"center",
    padding:"16px",
  },
  modal: {
    background:`linear-gradient(145deg, ${C.dark} 0%, ${C.darkCard} 100%)`,
    border:`1px solid ${C.darkBorder}`,
    borderRadius:"20px", width:"100%", maxWidth:"720px",
    maxHeight:"90vh", overflowY:"auto",
    boxShadow:`0 0 60px rgba(212,160,23,0.15), 0 0 0 1px ${C.darkBorder}`,
    fontFamily:"'Segoe UI', system-ui, sans-serif",
    color:C.text,
  },
  modalHeader: {
    display:"flex", alignItems:"center", justifyContent:"space-between",
    padding:"20px 24px 16px",
    borderBottom:`1px solid ${C.darkBorder}`,
    background:`linear-gradient(90deg, ${C.purple}44 0%, transparent 100%)`,
  },
  closeBtn: {
    background:"none", border:`1px solid ${C.darkBorder}`,
    color:C.textMuted, borderRadius:"50%",
    width:"34px", height:"34px", cursor:"pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:"16px", transition:"all .2s",
  },
  pill: (active) => ({
    padding:"6px 14px", borderRadius:"20px", fontSize:"13px",
    cursor:"pointer", transition:"all .2s",
    background: active ? C.gold : "transparent",
    color: active ? C.dark : C.textMuted,
    border:`1px solid ${active ? C.gold : C.darkBorder}`,
    fontWeight: active ? 700 : 400,
  }),
  inputBase: {
    background:C.darkCard,
    border:`1px solid ${C.darkBorder}`,
    borderRadius:"10px", padding:"10px 14px",
    color:C.text, width:"100%", outline:"none",
    fontSize:"14px", boxSizing:"border-box",
  },
  inputError: {
    background:C.darkCard,
    border:`1px solid ${C.error}`,
    borderRadius:"10px", padding:"10px 14px",
    color:C.text, width:"100%", outline:"none",
    fontSize:"14px", boxSizing:"border-box",
  },
  btnGold: {
    background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
    color:C.dark, border:"none", borderRadius:"10px",
    padding:"11px 24px", fontWeight:700, cursor:"pointer",
    fontSize:"14px", letterSpacing:".4px",
    transition:"opacity .2s",
  },
  btnOutline: {
    background:"transparent",
    border:`1px solid ${C.darkBorder}`,
    color:C.textMuted, borderRadius:"10px",
    padding:"10px 20px", cursor:"pointer", fontSize:"14px",
    transition:"all .2s",
  },
  tag: {
    display:"inline-block", fontSize:"11px", fontWeight:700,
    padding:"3px 10px", borderRadius:"20px",
    background:`${C.gold}22`, color:C.gold,
    border:`1px solid ${C.goldDim}`, letterSpacing:".6px",
  },
};

// ─── ZIMBABWEAN PHONE VALIDATION ─────────────────────────────────
// Accepts: 07XXXXXXXX, 08XXXXXXXX, +2637XXXXXXXX, +2638XXXXXXXX, 2637XXXXXXXX
const ZW_PHONE_REGEX = /^(\+?263|0)[78]\d{8}$/;
const validatePhone = (phone) => ZW_PHONE_REGEX.test(phone.replace(/\s/g, ""));

// ─── REUSABLE CONTACT FIELDS ──────────────────────────────────────
function ContactFields({ stepNumber, customerName, setCustomerName,
                         customerPhone, setCustomerPhone, phoneTouched, setPhoneTouched }) {
  const phoneOk = !phoneTouched || validatePhone(customerPhone);
  return (
    <>
      <SectionLabel number={stepNumber} label="Contact Information" />
      <div style={{ display:"flex", gap:"12px", marginBottom:"20px", flexWrap:"wrap" }}>

        {/* Full Name */}
        <div style={{ flex:"1 1 200px" }}>
          <div style={{
            fontSize:"11px", color:C.textMuted, letterSpacing:".5px",
            marginBottom:"6px", textTransform:"uppercase",
          }}>Full Name</div>
          <input
            placeholder="e.g. Tendai Moyo"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            style={S.inputBase}
          />
        </div>

        {/* Phone Number */}
        <div style={{ flex:"1 1 200px" }}>
          <div style={{
            fontSize:"11px", letterSpacing:".5px", marginBottom:"6px",
            textTransform:"uppercase",
            color: phoneTouched && !phoneOk ? C.error : C.textMuted,
          }}>
            WhatsApp / Phone Number
          </div>
          <input
            placeholder="077... / 078... / +2637..."
            value={customerPhone}
            onBlur={() => setPhoneTouched(true)}
            onChange={e => setCustomerPhone(e.target.value)}
            style={phoneTouched && !phoneOk ? S.inputError : S.inputBase}
          />
          {phoneTouched && !phoneOk && (
            <div style={{
              fontSize:"11px", color:C.error, marginTop:"5px",
              background:C.errorDim, borderRadius:"6px",
              padding:"4px 10px", display:"inline-block",
            }}>
              ⚠ Enter a valid Zimbabwean number (e.g. 0771234567)
            </div>
          )}
        </div>

      </div>
    </>
  );
}

// ─── WHATSAPP SUBMISSION HELPER ───────────────────────────────────
const sendToWhatsApp = async (payload) => {
  try {
    const response = await fetch("http://localhost:8000/submit-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (result.status.includes("Forwarded")) {
      alert("Order sent successfully to WhatsApp!");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("Failed to send order. Check if your FastAPI server is running.");
  }
};

// ─── SERVICE CARD ─────────────────────────────────────────────────
function ServiceCard({ icon, title, subtitle, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:1, minWidth:"200px",
        background: hov
          ? `linear-gradient(145deg, ${C.purpleMid} 0%, ${C.purple} 100%)`
          : `linear-gradient(145deg, ${C.darkCard} 0%, ${C.dark} 100%)`,
        border:`1px solid ${hov ? C.gold : C.darkBorder}`,
        borderRadius:"16px", padding:"28px 20px",
        textAlign:"center", cursor:"pointer",
        transition:"all .25s", color:C.text,
        boxShadow: hov ? `0 8px 32px ${C.gold}33` : "none",
        transform: hov ? "translateY(-4px)" : "none",
      }}
    >
      <div style={{fontSize:"40px", marginBottom:"12px"}}>{icon}</div>
      <div style={{fontWeight:700, fontSize:"15px", letterSpacing:".6px",
                   textTransform:"uppercase", color: hov ? C.goldLight : C.text}}>
        {title}
      </div>
      <div style={{fontSize:"12px", color:C.textMuted, marginTop:"6px"}}>{subtitle}</div>
      <div style={{marginTop:"14px", display:"flex", alignItems:"center",
                   justifyContent:"center", gap:"6px",
                   color: hov ? C.gold : C.purpleLight, fontSize:"12px", fontWeight:600}}>
        View Details <span style={{fontSize:"14px"}}>→</span>
      </div>
    </div>
  );
}

// ─── ABATTOIR MODAL ───────────────────────────────────────────────
const SLAUGHTER = [
  { key:"cattle", label:"Cattle", icon:"🐄", price:40 },
  { key:"pig",    label:"Pig",    icon:"🐷", price:12 },
  { key:"goat",   label:"Goat",   icon:"🐐", price:5  },
];

function AbattoirModal({ onClose }) {
  const [selected, setSelected]           = useState(null);
  const [qty, setQty]                     = useState(1);
  const [files, setFiles]                 = useState([]);
  const [customerName, setCustomerName]   = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneTouched, setPhoneTouched]   = useState(false);
  const fileRef = useRef();

  const service   = SLAUGHTER.find(s => s.key === selected);
  const total     = service ? service.price * qty : 0;
  const phoneOk   = validatePhone(customerPhone);
  const canSubmit = selected && customerName.trim() && phoneOk;

  const handleFiles = (e) => {
    setFiles(prev => [...prev, ...Array.from(e.target.files)]);
  };

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <div style={S.modalHeader}>
          <div>
            <span style={S.tag}>ABATTOIR</span>
            <h2 style={{margin:"8px 0 2px", fontSize:"20px", fontWeight:800}}>
              🔪 Slaughter Service
            </h2>
            <p style={{margin:0, fontSize:"13px", color:C.textMuted}}>
              Select your animal type, quantity &amp; upload clearance docs
            </p>
          </div>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{padding:"24px"}}>

          {/* Step 1 — Animal type */}
          <SectionLabel number="1" label="Select Animal Type" />
          <div style={{display:"flex", gap:"14px", marginBottom:"24px", flexWrap:"wrap"}}>
            {SLAUGHTER.map(s => (
              <AnimalCard key={s.key} {...s}
                active={selected === s.key}
                onClick={() => setSelected(s.key)}
              />
            ))}
          </div>

          {/* Step 2 — Quantity */}
          <SectionLabel number="2" label="Number of Animals" />
          <div style={{display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px"}}>
            <button style={{...S.btnOutline, padding:"8px 16px", fontSize:"18px"}}
              onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
            <input
              type="number" min="1" value={qty}
              onChange={e => setQty(Math.max(1, parseInt(e.target.value)||1))}
              style={{...S.inputBase, width:"80px", textAlign:"center", fontSize:"18px", fontWeight:700}}
            />
            <button style={{...S.btnOutline, padding:"8px 16px", fontSize:"18px"}}
              onClick={() => setQty(q => q+1)}>+</button>

            {service && (
              <div style={{
                marginLeft:"auto",
                background:`linear-gradient(135deg, ${C.purple}, ${C.purpleMid})`,
                border:`1px solid ${C.gold}44`, borderRadius:"12px",
                padding:"10px 20px", textAlign:"right",
              }}>
                <div style={{fontSize:"11px", color:C.textMuted, letterSpacing:".5px"}}>TOTAL COST</div>
                <div style={{fontSize:"22px", fontWeight:800, color:C.goldLight}}>
                  ${total.toFixed(2)}
                </div>
                <div style={{fontSize:"11px", color:C.textMuted}}>
                  {qty} × ${service.price}
                </div>
              </div>
            )}
          </div>

          {/* Step 3 — Documents */}
          <SectionLabel number="3" label="Upload Clearance Documents" />
          <div
            onClick={() => fileRef.current.click()}
            style={{
              border:`2px dashed ${C.darkBorder}`, borderRadius:"12px",
              padding:"24px", textAlign:"center", cursor:"pointer",
              transition:"border-color .2s", marginBottom:"8px",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor=C.gold}
            onMouseLeave={e => e.currentTarget.style.borderColor=C.darkBorder}
          >
            <div style={{fontSize:"28px"}}>📂</div>
            <div style={{color:C.textMuted, fontSize:"13px", marginTop:"6px"}}>
              Click to upload <strong style={{color:C.gold}}>PDF or JPG</strong> clearance files
            </div>
            <div style={{fontSize:"11px", color:C.textMuted, marginTop:"4px"}}>
              Police clearance &amp; Veterinary clearance required
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg"
              multiple hidden onChange={handleFiles} />
          </div>
          {files.length > 0 && (
            <div style={{display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"16px"}}>
              {files.map((f,i) => (
                <div key={i} style={{
                  background:`${C.gold}15`, border:`1px solid ${C.goldDim}`,
                  borderRadius:"8px", padding:"5px 10px",
                  fontSize:"12px", color:C.gold,
                  display:"flex", alignItems:"center", gap:"6px",
                }}>
                  📄 {f.name}
                  <span style={{cursor:"pointer", color:C.textMuted}}
                    onClick={() => setFiles(prev => prev.filter((_,j)=>j!==i))}>✕</span>
                </div>
              ))}
            </div>
          )}

          {/* Step 4 — Contact */}
          <ContactFields
            stepNumber="4"
            customerName={customerName}     setCustomerName={setCustomerName}
            customerPhone={customerPhone}   setCustomerPhone={setCustomerPhone}
            phoneTouched={phoneTouched}     setPhoneTouched={setPhoneTouched}
          />

          {/* Submit */}
          <div style={{display:"flex", justifyContent:"flex-end", marginTop:"8px"}}>
            <button
              style={{...S.btnGold, opacity: canSubmit ? 1 : 0.5,
                      cursor: canSubmit ? "pointer" : "not-allowed"}}
              disabled={!canSubmit}
              onClick={() => sendToWhatsApp({
                type: "ABATTOIR",
                customerName,
                customerPhone,
                animal: selected,
                qty,
                total,
              })}
            >
              Submit Booking →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function AnimalCard({ key: _k, icon, label, price, active, onClick }) {
  return (
    <div onClick={onClick} style={{
      flex:1, minWidth:"110px", borderRadius:"14px", padding:"16px 12px",
      textAlign:"center", cursor:"pointer", transition:"all .2s",
      background: active
        ? `linear-gradient(135deg, ${C.purpleMid}, ${C.purple})`
        : C.darkCard,
      border:`2px solid ${active ? C.gold : C.darkBorder}`,
      boxShadow: active ? `0 4px 20px ${C.gold}44` : "none",
    }}>
      <div style={{fontSize:"32px"}}>{icon}</div>
      <div style={{fontWeight:700, fontSize:"14px", marginTop:"6px"}}>{label}</div>
      <div style={{
        fontSize:"13px", fontWeight:800, marginTop:"4px",
        color: active ? C.goldLight : C.textMuted,
      }}>${price}/head</div>
    </div>
  );
}

// ─── BUTCHERY MODAL ────────────────────────────────────────────────
const MEAT_CATALOGUE = [
  { category:"Beef", items:[
    { name:"Sirloin Steak",      price:8.50,  unit:"kg" },
    { name:"Rump Steak",         price:7.00,  unit:"kg" },
    { name:"Tenderloin",         price:12.00, unit:"kg" },
    { name:"Chuck (Stewing)",    price:5.50,  unit:"kg" },
    { name:"Brisket",            price:4.80,  unit:"kg" },
    { name:"Mince (Extra Lean)", price:6.00,  unit:"kg" },
    { name:"Short Ribs",         price:6.50,  unit:"kg" },
    { name:"Oxtail",             price:7.50,  unit:"kg" },
  ]},
  { category:"Pork", items:[
    { name:"Pork Chops",  price:5.00, unit:"kg" },
    { name:"Pork Ribs",   price:5.50, unit:"kg" },
    { name:"Pork Mince",  price:4.00, unit:"kg" },
  ]},
  { category:"Goat", items:[
    { name:"Goat Leg",   price:6.00, unit:"kg" },
    { name:"Goat Ribs",  price:5.00, unit:"kg" },
    { name:"Goat Mince", price:4.50, unit:"kg" },
  ]},
];

function ButcheryModal({ onClose }) {
  const [cart, setCart]                   = useState({});
  const [activeTab, setActiveTab]         = useState("Beef");
  const [customerName, setCustomerName]   = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneTouched, setPhoneTouched]   = useState(false);

  const allItems   = MEAT_CATALOGUE.flatMap(c => c.items);
  const cartItems  = Object.entries(cart).filter(([,v]) => v > 0)
    .map(([name, kg]) => {
      const item = allItems.find(i => i.name === name);
      return { name, kg, price: item ? item.price * kg : 0 };
    });
  const grandTotal = cartItems.reduce((s,i) => s + i.price, 0);
  const phoneOk    = validatePhone(customerPhone);
  const canOrder   = cartItems.length > 0 && customerName.trim() && phoneOk;

  const setKg = (name, val) => {
    const v = Math.max(0, parseFloat(val)||0);
    setCart(prev => ({ ...prev, [name]: v }));
  };

  const activeItems = MEAT_CATALOGUE.find(c => c.category === activeTab)?.items || [];

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{...S.modal, maxWidth:"820px"}}>
        <div style={S.modalHeader}>
          <div>
            <span style={S.tag}>BUTCHERY</span>
            <h2 style={{margin:"8px 0 2px", fontSize:"20px", fontWeight:800}}>
              🥩 Meat Catalogue
            </h2>
            <p style={{margin:0, fontSize:"13px", color:C.textMuted}}>
              Select cuts &amp; quantities — your order totals live on the scale
            </p>
          </div>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{padding:"20px 24px", display:"flex", gap:"20px", flexWrap:"wrap"}}>

          {/* LEFT — catalogue + contact */}
          <div style={{flex:"1 1 340px"}}>
            {/* Category tabs */}
            <div style={{display:"flex", gap:"8px", marginBottom:"16px"}}>
              {MEAT_CATALOGUE.map(c => (
                <button key={c.category} style={S.pill(activeTab === c.category)}
                  onClick={() => setActiveTab(c.category)}>
                  {c.category}
                </button>
              ))}
            </div>

            {/* Items table */}
            <div style={{
              background:C.dark, borderRadius:"12px",
              border:`1px solid ${C.darkBorder}`, overflow:"hidden",
            }}>
              <div style={{
                display:"grid", gridTemplateColumns:"1fr 80px 90px",
                padding:"8px 14px", fontSize:"11px", letterSpacing:".7px",
                color:C.textMuted, borderBottom:`1px solid ${C.darkBorder}`,
                textTransform:"uppercase",
              }}>
                <span>Cut</span>
                <span style={{textAlign:"center"}}>$/kg</span>
                <span style={{textAlign:"center"}}>Qty (kg)</span>
              </div>
              {activeItems.map((item, i) => {
                const kgVal  = cart[item.name] || "";
                const active = kgVal > 0;
                return (
                  <div key={item.name} style={{
                    display:"grid", gridTemplateColumns:"1fr 80px 90px",
                    padding:"10px 14px", alignItems:"center",
                    background: active ? `${C.gold}08` : "transparent",
                    borderBottom: i < activeItems.length-1 ? `1px solid ${C.darkBorder}` : "none",
                    transition:"background .15s",
                  }}>
                    <div style={{fontSize:"14px", fontWeight: active ? 600 : 400,
                                 color: active ? C.white : C.text}}>
                      {active && <span style={{color:C.gold, marginRight:"6px"}}>●</span>}
                      {item.name}
                    </div>
                    <div style={{textAlign:"center", fontSize:"13px",
                                 color:C.goldLight, fontWeight:600}}>
                      ${item.price.toFixed(2)}
                    </div>
                    <div style={{textAlign:"center"}}>
                      <input
                        type="number" min="0" step="0.5" placeholder="0"
                        value={kgVal}
                        onChange={e => setKg(item.name, e.target.value)}
                        style={{
                          ...S.inputBase, width:"64px", textAlign:"center",
                          padding:"6px 8px", fontSize:"13px",
                          border:`1px solid ${active ? C.gold : C.darkBorder}`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact fields */}
            <div style={{marginTop:"24px"}}>
              <ContactFields
                stepNumber="2"
                customerName={customerName}     setCustomerName={setCustomerName}
                customerPhone={customerPhone}   setCustomerPhone={setCustomerPhone}
                phoneTouched={phoneTouched}     setPhoneTouched={setPhoneTouched}
              />
            </div>
          </div>

          {/* RIGHT — scale / order summary */}
          <div style={{flex:"1 1 220px", display:"flex", flexDirection:"column", gap:"14px"}}>
            {/* Scale widget */}
            <div style={{
              background:`linear-gradient(145deg, ${C.purple}88, ${C.purpleMid}44)`,
              border:`1px solid ${C.goldDim}`,
              borderRadius:"16px", padding:"20px", textAlign:"center",
            }}>
              <div style={{fontSize:"36px"}}>⚖️</div>
              <div style={{fontSize:"11px", letterSpacing:".8px",
                           color:C.textMuted, marginTop:"6px", textTransform:"uppercase"}}>
                Your Order Total
              </div>
              <div style={{
                fontSize:"36px", fontWeight:900, marginTop:"8px",
                color: grandTotal > 0 ? C.goldLight : C.textMuted,
                transition:"color .3s",
              }}>
                ${grandTotal.toFixed(2)}
              </div>
              {cartItems.length > 0 && (
                <div style={{fontSize:"12px", color:C.textMuted, marginTop:"4px"}}>
                  {cartItems.reduce((s,i) => s + i.kg, 0).toFixed(1)} kg total
                </div>
              )}
            </div>

            {/* Order lines */}
            {cartItems.length === 0 ? (
              <div style={{
                textAlign:"center", color:C.textMuted,
                fontSize:"13px", padding:"20px",
                border:`1px dashed ${C.darkBorder}`, borderRadius:"12px",
              }}>
                No items yet.<br/>Enter kg quantities to add.
              </div>
            ) : (
              <div style={{
                background:C.dark, borderRadius:"12px",
                border:`1px solid ${C.darkBorder}`, overflow:"hidden",
              }}>
                {cartItems.map((item, i) => (
                  <div key={item.name} style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"9px 14px",
                    borderBottom: i < cartItems.length-1 ? `1px solid ${C.darkBorder}` : "none",
                    fontSize:"13px",
                  }}>
                    <div>
                      <div style={{fontWeight:600}}>{item.name}</div>
                      <div style={{fontSize:"11px", color:C.textMuted}}>{item.kg} kg</div>
                    </div>
                    <div style={{color:C.goldLight, fontWeight:700}}>
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              style={{...S.btnGold, width:"100%",
                      opacity: canOrder ? 1 : 0.5,
                      cursor: canOrder ? "pointer" : "not-allowed"}}
              disabled={!canOrder}
              onClick={() => sendToWhatsApp({
                type: "BUTCHERY_ORDER",
                customerName,
                customerPhone,
                items: cartItems,
                total: grandTotal,
              })}
            >
              Place Order →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TRANSPORT MODAL ──────────────────────────────────────────────
const TRANSPORT_TYPES = [
  { key:"cattle", label:"Cattle Transport", icon:"🐄", ratePerKm:3.50 },
  { key:"pig",    label:"Pig Transport",    icon:"🐷", ratePerKm:2.00 },
  { key:"goat",   label:"Goat Transport",   icon:"🐐", ratePerKm:1.50 },
];

const LOCATIONS = [
  { name:"Avondale",            dist:18 },
  { name:"Borrowdale",          dist:28 },
  { name:"Budiriro",            dist:22 },
  { name:"Chitungwiza",         dist:40 },
  { name:"Glen View",           dist:20 },
  { name:"Greendale",           dist:25 },
  { name:"Harare CBD",          dist:15 },
  { name:"Highfield",           dist:17 },
  { name:"Kuwadzana",           dist:8  },
  { name:"Mabvuku",             dist:35 },
  { name:"Mount Pleasant",      dist:22 },
  { name:"Mufakose",            dist:12 },
  { name:"Ruwa",                dist:50 },
  { name:"Warren Park",         dist:10 },
  { name:"Westgate",            dist:5  },
  { name:"Zvimba / Murombedzi", dist:70 },
];

function TransportModal({ onClose }) {
  const [type, setType]                   = useState(null);
  const [pickup, setPickup]               = useState(null);
  const [qty, setQty]                     = useState(1);
  const [search, setSearch]               = useState("");
  const [customerName, setCustomerName]   = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneTouched, setPhoneTouched]   = useState(false);

  const vehicle  = TRANSPORT_TYPES.find(t => t.key === type);
  const loc      = LOCATIONS.find(l => l.name === pickup);
  const cost     = vehicle && loc ? (vehicle.ratePerKm * loc.dist * qty).toFixed(2) : null;
  const phoneOk  = validatePhone(customerPhone);
  const canBook  = type && pickup && customerName.trim() && phoneOk;

  const filtered = LOCATIONS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{...S.modal, maxWidth:"780px"}}>
        <div style={S.modalHeader}>
          <div>
            <span style={S.tag}>TRANSPORT</span>
            <h2 style={{margin:"8px 0 2px", fontSize:"20px", fontWeight:800}}>
              🚛 Transport &amp; Delivery
            </h2>
            <p style={{margin:0, fontSize:"13px", color:C.textMuted}}>
              Select transport type, pickup point &amp; get an instant distance quote
            </p>
          </div>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{padding:"24px"}}>

          {/* Step 1 */}
          <SectionLabel number="1" label="Transport Type" />
          <div style={{display:"flex", gap:"12px", marginBottom:"24px", flexWrap:"wrap"}}>
            {TRANSPORT_TYPES.map(t => (
              <div key={t.key} onClick={() => setType(t.key)} style={{
                flex:1, minWidth:"130px", borderRadius:"14px",
                padding:"14px 10px", textAlign:"center", cursor:"pointer",
                transition:"all .2s",
                background: type===t.key
                  ? `linear-gradient(135deg, ${C.purpleMid}, ${C.purple})`
                  : C.darkCard,
                border:`2px solid ${type===t.key ? C.gold : C.darkBorder}`,
              }}>
                <div style={{fontSize:"28px"}}>{t.icon}</div>
                <div style={{fontWeight:700, fontSize:"13px", marginTop:"6px"}}>{t.label}</div>
                <div style={{fontSize:"12px", marginTop:"3px",
                             color: type===t.key ? C.goldLight : C.textMuted}}>
                  ${t.ratePerKm}/km/head
                </div>
              </div>
            ))}
          </div>

          {/* Step 2 — qty */}
          <SectionLabel number="2" label="Number of Animals" />
          <div style={{display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px"}}>
            <button style={{...S.btnOutline, padding:"7px 14px", fontSize:"18px"}}
              onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
            <input type="number" min="1" value={qty}
              onChange={e => setQty(Math.max(1,parseInt(e.target.value)||1))}
              style={{...S.inputBase, width:"70px", textAlign:"center",
                      fontSize:"16px", fontWeight:700}} />
            <button style={{...S.btnOutline, padding:"7px 14px", fontSize:"18px"}}
              onClick={() => setQty(q => q+1)}>+</button>
          </div>

          {/* Step 3 — pickup map */}
          <SectionLabel number="3" label="Select Pickup Location" />
          <div style={{
            background:C.dark, borderRadius:"16px",
            border:`1px solid ${C.darkBorder}`, overflow:"hidden",
          }}>
            {/* Map placeholder */}
            <div style={{
              height:"160px", position:"relative", overflow:"hidden",
              background:`linear-gradient(135deg, ${C.dark} 0%, ${C.purple}55 100%)`,
            }}>
              <svg width="100%" height="100%" style={{position:"absolute", inset:0, opacity:.15}}>
                {[...Array(10)].map((_,i) => (
                  <line key={`h${i}`} x1="0" y1={i*20} x2="100%" y2={i*20}
                    stroke={C.gold} strokeWidth=".5"/>
                ))}
                {[...Array(20)].map((_,i) => (
                  <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="100%"
                    stroke={C.gold} strokeWidth=".5"/>
                ))}
              </svg>
              <div style={{position:"absolute", right:"18%", top:"40%",
                           display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div style={{fontSize:"22px"}}>📍</div>
                <div style={{
                  background:C.gold, color:C.dark,
                  fontSize:"10px", fontWeight:700, borderRadius:"6px",
                  padding:"2px 7px", marginTop:"2px", whiteSpace:"nowrap",
                }}>Pamhofu Centre</div>
              </div>
              {pickup && (
                <div style={{position:"absolute", left:"22%", top:"30%",
                             display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <div style={{fontSize:"22px"}}>🔵</div>
                  <div style={{
                    background:C.purpleLight, color:C.white,
                    fontSize:"10px", fontWeight:700, borderRadius:"6px",
                    padding:"2px 7px", marginTop:"2px", whiteSpace:"nowrap",
                  }}>{pickup}</div>
                </div>
              )}
              {pickup && (
                <svg style={{position:"absolute", inset:0}} width="100%" height="100%">
                  <line x1="27%" y1="44%" x2="78%" y2="51%"
                    stroke={C.gold} strokeWidth="2" strokeDasharray="6 4" opacity=".7"/>
                </svg>
              )}
              <div style={{
                position:"absolute", bottom:"10px", left:"50%",
                transform:"translateX(-50%)", fontSize:"11px", color:C.textMuted,
              }}>
                Distances calculated from Pamhofu, Plot 604 Rainham Road, West Harare
              </div>
            </div>

            {/* Location search + list */}
            <div style={{padding:"14px"}}>
              <input
                placeholder="🔍  Search suburb..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{...S.inputBase, marginBottom:"10px"}}
              />
              <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill, minmax(160px,1fr))",
                gap:"8px", maxHeight:"180px", overflowY:"auto",
              }}>
                {filtered.map(loc => (
                  <div key={loc.name} onClick={() => setPickup(loc.name)} style={{
                    padding:"8px 12px", borderRadius:"10px", cursor:"pointer",
                    transition:"all .15s",
                    background: pickup===loc.name
                      ? `linear-gradient(135deg, ${C.purpleMid}, ${C.purple})`
                      : C.darkCard,
                    border:`1px solid ${pickup===loc.name ? C.gold : C.darkBorder}`,
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                  }}>
                    <span style={{fontSize:"13px", fontWeight: pickup===loc.name ? 700 : 400}}>
                      {loc.name}
                    </span>
                    <span style={{fontSize:"11px",
                                  color: pickup===loc.name ? C.goldLight : C.textMuted}}>
                      {loc.dist} km
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cost summary */}
          {cost && (
            <div style={{
              marginTop:"16px",
              background:`linear-gradient(135deg, ${C.purple}88, ${C.purpleMid}55)`,
              border:`1px solid ${C.gold}55`,
              borderRadius:"14px", padding:"16px 20px",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              flexWrap:"wrap", gap:"12px",
            }}>
              <div>
                <div style={{fontSize:"12px", color:C.textMuted, letterSpacing:".5px"}}>
                  ESTIMATED TRANSPORT COST
                </div>
                <div style={{fontSize:"13px", color:C.text, marginTop:"4px"}}>
                  {pickup} → Pamhofu · {loc?.dist} km ·&nbsp;
                  {qty} {vehicle?.label} · ${vehicle?.ratePerKm}/km/head
                </div>
              </div>
              <div style={{fontSize:"32px", fontWeight:900, color:C.goldLight}}>
                ${cost}
              </div>
            </div>
          )}

          {/* Step 4 — Contact */}
          <div style={{marginTop:"20px"}}>
            <ContactFields
              stepNumber="4"
              customerName={customerName}     setCustomerName={setCustomerName}
              customerPhone={customerPhone}   setCustomerPhone={setCustomerPhone}
              phoneTouched={phoneTouched}     setPhoneTouched={setPhoneTouched}
            />
          </div>

          <div style={{display:"flex", justifyContent:"flex-end", marginTop:"8px"}}>
            <button
              style={{...S.btnGold,
                      opacity: canBook ? 1 : 0.5,
                      cursor: canBook ? "pointer" : "not-allowed"}}
              disabled={!canBook}
              onClick={() => sendToWhatsApp({
                type: "TRANSPORT",
                customerName,
                customerPhone,
                pickup,
                qty,
                total: cost,
              })}
            >
              Book Transport →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── HELPER ───────────────────────────────────────────────────────
function SectionLabel({ number, label }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px"}}>
      <div style={{
        width:"24px", height:"24px", borderRadius:"50%",
        background:C.gold, color:C.dark,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"12px", fontWeight:800, flexShrink:0,
      }}>{number}</div>
      <div style={{fontSize:"13px", fontWeight:700, letterSpacing:".5px",
                   textTransform:"uppercase", color:C.textMuted}}>
        {label}
      </div>
    </div>
  );
}

// ─── SERVICES SECTION ────────────────────────────────────────────
export default function ServicesSection() {
  const [modal, setModal] = useState(null);

  return (
    <>
      {/* ── Service Bar ─────────────────────────────────────── */}
      <div style={{
        background:`linear-gradient(90deg, ${C.dark} 0%, ${C.darkCard} 100%)`,
        borderTop:`3px solid ${C.gold}`,
        borderBottom:`1px solid ${C.darkBorder}`,
        padding:"0 24px",
      }}>
        <div style={{
          display:"flex", gap:"0", maxWidth:"1100px", margin:"0 auto",
          flexWrap:"wrap",
        }}>
          {[
            { id:"abattoir",  icon:"🔪", title:"Abattoir Service", sub:"Cattle · Pig · Goat" },
            { id:"butchery",  icon:"🥩", title:"Butchery",         sub:"Fresh cuts & meats"  },
            { id:"transport", icon:"🚛", title:"Transport / Delivery", sub:"Farm to table"   },
          ].map((s, i) => (
            <QuickTab key={s.id} {...s} divider={i < 2} onClick={() => setModal(s.id)} />
          ))}
        </div>
      </div>

      {/* ── Cards ────────────────────────────────────────────── */}
      <div style={{
        background:`linear-gradient(180deg, ${C.dark} 0%, #0D0820 100%)`,
        padding:"60px 24px",
      }}>
        <div style={{maxWidth:"900px", margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:"40px"}}>
            <div style={{...S.tag, marginBottom:"12px"}}>OUR SERVICES</div>
            <h2 style={{
              fontSize:"clamp(24px,4vw,36px)", fontWeight:900,
              color:C.white, fontFamily:"Georgia, serif", margin:"0 0 10px",
            }}>
              Full-Spectrum <span style={{color:C.goldLight}}>Meat Services</span>
            </h2>
            <p style={{color:C.textMuted, fontSize:"14px"}}>
              Click any service below to view details, pricing &amp; place a booking.
            </p>
          </div>
          <div style={{display:"flex", gap:"16px", flexWrap:"wrap"}}>
            <ServiceCard icon="🔪" title="Abattoir Service"
              subtitle="Certified slaughter for cattle, pig & goat"
              onClick={() => setModal("abattoir")} />
            <ServiceCard icon="🥩" title="Butchery"
              subtitle="Premium cuts, live pricing on the scale"
              onClick={() => setModal("butchery")} />
            <ServiceCard icon="🚛" title="Transport / Delivery"
              subtitle="Livestock &amp; meat transport from your pickup"
              onClick={() => setModal("transport")} />
          </div>
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────── */}
      {modal === "abattoir"  && <AbattoirModal  onClose={() => setModal(null)} />}
      {modal === "butchery"  && <ButcheryModal  onClose={() => setModal(null)} />}
      {modal === "transport" && <TransportModal onClose={() => setModal(null)} />}
    </>
  );
}

// Quick tab in the top bar
function QuickTab({ icon, title, sub, divider, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:1, minWidth:"160px", padding:"18px 20px",
        cursor:"pointer", transition:"all .2s",
        borderRight: divider ? `1px solid ${C.darkBorder}` : "none",
        background: hov ? `${C.gold}10` : "transparent",
        borderBottom: hov ? `3px solid ${C.gold}` : `3px solid transparent`,
      }}>
      <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
        <span style={{fontSize:"22px"}}>{icon}</span>
        <div>
          <div style={{
            fontSize:"13px", fontWeight:700, letterSpacing:".4px",
            color: hov ? C.goldLight : C.text, textTransform:"uppercase",
          }}>{title}</div>
          <div style={{fontSize:"11px", color:C.textMuted, marginTop:"2px"}}>{sub}</div>
        </div>
      </div>
    </div>
  );
}
