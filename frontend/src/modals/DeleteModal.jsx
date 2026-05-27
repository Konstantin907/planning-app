import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, X } from "lucide-react";

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete note?",
  message = "This action cannot be undone.",
  itemName,
  isLoading = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={!isLoading ? onClose : undefined}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-sm rounded-2xl border border-neutral-700 bg-neutral-900 p-5 shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <AlertTriangle size={20} />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-neutral-800 hover:text-white disabled:opacity-50 cursor-pointer"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-gray-400">{message}</p>

              {itemName && (
                <p className="mt-3 rounded-lg border border-neutral-800 bg-neutral-800/60 px-3 py-2 text-sm text-gray-300 truncate">
                  {itemName}
                </p>
              )}

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
