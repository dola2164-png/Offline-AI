import React, { useState } from 'react';

export default function PhoneDemo() {
  const [msgs, setMsgs] = useState([
    { t:'sys', tx:'English detected · Call connected' },
    { t:'user', tx:'What is the price of wheat today?' },
    { t:'ai', tx:'Wheat at Kolkata Market is ₹2,180/quintal today. It is ₹40 up from yesterday — good time to sell! 📈' }
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