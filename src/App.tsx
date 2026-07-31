import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const signals = [
  {
    short: 'LEAD',
    incoming: 'A good lead went quiet.',
    diagnosis: 'The customer journey loses context between inquiry and follow-up.',
    route: 'CLARIFY + BUILD',
    output: 'Clear offer · landing page · intake · CRM-lite follow-up',
    code: 'CX—01',
  },
  {
    short: 'PROCESS',
    incoming: 'Work is scattered across people and tools.',
    diagnosis: 'The business depends on memory, copying, and asking who knows what.',
    route: 'MAP + SYSTEMIZE',
    output: 'Shared records · dashboard · portal · booking · internal tool',
    code: 'OPS—02',
  },
  {
    short: 'GROWTH',
    incoming: 'The next opportunity needs the right people.',
    diagnosis: 'Progress is blocked by a missing partner, specialist, mentor, or pathway.',
    route: 'DIAGNOSE + CONNECT',
    output: 'Trusted introductions · technical support · coordinated delivery',
    code: 'NET—03',
  },
  {
    short: 'TALENT',
    incoming: 'Capable young people need a first real project.',
    diagnosis: 'Talent exists, but supervised experience and portfolio evidence are scarce.',
    route: 'SUPERVISE + DELIVER',
    output: 'Real-project experience · mentoring · QA · accountable outcomes',
    code: 'FUT—04',
  },
]

const responses = [
  ['A business cannot explain its value clearly.', 'Clarify the offer and customer journey.', 'Positioning · website · landing page · intake'],
  ['Leads and customers live in messages and spreadsheets.', 'Create shared operating memory.', 'CRM-lite · records · follow-up · dashboard'],
  ['Routine work absorbs attention every week.', 'Move repetition without removing judgment.', 'Automation · reports · documents · supervised AI'],
  ['A project needs capacity or specialist support.', 'Coordinate the right delivery network.', 'Partners · specialists · startups · supervised contributors'],
]

const exchange = [
  ['BUSINESSES', 'Get practical systems, useful connections, and accountable delivery.'],
  ['YOUNG PEOPLE', 'Gain supervised experience, mentoring, and portfolio evidence.'],
  ['PARTNERS', 'Join measurable opportunities around real business needs.'],
]

