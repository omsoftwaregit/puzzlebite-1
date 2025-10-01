import React, { useState, useMemo, useEffect, useRef } from "react";
import { QrCode, Tag, Star, Shield, BarChart2, Play, Zap, Database, TrendingUp, MapPin } from "lucide-react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-28 min-h-screen py-36 ${className}`}>
      {children}
    </section>
  );
}

function Card({ image, title, price, description, Icon, parallax = false, children, tall = false }) {
  const fallbackImg = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80";
  return (
    <div className={`card-img ${parallax ? "parallax-card" : ""} ${tall ? "card-tall" : ""}`}>
      <img
        src={image}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImg;
        }}
      />
      <div className="card-overlay card-padding">
        {Icon && <Icon className="w-12 h-12 mb-4 text-yellow-300 icon-glow" />}
        <h3 className="text-4xl font-bold mb-2">{title}</h3>
        {price && <p className="text-2xl mb-4 blurred-text">₹ {price}/month</p>}
        {description && <p className="text-lg mb-6">{description}</p>}
        {children}
      </div>
      {/* Behind PuzzleBITE */}
      

    </div>
  );
}

export default function PuzzleBITE() {
  const sections = useMemo(() => ["home", "how", "features", "why", "Behind", "pricing", "contact"], []);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map(id => {
        const el = document.getElementById(id);
        if (el) {
          return { id, offset: Math.abs(el.getBoundingClientRect().top) };
        }
        return { id, offset: Infinity };
      });
      const closest = offsets.reduce((prev, curr) => (curr.offset < prev.offset ? curr : prev));
      setActiveSection(closest.id);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sections, menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const bgGradient = "linear-gradient(135deg, #7B2FF7 0%, #F107A3 100%)";
  const featureImages = [
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1607082349566-187342175e2c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1400&q=80"
  ];

  const pricingImages = [
    "https://images.unsplash.com/photo-1555992336-03a23c1f9003?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
  ];


  return (
    <div className="relative min-h-screen font-sans overflow-y-auto" style={{ background: bgGradient }}>


      <style>{`
        html, body, #root { height: 100%; margin: 0; overflow-x: hidden; }
        nav { position: fixed; top: 0; left: 0; width: 100%; z-index: 50; display: flex; align-items: center; justify-content: center; padding: 1rem 2rem; }
        nav img { height: 110px; }
        nav .menu-btn { position: absolute; right: 20px; top: 20px; cursor: pointer; color: white; z-index: 60; transition: transform .2s ease; }
        nav .menu-btn:active { transform: scale(.95); }
        nav ul { position: absolute; top: 80px; right: 20px; flex-direction: column; align-items: flex-end; background: rgba(0,0,0,0.8); gap: 1rem; padding: 1rem 2rem; border-radius: 0.5rem; backdrop-filter: blur(4px); transition: opacity .3s ease, transform .3s ease; }
        nav ul.hidden { display: none; opacity: 0; pointer-events: none; transform: translateY(-10px); }
        nav ul.visible { display: flex; opacity: 1; pointer-events: auto; transform: translateY(0); }
        nav ul li { list-style: none; }
        @media(min-width:768px){ nav ul{ position: absolute; right: 1.5rem; top: 90px; } }
        nav a { color: white; font-weight: 600; position: relative; padding-bottom: 4px; }
        nav a::after { content: ""; position: absolute; left: 0; bottom: 0; width: 0; height: 2px; background: #ffde6a; transition: width .3s ease; }
        nav a:hover::after, nav a.active::after { width: 100%; }
        .btn-yellow { background: #ffde6a; color: #3a2a00; font-weight: 600; padding: 0.5rem 1rem; border-radius: 0.75rem; transition: transform .3s ease; }
        .btn-yellow:hover { transform: scale(1.05); }
        .card-img { border-radius: 1.25rem; overflow: hidden; position: relative; height: 50vh; max-height: 520px; box-shadow: 0 6px 12px rgba(0,0,0,.2); transition: transform .5s ease, box-shadow .5s ease, border .5s ease; }
        .card-tall { height: 65vh; max-height: 720px; }
        .card-padding { padding: 2.5rem !important; }
        .card-img:hover { transform: translateY(-10px) scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,.4); border: 2px solid transparent; background-clip: padding-box; }
        .card-img::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 2px; background: linear-gradient(135deg, rgba(255,221,87,.9), rgba(241,7,163,.9)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity .35s ease; pointer-events: none; }
        .card-img:hover::before { opacity: 1; }
        .card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; will-change: transform; display:block; }
        .card-img:hover img { transform: scale(1.1); }
        .card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; color: white; text-align: left; overflow-y: auto; transition: background .5s ease; }
        .card-img:hover .card-overlay { background: rgba(0,0,0,0.65); }
        .btn-gradient { background-image: linear-gradient(90deg,#ffde6a,#f1a208); color:#3a2a00; transition: transform .3s ease, box-shadow .3s ease; }
        .btn-gradient:hover { transform: scale(1.08); box-shadow: 0 0 12px rgba(255, 221, 87, 0.9); }
        .blurred-text { filter: blur(4px); }
        .icon-glow { filter: drop-shadow(0 0 6px rgba(255, 221, 87, 0.9)); transition: transform .3s ease, filter .3s ease; }
        .card-overlay:hover .icon-glow { transform: scale(1.2); filter: drop-shadow(0 0 16px rgba(255, 221, 87, 1)); }
        .card-features li { text-align: left; }
        @keyframes slideInLeft { from { opacity:0; transform: translateX(-24px);} to { opacity:1; transform:none;} }
        @keyframes slideInRight { from { opacity:0; transform: translateX(24px) scale(.98);} to { opacity:1; transform:none;} }
        .hero-text-enter { animation: slideInLeft .7s cubic-bezier(.22,.61,.36,1) both; }
        .hero-img-enter  { animation: slideInRight .8s .08s cubic-bezier(.22,.61,.36,1) both; }
        .hero-card { border-radius: 1.25rem; overflow: hidden; position: relative; max-height: 400px; box-shadow: 0 6px 12px rgba(0,0,0,.2); transition: transform .5s ease, box-shadow .5s ease; }
        .hero-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; display:block; }
        .hero-card:hover { transform: translateY(-10px) scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,.4); }
        .hero-card:hover img { transform: scale(1.1); }
        .gradient-text { background: linear-gradient(90deg, #ffffff, #ffde6a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; }
        .card-founder { height: 100vh; max-height: 850px; }
      `}</style>


      <nav ref={navRef}>
        <img src="https://raw.githubusercontent.com/Loki-Singh/puzzleBiteWeb/main/PuzzleBITE_Log__Transparent.png" alt="PuzzleBITE Logo" />
        {menuOpen ? (
          <CloseIcon className="menu-btn w-8 h-8" onClick={() => setMenuOpen(false)} />
        ) : (
          <MenuIcon className="menu-btn w-8 h-8" onClick={() => setMenuOpen(true)} />
        )}
        <ul className={menuOpen ? 'visible' : 'hidden'}>
          {sections.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={activeSection === id ? "active" : ""} onClick={handleLinkClick}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-yellow" onClick={handleLinkClick}>Book Demo</a>
          </li>
        </ul>
      </nav>
      <Section id="home" className="flex flex-col md:flex-row items-center justify-center text-white text-left px-10">
        <div className="md:w-1/2 hero-text-enter">
          <h1 className="text-6xl font-extrabold mb-6 gradient-text ">Turn waiting time into engagement opportunities</h1>
          <p className="text-xl mb-8 max-w-lg gradient-text">PuzzleBITE helps cafes and restaurants keep guests entertained with fun puzzles and challenges — while boosting venue revenue.</p>
          <a href="#contact" className="rounded-xl px-6 py-3 font-semibold btn-gradient inline-block" onClick={handleLinkClick}>Get Started</a>
        </div>
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 hero-img-enter">
          <div className="hero-card">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" alt="Hero visual" />
          </div>
        </div>
      </Section>
      <Section id="how" className="text-white">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold gradient-text">How it works</h2>
          <p className="mt-3 text-lg text-white/90 gradient-text">Gamified engagement tools that delight customers and drive retention.</p>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "Scan QR", description: "Guests scan a QR code to see exciting wait time discounts/offers.", Icon: QrCode, image: featureImages[0]},
            { title: "Play Challenges", description: "Crack the puzzles & riddles challenge.", Icon: Play, image: featureImages[1]},
            { title: "Earn Discounts", description: "Earn the discount/offer coupons to be redeemed now or later.", Icon: Tag, image: featureImages[2]}
          ].map((f, idx) => (
            <Card key={idx} image={f.image} title={f.title} description={f.description} Icon={f.Icon} parallax />
          ))}
        </div>
      </Section>

      <Section id="features" className="text-white">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold gradient-text">Features</h2>
          <p className="mt-3 text-lg text-white/90 gradient-text">Never before features to get rid of abysmal waiting time.</p>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "Gamified discount engine", description: "Fun, interactive way to earn deals—not just passive coupons", Icon: Shield },
            { title: "Multi-category puzzles", description: "Puzzles tailored to diners’ preferences (coding, trivia, logic)", Icon: Zap },
            { title: "Dashboards", description: "Enables restaurants to track usage, redemptions, and ROI", Icon: Star },
            { title: "Live Feed", description: "Real-time events and updates for Social & viral hooks.", Icon: Database },
            { title: "Performance-aligned pricing", description: "Mix of subscriptions and per-puzzle commissions ensures risk-sharing.", Icon: BarChart2 }
          ].map((f, idx) => (
            <Card key={idx} image={featureImages[idx]} title={f.title} description={f.description} Icon={f.Icon} parallax />
          ))}
        </div>
      </Section>

      <Section id="why" className="text-white">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold gradient-text">Why PuzzleBITE</h2>
          <p className="mt-3 text-lg text-white/90 gradient-text">Don't just take our word for it, this is what we do best.</p>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-10">
          {[
            { title: "Differentiator", description: "World's first digital solution to transform waiting time into engagement opportunities.", Icon: MapPin },
            { title: "Footfall & Revenue Booster", description: "Customers keep coming back to enjoy puzzleBITE's fun based challenges. Experience the repeat footfall & revenue boost like never before", Icon: TrendingUp },
            { title: "Wait Time Killer", description: "Unlimited Fun & Challenges to keep the customers happily engaged.", Icon: Star }
          ].map((f, idx) => (
            <Card key={idx} image={featureImages[idx]} title={f.title} description={f.description} Icon={f.Icon} parallax />
          ))}
        </div>
      </Section>

      

      <Section id="pricing" className="text-white">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold gradient-text">Simple Pricing</h2>
          <p className="mt-4 text-lg text-slate-200 gradient-text">Flexible plans tailored for every venue’s needs.</p>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-10">
          {[
            {
              tier: "Standard",
              features: [
                "Access to basic puzzle library",
                "Standard customer engagement reports",
                "Email support",
                "Venue branding (basic)",
              ],
              price: "4999",
              img: pricingImages[0]
            },
            {
              tier: "Premium",
              features: [
                "Access to full puzzle & challenge library",
                "Advanced engagement & loyalty analytics",
                "Priority email & phone support",
                "Custom venue branding",
                "Monthly strategy consultation"
              ],
              price: "9999",
              img: pricingImages[1]
            },
            {
              tier: "Gold",
              features: [
                "Everything in Premium",
                "Dedicated account manager",
                "Exclusive puzzle drops",
                "API integrations for CRM/POS",
                "Quarterly in-person strategy session"
              ],
              price: "14999",
              img: pricingImages[2]
            }
          ].map((plan) => (
            <Card
              key={plan.tier}
              image={plan.img}
              title={plan.tier}
              price={plan.price}
              description={`Perfect for ${plan.tier.toLowerCase()} operations looking to gamify dining.`}
              Icon={Star}
              parallax
              tall
            >
              <ul className="card-features list-disc pl-5 text-lg space-y-2 mb-6">
                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <a href="#contact" className="rounded-xl px-5 py-3 font-semibold btn-gradient inline-block" onClick={handleLinkClick}>Choose {plan.tier}</a>
            </Card>
          ))}
        </div>
      </Section>
      <Section id="Behind" className="text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-extrabold gradient-text mb-3">Our Story</h2>
            <p className="text-lg mb-2"><i>It all began over coffee and contemplation — observing patrons in cafés tapping their phones, glancing at the door, restless during the wait. We asked: What if every minute of anticipation could become a moment of delight?</i></p>
            <p className="text-lg mb-2"><i>This is more than gamified discounts. It’s hospitality reinvented — where every bored second becomes an opportunity and venues build deeper relationships with guests.</i></p>
            <p className="text-lg mb-2"><i>From that spark, PuzzleBITE was born — designed to transform dining queues into playful engagement. We embed puzzles, challenges, and incentives directly into the guest experience, helping venues convert waiting time into connection, fun, and loyalty.</i></p>
            <p className="text-lg mb-2"><i>It’s hospitality reinvented — where every bored second becomes an opportunity, where diners leave smiling, and venues foster deeper relationships.</i></p>
            <p className="text-lg mb-2"><i>Every puzzle solved, every coupon earned, and every story told fuels our journey — and we’re only just beginning.</i></p>
            <h3 className="text-3xl font-extrabold gradient-text mb-3">Meet the Founder</h3>
            <p className="text-lg mb-8"><i><strong>Lokendra Singh</strong> is the visionary behind PuzzleBITE, bringing 19 years of experience in startup strategy, growth, and product execution. With a deep passion for blending technology and engagement, Lokendra saw the untapped potential in transforming idle waiting into meaningful interaction.</i></p>

            <p className="text-lg mb-8"><i>In his professional journey, Lokendra has helped startups scale, created strategic roadmaps, and championed innovation in customer experiences. His mission is clear: make waiting delightful — delight that serves both the guest and the business.</i></p>

            <p className="text-lg mb-8"><i>Under his leadership, PuzzleBITE is not just a product — it’s a brand promise: that every wait can tell a story, and every visit can spark joy.</i></p>
          </div>
          <div>
            <div className="card-img card-founder">
              <img
                src={"https://raw.githubusercontent.com/Loki-Singh/puzzleBiteWeb/main/so_so_me.jpg"}
                alt="Founder: Lokendra Singh"
                onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=80"; }}
              />
              
            </div>
          </div>
        </div>
      </Section>
      {/* Contact Section */}
      <Section id="contact" className="text-center text-white">
        <h2 className="text-5xl font-extrabold mb-6 gradient-text">Get in touch </h2>
        <p className="text-4xl mb-8 gradient-text">Ready to bring PuzzleBITE to your venue and avail Earlybird Discounts ? Let’s talk.</p>
        <a href="mailto:info@puzzlebite.com" className="rounded-xl px-6 py-3 font-semibold btn-gradient inline-block" onClick={handleLinkClick}>Contact Us</a>
      </Section>

    </div>
  );
}

