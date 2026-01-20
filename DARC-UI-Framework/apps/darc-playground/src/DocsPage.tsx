import React, { useState } from "react";
import {
  PageShell,
  DocSection,
  PropsTable,
  CodeBlock,
  Stack,
  Inline,
  Spacer,
  AutoGrid,
  Grid,
  GridItem,
  Container,
  Center,
  Show,
  Hide,
  Only,
  useBreakpoint,
  type PropRow
} from "@darc/layout";

const colors = {
  primary: "#E23E57",
  secondary: "#88304E",
  dark: "#522546",
  darkest: "#311D3F"
};

function Chip({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "primary" | "success" | "warning" }) {
  const chipColors = {
    default: { border: colors.dark, bg: colors.dark },
    primary: { border: colors.primary, bg: colors.secondary },
    success: { border: colors.secondary, bg: colors.dark },
    warning: { border: colors.primary, bg: colors.dark }
  };

  return (
    <span
      style={{
        fontSize: 12,
        padding: "6px 12px",
        borderRadius: 4,
        border: `1px solid ${chipColors[variant].border}`,
        background: chipColors[variant].bg,
        whiteSpace: "nowrap",
        fontWeight: 600
      }}
    >
      {children}
    </span>
  );
}

function DemoBox({
  children,
  label,
  height = 60,
  color = colors.dark
}: {
  children?: React.ReactNode;
  label?: string;
  height?: number | string;
  color?: string;
}) {
  return (
    <div
      style={{
        height,
        borderRadius: 6,
        border: `1px solid ${colors.secondary}`,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 600,
        color: "rgba(255,255,255,0.85)",
        padding: 12,
        textAlign: "center"
      }}
    >
      {children || label}
    </div>
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        height: 1,
        background: colors.dark,
        margin: "24px 0"
      }}
    />
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${colors.dark}`,
        background: colors.dark,
        padding: 16,
        transition: "all 200ms ease",
        cursor: "default"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.primary;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.dark;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
      <div style={{ opacity: 0.75, fontSize: 13, lineHeight: 1.5 }}>{description}</div>
    </div>
  );
}

function NavItem({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "10px 14px",
        borderRadius: 6,
        border: "none",
        background: active ? colors.secondary : "transparent",
        color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
        fontWeight: active ? 600 : 400,
        fontSize: 13.5,
        cursor: "pointer",
        transition: "all 150ms ease"
      }}
    >
      {children}
    </button>
  );
}

function LiveBreakpointIndicator() {
  const bp = useBreakpoint();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 4,
        border: `1px solid ${colors.primary}`,
        background: colors.secondary,
        fontSize: 13,
        fontWeight: 600
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: colors.primary,
          animation: "pulse 2s infinite"
        }}
      />
      Current: {bp}
    </div>
  );
}

function IntroSection() {
  return (
    <DocSection
      title="DARC Layout Framework"
      description={
        <Stack gap={12}>
          <div>
            A <b>type-safe</b> and <b>responsive-first</b> layout system designed for modern React applications.
            Zero dependencies, maximum flexibility with CSS-in-JS approach.
          </div>
          <Inline gap={8} wrap>
            <Chip variant="primary">v0.1.0</Chip>
            <Chip variant="success">TypeScript</Chip>
            <Chip>React 18+</Chip>
            <Chip>Zero Dependencies</Chip>
          </Inline>
        </Stack>
      }
    >
      <AutoGrid minItemWidth={{ base: 200, md: 240 }} gap={14}>
        <FeatureCard
          title="Primitives"
          description="Build consistent layouts with fundamental building blocks like Container, Stack, Grid, and Inline."
        />
        <FeatureCard
          title="Responsive"
          description="All props can accept breakpoint-based values. Mobile-first design is automatic."
        />
        <FeatureCard
          title="Type-Safe"
          description="Full TypeScript support. Autocomplete and compile-time error checking."
        />
        <FeatureCard
          title="Composable"
          description="Ready-made page templates with presets. High-level components like PageShell and SidebarLayout."
        />
      </AutoGrid>
    </DocSection>
  );
}

function InstallationSection() {
  return (
    <DocSection
      title="Installation"
      description="Add DARC Layout to your project and start using it right away."
    >
      <Stack gap={14}>
        <CodeBlock
          title="npm"
          language="bash"
          code="npm install @darc/layout"
        />

        <CodeBlock
          title="pnpm"
          language="bash"
          code="pnpm add @darc/layout"
        />

        <CodeBlock
          title="Import"
          language="tsx"
          code={`import {
  Container,
  Stack,
  Grid,
  Show,
  PageShell
} from "@darc/layout";`}
        />
      </Stack>
    </DocSection>
  );
}

function BreakpointsSection() {
  const breakpointRows: PropRow[] = [
    { name: "base", type: "0px", description: "Default (mobile-first starting point)" },
    { name: "sm", type: "640px", description: "Small screens (large phones, small tablets)" },
    { name: "md", type: "768px", description: "Medium screens (tablets)" },
    { name: "lg", type: "1024px", description: "Large screens (small laptops)" },
    { name: "xl", type: "1280px", description: "Extra large screens (desktop)" },
    { name: "2xl", type: "1536px", description: "Extra extra large screens (wide monitors)" }
  ];

  return (
    <DocSection
      title="Breakpoint System"
      description={
        <Stack gap={10}>
          <div>
            Tailwind CSS compatible breakpoint values. All responsive props use these breakpoints.
          </div>
          <LiveBreakpointIndicator />
        </Stack>
      }
    >
      <Stack gap={14}>
        <PropsTable title="Breakpoints" rows={breakpointRows} />

        <CodeBlock
          title="Responsive Value Usage"
          language="tsx"
          code={`// Single value (same for all breakpoints)
