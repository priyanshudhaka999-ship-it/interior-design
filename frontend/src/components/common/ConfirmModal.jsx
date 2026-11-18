import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this action?',
  confirmLabel = 'Confirm Delete',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#292824]/50 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-[#F7F5F0] border border-[#DDD8CE] p-6 shadow-xl">
        <div className="flex items-start justify-between border-b border-[#DDD8CE] pb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#777C61]" />
            <h3 className="font-serif text-lg text-[#292824]">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-[#77746D] hover:text-[#292824]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-4 text-sm text-[#77746D] leading-relaxed">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs uppercase tracking-widest border border-[#DDD8CE] text-[#292824] hover:bg-[#EAE5DC] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs uppercase tracking-widest bg-[#292824] text-[#F7F5F0] hover:bg-[#777C61] transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
