import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  { title: "Knobs", type: "Hardware", tone: "lime", copy: "Precision controls with soft metallic depth." },
  { title: "VR Headset", type: "Spatial", tone: "blue", copy: "A floating hero object that reacts to pointer depth." },
  { title: "Laptop", type: "Product", tone: "pink", copy: "Premium device framing with layered glass cards." },
  { title: "Radio", type: "Audio", tone: "amber", copy: "Playful product cards with calm Framer-like reveals." },
];

const services = [
  ["01", "Development", "Responsive builds with runtime motion, performance, and careful interaction states."],
  ["02", "Brand Guidelines", "Systems for type, color, tone, imagery, and reusable motion rules."],
  ["03", "Product Design", "3D-first hardware exploration, prototyping, and launch-ready digital presentation."],
];

const process = [
  ["Idea", "Align goals, audience, story, and interaction principles."],
  ["Design", "Prototype screens, transitions, object depth, and content rhythm."],
  ["Web dev", "Build responsive components with scroll and hover motion."],
  ["Launch", "Polish performance, accessibility, and final QA details."],
];

const faqs = [
  ["What changed from static?", "This version runs a React app with Framer Motion: scroll transforms, layout animation, interactive accordions, hover states, and pointer-driven 3D depth."],
  ["Does it follow the Nivora feel?", "It mirrors the reference's dark premium layout, floating product visuals, soft reveals, marquee strips, studio services, process cards, and FAQ interactions."],
  ["Is it responsive?", "Yes. The layout compresses to a single-column mobile experience while keeping the animations lightweight."],
];

const words = ["Grido", "Stickify", "Agentify", "AI Nest", "Brandora", "Codify", "Dailyhub", "Flexify"];

const viewport = { once: true, margin: "-12% 0px" };