function Switchboard({ active }: { active: number }) {
  const current = signals[active]
  return (
    <div className={`switchboard active-${active}`}>
      <div className="board-top"><span>ARZWARE / GROWTH SWITCHBOARD</span><span>LINE {String(active + 1).padStart(2, '0')} LIVE</span></div>
      <div className="lamp-row"><i /><i /><i className="on" /><i /><i /></div>
      <svg className="cables" viewBox="0 0 780 610" aria-hidden="true">
        <path className="cable cable-a" d="M55 110 C180 110 175 300 330 300 S525 112 720 112" />
        <path className="cable cable-b" d="M55 240 C200 240 196 300 330 300 S536 242 720 242" />
        <path className="cable cable-c" d="M55 370 C195 370 210 300 330 300 S540 372 720 372" />
        <path className="cable cable-d" d="M55 500 C170 500 208 300 330 300 S525 502 720 502" />
        <path className="pulse" d={[
          'M55 110 C180 110 175 300 330 300 S525 112 720 112',
          'M55 240 C200 240 196 300 330 300 S536 242 720 242',
          'M55 370 C195 370 210 300 330 300 S540 372 720 372',
          'M55 500 C170 500 208 300 330 300 S525 502 720 502',
        ][active]} />
      </svg>
      <div className="input-stack">
        {signals.map((signal, i) => <div className={i === active ? 'terminal active' : 'terminal'} key={signal.code}><i /><span>{signal.short}</span><small>{signal.code}</small></div>)}
      </div>
      <div className="operator-core"><img src="./assets/arzware-mark.png" alt="" /><span>ARZWARE</span><small>ROUTING WITH<br />HUMAN JUDGMENT</small></div>
      <div className="output-stack">
        {signals.map((signal, i) => <div className={i === active ? 'socket active' : 'socket'} key={signal.route}><i /><span>{signal.route}</span></div>)}
      </div>
      <div className="board-readout" key={current.code}><small>ACTIVE RESPONSE / {current.code}</small><strong>{current.output}</strong></div>
      <div className="dial"><span>1</span><span>2</span><span>3</span><span>4</span><i /></div>
    </div>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduced ? null : new Lenis({ duration: 1.05, smoothWheel: true })
    let raf = 0
    const frame = (time: number) => { lenis?.raf(time); raf = requestAnimationFrame(frame) }
    raf = requestAnimationFrame(frame)

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.header', { y: -24, opacity: 0, duration: .8 })
        .from('.hero-label', { y: 18, opacity: 0, duration: .6 }, '-=.3')
        .from('.hero-line span', { yPercent: 120, stagger: .1, duration: 1.05 }, '-=.2')
        .from('.hero-copy, .hero-controls', { y: 25, opacity: 0, stagger: .1, duration: .75 }, '-=.55')
        .from('.switchboard', { x: 60, rotate: 2, opacity: 0, duration: 1 }, '-=.85')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 84%' }, y: 45, opacity: 0, duration: .85, ease: 'power3.out' })
      })
      gsap.to('.operator-word', { scrollTrigger: { trigger: '.operator', start: 'top bottom', end: 'bottom top', scrub: 1 }, xPercent: -16 })
      gsap.to('.route-track-fill', { scrollTrigger: { trigger: '.method', start: 'top 68%', end: 'bottom 50%', scrub: 1 }, scaleX: 1 })
      gsap.utils.toArray<HTMLElement>('.method-step').forEach((step, i) => {
        gsap.from(step, { scrollTrigger: { trigger: '.method', start: `top ${75 - i * 7}%` }, y: 35, opacity: 0, duration: .7 })
      })
      gsap.to('.exchange-wheel', { rotation: 45, scrollTrigger: { trigger: '.exchange', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, root)

    return () => { ctx.revert(); lenis?.destroy(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div ref={root} className="site">
      <header className="header">
        <a href="#top" className="brand"><img src="./assets/arzware-mark.png" alt="" /><span>ARZWARE</span></a>
        <div className="header-center">BUSINESS DEVELOPMENT / DIGITAL INNOVATION</div>
        <nav className={menuOpen ? 'open' : ''}>
          <a href="#switch" onClick={() => setMenuOpen(false)}>SWITCHBOARD</a>
          <a href="#method" onClick={() => setMenuOpen(false)}>METHOD</a>
          <a href="#exchange" onClick={() => setMenuOpen(false)}>EXCHANGE</a>
          <a className="contact-link" href="mailto:arzware.lb@gmail.com">START A REVIEW ↗</a>
        </nav>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'CLOSE' : 'MENU'}</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-left">
            <div className="hero-label"><i /> SAIDA, LEBANON · LINE OPEN</div>
            <h1 aria-label="Make the right connection">
              <span className="hero-line"><span>MAKE THE</span></span>
              <span className="hero-line mint"><span>RIGHT</span></span>
              <span className="hero-line serif"><span>CONNECTION.</span></span>
            </h1>
            <p className="hero-copy">Arzware turns business needs into coordinated action—diagnosing the problem, connecting the right people or opportunities, and building the smallest useful system when technology is the answer.</p>
            <div className="hero-controls">
              <a href="mailto:arzware.lb@gmail.com">SEND A BUSINESS SIGNAL ↗</a>
              <span>CHOOSE A LINE →</span>
              <div className="line-buttons">{signals.map((signal, i) => <button className={i === active ? 'active' : ''} onClick={() => setActive(i)} key={signal.short}>{String(i + 1).padStart(2, '0')}</button>)}</div>
            </div>
          </div>
          <Switchboard active={active} />
        </section>

        <div className="ticker"><div>BUSINESS NEEDS IN&nbsp; ↗ &nbsp;DIAGNOSIS&nbsp; ↗ &nbsp;TRUSTED CONNECTIONS&nbsp; ↗ &nbsp;PRACTICAL SYSTEMS&nbsp; ↗ &nbsp;SUPERVISED EXPERIENCE&nbsp; ↗ &nbsp;BUSINESS NEEDS IN&nbsp; ↗ &nbsp;DIAGNOSIS&nbsp; ↗ &nbsp;</div></div>

        <section className="operator">
          <div className="section-code">01 / ARZWARE’S ROLE</div>
          <div className="operator-word">OPERATOR&nbsp; OPERATOR&nbsp; OPERATOR</div>
          <div className="operator-grid">
            <h2 data-reveal>Not another vendor.<br /><em>The operator between need and progress.</em></h2>
            <div data-reveal>
              <p>A company may arrive asking for a website, automation, extra capacity, or a connection. We look underneath the request first.</p>
              <p>Then Arzware builds, coordinates, connects—or combines those paths—around one accountable outcome.</p>
            </div>
          </div>
        </section>

        <section id="switch" className="dispatch">
          <div className="section-code">02 / LIVE DISPATCH</div>
          <div className="dispatch-head">
            <h2 data-reveal>Choose what is<br /><em>blocking progress.</em></h2>
            <p data-reveal>Every line begins with a business reality—not a technology category.</p>
          </div>
          <div className="dispatch-layout">
            <div className="dispatch-tabs">
              {signals.map((signal, i) => (
                <button className={i === active ? 'active' : ''} onClick={() => setActive(i)} key={signal.code}>
                  <span>{signal.code}</span><strong>{signal.incoming}</strong><i />
                </button>
              ))}
            </div>
            <article className="dispatch-response" key={signals[active].code}>
              <div className="response-status"><i /> ROUTE CONFIRMED</div>
              <small>WHAT WE FIND</small>
              <h3>{signals[active].diagnosis}</h3>
              <div className="response-route"><span>ARZWARE ROUTE</span><strong>{signals[active].route}</strong></div>
              <small>PRACTICAL OUTPUT</small>
              <p>{signals[active].output}</p>
            </article>
          </div>
        </section>

        <section id="method" className="method">
          <div className="section-code">03 / SIGNAL PATH</div>
          <h2 data-reveal>One route.<br /><em>Four disciplined moves.</em></h2>
          <div className="route-track"><div className="route-track-fill" /></div>
          <div className="method-grid">
            {[
              ['01', 'DIAGNOSE', 'Understand the business, the customer, the process, and the actual blockage.'],
              ['02', 'CONNECT', 'Bring the right partner, specialist, opportunity, or support into reach.'],
              ['03', 'BUILD', 'Deliver the smallest useful website, workflow, dashboard, CRM, automation, or internal tool.'],
              ['04', 'IMPROVE', 'Measure what changed, strengthen the system, and decide the next useful move.'],
            ].map(([no, title, text]) => <article className="method-step" key={title}><i /><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="responses">
          <div className="responses-title">
            <div className="section-code">04 / RESPONSE DIRECTORY</div>
            <h2 data-reveal>What enters.<br /><em>What moves.</em></h2>
          </div>
          <div className="response-list">
            {responses.map(([incoming, move, tools], i) => (
              <article data-reveal key={incoming}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <div><small>INCOMING</small><h3>{incoming}</h3></div>
                <div><small>ARZWARE MOVE</small><p>{move}</p></div>
                <div><small>POSSIBLE OUTPUT</small><p>{tools}</p></div>
              </article>
            ))}
          </div>
          <p className="proof-note">Solution patterns—not claims about completed client projects.</p>
        </section>

        <section id="exchange" className="exchange">
          <div className="section-code">05 / THE GROWTH EXCHANGE</div>
          <div className="exchange-head">
            <h2 data-reveal>Business value moves<br /><em>in more than one direction.</em></h2>
            <p data-reveal>Arzware combines commercial delivery, trusted collaboration, and supervised experience into a sustainable ecosystem—not charity, and not cheap labor.</p>
          </div>
          <div className="exchange-stage">
            <div className="exchange-wheel">
              <span className="wheel-node node-a">BUSINESS<br />NEEDS</span>
              <span className="wheel-node node-b">REAL<br />PROJECTS</span>
              <span className="wheel-node node-c">YOUTH<br />EXPERIENCE</span>
              <span className="wheel-node node-d">PARTNER<br />VALUE</span>
            </div>
            <div className="exchange-core"><img src="./assets/arzware-mark.png" alt="Arzware" /><span>ACCOUNTABLE<br />COORDINATION</span></div>
          </div>
          <div className="exchange-list">
            {exchange.map(([title, text]) => <article data-reveal key={title}><span>{title}</span><p>{text}</p></article>)}
          </div>
        </section>

        <section className="closing">
          <div className="closing-status"><i /> CHANNEL AVAILABLE</div>
          <h2 data-reveal>What does your business<br /><em>need to move?</em></h2>
          <p data-reveal>Bring one bottleneck, opportunity, scattered process, missing connection, or digital idea. We will start by finding the right route.</p>
          <a href="mailto:arzware.lb@gmail.com">START A BUSINESS IMPROVEMENT REVIEW <span>↗</span></a>
          <footer><div className="brand"><img src="./assets/arzware-mark.png" alt="" /><span>ARZWARE</span></div><span>ARZWARE.LB@GMAIL.COM</span><span>SAIDA, LEBANON · 2026</span></footer>
        </section>
      </main>
    </div>
  )
}

export default App
