import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">AUTH Testing</h1>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold">
              Simple Authentication Testing
            </h2>
            <p className="text-lg text-gray-600">
              A lightweight, self-made authentication system built to understand
              the fundamentals of user management.
            </p>
            <Button size="lg">
              <Link href="/auth/login">Get Started</Link>
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Authentication illustration"
              className="rounded-lg shadow-md"
              width={400}
              height={300}
            />
          </div>
        </div>
      </section>

      {/* Three Service Containers */}
      <section className="py-25 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why I Built This
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:transition duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3">Learning</h3>
              <p className="text-gray-600">
                Built to understand the core concepts of authentication, user
                sessions, and security best practices.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:transition duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
              <p className="text-gray-600">
                Focused on creating a clean, minimal implementation without
                unnecessary complexity or dependencies.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:transition duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3">Customization</h3>
              <p className="text-gray-600">
                Designed to be easily modified and extended for different
                project requirements and use cases.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-primary py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-primary-foreground hover:underline">
                <Link href="https://github.com/Mihailghrgh">
                  ©2025 Mihail Gheorghe. All rights reserved.
                </Link>
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-sm text-primary-foreground hover:text-muted-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-primary-foreground hover:text-muted-foreground"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-primary-foreground hover:text-muted-foreground"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-primary-foreground">
              Self-made authentication system for learning purposes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
