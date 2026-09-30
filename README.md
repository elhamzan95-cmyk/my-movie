# 🎬 CineHub — A Frontend Case Study in User Experience Design

A React single-page application designed and built from the ground up to explore
how people share personal stories around the films they love. This repository is
not just a codebase — it is a **user experience case study** that documents how a
product moves from a raw idea to a tested, accessible, and emotionally engaging
interface.

---

## 🎯 The Problem

Most movie platforms focus on ratings, trailers, and metadata. They treat films
as objects to be rated, not as experiences to be remembered. What is missing is
a space where users can attach **personal meaning** to a film — a memory, a
feeling, a moment in their life — and share that story with a community.

CineHub was built to fill that gap.

---

## 🧠 Design Approach

Every screen was designed around three core UX principles:

### 1. Emotion Before Information
The interface prioritizes user-generated memories over technical details.
Movie pages lead with personal stories and community reactions, not with
runtime or budget. The tone of the copy, the color palette, and the
micro-interactions were chosen to feel warm and human rather than cold
and transactional.

### 2. Progressive Disclosure
Authentication, admin tools, and advanced filters are hidden until they are
relevant. Guests can browse the full public experience without friction;
signed-in users unlock personal dashboards, profile customization, and
social features gradually as they engage.

### 3. Accessibility by Default
- Semantic HTML structure with proper landmark regions
- Focus-visible states on all interactive elements
- ARIA labels on icon-only buttons
- Keyboard navigable menus and modal dialogs
- Consistent contrast ratios across the dark theme
- Responsive layout from 320px to 4K

---

## 🗺️ User Flows Documented

The project includes complete, end-to-end user flows that were prototyped,
tested, and iterated upon:

| Flow | Description |
|------|-------------|
| **Onboarding** | Guest → browse → sign up → personalized dashboard |
| **Content Creation** | Add movie → upload image → tag genre → publish memory |
| **Social Interaction** | Like → comment → reply → follow → share |
| **Discovery** | Search → filter → sort → paginate → open detail view |
| **Profile Management** | View own profile → edit avatar → manage followers |
| **Moderation** | Admin login → review pending comments → approve/reject |

Each flow was validated through rapid prototyping and heuristic evaluation.

---

## 🎨 Interface Highlights

- **Dual Layout Strategy** — dedicated desktop and mobile experiences instead
  of a single responsive compromise, giving each breakpoint a purpose-built
  information hierarchy.
- **Dark Theme System** — a color palette tuned for long viewing sessions with
  orange as the primary accent to evoke warmth and nostalgia.
- **Micro-interactions** — hover states, animated nav links, smooth tab
  transitions, and loading skeletons that reduce perceived wait time.
- **Empty States with Intent** — every empty state gives the user a clear next
  action ("Add the first movie", "Be the first to like this") instead of a
  dead end.
- **Error & Feedback Design** — inline alerts, contextual validation messages,
  and loading indicators that guide rather than punish.

---

## 🧩 Design System

A small internal design system was defined and reused across the app:

- **Typography scale** — modular sizes for headings, body, and captions
- **Spacing scale** — consistent 4px-based spacing tokens
- **Color tokens** — primary, surface, border, muted, accent
- **Component library** — buttons, inputs, selects, textareas, avatars,
  cards, badges, modals, tabs, and pagination built as reusable React
  components with predictable APIs
- **State conventions** — hover, focus, disabled, loading, empty, error

This ensures visual and behavioral consistency across 40+ components.

---

## 🛠️ Technical Stack

| Layer | Technologies |
|-------|--------------|
| Framework | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| State | Context API + custom hooks |
| Icons | React Icons |
| Tooling | ESLint, npm, Git |

---

## 📁 Project Structure
src/
├── assets/ # Design assets and static media
├── components/ # Reusable UI components
│ ├── admin/ # Admin-specific views
│ ├── comments/ # Comment and reply system
│ ├── common/ # Design system primitives
│ ├── dashboard/ # User dashboard widgets
│ ├── layouts/ # Header, footer, navigation
│ └── profile/ # Profile-related components
├── context/ # Global state providers
├── hooks/ # Custom React hooks
├── pages/ # Route-level page components
├── services/ # API communication layer
└── utils/ # Constants, formatters, helpers

text

---

## 🔍 What This Project Demonstrates

This project was an opportunity to apply user experience design end-to-end:

- Translating a vague product idea into concrete user flows
- Making trade-offs between feature richness and interface simplicity
- Designing for two very different contexts (desktop and mobile)
- Building a consistent visual language across dozens of components
- Considering accessibility, feedback, and error states from day one
- Iterating on layouts based on real rendering, not just static mockups

---

## 📸 Screenshots

Visual documentation of the interface is available in the [`screenshots`](./screenshots) folder.
It covers the desktop and mobile views of the main user flows — from the home
page and movie discovery, through to the personalized dashboard and admin panel.

---

## 🚀 Getting Started

Clone the repository and install the dependencies:

```bash
npm install
Once the packages are installed, start the development server:

bash
npm run dev
The application will be running locally. Open the URL shown in your terminal
in a browser to view it.

To create a production build:

bash
npm run build
