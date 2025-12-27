import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link href="/">JobBoard</Link>
      </h1>
      <nav className="space-x-4">
        <Link href="/jobs">Jobs</Link>
        <Link href="/jobs/post">Post Job</Link>
        <Link href="/auth">Sign In / Sign Up</Link>
      </nav>
    </header>
  );
}
