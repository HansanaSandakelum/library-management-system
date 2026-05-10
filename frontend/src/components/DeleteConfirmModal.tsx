import { AlertTriangle, X, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={!isDeleting ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#12141c] rounded-2xl shadow-xl border border-[#edeef1] dark:border-[#1c1f2e] w-full max-w-[420px] overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#a0a3b1] hover:text-[#6b7084] hover:bg-[#f4f5f7] dark:hover:text-[#e2e4e9] dark:hover:bg-[#1c1f2e] transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 pt-7 flex gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fef2f2] dark:bg-[#e74c3c]/10 text-[#e74c3c] dark:text-[#ff6b6b] shrink-0">
            <AlertTriangle className="w-[20px] h-[20px]" />
          </div>
          <div className="pt-0.5">
            <h3 className="text-[16px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] mb-1.5">
              {title}
            </h3>
            <p className="text-[13px] text-[#6b7084] dark:text-[#8b8fa3] leading-relaxed pr-2">
              {message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 bg-white dark:bg-[#12141c] border-t border-[#edeef1] dark:border-[#1c1f2e]">
          <button onClick={onClose} disabled={isDeleting} className="btn-outline text-[13px] px-5 py-2.5 disabled:opacity-50">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="btn-danger text-[13px] px-5 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting…
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
