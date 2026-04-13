import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MMI Tips & Strategy — MMI Prep",
  description:
    "Learn the key strategies, frameworks, and tips to ace your Multiple Mini Interview for PA school.",
};

export default function TipsPage() {
  return (
    <main className="page-wrapper">
      <section className="hero" style={{ paddingBottom: "32px" }}>
        <div className="hero-badge">📚 Strategy Guide</div>
        <h1>MMI Tips & Strategy</h1>
        <p>
          Master the frameworks and strategies that top PA school applicants use
          to crush their MMI interviews.
        </p>
      </section>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Framework Cards */}
        <TipCard
          emoji="🎯"
          title="The SPIKES Protocol"
          subtitle="For delivering bad news"
          items={[
            { bold: "S — Setting:", text: "Ensure privacy and comfort" },
            {
              bold: "P — Perception:",
              text: "Assess what the patient already knows",
            },
            {
              bold: "I — Invitation:",
              text: "Ask how much the patient wants to know",
            },
            {
              bold: "K — Knowledge:",
              text: "Share the information clearly and compassionately",
            },
            {
              bold: "E — Empathy:",
              text: "Respond to emotions with empathy",
            },
            {
              bold: "S — Summary:",
              text: "Summarize and discuss next steps",
            },
          ]}
        />

        <TipCard
          emoji="⭐"
          title="The STAR Method"
          subtitle="For behavioral questions"
          items={[
            {
              bold: "S — Situation:",
              text: "Set the context with a brief background",
            },
            {
              bold: "T — Task:",
              text: "Describe your responsibility or challenge",
            },
            {
              bold: "A — Action:",
              text: "Explain the specific steps you took",
            },
            {
              bold: "R — Result:",
              text: "Share the outcome and what you learned",
            },
          ]}
        />

        <TipCard
          emoji="⚖️"
          title="Ethical Decision Framework"
          subtitle="For ethical dilemma questions"
          items={[
            {
              bold: "Autonomy:",
              text: "Respect the patient's right to make their own decisions",
            },
            {
              bold: "Beneficence:",
              text: "Act in the best interest of the patient",
            },
            {
              bold: "Non-maleficence:",
              text: "Do no harm",
            },
            {
              bold: "Justice:",
              text: "Treat all patients fairly and equitably",
            },
          ]}
        />

        <div
          style={{
            background: "var(--gradient-subtle)",
            border: "1px solid var(--border-glow)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-xl)",
            marginBottom: "var(--space-xl)",
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            💎 General Tips
          </h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {[
              "Take a moment to think before answering — silence is okay",
              "Structure your answer: acknowledge, analyze, conclude",
              "Show empathy and compassion in every scenario",
              "There's rarely one 'right' answer — it's about your reasoning process",
              "Always consider multiple perspectives (patient, family, team, system)",
              "Be genuine and authentic — interviewers can spot rehearsed answers",
              "Practice with a timer to build comfort with time pressure",
              "Avoid being judgmental — especially on ethics questions",
              "Connect your answers to real PA practice when possible",
              "End strong — summarize your key point clearly",
            ].map((tip, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "0.925rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "var(--gradient-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    marginTop: 2,
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

function TipCard({
  emoji,
  title,
  subtitle,
  items,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  items: { bold: string; text: string }[];
}) {
  return (
    <div
      style={{
        background: "var(--gradient-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-xl)",
        marginBottom: "var(--space-lg)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "4px",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
        <div>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            {subtitle}
          </span>
        </div>
      </div>
      <ul
        style={{
          listStyle: "none",
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              padding: "12px 16px",
              background: "var(--bg-glass-light)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.925rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: "var(--accent-primary-light)" }}>
              {item.bold}
            </strong>{" "}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