<Stack gap={16}>...</Stack>

// Responsive object (breakpoint-based)
<Stack gap={{ base: 8, md: 16, xl: 24 }}>...</Stack>

// Container example
<Container
  size={{ base: "sm", lg: "xl" }}
  gutter={{ base: 12, md: 24 }}
>
  ...
</Container>`}
        />

        <CodeBlock
          title="useBreakpoint Hook"
          language="tsx"
          code={`import { useBreakpoint } from "@darc/layout";

function MyComponent() {
  const bp = useBreakpoint();

  return (
    <div>
      Current breakpoint: {bp}
      {bp === "base" && <MobileView />}
      {bp === "lg" && <DesktopView />}
    </div>
  );
}`}
        />
      </Stack>
    </DocSection>
  );
}

function ContainerSection() {
  const containerProps: PropRow[] = [
    {
      name: "size",
      type: 'Responsive<"sm" | "md" | "lg" | "xl">',
      defaultValue: '"lg"',
      description: "Container max-width value. sm=640px, md=768px, lg=1024px, xl=1280px"
    },
    {
      name: "gutter",
      type: "Responsive<number>",
      defaultValue: "16",
      description: "Left and right padding value (in px)"
    },
    {
      name: "center",
      type: "boolean",
      defaultValue: "true",
      description: "Centers the container horizontally (margin: auto)"
    }
  ];

  return (
    <DocSection
      title="Container"
      description="Controls the maximum width and horizontal padding of the page. The cornerstone of responsive design."
    >
      <Stack gap={14}>
        <PropsTable rows={containerProps} />

        <div style={{ background: colors.dark, borderRadius: 8, padding: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Live Demo</div>
          <div style={{ background: colors.darkest, borderRadius: 6, padding: 8 }}>
            <Container size="md" gutter={16}>
              <DemoBox label="Container size='md'" height={80} />
            </Container>
          </div>
        </div>

        <CodeBlock
          title="Basic Usage"
          language="tsx"
          code={`<Container size="lg" gutter={16}>
  <YourPageContent />
</Container>`}
        />

        <CodeBlock
          title="Responsive Usage"
          language="tsx"
          code={`<Container
  size={{ base: "sm", md: "lg", xl: "xl" }}
  gutter={{ base: 12, md: 24 }}
  center
>
  <ResponsiveContent />
