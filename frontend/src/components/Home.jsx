import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";
import {
  pageBackground,
  pageWrapper,
  primaryBtn,
  secondaryBtn,
  bodyText,
  divider,

  sectionSplit,
  sectionCenter,
  sectionTitle,

  heroTitle,
  heroAccent,
  heroText,

  featureCard,
  featureCardHeader,
  featureCardTitle,
  featureCardDesc,
  featureCardAccent,

  threeColGrid,

  highlightBox,
  highlightTitle,
  highlightText,
  highlightMeta
} from "../styles/common";

const features = [
  {
    icon: "✍️",
    title: "Publish without friction",
    desc: "Write, format, and share in seconds. No clutter, just your thoughts.",
  },
  {
    icon: "🧭",
    title: "Explore deeply",
    desc: "Navigate ideas by topic, not noise. Find content that actually matters.",
  },
  {
    icon: "🌐",
    title: "Real engagement",
    desc: "Discussions that add value — not just comments, but conversations.",
  },
];

function Home() {
  const { isAuthenticated, currentUser } = useAuth();

  const getDashboardPath = () => {
    if (!currentUser) return "/login";
    if (currentUser.role === "AUTHOR") return "/author-dashboard";
    if (currentUser.role === "USER") return "/user-dashboard";
    if (currentUser.role === "ADMIN") return "/admin-dashboard";
    return "/login";
  };

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>

        {/* ── Hero ───────────────── */}
        <section className={sectionSplit}>
          <div>
            <p className="text-sm font-medium text-blue-600 mb-3">
              Built for readers & thinkers
            </p>

            <h1 className={heroTitle}>
              Not just blogs. <br />
              <span className={heroAccent}>Perspectives.</span>
            </h1>

            <p className={heroText}>
              BlogApp is designed for people who care about what they read and write.
              No distractions, no fluff — just meaningful content and conversations.
            </p>

            <div className="flex gap-3 flex-wrap">
              {isAuthenticated ? (
                <>
                  <NavLink to={getDashboardPath()} className={primaryBtn}>
                    Open Workspace →
                  </NavLink>
                  <NavLink to="/articles" className={secondaryBtn}>
                    Explore Content
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/register" className={primaryBtn}>
                    Create an account
                  </NavLink>
                  <NavLink to="/login" className={secondaryBtn}>
                    I already have an account
                  </NavLink>
                </>
              )}
            </div>
          </div>

          <div className={highlightBox}>
            <p className="text-sm text-slate-500 mb-4">Trending thought</p>

            <h3 className={highlightTitle}>
              Why long-form writing still matters in a short-form world
            </h3>

            <p className={highlightText}>
              Attention is shrinking, but depth is what builds real understanding.
              The platforms that survive will reward thinking — not scrolling.
            </p>

            <div className={highlightMeta}>
              ~ Editorial Pick
            </div>
          </div>
        </section>

        <div className={divider} />

        {/* ── Features ───────────── */}
        <section className="py-14">
          <h2 className={sectionTitle}>
            What makes this platform different
          </h2>

          <div className={threeColGrid}>
            {features.map((f) => (
              <div key={f.title} className={featureCard}>
                <div className={featureCardHeader}>
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className={featureCardTitle}>{f.title}</h3>
                </div>

                <p className={featureCardDesc}>{f.desc}</p>

                <div className={featureCardAccent} />
              </div>
            ))}
          </div>
        </section>

        <div className={divider} />

        {/* ── CTA ───────────────── */}
        <section className={sectionCenter}>
          {isAuthenticated ? (
            <>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Welcome back, {currentUser?.firstName}
              </h2>
              <p className={bodyText}>
                Continue writing or explore what others are thinking.
              </p>
              <div className="mt-6">
                <NavLink to={getDashboardPath()} className={primaryBtn}>
                  Continue →
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Start sharing your perspective
              </h2>
              <p className={bodyText}>
                No audience? No problem. Every great writer started with one post.
              </p>
              <div className="mt-6">
                <NavLink to="/register" className={primaryBtn}>
                  Create account
                </NavLink>
              </div>
            </>
          )}
        </section>

      </div>
    </div>
  );
}

export default Home;