import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-3xl">
        <h1 className="text-7xl font-bold text-primary mb-6 text-white">
          LIFELINE
        </h1>

        <h2 className="text-2xl text-white mb-4">
          AI Future Simulation Engine
        </h2>

        <p className="text-gray-400 mb-10">
          Predict outcomes. Simulate futures. Generate battle plans for your
          life.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="/auth"
            className="
              px-8
              py-4
              bg-primary
              text-white
              rounded-xl
              font-bold
            "
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="
              px-8
              py-4
              border
              border-primary
              rounded-xl
              text-white
            "
          >
            Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
