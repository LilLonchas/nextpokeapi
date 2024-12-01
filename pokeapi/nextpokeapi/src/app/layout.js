'use client'

import { useState } from "react";
import localFont from "next/font/local";
import Navbar from "@/componentes/Nav";
import RandomPokemons from "../componentes/Generaciones";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./globals.css";

// Cargando fuentes locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Componente RootLayout
export default function RootLayout({ children }) {
  // Estado para la generación seleccionada
  const [generation, setGeneration] = useState(1); // Valor inicial es la generación 1

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <h1>Selecciona una Generación de Pokémon</h1>

        {/* Pasamos `setGeneration` al Navbar */}
        <Navbar setGeneration={setGeneration} />

        <h2>Pokémon de la Generación {generation}</h2>

        {/* Pasamos la `generation` al componente RandomPokemons */}
        <RandomPokemons generation={generation} />

        {children}
      </body>
    </html>
  );
}
