# Overview

AstroTalisman is an astrological talisman creation application that combines natal chart analysis, spirit correspondences, and optimal election timing for magical practitioners. The application enables users to generate personalized talismans based on their astrological data, with features for natal chart calculation, spirit database management, election timing optimization, talisman design, and transit monitoring.

## Recent Implementation (August 2025)
- Implemented real natal chart data for Prava (June 11, 1987, 22:46, Decatur GA)
- Fixed React SelectItem console errors by using proper values instead of empty strings
- Created complete component architecture with all five main features working
- Added sample Orisha spirit database with planetary correspondences
- Integrated canvas-based talisman designer with export capabilities

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation resolvers
- **Canvas Rendering**: Custom HTML5 Canvas implementation for talisman design

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Custom request/response logging middleware

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing

## Database Schema Design
- **Natal Charts**: Stores birth data, planetary positions, houses, and aspects as JSONB
- **Spirits**: Contains astrological correspondences including planets, elements, virtues, colors, numbers, and symbols
- **Talismans**: Links spirits to specific goals with election dates and design data
- **Elections**: Tracks optimal timing with planetary hours and astrological scores
- **Transits**: Monitors planetary movements relative to natal positions

## Authentication & Sessions
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Security**: CORS enabled, JSON parsing middleware, URL encoding support

## External Dependencies

### Core Libraries
- **Drizzle ORM**: Type-safe PostgreSQL database operations with Zod integration
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **TanStack Query**: Server state management with caching and synchronization
- **Radix UI**: Accessible UI component primitives
- **shadcn/ui**: Pre-built component library built on Radix UI

### Development Tools
- **Vite**: Fast build tool with HMR and TypeScript support
- **TypeScript**: Static type checking across full stack
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **ESBuild**: Fast JavaScript bundler for production builds

### Astrological Calculations
- **Swiss Ephemeris**: Planned integration for precise planetary position calculations (currently using mock data)
- **Date-fns**: Date manipulation and formatting utilities

### UI Enhancement Libraries
- **Embla Carousel**: Touch-friendly carousel component
- **Vaul**: Drawer component for mobile interfaces
- **CMDK**: Command palette and search functionality
- **Class Variance Authority**: Component variant management
- **Lucide React**: Icon library with consistent design

## Development Environment
- **Replit Integration**: Custom plugins for development environment and error handling
- **Hot Module Replacement**: Vite-powered development server with instant updates
- **Path Aliases**: Configured TypeScript paths for clean imports (@/, @shared/, @assets/)