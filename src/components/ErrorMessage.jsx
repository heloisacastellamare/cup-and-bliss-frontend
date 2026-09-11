import { AlertCircle, XCircle } from 'lucide-react';

export function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#FDF2F2', // Vermelho/Rosa suave
        border: '1px solid #FDE8E8',
        color: '#9B1C1C',
        padding: '12px 16px',
        borderRadius: '8px',
        margin: '12px 0',
        fontSize: '14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <AlertCircle size={20} color="#E02424" style={{ flexShrink: 0 }} />
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