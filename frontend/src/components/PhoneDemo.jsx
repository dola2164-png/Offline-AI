import React, { useState } from 'react';

export default function PhoneDemo() {
  const [msgs, setMsgs] = useState([
    { t:'sys', tx:'English detected · Call connected' },
    { t:'user', tx:'I want to book a truck from Kolkata to Delhi for tomorrow. Please find me the best available option at the lowest price.' },
    { t:'ai', tx:'Available: offline-ai-truck at ₹20/km for your route from Kolkata  to  delhi.Please wait up to 24 hours — we have sent your request to other registered trucks as well to find you the best price.' }
  ]);
  const [inp, setInp] = useState('');

  const send = () => {
    if (!inp.trim()) return;
    setMsgs(p => [...p, { t:'user', tx:inp }]);
    setInp('');
    setTimeout(() => setMsgs(p => [...p, { t:'ai', tx:'Your request is being processed. The result will be sent via SMS. ✅' }]), 1200);
  };

  return (
    <div className="pf">
      <div className="pb">
        <div className="pn" />
        <div className="ph">
          <div className="ps">TOLL-FREE · 1800-GS-HELP</div>
          <div className="ci"><div className="cd" /><span className="ct">Call Connected</span></div>
        </div>
        <div className="ca">{msgs.map((m, i) => <div key={i} className={`m ${m.t}`}>{m.tx}</div>)}</div>
        <div className="pir">
          <input className="pi" placeholder="Speak your request…" value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
          <button className="sb" onClick={send}>▶</button>
        </div>
      </div>
    </div>
  );
}
