import { useEffect, useState } from 'react';

function LinkedInIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}
function InstagramIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
}
function FacebookIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
}

export default function Contacto() {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', empresa: '', sector: '', desafio: '', mensagem: '', rgpd: false,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contacto | NIEUSYNC · Marcar Chamada Gratuita';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.10 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const contactItems = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>, label: 'Telefone', value: '(+351) 269 030 096', href: 'tel:+351269030096' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>, label: 'Mobile / WhatsApp', value: '(+351) 933 644 596', href: 'tel:+351933644596' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label: 'Email', value: 'geral@nieusync.com', href: 'mailto:geral@nieusync.com' },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>, label: 'Website', value: 'www.nieusync.com', href: 'https://www.nieusync.com' },
  ];

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-main)', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="section-label section-label-white">Contacto</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 style={{ color: 'var(--white)', marginBottom: '16px' }}>Fale connosco</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: '0 auto', fontSize: '18px' }}>
            Uma chamada de 30 minutos pode mudar a forma como gere o seu negócio.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }} className="contact-grid">
            <div className="animate-on-scroll">
              <h2 style={{ color: 'var(--blue)', marginBottom: '12px' }}>Entre em contacto</h2>
              <p style={{ color: 'rgba(35,56,119,0.70)', marginBottom: '32px' }}>
                A nossa equipa está disponível para responder a qualquer questão e ajudar a perceber qual o melhor caminho para o seu negócio.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {contactItems.map(({ icon, label, value, href }) => (
                  <a key={value} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--white)', borderLeft: '4px solid', borderImage: 'var(--grad-vertical) 1', borderRadius: '0 12px 12px 0', padding: '16px 20px', textDecoration: 'none', transition: 'box-shadow 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(35,56,119,0.10)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
                  >
                    <span style={{ color: 'var(--purple)', flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--purple)', marginBottom: '2px' }}>{label}</div>
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '15px', color: 'var(--blue)' }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <a href="https://wa.me/351933644596?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20NIEUSYNC" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#25D366', color: 'var(--white)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 24px', borderRadius: '8px', textDecoration: 'none', width: '100%', transition: 'background 0.2s ease, transform 0.2s ease', minHeight: '44px', marginBottom: '28px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#1EB354'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#25D366'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Enviar mensagem no WhatsApp
              </a>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
                {[
                  { href: 'https://www.linkedin.com/company/nieusync', Icon: LinkedInIcon },
                  { href: 'https://www.instagram.com/nieusync', Icon: InstagramIcon },
                  { href: 'https://www.facebook.com/nieusync', Icon: FacebookIcon },
                ].map(({ href, Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--purple)', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--blue)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--purple)'}
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              <div className="card">
                <h3 style={{ fontSize: '15px', color: 'var(--blue)', marginBottom: '8px' }}>Prefere agendar directamente?</h3>
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '16px' }}>
                  Escolha o horário que melhor se adequa à sua agenda. Reunião por videochamada ou telefone.
                </p>
                <a href="https://calendly.com/nieusync" target="_blank" rel="noopener noreferrer" className="btn-gradient" style={{ display: 'inline-flex', fontSize: '12px', padding: '12px 24px' }}>
                  Agendar no Calendário
                </a>
              </div>
            </div>

            <div className="animate-on-scroll">
              <div className="card-featured">
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '22px', color: 'var(--blue)', marginBottom: '8px' }}>
                  Marcar chamada gratuita de 30 min
                </h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: 'var(--purple)', marginBottom: '28px' }}>
                  Preencha o formulário e entraremos em contacto no próprio dia.
                </p>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--grad-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                    <h3 style={{ color: 'var(--blue)', marginBottom: '10px', fontSize: '20px' }}>Pedido enviado!</h3>
                    <p style={{ color: 'rgba(35,56,119,0.65)', fontSize: '15px' }}>Entraremos em contacto em menos de 24 horas úteis.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                      <div><label>Nome completo *</label><input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="O seu nome" required /></div>
                      <div><label>Email profissional *</label><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@empresa.pt" required /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                      <div><label>Telefone</label><input type="tel" name="telefone" value={form.telefone} onChange={handleChange} placeholder="+351 ..." /></div>
                      <div><label>Nome da empresa *</label><input type="text" name="empresa" value={form.empresa} onChange={handleChange} placeholder="A sua empresa" required /></div>
                    </div>
                    <div>
                      <label>Sector de actividade</label>
                      <select name="sector" value={form.sector} onChange={handleChange}>
                        <option value="">Seleccione o sector</option>
                        {['Tecnologia', 'Comércio', 'Serviços', 'Construção', 'Agro', 'Turismo', 'Saúde', 'Outro'].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label>Principal desafio</label>
                      <select name="desafio" value={form.desafio} onChange={handleChange}>
                        <option value="">Seleccione o desafio principal</option>
                        {['Questões legais', 'Organização financeira', 'Marketing e crescimento', 'Processos e automação', 'Não sei por onde começar'].map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div><label>Mensagem (opcional)</label><textarea name="mensagem" value={form.mensagem} onChange={handleChange} rows={4} placeholder="Conte-nos mais sobre o seu negócio..." style={{ resize: 'vertical' }} /></div>

                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', textTransform: 'none', letterSpacing: 'normal', fontSize: '13px', fontWeight: 400, color: 'rgba(35,56,119,0.70)' }}>
                      <div onClick={() => setForm((p) => ({ ...p, rgpd: !p.rgpd }))} style={{ width: '18px', height: '18px', minWidth: '18px', border: '2px solid var(--purple)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: form.rgpd ? 'var(--purple)' : 'var(--white)', transition: 'background 0.2s ease', marginTop: '2px', cursor: 'pointer' }}>
                        {form.rgpd && <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M2 6l3 3 5-5" /></svg>}
                      </div>
                      <span>Li e aceito a <a href="/privacidade" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>Política de Privacidade</a> e autorizo o tratamento dos meus dados para efeitos de contacto.</span>
                    </label>

                    <button type="submit" className="btn-gradient" disabled={!form.rgpd} style={{ width: '100%', padding: '16px', fontSize: '14px', opacity: form.rgpd ? 1 : 0.5, cursor: form.rgpd ? 'pointer' : 'not-allowed', marginTop: '8px' }}>
                      Enviar pedido →
                    </button>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(35,56,119,0.45)', textAlign: 'center' }}>
                      Resposta garantida em menos de 24 horas úteis.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
            .form-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
