import React, { useState } from 'react';
import useSeo from '../hooks/useSeo';
import { PageHero } from '../components/ui';
import { students, interns } from '../data/certificates';
import { SITE } from '../data/site';
import {
  IconGraduationCap, IconCheck, IconAlert, IconExternal, IconSearch,
} from '../components/Icons';

const DATA = { students, interns };

// Google Drive refuses to render its /view page inside an iframe
// (X-Frame-Options: SAMEORIGIN), so an entry pasted straight from the
// "Copy link" button shows nothing. Normalise whatever form the link is
// in: /preview for the embed, /view for the "Open" button.
const DRIVE_FILE = /(?:\/file\/d\/|[?&]id=)([\w-]{10,})/;

function driveUrls(url = '') {
  const match = url.match(DRIVE_FILE);
  if (!match) return { embed: url, open: url };
  const id = match[1];
  return {
    embed: `https://drive.google.com/file/d/${id}/preview`,
    open: `https://drive.google.com/file/d/${id}/view`,
  };
}

export default function CertificateVerify({ type }) {
  const isStudent = type === 'students';
  const label = isStudent ? 'Student' : 'Intern';
  const example = isStudent ? 'STU-001' : 'INT-001';
  const records = DATA[type] || [];

  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | found | notfound
  const [record, setRecord] = useState(null);

  useSeo({
    title: `Verify ${label} Certificate`,
    description: `Confirm a Codify Labs ${label.toLowerCase()} certificate is genuine by entering the code printed on it.`,
    path: `/certificates/${type}`,
  });

  const verify = (e) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    setStatus('checking');
    setTimeout(() => {
      const found = records.find(r => r.code.toUpperCase() === trimmed);
      setRecord(found || null);
      setStatus(found ? 'found' : 'notfound');
    }, 450);
  };

  const reset = () => {
    setCode('');
    setRecord(null);
    setStatus('idle');
  };

  return (
    <>
      <PageHero
        eyebrow={`${label} Certificate Verification`}
        title="Verify Your Certificate"
        subtitle={`Enter the unique code printed on the Codify Labs ${label.toLowerCase()} certificate to confirm it's genuine and view the PDF.`}
        backTo="/certificates"
        backLabel="Certificate Types"
      />

      <section className="section">
        <div className="container-narrow">
          {status !== 'found' && (
            <div className="card verify-card">
              <form onSubmit={verify}>
                <label className="field-label" htmlFor="cert-code">Certificate code</label>
                <div className="verify-row">
                  <input
                    id="cert-code"
                    className={`input verify-input ${status === 'notfound' ? 'input-error' : ''}`}
                    value={code}
                    onChange={(e) => { setCode(e.target.value); if (status === 'notfound') setStatus('idle'); }}
                    placeholder={`e.g. ${example}`}
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck="false"
                    aria-describedby="cert-hint"
                    aria-invalid={status === 'notfound'}
                  />
                  <button type="submit" className="btn btn-primary" disabled={status === 'checking' || !code.trim()}>
                    {status === 'checking' ? 'Checking…' : <><IconSearch size={16} /> Verify</>}
                  </button>
                </div>

                {status === 'notfound' && (
                  <div className="alert alert-error" style={{ marginTop: 16 }} role="alert">
                    <IconAlert size={16} />
                    <span>
                      No certificate matches <strong>{code.trim().toUpperCase()}</strong>. Check the code
                      printed on the certificate and try again — or email{' '}
                      <a href={`mailto:${SITE.email}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{SITE.email}</a>{' '}
                      and we'll confirm it manually.
                    </span>
                  </div>
                )}

                <p id="cert-hint" className="muted" style={{ marginTop: 16 }}>
                  The code is printed on the certificate, usually in a bottom corner. It looks
                  like <strong style={{ color: 'var(--blue-700)' }}>{example}</strong>.
                </p>
              </form>
            </div>
          )}

          {status === 'found' && record && (
            <div>
              <div className="verify-head">
                <span className="alert alert-success verify-badge">
                  <IconCheck size={16} /> Certificate verified
                </span>
                <button onClick={reset} className="btn btn-secondary btn-sm">Check another</button>
              </div>

              <div className="card verify-record">
                <span className="icon-tile" style={{ marginBottom: 0, width: 58, height: 58 }}>
                  <IconGraduationCap size={27} />
                </span>
                <div>
                  <h2 className="card-title" style={{ fontSize: 'var(--text-xl)', marginBottom: 6 }}>{record.name}</h2>
                  <p className="card-text">
                    {isStudent ? record.course : record.role} · {record.date}
                  </p>
                  <p className="verify-code">{record.code}</p>
                </div>
              </div>

              <div className="card pdf-card">
                <div className="pdf-head">
                  <span className="card-title" style={{ fontSize: 'var(--text-sm)', marginBottom: 0 }}>Certificate PDF</span>
                  <a
                    href={driveUrls(record.pdfUrl).open}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    Open <IconExternal size={14} />
                  </a>
                </div>
                <div className={`pdf-stage ${(record.rotate ?? 90) ? 'pdf-stage-rot' : 'pdf-stage-flat'}`}>
                  <iframe src={driveUrls(record.pdfUrl).embed} title={`Certificate for ${record.name}`} loading="lazy" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .verify-card { max-width: 620px; margin: 0 auto; padding: 32px 30px; }
        .verify-row { display: flex; gap: 10px; }
        .verify-input {
          flex: 1; font-family: var(--font-head); font-size: var(--text-base);
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .verify-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 14px; flex-wrap: wrap; margin-bottom: 20px;
        }
        .verify-badge { font-weight: 700; font-family: var(--font-head); align-items: center; }
        .verify-record { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 20px; }
        .verify-code {
          font-family: var(--font-head); font-weight: 800; font-size: var(--text-sm);
          color: var(--blue-700); letter-spacing: 0.08em; margin-top: 6px;
        }
        .pdf-card { padding: 0; overflow: hidden; }
        .pdf-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--line);
        }
        /* Certificates come out of "Print to PDF" as a PORTRAIT US Letter page
           (612x792) with the landscape artwork drawn sideways on it. Drive renders
           the page exactly as stored, so we rotate the frame instead of the file.

           The stage is the rotated footprint (792x612). The iframe keeps the page's
           own portrait proportions (612/792 = 77.27% wide, 792/612 = 129.41% tall
           relative to the stage) so Drive's viewer fits the page edge to edge; the
           rotation then lands it exactly on the stage. Set rotate: 0 on a record if
           its PDF is already stored upright. */
        .pdf-stage { position: relative; width: 100%; overflow: hidden; background: #fff; }
        .pdf-stage iframe { border: none; display: block; }
        .pdf-stage-flat { aspect-ratio: 1.43 / 1; }
        .pdf-stage-flat iframe { width: 100%; height: 100%; }
        .pdf-stage-rot { aspect-ratio: 792 / 612; }
        .pdf-stage-rot iframe {
          position: absolute; top: 50%; left: 50%;
          width: 77.27%; height: 129.41%;
          transform: translate(-50%, -50%) rotate(90deg);
        }
        @media (max-width: 560px) {
          .verify-row { flex-direction: column; }
          .verify-card { padding: 24px 20px; }
        }
      `}</style>
    </>
  );
}