</Container>`}
        />
      </Stack>
    </DocSection>
  );
}

function StackSection() {
  const stackProps: PropRow[] = [
    {
      name: "direction",
      type: 'Responsive<"row" | "column">',
      defaultValue: '"column"',
      description: "Flex direction. column=vertical, row=horizontal"
    },
    {
      name: "gap",
      type: "Responsive<number>",
      defaultValue: "12",
      description: "Gap between elements (px)"
    },
    {
      name: "align",
      type: "CSSProperties['alignItems']",
      description: "Cross-axis alignment (flex-start, center, flex-end, stretch)"
    },
    {
      name: "justify",
      type: "CSSProperties['justifyContent']",
      description: "Main-axis alignment (flex-start, center, space-between...)"
    },
    {
      name: "wrap",
      type: "CSSProperties['flexWrap']",
      description: "Overflow behavior (nowrap, wrap, wrap-reverse)"
    }
  ];

  return (
    <DocSection
      title="Stack"
      description="Arranges elements vertically or horizontally with consistent spacing. The most commonly used layout primitive."
    >
      <Stack gap={14}>
        <PropsTable rows={stackProps} />

        <Grid columns={{ base: 1, md: 2 }} gap={14}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, opacity: 0.8 }}>Vertical Stack</div>
            <div style={{ background: colors.dark, borderRadius: 8, padding: 12 }}>
              <Stack gap={8}>
                <DemoBox height={40} label="Item 1" />
                <DemoBox height={40} label="Item 2" />
                <DemoBox height={40} label="Item 3" />
              </Stack>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, opacity: 0.8 }}>Horizontal Stack</div>
            <div style={{ background: colors.dark, borderRadius: 8, padding: 12 }}>
              <Stack direction="row" gap={8}>
                <DemoBox height={60} label="1" color={colors.secondary} />
                <DemoBox height={60} label="2" color={colors.dark} />
                <DemoBox height={60} label="3" color={colors.secondary} />
              </Stack>
            </div>
          </div>
        </Grid>

        <CodeBlock
          title="Examples"
          language="tsx"
          code={`// Vertical stack (default)
<Stack gap={16}>
  <Header />
  <Content />
  <Footer />
</Stack>

// Horizontal stack
<Stack direction="row" gap={12} align="center">
  <Avatar />
  <UserName />
  <Badge />
</Stack>

// Responsive direction
<Stack
  direction={{ base: "column", md: "row" }}
  gap={{ base: 12, md: 24 }}
>
  <Sidebar />
  <MainContent />
</Stack>`}
        />
      </Stack>
    </DocSection>
  );
}

function InlineSection() {
  const inlineProps: PropRow[] = [
    { name: "gap", type: "Responsive<number>", defaultValue: "12", description: "Gap between elements" },
    { name: "rowGap", type: "Responsive<number>", description: "Gap between rows (when wrapped)" },
    { name: "colGap", type: "Responsive<number>", description: "Gap between columns" },
    { name: "wrap", type: "boolean", defaultValue: "false", description: "Should overflowing elements wrap to next line?" },
    { name: "align", type: "CSSProperties['alignItems']", description: "Vertical alignment" },
    { name: "justify", type: "CSSProperties['justifyContent']", description: "Horizontal alignment" }
  ];

  return (
    <DocSection
      title="Inline"
      description="Arranges elements horizontally. With wrap support, overflowing elements automatically move to the next line."
    >
      <Stack gap={14}>
        <PropsTable rows={inlineProps} />

        <div style={{ background: colors.dark, borderRadius: 8, padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12, opacity: 0.8 }}>Wrap Demo</div>
          <Inline gap={8} wrap>
            {["React", "TypeScript", "Vite", "ESLint", "Prettier", "Tailwind", "Node.js", "pnpm"].map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </Inline>
        </div>

        <CodeBlock
          title="Usage"
          language="tsx"
          code={`// Simple inline
<Inline gap={10}>
  <Icon />
  <Text>Label</Text>
</Inline>

