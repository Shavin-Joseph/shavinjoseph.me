import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FiCode, FiLock, FiTerminal, FiKey, FiHash, FiClock, 
  FiCopy, FiCheck, FiRefreshCw, FiZap, FiSliders, FiFileText, 
  FiShield, FiSearch, FiLayers, FiAlertCircle
} from 'react-icons/fi';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('json');
  const [copiedKey, setCopiedKey] = useState('');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  // --- SUB-TOOL 1: JSON FORMATTER ---
  const [jsonInput, setJsonInput] = useState('{"name":"Shavin Joseph","role":"Full-Stack Engineer","skills":["React","Kotlin","PowerShell","Docker"],"active":true,"version":2026}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');

  const formatJson = (indent = 2) => {
    try {
      if (!jsonInput.trim()) {
        setJsonOutput('');
        setJsonError('');
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, indent));
      setJsonError('');
    } catch (err) {
      setJsonError(err.message);
      setJsonOutput('');
    }
  };

  const minifyJson = () => formatJson(0);

  useEffect(() => {
    formatJson(2);
  }, [jsonInput]);

  // --- SUB-TOOL 2: BASE64 ENCODER / DECODER ---
  const [base64Mode, setBase64Mode] = useState('encode');
  const [base64Input, setBase64Input] = useState('Hello World! Developer Utility Hub 2026');
  const [base64Output, setBase64Output] = useState('');
  const [base64Error, setBase64Error] = useState('');

  useEffect(() => {
    try {
      if (!base64Input) {
        setBase64Output('');
        setBase64Error('');
        return;
      }
      if (base64Mode === 'encode') {
        setBase64Output(btoa(unescape(encodeURIComponent(base64Input))));
        setBase64Error('');
      } else {
        setBase64Output(decodeURIComponent(escape(atob(base64Input))));
        setBase64Error('');
      }
    } catch (err) {
      setBase64Error('Invalid Base64 payload string');
      setBase64Output('');
    }
  }, [base64Input, base64Mode]);

  // --- SUB-TOOL 3: URL ENCODER / DECODER ---
  const [urlMode, setUrlMode] = useState('encode');
  const [urlInput, setUrlInput] = useState('https://shavinjoseph.me/blog?search=react 19&category=web dev');
  const [urlOutput, setUrlOutput] = useState('');

  useEffect(() => {
    try {
      if (!urlInput) {
        setUrlOutput('');
        return;
      }
      if (urlMode === 'encode') {
        setUrlOutput(encodeURIComponent(urlInput));
      } else {
        setUrlOutput(decodeURIComponent(urlInput));
      }
    } catch (err) {
      setUrlOutput('Error processing URI string');
    }
  }, [urlInput, urlMode]);

  // --- SUB-TOOL 4: JWT DECODER ---
  const [jwtInput, setJwtInput] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNoYXZpbiBKb3NlcGgiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [jwtHeader, setJwtHeader] = useState('');
  const [jwtPayload, setJwtPayload] = useState('');
  const [jwtError, setJwtError] = useState('');

  useEffect(() => {
    try {
      if (!jwtInput.trim()) {
        setJwtHeader('');
        setJwtPayload('');
        setJwtError('');
        return;
      }
      const parts = jwtInput.trim().split('.');
      if (parts.length < 2) {
        throw new Error('JWT must contain header and payload segments');
      }
      const headerObj = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payloadObj = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setJwtHeader(JSON.stringify(headerObj, null, 2));
      setJwtPayload(JSON.stringify(payloadObj, null, 2));
      setJwtError('');
    } catch (err) {
      setJwtError('Invalid JSON Web Token structure');
      setJwtHeader('');
      setJwtPayload('');
    }
  }, [jwtInput]);

  // --- SUB-TOOL 5: HASH GENERATOR (SHA-256) ---
  const [hashInput, setHashInput] = useState('shavin-portfolio-2026');
  const [sha256Output, setSha256Output] = useState('');

  useEffect(() => {
    const computeHash = async () => {
      if (!hashInput) {
        setSha256Output('');
        return;
      }
      const msgUint8 = new TextEncoder().encode(hashInput);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setSha256Output(hashHex);
    };
    computeHash();
  }, [hashInput]);

  // --- SUB-TOOL 6: UUID GENERATOR ---
  const [uuidCount, setUuidCount] = useState(5);
  const [uuidList, setUuidList] = useState([]);

  const generateUuids = () => {
    const list = [];
    for (let i = 0; i < uuidCount; i++) {
      list.push(crypto.randomUUID());
    }
    setUuidList(list);
  };

  useEffect(() => {
    generateUuids();
  }, [uuidCount]);

  // --- SUB-TOOL 7: CRON EXPLAINER ---
  const [cronInput, setCronInput] = useState('*/15 * * * *');
  const [cronExplanation, setCronExplanation] = useState('');

  useEffect(() => {
    const explainCron = (expr) => {
      const parts = expr.trim().split(/\s+/);
      if (parts.length < 5) return 'Invalid CRON expression (requires 5 parameters)';
      
      const [min, hr, dom, mon, dow] = parts;
      let summary = [];

      if (min === '*') summary.push('every minute');
      else if (min.startsWith('*/')) summary.push(`every ${min.replace('*/', '')} minutes`);
      else summary.push(`at minute ${min}`);

      if (hr === '*') summary.push('of every hour');
      else if (hr.startsWith('*/')) summary.push(`every ${hr.replace('*/', '')} hours`);
      else summary.push(`at hour ${hr}:00`);

      if (dom !== '*') summary.push(`on day-of-month ${dom}`);
      if (mon !== '*') summary.push(`in month ${mon}`);
      if (dow !== '*') summary.push(`on day-of-week ${dow}`);

      return `Runs ${summary.join(' ')}.`;
    };

    setCronExplanation(explainCron(cronInput));
  }, [cronInput]);

  // --- SUB-TOOL 8: SQL FORMATTER ---
  const [sqlInput, setSqlInput] = useState('select id, name, email from users where status = \'active\' and role = \'admin\' order by created_at desc;');
  const [sqlOutput, setSqlOutput] = useState('');

  const formatSql = () => {
    if (!sqlInput) return;
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'];
    let formatted = sqlInput;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${kw}`);
    });
    setSqlOutput(formatted.trim());
  };

  useEffect(() => {
    formatSql();
  }, [sqlInput]);

  const toolsList = [
    { id: 'json', name: 'JSON Formatter', icon: <FiCode />, desc: 'Prettify, validate & minify JSON' },
    { id: 'base64', name: 'Base64 Tool', icon: <FiLock />, desc: 'Encode & decode Base64 strings' },
    { id: 'jwt', name: 'JWT Decoder', icon: <FiKey />, desc: 'Inspect token headers & payloads' },
    { id: 'hash', name: 'Hash Generator', icon: <FiHash />, desc: 'SHA-256 cryptographic hashing' },
    { id: 'uuid', name: 'UUID v4 Generator', icon: <FiRefreshCw />, desc: 'Generate random UUID tokens' },
    { id: 'url', name: 'URL Encoder', icon: <FiTerminal />, desc: 'Encode & decode URI components' },
    { id: 'cron', name: 'CRON Explainer', icon: <FiClock />, desc: 'Parse cron schedules to English' },
    { id: 'sql', name: 'SQL Formatter', icon: <FiFileText />, desc: 'Format & uppercase SQL queries' },
  ];

  return (
    <>
      <Helmet>
        <title>Free Online Developer Tools & Web Utilities Suite | Shavin Joseph</title>
        <meta name="description" content="Free, 100% private online developer utility tools. Includes instant JSON Formatter, Base64 Encoder/Decoder, JWT Decoder, SHA-256 Hash Generator, UUID v4 Generator, URL Encoder, CRON Explainer, and SQL Formatter." />
        <link rel="canonical" href="https://shavinjoseph.me/tools" />
        <meta property="og:title" content="Free Online Developer Utility Suite | Shavin Joseph" />
        <meta property="og:description" content="Zero-latency browser utility suite for engineers and sysadmins. 100% private client-side execution." />
        <meta property="og:url" content="https://shavinjoseph.me/tools" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Developer Utility Suite",
            "url": "https://shavinjoseph.me/tools",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript",
            "author": {
              "@type": "Person",
              "name": "Shavin Joseph",
              "url": "https://shavinjoseph.me"
            }
          })}
        </script>
      </Helmet>

      <main className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[color:var(--theme-main)]/10 text-[color:var(--theme-main)] border border-[color:var(--theme-main)]/20 font-mono text-xs font-bold mb-4"
          >
            <FiZap /> 100% Client-Side • Zero Latency • Private & Secure
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Developer Utility <span className="text-[color:var(--theme-main)]">Hub</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-base sm:text-lg"
          >
            High-speed daily engineering tools. Process JSON, Base64, JWTs, hashes, SQL, and CRON schedules instantly in your browser.
          </motion.p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {toolsList.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all duration-300 ${
                activeTab === t.id
                  ? 'bg-[var(--theme-main)] text-white shadow-lg shadow-[color:var(--theme-main)]/20 scale-105'
                  : 'bg-white dark:bg-[#12151b] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[color:var(--theme-main)]/40'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              {t.name}
            </button>
          ))}
        </div>

        {/* TOOL PANEL CONTAINER */}
        <div className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          
          {/* 1. JSON FORMATTER */}
          {activeTab === 'json' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiCode className="text-[color:var(--theme-main)]" /> JSON Formatter & Validator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Prettify, validate syntax, and minify JSON payload strings.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => formatJson(2)} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 font-mono text-xs font-bold hover:bg-[color:var(--theme-main)] hover:text-white transition-colors">
                    Prettify
                  </button>
                  <button onClick={minifyJson} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 font-mono text-xs font-bold hover:bg-[color:var(--theme-main)] hover:text-white transition-colors">
                    Minify
                  </button>
                  {jsonOutput && (
                    <button onClick={() => copyToClipboard(jsonOutput, 'json')} className="px-3 py-1.5 rounded-xl bg-[var(--theme-main)] text-white font-mono text-xs font-bold flex items-center gap-1">
                      {copiedKey === 'json' ? <FiCheck /> : <FiCopy />} Copy
                    </button>
                  )}
                </div>
              </div>

              {jsonError && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono flex items-center gap-2">
                  <FiAlertCircle className="flex-shrink-0 text-base" /> {jsonError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Input Raw JSON</label>
                  <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows={12}
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none focus:border-[color:var(--theme-main)]"
                    placeholder="Paste JSON here..."
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Formatted Output</label>
                  <textarea
                    readOnly
                    value={jsonOutput}
                    rows={12}
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none"
                    placeholder="Result appears here..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. BASE64 ENCODER / DECODER */}
          {activeTab === 'base64' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiLock className="text-[color:var(--theme-main)]" /> Base64 Encoder & Decoder
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Convert plain text into Base64 format or decode encoded strings.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setBase64Mode('encode')} 
                    className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${base64Mode === 'encode' ? 'bg-[var(--theme-main)] text-white' : 'bg-slate-100 dark:bg-white/10'}`}
                  >
                    Encode
                  </button>
                  <button 
                    onClick={() => setBase64Mode('decode')} 
                    className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${base64Mode === 'decode' ? 'bg-[var(--theme-main)] text-white' : 'bg-slate-100 dark:bg-white/10'}`}
                  >
                    Decode
                  </button>
                  {base64Output && (
                    <button onClick={() => copyToClipboard(base64Output, 'b64')} className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-mono text-xs font-bold flex items-center gap-1">
                      {copiedKey === 'b64' ? <FiCheck /> : <FiCopy />} Copy
                    </button>
                  )}
                </div>
              </div>

              {base64Error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono flex items-center gap-2">
                  <FiAlertCircle className="flex-shrink-0 text-base" /> {base64Error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">
                    Input Text ({base64Mode.toUpperCase()})
                  </label>
                  <textarea
                    value={base64Input}
                    onChange={(e) => setBase64Input(e.target.value)}
                    rows={8}
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none focus:border-[color:var(--theme-main)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Output Result</label>
                  <textarea
                    readOnly
                    value={base64Output}
                    rows={8}
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. JWT DECODER */}
          {activeTab === 'jwt' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 dark:border-white/10 pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FiKey className="text-[color:var(--theme-main)]" /> JWT Token Inspector
                </h2>
                <p className="text-xs text-slate-500 mt-1">Decode JSON Web Token headers and payload parameters instantly on your device.</p>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Paste JWT Encoded Token</label>
                <textarea
                  value={jwtInput}
                  onChange={(e) => setJwtInput(e.target.value)}
                  rows={3}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none focus:border-[color:var(--theme-main)]"
                  placeholder="eyJhbGciOiJIUzI1Ni..."
                />
              </div>

              {jwtError && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono flex items-center gap-2">
                  <FiAlertCircle /> {jwtError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs font-bold uppercase text-red-500">Header (Algorithm & Type)</label>
                    {jwtHeader && (
                      <button onClick={() => copyToClipboard(jwtHeader, 'jwth')} className="text-xs font-mono font-bold flex items-center gap-1 text-slate-500 hover:text-[color:var(--theme-main)]">
                        {copiedKey === 'jwth' ? <FiCheck /> : <FiCopy />} Copy
                      </button>
                    )}
                  </div>
                  <textarea readOnly value={jwtHeader} rows={8} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs text-red-400" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs font-bold uppercase text-purple-500">Payload (Data Claims)</label>
                    {jwtPayload && (
                      <button onClick={() => copyToClipboard(jwtPayload, 'jwtp')} className="text-xs font-mono font-bold flex items-center gap-1 text-slate-500 hover:text-[color:var(--theme-main)]">
                        {copiedKey === 'jwtp' ? <FiCheck /> : <FiCopy />} Copy
                      </button>
                    )}
                  </div>
                  <textarea readOnly value={jwtPayload} rows={8} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs text-purple-400" />
                </div>
              </div>
            </div>
          )}

          {/* 4. HASH GENERATOR */}
          {activeTab === 'hash' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 dark:border-white/10 pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FiHash className="text-[color:var(--theme-main)]" /> SHA-256 Cryptographic Hash Generator
                </h2>
                <p className="text-xs text-slate-500 mt-1">Compute SHA-256 digest checksums using the Web Crypto API.</p>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Input Message String</label>
                <textarea
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none focus:border-[color:var(--theme-main)]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">Computed SHA-256 Hash Hex</label>
                  {sha256Output && (
                    <button onClick={() => copyToClipboard(sha256Output, 'hash')} className="text-xs font-mono font-bold flex items-center gap-1 text-[color:var(--theme-main)]">
                      {copiedKey === 'hash' ? <FiCheck /> : <FiCopy />} Copy Hash
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  readOnly
                  value={sha256Output}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs text-[color:var(--theme-main)] font-bold focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* 5. UUID GENERATOR */}
          {activeTab === 'uuid' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiRefreshCw className="text-[color:var(--theme-main)]" /> UUID v4 Generator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Generate cryptographically secure v4 Universally Unique Identifiers.</p>
                </div>
                <div className="flex items-center gap-3">
                  <select 
                    value={uuidCount} 
                    onChange={(e) => setUuidCount(Number(e.target.value))}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 font-mono text-xs font-bold focus:outline-none"
                  >
                    <option value={1}>1 UUID</option>
                    <option value={5}>5 UUIDs</option>
                    <option value={10}>10 UUIDs</option>
                    <option value={20}>20 UUIDs</option>
                  </select>
                  <button onClick={generateUuids} className="px-4 py-2 rounded-xl bg-[var(--theme-main)] text-white font-mono text-xs font-bold flex items-center gap-2">
                    <FiRefreshCw /> Regenerate
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {uuidList.map((uuid, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs">
                    <span>{uuid}</span>
                    <button onClick={() => copyToClipboard(uuid, `uuid-${i}`)} className="text-slate-500 hover:text-[color:var(--theme-main)] transition-colors">
                      {copiedKey === `uuid-${i}` ? <FiCheck className="text-[color:var(--theme-main)]" /> : <FiCopy />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. URL ENCODER */}
          {activeTab === 'url' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiTerminal className="text-[color:var(--theme-main)]" /> URL Encoder & Decoder
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Safely encode or decode URL parameters and query strings.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setUrlMode('encode')} className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold ${urlMode === 'encode' ? 'bg-[var(--theme-main)] text-white' : 'bg-slate-100 dark:bg-white/10'}`}>
                    Encode
                  </button>
                  <button onClick={() => setUrlMode('decode')} className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold ${urlMode === 'decode' ? 'bg-[var(--theme-main)] text-white' : 'bg-slate-100 dark:bg-white/10'}`}>
                    Decode
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Input String</label>
                  <textarea value={urlInput} onChange={(e) => setUrlInput(e.target.value)} rows={6} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none focus:border-[color:var(--theme-main)]" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">Output Result</label>
                    {urlOutput && (
                      <button onClick={() => copyToClipboard(urlOutput, 'url')} className="text-xs font-mono font-bold flex items-center gap-1 text-[color:var(--theme-main)]">
                        {copiedKey === 'url' ? <FiCheck /> : <FiCopy />} Copy
                      </button>
                    )}
                  </div>
                  <textarea readOnly value={urlOutput} rows={6} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* 7. CRON EXPLAINER */}
          {activeTab === 'cron' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 dark:border-white/10 pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FiClock className="text-[color:var(--theme-main)]" /> CRON Expression Explainer
                </h2>
                <p className="text-xs text-slate-500 mt-1">Translate 5-part cron schedule expressions into clear English descriptions.</p>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">CRON Expression (e.g. */15 * * * *)</label>
                <input
                  type="text"
                  value={cronInput}
                  onChange={(e) => setCronInput(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-sm focus:outline-none focus:border-[color:var(--theme-main)] font-bold text-[color:var(--theme-main)]"
                />
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10">
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Human Readable Explanation</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{cronExplanation}</p>
              </div>
            </div>
          )}

          {/* 8. SQL FORMATTER */}
          {activeTab === 'sql' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiFileText className="text-[color:var(--theme-main)]" /> SQL Query Prettifier
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Format raw SQL statements with uppercase keywords and clean indents.</p>
                </div>
                {sqlOutput && (
                  <button onClick={() => copyToClipboard(sqlOutput, 'sql')} className="px-4 py-2 rounded-xl bg-[var(--theme-main)] text-white font-mono text-xs font-bold flex items-center gap-1">
                    {copiedKey === 'sql' ? <FiCheck /> : <FiCopy />} Copy Formatted SQL
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Raw SQL Input</label>
                  <textarea value={sqlInput} onChange={(e) => setSqlInput(e.target.value)} rows={10} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none focus:border-[color:var(--theme-main)]" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Formatted SQL Output</label>
                  <textarea readOnly value={sqlOutput} rows={10} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0c10] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none text-[color:var(--theme-main)] font-bold" />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
