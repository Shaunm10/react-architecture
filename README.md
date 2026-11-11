# AI Ideas Community Platform

This is a social application where users can share AI application ideas, browse ideas from others, and write reviews. Think of it as a community hub for people who want to share what they're building or thinking about building in the AI space.

Why this application? Because it touches on most of the architectural decisions we've been discussing. It has public pages (for SEO). It has authenticated pages (for posting ideas and reviews). It has user-generated content (which means we need sanitization). It has forms (ideas and reviews). It has list views with filtering and search. It has relational data (users, ideas, reviews). It is conceptually straightforward enough that we can focus on architecture without getting lost in domain complexity.

This is an MVP (Minimum Viable Product). We'll build core features, but architect it so it can grow. Future enhancements could include collaboration on ideas, voting, notifications, AI-powered recommendations, analytics, and more. Good architecture means those features can be added without restructuring everything.

## Functional requirements: What it does

- **User authentication and management:** The foundation of a community platform is identity. Users need to be able to create accounts, sign in, and manage their presence:
  - **User registration:** New users can create accounts with username, email, and password
  - **User login/logout:** Registered users can authenticate and manage their sessions
  - **User profiles:** Users can view and edit their profiles, including bio information that supports Markdown formatting
  - **User dashboard:** Authenticated users get a personalized dashboard to manage their content
- **Idea management:** The core of the platform is ideas themselves. Users need full control over creating, browsing, and managing AI application ideas:
  - **Create Ideas:** Logged-in users can submit new AI application ideas with a title, short description, detailed description (with Markdown support), and tags
- Browse Ideas: All visitors can browse ideas in a paginated list sorted by creation date
  - **View Idea Details:** Detailed view showing full idea information, including all associated reviews
  - **Edit Ideas:** Users can edit their own ideas to improve and update content
  - **Delete Ideas:** Users can delete their own ideas (with cascade deletion of associated reviews)
  - **Search and Filter:** Users can search ideas by title or description and filter by tags
- **Review System:** Community value comes from feedback. The review system lets users evaluate and discuss each other's ideas through the review system such as:
  - **Write Reviews:** Logged-in users can write reviews for ideas with a 1–5-star rating and text content
  - **View Reviews:** All visitors can see reviews on idea detail pages, sorted by date
  - **Edit Reviews:** Users can update their own reviews
  - **Delete Reviews:** Users can delete their own reviews
  - **Review Constraints:** Users can only write one review per idea
- **Content Discovery:** A platform is only useful if users can find what they're looking for. Discovery features help surface relevant content:
  - **Idea Listing:** Paginated or infinite scroll listing of all ideas
  - **Tag-based filtering:** Filter ideas by selecting tags
  - **Real-time search:** Search functionality with debounced updates
  - **User Content Views:** Users can view all their own ideas and reviews in dedicated pages

  ## Non-functional requirements: How it works

- **Performance:** The application must meet modern web performance standards:
  - Initial page load within 3 seconds on standard broadband
  - Client-side navigation should feel instant (< 100ms)
  - Bundle size under 1MB for initial page load
  - Meet Core Web Vitals thresholds (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Usability:** The application must be user-friendly and intuitive:
  - Responsive design that works on devices from 320px to 1920px width
  - Touch-friendly interface for mobile devices
  - Consistent navigation across all routes
  - Clear loading states and skeleton screens during data fetching
  - Intuitive form validation with helpful error messages
- **Accessibility:** The application should be accessible to all users:
  - Meet WCAG 2.1 AA accessibility standards
  - Keyboard navigation support for all interactive elements
  - Proper ARIA labels and semantic HTML
  - Minimum color contrast ratio of 4.5:1 for text
- **Security:** Client-side security measures must be implemented:
  - Input validation and sanitization to prevent XSS attacks
  - Markdown content sanitization before rendering
  - Secure authentication token storage (httpOnly cookies)
  - Protection against common web vulnerabilities
- **Reliability:** The application should handle failures gracefully:
  - Network error handling with retry mechanisms
  - React error boundaries for component error handling
  - Graceful degradation when features are unavailable
  - Appropriate fallback content for failed data fetching

### Data Model
Our application has three core entities that work together to create the community platform:

**User**
- id: Unique identifier
- username: Unique username for the user
- email: User's email address
- password: Hashed password for authentication
- bio: User biography supporting Markdown (optional)
- createdAt: Timestamp of account creation

**Idea**
- id: Unique identifier
- title: The idea's title
- shortDescription: Brief summary of the idea
- description: Detailed description with Markdown support
- tags: Array of tags for categorization
- authorId: Reference to the user who created it
- createdAt: Timestamp of creation
- updatedAt: Timestamp of last update

**Review**
- id: Unique identifier
- content: Review text content
- rating: Star rating (1–5)
- ideaId: Reference to the idea being reviewed
- authorId: Reference to the User who wrote the review
- createdAt: Timestamp of creation
- updatedAt: Timestamp of last update

The relationships between these entities are as follows:

- A User can create many ideas (one-to-many)
- A User can write many Reviews (one-to-many)
- An Idea can have many Reviews (one-to-many)
- Each Review belongs to one Idea and one User
- A User can only write one Review per Idea (enforced constraint)

## Commands

```Bash
# Run type checking once (includes React Router type generation)
npm run typecheck

# Run type checking in watch mode (reruns on file changes)
npx tsc --watch

# Run type checking for specific files
npx tsc --noEmit src/features/ideas/api/create-idea.ts

# Run linting on all files
npm run lint

# Run linting and automatically fix what can be fixed
npm run lint:fix

# Run linting on specific files or directories
npx eslint src/features/ideas/
npx eslint src/components/button.tsx


# Run all pre-commit checks (linting, formatting, type checking)
npm run pre-commit

# Run only lint-staged (checks only changed files)
npm run lint-staged

# Run individual checks
npm run lint
npm run format
npm run typecheck

# Add additional shadcn components
npx shadcn@latest add button card

#install and configure storybook
npm create storybook@latest
```

## Project Structure

### src
```
src/
├── app/              # Core application setup and entry points
├── components/       # Reusable UI components (not feature-specific)
├── config/           # Configuration files
├── features/         # Feature-based modules
│   ├── auth/        # Authentication feature
│   ├── ideas/       # Ideas management feature
│   ├── profile/     # User profile feature
│   └── reviews/     # Reviews feature
├── hooks/           # Custom React hooks (shared across features)
├── lib/             # Utility functions and third-party integrations
├── stores/          # Global state management
├── types/           # TypeScript type definitions
```

### individual feature
```
features/ideas/
├── api/              # API calls for this feature
├── components/       # Feature-specific components
├── config/           # Feature configuration (query keys, etc.)
├── hooks/            # Feature-specific hooks
└── locales/          # Internationalization for this feature
```


### Links
https://learning-oreilly-com.library.access.arlingtonva.us/library/view/react-application-architecture/9781836202974/Chapter_3.xhtml#h1_129

https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git

https://ui.shadcn.com/

https://storybook.js.org/docs/writing-tests/visual-testing