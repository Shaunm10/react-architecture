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
  - Write Reviews: Logged-in users can write reviews for ideas with a 1–5-star rating and text content
  - View Reviews: All visitors can see reviews on idea detail pages, sorted by date
  - Edit Reviews: Users can update their own reviews
  - Delete Reviews: Users can delete their own reviews
  - Review Constraints: Users can only write one review per idea
- Content Discovery: A platform is only useful if users can find what they're looking for. Discovery features help surface relevant content:
  - Idea Listing: Paginated or infinite scroll listing of all ideas
  - Tag-based filtering: Filter ideas by selecting tags
  - Real-time search: Search functionality with debounced updates
  - User Content Views: Users can view all their own ideas and reviews in dedicated pages