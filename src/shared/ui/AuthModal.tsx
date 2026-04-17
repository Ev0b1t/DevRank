type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 py-6">
      <div className="w-full max-w-xl rounded-4xl border border-white/10 bg-slate-950/95 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#89b8fc]">Требуется вход</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Вы не вошли в аккаунт</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Чтобы перейти на эту страницу, нужно авторизоваться. Пожалуйста, войдите или зарегистрируйтесь и повторите попытку.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
