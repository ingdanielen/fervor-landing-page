"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Flame, Menu, X } from "lucide-react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      // Limpiar cualquier animación previa
      gsap.killTweensOf(mobileMenuRef.current)
      gsap.killTweensOf(mobileMenuRef.current.querySelectorAll("*"))
      
      // Animación del contenedor principal
      gsap.fromTo(
        mobileMenuRef.current,
        { 
          opacity: 0, 
          y: -20,
          scale: 0.95,
          display: "block"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.3, 
          ease: "power2.out",
          immediateRender: false
        }
      )

      // Animación de los enlaces
      const links = mobileMenuRef.current.querySelectorAll("a")
      const button = mobileMenuRef.current.querySelector("button")
      
      gsap.fromTo(links, {
        opacity: 0,
        x: -20
      }, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1
      })
      
      // Animación del botón
      if (button) {
        gsap.fromTo(button, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          delay: 0.2
        })
      }
    }
  }, [mobileMenuOpen])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetPosition, autoKill: true },
        ease: "power2.inOut",
      })
    }
    setMobileMenuOpen(false)
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      // Es una sección de la página actual
      e.preventDefault()
      const targetId = href.substring(1) // Remover el '/' del inicio
      handleSmoothScroll(e, targetId)
    } else if (href === '/') {
      // Es la página home - solo hacer scroll si ya estamos en home
      if (window.location.pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setMobileMenuOpen(false)
      }
      // Si no estamos en home, dejar que Link navegue normalmente
    }
    // Para otras rutas como /memorias, dejar que Link maneje la navegación
  }

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] md:w-[90%] max-w-6xl px-4 md:px-0">
        <div className="rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl shadow-[#c4ff0d]/20">
          <div className="flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group relative z-10">
              <Image 
                src="/images/TV.png" 
                alt="FERVOR" 
                width={1000} 
                height={1000}  
                className="h-full w-20 md:h-full md:w-32 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(196,255,13,0.6)]" 
              />

            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 relative group cursor-pointer"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c4ff0d] rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
              <a
                href="/#predicadores"
                onClick={(e) => handleNavigation(e, "/#predicadores")}
                className="text-sm font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 relative group cursor-pointer"
              >
                Predicadores
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c4ff0d] rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="/#galeria"
                onClick={(e) => handleNavigation(e, "/#galeria")}
                className="text-sm font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 relative group cursor-pointer"
              >
                Galería
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c4ff0d] rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <Link
                href="/memorias"
                className="text-sm font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 relative group cursor-pointer"
              >
                Memorias
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c4ff0d] rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
              <a
                href="/#pagos"
                onClick={(e) => handleNavigation(e, "/#pagos")}
                className="text-sm font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 relative group cursor-pointer"
              >
                Pagos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c4ff0d] rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="/#about"
                onClick={(e) => handleNavigation(e, "/#about")}
                className="text-sm font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 relative group cursor-pointer"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c4ff0d] rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </nav>

            {/* CTA Button - Desktop */}
            <Button className="hidden lg:flex bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 font-bold rounded-full px-6 xl:px-8 hover:scale-105 transition-all shadow-lg shadow-[#c4ff0d]/30 text-sm">
              Inscribirme
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:text-[#c4ff0d] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[99] w-[calc(100%-2rem)] max-w-md lg:hidden"
        >
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-[#c4ff0d]/20 p-6">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-base font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 py-2 border-b border-white/10 cursor-pointer"
              >
                Home
              </Link>
              <a
                href="/#predicadores"
                onClick={(e) => handleNavigation(e, "/#predicadores")}
                className="text-base font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 py-2 border-b border-white/10 cursor-pointer"
              >
                Predicadores
              </a>
              <a
                href="/#galeria"
                onClick={(e) => handleNavigation(e, "/#galeria")}
                className="text-base font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 py-2 border-b border-white/10 cursor-pointer"
              >
                Galería
              </a>
              <Link
                href="/memorias"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 py-2 border-b border-white/10 cursor-pointer"
              >
                Memorias
              </Link>
              <a
                href="/#pagos"
                onClick={(e) => handleNavigation(e, "/#pagos")}
                className="text-base font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 py-2 border-b border-white/10 cursor-pointer"
              >
                Pagos
              </a>
              <a
                href="/#about"
                onClick={(e) => handleNavigation(e, "/#about")}
                className="text-base font-medium text-white/90 hover:text-[#c4ff0d] transition-all duration-300 py-2 border-b border-white/10 cursor-pointer"
              >
                About
              </a>
              <Button
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 font-bold rounded-full mt-2 shadow-lg shadow-[#c4ff0d]/30"
              >
                Inscribirme
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