// Tag list with wrap
<Inline gap={8} wrap>
  {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
</Inline>

// With alignment
<Inline gap={12} align="center" justify="space-between">
  <Logo />
  <Spacer />
  <NavLinks />
  <UserMenu />
</Inline>`}
        />
      </Stack>
    </DocSection>
  );
}

function CenterSection() {
  const centerProps: PropRow[] = [
    {
      name: "inline",
      type: "boolean",
      defaultValue: "false",
      description: "If true uses inline-flex, if false uses flex"
    }
  ];

  return (
    <DocSection
      title="Center"
      description="Centers content both horizontally and vertically. Ideal for loading spinners, empty states, etc."
    >
      <Stack gap={14}>
        <PropsTable rows={centerProps} />

        <div style={{ background: colors.dark, borderRadius: 8, padding: 16 }}>
          <Center style={{ height: 120, border: `1px dashed ${colors.secondary}`, borderRadius: 6 }}>
            <Stack gap={8} align="center">
              <div style={{ fontWeight: 700 }}>Centered Content</div>
            </Stack>
          </Center>
        </div>

        <CodeBlock
          title="Usage"
          language="tsx"
          code={`// Full page loading
<Center style={{ height: "100vh" }}>
  <Spinner />
</Center>

// Card centering
<Center style={{ height: 200 }}>
  <EmptyState message="No data yet" />
</Center>

// Inline centering
<Center inline>
  <Icon /> Centered inline
</Center>`}
        />
      </Stack>
    </DocSection>
  );
}

function SpacerSection() {
  const spacerProps: PropRow[] = [
    {
      name: "grow",
      type: "number",
      defaultValue: "1",
      description: "flex-grow value. Determines how much space to fill."
    }
  ];

  return (
    <DocSection
      title="Spacer"
      description="Creates space within a flex container. Used to push elements apart."
    >
      <Stack gap={14}>
        <PropsTable rows={spacerProps} />

        <div style={{ background: colors.dark, borderRadius: 8, padding: 16 }}>
          <Inline align="center" gap={10}>
            <DemoBox height={40} label="Logo" color={colors.secondary} />
            <Spacer />
            <DemoBox height={40} label="Nav" color={colors.dark} />
            <DemoBox height={40} label="User" color={colors.secondary} />
          </Inline>
        </div>

        <CodeBlock
          title="Header Example"
          language="tsx"
          code={`<Inline align="center" gap={12}>
  <Logo />
  <Spacer />  {/* Fills space between logo and nav */}
  <Nav />
  <UserMenu />
</Inline>`}
        />
      </Stack>
    </DocSection>
  );
}

function GridSection() {
  const gridProps: PropRow[] = [
    { name: "columns", type: "Responsive<number>", defaultValue: "12", description: "Number of columns" },
    { name: "gap", type: "Responsive<number>", defaultValue: "12", description: "All gaps" },
    { name: "rowGap", type: "Responsive<number>", description: "Row gap (overrides gap)" },
    { name: "colGap", type: "Responsive<number>", description: "Column gap (overrides gap)" },
    { name: "flow", type: '"row" | "column" | "row dense" | "column dense"', defaultValue: '"row"', description: "Grid flow direction" }
  ];

  const gridItemProps: PropRow[] = [
    { name: "span", type: 'Responsive<number | "auto" | "full">', defaultValue: '"auto"', description: "How many columns to span" },
    { name: "start", type: 'Responsive<number | "auto">', defaultValue: '"auto"', description: "Starting column" },
    { name: "order", type: "Responsive<number>", description: "Sort priority" },
    { name: "alignSelf", type: "CSSProperties['alignSelf']", description: "Vertical alignment" },
    { name: "justifySelf", type: "CSSProperties['justifySelf']", description: "Horizontal alignment" }
  ];

  return (
    <DocSection
      title="Grid & GridItem"
      description="CSS Grid based 12-column layout system. For complex dashboards and page layouts."
    >
      <Stack gap={14}>
        <PropsTable title="Grid Props" rows={gridProps} />
        <PropsTable title="GridItem Props" rows={gridItemProps} />

        <div style={{ background: colors.dark, borderRadius: 8, padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12, opacity: 0.8 }}>12 Column Demo</div>
          <Grid columns={12} gap={6}>
            <GridItem span={12}><DemoBox height={40} label="span=12 (full)" color={colors.secondary} /></GridItem>
            <GridItem span={6}><DemoBox height={40} label="span=6" color={colors.dark} /></GridItem>
            <GridItem span={6}><DemoBox height={40} label="span=6" color={colors.dark} /></GridItem>
            <GridItem span={4}><DemoBox height={40} label="span=4" color={colors.secondary} /></GridItem>
            <GridItem span={4}><DemoBox height={40} label="span=4" color={colors.secondary} /></GridItem>
            <GridItem span={4}><DemoBox height={40} label="span=4" color={colors.secondary} /></GridItem>
            <GridItem span={3}><DemoBox height={40} label="3" color={colors.dark} /></GridItem>
            <GridItem span={3}><DemoBox height={40} label="3" color={colors.dark} /></GridItem>
            <GridItem span={3}><DemoBox height={40} label="3" color={colors.dark} /></GridItem>
            <GridItem span={3}><DemoBox height={40} label="3" color={colors.dark} /></GridItem>
          </Grid>
        </div>

        <CodeBlock
          title="Responsive Grid"
          language="tsx"
          code={`<Grid
  columns={{ base: 1, md: 2, lg: 3 }}
  gap={{ base: 12, md: 16 }}
>
  <GridItem span={{ base: "full", lg: 2 }}>
    <MainContent />
  </GridItem>
  <GridItem>
    <Sidebar />
  </GridItem>
</Grid>`}
        />

        <CodeBlock
          title="Dashboard Layout"
          language="tsx"
          code={`<Grid columns={12} gap={16}>
  {/* Header - full width */}
  <GridItem span="full">
    <Header />
  </GridItem>

  {/* Sidebar - 3 columns on desktop */}
  <GridItem span={{ base: 12, lg: 3 }}>
    <Navigation />
  </GridItem>

  {/* Main content - 9 columns on desktop */}
  <GridItem span={{ base: 12, lg: 9 }}>
    <Dashboard />
  </GridItem>
</Grid>`}
        />
      </Stack>
    </DocSection>
  );
}

function AutoGridSection() {
  const autoGridProps: PropRow[] = [
    { name: "minItemWidth", type: "Responsive<number>", defaultValue: "240", description: "Minimum element width (px). Grid automatically calculates column count." },
    { name: "gap", type: "Responsive<number>", defaultValue: "12", description: "Gap between elements" },
    { name: "minRowHeight", type: "Responsive<number>", description: "Minimum row height" },
    { name: "align", type: "CSSProperties['alignItems']", description: "Vertical alignment" },
    { name: "justify", type: "CSSProperties['justifyItems']", description: "Horizontal alignment" }
  ];

  return (
    <DocSection
      title="AutoGrid"
      description="Grid with automatic column count calculation. Ideal for card lists, galleries, and product grids."
    >
      <Stack gap={14}>
        <PropsTable rows={autoGridProps} />

        <div style={{ background: colors.dark, borderRadius: 8, padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12, opacity: 0.8 }}>Auto-fit Demo (minItemWidth: 150px)</div>
          <AutoGrid minItemWidth={150} gap={10}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <DemoBox key={i} height={80} label={`Card ${i}`} color={i % 2 === 0 ? colors.secondary : colors.dark} />
            ))}
          </AutoGrid>
        </div>

        <CodeBlock
          title="Product List"
          language="tsx"
          code={`<AutoGrid
  minItemWidth={{ base: 160, md: 220 }}
  gap={{ base: 10, md: 16 }}
>
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</AutoGrid>`}
        />
      </Stack>
    </DocSection>
  );
}

function ShowHideSection() {
  const showProps: PropRow[] = [
    { name: "above", type: "BreakpointKey", description: "Shows at and above the specified breakpoint" },
    { name: "below", type: "BreakpointKey", description: "Shows below the specified breakpoint" },
    { name: "between", type: "[BreakpointKey, BreakpointKey]", description: "Shows between two breakpoints" },
    { name: "when", type: "Responsive<boolean>", description: "Responsive boolean condition" },
    { name: "fallback", type: "ReactNode", defaultValue: "null", description: "Content to show when hidden" },
    { name: "invert", type: "boolean", defaultValue: "false", description: "Inverts the condition" }
  ];

  const onlyProps: PropRow[] = [
    { name: "on", type: "BreakpointKey | BreakpointKey[]", required: true, description: "Show only at this breakpoint(s)" }
  ];

  const bp = useBreakpoint();

  return (
    <DocSection
      title="Show / Hide / Only"
      description={
        <Stack gap={10}>
          <div>
            Breakpoint-based conditional rendering. Controls React render instead of CSS display:none.
          </div>
          <LiveBreakpointIndicator />
        </Stack>
      }
    >
      <Stack gap={14}>
        <PropsTable title="Show Props" rows={showProps} />
        <PropsTable title="Only Props" rows={onlyProps} />

        <div style={{ background: colors.dark, borderRadius: 8, padding: 16 }}>
          <Stack gap={10}>
            <div style={{ fontWeight: 600, fontSize: 13, opacity: 0.8 }}>Live Demo (resize to test)</div>

            <Show below="md">
              <DemoBox height={50} label="Show below='md' - Mobile Only" color={colors.secondary} />
            </Show>

            <Show above="md">
              <DemoBox height={50} label="Show above='md' - Tablet & Desktop" color={colors.dark} />
            </Show>

            <Show between={["sm", "lg"]}>
              <DemoBox height={50} label="Show between={['sm', 'lg']} - sm to lg" color={colors.secondary} />
            </Show>

            <Only on="md">
              <DemoBox height={50} label="Only on='md' - Exactly md" color={colors.dark} />
            </Only>
          </Stack>
        </div>

        <CodeBlock
          title="Responsive Navigation"
          language="tsx"
          code={`function Navigation() {
  return (
    <>
      {/* Hamburger menu on mobile */}
      <Show below="lg">
        <MobileMenu />
      </Show>

      {/* Horizontal nav on desktop */}
      <Hide below="lg">
        <DesktopNav />
      </Hide>
    </>
  );
}`}
        />

        <CodeBlock
          title="Fallback Usage"
          language="tsx"
          code={`<Show
  above="md"
  fallback={<CompactView />}
>
  <FullView />
</Show>`}
        />
      </Stack>
    </DocSection>
  );
}

function SidebarLayoutSection() {
  const sidebarLayoutProps: PropRow[] = [
    { name: "sidebar", type: "ReactNode", required: true, description: "Sidebar content (menu, navigation)" },
    { name: "children", type: "ReactNode", required: true, description: "Main page content" },
    { name: "collapseBelow", type: "BreakpointKey", defaultValue: '"lg"', description: "Transforms to drawer below this breakpoint" },
    { name: "sidebarWidth", type: "number", defaultValue: "280", description: "Sidebar width (px)" },
    { name: "overlayColor", type: "string", defaultValue: '"rgba(0,0,0,0.55)"', description: "Mobile drawer overlay color" },
    { name: "open", type: "boolean", description: "Controlled mode: is drawer open?" },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Controlled mode: state change callback" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Uncontrolled mode: initial state" },
    { name: "showToggle", type: "boolean", defaultValue: "true", description: "Show toggle button on mobile" },
    { name: "toggleLabel", type: "string", defaultValue: '"Menu"', description: "Toggle button label" },
    { name: "topbarRight", type: "ReactNode", description: "Mobile topbar right slot" }
  ];

  return (
    <DocSection
      title="SidebarLayout"
      description={
        <Stack gap={10}>
          <div>
            Responsive sidebar/drawer layout. Fixed sidebar on desktop, slide-in drawer on mobile.
          </div>
          <Inline gap={8}>
            <Chip variant="success">ESC to close</Chip>
            <Chip variant="success">Body scroll lock</Chip>
            <Chip variant="success">Overlay click to close</Chip>
          </Inline>
        </Stack>
      }
    >
      <Stack gap={14}>
        <PropsTable rows={sidebarLayoutProps} />

        <CodeBlock
          title="Dashboard Layout"
          language="tsx"
          code={`function Dashboard() {
  return (
    <SidebarLayout
      sidebar={<DashboardNav />}
      collapseBelow="lg"
      sidebarWidth={260}
    >
      <DashboardContent />
    </SidebarLayout>
  );
}

function DashboardNav() {
  return (
    <Stack gap={4} style={{ padding: 16 }}>
      <NavItem active>Dashboard</NavItem>
      <NavItem>Analytics</NavItem>
      <NavItem>Settings</NavItem>
    </Stack>
  );
}`}
        />

        <CodeBlock
          title="Controlled Mode"
          language="tsx"
          code={`function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarLayout
      sidebar={<Menu />}
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      topbarRight={
        <Button onClick={() => setSidebarOpen(true)}>
          Open Menu
        </Button>
      }
    >
      <Content />
    </SidebarLayout>
  );
}`}
        />
      </Stack>
    </DocSection>
  );
}

function PageShellSection() {
  const pageShellProps: PropRow[] = [
    { name: "title", type: "ReactNode", required: true, description: "Page title" },
    { name: "subtitle", type: "ReactNode", description: "Subtitle description" },
    { name: "actions", type: "ReactNode", description: "Header right side (buttons, actions)" },
    { name: "sidebar", type: "ReactNode", description: "If provided, wraps with SidebarLayout" },
    { name: "footer", type: "ReactNode", description: "Page footer content" },
    { name: "children", type: "ReactNode", required: true, description: "Main content" },
    { name: "containerSize", type: 'Responsive<"sm" | "md" | "lg" | "xl">', defaultValue: '{ base: "sm", md: "xl" }', description: "Content container size" },
    { name: "gutter", type: "Responsive<number>", defaultValue: "{ base: 12, md: 24 }", description: "Container padding" },
    { name: "collapseBelow", type: "BreakpointKey", defaultValue: '"lg"', description: "Sidebar collapse breakpoint" },
    { name: "sidebarWidth", type: "number", defaultValue: "300", description: "Sidebar width" }
  ];

  return (
    <DocSection
      title="PageShell (Preset)"
      description={
        <Stack gap={10}>
          <div>
            Ready-made page template. Complete page structure with header (title, subtitle, actions), footer, and optional sidebar.
          </div>
          <Inline gap={8}>
            <Chip variant="primary">Preset</Chip>
            <Chip>Container + Stack + SidebarLayout</Chip>
          </Inline>
        </Stack>
      }
    >
      <Stack gap={14}>
        <PropsTable rows={pageShellProps} />

        <CodeBlock
          title="Simple Page"
          language="tsx"
          code={`<PageShell
  title="User Profile"
  subtitle="Manage your account settings and preferences"
  actions={
    <>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </>
  }
  footer="Last updated: 2 hours ago"
