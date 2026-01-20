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

/* ─────────────────────────────────────────────────────────────────────────────
   UTILITY COMPONENTS
   ───────────────────────────────────────────────────────────────────────────── */

function Chip({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "primary" | "success" | "warning" }) {
  const colors = {
    default: { border: "rgba(255,255,255,0.14)", bg: "rgba(255,255,255,0.03)" },
    primary: { border: "rgba(100,140,255,0.35)", bg: "rgba(100,140,255,0.10)" },
    success: { border: "rgba(80,200,120,0.35)", bg: "rgba(80,200,120,0.10)" },
    warning: { border: "rgba(255,180,70,0.35)", bg: "rgba(255,180,70,0.10)" }
  };

  return (
    <span
      style={{
        fontSize: 12,
        padding: "6px 12px",
        borderRadius: 999,
        border: `1px solid ${colors[variant].border}`,
        background: colors[variant].bg,
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
  color = "rgba(100,140,255,0.15)"
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
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.12)",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 700,
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
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        margin: "24px 0"
      }}
    />
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "radial-gradient(circle at 20% 10%, rgba(90,120,255,0.08), transparent 55%), rgba(255,255,255,0.02)",
        padding: 16,
        transition: "all 200ms ease",
        cursor: "default"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(100,140,255,0.35)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontWeight: 900, fontSize: 15, marginBottom: 6 }}>{title}</div>
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
        borderRadius: 10,
        border: "none",
        background: active ? "rgba(100,140,255,0.15)" : "transparent",
        color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
        fontWeight: active ? 700 : 500,
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
        borderRadius: 999,
        border: "1px solid rgba(80,200,120,0.35)",
        background: "rgba(80,200,120,0.10)",
        fontSize: 13,
        fontWeight: 700
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#4ade80",
          animation: "pulse 2s infinite"
        }}
      />
      Current: {bp}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DOCUMENTATION SECTIONS
   ───────────────────────────────────────────────────────────────────────────── */

