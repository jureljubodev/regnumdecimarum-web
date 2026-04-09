# Regnum Decimarum - Premium Service Portfolio

A modern, bilingual (English/Croatian) React application built with TypeScript and Vite, featuring a premium service portfolio for Regnum Decimarum.

## Features

- **Bilingual Support**: Full English and Croatian language switching
- **Responsive Design**: Mobile-first approach with modern CSS
- **Contact Form**: Netlify-powered form handling
- **Smooth Animations**: Framer Motion integration
- **SEO Optimized**: Proper meta tags and structured content

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: CSS Modules, Custom Properties
- **Forms**: Netlify Form Handling
- **Deployment**: Netlify

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Netlify Deployment

### Automatic Deployment (Recommended)

1. **Connect to Netlify**:
   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify
   - Netlify will automatically detect the build settings from `netlify.toml`

2. **Manual Deployment**:
   ```bash
   # Build the project
   npm run build

   # Deploy the dist folder to Netlify
   npx netlify-cli deploy --prod --dir=dist
   ```

### Form Configuration

The contact form is configured to work with Netlify's built-in form handling:

- Form name: `contact`
- Fields: `name`, `email`, `message`
- Spam protection: Honeypot field included
- Submissions will be available in your Netlify dashboard

### Environment Variables

No environment variables are required for basic functionality. For production:

- Set `NODE_VERSION = "18"` in Netlify build settings
- Enable form notifications in Netlify dashboard if desired

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Landing section
│   ├── Services.tsx      # Service offerings
│   ├── Contact.tsx       # Contact form
│   ├── Footer.tsx        # Footer with policies
│   ├── Topbar.tsx        # Navigation with language switcher
│   └── CookieBanner.tsx  # Cookie consent
├── App.tsx               # Main app component
└── App.css               # Global styles

public/
├── _headers              # Security headers
└── robots.txt            # SEO configuration

netlify.toml              # Netlify configuration
```

## Language Support

The application supports English (`en`) and Croatian (`hr`) languages:

- Language preference is saved in localStorage
- All user-facing content is translated
- Seamless switching without page reload

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

Built with ❤️ for Regnum Decimarum
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
