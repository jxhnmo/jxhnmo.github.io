# John Mo - Personal Portfolio Website

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://jxhnmo.github.io)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)]()

A modern, responsive personal portfolio website showcasing my professional experience, projects, and contact information. Built with React and deployed on GitHub Pages.

**Feel free to use this as inspiration or a baseline for your own portfolio!** If you do, I'd appreciate a mention or link back, but it's not required.

## 🌐 Live Demo

Visit the live site: [https://jxhnmo.github.io](https://jxhnmo.github.io)

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Multiple Pages**:
  - 🏠 Home - Landing page with introduction
  - 👤 About - Personal background and skills
  - 💼 Experience - Professional work history with accordion components
  - 🚀 Projects - Portfolio of projects with descriptions and images
  - 🔗 Links - Social media and professional links
  - 📄 Resume - Password-protected resume access
- **Dark/Light Mode**: Theme toggle for user preference
- **Google Analytics**: Integrated analytics for traffic tracking
- **Smooth Navigation**: Client-side routing with automatic scroll-to-top
- **SEO Optimized**: Includes sitemap and robots.txt
- **Social Integration**: Social media icons with react-social-icons

## 🛠️ Tech Stack

### Core

- **React** (v18.2.0) - UI library
- **React Router DOM** (v6.0.2) - Client-side routing
- **React Scripts** (v5.0.1) - Build tooling

### UI Components

- **Radix UI** - Accessible component primitives
  - Accordion
  - Navigation Menu
  - Switch (theme toggle)
  - Form components
  - Icons
- **React Social Icons** (v6.4.0) - Social media icons
- **TypeIt React** (v2.6.4) - Typing animation effects
- **classnames** (v2.3.2) - Conditional CSS classes

### Analytics & SEO

- **React GA4** (v2.1.0) - Google Analytics 4 integration

### Development & Deployment

- **gh-pages** (v6.0.0) - GitHub Pages deployment
- **Create React App** - Project scaffolding

## 📁 Project Structure

```
jxhnmo.github.io/
├── public/              # Static files
│   ├── index.html
│   ├── sitemap.xml
│   ├── robots.txt
│   └── 404.html
├── src/
│   ├── assets/          # Images and media files
│   │   ├── projects/    # Project screenshots
│   │   └── work/        # Work/company logos
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AccordionComponents.jsx
│   │   └── variables.css
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Links.jsx
│   │   ├── ResumeLogin.jsx
│   │   └── Construction.jsx
│   ├── utils/           # Utility functions
│   │   └── analytics.js
│   ├── index.js         # App entry point
│   └── index.css        # Global styles
├── package.json
└── README.md
```

## 📝 TODO

### Performance

- [ ] Decrease photo file sizes for faster loading
- [ ] Optimize image formats (consider WebP)

### Security

- [ ] Encrypt resume login password

### Features

- [ ] Add redirect from experience page to resume
- [ ] Add recommendations section to experience page
- [ ] Add icon to light/dark mode switch
- [ ] Add initial website sketch next to website photo on projects page

### Bug Fixes

- [ ] Center Projects AA picture properly
- [ ] Fix mobile: white background on top/bottom when dragged
- [ ] Fix mobile: footer position, sometiems not visible at all till scroll

### Code Quality

- [ ] More refactoring and code cleanup

## 💡 Using This Project

This project is open for anyone to use as:

- 🎨 **Inspiration** for your own portfolio design
- 🏗️ **Starting point** to build your own site
- 📚 **Learning resource** for React and portfolio development

If you build something cool with it or use it as inspiration, I'd love to know! A mention or link back is appreciated but not required.

## 📄 License

MIT License - Feel free to use this project however you'd like!

## 👤 Author

**John Mo**

- Website: [https://jxhnmo.github.io](https://jxhnmo.github.io)
- GitHub: [@jxhnmo](https://github.com/jxhnmo)

---

_Built with ❤️ using React_
