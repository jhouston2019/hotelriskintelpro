# Hotel Risk Pro - Design System

## Color Palette

### Primary Colors
- **Navy Blue**: `#1e3a8a` (hrip-navy) - Primary brand color for headers, CTAs
- **Blue**: `#3b82f6` (hrip-blue) - Accent color for interactive elements
- **Light Blue**: `#eff6ff` (hrip-light) - Subtle backgrounds

### Status Colors
- **Red**: `#dc2626` - Critical risk, errors
- **Orange**: `#fb923c` (hrip-orange) - Warnings, moderate risk
- **Green**: `#16a34a` - Success, low risk

### Neutral Colors
- **White**: `#ffffff` - Main background
- **Gray 50**: `#f9fafb` - Section backgrounds
- **Gray 100**: `#f3f4f6` - Hover states
- **Gray 200**: `#e5e7eb` - Borders
- **Gray 300**: `#d1d5db` - Input borders
- **Gray 600**: `#4b5563` - Secondary text
- **Gray 900**: `#111827` - Primary text

## Typography

### Font Sizes
- **Hero**: `text-4xl` to `text-6xl` (36px-60px)
- **H1**: `text-3xl` to `text-4xl` (30px-36px)
- **H2**: `text-2xl` to `text-3xl` (24px-30px)
- **H3**: `text-lg` to `text-xl` (18px-20px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

### Font Weights
- **Regular**: `font-normal` (400)
- **Medium**: `font-medium` (500)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)

## Spacing

### Padding
- **Small**: `p-4` to `p-6` (16px-24px)
- **Medium**: `p-8` (32px)
- **Large**: `p-10` to `p-12` (40px-48px)

### Margins
- **Small**: `mt-2` to `mt-4` (8px-16px)
- **Medium**: `mt-6` to `mt-8` (24px-32px)
- **Large**: `mt-12` to `mt-20` (48px-80px)

### Gaps
- **Grid/Flex**: `gap-4` to `gap-8` (16px-32px)

## Components

### Buttons

#### Primary Button
```jsx
className="rounded-lg bg-hrip-navy px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-800 transition-all hover:shadow-xl"
```

#### Secondary Button
```jsx
className="rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
```

### Cards

#### Standard Card
```jsx
className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg"
```

#### Status Card (Critical)
```jsx
className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-lg"
```

#### Status Card (Warning)
```jsx
className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-lg"
```

### Form Inputs

#### Text Input
```jsx
className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
```

#### Select Input
```jsx
className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
```

#### Checkbox
```jsx
className="h-5 w-5 rounded border-gray-300 text-hrip-navy focus:ring-hrip-navy"
```

### Icons

#### Icon Container
```jsx
className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue"
```

### Badges

#### Status Badge (High Risk)
```jsx
className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
```

#### Status Badge (Warning)
```jsx
className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700"
```

#### Status Badge (Success)
```jsx
className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700"
```

## Layout Patterns

### Page Container
```jsx
<div className="mx-auto max-w-7xl px-6 py-12">
  {/* Content */}
</div>
```

### Section Spacing
```jsx
<section className="py-20">
  {/* Section content */}
</section>
```

### Grid Layouts
```jsx
// 2 columns
<div className="grid gap-6 md:grid-cols-2">

// 3 columns
<div className="grid gap-8 md:grid-cols-3">

// 4 columns
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
```

## Transitions & Hover States

### Standard Transition
```jsx
className="transition-all"
```

### Hover Shadow
```jsx
className="hover:shadow-lg transition-shadow"
```

### Hover Scale
```jsx
className="hover:scale-105 transition-all"
```

## Accessibility

### Focus States
All interactive elements include:
- `focus:outline-none`
- `focus:ring-2`
- `focus:ring-{color}/20`

### Required Fields
Mark with red asterisk:
```jsx
<span className="text-red-600">*</span>
```

### Helper Text
```jsx
<span className="text-sm text-gray-500">(optional)</span>
```

## Responsive Design

### Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)
- **Large Desktop**: `xl:` (≥ 1280px)

### Common Patterns
```jsx
// Stack on mobile, side-by-side on desktop
className="flex flex-col lg:flex-row"

// 1 column on mobile, 2 on tablet, 3 on desktop
className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"

// Hide on mobile, show on desktop
className="hidden lg:block"
```

## Best Practices

1. **Always use semantic HTML** (`<header>`, `<main>`, `<section>`, `<nav>`)
2. **Maintain consistent spacing** (use 4, 6, 8, 12, 20 for spacing scale)
3. **Use border-2 for emphasis**, border for subtle dividers
4. **Include hover states** on all interactive elements
5. **Add transitions** for smooth interactions
6. **Use shadows sparingly** for depth
7. **Keep text readable** (minimum 16px for body text)
8. **Ensure sufficient contrast** (4.5:1 minimum)
9. **Make touch targets large** (minimum 44x44px)
10. **Test on mobile devices** regularly
