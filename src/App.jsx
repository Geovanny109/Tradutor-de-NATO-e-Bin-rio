import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TranslatorApp() {
  const [mode, setMode] = useState("binaryToText");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("binary"); // binary, nato, assembly

  // Gerenciamento de Tema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const natoMap = {
    alfa: "A", alpha: "A", bravo: "B", charlie: "C", delta: "D",
    echo: "E", foxtrot: "F", golf: "G", hotel: "H", india: "I",
    juliett: "J", kilo: "K", lima: "L", mike: "M", november: "N",
    oscar: "O", papa: "P", quebec: "Q", romeo: "R", sierra: "S",
    tango: "T", uniform: "U", victor: "V", whiskey: "W", whisky: "W",
    xray: "X", "x-ray": "X", yankee: "Y", zulu: "Z",
  };

  const reverseNatoMap = {
    A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo",
    F: "Foxtrot", G: "Golf", H: "Hotel", I: "India", J: "Juliett",
    K: "Kilo", L: "Lima", M: "Mike", N: "November", O: "Oscar",
    P: "Papa", Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango",
    U: "Uniform", V: "Victor", W: "Whiskey", X: "X-Ray", Y: "Yankee", Z: "Zulu",
  };

  const binaryToText = (binary) => {
    try {
      return binary.trim().split(/\s+/).map((bin) => String.fromCharCode(parseInt(bin, 2))).join("");
    } catch { return "Erro: Formato binário inválido."; }
  };

  const textToBinary = (text) => text.split("").map((char) => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");

  const textToNato = (text) => text.split("").map((char) => {
    const upper = char.toUpperCase();
    return reverseNatoMap[upper] || char;
  }).join(" ");

  const natoToText = (text) => {
    const words = text.split(/\s+/);
    let result = "";
    words.forEach((word) => {
      const lower = word.toLowerCase();
      if (natoMap[lower]) result += natoMap[lower];
      else if (word === "") result += " ";
      else result += word;
    });
    return result;
  };

  const textToAssembly = (text) => {
    const hex = text.split("").map(char => "0x" + char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"));
    return `db ${hex.join(", ")}`;
  };

  const assemblyToText = (asm) => {
    try {
      const cleanAsm = asm.replace(/db\s+/i, "").split(/[\s,]+/).filter(x => x.trim() !== "");
      return cleanAsm.map(hex => String.fromCharCode(parseInt(hex, 16))).join("");
    } catch { return "Erro: Formato Assembly inválido (ex: db 0x48, 0x69)."; }
  };

  const translate = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    switch (mode) {
      case "binaryToText": setOutput(binaryToText(input)); break;
      case "textToBinary": setOutput(textToBinary(input)); break;
      case "natoToText": setOutput(natoToText(input)); break;
      case "textToNato": setOutput(textToNato(input)); break;
      case "textToAssembly": setOutput(textToAssembly(input)); break;
      case "assemblyToText": setOutput(assemblyToText(input)); break;
      default: setOutput("");
    }
  };

  // Auto-translate on input change for better UX
  useEffect(() => {
    translate();
  }, [input, mode]);

  const categories = [
    { id: "binary", label: "Binário", icons: "01" },
    { id: "nato", label: "NATO", icons: "A-Z" },
    { id: "assembly", label: "Assembly", icons: "asm" },
  ];

  const subModes = {
    binary: [
      { id: "textToBinary", label: "Texto → Binário" },
      { id: "binaryToText", label: "Binário → Texto" },
    ],
    nato: [
      { id: "textToNato", label: "Texto → NATO" },
      { id: "natoToText", label: "NATO → Texto" },
    ],
    assembly: [
      { id: "textToAssembly", label: "Texto → Assembly" },
      { id: "assemblyToText", label: "Assembly → Texto" },
    ],
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col items-center p-4 md:p-8 ${isDark ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"}`}>
      
      {/* Header & Theme Toggle */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-black tracking-tighter italic">CIPHER<span className="text-blue-600">PRO</span></h1>
        </motion.div>
        
        <button 
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all ${isDark ? "bg-zinc-900 text-yellow-400 hover:bg-zinc-800" : "bg-white text-zinc-600 shadow-md hover:shadow-lg"}`}
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
      </header>

      <main className="w-full max-w-4xl grid gap-8">
        
        {/* Navigation Tabs */}
        <div className={`flex p-1.5 rounded-2xl ${isDark ? "bg-zinc-900" : "bg-zinc-200"}`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setMode(subModes[cat.id][0].id);
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all relative ${activeTab === cat.id ? (isDark ? "text-white" : "text-blue-600") : "text-zinc-500 hover:text-zinc-400"}`}
            >
              {activeTab === cat.id && (
                <motion.div layoutId="activeTab" className={`absolute inset-0 rounded-xl shadow-sm ${isDark ? "bg-zinc-800" : "bg-white"}`} />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Sub-modes Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {subModes[activeTab].map((sm) => (
            <button
              key={sm.id}
              onClick={() => setMode(sm.id)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-medium transition-all border ${mode === sm.id 
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : (isDark ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700" : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 shadow-sm")}`}
            >
              {sm.label}
            </button>
          ))}
        </div>

        {/* Input/Output Area */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Entrada</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite para traduzir..."
              className={`w-full h-64 p-6 rounded-[32px] text-lg outline-none transition-all resize-none border-2 ${isDark 
                ? "bg-zinc-900/50 border-zinc-800 focus:border-blue-600/50 text-white" 
                : "bg-white border-zinc-100 focus:border-blue-600/30 text-zinc-900 shadow-xl shadow-zinc-200/50"}`}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center ml-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Saída</label>
              <button 
                onClick={() => { navigator.clipboard.writeText(output); alert("Copiado!"); }}
                className="text-[10px] font-bold bg-blue-600/10 text-blue-600 px-2 py-1 rounded hover:bg-blue-600/20 transition-colors"
              >
                COPIAR
              </button>
            </div>
            <div className={`w-full h-64 p-6 rounded-[32px] text-lg overflow-y-auto break-words font-mono border-2 ${isDark 
              ? "bg-zinc-900/30 border-zinc-800 text-blue-400" 
              : "bg-blue-50/30 border-blue-100 text-blue-700 shadow-inner"}`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={output}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {output || <span className="opacity-30 italic">O resultado aparecerá aqui...</span>}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stats/Info Footer */}
        <footer className={`mt-12 p-8 rounded-[40px] border ${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl font-black text-blue-600">{input.length}</p>
              <p className="text-[10px] font-bold uppercase text-zinc-500">Caracteres</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600">{input.split(/\s+/).filter(x => x).length}</p>
              <p className="text-[10px] font-bold uppercase text-zinc-500">Palavras</p>
            </div>
            <div className="col-span-2 text-left md:border-l md:border-zinc-800 md:pl-8 flex flex-col justify-center">
              <p className="text-xs text-zinc-500 leading-relaxed">
                <span className="font-bold text-blue-600">Dica:</span> A tradução é processada em tempo real enquanto você digita.
              </p>
            </div>
          </div>
        </footer>
      </main>
      
      <p className="mt-8 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Engine v2.0 • Profissional Edition</p>
    </div>
  );
}
