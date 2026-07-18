import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneDemo from '../components/PhoneDemo';

const L = ['English', 'Hindi'];

const translations = {
  English: {
    heroEyebrow: 'Offline Internet Proxy',
    heroTitle1: 'The internet,',
    heroTitle2: 'through a',
    howItWorksCta: 'How it Works',
    heroTitleEm: 'phone call.',
    heroSub: 'No internet, no apps, no smartphones required. Offline AI delivers real-time market prices, crop disease detection-treatment, transport booking, government services, and weather updates - to 600M+ feature phone users across 20+ Indian languages.',
    heroCta: 'Talk to the AI agent',
    howItWorksCta: 'How it Works',
    demoText: 'DEMO',
    featuresEyebrow: 'What it does',
    featuresTitle1: 'Built for',
    featuresTitleSpan: 'Bharat',
    featuresSub: 'Core capabilities, one feature phone, zero internet.',
    compareEyebrow: 'Traditional vs Offline AI',
    compareTitle1: 'Why this is',
    compareTitleSpan: 'different',
    compareSub: 'No existing solution covers this exact gap — agentic AI over IVR, in regional languages, with zero internet dependency.',
    tableHeaders: ['Capability', 'Traditional IVR', 'Smartphone App', 'Offline AI', 'NEW'],
    involveEyebrow: 'Join the mission',
    involveTitle1: 'Help us reach',
    involveTitleEm: 'every village',
    involveCta: 'Get in touch',
    F: [
      { icon: '🎙️', title: 'Multi-language voice', desc: 'Hindi, Bengali, Tamil, Telugu, Marathi and 17 more.' },
      { icon: '📱', title: 'Feature phone only', desc: 'No internet, no app, no smartphone required.' },
      { icon: '💰', title: 'Live mandi prices', desc: 'Real-time crop prices from mandis across India.' },
      { icon: '🌦️', title: 'Weather updates', desc: 'Hyperlocal forecasts in the local spoken language suggest the best crop to harvest at any time of the year.' },
      { icon: '🌾', title: 'Crop disease detection', desc: 'Describe symptoms over a call and get instant diagnosis with treatment advice.' },
      { icon: '🚛', title: 'Transport booking', desc: 'AI finds trucks, negotiates price via SMS and confirms booking.' },
      { icon: '🏛️', title: 'Public services', desc: 'Navigate government portals and check subsidies.' },
    ],
    C: [
      { c: 'Works on feature phone', ivr: '✓ Yes', ivrClass: 'good', app: '✗ No', appClass: 'bad', ai: '✓ Yes', aiClass: 'good' },
      { c: 'No internet needed', ivr: '✓ Yes', ivrClass: 'good', app: '✗ No', appClass: 'bad', ai: '✓ Yes', aiClass: 'good' },
      { c: 'Regional language voice', ivr: '✗ Limited', ivrClass: 'bad', app: '✗ Mostly English', appClass: 'bad', ai: '✓ 22+ languages', aiClass: 'good' },
      { c: 'Understands free-form speech', ivr: '✗ Menu only', ivrClass: 'bad', app: '✓ Yes', appClass: 'good', ai: '✓ Yes', aiClass: 'good' },
      { c: 'Executes multi-step tasks', ivr: '✗ No', ivrClass: 'bad', app: '✗ Manual', appClass: 'bad', ai: '✓ Agentic AI', aiClass: 'good' },
      { c: 'Auto-negotiates prices', ivr: '✗ No', ivrClass: 'bad', app: '✗ No', appClass: 'bad', ai: '✓ AI negotiates', aiClass: 'good' },
      { c: 'Crop disease diagnosis & treatment', ivr: '✗ No', ivrClass: 'bad', app: '△ Limited', appClass: 'bad', ai: '✓ From voice description', aiClass: 'good' },
      { c: 'Live market + weather data', ivr: '✗ No', ivrClass: 'bad', app: '✓ Yes', appClass: 'good', ai: '✓ Yes', aiClass: 'good' },
    ]
  },
  Hindi: {
    heroEyebrow: 'ऑफ़लाइन इंटरनेट प्रॉक्सी',
    heroTitle1: 'इंटरनेट,',
    heroTitle2: 'एक',
    heroTitleEm: 'फ़ोन कॉल के ज़रिए।',
    heroSub: 'बिना इंटरनेट, बिना ऐप और बिना स्मार्टफोन के। ऑफ़लाइन एआई 20+ भारतीय भाषाओं में 60 करोड़+ फीचर फोन उपयोगकर्ताओं को रीयल-टाइम बाजार मूल्य, फसल रोग की पहचान, ट्रांसपोर्ट बुकिंग, सरकारी सेवाएं और मौसम के अपडेट प्रदान करता है।',
    heroCta: 'एआई एजेंट से बात करें',
    howItWorksCta: 'यह कैसे काम करता है',
    howItWorksCta: 'यह कैसे काम करता है',
    demoText: 'डेमो',
    featuresEyebrow: 'यह क्या करता है',
    featuresTitle1: '',
    featuresTitleSpan: 'भारत',
    featuresTitle2: ' के लिए निर्मित',
    featuresSub: 'मुख्य क्षमताएं, एक फीचर फोन, शून्य इंटरनेट।',
    compareEyebrow: 'पारंपरिक बनाम ऑफ़लाइन एआई',
    compareTitle1: 'यह',
    compareTitleSpan: 'अलग',
    compareTitle2: ' क्यों है',
    compareSub: 'कोई भी मौजूदा समाधान इस अंतर को नहीं भरता — बिना इंटरनेट के, क्षेत्रीय भाषाओं में IVR पर एजेंटिक एआई।',
    tableHeaders: ['क्षमता', 'पारंपरिक IVR', 'स्मार्टफोन ऐप', 'ऑफ़लाइन एआई', 'नया'],
    involveEyebrow: 'मिशन से जुड़ें',
    involveTitle1: '',
    involveTitleEm: 'हर गांव',
    involveTitle2: ' तक पहुंचने में हमारी मदद करें',
    involveCta: 'संपर्क करें',
    F: [
      { icon: '🎙️', title: 'बहुभाषी आवाज़', desc: 'हिंदी, बंगाली, तमिल, तेलुगु, मराठी और 17 अन्य।' },
      { icon: '📱', title: 'केवल फीचर फोन', desc: 'बिना इंटरनेट, बिना ऐप, बिना स्मार्टफोन के।' },
      { icon: '💰', title: 'लाइव मंडी भाव', desc: 'पूरे भारत की मंडियों से रीयल-टाइम फसल के भाव।' },
      { icon: '🌦️', title: 'मौसम के अपडेट', desc: 'स्थानीय बोली में हाइपरलोकल पूर्वानुमान।' },
      { icon: '🌾', title: 'फसल रोग की पहचान', desc: 'कॉल पर लक्षणों का वर्णन करें और उपचार सलाह के साथ तुरंत निदान प्राप्त करें।' },
      { icon: '🚛', title: 'ट्रांसपोर्ट बुकिंग', desc: 'एआई ट्रक ढूंढता है, एसएमएस के जरिए कीमत तय करता है और बुकिंग कन्फर्म करता है।' },
      { icon: '🏛️', title: 'सार्वजनिक सेवाएं', desc: 'सरकारी पोर्टलों पर नेविगेट करें और सब्सिडी की जांच करें।' },
    ],
    C: [
      { c: 'फीचर फोन पर काम करता है', ivr: '✓ हां', ivrClass: 'good', app: '✗ नहीं', appClass: 'bad', ai: '✓ हां', aiClass: 'good' },
      { c: 'इंटरनेट की जरूरत नहीं', ivr: '✓ हां', ivrClass: 'good', app: '✗ नहीं', appClass: 'bad', ai: '✓ हां', aiClass: 'good' },
      { c: 'क्षेत्रीय भाषा की आवाज़', ivr: '✗ सीमित', ivrClass: 'bad', app: '✗ ज्यादातर अंग्रेजी', appClass: 'bad', ai: '✓ 22+ भाषाएं', aiClass: 'good' },
      { c: 'स्वतंत्र बातचीत समझता है', ivr: '✗ केवल मेनू', ivrClass: 'bad', app: '✓ हां', appClass: 'good', ai: '✓ हां', aiClass: 'good' },
      { c: 'मल्टी-स्टेप कार्य करता है', ivr: '✗ नहीं', ivrClass: 'bad', app: '✗ मैनुअल', appClass: 'bad', ai: '✓ एजेंटिक एआई', aiClass: 'good' },
      { c: 'कीमतों पर मोलभाव', ivr: '✗ नहीं', ivrClass: 'bad', app: '✗ नहीं', appClass: 'bad', ai: '✓ एआई मोलभाव करता है', aiClass: 'good' },
      { c: 'फसल रोग निदान एवं उपचार', ivr: '✗ नहीं', ivrClass: 'bad', app: '△ सीमित', appClass: 'bad', ai: '✓ आवाज़ विवरण से', aiClass: 'good' },
      { c: 'लाइव मार्केट + मौसम का डेटा', ivr: '✗ नहीं', ivrClass: 'bad', app: '✓ हां', appClass: 'good', ai: '✓ हां', aiClass: 'good' },
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState('English');
  const t = translations[lang]; // This pulls the correct language object dynamically

  return (
    <main>
      <div className="lb">
        <div className="lps">
          {L.map(l => (
            <button 
              key={l} 
              className={`lp${l === lang ? ' on' : ''}`} 
              onClick={() => setLang(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      
      <section id="hero" style={{ position: 'relative', minHeight: '100vh' }}>
        <div className="ht">
          <p className="ey">{t.heroEyebrow}</p>
          <h1 id="h1txt">
            {t.heroTitle1}<br />{t.heroTitle2} <em>{t.heroTitleEm}</em>
          </h1>
          <p id="hsub">{t.heroSub}</p>
          <div className="cta">
            <Link to="/talk-to-agent" className="bp">{t.heroCta}</Link>
          <a href="/video.mp4" target="_blank" className="bp">{t.howItWorksCta}</a>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: 'auto' }}>
          <span style={{ fontSize: 40, letterSpacing: 2, color: 'rgba(245,238,238,0.5)' }}>{t.demoText}</span>
          <PhoneDemo />
        </div>
      </section>

      <section id="features">
        <p className="sl">{t.featuresEyebrow}</p>
        <h2 className="st">{t.featuresTitle1} <span>{t.featuresTitleSpan}</span>{t.featuresTitle2 || ''}</h2>
        <p className="ss">{t.featuresSub}</p>
        <div className="fg">
          {t.F.map((f, i) => (
            <div className="fc" key={i}>
              <div className="fi2">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="compare">
        <p className="sl">{t.compareEyebrow}</p>
        <h2 className="st">{t.compareTitle1} <span>{t.compareTitleSpan}</span>{t.compareTitle2 || ''}</h2>
        <p className="ss" style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}>{t.compareSub}</p>
        <table className="ctbl">
          <thead>
            <tr>
              <th>{t.tableHeaders[0]}</th>
              <th>{t.tableHeaders[1]}</th>
              <th>{t.tableHeaders[2]}</th>
              <th>{t.tableHeaders[3]} <span className="bdg">{t.tableHeaders[4]}</span></th>
            </tr>
          </thead>
          <tbody>
            {t.C.map((r, i) => (
              <tr key={i}>
                <td>{r.c}</td>
                <td className={r.ivrClass}>{r.ivr}</td>
                <td className={r.appClass}>{r.app}</td>
                <td className={r.aiClass}>{r.ai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="involve">
        <p className="sl">{t.involveEyebrow}</p>
        <h2>{t.involveTitle1} <em>{t.involveTitleEm}</em>{t.involveTitle2 || ''}</h2>
        <div className="ivcta">
          <a href="mailto:sayani@offlineai.in" className="bp">{t.involveCta}</a>
        </div>
      </section>
    </main>
  );
}