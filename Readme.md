# 🧱 DARC UI — Responsive Layout Framework

> **DARC UI** is a  
> **primitive-first**, **responsive-aware**, **framework-agnostic**  
> layout framework designed for modern React applications.

The goal is simple:  
**solve page architecture before UI components.**

---

## ✨ Why DARC UI?

Most UI libraries:
- Provide buttons, cards, modals
- But leave **page layout architecture** to you

**DARC UI** focuses on this instead:

> “Let the framework build the page skeleton,  
> you focus only on the content.”

---

## 🧠 Design Philosophy

- 🧱 **Primitive-first**  
  Small, composable layout building blocks

- 📐 **Responsive by design**  
  Every prop can be breakpoint-aware

- 🔁 **Reduce repetition**  
  Abstract common page patterns with presets like `PageShell`

- 🧩 **Composition over configuration**  
  Powerful layouts emerge from combining small primitives

---

## 📦 Included Modules

### 1️⃣ Core Layout Primitives

| Component | Purpose |
|---|---|
| `Container` | Max-width, padding, centering |
| `Stack` | Vertical rhythm (column layout) |
| `Inline` | Horizontal layout (row) |
| `Spacer` | Flexible space (`flex-grow`) |
| `Center` | Perfect centering (x + y axis) |

---

### 2️⃣ Responsive Visibility

| Component | Description |
|---|---|
| `Show` | Show content at specific breakpoints |
| `Only` | Render only on a single breakpoint |
| `Hide` | Hide content at certain breakpoints |

```tsx
<Show below="md">Visible on mobile</Show>
<Only on="md">Only on md</Only>
<Hide below="lg">Desktop only</Hide>
