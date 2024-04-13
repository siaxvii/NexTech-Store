import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { UserButton } from "@clerk/nextjs";
import SearchBar from "@/components/search-bar";

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
            <NavbarActions />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </Container>
    </div>
  );
};
 
export default Navbar;