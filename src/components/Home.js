import React, { useEffect, useRef } from 'react';

const services = [
  { icon: '🤖', title: 'AI & Machine Learning', desc: 'Custom AI models, predictive analytics, and intelligent automation tailored to your business.' },
  { icon: '👁️', title: 'Computer Vision', desc: 'Image recognition, object detection, and visual AI systems for real-world applications.' },
  { icon: '💬', title: 'NLP & Chatbots', desc: 'Natural language processing, conversational AI, and smart chatbot development.' },
  { icon: '🌐', title: 'Web & Desktop Apps', desc: 'Full-stack web applications and powerful desktop software built with modern tech.' },
  { icon: '📊', title: 'Data Analysis', desc: 'Turn raw data into actionable insights with advanced analytics and visualization.' },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '8K+', label: 'Udemy Students' },
  { value: '6+', label: 'Countries Served' },
  { value: '3+', label: 'Years Experience' },
];

function useIntersection(ref, options) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-animate]');
    if (!els) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = entry.target.dataset.animate;
          io.unobserve(entry.target);
        }
      });
    }, options);
    els.forEach(el => {
      el.style.opacity = '0';
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

export default function Home({ setPage }) {
  const pageRef = useRef(null);
  useIntersection(pageRef, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const WHATSAPP = 'https://wa.me/923329555307';

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '100px 24px 60px',
        background: 'linear-gradient(160deg, #f0f6ff 0%, #ddeaf9 40%, #e8f1fd 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Animated blobs background */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(26,110,252,0.18) 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(26,110,252,0.1) 0%, transparent 70%)',
          animation: 'blob 10s ease-in-out infinite reverse',
          borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
        }} />
        {/* Grid dots decoration */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(26,110,252,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative' }}>
          <div
            data-animate="fadeInUp 0.6s ease both"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', border: '1px solid rgba(26,110,252,0.2)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 28,
              boxShadow: '0 2px 12px rgba(26,110,252,0.1)',
            }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#1a6efc',
              display: 'inline-block', animation: 'pulse 2s infinite',
              boxShadow: '0 0 0 0 rgba(26,110,252,0.4)', position: 'relative',
            }} />
            <span style={{ fontSize: 13, color: '#1a6efc', fontWeight: 600 }}>AI-Powered Software Solutions</span>
          </div>

          <h1
            data-animate="fadeInUp 0.7s 0.1s ease both"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: 800, marginBottom: 22, lineHeight: 1.1, color: '#0a1628' }}>
            We Turn Ideas Into<br />
            <span style={{
              background: 'linear-gradient(90deg, #1a6efc, #0050d8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Practical Software
            </span>
          </h1>

          <p
            data-animate="fadeInUp 0.7s 0.2s ease both"
            style={{ fontSize: 18, color: '#4a6080', maxWidth: 580, marginBottom: 40, lineHeight: 1.75 }}>
            At Codify Labs, we build AI-powered desktop applications, websites, and custom AI solutions — for clients across Canada, Germany, UK, Malaysia, Kuwait, and more.
          </p>

          <div
            data-animate="fadeInUp 0.7s 0.3s ease both"
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #1a6efc, #0050d8)',
              color: '#fff', padding: '14px 30px', borderRadius: 12,
              fontWeight: 700, fontSize: 15,
              boxShadow: '0 4px 20px rgba(26,110,252,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,110,252,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,110,252,0.35)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Get in Touch
            </a>
            <button onClick={() => setPage('students')} style={{
              background: 'white', border: '1.5px solid rgba(26,110,252,0.2)',
              color: '#1a6efc', padding: '14px 30px', borderRadius: 12,
              fontWeight: 600, fontSize: 15,
              boxShadow: '0 2px 12px rgba(26,110,252,0.08)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,110,252,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >View Certificates</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 24px 60px', background: 'white' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20,
        }}>
          {stats.map((s, i) => (
            <div key={s.value}
              data-animate={`fadeInUp 0.6s ${i * 0.1}s ease both`}
              style={{
                background: 'linear-gradient(135deg, #f0f6ff, #e8f1fd)',
                border: '1px solid rgba(26,110,252,0.12)',
                borderRadius: 16, padding: '28px 22px', textAlign: 'center',
                boxShadow: '0 2px 16px rgba(26,110,252,0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,110,252,0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(26,110,252,0.06)'; }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-head)', color: '#1a6efc', marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#4a6080', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section style={{ padding: '60px 24px 80px', background: 'linear-gradient(180deg, white, #f0f6ff)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
            <div data-animate="fadeInLeft 0.7s ease both">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1a6efc', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 14 }}>ABOUT US</div>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: 22, color: '#0a1628' }}>
                Built by People Who've Shipped Real Products
              </h2>
              <p style={{ color: '#4a6080', lineHeight: 1.85, marginBottom: 16 }}>
                Before starting Codify Labs, our founder and team worked on 50+ projects in data science, AI, and GUI application development for clients from Canada, Germany, the UK, Malaysia, Kuwait, and other countries.
              </p>
              <p style={{ color: '#4a6080', lineHeight: 1.85, marginBottom: 16 }}>
                Many clients continue to work with us — which reflects the quality and reliability of our work.
              </p>
              <p style={{ color: '#4a6080', lineHeight: 1.85 }}>
                We also help students grow through hands-on 3-month training + 3-month internship programs, and have published multiple Udemy courses with 8,000+ enrolled students.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              data-animate="fadeInUp 0.7s 0.15s ease both">
              {[
                { label: 'Internship Program', desc: '3 months training + 3 months hands-on internship', icon: '🎓' },
                { label: 'Udemy Courses', desc: '8,000+ students enrolled, positive global reviews', icon: '🎬' },
                { label: 'Client Retention', desc: 'Many clients across 6+ countries continue to return', icon: '🌍' },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'white', border: '1px solid rgba(26,110,252,0.12)',
                  borderRadius: 14, padding: '22px 24px',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  boxShadow: '0 2px 12px rgba(26,110,252,0.06)',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.borderColor = 'rgba(26,110,252,0.3)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,110,252,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'rgba(26,110,252,0.12)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(26,110,252,0.06)'; }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                    background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    border: '1px solid rgba(26,110,252,0.12)',
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: '#0a1628' }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#4a6080', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '60px 24px 80px', background: '#f0f6ff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }} data-animate="fadeInUp 0.6s ease both">
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a6efc', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 14 }}>WHAT WE DO</div>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0a1628' }}>Tech Services We Offer</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
            {services.map((s, i) => (
              <div key={s.title}
                data-animate={`fadeInUp 0.6s ${i * 0.08}s ease both`}
                style={{
                  background: 'white', border: '1px solid rgba(26,110,252,0.1)',
                  borderRadius: 16, padding: '30px 24px',
                  transition: 'all 0.25s',
                  boxShadow: '0 2px 12px rgba(26,110,252,0.05)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(26,110,252,0.35)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,110,252,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(26,110,252,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(26,110,252,0.05)';
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 12, marginBottom: 16,
                  background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, border: '1px solid rgba(26,110,252,0.1)',
                }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#0a1628' }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#4a6080', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        padding: '60px 24px',
        background: 'linear-gradient(135deg, #1a6efc, #0050d8)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: 220, height: 220,
          background: 'rgba(255,255,255,0.07)', borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: 280, height: 280,
          background: 'rgba(255,255,255,0.05)', borderRadius: '50%',
        }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}
          data-animate="fadeInUp 0.6s ease both">
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'white', marginBottom: 14 }}>
            Ready to Build Something Great?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: 16, lineHeight: 1.7 }}>
            Let's talk about your project. Reach out on WhatsApp and let's turn your vision into reality.
          </p>
          <a href="https://wa.me/923329555307" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'white', color: '#1a6efc',
            padding: '14px 32px', borderRadius: 12,
            fontWeight: 700, fontSize: 16,
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)'; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(26,110,252,0.1)', padding: '32px 24px',
        textAlign: 'center', color: '#4a6080', fontSize: 13, background: 'white',
      }}>
        <p>© {new Date().getFullYear()} Codify Labs · Clean solutions. Real results.</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(26,110,252,0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(26,110,252,0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
      `}</style>
    </div>
  );
}
