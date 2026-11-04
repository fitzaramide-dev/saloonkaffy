import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_aG9wZWZ1bC1sb3VzZS00OTk1LmNsZXJrLmFjY291bnRzLmRldiQ';
}

// Define protected routes (Admin and Client Portal require sign-in)
const isProtectedRoute = createRouteMatcher(['/portal(.*)', '/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
