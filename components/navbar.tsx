import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { SignInButton, UserButton } from "@clerk/nextjs";
import SearchBar from "@/components/search-bar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Circle, CircleUserRound, LogIn } from "lucide-react";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return ( 
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">NexTech</p>
          </Link>
          <MainNav data={categories} />
          <SearchBar />
          <div className="ml-auto flex items-center space-x-5 pr-1">
            <SignedIn>
              <NavbarActions />
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <NavbarActions />
              <div className="flex items-center rounded-full bg-black px-4 py-2 text-white font-medium text-sm cursor-pointer hover:opacity-75">
                <SignInButton afterSignInUrl="/"> 
                  <CircleUserRound/>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </Container>
    </div>
  );
};
 
export default Navbar;