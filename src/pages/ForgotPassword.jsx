import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Mail, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    if (!email) {
      setMensagemErro('Por favor, informe seu e-mail.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/esqueci-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || 'Não foi possível solicitar a redefinição de senha.');
      }

      setMensagemSucesso('Enviamos um e-mail com as instruções para redefinir sua senha!');
      setEmail('');
    } catch (err) {
      setMensagemSucesso(
        'Se o e-mail estiver cadastrado, você receberá um link para redefinição em instantes!'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    /* CONTAINER GLOBAL: Garante o fundo marrom-escuro em 100% da tela */
    <div className="w-full min-h-screen bg-marrom-escuro text-white font-corpo flex flex-col justify-between">
      {/* CONTAINER INTERNO: Mantém o layout mobile bem centralizado */}
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col justify-between p-4">
        {/* CABEÇALHO E FORMULÁRIO */}
        <div>
          <div className="flex items-center gap-4 py-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 border border-rosa-escuro/30 rounded-full text-rosa-escuro hover:bg-rosa-escuro/10 transition active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-bold text-rosa-escuro text-center flex-1 pr-10">
              Recuperação de Senha
            </h2>
          </div>

          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Esqueceu sua senha?</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Não se preocupe! Digite o e-mail cadastrado na sua conta do Cup & Bliss que enviaremos um link de redefinição.
              </p>
            </div>

            {/* MENSAGEM DE SUCESSO */}
            {mensagemSucesso && (
              <div className="bg-green-900/40 border border-green-500/40 text-green-200 p-4 rounded-2xl flex items-start gap-3 text-xs">
                <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p>{mensagemSucesso}</p>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1 font-bold text-rosa-escuro hover:underline pt-1"
                  >
                    Ir para o Login <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* MENSAGEM DE ERRO */}
            {mensagemErro && (
              <div className="bg-red-900/40 border border-red-500/40 text-red-200 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs">
                <AlertCircle size={18} className="text-red-400 shrink-0" />
                <span>{mensagemErro}</span>
              </div>
            )}

            {/* FORMULÁRIO */}
            {!mensagemSucesso && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-rosa-escuro block">E-mail</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      style={{paddingLeft: '2.75rem'}}
                      className="w-full h-12 bg-[#2A1010] border border-rosa-escuro/20 rounded-2xl pl-12 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rosa-escuro focus:ring-1 focus:ring-rosa-escuro transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={carregando}
                  className="w-full bg-rosa-escuro text-white font-extrabold py-3.5 rounded-2xl shadow-lg hover:opacity-90 transition active:scale-95 text-xs disabled:opacity-50 mt-2 cursor-pointer"
                >
                  {carregando ? 'Enviando...' : 'Enviar Link de Recuperação'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RODAPÉ */}
        <div className="py-6 text-center text-xs text-gray-400">
          Lembrou sua senha?{' '}
          <Link to="/login" className="text-rosa-escuro font-bold hover:underline">
            Fazer Login
          </Link>
        </div>
      </div>
    </div>
  );
}