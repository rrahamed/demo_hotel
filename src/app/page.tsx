"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobOpen, setIsMobOpen] = useState(false);
  const [selRoom, setSelRoom] = useState("");
  const [selPkg, setSelPkg] = useState("");
  const [selPrice, setSelPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nightsSummary, setNightsSummary] = useState("");

  const gInRef = useRef<HTMLInputElement>(null);
  const gOutRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Preloader
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
      if (preloader) preloader.classList.add("done");
    }, 900);

    // Hero Entrance
    gsap.from(".ht-clip", { y: "110%", stagger: 0.18, duration: 1.2, ease: "power4.out", delay: 1.0 });
    gsap.from(".hero-tag", { opacity: 0, y: 12, duration: 0.9, delay: 0.9 });
    gsap.from(".hero-foot", { opacity: 0, y: 18, duration: 0.9, delay: 1.25 });

    // Hero Pinned Zoom-Out
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=700",
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
      },
    });
    heroTl
      .to("#hero-video", { scale: 1, ease: "power1.inOut" }, 0)
      .to(".hero-body", { y: -65, opacity: 0, ease: "power2.in" }, 0.38);

    // Scroll Reveals
    gsap.utils.toArray(".reveal-up").forEach((el: any) => {
      gsap.from(el, {
        y: 45,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
      });
    });
    gsap.utils.toArray(".reveal-img").forEach((el: any) => {
      gsap.from(el, {
        scale: 0.97,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
      });
    });
    gsap.utils.toArray(".room-row").forEach((row: any, i) => {
      gsap.from(row, {
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.05,
        scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
      });
    });

    // Counters
    gsap.utils.toArray(".stat-n").forEach((el: any) => {
      const target = +el.dataset.target;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2.2,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = Math.floor(obj.v);
        },
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
      });
    });

    // About Image Parallax
    const aboutImg = document.getElementById("about-img");
    if (aboutImg) {
      gsap.to(aboutImg, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    }

    // Scroll listener for nav
    const handleScroll = () => setIsNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const openModal = (room = "", price = 0) => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    if (room) {
      setSelRoom(room);
      setSelPrice(price);
    }
    setCurrentStep(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
    setSelRoom("");
    setSelPkg("");
    setSelPrice(0);
    setCurrentStep(1);
    setNightsSummary("");
  };

  const showToast = (msg: string) => {
    let toast = document.getElementById("modal-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "modal-toast";
      toast.style.cssText =
        "position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#141414;color:#fff;padding:.75rem 1.5rem;border-radius:2px;font-size:.8rem;letter-spacing:1px;z-index:9999;border-left:3px solid #9C8866;transition:opacity .3s";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.style.opacity = "0";
    }, 2500);
  };

  const handleNext = () => {
    if (!selRoom) return showToast("Please select a suite first.");
    if (!selPkg) return showToast("Please select an experience package.");
    updateSummary();
    setCurrentStep(2);
  };

  const updateSummary = () => {
    const ci = gInRef.current?.value;
    const co = gOutRef.current?.value;
    let nights = "";
    if (ci && co) {
      const d = Math.ceil((new Date(co).getTime() - new Date(ci).getTime()) / 86400000);
      if (d > 0)
        nights = `<br/><strong>Duration:</strong> ${d} night${
          d > 1 ? "s" : ""
        } &nbsp;·&nbsp; <strong>Total:</strong> $${(selPrice * d).toLocaleString()}`;
    }
    setNightsSummary(nights || `<br/><em style="color:#aaa;font-size:.8rem">Add dates to see total</em>`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  return (
    <main>
      {/* Preloader */}
      <div className="preloader" id="preloader">
        <div className="pre-inner">
          <p className="pre-sub">Welcome</p>
          <h1 className="pre-title">
            POINT<br />
            <em>OF DEV</em>
          </h1>
          <div className="pre-bar">
            <div className="pre-fill" id="pre-fill"></div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className={`nav ${isNavScrolled ? "scrolled" : ""}`} id="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <span className="nl-main">POINT OF DEV</span>
            <span className="nl-sub">HOTEL & RESORT</span>
          </div>
          <ul className="nav-links">
            <li><a href="#about">Story</a></li>
            <li><a href="#rooms">Suites</a></li>
            <li><a href="#amenities">Experience</a></li>
            <li><a href="#gallery">Gallery</a></li>
          </ul>
          <div className="nav-right">
            <button className="btn-reserve" onClick={() => openModal()}>Reserve</button>
            <button
              className={`nav-burger ${isMobOpen ? "active" : ""}`}
              onClick={() => {
                setIsMobOpen(!isMobOpen);
                document.body.style.overflow = !isMobOpen ? "hidden" : "";
              }}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mob-overlay ${isMobOpen ? "open" : ""}`} id="mob-overlay">
        <button
          className="mob-close"
          onClick={() => {
            setIsMobOpen(false);
            document.body.style.overflow = "";
          }}
        >
          ✕
        </button>
        <div className="mob-links">
          <a href="#about" className="mob-link" onClick={() => setIsMobOpen(false)}>Our Story</a>
          <a href="#rooms" className="mob-link" onClick={() => setIsMobOpen(false)}>Suites</a>
          <a href="#amenities" className="mob-link" onClick={() => setIsMobOpen(false)}>Experience</a>
          <a href="#gallery" className="mob-link" onClick={() => setIsMobOpen(false)}>Gallery</a>
          <a href="#contact" className="mob-link" onClick={() => setIsMobOpen(false)}>Contact</a>
        </div>
        <button className="btn-reserve mob-reserve" onClick={() => { setIsMobOpen(false); openModal(); }}>
          Reserve Your Stay
        </button>
      </div>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-media" id="hero-media" style={{ backgroundColor: "#050505" }}>
          <video id="hero-video" autoPlay muted loop playsInline preload="auto" poster="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920">
            <source src="/Hotel_image_3D_animation_202606151533.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-body">
          <div className="hero-top">
            <span className="hero-tag">Est. 2024 — Silicon Valley</span>
          </div>
          <h1 className="hero-title">
            <span className="ht-row"><span className="ht-clip">POINT</span></span>
            <span className="ht-row"><em className="ht-clip indent">of Dev</em></span>
            <span className="ht-row"><span className="ht-clip">HOTEL</span></span>
          </h1>
          <div className="hero-foot">
            <p className="hero-desc">Where architecture<br />meets serenity.</p>
            <div className="hero-foot-right">
              <button className="btn-hero" onClick={() => openModal()}>Reserve Your Stay</button>
              <a href="#about" className="hero-down"><span className="hd-bar"></span>Scroll</a>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-wrap reveal-up">
        <div className="marquee-track">
          <div className="mq-inner">
            <span>Luxury Collection</span><em>✦</em>
            <span>120 Private Suites</span><em>✦</em>
            <span>Michelin Dining</span><em>✦</em>
            <span>Serenity Spa</span><em>✦</em>
            <span>Infinity Pool</span><em>✦</em>
            <span>Private Chauffeur</span><em>✦</em>
            <span>Est. 2024</span><em>✦</em>
            <span>5-Star Resort</span><em>✦</em>
          </div>
          <div className="mq-inner" aria-hidden="true">
            <span>Luxury Collection</span><em>✦</em>
            <span>120 Private Suites</span><em>✦</em>
            <span>Michelin Dining</span><em>✦</em>
            <span>Serenity Spa</span><em>✦</em>
            <span>Infinity Pool</span><em>✦</em>
            <span>Private Chauffeur</span><em>✦</em>
            <span>Est. 2024</span><em>✦</em>
            <span>5-Star Resort</span><em>✦</em>
          </div>
        </div>
      </div>

      {/* About */}
      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-left">
            <span className="sec-num">01</span>
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="sec-title reveal-up">Architecture<br />meets <em>serenity</em></h2>
            <p className="body-text reveal-up">Point of Dev Hotel is more than a destination — it is an architectural masterpiece designed to harmonize with nature. Every angle, every texture, and every beam of light is curated to elevate your senses.</p>
            <div className="stats-row reveal-up">
              <div className="stat"><span className="stat-n" data-target="15">0</span><span className="stat-l">Acre Estate</span></div>
              <div className="stat-sep"></div>
              <div className="stat"><span className="stat-n" data-target="120">0</span><span className="stat-l">Suites</span></div>
              <div className="stat-sep"></div>
              <div className="stat"><span className="stat-n" data-target="3">0</span><span className="stat-l">Michelin Stars</span></div>
            </div>
            <button className="btn-dark reveal-up" onClick={() => openModal()}>Reserve a Suite →</button>
          </div>
          <div className="about-right reveal-img">
            <img src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Hotel Lobby" id="about-img" />
            <div className="about-img-caption">Point of Dev — Main Atrium, 2024</div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="rooms" id="rooms">
        <div className="rooms-head reveal-up">
          <span className="sec-num">02</span>
          <div>
            <p className="eyebrow">Accommodation</p>
            <h2 className="sec-title">Private <em>Sanctuaries</em></h2>
          </div>
        </div>

        <div className="room-row reveal-up">
          <div className="rr-img"><img src="https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Deluxe Suite" /></div>
          <div className="rr-text">
            <span className="rr-num">01</span>
            <h3 className="rr-name">Deluxe <em>Suite</em></h3>
            <p className="rr-desc">Panoramic city views with a harmonious blend of modern design and traditional comfort. A haven of quiet refinement.</p>
            <ul className="rr-tags"><li>65 m²</li><li>King Bed</li><li>Marble Bath</li></ul>
            <div className="rr-foot"><span className="rr-price">From <strong>$450</strong> / night</span><button className="btn-arrow room-btn" onClick={() => openModal("Deluxe Suite", 450)}>Explore →</button></div>
          </div>
        </div>

        <div className="room-row rev reveal-up">
          <div className="rr-img"><img src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Grand Suite" /></div>
          <div className="rr-text">
            <span className="rr-num">02</span>
            <h3 className="rr-name">Grand <em>Suite</em></h3>
            <p className="rr-desc">Expansive living spaces and a private terrace overlooking manicured resort gardens. Designed for those who demand the finest.</p>
            <ul className="rr-tags"><li>110 m²</li><li>King Bed</li><li>Private Terrace</li></ul>
            <div className="rr-foot"><span className="rr-price">From <strong>$780</strong> / night</span><button className="btn-arrow room-btn" onClick={() => openModal("Grand Suite", 780)}>Explore →</button></div>
          </div>
        </div>

        <div className="room-row reveal-up">
          <div className="rr-img"><img src="https://images.pexels.com/photos/3688965/pexels-photo-3688965.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Presidential Suite" /></div>
          <div className="rr-text">
            <span className="rr-num">03</span>
            <h3 className="rr-name">Presidential <em>Suite</em></h3>
            <p className="rr-desc">The pinnacle of luxury — a private residence with dedicated butler service, plunge pool, and private cinema room.</p>
            <ul className="rr-tags"><li>380 m²</li><li>3 Bedrooms</li><li>Private Pool</li></ul>
            <div className="rr-foot"><span className="rr-price">From <strong>$1,500</strong> / night</span><button className="btn-arrow room-btn" onClick={() => openModal("Presidential Suite", 1500)}>Explore →</button></div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="amenities" id="amenities">
        <div className="amenities-head reveal-up">
          <span className="sec-num">03</span>
          <div>
            <p className="eyebrow">Exceptional Facilities</p>
            <h2 className="sec-title">World-Class <em>Amenities</em></h2>
          </div>
        </div>
        <div className="am-grid">
          <div className="am-card reveal-up">
            <div className="am-img"><img src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Spa" /></div>
            <div className="am-info"><h3>Serenity Spa</h3><p>Holistic treatments and ancient healing therapies for complete renewal.</p></div>
          </div>
          <div className="am-card reveal-up">
            <div className="am-img"><img src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Dining" /></div>
            <div className="am-info"><h3>Michelin Dining</h3><p>World-class culinary experiences curated by our celebrated master chefs.</p></div>
          </div>
          <div className="am-card reveal-up">
            <div className="am-img"><img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Pool" /></div>
            <div className="am-info"><h3>Infinity Pool</h3><p>Swim amidst the clouds with panoramic views of the horizon at dusk.</p></div>
          </div>
          <div className="am-card reveal-up">
            <div className="am-img"><img src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Chauffeur" /></div>
            <div className="am-info"><h3>Private Chauffeur</h3><p>Arrive in style with our fleet of luxury vehicles and dedicated drivers.</p></div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery" id="gallery">
        <div className="gallery-head reveal-up">
          <span className="sec-num">04</span>
          <div>
            <p className="eyebrow">Gallery</p>
            <h2 className="sec-title">A Visual <em>Journey</em></h2>
          </div>
        </div>
        <div className="gallery-grid">
          <div className="g-item tall reveal-up"><img src="https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Pool" /><div className="g-mask"></div></div>
          <div className="g-item reveal-up"><img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Room" /><div className="g-mask"></div></div>
          <div className="g-item reveal-up"><img src="https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Spa" /><div className="g-mask"></div></div>
          <div className="g-item wide reveal-up"><img src="https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Exterior" /><div className="g-mask"></div></div>
          <div className="g-item reveal-up"><img src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Dining" /><div className="g-mask"></div></div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-bg"><img src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Hotel" /></div>
        <div className="cta-overlay"></div>
        <div className="cta-body reveal-up">
          <p className="eyebrow light">Begin Your Journey</p>
          <h2 className="cta-title">Your sanctuary<br /><em>awaits.</em></h2>
          <p className="cta-sub">Our concierge team is available 24/7 to craft your perfect stay.</p>
          <button className="btn-light" onClick={() => openModal()}>Reserve Your Suite</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top reveal-up">
            <div className="ft-brand">
              <h3>POINT OF DEV</h3>
              <p>HOTEL & RESORT</p>
            </div>
            <div className="ft-cols">
              <div className="ft-col"><h4>Explore</h4><a href="#about">Our Story</a><a href="#rooms">Suites</a><a href="#amenities">Amenities</a><a href="#gallery">Gallery</a></div>
              <div className="ft-col"><h4>Services</h4><a href="#">Spa & Wellness</a><a href="#">Fine Dining</a><a href="#">Events</a><a href="#">Concierge</a></div>
              <div className="ft-col"><h4>Contact</h4><p>0767153573</p><p>info@pointofdev.com</p><p>123 Dev Blvd, Silicon Valley, CA</p></div>
            </div>
          </div>
          <div className="footer-bottom reveal-up">
            <p>© 2024 Point of Dev Hotel & Resort. All rights reserved.</p>
            <p>Crafted with precision.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="modal-overlay open" id="booking-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal-box">
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-img">
              <img src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Hotel" />
              <div className="modal-img-text"><p>Point of Dev Hotel</p><span>Your luxury experience awaits</span></div>
            </div>
            <div className="modal-form">
              <p className="eyebrow">Reservations</p>
              <h3 className="modal-title">Reserve Your Stay</h3>
              <div className="modal-progress">
                <div className={`progress-dot ${currentStep === 1 ? "active" : currentStep > 1 ? "done" : ""}`}><span>1</span><small>Suite</small></div>
                <div className="progress-line"></div>
                <div className={`progress-dot ${currentStep === 2 ? "active" : currentStep > 2 ? "done" : ""}`}><span>2</span><small>Details</small></div>
                <div className="progress-line"></div>
                <div className={`progress-dot ${currentStep === 3 ? "active" : ""}`}><span>✓</span><small>Done</small></div>
              </div>
              
              <form onSubmit={handleFormSubmit}>
                {/* STEP 1 */}
                <div className={`step ${currentStep !== 1 ? "hidden" : ""}`}>
                  <p className="step-label">Choose Suite</p>
                  <div className="radio-group">
                    <label className={`radio-card ${selRoom === "Deluxe Suite" ? "sel" : ""}`}>
                      <input type="radio" name="room" value="Deluxe Suite" checked={selRoom === "Deluxe Suite"} onChange={() => { setSelRoom("Deluxe Suite"); setSelPrice(450); }} />
                      <span>Deluxe Suite</span><span>$450/night</span>
                    </label>
                    <label className={`radio-card ${selRoom === "Grand Suite" ? "sel" : ""}`}>
                      <input type="radio" name="room" value="Grand Suite" checked={selRoom === "Grand Suite"} onChange={() => { setSelRoom("Grand Suite"); setSelPrice(780); }} />
                      <span>Grand Suite</span><span>$780/night</span>
                    </label>
                    <label className={`radio-card ${selRoom === "Presidential Suite" ? "sel" : ""}`}>
                      <input type="radio" name="room" value="Presidential Suite" checked={selRoom === "Presidential Suite"} onChange={() => { setSelRoom("Presidential Suite"); setSelPrice(1500); }} />
                      <span>Presidential Suite</span><span>$1,500/night</span>
                    </label>
                  </div>
                  <p className="step-label">Experience Package</p>
                  <div className="radio-group">
                    <label className={`radio-card ${selPkg === "Essential" ? "sel" : ""}`}>
                      <input type="radio" name="pkg" value="Essential" checked={selPkg === "Essential"} onChange={() => setSelPkg("Essential")} />
                      <span>Essential</span><span>Breakfast incl.</span>
                    </label>
                    <label className={`radio-card ${selPkg === "Signature" ? "sel" : ""}`}>
                      <input type="radio" name="pkg" value="Signature" checked={selPkg === "Signature"} onChange={() => setSelPkg("Signature")} />
                      <span>Signature</span><span>All Meals + Spa</span>
                    </label>
                    <label className={`radio-card ${selPkg === "Prestige" ? "sel" : ""}`}>
                      <input type="radio" name="pkg" value="Prestige" checked={selPkg === "Prestige"} onChange={() => setSelPkg("Prestige")} />
                      <span>Prestige</span><span>All Incl. + Chauffeur</span>
                    </label>
                  </div>
                  <button type="button" className="btn-dark btn-full" onClick={handleNext}>Continue →</button>
                </div>

                {/* STEP 2 */}
                <div className={`step ${currentStep !== 2 ? "hidden" : ""}`}>
                  <p className="step-label">Guest Details</p>
                  <div className="fg"><label>Full Name</label><input type="text" placeholder="Your full name" required /></div>
                  <div className="fg"><label>Email</label><input type="email" placeholder="your@email.com" required /></div>
                  <div className="fg-row">
                    <div className="fg"><label>Check-In</label><input type="date" ref={gInRef} onChange={updateSummary} required /></div>
                    <div className="fg"><label>Check-Out</label><input type="date" ref={gOutRef} onChange={updateSummary} required /></div>
                  </div>
                  <div className="fg">
                    <label>Guests</label>
                    <select defaultValue="2">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                  <div className="booking-summary" dangerouslySetInnerHTML={{ __html: `<strong>Suite:</strong> ${selRoom}<br/><strong>Package:</strong> ${selPkg}${nightsSummary}` }}></div>
                  <div className="step-actions">
                    <button type="button" className="btn-ghost-sm" onClick={() => setCurrentStep(1)}>← Back</button>
                    <button type="submit" className="btn-dark">Confirm</button>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className={`step ${currentStep !== 3 ? "hidden" : ""}`}>
                  <div className="success">
                    <div className="success-check">✓</div>
                    <h3>Confirmed!</h3>
                    <p>We look forward to welcoming you to Point of Dev Hotel.</p>
                    <button type="button" className="btn-dark" onClick={closeModal}>Done</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