function IntroSection() {
  return (
    <DocSection
      title="DARC Layout Framework"
      description={
        <Stack gap={12}>
          <div>
            Modern React uygulamaları için tasarlanmış, <b>type-safe</b> ve <b>responsive-first</b> layout sistemi.
            CSS-in-JS yaklaşımıyla sıfır bağımlılık, maksimum esneklik.
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
          icon="📦"
          title="Primitives"
          description="Container, Stack, Grid, Inline gibi temel yapı taşları ile tutarlı layout'lar oluşturun."
        />
        <FeatureCard
          icon="📱"
          title="Responsive"
          description="Tüm prop'lar breakpoint bazlı değerler alabilir. Mobile-first tasarım otomatik."
        />
        <FeatureCard
          icon="🎯"
          title="Type-Safe"
          description="Tam TypeScript desteği. Otomatik tamamlama ve derleme zamanı hata kontrolü."
        />
        <FeatureCard
          icon="🧩"
          title="Composable"
          description="Presets ile hazır sayfa şablonları. PageShell, SidebarLayout gibi üst düzey bileşenler."
        />
      </AutoGrid>
    </DocSection>
  );
}

function InstallationSection() {
  return (
    <DocSection
      title="Kurulum"
      description="Projenize DARC Layout'u ekleyin ve hemen kullanmaya başlayın."
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
    { name: "base", type: "0px", description: "Varsayılan (mobile-first başlangıç noktası)" },
    { name: "sm", type: "640px", description: "Küçük ekranlar (büyük telefonlar, küçük tabletler)" },
    { name: "md", type: "768px", description: "Orta ekranlar (tabletler)" },
    { name: "lg", type: "1024px", description: "Büyük ekranlar (küçük laptoplar)" },
    { name: "xl", type: "1280px", description: "Çok büyük ekranlar (masaüstü)" },
    { name: "2xl", type: "1536px", description: "Ekstra büyük ekranlar (geniş monitörler)" }
  ];

  return (
    <DocSection
      title="Breakpoint Sistemi"
      description={
        <Stack gap={10}>
          <div>
            Tailwind CSS ile uyumlu breakpoint değerleri. Tüm responsive prop'lar bu breakpoint'leri kullanır.
          </div>
          <LiveBreakpointIndicator />
        </Stack>
      }
    >
      <Stack gap={14}>
        <PropsTable title="Breakpoints" rows={breakpointRows} />

        <CodeBlock
          title="Responsive Değer Kullanımı"
          language="tsx"
          code={`// Tek değer (tüm breakpoint'lerde aynı)
<Stack gap={16}>...</Stack>

// Responsive obje (breakpoint bazlı)
<Stack gap={{ base: 8, md: 16, xl: 24 }}>...</Stack>

// Container örneği
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
      description: "Container max-width değeri. sm=640px, md=768px, lg=1024px, xl=1280px"
    },
    {
      name: "gutter",
      type: "Responsive<number>",
      defaultValue: "16",
      description: "Sağ ve sol padding değeri (px cinsinden)"
    },
    {
      name: "center",
      type: "boolean",
      defaultValue: "true",
      description: "Container'ı yatayda ortalar (margin: auto)"
    }
  ];

  return (
    <DocSection
      title="Container"
      description="Sayfanın maksimum genişliğini ve yatay padding'ini kontrol eder. Responsive tasarımın temel taşı."
    >
      <Stack gap={14}>
        <PropsTable rows={containerProps} />

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 12 }}>Live Demo</div>
          <div style={{ background: "rgba(100,140,255,0.08)", borderRadius: 12, padding: 8 }}>
            <Container size="md" gutter={16}>
              <DemoBox label="Container size='md'" height={80} />
            </Container>
          </div>
        </div>

        <CodeBlock
          title="Temel Kullanım"
          language="tsx"
          code={`<Container size="lg" gutter={16}>
  <YourPageContent />
</Container>`}
        />

        <CodeBlock
          title="Responsive Kullanım"
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
      description: "Flex yönü. column=dikey, row=yatay"
    },
    {
      name: "gap",
      type: "Responsive<number>",
      defaultValue: "12",
      description: "Elemanlar arası boşluk (px)"
    },
    {
      name: "align",
      type: "CSSProperties['alignItems']",
      description: "Cross-axis hizalama (flex-start, center, flex-end, stretch)"
    },
    {
      name: "justify",
      type: "CSSProperties['justifyContent']",
      description: "Main-axis hizalama (flex-start, center, space-between...)"
    },
    {
      name: "wrap",
      type: "CSSProperties['flexWrap']",
      description: "Taşma davranışı (nowrap, wrap, wrap-reverse)"
    }
  ];

  return (
    <DocSection
      title="Stack"
      description="Elemanları dikey veya yatay olarak düzenli aralıklarla dizer. En sık kullanılan layout primitive'i."
    >
      <Stack gap={14}>
        <PropsTable rows={stackProps} />

        <Grid columns={{ base: 1, md: 2 }} gap={14}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, opacity: 0.8 }}>Dikey Stack</div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 12 }}>
              <Stack gap={8}>
                <DemoBox height={40} label="Item 1" />
                <DemoBox height={40} label="Item 2" />
                <DemoBox height={40} label="Item 3" />
              </Stack>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, opacity: 0.8 }}>Yatay Stack</div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 12 }}>
              <Stack direction="row" gap={8}>
                <DemoBox height={60} label="1" color="rgba(100,140,255,0.2)" />
                <DemoBox height={60} label="2" color="rgba(80,200,120,0.2)" />
                <DemoBox height={60} label="3" color="rgba(255,180,70,0.2)" />
              </Stack>
            </div>
          </div>
        </Grid>

        <CodeBlock
          title="Örnekler"
          language="tsx"
          code={`// Dikey stack (varsayılan)
<Stack gap={16}>
  <Header />
  <Content />
  <Footer />
</Stack>

// Yatay stack
<Stack direction="row" gap={12} align="center">
  <Avatar />
  <UserName />
  <Badge />
</Stack>

// Responsive yön
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
    { name: "gap", type: "Responsive<number>", defaultValue: "12", description: "Elemanlar arası boşluk" },
    { name: "rowGap", type: "Responsive<number>", description: "Satırlar arası boşluk (wrap durumunda)" },
    { name: "colGap", type: "Responsive<number>", description: "Sütunlar arası boşluk" },
    { name: "wrap", type: "boolean", defaultValue: "false", description: "Taşan elemanlar alta geçsin mi?" },
    { name: "align", type: "CSSProperties['alignItems']", description: "Dikey hizalama" },
    { name: "justify", type: "CSSProperties['justifyContent']", description: "Yatay hizalama" }
  ];

  return (
    <DocSection
      title="Inline"
      description="Elemanları yatay olarak sıralar. Wrap desteği ile taşan elemanlar otomatik alta geçer."
    >
      <Stack gap={14}>
        <PropsTable rows={inlineProps} />

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, opacity: 0.8 }}>Wrap Demo</div>
          <Inline gap={8} wrap>
            {["React", "TypeScript", "Vite", "ESLint", "Prettier", "Tailwind", "Node.js", "pnpm"].map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </Inline>
        </div>

        <CodeBlock
          title="Kullanım"
          language="tsx"
          code={`// Basit inline
<Inline gap={10}>
  <Icon />
  <Text>Label</Text>
</Inline>

// Wrap ile tag listesi
<Inline gap={8} wrap>
  {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
</Inline>

// Hizalama ile
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
      description: "true ise inline-flex, false ise flex kullanır"
    }
  ];

  return (
    <DocSection
      title="Center"
      description="İçeriği hem yatay hem dikey olarak ortalar. Loading spinner, boş state gibi durumlar için ideal."
    >
      <Stack gap={14}>
        <PropsTable rows={centerProps} />

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16 }}>
          <Center style={{ height: 120, border: "1px dashed rgba(255,255,255,0.2)", borderRadius: 8 }}>
            <Stack gap={8} align="center">
              <div style={{ fontSize: 32 }}>🎯</div>
              <div style={{ fontWeight: 700 }}>Centered Content</div>
            </Stack>
          </Center>
        </div>

        <CodeBlock
          title="Kullanım"
          language="tsx"
          code={`// Tam sayfa loading
<Center style={{ height: "100vh" }}>
  <Spinner />
</Center>

// Kart içi ortalama
<Center style={{ height: 200 }}>
  <EmptyState
    icon="📭"
    message="Henüz veri yok"
  />
</Center>

// Inline ortalama
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
      description: "flex-grow değeri. Alanı ne kadar dolduracağını belirler."
    }
  ];

  return (
    <DocSection
      title="Spacer"
      description="Flex container içinde boşluk oluşturur. Elemanları uzaklaştırmak için kullanılır."
    >
      <Stack gap={14}>
        <PropsTable rows={spacerProps} />

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16 }}>
          <Inline align="center" gap={10}>
            <DemoBox height={40} label="Logo" color="rgba(100,140,255,0.2)" />
            <Spacer />
            <DemoBox height={40} label="Nav" color="rgba(80,200,120,0.2)" />
            <DemoBox height={40} label="User" color="rgba(255,180,70,0.2)" />
          </Inline>
        </div>

        <CodeBlock
          title="Header Örneği"
          language="tsx"
          code={`<Inline align="center" gap={12}>
  <Logo />
  <Spacer />  {/* Logo ile nav arasını doldurur */}
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
    { name: "columns", type: "Responsive<number>", defaultValue: "12", description: "Sütun sayısı" },
    { name: "gap", type: "Responsive<number>", defaultValue: "12", description: "Tüm boşluklar" },
    { name: "rowGap", type: "Responsive<number>", description: "Satır boşluğu (gap'i override eder)" },
    { name: "colGap", type: "Responsive<number>", description: "Sütun boşluğu (gap'i override eder)" },
    { name: "flow", type: '"row" | "column" | "row dense" | "column dense"', defaultValue: '"row"', description: "Grid akış yönü" }
  ];

  const gridItemProps: PropRow[] = [
    { name: "span", type: 'Responsive<number | "auto" | "full">', defaultValue: '"auto"', description: "Kaç sütun kaplayacak" },
    { name: "start", type: 'Responsive<number | "auto">', defaultValue: '"auto"', description: "Başlangıç sütunu" },
    { name: "order", type: "Responsive<number>", description: "Sıralama önceliği" },
    { name: "alignSelf", type: "CSSProperties['alignSelf']", description: "Dikey hizalama" },
    { name: "justifySelf", type: "CSSProperties['justifySelf']", description: "Yatay hizalama" }
  ];

  return (
    <DocSection
      title="Grid & GridItem"
      description="CSS Grid tabanlı 12 sütunlu layout sistemi. Karmaşık dashboard ve sayfa düzenleri için."
    >
      <Stack gap={14}>
        <PropsTable title="Grid Props" rows={gridProps} />
        <PropsTable title="GridItem Props" rows={gridItemProps} />

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, opacity: 0.8 }}>12 Sütun Demo</div>
          <Grid columns={12} gap={6}>
            <GridItem span={12}><DemoBox height={40} label="span=12 (full)" color="rgba(100,140,255,0.2)" /></GridItem>
            <GridItem span={6}><DemoBox height={40} label="span=6" color="rgba(80,200,120,0.2)" /></GridItem>
            <GridItem span={6}><DemoBox height={40} label="span=6" color="rgba(80,200,120,0.2)" /></GridItem>
            <GridItem span={4}><DemoBox height={40} label="span=4" color="rgba(255,180,70,0.2)" /></GridItem>
            <GridItem span={4}><DemoBox height={40} label="span=4" color="rgba(255,180,70,0.2)" /></GridItem>
            <GridItem span={4}><DemoBox height={40} label="span=4" color="rgba(255,180,70,0.2)" /></GridItem>
            <GridItem span={3}><DemoBox height={40} label="3" color="rgba(200,100,255,0.2)" /></GridItem>
            <GridItem span={3}><DemoBox height={40} label="3" color="rgba(200,100,255,0.2)" /></GridItem>
            <GridItem span={3}><DemoBox height={40} label="3" color="rgba(200,100,255,0.2)" /></GridItem>
            <GridItem span={3}><DemoBox height={40} label="3" color="rgba(200,100,255,0.2)" /></GridItem>
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
    { name: "minItemWidth", type: "Responsive<number>", defaultValue: "240", description: "Minimum eleman genişliği (px). Grid otomatik sütun sayısı hesaplar." },
    { name: "gap", type: "Responsive<number>", defaultValue: "12", description: "Elemanlar arası boşluk" },
    { name: "minRowHeight", type: "Responsive<number>", description: "Minimum satır yüksekliği" },
    { name: "align", type: "CSSProperties['alignItems']", description: "Dikey hizalama" },
    { name: "justify", type: "CSSProperties['justifyItems']", description: "Yatay hizalama" }
  ];

  return (
    <DocSection
      title="AutoGrid"
      description="Otomatik sütun sayısı hesaplayan grid. Kart listeleri, galeri ve ürün gridleri için ideal."
    >
      <Stack gap={14}>
        <PropsTable rows={autoGridProps} />

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, opacity: 0.8 }}>Auto-fit Demo (minItemWidth: 150px)</div>
          <AutoGrid minItemWidth={150} gap={10}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <DemoBox key={i} height={80} label={`Card ${i}`} color={`rgba(${100 + i * 20},${140 - i * 10},255,0.15)`} />
            ))}
          </AutoGrid>
        </div>

        <CodeBlock
          title="Ürün Listesi"
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
    { name: "above", type: "BreakpointKey", description: "Belirtilen breakpoint ve üstünde gösterir" },
    { name: "below", type: "BreakpointKey", description: "Belirtilen breakpoint'in altında gösterir" },
    { name: "between", type: "[BreakpointKey, BreakpointKey]", description: "İki breakpoint arasında gösterir" },
    { name: "when", type: "Responsive<boolean>", description: "Responsive boolean koşulu" },
    { name: "fallback", type: "ReactNode", defaultValue: "null", description: "Gizliyken gösterilecek içerik" },
    { name: "invert", type: "boolean", defaultValue: "false", description: "Koşulu tersine çevirir" }
  ];

  const onlyProps: PropRow[] = [
    { name: "on", type: "BreakpointKey | BreakpointKey[]", required: true, description: "Sadece bu breakpoint(lar)da göster" }
  ];

  const bp = useBreakpoint();

  return (
    <DocSection
      title="Show / Hide / Only"
      description={
        <Stack gap={10}>
          <div>
            Breakpoint bazlı conditional rendering. CSS display:none yerine React'te render kontrolü sağlar.
          </div>
          <LiveBreakpointIndicator />
        </Stack>
      }
    >
      <Stack gap={14}>
        <PropsTable title="Show Props" rows={showProps} />
        <PropsTable title="Only Props" rows={onlyProps} />

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16 }}>
          <Stack gap={10}>
            <div style={{ fontWeight: 700, fontSize: 13, opacity: 0.8 }}>Live Demo (resize to test)</div>

            <Show below="md">
              <DemoBox height={50} label="Show below='md' - Mobile Only" color="rgba(255,100,100,0.2)" />
            </Show>

            <Show above="md">
              <DemoBox height={50} label="Show above='md' - Tablet & Desktop" color="rgba(100,255,100,0.2)" />
            </Show>

            <Show between={["sm", "lg"]}>
              <DemoBox height={50} label="Show between={['sm', 'lg']} - sm to lg" color="rgba(100,100,255,0.2)" />
            </Show>

            <Only on="md">
              <DemoBox height={50} label="Only on='md' - Exactly md" color="rgba(255,200,100,0.2)" />
            </Only>
          </Stack>
        </div>

        <CodeBlock
          title="Responsive Navigation"
          language="tsx"
          code={`function Navigation() {
  return (
    <>
      {/* Mobilde hamburger menü */}
      <Show below="lg">
        <MobileMenu />
      </Show>

      {/* Desktop'ta horizontal nav */}
      <Hide below="lg">
        <DesktopNav />
      </Hide>
    </>
  );
}`}
        />

        <CodeBlock
          title="Fallback Kullanımı"
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
    { name: "sidebar", type: "ReactNode", required: true, description: "Sidebar içeriği (menü, navigasyon)" },
    { name: "children", type: "ReactNode", required: true, description: "Ana sayfa içeriği" },
    { name: "collapseBelow", type: "BreakpointKey", defaultValue: '"lg"', description: "Bu breakpoint altında drawer'a dönüşür" },
    { name: "sidebarWidth", type: "number", defaultValue: "280", description: "Sidebar genişliği (px)" },
    { name: "overlayColor", type: "string", defaultValue: '"rgba(0,0,0,0.55)"', description: "Mobil drawer overlay rengi" },
    { name: "open", type: "boolean", description: "Controlled mod: drawer açık mı?" },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Controlled mod: state değişimi callback" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Uncontrolled mod: başlangıç durumu" },
    { name: "showToggle", type: "boolean", defaultValue: "true", description: "Mobilde toggle butonu göster" },
    { name: "toggleLabel", type: "string", defaultValue: '"Menu"', description: "Toggle butonu etiketi" },
    { name: "topbarRight", type: "ReactNode", description: "Mobil topbar sağ slot'u" }
  ];

  return (
    <DocSection
      title="SidebarLayout"
      description={
        <Stack gap={10}>
          <div>
            Responsive sidebar/drawer layout. Desktop'ta sabit sidebar, mobilde slide-in drawer olarak çalışır.
          </div>
          <Inline gap={8}>
            <Chip variant="success">ESC ile kapanır</Chip>
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
    { name: "title", type: "ReactNode", required: true, description: "Sayfa başlığı" },
    { name: "subtitle", type: "ReactNode", description: "Başlık altı açıklama" },
    { name: "actions", type: "ReactNode", description: "Header sağ tarafı (butonlar, aksiyonlar)" },
    { name: "sidebar", type: "ReactNode", description: "Verilirse SidebarLayout ile sarılır" },
    { name: "footer", type: "ReactNode", description: "Sayfa altı içeriği" },
    { name: "children", type: "ReactNode", required: true, description: "Ana içerik" },
    { name: "containerSize", type: 'Responsive<"sm" | "md" | "lg" | "xl">', defaultValue: '{ base: "sm", md: "xl" }', description: "İçerik container boyutu" },
    { name: "gutter", type: "Responsive<number>", defaultValue: "{ base: 12, md: 24 }", description: "Container padding" },
    { name: "collapseBelow", type: "BreakpointKey", defaultValue: '"lg"', description: "Sidebar collapse breakpoint" },
    { name: "sidebarWidth", type: "number", defaultValue: "300", description: "Sidebar genişliği" }
  ];

  return (
    <DocSection
      title="PageShell (Preset)"
      description={
        <Stack gap={10}>
          <div>
            Hazır sayfa şablonu. Header (title, subtitle, actions), footer ve opsiyonel sidebar ile komple sayfa yapısı sunar.
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
          title="Basit Sayfa"
          language="tsx"
          code={`<PageShell
  title="Kullanıcı Profili"
  subtitle="Hesap ayarlarınızı ve tercihlerinizi yönetin"
  actions={
    <>
      <Button variant="secondary">İptal</Button>
      <Button variant="primary">Kaydet</Button>
    </>
  }
  footer="Son güncelleme: 2 saat önce"
>
  <ProfileForm />
</PageShell>`}
        />

        <CodeBlock
          title="Dashboard ile"
          language="tsx"
          code={`<PageShell
  title="Dashboard"
  subtitle="Günlük özet ve istatistikler"
  sidebar={
    <Stack gap={4}>
      <NavItem active>Genel Bakış</NavItem>
      <NavItem>Analitik</NavItem>
      <NavItem>Raporlar</NavItem>
      <NavItem>Ayarlar</NavItem>
    </Stack>
  }
  actions={<Button>Yeni Rapor</Button>}
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
    { name: "code", type: "string", required: true, description: "Gösterilecek kod" },
    { name: "language", type: "string", defaultValue: '"tsx"', description: "Syntax highlighting için dil" },
    { name: "title", type: "string", description: "Kod bloğu başlığı" },
    { name: "maxHeight", type: "number", defaultValue: "360", description: "Maksimum yükseklik (scroll için)" }
  ];

  const propsTableProps: PropRow[] = [
    { name: "title", type: "string", defaultValue: '"Props"', description: "Tablo başlığı" },
    { name: "rows", type: "PropRow[]", required: true, description: "Prop satırları dizisi" }
  ];

  const docSectionProps: PropRow[] = [
    { name: "title", type: "string", required: true, description: "Bölüm başlığı" },
    { name: "description", type: "ReactNode", description: "Bölüm açıklaması" },
    { name: "children", type: "ReactNode", required: true, description: "Bölüm içeriği" }
  ];

  return (
    <DocSection
      title="Docs Components"
      description="Dokümantasyon sayfaları oluşturmak için yardımcı bileşenler."
    >
      <Stack gap={14}>
        <PropsTable title="CodeBlock Props" rows={codeBlockProps} />
        <PropsTable title="PropsTable Props" rows={propsTableProps} />
        <PropsTable title="DocSection Props" rows={docSectionProps} />

        <CodeBlock
          title="PropRow Tipi"
          language="tsx"
          code={`type PropRow = {
  name: string;        // Prop adı
  type: string;        // TypeScript tipi
  required?: boolean;  // Zorunlu mu?
  defaultValue?: string; // Varsayılan değer
  description: string; // Açıklama
};`}
        />

        <CodeBlock
          title="Kullanım Örneği"
          language="tsx"
          code={`<DocSection
  title="Button API"
  description="Tıklanabilir aksiyon bileşeni."
>
  <PropsTable
    rows={[
      {
        name: "variant",
        type: '"primary" | "secondary"',
        defaultValue: '"primary"',
        description: "Görsel varyant"
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
      description="Sık kullanılan pattern'ler ve hızlı başvuru."
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
    <Input label="Ad" />
    <Input label="Soyad" />
  </Grid>
  <Input label="Email" />
  <Inline gap={10} justify="flex-end">
    <Button variant="secondary">İptal</Button>
    <Button variant="primary">Kaydet</Button>
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

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN DOCS PAGE
   ───────────────────────────────────────────────────────────────────────────── */

export function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", label: "Giriş", component: IntroSection },
    { id: "install", label: "Kurulum", component: InstallationSection },
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
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.8)",
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
              borderRadius: 10,
              border: "1px solid rgba(100,140,255,0.35)",
              background: "rgba(100,140,255,0.10)",
              color: "rgba(255,255,255,0.9)",
              cursor: "pointer",
              fontWeight: 600,
              opacity: sections.findIndex((s) => s.id === activeSection) === sections.length - 1 ? 0.4 : 1
            }}
          >
            Next
          </button>
        </Inline>
      </Stack>

      {/* Global animation styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </PageShell>
  );
}
