import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const briefs = [
  {
    index: '01',
    label: 'Position',
    question: 'People reach the business, but the value is not clear.',
    reading: 'The problem may not be traffic. It may be a confusing offer, scattered message, or customer journey without a decisive next step.',
    response: 'Clarify the offer, shape the journey, then build the website or landing experience around one useful action.',
    outputs: 'Positioning · Website · Landing page · Intake',
  },
  {
    index: '02',
    label: 'Operations',
    question: 'Important work lives in messages, memory, and spreadsheets.',
    reading: 'Repeated questions, missing follow-up, and uncertain ownership usually point to an operating system that has not been made visible.',
    response: 'Map the workflow, preserve what works, and create a shared system that reduces repeated effort without removing human judgment.',
    outputs: 'CRM-lite · Dashboard · Portal · Internal tool',
  },
  {
    index: '03',
    label: 'Connection',
    question: 'The next move depends on people the business cannot yet reach.',
    reading: 'Not every growth problem is solved with software. Sometimes progress needs a trusted partner, specialist, mentor, startup, or support pathway.',
    response: 'Define the missing capability, make a useful connection, and coordinate the next step around a clear business outcome.',
    outputs: 'Partner search · Technical support · Coordinated delivery',
  },
  {
    index: '04',
    label: 'Automation',
    question: 'Routine work keeps taking attention from higher-value decisions.',
    reading: 'Automation is useful when the repeated task is understood, the exceptions are known, and a person remains accountable for the result.',
    response: 'Start with one reliable workflow, automate the repetitive layer, and keep approval where judgment, privacy, or quality matters.',
    outputs: 'Workflow automation · Reports · Documents · AI assistance',
  },
]

