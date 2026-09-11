import { AlertCircle, XCircle } from 'lucide-react';

export function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      className="bg-vermelho text-off-white text-sm h-15  text-center flex items-center justify-center font-corpo font-medium rounded-2xl"
    >
      <AlertCircle size={20} color="off-white" style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
      
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            color: '#9B1C1C',
          }}
        >
          <XCircle size={18} />
        </button>
      )}
    </div>
  );
}