# PopX App — React JS Qualifier Task

A pixel-perfect React JS implementation of the **PopX** mobile app interface, centered on the webpage with seamless page navigation.

##  Live Demo

https://popx-app-ebon-ten.vercel.app/

##  Repository

https://github.com/piyushFunde/popx-app/

## Pages

| Page | Route | Description |
|---|---|---|
| Welcome | `/` | Landing page with Create Account & Login CTAs |
| Login | `/login` | Sign in with email & password |
| Create Account | `/create-account` | Registration form with all required fields |
| Account Settings | `/account-settings` | Profile view with avatar & user info |

## Tech Stack

- **React 19** (with Hooks)
- **React Router v7** — client-side routing
- **Vite** — blazing fast build tool
- **Vanilla CSS** — no frameworks, clean custom styles

##  Design Highlights

- **Mobile-first** — 390px phone wrapper centered on desktop
- **Purple primary** (`#6c3ce1`) matching the design exactly
- **Outlined inputs** with floating labels (purple label text)
- **Conditional button states** — Login button disabled until fields are filled
- **Smooth page transitions** — fade + slide animation
- **Responsive** — full-screen on mobile viewports
- **Pixel-perfect** spacing, typography (Inter font), colors

## 🔧 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

##  Project Structure

```
src/
├── pages/
│   ├── Welcome.jsx         # Landing page
│   ├── Welcome.css
│   ├── Login.jsx           # Sign in page
│   ├── Login.css
│   ├── CreateAccount.jsx   # Registration form
│   ├── CreateAccount.css
│   ├── AccountSettings.jsx # Profile settings
│   └── AccountSettings.css
├── App.jsx                 # Router setup
├── index.css               # Global design tokens & shared styles
└── main.jsx                # Entry point
public/
└── avatar.png              # Default profile photo
```

##  Deployment

Deploy to Vercel in one click:

```bash
npm install -g vercel
vercel --prod
```

Or connect your GitHub repo to [Vercel](https://vercel.com) / [Netlify](https://netlify.com) for automatic deployments.

---

Built for **PopX Intern/Fresher Qualifier Task** — React JS
