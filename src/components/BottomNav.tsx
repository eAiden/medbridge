"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  FileText,
  Heart,
  ClipboardList,
  Home,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/assess", label: "Assess", icon: Search },
  { href: "/apply", label: "Apply", icon: FileText },
  { href: "/crowdfund", label: "Fund", icon: Heart },
  { href: "/track", label: "Track", icon: ClipboardList },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
