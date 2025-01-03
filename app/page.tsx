// app/page.js

import { redirect } from 'next/navigation';

export default function Home() {
  // Perform the redirection to /login
  redirect('/login');

  return (
    <div className="w-full min-h-screen">
      {/* This content won't be rendered due to the redirect */}
    </div>
  );
}