const method = [
  ['01', 'Diagnose', 'Find the real blockage before discussing tools, features, or scope.'],
  ['02', 'Connect', 'Bring the right people, partners, opportunities, or support into reach.'],
  ['03', 'Build', 'Deliver the smallest useful digital system with senior accountability.'],
  ['04', 'Improve', 'Review what changed, strengthen the system, and choose the next move.'],
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [activeBrief, setActiveBrief] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduceMotion ? null : new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.1 })
    let rafId = 0
    const raf = (time: number) => {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
      intro
        .from('.header', { opacity: 0, y: -18, duration: .8 })
        .from('.hero-kicker', { opacity: 0, y: 15, duration: .65 }, '-=.3')
        .from('.hero-line > span', { yPercent: 110, duration: 1.15, stagger: .11 }, '-=.2')
        .from('.hero-summary, .hero-action, .hero-aside', { opacity: 0, y: 26, duration: .8, stagger: .1 }, '-=.65')
        .fromTo('.hero-route-line', { scaleX: 0 }, { scaleX: 1, duration: 1.4 }, '-=.8')
        .from('.hero-route-dot', { scale: 0, duration: .5, ease: 'back.out(2)' }, '-=.3')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          scrollTrigger: { trigger: element, start: 'top 86%' },
          opacity: 0,
          y: 38,
          duration: .85,
          ease: 'power3.out',
        })
      })

      gsap.utils.toArray<HTMLElement>('.rule-reveal').forEach((rule) => {
        gsap.from(rule, {
          scrollTrigger: { trigger: rule, start: 'top 90%' },
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.15,
          ease: 'power3.inOut',
        })
      })

      gsap.to('.statement-ghost', {
        xPercent: -20,
        scrollTrigger: { trigger: '.statement', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })

      gsap.to('.method-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.method', start: 'top 72%', end: 'bottom 58%', scrub: 1 },
      })

      gsap.utils.toArray<HTMLElement>('.method-item').forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          scrollTrigger: { trigger: '.method-grid', start: `top ${82 - index * 6}%` },
          duration: .75,
        })
      })

      gsap.to('.connection-orbit', {
        rotation: 42,
        scrollTrigger: { trigger: '.connections', start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      })
      gsap.to('.connection-core', {
        yPercent: -8,
        scrollTrigger: { trigger: '.connections', start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      })
    }, root)

    return () => {
      ctx.revert()
      lenis?.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  const brief = briefs[activeBrief]

  return (
    <div className="site" ref={root}>
      <header className="header">
        <a className="brand" href="#top" aria-label="Arzware home">
          <img src="./assets/arzware-mark.png" alt="" />
          <span>ARZWARE</span>
        </a>
        <span className="header-note">BUSINESS DEVELOPMENT · DIGITAL SYSTEMS</span>
        <nav className={menuOpen ? 'open' : ''}>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#briefs" onClick={() => setMenuOpen(false)}>Business briefs</a>
          <a href="#connections" onClick={() => setMenuOpen(false)}>Connections</a>
          <a className="nav-cta" href="mailto:arzware.lb@gmail.com">Start a review <span>↗</span></a>
        </nav>
        <button className="menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Close' : 'Menu'}</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-kicker"><span>01</span> Senior-led business development from Saida, Lebanon</div>
          <h1 aria-label="A clear line from problem to progress">
            <span className="hero-line"><span>A CLEAR LINE</span></span>
            <span className="hero-line"><span>FROM PROBLEM</span></span>
            <span className="hero-line gold"><span>TO PROGRESS.</span></span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-summary">Arzware helps businesses find the right people, opportunities, and practical digital systems to move forward—with clear diagnosis and accountable execution.</p>
            <a className="hero-action" href="mailto:arzware.lb@gmail.com"><span>Discuss one business challenge</span><i>↗</i></a>
            <aside className="hero-aside"><span>THE PRINCIPLE</span><p>Start with the highest-value problem. Build only what makes the next move clearer.</p></aside>
          </div>
          <div className="hero-route" aria-hidden="true"><span className="hero-route-line" /><i className="hero-route-dot" /><small>PROBLEM</small><small>PROGRESS</small></div>
          <div className="scroll-cue">SCROLL TO FOLLOW THE LINE <span>↓</span></div>
        </section>

        <section className="statement">
          <div className="statement-ghost" aria-hidden="true">CLARITY BEFORE CODE · CLARITY BEFORE CODE</div>
          <div className="section-label">02 / WHAT COMES FIRST</div>
          <div className="statement-grid">
            <h2 data-reveal>We start before<br />the <em>software.</em></h2>
            <div data-reveal>
              <p>A request for a website, CRM, automation, or AI agent is often the visible part of a deeper business issue.</p>
              <p>We examine the offer, workflow, customer journey, people, and missing connections first. Technology enters when it is the most useful mechanism—not because it is fashionable.</p>
            </div>
          </div>
          <div className="rule-reveal statement-rule" />
          <div className="statement-note"><span>Our role</span><strong>Turn uncertainty into one useful next move.</strong></div>
        </section>

        <section className="method" id="approach">
          <div className="section-label">03 / THE OPERATING LINE</div>
          <div className="method-heading">
            <h2 data-reveal>Four moves.<br /><em>One accountable route.</em></h2>
            <p data-reveal>Business development, useful connections, and digital delivery belong to the same process.</p>
          </div>
          <div className="method-track"><div className="method-progress" /></div>
          <div className="method-grid">
            {method.map(([number, title, description]) => (
              <article className="method-item" key={title}>
                <span className="method-number">{number}</span>
                <i />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="briefs" id="briefs">
          <div className="section-label">04 / BUSINESS BRIEFS</div>
          <div className="briefs-heading">
            <h2 data-reveal>Begin with the<br /><em>business situation.</em></h2>
            <p data-reveal>Select a brief to see how Arzware reads the problem before shaping a response.</p>
          </div>
          <div className="brief-workspace">
            <div className="brief-tabs">
              {briefs.map((item, index) => (
                <button className={index === activeBrief ? 'active' : ''} onClick={() => setActiveBrief(index)} key={item.label}>
                  <span>{item.index}</span>
                  <strong>{item.label}</strong>
                  <i>{index === activeBrief ? '−' : '+'}</i>
                </button>
              ))}
            </div>
            <article className="brief-panel" key={brief.index}>
              <header><span>BRIEF / {brief.index}</span><span>ARZWARE READING</span></header>
              <h3>{brief.question}</h3>
              <div className="brief-reading"><span>WHAT MAY BE UNDERNEATH</span><p>{brief.reading}</p></div>
              <div className="brief-response"><span>THE CLEAR LINE</span><p>{brief.response}</p></div>
              <footer><span>POSSIBLE OUTPUT</span><strong>{brief.outputs}</strong></footer>
            </article>
          </div>
          <div className="solution-note">These are solution patterns, not claims about completed client projects.</div>
        </section>

        <section className="connections" id="connections">
          <div className="section-label">05 / CONNECTION IS PART OF THE WORK</div>
          <div className="connections-copy">
            <h2 data-reveal>Not every answer<br />is something <em>we build.</em></h2>
            <p data-reveal>Sometimes the useful move is a trusted introduction—to a partner, specialist, startup, mentor, service provider, technical team, or growth opportunity. Arzware helps define what is missing and coordinates the connection around the business need.</p>
          </div>
          <div className="connection-visual" aria-hidden="true">
            <div className="connection-orbit">
              <span className="node node-a">BUSINESS</span><span className="node node-b">PARTNER</span><span className="node node-c">OPPORTUNITY</span><span className="node node-d">SYSTEM</span>
            </div>
            <div className="connection-core"><img src="./assets/arzware-mark.png" alt="" /><span>ARZWARE</span><small>DEFINE · CONNECT · COORDINATE</small></div>
          </div>
        </section>

        <section className="impact">
          <div className="section-label">06 / BUILDING FUTURES, RESPONSIBLY</div>
          <div className="impact-title">
            <h2 data-reveal>Experience grows<br />through <em>real responsibility.</em></h2>
            <span data-reveal>SUPERVISED<br />NOT UNSUPPORTED</span>
          </div>
          <div className="rule-reveal impact-rule" />
          <div className="impact-grid">
            <article data-reveal><span>FOR BUSINESSES</span><h3>Senior accountability remains visible.</h3><p>Arzware owns diagnosis, architecture, supervision, quality, privacy, and launch approval.</p></article>
            <article data-reveal><span>FOR YOUNG PEOPLE</span><h3>Practice becomes portfolio evidence.</h3><p>Suitable real-project work can create supervised experience, mentoring, discipline, and a clearer route toward employment.</p></article>
            <article data-reveal><span>FOR PARTNERS</span><h3>Impact connects to useful delivery.</h3><p>Funders and ecosystem partners can support measurable pathways around real business needs and accountable outcomes.</p></article>
          </div>
        </section>

        <section className="closing">
          <div className="closing-top"><span>07 / BEGIN</span><span>SAIDA, LEBANON</span></div>
          <h2 data-reveal>Bring one problem.<br /><em>Leave with a clearer line.</em></h2>
          <p data-reveal>A Business Improvement Review starts with the bottleneck, opportunity, missing connection, or process—not a predetermined package.</p>
          <a className="closing-action" href="mailto:arzware.lb@gmail.com"><span>Start a business improvement review</span><i>↗</i></a>
          <footer>
            <a className="brand" href="#top"><img src="./assets/arzware-mark.png" alt="" /><span>ARZWARE</span></a>
            <a href="mailto:arzware.lb@gmail.com">ARZWARE.LB@GMAIL.COM</a>
            <span>CONNECTING BUSINESSES. BUILDING FUTURES.</span>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
