import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Services from './components/Services';
import Projects from './components/Projects';
import Courses from './components/Courses';
import Internship from './components/Internship';
import Certificates from './components/Certificates';
import CertificatePage from './components/CertificatePage';
import About from './components/About';
import Contact from './components/Contact';
import { students, interns } from './certificates';

export default function App() {
  const [page, setPage] = useState('home');
  const [subpage, setSubpage] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, setHistory] = useState([]); // stack of previous { page, subpage }

  // Support direct URL like ?verify=students or ?verify=interns (for QR code)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verify = params.get('verify');
    if (verify === 'students' || verify === 'interns') {
      setPage('certificates');
      setSubpage(verify);
    }
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, subpage]);

  const goTo = (p, sp = null) => {
    setHistory(h => [...h, { page, subpage }]);
    setPage(p);
    setSubpage(sp);
    setMobileOpen(false);
  };

  const goBack = () => {
    setHistory(h => {
      if (h.length === 0) {
        setPage('home');
        setSubpage(null);
        return h;
      }
      const prev = h[h.length - 1];
      setPage(prev.page);
      setSubpage(prev.subpage);
      return h.slice(0, -1);
    });
    setMobileOpen(false);
  };

  return (
    <div>
      <Sidebar
        page={page}
        goTo={goTo}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        {page === 'home' && <Home goTo={goTo} />}

        {page === 'services' && <Services subpage={subpage} goTo={goTo} goBack={goBack} />}

        {page === 'projects' && <Projects goTo={goTo} goBack={goBack} />}

        {page === 'courses' && <Courses goTo={goTo} goBack={goBack} />}

        {page === 'internship' && <Internship goTo={goTo} goBack={goBack} />}

        {page === 'certificates' && !subpage && <Certificates goTo={goTo} goBack={goBack} />}

        {page === 'certificates' && subpage === 'students' && (
          <CertificatePage type="students" data={students} goTo={goTo} goBack={goBack} />
        )}

        {page === 'certificates' && subpage === 'interns' && (
          <CertificatePage type="interns" data={interns} goTo={goTo} goBack={goBack} />
        )}

        {page === 'about' && <About goTo={goTo} goBack={goBack} />}

        {page === 'contact' && <Contact goTo={goTo} goBack={goBack} />}
      </main>
    </div>
  );
}
