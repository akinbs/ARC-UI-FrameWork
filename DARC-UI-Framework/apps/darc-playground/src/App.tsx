import React from "react";
import {
  AutoGrid,
  Center,
  Container,
  Grid,
  GridItem,
  Inline,
  Show,
  Only,
  Hide,
  Spacer,
  Stack,
  SidebarLayout,
  PageShell
} from "@darc/layout";
import { DocsPage } from "./DocsPage";

const colors = {
  primary: "#E23E57",
  secondary: "#88304E",
  dark: "#522546",
  darkest: "#311D3F"
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: colors.darkest,
    color: "rgba(255,255,255,0.92)",
    overflowX: "hidden"
  } as React.CSSProperties,

  card: {
    border: `1px solid ${colors.dark}`,
    borderRadius: 8,
    padding: 16,
    background: colors.dark,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
  } as React.CSSProperties,

  chip: {
    fontSize: 12,
    padding: "4px 10px",
    borderRadius: 4,
    border: `1px solid ${colors.secondary}`,
    background: colors.dark,
    whiteSpace: "nowrap"
  } as React.CSSProperties,

  sectionTitle: {
    margin: "0 0 10px 0",
    fontSize: 18,
    letterSpacing: 0.2
  } as React.CSSProperties,

  helper: {
    margin: "6px 0 0 0",
    opacity: 0.8,
    lineHeight: 1.5
  } as React.CSSProperties,

  hr: {
    border: "none",
    height: 1,
    background: colors.dark,
    margin: "18px 0"
  } as React.CSSProperties
};

function Card({ title, badge }: { title: string; badge?: string }) {
  return (
    <div style={styles.card}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
        {badge ? <span style={styles.chip}>{badge}</span> : null}
      </div>

      <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.35 }}>
        AutoGrid automatically adjusts column count with minItemWidth.
      </p>
    </div>
  );
}

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...styles.card,
        padding: 12,
        background: colors.secondary,
        border: `1px solid ${colors.primary}`
      }}
    >
      {children}
    </div>
  );
}

function DemoBox({
  label,
  hint,
  tone = "primary",
  children
}: {
  label: string;
  hint?: string;
  tone?: "primary" | "secondary" | "dark" | "accent";
  children: React.ReactNode;
}) {
  const toneMap: Record<string, { border: string; bg: string }> = {
    primary: { border: colors.primary, bg: colors.dark },
    secondary: { border: colors.secondary, bg: colors.darkest },
    dark: { border: colors.dark, bg: colors.darkest },
    accent: { border: colors.primary, bg: colors.secondary }
  };

  const t = toneMap[tone];

  return (
    <div
      style={{
        ...styles.card,
        background: t.bg,
        border: `1px solid ${t.border}`
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 700 }}>{label}</div>
        <span style={{ ...styles.chip, opacity: 0.95 }}>{tone}</span>
      </div>
      {hint ? <div style={styles.helper}>{hint}</div> : null}
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 4,
        border: `1px solid ${colors.secondary}`,
        background: colors.dark,
        whiteSpace: "nowrap"
      }}
    >
      {children}
    </span>
  );
}