>
  <ProfileForm />
</PageShell>`}
        />

        <CodeBlock
          title="With Dashboard"
          language="tsx"
          code={`<PageShell
  title="Dashboard"
  subtitle="Daily summary and statistics"
  sidebar={
    <Stack gap={4}>
      <NavItem active>Overview</NavItem>
      <NavItem>Analytics</NavItem>
      <NavItem>Reports</NavItem>
      <NavItem>Settings</NavItem>
    </Stack>
  }
  actions={<Button>New Report</Button>}
>
  <DashboardWidgets />
</PageShell>`}
        />
      </Stack>
    </DocSection>
  );
}

function DocsComponentsSection() {
  const codeBlockProps: PropRow[] = [
    { name: "code", type: "string", required: true, description: "Code to display" },
    { name: "language", type: "string", defaultValue: '"tsx"', description: "Language for syntax highlighting" },
    { name: "title", type: "string", description: "Code block title" },
    { name: "maxHeight", type: "number", defaultValue: "360", description: "Maximum height (for scroll)" }
  ];

  const propsTableProps: PropRow[] = [
    { name: "title", type: "string", defaultValue: '"Props"', description: "Table title" },
    { name: "rows", type: "PropRow[]", required: true, description: "Array of prop rows" }
  ];

  const docSectionProps: PropRow[] = [
    { name: "title", type: "string", required: true, description: "Section title" },
    { name: "description", type: "ReactNode", description: "Section description" },
    { name: "children", type: "ReactNode", required: true, description: "Section content" }
  ];

  return (
    <DocSection
      title="Docs Components"
      description="Helper components for creating documentation pages."
    >
      <Stack gap={14}>
        <PropsTable title="CodeBlock Props" rows={codeBlockProps} />
        <PropsTable title="PropsTable Props" rows={propsTableProps} />
        <PropsTable title="DocSection Props" rows={docSectionProps} />

        <CodeBlock
          title="PropRow Type"
          language="tsx"
          code={`type PropRow = {
  name: string;        // Prop name
  type: string;        // TypeScript type
  required?: boolean;  // Is required?
  defaultValue?: string; // Default value
  description: string; // Description
};`}
        />

        <CodeBlock
          title="Usage Example"
          language="tsx"
          code={`<DocSection
  title="Button API"
  description="Clickable action component."
