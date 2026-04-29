import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">SmartIndianBazaar</h3>
            <p className="text-neutral-400 text-sm">
              Your one-stop destination for the best deals on electronics, home appliances, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Email: info@smartindianbazaar.com</li>
              <li>Phone: +91-XXX-XXXX-XXXX</li>
              <li>Address: India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              © 2024 SmartIndianBazaar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-neutral-400 hover:text-white transition">Facebook</a>
              <a href="#" className="text-neutral-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-neutral-400 hover:text-white transition">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
