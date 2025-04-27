'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  const internalMenuItems = [
    { name: 'Home', href: '#hero-section', targetId: 'hero-section' },
    { name: 'About', href: '#about', targetId: 'about' },
    { name: 'Skills', href: '#skills', targetId: 'skills' },
    { name: 'Experience', href: '#experience', targetId: 'experience' },
    { name: 'Projects', href: '#projects', targetId: 'projects' },
    { name: 'Contact', href: '#contact', targetId: 'contact' },
  ]

  const rightNavItems = [
    { name: 'Blogs', href: 'https://blogs.yashrajs.com/' },
    { name: 'Download Resume', href: 'https://forms.gle/pdUazTZz3BdzxybD9', isButton: true },
  ]

  useEffect(() => {
    const heroSection = document.getElementById('hero-section')
    if (!heroSection) return

    const observer = new IntersectionObserver(([entry]) => setIsFixed(!entry.isIntersecting), {
      threshold: 0.1,
    })
    observer.observe(heroSection)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsHidden(currentScrollY > lastScrollY && currentScrollY < heroSection.offsetHeight)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const handleInternalClick = (e, targetId, isExternal = false) => {
    e.preventDefault()

    // If the link is internal (scroll within the same page)
    if (!isExternal) {
      scrollToSection(targetId)
    } else {
      // If external, let the browser handle navigation normally
      window.location.href = `https://yashrajs.com/#${targetId}`
    }

    setIsOpen(false)
  }

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full bg-[#15171A] text-white transition-transform duration-300 ${isFixed || !isHidden ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Desktop: Internal Links */}
        <div className="hidden items-center space-x-8 md:flex">
          {internalMenuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleInternalClick(e, item.targetId, true)}
              className="text-sm font-semibold transition-colors hover:text-gray-300 md:text-base"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop: External Links */}
        <div className="hidden items-center space-x-6 md:flex">
          {rightNavItems.map((item) =>
            item.isButton ? (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-200 md:text-base"
              >
                {item.name}
              </Link>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold transition-colors hover:text-gray-300 md:text-base"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile: Menu Toggle */}
        <button
          className="p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col space-y-4 border-t border-gray-700 bg-[#15171A] px-4 pt-4 pb-4 text-white md:hidden md:px-8">
          {internalMenuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleInternalClick(e, item.targetId, true)}
              className="text-sm font-semibold transition-colors hover:text-gray-300 md:text-base"
            >
              {item.name}
            </a>
          ))}
          {rightNavItems.map((item) =>
            item.isButton ? (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-200 md:text-base"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold transition-colors hover:text-gray-300 md:text-base"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  )
}

export default Header
