import { Zap, Share2, TrendingUp, Check, ArrowRight, Play } from "lucide-react";

export default function Home() {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#000', fontWeight: '900', fontSize: '20px' }}>C</span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>ClipNinja</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>Features</a>
          <a href="#how" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>How it Works</a>
          <a href="#pricing" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>Pricing</a>
          <button style={{ background: '#fbbf24', color: '#000', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 20px 80px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(251,191,36,0.1)', borderRadius: '999px', padding: '10px 20px', marginBottom: '32px', border: '1px solid rgba(251,191,36,0.2)' }}>
          <Zap size={16} style={{ color: '#fbbf24' }} />
          <span style={{ fontSize: '14px', color: '#fbbf24' }}>AI-Powered Video Clipping</span>
        </div>
        <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '24px', lineHeight: 1.1, maxWidth: '800px', margin: '0 auto 24px' }}>
          Turn Long Videos Into <span style={{ color: '#fbbf24' }}>Viral Clips</span> in Seconds
        </h1>
        <p style={{ fontSize: '18px', color: '#888', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
          Automatically transform YouTube videos into TikTok, Instagram Reels & YouTube Shorts. 
          AI finds the best moments. One-click posting. Track your growth.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button style={{ background: '#fbbf24', color: '#000', padding: '14px 32px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button style={{ background: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: '10px', border: '1px solid #333', fontSize: '16px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={18} /> Watch Demo
          </button>
        </div>
        <p style={{ marginTop: '16px', color: '#666', fontSize: '13px' }}>No credit card required • 14-day free trial</p>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 20px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>Everything You Need to Go Viral</h2>
          <p style={{ color: '#666', textAlign: 'center', marginBottom: '48px' }}>Powerful AI tools for content creators</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '32px' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(251,191,36,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Zap size={28} style={{ color: '#fbbf24' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>AI Smart Clipping</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.6 }}>Our AI analyzes videos and automatically identifies the most engaging moments for each platform.</p>
            </div>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '32px' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(251,191,36,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Share2 size={28} style={{ color: '#fbbf24' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Multi-Platform</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.6 }}>Post to TikTok, Instagram Reels & YouTube Shorts with one click. Customize captions & hashtags.</p>
            </div>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '32px' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(251,191,36,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <TrendingUp size={28} style={{ color: '#fbbf24' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Earnings Tracking</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.6 }}>Track how your clips drive traffic and sales. Monitor conversions, revenue & ROI in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>How ClipNinja Works</h2>
          <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', background: '#111', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>1</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Connect Your Content</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>Link your YouTube channel or upload videos directly. We support any length.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', background: '#111', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>2</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>AI Generates Clips</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>Our AI identifies viral moments and creates optimized clips automatically.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', background: '#111', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>3</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Publish & Track</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>One-click post to all platforms. Watch your growth with detailed analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 20px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>Simple, Transparent Pricing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ border: '1px solid #333', borderRadius: '16px', padding: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#888' }}>Starter</h3>
              <div style={{ margin: '16px 0' }}><span style={{ fontSize: '40px', fontWeight: 'bold' }}>$19</span><span style={{ color: '#666', marginLeft: '4px' }}>/mo</span></div>
              <ul style={{ color: '#888', fontSize: '14px', lineHeight: '2.2', listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> 50 clips/month</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Basic AI</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> 2 platforms</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Basic analytics</li>
              </ul>
              <button style={{ width: '100%', marginTop: '24px', padding: '12px', border: '1px solid #333', borderRadius: '8px', background: 'transparent', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Start Free</button>
            </div>
            <div style={{ border: '2px solid #fbbf24', borderRadius: '16px', padding: '32px', background: '#111' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#fbbf24', color: '#000', padding: '4px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' }}>MOST POPULAR</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>Pro</h3>
              <div style={{ margin: '16px 0' }}><span style={{ fontSize: '40px', fontWeight: 'bold' }}>$49</span><span style={{ color: '#666', marginLeft: '4px' }}>/mo</span></div>
              <ul style={{ color: '#888', fontSize: '14px', lineHeight: '2.2', listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> 200 clips/month</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Advanced AI</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> All platforms</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Advanced analytics</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Earnings tracking</li>
              </ul>
              <button style={{ width: '100%', marginTop: '24px', padding: '12px', border: 'none', borderRadius: '8px', background: '#fbbf24', color: '#000', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Start Free</button>
            </div>
            <div style={{ border: '1px solid #333', borderRadius: '16px', padding: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#888' }}>Business</h3>
              <div style={{ margin: '16px 0' }}><span style={{ fontSize: '40px', fontWeight: 'bold' }}>$99</span><span style={{ color: '#666', marginLeft: '4px' }}>/mo</span></div>
              <ul style={{ color: '#888', fontSize: '14px', lineHeight: '2.2', listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Unlimited clips</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Premium AI</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> All platforms + API</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Full analytics</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} style={{ color: '#fbbf24' }} /> Dedicated support</li>
              </ul>
              <button style={{ width: '100%', marginTop: '24px', padding: '12px', border: '1px solid #333', borderRadius: '8px', background: 'transparent', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to Go Viral?</h2>
        <p style={{ color: '#666', marginBottom: '32px' }}>Join thousands of creators growing their audience</p>
        <button style={{ background: '#fbbf24', color: '#000', padding: '16px 40px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Get Started for Free</button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px', textAlign: 'center', color: '#444', fontSize: '14px', borderTop: '1px solid #111' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '24px', height: '24px', background: '#fbbf24', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#000', fontWeight: '900', fontSize: '14px' }}>C</span>
          </div>
          <span style={{ fontWeight: '600' }}>ClipNinja</span>
        </div>
        <p>© 2026 ClipNinja. All rights reserved.</p>
      </footer>
    </div>
  );
}
