/**
 * RegisterNodePage - NEØ Protocol
 *
 * Placeholder: rota /register está desabilitada (projeto não usa mais Thirdweb).
 * Reative a rota em App.jsx e implemente com nova stack de wallet quando necessário.
 */

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BottomNavigation from '../../components/BottomNavigation'

export default function RegisterNodePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-16 safe-area-inset relative font-mono">
      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-4xl pt-safe">
          <h1 className="text-4xl font-bold mb-4">CADASTRO DE NODES</h1>
          <div className="p-6 border border-amber-500/30 bg-amber-500/10 rounded-lg">
            <p className="text-amber-200">
              Cadastro temporariamente desabilitado (integração wallet desabilitada).
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Use a navegação para acessar as demais rotas do protocolo.
            </p>
          </div>
        </main>
        <Footer />
        <BottomNavigation />
      </div>
    </div>
  )
}
