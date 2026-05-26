# Frontend Architecture

Application Structure:
- Layout-based architecture
- Shared reusable components
- Centralized API communication
- Feature-based page organization

Authentication Flow:
- JWT-based authentication
- Protected routes required
- Redirect unauthenticated users to login
- Store auth state globally

Routing:
- Public Routes
  - Login
  - Forgot Password

- Protected Routes
  - Dashboard
  - HR
  - Inventory
  - Sales
  - Reports
  - Settings

State Management:
- Context API initially
- Redux optional for scaling

Layout Rules:
- DashboardLayout wraps authenticated pages
- Navbar and Sidebar remain persistent
- Main content area adjusts dynamically

Error Handling:
- Centralized API error handling
- Toast notifications for user feedback
- Graceful fallback UI for failures