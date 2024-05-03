//Renders all routes for the Navigation bar
"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { Category } from "@/types";
import { useTheme } from "next-themes";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav
      className="mx-9 flex items-center space-x-2 lg:space-x-6"
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm transition-colors font-medium hover:text-gray-400',
            theme === 'dark' ? 'text-neutral-300' : 'text-gray-600'
          )}
        >
          <div className="relative"> {/* Wrap in a div to position the line */}
            {route.label}
            {/* Add border bottom when active */}
            {route.active && (
              <div
                className={cn(
                  'absolute mt-1 w-full h-0.5', // Example border color
                  theme === 'dark' ? 'bg-neutral-300' : 'bg-neutral-300' // Adjust border color based on theme
                )}
              />
            )}
          </div>
      </Link>
      ))}
    </nav>
  )
};

export default MainNav;