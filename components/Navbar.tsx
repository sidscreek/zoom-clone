import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className=" flex flex-between fixed z-50 w-full bg-dark-1 top-0 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image 
            src="/icons/logo.svg"
            alt="yoom-logo"
            width={32}
            height={32}
            className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p>
      </Link>

      <div className="flex-between gap-5">
         {/* Clerk User Management */}
        <SignedIn>
            <UserButton />
        </SignedIn>
        <section className="w-full max-w-[264px]"> <MobileNav /> </section>
         {/* Mobile Nav */}
        
      </div>

    </nav>
  )
}

export default Navbar
