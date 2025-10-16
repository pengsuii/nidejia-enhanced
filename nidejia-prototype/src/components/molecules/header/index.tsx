'use client'
import { Button } from '@/components/atomics/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atomics/dropdown-menu'
import Title from '@/components/atomics/title'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
    const {data: session} = useSession();
    const pathname = usePathname();

    const navItemClass = (href: string) => [
      'cursor-pointer font-semibold leading-6 hover:text-primary',
      pathname === href ? 'text-primary' : ''
    ].join(' ');


    return (
      <header className="container mx-auto fixed inset-x-0 top-[30px] z-20">
        <div className="p-[30px] rounded-[30px] bg-white flex justify-between items-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="nidejia"
              height={36}
              width={133}
            />
          </Link>

          <nav>
            <ul className="flex items-center space-x-[30px]">
              <li className={navItemClass('/featured')}>
                <Link href="/featured">Featured</Link>
              </li>
              <li className={navItemClass('/categories')}>
                <Link href="/categories">Categories</Link>
              </li>
              <li className={navItemClass('/testimonials')}>
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li className={navItemClass('/about')}>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>

          <div
            data-login={!!session?.user}
            className="data-[login=true]:hidden data-[login=false]:flex items-center space-x-3"
          >
            <Button variant="secondary" size="header">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="default" size="header" className="shadow-button">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              data-login={!!session?.user}
              className="data-[login=false]:hidden outline-none"
            >
              <div className="flex items-center space-x-2">
                <Title title={session?.user.name} subtitle="Howdy" section="header" />
                <Image
                  src="/images/avatar.webp"
                  alt="avatar"
                  height={48}
                  width={48}
                  className="rounded-full"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[240px] mr-8 space-y-4">
              <DropdownMenuItem>
                <Link href={"/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/dashboard/my-listings"}>My Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>My Rentals</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
}

export default Header