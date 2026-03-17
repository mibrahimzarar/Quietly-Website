import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import Image from "next/image";

export default function TermsOfService() {
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
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-purple-300 font-medium tracking-wide uppercase">
              Last Updated: March 2026
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Terms of Service
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            Please read these terms carefully before accessing or using Quietly.
          </p>
        </div>

        <div className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">1. Acceptance of Terms</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            By purchasing, downloading, or using the Quietly application (the &quot;Software&quot;), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not use the Software.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">2. License Grant</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Upon purchase of a license, Quietly grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the Software strictly in accordance with these Terms.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70 mb-6">
            <li><strong>Personal Use:</strong> The license key is explicitly for your own use. You may install the Software on multiple devices that you personally own (e.g., your desktop and your laptop).</li>
            <li><strong>Prohibited Actions:</strong> You may not distribute, sub-license, rent, or lease the Software or your license key to third parties.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">3. Local Operations and Liability</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Quietly operates locally on your hardware. We do not remotely execute code or transmit your files. You acknowledge that AI models (including those downloaded via HuggingFace or otherwise) may produce inaccurate, incomplete, or inappropriate outputs.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            Quietly is provided &quot;as is&quot;, without warranty of any kind. In no event shall the developers be held liable for any damages arising from the use of this software, including but not limited to loss of data or business interruption.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">4. Governing Law</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            These terms and conditions are governed by and construed in accordance with standard international software distribution laws.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">5. Refund Policy</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            We want you to be completely satisfied with Quietly. If you are not satisfied with your purchase, we offer a refund policy as outlined below.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70 mb-6">
            <li><strong>How to Request a Refund:</strong> To request a refund, please contact us at <a href="mailto:support@quietlycode.com" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">support@quietlycode.com</a> with your order details. Refunds are processed within 5-10 business days.</li>
            <li><strong>License Revocation:</strong> Upon receiving a refund, your license key will be deactivated and you must uninstall and remove all copies of the Software from your devices.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white/90">6. Contact Information</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Questions about the Terms of Service should be sent to us at <a href="mailto:info@quietlycode.org" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">support@quietlycode.com</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; 2026 Quietly. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-white">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