>
  <PropsTable
    rows={[
      {
        name: "variant",
        type: '"primary" | "secondary"',
        defaultValue: '"primary"',
        description: "Visual variant"
      },
      {
        name: "onClick",
        type: "() => void",
        required: true,
        description: "Click handler"
      }
    ]}
  />

  <CodeBlock
    title="Example"
    code={\`<Button variant="primary" onClick={handleClick}>
  Click me
</Button>\`}
  />
</DocSection>`}
        />
      </Stack>
    </DocSection>
  );
}

function QuickReferenceSection() {
  return (
    <DocSection
      title="Quick Reference"
      description="Commonly used patterns and quick reference."
    >
      <Stack gap={14}>
        <CodeBlock
          title="Card Layout"
          language="tsx"
          code={`<Container size="lg">
  <Stack gap={16}>
    <h1>Page Title</h1>
    <AutoGrid minItemWidth={280} gap={16}>
      {items.map(item => (
        <Card key={item.id} {...item} />
      ))}
    </AutoGrid>
  </Stack>
</Container>`}
        />

        <CodeBlock
          title="Form Layout"
          language="tsx"
          code={`<Stack gap={16}>
  <Grid columns={{ base: 1, md: 2 }} gap={12}>
    <Input label="First Name" />
    <Input label="Last Name" />
  </Grid>
  <Input label="Email" />
  <Inline gap={10} justify="flex-end">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save</Button>
  </Inline>
</Stack>`}
        />

        <CodeBlock
          title="Responsive Header"
          language="tsx"
          code={`<Inline align="center" gap={12}>
  <Logo />

  <Show above="md">
    <Inline gap={8}>
      <NavLink>Home</NavLink>
      <NavLink>About</NavLink>
      <NavLink>Contact</NavLink>
    </Inline>
  </Show>

  <Spacer />

  <Hide above="md">
    <MobileMenuButton />
  </Hide>

  <Show above="md">
    <UserMenu />
  </Show>
</Inline>`}
        />

        <CodeBlock
          title="Dashboard Page"
          language="tsx"
          code={`<PageShell
  title="Analytics Dashboard"
  sidebar={<DashboardNav />}
  actions={<DateRangePicker />}
>
  <Stack gap={16}>
    <AutoGrid minItemWidth={200} gap={12}>
      <StatCard label="Users" value="12,345" />
      <StatCard label="Revenue" value="$45,678" />
      <StatCard label="Orders" value="890" />
    </AutoGrid>

    <Grid columns={{ base: 1, lg: 2 }} gap={16}>
      <ChartCard title="Traffic" />
      <ChartCard title="Conversions" />
    </Grid>
  </Stack>
</PageShell>`}
        />
      </Stack>
    </DocSection>
  );
}

