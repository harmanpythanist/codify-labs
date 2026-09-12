import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Header';
import { Footer } from './components/ui';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Gallery from './pages/Gallery';
import Courses from './pages/Courses';
import Internship from './pages/Internship';
import InternshipApply from './pages/InternshipApply';
import Certificates from './pages/Certificates';
import CertificateVerify from './pages/CertificateVerify';
import About from './pages/About';
import Contact from './pages/Contact';
import Labs from './pages/Labs';
import NotFound from './pages/NotFound';

/** Scroll to the top on navigation, but leave hash links alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);
  return null;
}

/**
 * The old site used `?verify=students` in the QR codes on printed
 * certificates. Those codes are already out in the world, so we keep
 * honouring them and redirect to the real route.
 */
function LegacyVerifyRedirect() {
  const { search, pathname } = useLocation();
  if (pathname !== '/') return null;
  const verify = new URLSearchParams(search).get('verify');
  if (verify === 'students') return <Navigate to="/certificates/students" replace />;
  if (verify === 'interns') return <Navigate to="/certificates/interns" replace />;
  return null;
}

export default function App() {
  return (
    <div className="page">
      <ScrollToTop />
      <LegacyVerifyRedirect />
      <Header />

      <main id="main" className="page-body">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/internship/apply" element={<InternshipApply />} />

          <Route path="/certificates" element={<Certificates />} />
          <Route path="/certificates/students" element={<CertificateVerify type="students" />} />
          <Route path="/certificates/interns" element={<CertificateVerify type="interns" />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Password-gated. Kept out of the sitemap and robots.txt. */}
          <Route path="/labs" element={<Labs />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
