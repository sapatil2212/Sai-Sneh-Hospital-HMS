import Link from "next/link";
import { HeartPulse, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Hospital Overview */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group">
              <img
                src="/images/logo.png"
                alt="Sai Sneh Hospital"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Serving Katraj and Pune patients since 1987 (39+ Years). A trusted 50-bed multi-specialty healthcare and maternity care center equipped with an advanced ICU and dialysis facility.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-teal bg-brand-teal/10 px-3 py-1.5 rounded-lg border border-brand-teal/20 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Cashless panels supported</span>
            </div>
          </div>

          {/* Column 2: Specialties */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Key Specialties</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  Gynecology & Obstetrics
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  Hemodialysis Center
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  Intensive Care Unit (ICU)
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  Cardiology Clinic
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  Pediatrics & Neonatal Care
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  General & Laparoscopic Surgery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Legacy
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-white transition-colors">
                  Consulting Doctors
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-white transition-colors">
                  Insurance & Cashless Schemes
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Hospital Gallery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Common FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base mb-2">Hospital Contacts</h3>
            
            <div className="flex gap-3 text-sm text-slate-400">
              <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <span>
                Pune - Satara Rd, opp. PMT Bus Depot, Katraj Vasahat, Katraj, Pune, Maharashtra 411046
              </span>
            </div>

            <div className="flex gap-3 text-sm text-slate-400 items-center">
              <Phone className="w-4 h-4 text-brand-teal shrink-0" />
              <a href="tel:08888150101" className="hover:text-white transition-colors font-semibold">
                088881 50101 (24x7 Emergency)
              </a>
            </div>

            <div className="flex gap-3 text-sm text-slate-400 items-center">
              <Mail className="w-4 h-4 text-brand-teal shrink-0" />
              <a href="mailto:info@saisnehhospital.com" className="hover:text-white transition-colors">
                info@saisnehhospital.com
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-500 border-t border-slate-800">
              <span>Timing: </span>
              <span className="text-emerald-green font-semibold">Open 24 Hours, 7 Days a Week</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Sai Sneh Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <span>ISO 9001:2015 Certified Hospital</span>
            <span>Reg No: PMC-2007-00231</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
