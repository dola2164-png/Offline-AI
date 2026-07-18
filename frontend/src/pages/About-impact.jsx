export default function About() {
  const s = [
    { icon:'👨‍🌾', name:'Ramkumar Roy', role:'Wheat farmer', quote:'"Made ₹18,000 more on that one batch alone by checking the right mandi price first."', tag:'💰 Saved ₹18,000' },
    { icon:'👩‍🌾', name:'Savitri Devi', role:'Rice farmer', quote:'"The agent said 60% chance of rain. I covered my paddy in time. I lost nothing."', tag:'🌦️ Crop saved' },
    { icon:'🧑‍💼', name:'Rahul Kumar', role:'Small trader', quote:'"Got a message — driver name, ₹1,100 rate. No middleman. Just done."', tag:'🚛 Booked in 2 mins' },
  ];
  const stats = [
    { num:'600M+', text:'Feature phone users reachable without internet' },
    { num:'0', text:'Apps, data plans, or smartphones needed' },
    { num:'22+', text:'Indian languages supported via Bhashini' },
    { num:'∞', text:'Scalable across any IVR-capable nation worldwide' },
  ];
  const feats = [
    { title:'Bridges the digital divide', desc:'Rural users access the same internet services as urban smartphone users — through a voice call.' },
    { title:'Eliminates middlemen', desc:'Farmers connect directly to markets and service providers — no agents, no commission cuts.' },
    { title:'Price transparency', desc:'Real-time mandi data means farmers decide when and where to sell — not the trader standing in front of them.' },
    {title: 'AI crop diagnosis & treatment',desc: 'Farmers describe crop symptoms by voice, and AI identifies diseases and suggests treatments in their language.'},
    { title:'Replicable globally', desc:'Any country with IVR telecom and offline rural users can deploy this model immediately.' },
  ];
  const colors = ['var(--gold)', '#4ade80', '#60a5fa', 'var(--s)'];
  return (
    <main style={{ paddingTop:20 }}>
      <section id="impact" style={{ background:'var(--g)' }}>
        <p className="sl" style={{ color:'var(--gold)' }}>Why it matters</p>
        <h2 className="st" style={{ color:'#fff' }}>Rural India, <span style={{ color:'var(--gold)' }}>connected</span></h2>
        <div className="ig">{stats.map((st, i) => <div className="ic" key={i}><div className="in2" style={{ color:colors[i] }}>{st.num}</div><div className="il">{st.text}</div></div>)}</div>
        <div className="ibs" style={{ gridTemplateColumns:'1fr' ,gap:'2px'}}>{feats.map((f, i) => <div className="ib" key={i} style={{ alignItems:'center' }}><div className="ibic" /><div style={{ color:'#fff' }}><h4 style={{ color:'#fff', display:'inline', marginRight:10 }}>{f.title} —</h4><span style={{ color:'#fff' }}>{f.desc}</span></div></div>)}</div>
      </section>
      <section id="stories">
        <p className="sl">Real impact</p>
        <h2 className="st">Stories from the <span>field</span></h2>
        <div className="sg">{s.map((st, i) => <div className="sc" key={i}><div className="sav">{st.icon}</div><div className="sn">{st.name}</div><div className="sr">{st.role}</div><p className="sq">{st.quote}</p><div className="sres">{st.tag}</div></div>)}</div>
      </section>
    </main>
  );
}