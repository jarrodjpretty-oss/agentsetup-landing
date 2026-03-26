import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold -tracking-[0.02em] mb-6">
          Payment received.
          <br />
          Welcome to AgentSetup.
        </h1>
        <p className="text-text-muted text-lg leading-relaxed mb-10">
          Xavier or Jarrod will be in touch within 24 hours to schedule your
          onboarding call.
        </p>
        <Link
          href="/"
          className="text-gold hover:underline transition-colors duration-300"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