function PrettySidebar() {
  return (
    <div style={{ display: "grid", gap: 14, padding: 14 }}>
      <div
        style={{
          borderRadius: 8,
          padding: 14,
          border: `1px solid ${colors.dark}`,
          background: colors.dark
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              border: `1px solid ${colors.secondary}`,
              background: colors.secondary,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700 }}>D</span>
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 900, letterSpacing: 0.2 }}>DARC UI</div>
            <div style={{ opacity: 0.72, fontSize: 12 }}>Layout primitives playground</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12, opacity: 0.65, paddingLeft: 4, textTransform: "uppercase", letterSpacing: 1 }}>Navigation</div>

      <div style={{ display: "grid", gap: 8 }}>
        {[
          { label: "Dashboard", active: true },
          { label: "Projects" },
          { label: "Docs" },
          { label: "Settings" }
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            style={{ all: "unset", cursor: "pointer" }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 6,
                border: item.active
                  ? `1px solid ${colors.primary}`
                  : `1px solid ${colors.dark}`,
                background: item.active ? colors.secondary : colors.dark,
                boxShadow: item.active ? "0 4px 12px rgba(0,0,0,0.25)" : "none"
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 18,
                  borderRadius: 2,
                  background: item.active ? colors.primary : "transparent"
                }}
              />

              <div style={{ fontWeight: 600 }}>{item.label}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ height: 1, background: colors.dark, margin: "6px 0" }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: 12,
          borderRadius: 8,
          border: `1px solid ${colors.dark}`,
          background: colors.dark
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            display: "grid",
            placeItems: "center",
            border: `1px solid ${colors.secondary}`,
            background: colors.secondary,
            fontWeight: 700
          }}
        >
          A
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13 }}>Akin</div>
          <div style={{ opacity: 0.7, fontSize: 12 }}>Local dev</div>
        </div>

        <div style={{ marginLeft: "auto", ...styles.chip, opacity: 0.9 }}>Online</div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = React.useState<"playground" | "docs">("playground");

  React.useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div style={styles.page}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: `1px solid ${colors.dark}`,
          background: colors.secondary
        }}
      >
        <Container size={{ base: "sm", md: "xl" }} gutter={{ base: 12, md: 24 }}>
          <Inline align="center" gap={10} style={{ padding: "10px 0" }}>
            <div style={{ fontWeight: 950, letterSpacing: 0.2 }}>DARC UI</div>
            <div style={{ opacity: 0.65, fontSize: 12 }}>layout framework</div>
            <Spacer />

            <button
              onClick={() => setView("playground")}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                border:
                  view === "playground"
                    ? `1px solid ${colors.primary}`
                    : `1px solid ${colors.dark}`,
                background:
                  view === "playground"
                    ? colors.primary
                    : colors.dark,
                color: "rgba(255,255,255,0.95)",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Playground
            </button>

            <button
              onClick={() => setView("docs")}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                border:
                  view === "docs"
                    ? `1px solid ${colors.primary}`
                    : `1px solid ${colors.dark}`,
                background:
                  view === "docs" ? colors.primary : colors.dark,
                color: "rgba(255,255,255,0.95)",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Docs
            </button>
          </Inline>
        </Container>
      </div>

      {view === "docs" ? (
        <DocsPage />
      ) : (
        <Container
          size={{ base: "sm", md: "xl" }}
          gutter={{ base: 12, md: 24 }}
          style={{ paddingTop: 28, paddingBottom: 40 }}
        >
          <Stack gap={16}>
            <div>
              <h1 style={{ margin: 0, fontSize: 44, letterSpacing: -0.5 }}>DARC Layout Playground</h1>
              <p style={{ marginTop: 10, marginBottom: 0, opacity: 0.85 }}>
                This page includes demos for Show/Only/Hide, AutoGrid, 12-column Grid, Inline/Spacer/Center, SidebarLayout, and PageShell.
              </p>
            </div>

            <Stack gap={10}>
              <Show below="md">
                <Banner>
                  <b>Show below="md"</b>: You are currently in mobile/sm view.
                </Banner>
              </Show>

              <Show above="md">
                <Banner>
                  <b>Show above="md"</b>: You are currently in md and above view.
                </Banner>
              </Show>

              <Only on="md">
                <Banner>
                  <b>Only on="md"</b>: I only appear at the md breakpoint.
                </Banner>
              </Only>

              <Hide below="md">
                <Banner>
                  <b>Hide below="md"</b>: I am hidden below md (visible at md+).
                </Banner>
              </Hide>
            </Stack>

            <div style={styles.hr} />

            <h2 style={styles.sectionTitle}>AutoGrid Demo</h2>
            <AutoGrid
              minItemWidth={{ base: 160, sm: 200, md: 220, lg: 240 }}
              gap={{ base: 12, md: 16 }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <Card key={i} title={`Card ${i + 1}`} badge={i % 4 === 0 ? "featured" : undefined} />
              ))}
            </AutoGrid>

            <div style={styles.hr} />

            <h2 style={styles.sectionTitle}>12 Column Grid Demo</h2>
            <p style={{ margin: 0, opacity: 0.82 }}>
              Colors are just to make column placement easier to read. All become full width when the window is narrowed.
            </p>

            <Grid columns={12} gap={{ base: 12, md: 16 }} flow="row dense" style={{ marginTop: 12 }}>
              <GridItem span={{ base: "full", md: 8 }}>
                <DemoBox tone="primary" label="Main (span 8)" hint="Mobile: full. md+: 8 columns.">
                  <div style={{ opacity: 0.9 }}>Chart, table, feed, etc.</div>
                </DemoBox>
              </GridItem>

              <GridItem span={{ base: "full", md: 4 }}>
                <DemoBox tone="secondary" label="Side A (span 4)" hint="Mobile: full. md+: right side panel.">
                  <div style={{ opacity: 0.9 }}>KPI, filter, action box.</div>
                </DemoBox>
              </GridItem>

              <GridItem span={{ base: "full", md: 4 }}>
                <DemoBox tone="dark" label="Side B (span 4)" hint="Dense flow can fill gaps better.">
                  <div style={{ opacity: 0.9 }}>Second side panel.</div>
                </DemoBox>
              </GridItem>

              <GridItem span={{ base: "full", md: 8 }}>
                <DemoBox tone="accent" label="Wide (span 8)" hint="Wide area in second row. Good for forms/tables.">
                  <div style={{ opacity: 0.9 }}>Wide content area.</div>
                </DemoBox>
              </GridItem>
            </Grid>

            <div style={styles.hr} />

            <h2 style={styles.sectionTitle}>Inline + Spacer + Center</h2>

            <Inline
              wrap
              gap={{ base: 8, md: 12 }}
              align="center"
              style={{ ...styles.card, padding: 12, background: colors.dark }}
            >
              <MiniChip>Chip A</MiniChip>
              <MiniChip>Chip B</MiniChip>
              <MiniChip>Chip C</MiniChip>
              <MiniChip>Chip D</MiniChip>
              <MiniChip>Chip E</MiniChip>

              <Spacer />

              <MiniChip>Right Action</MiniChip>
            </Inline>

            <div
              style={{
                height: 160,
                marginTop: 12,
                borderRadius: 8,
                border: `1px dashed ${colors.secondary}`,
                background: colors.dark
              }}
            >
              <Center style={{ height: "100%" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700 }}>I am centered</div>
                  <div style={{ opacity: 0.8, marginTop: 6 }}>
                    Center = align-items + justify-content
                  </div>
                </div>
              </Center>
            </div>

            <div style={styles.hr} />

            <h2 style={styles.sectionTitle}>SidebarLayout</h2>

            <SidebarLayout collapseBelow="lg" sidebarWidth={300} sidebar={<PrettySidebar />}>
              <Stack gap={12}>
                <div style={styles.card}>
                  <b>Content Area</b>
                  <div style={styles.helper}>Sidebar is fixed on desktop. Opens as drawer on mobile.</div>
                </div>

                <div style={{ height: 420, borderRadius: 8, border: `1px dashed ${colors.secondary}` }} />
              </Stack>
            </SidebarLayout>

            <div style={styles.hr} />

            <h2 style={styles.sectionTitle}>PageShell (Preset) Demo</h2>

            <PageShell
              title="PageShell Preset"
              subtitle="Header + actions + footer + (optional) sidebar. Two layout modes in one component."
              actions={
                <>
                  <button
                    style={{
                      padding: "8px 14px",
                      borderRadius: 6,
                      border: `1px solid ${colors.dark}`,
                      background: colors.dark,
                      color: "rgba(255,255,255,0.95)",
                      cursor: "pointer",
                      fontWeight: 600
                    }}
                  >
                    New
                  </button>
                  <button
                    style={{
                      padding: "8px 14px",
                      borderRadius: 6,
                      border: `1px solid ${colors.primary}`,
                      background: colors.primary,
                      color: "rgba(255,255,255,0.95)",
                      cursor: "pointer",
                      fontWeight: 600
                    }}
                  >
                    Export
                  </button>
                </>
              }
              footer="Footer slot: copyright, links, version, etc. go here."
              sidebar={<PrettySidebar />}
            >
              <div style={{ display: "grid", gap: 12 }}>
                <div
                  style={{
                    borderRadius: 8,
                    border: `1px solid ${colors.dark}`,
                    background: colors.dark,
                    padding: 14
                  }}
                >
                  <b>Content</b>
                  <div style={{ opacity: 0.78, marginTop: 6, lineHeight: 1.45 }}>
                    PageShell carries the content area here. Automates Container + Stack rhythm.
                  </div>
                </div>

                <div style={{ height: 320, borderRadius: 8, border: `1px dashed ${colors.secondary}` }} />
              </div>
            </PageShell>
          </Stack>
        </Container>
      )}
    </div>
  );
}