const fadeUp = {
  hidden: { opacity: 0, y: 42, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function SplitHeadline({ children }) {
  return (
    <h1 aria-label={children}>
      {children.split(" ").map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="headline-word"
          initial={{ opacity: 0, y: 110, rotateX: -22 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.85, delay: 0.18 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
          key={`${word}-${index}`}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

function CursorAura() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const smoothX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.5 });

  function handlePointerMove(event) {
    if (reduceMotion) return;
    x.set(event.clientX - 190);
    y.set(event.clientY - 190);
  }

  return (
    <motion.div
      className="app-shell"
      onPointerMove={handlePointerMove}
      style={{ "--aura-x": smoothX, "--aura-y": smoothY }}
    />
  );
}

function Header({ progress }) {
  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <a className="brand" href="#" aria-label="Nivora motion study home">
        <motion.span
          className="brand-mark"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        Nivora
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQ</a>
      </nav>
      <MagneticButton href="#contact">Schedule a call</MagneticButton>
    </motion.header>
  );
}

function MagneticButton({ href, children, variant = "primary" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  function onMove(event) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      className={`button ${variant}`}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

function ProductStage() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const reduceMotion = useReducedMotion();
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,255,255,0.32), transparent 34%)`;

  function onMove(event) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    rotateX.set((py - 0.5) * -15);
    rotateY.set((px - 0.5) * 18);
    spotX.set(px * 100);
    spotY.set(py * 100);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
    spotX.set(50);
    spotY.set(35);
  }

  return (
    <motion.div
      className="hero-stage"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 58, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="stage-card" style={{ rotateX, rotateY, backgroundImage: spotlight }}>
        <motion.div
          className="headset"
          animate={{ y: [0, -22, 0], rotateZ: [-1, 1.5, -1] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span />
          <span />
        </motion.div>
        <span className="stage-label">VR Headset Hardware</span>
      </motion.div>
      <FloatingChip className="chip-top" label="Smart speaker" shape="speaker" delay={0.2} />
      <FloatingChip className="chip-bottom" label="Audio dial" shape="dial" delay={0.8} />
    </motion.div>
  );
}

function FloatingChip({ className, label, shape, delay }) {
  return (
    <motion.div
      className={`floating-chip ${className}`}
      animate={{ y: [0, -18, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 4.8, delay, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.08, rotate: 0 }}
    >
      <span>{label}</span>
      <div className={`mini-object ${shape}`} />
    </motion.div>
  );
}

function ProjectCard({ project, index, active, setActive }) {
  return (
    <motion.article
      className={`project-card ${project.tone} ${active ? "is-active" : ""}`}
      layout
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -14, scale: 1.02 }}
      onPointerEnter={() => setActive(index)}
      onClick={() => setActive(index)}
    >
      <motion.div className="product-object" layoutId={`product-${project.title}`}>
        <div />
      </motion.div>
      <motion.div className="project-meta" layout>
        <span>{project.type}</span>
        <h3>{project.title}</h3>
        <AnimatePresence>
          {active && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              {project.copy}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const heroY = useTransform(heroProgress, [0, 1], [0, 170]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(heroProgress, [0, 0.72], [1, 0.18]);

  return (
    <>
      <CursorAura />
      <div className="noise" aria-hidden="true" />
      <motion.div
        className="orb orb-one"
        animate={{ x: [0, 90, 20], y: [0, 55, -20], scale: [1, 1.18, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-two"
        animate={{ x: [0, -80, -20], y: [0, 30, 80], scale: [1, 1.12, 0.96] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <Header progress={smoothProgress} />

      <main>
        <section className="hero section" ref={heroRef}>
          <motion.div className="hero-copy" style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              Thoughtful design across brands, products, and digital experiences
            </motion.p>
            <SplitHeadline>Design for everyone</SplitHeadline>
            <motion.p
              className="hero-text"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              A dynamic Framer-style studio page with scroll-linked depth, magnetic buttons,
              interactive product cards, and animated content sections.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.72 }}
            >
              <MagneticButton href="#work">Explore motion</MagneticButton>
              <MagneticButton href="#services" variant="ghost">View services</MagneticButton>
            </motion.div>
          </motion.div>
          <ProductStage />
        </section>

        <motion.section
          id="work"
          className="section split"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="eyebrow">Gallery</p>
            <h2>Physical products with crisp digital presence.</h2>
          </div>
          <p>
            Cards animate into view, expand copy on interaction, and use Framer Motion layout
            transitions to feel closer to the reference than a fixed static page.
          </p>
        </motion.section>

        <section className="project-grid section">
          {projects.map((project, index) => (
            <ProjectCard
              active={activeProject === index}
              index={index}
              key={project.title}
              project={project}
              setActive={setActiveProject}
            />
          ))}
        </section>

        <section id="services" className="section services">
          <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <p className="eyebrow">Our service</p>
            <h2>Clarity, craft, and motion for launch-ready brands.</h2>
          </motion.div>
          <div className="service-list">
            {services.map(([number, title, copy], index) => (
              <motion.article
                className="service-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10, backgroundColor: "rgba(200,255,101,0.12)" }}
                key={title}
              >
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <ProcessSection />
        <Marquee />
        <TeamStrip />

        <section id="faq" className="section faq">
          <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <p className="eyebrow">Frequently asked questions</p>
            <h2>Dynamic interactions, not static decoration.</h2>
          </motion.div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <motion.article className="faq-item" layout key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span>{question}</span>
                  <motion.b animate={{ rotate: openFaq === index ? 45 : 0 }}>+</motion.b>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.32 }}
                    >
                      {answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <motion.footer id="contact" className="site-footer section" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
        <h2>Ready to shape your next launch?</h2>
        <MagneticButton href="mailto:hello@nivora.example">hello@nivora.example</MagneticButton>
      </motion.footer>
    </>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 42%"] });
  const pathScale = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <section id="process" className="section process" ref={ref}>
      <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
        <p className="eyebrow">How it works</p>
        <h2>From idea to launch.</h2>
      </motion.div>
      <div className="timeline">
        <motion.div className="timeline-line" style={{ scaleY: pathScale }} />
        {process.map(([title, copy], index) => (
          <motion.article
            className="timeline-step"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.62, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            key={title}
          >
            <span>{title}</span>
            <p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section className="marquee-section" aria-label="Selected projects">
      {[0, 1].map((row) => (
        <motion.div
          className="marquee"
          animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ duration: row === 0 ? 24 : 32, repeat: Infinity, ease: "linear" }}
          key={row}
        >
          {[...words, ...words].map((word, index) => (
            <span key={`${row}-${word}-${index}`}>{word}</span>
          ))}
        </motion.div>
      ))}
    </section>
  );
}

function TeamStrip() {
  return (
    <section className="section team">
      <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
        <p className="eyebrow">Our team</p>
        <h2>Creative minds with live hover profiles.</h2>
      </motion.div>
      <div className="team-grid">
        {["Liam", "Ethan", "Morgan", "Sofia"].map((name, index) => (
          <motion.article
            className="team-card"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.62, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover="hover"
            key={name}
          >
            <motion.div className="avatar" variants={{ hover: { scale: 1.08, rotate: index % 2 ? -4 : 4 } }} />
            <motion.div className="team-meta" variants={{ hover: { y: -8 } }}>
              <h3>{name}</h3>
              <p>{["Product Designer", "Design Engineer", "Creative Director", "Lead Designer"][index]}</p>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default App;
