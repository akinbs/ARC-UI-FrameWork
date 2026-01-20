# DARC UI – Responsive Layout Framework for React

DARC UI is a primitive-first, responsive layout framework designed for building
consistent, scalable, and maintainable page architectures in React applications.

Unlike traditional UI libraries that focus on visual components such as buttons,
cards, and modals, DARC UI focuses on page structure, layout composition,
and responsive behavior.

---

## Motivation

In most React projects, developers repeatedly implement:

- Page containers with fixed max-widths
- Responsive padding and spacing
- Vertical and horizontal layout patterns
- Conditional rendering by breakpoint
- Dashboard layouts with sidebars
- Page headers with actions and footers

These patterns are rewritten in every project and often implemented inconsistently.

DARC UI aims to standardize layout architecture so that:

- Layout decisions are centralized
- Responsive behavior is predictable
- Pages are composed, not rebuilt

---

## Design Principles

### Primitive-First Architecture

DARC UI provides small, composable layout primitives instead of large,
highly opinionated components.

Complex layouts are built by composing primitives rather than configuring
monolithic components.

### Responsive by Default

All layout primitives accept responsive values.
Breakpoint logic is part of the core system and shared across all components.

### Composition over Configuration

Layouts are created by combining components instead of passing
large configuration objects.

### Separation of Concerns

Visual styling is intentionally minimal.
DARC UI defines structural layout concerns, not design language.

---

## Core Concepts

### Breakpoint System

DARC UI uses a centralized breakpoint engine.

- Breakpoints are named: base, sm, md, lg, xl
- Responsive values are resolved at runtime
- All layout primitives rely on the same breakpoint logic

---

## Core Layout Primitives

### Container

Container defines horizontal constraints and page padding.

Responsibilities:
- Set max-width based on breakpoint
- Apply consistent horizontal padding
- Center content when required
- Prevent horizontal overflow

```tsx
<Container size={{ base: "sm", md: "xl" }} gutter={{ base: 12, md: 24 }}>
  {children}
</Container>
```
---

### Stack

Stack is a vertical layout primitive.

Responsibilities:

- Vertical spacing between children
- Consistent vertical rhythm
- No margin-based spacing leaks
  
---

```tsx
<Stack gap={16}>
  <Header />
  <Content />
  <Footer />
</Stack>
```
---
    
### Inline
    
Inline is a horizontal layout primitive.

Responsibilities:

- Horizontal alignment
- Wrapping behavior
- Responsive gaps
- Alignment control

```tsx
<Inline gap={12} wrap align="center">
  <Item />
  <Spacer />
  <Action />
</Inline>
```

---

### Spacer

Spacer is a flexible space element.

Responsibilities:

- Consume remaining space in flex layouts
- Enable alignment without manual CSS

Constraints:
- Only effective inside flex containers such as Inline

```tsx
  <Inline>
    <Left />
    <Spacer />
    <Right />
  </Inline>
```

---

### Center

Center aligns its children both horizontally and vertically.

Responsibilities:
- Abstract common centering patterns
- Remove repetitive flexbox code

```tsx
<Center>
  <Content />
</Center>
```

---

### Responsive Visibility Components

### Show

Conditionally renders content based on breakpoints.

```tsx
<Show below="md">Mobile content</Show>
<Show above="lg">Desktop content</Show>
<Show between={["sm", "lg"]}>Tablet content</Show>
```
---

### Only

Renders content only on a specific breakpoint.

```tsx
<Only on="md">Rendered only at md</Only>
```
---

### Hide

Hides content at specific breakpoints.

```tsx
<Hide below="lg">Hidden on mobile and tablet</Hide>
```

---

### Grid Systems

### AutoGrid

AutoGrid is designed for card-based layouts.
Characteristics:
- Uses CSS Grid with auto-fit
- Column count is derived from available width
- Responsive minimum item width

```tsx
<AutoGrid minItemWidth={{ base: 160, md: 240 }} gap={16}>
  {items.map(...)}
</AutoGrid>
```
Use cases:
- Card lists
- Galleries
- Search results
- Product grids

---

### 12 Column Grid
A traditional 12-column grid system for structured layouts.

Characteristics:
- Explicit column control
- Responsive column spans
- Dense and predictable layout behavior

```tsx
<Grid columns={12}>
  <GridItem span={{ base: "full", md: 8 }} />
  <GridItem span={{ base: "full", md: 4 }} />
</Grid>
```
Use cases:
- Dashboards
- Admin panels
- Data-dense pages

---

### SidebarLayout

SidebarLayout provides a responsive sidebar system.

Behavior:
- Desktop: fixed sidebar
- Mobile: collapsible drawer

```tsx
<SidebarLayout collapseBelow="lg" sidebar={<Sidebar />}>
  <Content />
</SidebarLayout>
```

Responsibilities:

- Sidebar width control
- Responsive collapse logic
- Content isolation

---

### PageShell
PageShell is a page preset that composes multiple layout primitives.

It abstracts the most common page patterns into a single component.

Responsibilities
- Page header (title and subtitle)
- Action area
- Content container
- Optional sidebar
- Optional footer
- Responsive layout switching

Usage
```tsx
<PageShell
  title="Dashboard"
  subtitle="Overview"
  actions={<Actions />}
  sidebar={<Sidebar />}
  footer="Footer content"
>
  <PageContent />
</PageShell>
```

Behavior
- Without sidebar, PageShell renders a standard page layout
- With sidebar, it automatically switches to a dashboard layout
- Container, Stack, and spacing are managed internally

---

### Project Structure

```text
darc-ui-framework/
├─ packages/
│  └─ darc-layout/
│     ├─ src/
│     │  ├─ components/
│     │  ├─ core/
│     │  ├─ hooks/
│     │  └─ index.ts
│     └─ package.json
│
├─ apps/
│  └─ darc-playground/
│     └─ src/App.tsx
│
├─ pnpm-workspace.yaml
└─ README.md
```

---

### Playground
The playground application demonstrates:

- All layout primitives
- Responsive visibility behavior
- Grid systems
- Sidebar layouts
- PageShell presets

```bash
pnpm install
pnpm --filter darc-playground dev
```

### Intended Audience

- React and TypeScript developers
- Dashboard and admin panel builders
- Design system engineers
- Teams seeking consistent layout architecture

### Roadmap
- Motion-aware layout transitions
- CSS variable token system
- Theming and design tokens

### Dedicated documentation site

```yaml
Author
Akın Baş
Computer Engineering
React, TypeScript, System Design
```
