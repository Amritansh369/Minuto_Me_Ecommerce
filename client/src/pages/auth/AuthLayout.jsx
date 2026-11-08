// Owner: M1 -- split-screen shell for login / signup
import { lazy, Suspense } from 'react';
import Logo from '../../components/common/Logo';
import { IconStar } from '../../components/common/Icons';
import './auth.css';

const Hero3D = lazy(() => import('../../components/three/Hero3D'));

export function ErrorBox({ children }) {
  if (!children) return null;
  return <div className="error-box" role="alert">{children}</div>;
}

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <div className="auth-form-side">
        <Logo />
        <div className="auth-form-wrap fade-up">
          <h1>{title}</h1>
          {subtitle && <p className="auth-sub">{subtitle}</p>}
          {children}
          {footer && <p className="auth-footer">{footer}</p>}
        </div>
        <span style={{ fontSize: 12, color: 'var(--muted-2)' }}>© 2026 Minuto Me</span>
      </div>

      <aside className="auth-art">
        <div className="auth-art-canvas">
          <Suspense fallback={null}>
            <Hero3D compact />
          </Suspense>
        </div>
        <div className="auth-quote">
          <div style={{ display: 'flex', gap: 3, color: '#fbbf24', marginBottom: 12 }}>
            {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} size={16} fill="currentColor" />)}
          </div>
          <p>“I set up my sneaker store on a Sunday afternoon. By Monday I had my first three orders.”</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80" alt="" width="40" height="40" style={{ borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Riya Sharma</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>Founder, Nova Lifestyle</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
