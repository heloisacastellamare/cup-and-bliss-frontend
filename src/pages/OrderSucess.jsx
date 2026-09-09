import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Camera } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const pedido = location.state?.pedido;

  return (
    <div className="min-h-screen bg-[#1F0A0A] text-white font-corpo flex flex-col justify-between items-center p-6  mx-auto text-center">
      <div className="min-h-screen max-w-md flex-1 flex flex-col items-center justify-center space-y-6">
        {/* ÍCONE DE CHECK */}
        <div className="w-28 h-28 border-2 border-rosa-escuro/50 rounded-2xl flex items-center justify-center">
          <div className="w-20 h-20 border border-white rounded-full flex items-center justify-center">
            <Check size={40} className="text-white" />
          </div>
        </div>

        {/* MENSAGEM */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-rosa-escuro">Pedido Concluído!</h1>
          <p className="text-xs text-gray-300 max-w-xs leading-relaxed">
            Acabamos de receber seu pedido, em breve ele chegará em seu endereço.
          </p>
        </div>

        {/* BOTÃO ACOMPANHAR */}
        <button
          onClick={() => navigate('/acompanhar-pedido', { state: { pedido } })}
          className="bg-rosa-escuro text-white font-bold text-xs py-3.5 px-8 rounded-2xl shadow-md transition active:scale-95"
        >
          Acompanhar Pedido
        </button>
      </div>

      {/* RODAPÉ CONTATO */}
      <div className="space-y-2 text-[11px] text-gray-400 pt-6">
        <p>
          Qualquer dúvida, você pode nos contactar em
          <br />
          <span className="font-bold text-white">(11)99992-9993</span>
        </p>

        <p className="flex items-center justify-center gap-1.5 text-white pt-1">
          ou em nosso Instagram:
        </p>
        <div className="flex items-center justify-center gap-1.5 text-white font-bold">
          <Camera size={16} className="text-rosa-escuro" />
          <span>Cup&Bliss</span>
        </div>
      </div>
    </div>
  );
}