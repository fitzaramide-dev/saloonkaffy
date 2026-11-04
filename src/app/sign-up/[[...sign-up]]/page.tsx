import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-glam-page flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-6 text-center">
        <span className="font-serif tracking-[0.15em] text-3xl font-bold text-glam-plum block">KAFFY SALOON</span>
        <span className="text-xs tracking-[0.25em] uppercase text-glam-pink font-extrabold">Penthouse Studio &bull; Santa Venera</span>
      </Link>
      
      <div className="w-full max-w-md flex justify-center">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-glam-pink hover:bg-glam-pinkDark text-white font-bold rounded-full',
              card: 'border-2 border-glam-border shadow-xl rounded-3xl bg-white',
              headerTitle: 'text-glam-plum font-serif font-bold text-2xl',
              headerSubtitle: 'text-glam-mocha',
              footerActionLink: 'text-glam-pink hover:text-glam-pinkDark font-bold',
            },
          }}
        />
      </div>
    </div>
  );
}
