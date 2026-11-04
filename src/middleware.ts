import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/portal(.*)', '/admin(.*)']);

export default function middleware(req: any, evt: any) {
  // If Clerk secret key hasn't been added to Vercel yet, keep the public site fast and active
  if (!process.env.CLERK_SECRET_KEY) {
    if (isProtectedRoute(req)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  return clerkMiddleware((auth, r) => {
    if (isProtectedRoute(r)) {
      auth().protect();
    }
  })(req, evt);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
