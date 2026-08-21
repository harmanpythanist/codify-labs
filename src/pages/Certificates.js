import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero } from '../components/ui';
import { IconGraduationCap, IconLaptop, IconArrowRight } from '../components/Icons';

const TYPES = [
  {
    to: '/certificates/students',
    icon: IconGraduationCap,
    title: 'Student Certificate',
    desc: 'For course and training program graduates. Codes look like STU-001.',
  },
  {
    to: '/certificates/interns',
    icon: IconLaptop,
    title: 'Internship Certificate',
    desc: 'For internship program graduates. Codes look like INT-001.',
  },
];

export default function Certificates() {
  useSeo({
    title: 'Verify a Certificate',
    description: 'Verify the authenticity of a Codify Labs student or internship certificate using the code printed on it.',
    path: '/certificates',
  });
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Certificate Verification"
        title="Verify a Codify Labs Certificate"
        subtitle="Choose the certificate type below and enter the ID printed on the certificate to confirm it's genuine."
      />

      <section className="section">
        <div className="container-narrow">
          <div className="grid grid-2">
            {TYPES.map((t, i) => (
              <Link key={t.to} to={t.to} className="card card-link" data-reveal data-reveal-delay={i * 80}>
                <span className="icon-tile"><t.icon size={24} /></span>
                <h2 className="card-title">{t.title}</h2>
                <p className="card-text">{t.desc}</p>
                <span className="link-arrow" style={{ marginTop: 16 }}>
                  Verify now <IconArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>

          <p className="muted" style={{ marginTop: 28, textAlign: 'center' }}>
            Scanned a QR code from a printed certificate? It will bring you straight to the right page.
          </p>
        </div>
      </section>
    </>
  );
}
