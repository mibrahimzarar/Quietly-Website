import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen bg-[#05050a] text-white selection:bg-purple-500/30">
      {/* Background & Effects */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-20 max-w-4xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden glow-purple-sm">
              <Image
                src="/images/logo.png"
                alt="Quietly Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                suppressHydrationWarning
              />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">Quietly</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 pb-32 pt-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-purple-300 font-medium tracking-wide uppercase">
              Last Updated: March 2026
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            Quietly was explicitly built to respect your privacy. Here is exactly what we do (and don&apos;t) collect.
          </p>
        </div>

        <div className="prose prose-invert prose-purple max-w-none">
          <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-8 leading-relaxed">
            <strong className="text-purple-300">The TL;DR:</strong>
            <br />
            Our software runs entirely locally on your machine. <strong>We do not collect, monitor, transmit, or store any of your code, prompts, chat history, or personal files.</strong> It never touches the cloud.
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">1. Data collected by the Application (Quietly CLI/GUI)</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            <strong>None.</strong> The Quietly application is designed to function entirely offline. All language models are downloaded directly to your local file system from HuggingFace (or loaded manually by you), and all inference is performed on your hardware. We do not incorporate analytics, tracking, or telemetry into our desktop applications.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">2. Data collected on this Website</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            When you browse quietlycode.com, our hosting provider may collect standard connection information (such as your IP address and user agent) purely for server logging and abuse prevention. We do not use invasive tracking scripts, marketing pixels, or third-party advertising cookies.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">3. Purchase Information</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            When you purchase a license, you provide your email address, name, and payment information through our secure payment processor. We do not process or store your raw credit card numbers.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            Upon successful payment, we receive your order information including your email and the generated license key so we can provide you access to the software.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">4. License Verification</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            When you enter your license key on our download page, that key is verified securely. Once verified, the download links are unlocked. The application itself does not require an ongoing internet connection to &quot;phone home&quot; or verify the license continuously.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">5. Contacting Us</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            If you have any questions about our privacy practices, please contact us at <a href="mailto:info@quietlycode.org" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">support@quietlycode.com</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; 2026 Quietly. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link href="/privacy" className="text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
