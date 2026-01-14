import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu as MenuIcon, X as CloseIcon, QrCode, Play, Tag, Shield, Zap, Star, Database, BarChart2, MapPin, TrendingUp  } from "lucide-react";

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-28 min-h-screen py-36 ${className}`}>{children}</section>
  );
} 



function Card({ image, title, price, description, Icon, children, tall }) {
  const fallbackImg =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";
  return (
    <div className={`card-img ${tall ? "card-tall" : ""}`}>
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
    </div>
  );
}


export default function PuzzleBITE() {
  // ===== STATE =====
  const sections = useMemo(
    () => ["home", "how", "features", "why", "pricing", "behind", "contact"],
    []
  );
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Contact form
  const [form, setForm] = useState({ email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzjkgya"; // add your Formspree endpoint if desired
  const [selectedFeature, setSelectedFeature] = useState<null | {
  title: string;
  description: string;
  longDescription: string;
  Icon: any;
}>(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!/.+@.+\..+/.test(email) || !message) {
      alert("Please enter a valid email and a message.");
      return;
    }

    setSending(true);
    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, phone, message, to: "research@puzzlebite.app" })
        });
        if (!res.ok) throw new Error("Form endpoint error");
        setSent(true);
        setForm({ email: "", phone: "", message: "" });
      } else {
        const subject = encodeURIComponent("Website inquiry (PuzzleBITE)");
        const body = encodeURIComponent(`From: ${email}\nPhone: ${phone}\n\n${message}`);
        window.location.href = `mailto:research@puzzlebite.app?subject=${subject}&body=${body}`;
        setSent(true);
      }
    } catch (e) {
      console.error(e);
      alert("Couldn't send right now. Please try later.");
    } finally {
      setSending(false);
    }
  };

  function LaunchCountdown() {
        const launchDate = new Date("2026-02-11T00:00:00").getTime();
        const [timeLeft, setTimeLeft] = useState({
          days: 0, hours: 0, minutes: 0, seconds: 0
        });

        useEffect(() => {
          const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance < 0) return;

            setTimeLeft({
              days: Math.floor(distance / (1000 * 60 * 60 * 24)),
              hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((distance / (1000 * 60)) % 60),
              seconds: Math.floor((distance / 1000) % 60),
            });
          }, 1000);

          return () => clearInterval(timer);
        }, []);

        return (
          
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-3xl font-extrabold gradient-text">Launching In</p>
                <div className="flex gap-4 mt-3 text-center">
                  {["Days","Hours","Minutes","Seconds"].map((label, i) => {
                    const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
                    return (
                      <div key={label} className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
                        <div className="text-3xl font-extrabold">{String(values[i]).padStart(2, "0")}</div>
                        <div className="text-xs uppercase tracking-wide">{label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              

            </div>
          
        );
      }
      
  function StatCard({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500;
    const increment = number / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [visible, number]);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl p-8 text-white shadow-xl overflow-hidden"
      style={{
        backgroundImage: "url('https://raw.githubusercontent.com/Loki-Singh/puzzleBiteWeb/main/stats_background_image.jpg')",   // put the image in public/stats-bg.jpg
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-5xl font-extrabold gradient-text">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-3 text-white/90 text-lg">{label}</p>
    </div>
  );
}
    

      

  // ===== EFFECTS =====
  useEffect(() => {
    const handleScroll = () => {
      const nearest = sections
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, d: Math.abs(el.getBoundingClientRect().top) } : { id, d: 1e9 };
        })
        .reduce((a, b) => (a.d < b.d ? a : b));
      setActiveSection(nearest.id);
    };
    window.addEventListener("scroll", handleScroll);

    const onDocClick = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [menuOpen, sections]);

  const handleLinkClick = () => setMenuOpen(false);

  // ===== DATA =====
  const bgGradient = "linear-gradient(135deg,#7B2FF7 0%,#F107A3 100%)";
  const featureImages = [
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1607082349566-187342175e2c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80"
  ];
  const pricingImages = [
    "https://images.unsplash.com/photo-1555992336-03a23c1f9003?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
  ];

  return (
    <div className="relative min-h-screen font-sans overflow-y-auto" style={{ background: bgGradient }}>
      <style>{`
        html, body, #root { height: 100%; margin: 0; overflow-x: hidden; }
        nav { position: fixed; top: 0; left: 0; width: calc(100% - 20px); z-index: 60; display: flex; align-items: center; justify-content: center; padding: 0.6rem 1.25rem; background: rgba(0, 0, 0, 0); backdrop-filter: blur(5px);  }
  
        
        nav img { height: 100px; }
        nav .menu-btn { position: absolute; right: 20px; top: 18px; cursor: pointer; color: white; z-index: 70; transition: transform .2s ease; }
        nav .menu-btn:active { transform: scale(.95); }
        nav ul { position: absolute; top: 90px; right: 20px; flex-direction: column; align-items: flex-end; background: rgba(0,0,0,0.85); gap: 1rem; padding: 1rem 1.25rem; border-radius: 0.75rem; backdrop-filter: blur(6px); transition: opacity .25s ease, transform .25s ease; }
        nav ul.hidden { display: none; opacity: 0; pointer-events: none; transform: translateY(-10px); }
        nav ul.visible { display: flex; opacity: 1; pointer-events: auto; transform: translateY(0); }
        nav a { color: white; font-weight: 600; position: relative; padding-bottom: 4px; }
        nav a::after { content: ""; position: absolute; left: 0; bottom: 0; width: 0; height: 2px; background: #ffde6a; transition: width .25s ease; }
        nav a:hover::after, nav a.active::after { width: 100%; }

        .btn-yellow { background: #ffde6a; color: #3a2a00; font-weight: 600; padding: 0.5rem 1rem; border-radius: 0.75rem; transition: transform .3s ease; }
        .btn-yellow:hover { transform: scale(1.05); }

        .btn-gradient { background: #ffde6a; color: #3a2a00; font-weight: 600; padding: 0.5rem 1rem; border-radius: 0.75rem; transition: transform .3s ease; }
        .btn-gradient:hover { transform: scale(1.05); }
        .card-img { border-radius: 1.25rem; overflow: hidden; position: relative; height: 50vh; max-height: 520px; box-shadow: 0 6px 12px rgba(0,0,0,.2); transition: transform .5s ease, box-shadow .5s ease, border .5s ease; }
        .card-tall { height: 65vh; max-height: 720px; }
        .card-padding { padding: 2.2rem !important; }
        .card-img:hover { transform: translateY(-10px) scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,.4); border: 2px solid transparent; background-clip: padding-box; }
        .card-img::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 2px; background: linear-gradient(135deg, rgba(255,221,87,.9), rgba(241,7,163,.9)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity .35s ease; pointer-events: none; }
        .card-img:hover::before { opacity: 1; }
        .card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; display: block; }
        .card-img:hover img { transform: scale(1.1); }
        .card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; color: white; text-align: left; overflow-y: auto; transition: background .5s ease; }
        .card-img:hover .card-overlay { background: rgba(0,0,0,0.65); }
        .icon-glow { filter: drop-shadow(0 0 6px rgba(255,221,87,.95)); }
        .blurred-text { filter: blur(4px); }

        @keyframes slideInLeft { from { opacity:0; transform: translateX(-24px);} to { opacity:1; transform:none;} }
        @keyframes slideInRight { from { opacity:0; transform: translateX(24px) scale(.98);} to { opacity:1; transform:none;} }
        .hero-text-enter { animation: slideInLeft .7s cubic-bezier(.22,.61,.36,1) both; }
        .hero-img-enter { animation: slideInRight .8s .08s cubic-bezier(.22,.61,.36,1) both; }

        .hero-card { border-radius: 1.25rem; overflow: hidden; position: relative; max-height: 420px; box-shadow: 0 6px 12px rgba(0,0,0,.2); transition: transform .5s ease, box-shadow .5s ease; }
        .hero-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; display: block; }
        .hero-card:hover { transform: translateY(-10px) scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,.4); }
        .hero-card:hover img { transform: scale(1.1); }

        .gradient-text { background: linear-gradient(90deg, #ffffff, #ffde6a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; }
        .card-founder { height: 220vh; max-height: 850px; }

        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }

        @keyframes modalIn { 0% { opacity: 0; transform: scale(0.85) translateY(40px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }

        .animate-modalIn { animation: modalIn 0.35s cubic-bezier(0.25, 0.8, 0.25, 1); }



        .popular-glow { box-shadow: 0 0 15px rgba(255, 222, 106, 0.8);}

        .input { width: 100%; padding: 0.85rem 1rem; border-radius: 0.75rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #fff; outline: none; }
        .input::placeholder { color: rgba(255,255,255,0.7); }
        .input:focus { border-color: #ffde6a; box-shadow: 0 0 0 3px rgba(255,222,106,0.25); }
        .form-card { background: rgba(0,0,0,0.35); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); border-radius: 1rem; padding: 2rem; }
      `}</style>

      {/* NAV */}
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
          <h1 className="text-6xl font-extrabold mb-6 gradient-text ">Turn waiting time into engagement opportunities.</h1>
          <p className="text-xl mb-8 max-w-lg gradient-text">PuzzleBITE helps cafes and restaurants keep guests entertained with fun puzzles and challenges — while boosting venue revenue.</p>
          <LaunchCountdown />
          <br></br>
          <a href="#contact" className="rounded-xl px-6 py-3 font-semibold btn-gradient inline-block" onClick={handleLinkClick}>Get Earlybird Offers</a>
        </div>
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 hero-img-enter">
          <div className="hero-card">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" alt="Hero visual" />
          </div>
        </div>
      </Section>
      
      <section id="traction" className="text-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-5xl font-extrabold gradient-text">Early Momentum</h2>
          <p className="mt-3 text-lg text-white/90 gradient-text">
            Building scale even before launch.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <StatCard 
            number={100000}
            suffix="+"
            label="Customers Engaged (Projected)"
          />
          <StatCard
            number={25}
            suffix=""
            label="Pilot Cafe Partners"
          />
        </div>
      </section>

      

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
       <div className="max-w-6xl mx-auto flex flex-col items-center">
  {/* First row - 3 cards */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {[
  {
    title: "Gamified discount engine",
    description: "Fun, interactive way to earn deals—not just passive coupons",
    longDescription: "Customers pay a small attempt fee to play quick challenges and earn discounts. This makes rewards feel earned, increases redemption joy, and helps cafes recover discount cost through micro-revenue.",
    Icon: Shield
  },
  {
    title: "Multi-category puzzles",
    description: "Puzzles tailored to diners’ preferences (coding, trivia, logic)",
    longDescription: "From logic riddles and trivia to coding mini-challenges and multiplayer games, PuzzleBITE adapts to different user interests and keeps engagement fresh every visit.",
    Icon: Zap
  },
  {
    title: "Dashboards",
    description: "Enables restaurants to track usage, redemptions, and ROI",
    longDescription: "Restaurant owners get real-time visibility into scans, plays, rewards issued, repeat visits, and revenue impact — turning engagement into measurable business intelligence.",
    Icon: Star
  }
].map((f, idx) => (
  <div key={idx} onClick={() => setSelectedFeature(f)} className="cursor-pointer">
    <Card image={featureImages[idx]} title={f.title} description={f.description} Icon={f.Icon} parallax />
  </div>
))}

  </div>

  {/* Second row - 2 centered cards */}
  <div className="grid sm:grid-cols-2 gap-10 mt-10 lg:w-2/3">
    {[
  {
    title: "Live Feed",
    description: "Real-time events and updates for Social & viral hooks.",
    longDescription: "cafes can publish daily visuals, events, and promotions directly inside the app, turning every customer into a potential social ambassador and driving organic reach.",
    Icon: Database
  },
  {
    title: "Performance-aligned pricing",
    description: "Mix of subscriptions and per-puzzle commissions ensures risk-sharing.",
    longDescription: "Our hybrid model ensures cafes pay in proportion to the value they receive — aligning PuzzleBITE’s success directly with restaurant success.",
    Icon: BarChart2
  }
].map((f, idx) => (
  <div key={idx + 3} onClick={() => setSelectedFeature(f)} className="cursor-pointer">
    <Card image={featureImages[idx + 3]} title={f.title} description={f.description} Icon={f.Icon} parallax />
  </div>
))}

  </div>
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
                "Activate upto 2 offers daily",
                "Monthly Performance Report",
                "2 Live feed posts / day",
                "Email support",
                "Venue branding (basic)",
              ],
              price: "₹4,999 / month",
              img: pricingImages[0]
            },
            {
              tier: "Premium",
              features: [
                "Activate upto 5 offers daily",
                "Monthly Performance Report",
                "3 Live feed posts / day",
                "Analytics module access",
                "Monthly strategy consultation"
              ],
              price: "₹7,999 / month",
              img: pricingImages[1]
            },
            {
              tier: "Gold",
              features: [
                "Everything in Premium",
                "Dedicated account manager",
                "Exclusive puzzle drops",
                "Activate upto 7 offers daily",
                "Weekly Performance Report",
                "5 Live feed posts / day",
                "Analytics module access",
                "Featured Placement",
                "Instagram Redirect"
              ],
              price: "₹10,999 / month",
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
              {plan.tier === "Gold" && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 popular-glow">

                  Most Popular
                </div>
              )}

              <div className="absolute top-4 left-4 bg-[#F75564] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                {plan.price}
              </div>


              <ul className="card-features list-disc pl-5 text-lg space-y-2 mb-6">
                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <a href="#contact" className="rounded-xl px-5 py-3 font-semibold btn-gradient inline-block" onClick={handleLinkClick}>Choose {plan.tier}</a>
            </Card>
          ))}
        </div>
      </Section>
      <Section id="behind" className="text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-extrabold gradient-text mb-3">Our Story</h2>
            <p className="text-lg mb-2"><i>It all began over coffee and contemplation, observing patrons in cafes tapping their phones, glancing at the door, restless during the wait. We asked: What if every minute of anticipation could become a moment of delight?</i></p>
            <p className="text-lg mb-2"><i>This is more than gamified discounts. It’s hospitality reinvented, where every bored second becomes an opportunity and venues build deeper relationships with guests.</i></p>
            <p className="text-lg mb-2"><i>From that spark, PuzzleBITE was born & designed to transform dining queues into playful engagement. We embed puzzles, challenges, and incentives directly into the guest experience, helping venues convert waiting time into connection, fun, and loyalty.</i></p>
            <p className="text-lg mb-2"><i>Every puzzle solved, every coupon earned, and every story told fuels our journey,  and we’re only just beginning.</i></p>
            <h3 className="text-3xl font-extrabold gradient-text mb-3">Meet the Founder</h3>
            <p className="text-lg mb-8"><i><strong>Lokendra Singh</strong> is the visionary behind PuzzleBITE, bringing 19 years of experience in startup strategy, growth, and product execution. With a deep passion for blending technology and engagement, Lokendra saw the untapped potential in transforming idle waiting into meaningful interaction.</i></p>

            <p className="text-lg mb-8"><i>In his professional journey, Lokendra has helped startups scale, created strategic roadmaps, and championed innovation in customer experiences. His mission is clear: Make waiting delightful, delight that serves both the guest and the business.</i></p>

            <p className="text-lg mb-8"><i>Under his leadership, PuzzleBITE is not just a product but a brand promise, that every wait can tell a story, and every visit can spark joy.</i></p>
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

      {/* CONTACT */}
      <Section id="contact" className="text-center text-white">
        <h2 className="text-5xl font-extrabold mb-6 gradient-text">Get in touch</h2>
        <p className="text-xl md:text-2xl mb-10 text-white/90">
          Have a question or want a demo? Send us a note and we’ll reach out.
        </p>
        <div className="max-w-2xl mx-auto form-card text-left">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Mobile Number</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="+91 ***** *****"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block mb-2 font-semibold">Message</label>
              <textarea
                className="input"
                rows={6}
                placeholder="Tell us about your venue or request a demo…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button type="submit" disabled={sending} className="btn-yellow rounded-xl px-6 py-3 font-semibold">
                {sending ? "Sending…" : "Submit"}
              </button>
              {sent && <span className="text-white/80">Thanks! We’ll be in touch shortly.</span>}
            </div>
          </form>
        </div>
        <p className="mt-6 text-white/70 text-sm">
          Direct email: <a className="underline" href="mailto:research@puzzlebite.app">research@puzzlebite.app</a>
        </p>

        {selectedFeature && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedFeature(null)}
          >
            <div
              className="relative max-w-3xl w-[90%] rounded-3xl p-10 text-white shadow-2xl
                        bg-gradient-to-br from-[#F75564] via-[#FF8A7A] to-[#FFDEA3]
                        animate-modalIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-5 right-6 text-white/80 hover:text-white text-2xl"
                onClick={() => setSelectedFeature(null)}
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-6">
                <selectedFeature.Icon className="w-10 h-10 text-white" />
                <h3 className="text-3xl font-bold">{selectedFeature.title}</h3>
              </div>

              <p className="text-lg leading-relaxed text-white/95">
                {selectedFeature.longDescription}
              </p>
            </div>
          </div>
        )}


      </Section>
    </div>
  );
}
