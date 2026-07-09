import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => { document.title = 'NIEUSYNC — Consultoria B2B Multidisciplinar'; }, []);
  return (
    <main>
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-main)', padding: '40px' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{ color: 'var(--white)', fontSize: '48px', marginBottom: '16px' }}>NIEUSYNC</h1>
          <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: '20px', marginBottom: '32px' }}>Consultoria B2B multidisciplinar</p>
          <Link to="/portal" className="btn-gradient">Área Reservada</Link>
        </div>
      </section>
    </main>
  );
}
