import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';

const PanelSection = ({ title, items, onSelect }) => (
  <div className="p-4 bg-white rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(item)}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <img src={item.preview_url} alt={item.name} className="rounded-lg" />
          <p className="text-center mt-2 text-sm">{item.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const ServerSection = ({ servers }) => (
  <div className="p-4 bg-white rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">Sunucular</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {servers.map((server, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold">{server.name}</h3>
          <p>Status: {server.status}</p>
          <p>Ping: {server.ping} ms</p>
          <p>Region: {server.region}</p>
          <p>Players: {server.players}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [skins, setSkins] = useState([]);
  const [wears, setWears] = useState([]);
  const [servers, setServers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get("https://wormateserkanconnect.github.io/WormX/api/skins.php")
        .then(res => setSkins(res.data)).catch(() => {});
      axios.get("https://wormateserkanconnect.github.io/WormX/api/wear.php")
        .then(res => setWears(res.data)).catch(() => {});
      axios.get("https://wormateserkanconnect.github.io/WormX/api/server_wmxt.php")
        .then(res => setServers(res.data)).catch(() => {});
    }
  }, [user]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">WormX Panel - Hoşgeldin {user}</h1>
      <PanelSection title="Skins" items={skins} onSelect={setSelected} />
      <PanelSection title="Aksesuarlar" items={wears} onSelect={setSelected} />
      <ServerSection servers={servers} />
      {selected && (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Seçilen: {selected.name}</h2>
          <img src={selected.preview_url} alt={selected.name} className="mx-auto" />
        </div>
      )}
    </div>
  );
}
