# NOORONX - Modern Next.js Application

A production-ready Next.js application built with TypeScript, Tailwind CSS, and modern development practices. This project provides a solid foundation for building scalable web applications with beautiful UI components and best practices.

## 🚀 Features

- **Next.js 15** - Latest version with App Router and Turbopack
- **TypeScript** - Full type safety and excellent IDE integration
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, customizable icons
- **ESLint** - Code linting and formatting
- **Responsive Design** - Mobile-first approach with dark mode support
- **Component Library** - Reusable UI components (Button, Card, etc.)
- **Modern UI** - Beautiful gradients, animations, and modern design patterns

## 📦 Tech Stack

- **Framework**: Next.js 15.4.7
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge
- **Linting**: ESLint with Next.js config

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd NOORONX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
NOORONX/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # Reusable components
│   │   └── ui/                 # UI components
│   │       ├── Button.tsx      # Button component
│   │       └── Card.tsx        # Card component
│   └── lib/                    # Utility functions
│       └── utils.ts            # Common utilities
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## 🎨 Components

### Button Component

A flexible button component with multiple variants and sizes:

```tsx
import Button from '@/components/ui/Button';

// Primary button
<Button variant="primary" size="lg">
  Click me
</Button>

// Secondary button
<Button variant="secondary" size="md">
  Secondary Action
</Button>

// Outline button
<Button variant="outline" size="sm">
  Outline Button
</Button>
```

### Card Component

A versatile card component for displaying content:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
</Card>
```

## 🎯 Pages

### Homepage (`/`)
- Modern landing page with hero section
- Feature showcase
- Quick start guide
- Responsive design with dark mode support

### Dashboard (`/dashboard`)
- Sample dashboard interface
- Statistics cards
- Recent activity feed
- Quick actions
- Data tables

## 🌙 Dark Mode

The application supports dark mode out of the box. The theme automatically adapts based on the user's system preferences.

## �� Responsive Design

Built with a mobile-first approach using Tailwind CSS responsive utilities:

- **Mobile**: Optimized for phones and small tablets
- **Tablet**: Enhanced layout for medium screens
- **Desktop**: Full-featured experience for large screens

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Node.js:

```bash
npm run build
npm run start
```

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS 4 with a custom configuration. You can modify `tailwind.config.js` to customize:

- Colors and theme
- Typography
- Spacing and layout
- Custom components

### TypeScript

TypeScript is configured with strict mode enabled. Configuration can be found in `tsconfig.json`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](https://nextjs.org/docs)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
