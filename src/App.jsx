import React from "react";
import { motion } from "framer-motion";

export default function TranslatorApp() {
  const [mode, setMode] = React.useState("binaryToText");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const natoMap = {
    alfa: "A",
    alpha: "A",
    bravo: "B",
    charlie: "C",
    delta: "D",
    echo: "E",
    foxtrot: "F",
    golf: "G",
    hotel: "H",
    india: "I",
    juliett: "J",
    kilo: "K",
    lima: "L",
    mike: "M",
    november: "N",
    oscar: "O",
    papa: "P",
    quebec: "Q",
    romeo: "R",
    sierra: "S",
    tango: "T",
    uniform: "U",
    victor: "V",
    whiskey: "W",
    whisky: "W",
    xray: "X",
    "x-ray": "X",
    yankee: "Y",
    zulu: "Z",
  };

  const reverseNatoMap = {
    A: "Alpha",
    B: "Bravo",
    C: "Charlie",
    D: "Delta",
    E: "Echo",
    F: "Foxtrot",
    G: "Golf",
    H: "Hotel",
    I: "India",
    J: "Juliett",
    K: "Kilo",
    L: "Lima",
    M: "Mike",
    N: "November",
    O: "Oscar",
    P: "Papa",
    Q: "Quebec",
    R: "Romeo",
    S: "Sierra",
    T: "Tango",
    U: "Uniform",
    V: "Victor",
    W: "Whiskey",
    X: "X-Ray",
    Y: "Yankee",
    Z: "Zulu",
  };

  const binaryToText = (binary) => {
    try {
      return binary
        .trim()
        .split(" ")
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join("");
    } catch {
      return "Erro ao traduzir binário.";
    }
  };

  const textToBinary = (text) => {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  };

  const natoToText = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => natoMap[word] || "")
      .join("");
  };

  const textToNato = (text) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => reverseNatoMap[char] || char)
      .join(" ");
  };

  const translate = () => {
    switch (mode) {
      case "binaryToText":
        setOutput(binaryToText(input));
        break;

      case "textToBinary":
        setOutput(textToBinary(input));
        break;

      case "natoToText":
        setOutput(natoToText(input));
        break;

      case "textToNato":
        setOutput(textToNato(input));
        break;

      default:
        setOutput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-zinc-900/90 backdrop-blur-xl rounded-[32px] shadow-2xl p-8 border border-zinc-800"
      >
        <h1 className="text-4xl font-bold mb-2 text-center">
          Tradutor Binário & NATO
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Traduza códigos binários e alfabeto fonético NATO facilmente.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setMode("binaryToText")}
            className={`p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              mode === "binaryToText"
                ? "bg-white text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            Binário → Texto
          </button>

          <button
            onClick={() => setMode("textToBinary")}
            className={`p-4 rounded-2xl transition ${
              mode === "textToBinary"
                ? "bg-white text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            Texto → Binário
          </button>

          <button
            onClick={() => setMode("natoToText")}
            className={`p-4 rounded-2xl transition ${
              mode === "natoToText"
                ? "bg-white text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            NATO → Texto
          </button>

          <button
            onClick={() => setMode("textToNato")}
            className={`p-4 rounded-2xl transition ${
              mode === "textToNato"
                ? "bg-white text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            Texto → NATO
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite aqui..."
          className="w-full h-40 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 rounded-3xl p-5 text-lg outline-none focus:ring-2 focus:ring-white transition-all duration-300 resize-none"
        />

        <button
          onClick={translate}
          className="w-full mt-6 bg-white text-black font-bold py-4 rounded-3xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 shadow-lg"
        >
          Traduzir
        </button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-8 bg-zinc-800/80 backdrop-blur-md rounded-3xl p-6 border border-zinc-700"
        >
          <h2 className="text-xl font-semibold mb-3">Resultado</h2>

          <p className="text-zinc-200 break-words whitespace-pre-wrap">
            {output || "O resultado aparecerá aqui."}
          </p>
        </motion.div>

        <div className="mt-8 text-sm text-zinc-500 text-center">
          <p>Exemplos:</p>

          <p className="mt-2">
            01001000 01101001 → Hi
          </p>

          <p>
            Alpha Bravo Charlie → ABC
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}