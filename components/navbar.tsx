import Link from "next/link";

import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { SignInButton, UserButton } from "@clerk/nextjs";
import SearchBar from "@/components/search-bar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { CircleUserRound } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return ( 
    <div className="border-b">
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">NexTech</p>
          </Link>
          <MainNav data={categories} />
          
          
          <div className="ml-auto flex items-center space-x-5 pr-1">
          <SearchBar />
            <SignedIn>
              <NavbarActions />
              <ModeToggle/>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <NavbarActions />
              <ModeToggle/>
              <div className="rounded-full bg-black border px-4 py-2 text-white font-medium text-medium cursor-pointer hover:opacity-75">
                <SignInButton>
                  <button className="flex items-center">
                    <CircleUserRound />
                    <h1 className="ml-3 font-bold hidden sm:block whitespace-nowrap">Sign In</h1>
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
    </div>
  );
};
 
export default Navbar;