export function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", label: "Introduction", component: IntroSection },
    { id: "install", label: "Installation", component: InstallationSection },
    { id: "breakpoints", label: "Breakpoints", component: BreakpointsSection },
    { id: "container", label: "Container", component: ContainerSection },
    { id: "stack", label: "Stack", component: StackSection },
    { id: "inline", label: "Inline", component: InlineSection },
    { id: "center", label: "Center", component: CenterSection },
    { id: "spacer", label: "Spacer", component: SpacerSection },
    { id: "grid", label: "Grid & GridItem", component: GridSection },
    { id: "autogrid", label: "AutoGrid", component: AutoGridSection },
    { id: "showhide", label: "Show / Hide / Only", component: ShowHideSection },
    { id: "sidebarlayout", label: "SidebarLayout", component: SidebarLayoutSection },
    { id: "pageshell", label: "PageShell", component: PageShellSection },
    { id: "docs", label: "Docs Components", component: DocsComponentsSection },
    { id: "quickref", label: "Quick Reference", component: QuickReferenceSection }
  ];

  const sidebar = (
    <Stack gap={2} style={{ padding: 12 }}>
      <div style={{ fontWeight: 900, fontSize: 14, padding: "8px 14px", opacity: 0.6 }}>
        Documentation
      </div>
      {sections.map((section) => (
        <NavItem
          key={section.id}
          active={activeSection === section.id}
          onClick={() => setActiveSection(section.id)}
        >
          {section.label}
        </NavItem>
      ))}
    </Stack>
  );

  const ActiveComponent = sections.find((s) => s.id === activeSection)?.component || IntroSection;

  return (
    <PageShell
      title="DARC Layout"
      subtitle="Responsive layout primitives for React"
      sidebar={sidebar}
      actions={
        <Inline gap={8}>
          <Chip variant="primary">v0.1.0</Chip>
          <Show above="sm">
            <Chip variant="success">TypeScript</Chip>
          </Show>
        </Inline>
      }
      footer={
        <Inline align="center" gap={8} wrap>
          <span>DARC UI Framework</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span style={{ opacity: 0.7 }}>Built with @darc/layout</span>
          <Spacer />
          <Show above="md">
            <span style={{ opacity: 0.5 }}>MIT License</span>
          </Show>
        </Inline>
      }
    >
      <Stack gap={24}>
        <ActiveComponent />

        <SectionDivider />

        <Inline gap={10} justify="space-between" wrap>
          <button
            type="button"
            onClick={() => {
              const currentIndex = sections.findIndex((s) => s.id === activeSection);
              if (currentIndex > 0) {
                setActiveSection(sections[currentIndex - 1].id);
              }
            }}
            disabled={sections.findIndex((s) => s.id === activeSection) === 0}
            style={{
              padding: "10px 16px",
              borderRadius: 6,
              border: `1px solid ${colors.dark}`,
              background: colors.dark,
              color: "rgba(255,255,255,0.9)",
              cursor: "pointer",
              fontWeight: 600,
              opacity: sections.findIndex((s) => s.id === activeSection) === 0 ? 0.4 : 1
            }}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => {
              const currentIndex = sections.findIndex((s) => s.id === activeSection);
              if (currentIndex < sections.length - 1) {
                setActiveSection(sections[currentIndex + 1].id);
              }
            }}
            disabled={sections.findIndex((s) => s.id === activeSection) === sections.length - 1}
            style={{
              padding: "10px 16px",
              borderRadius: 6,
              border: `1px solid ${colors.primary}`,
              background: colors.primary,
              color: "rgba(255,255,255,0.95)",
              cursor: "pointer",
              fontWeight: 600,
              opacity: sections.findIndex((s) => s.id === activeSection) === sections.length - 1 ? 0.4 : 1
            }}
          >
            Next
          </button>
        </Inline>
      </Stack>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </PageShell>
  );
}
