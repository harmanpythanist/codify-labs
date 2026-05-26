import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CertificatePage from './components/CertificatePage';
import { students, interns } from './certificates';

export default function App() {
  const [page, setPage] = useState('home');

  // Support direct URL like ?verify=students or ?verify=interns (for QR code)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verify = params.get('verify');
    if (verify === 'students' || verify === 'interns') {
      setPage(verify);
    }
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div>
      <Navbar active={page} setPage={setPage} />

      {page === 'home' && <Home setPage={setPage} />}

      {page === 'students' && (
        <CertificatePage
          type="students"
          data={students}
        />
      )}

      {page === 'interns' && (
        <CertificatePage
          type="interns"
          data={interns}
        />
      )}
    </div>
  );
}
