import { useState, type ChangeEvent, type FormEvent } from "react";
import { signIn, signUp } from "@/src/shared/api/auth";

type RegistrationModalProps = {
  open: boolean;
  onClose: () => void;
};

export const RegistrationModal = ({
  open,
  onClose,
}: RegistrationModalProps) => {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    role: "",
  });
  const [status, setStatus] = useState("");

  const resetForm = (newMode: "register" | "login") => {
    setMode(newMode);
    setFormData({
      name: "",
      email: "",
      password: "",
      company: "",
      role: "",
    });
    setStatus("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(mode === "register" ? "Регистрация..." : "Вход...");

    if (mode === "register") {
      const { data, error } = await signUp(formData.email, formData.password);
      if (error) {
        setStatus(`Ошибка регистрации: ${error.message}`);
        console.error(error);
        return;
      }

      setStatus(
        "Пользователь успешно зарегистрирован. Проверьте почту для подтверждения.",
      );
      console.log("Registration data:", formData, data);
      return;
    }

    const { data, error } = await signIn(formData.email, formData.password);
    if (error) {
      setStatus(`Ошибка входа: ${error.message}`);
      console.error(error);
      return;
    }

    setStatus("Вы успешно вошли в систему.");
    console.log("Login data:", formData, data);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-7 py-9">
      <div className="w-full max-w-2xl rounded-4xl border border-white/10 bg-slate-950/95 p-5 shadow-[0_32px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-[#5b9cf6]/20 bg-[#0d1628] p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(91,156,246,0.12)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(200,168,255,0.08)_0%,transparent_70%)]" />

          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2 ">
              <div className="h-1.5 w-1.5 rounded-full bg-[#5b9cf6] " />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5b9cf6]">
                {mode === "register" ? "Register with DevRank" : "Sign in to DevRank"}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-[26px]">
              {mode === "register"
                ? "Become an early access partner"
                : "Welcome back"}
            </h2>
            <p className="text-[13px] leading-relaxed text-slate-500">
              {mode === "register"
                ? "Fill in your details and start scoring candidates by real technical signals."
                : "Enter your email and password to continue to your dashboard."}
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-slate-400">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-[#5b9cf6]/60 focus:ring-2 focus:ring-[#5b9cf6]/20"
                />
              </div>
            ) : null}

            <div className="grid gap-1.5">
              <label className="text-xs font-medium text-slate-400">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-[#5b9cf6]/60 focus:ring-2 focus:ring-[#5b9cf6]/20"
              />
            </div>

            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-400">
                  Password
                </label>
                {mode === "register" ? (
                  <span className="text-[11px] text-[#5b9cf6]">8+ characters</span>
                ) : null}
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-[#5b9cf6]/60 focus:ring-2 focus:ring-[#5b9cf6]/20"
              />
            </div>

            {mode === "register" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <label className="text-xs font-medium text-slate-400">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-[#5b9cf6]/60 focus:ring-2 focus:ring-[#5b9cf6]/20"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-medium text-slate-400">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="HR Manager"
                    className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-[#5b9cf6]/60 focus:ring-2 focus:ring-[#5b9cf6]/20"
                  />
                </div>
              </div>
            ) : null}

            <div className="my-1 h-px bg-white/[0.07]" />

            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] leading-relaxed text-slate-600">
                {mode === "register"
                  ? "All fields optional. No spam, ever."
                  : "Enter your details to access your account."}
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-[#5b9cf6] via-[#6ea8ff] to-[#c8a8ff] px-6 py-3 text-sm font-semibold text-[#0d1628] shadow-[0_16px_40px_rgba(91,156,246,0.25)] transition hover:brightness-105"
              >
                {mode === "register" ? "Create account →" : "Sign in →"}
              </button>
            </div>

            {status ? (
              <p className="text-center text-sm text-slate-300">{status}</p>
            ) : null}
          </form>

          <p className="mt-5 text-center text-[11px] text-slate-600">
            {mode === "register" ? (
              <>Already have an account? <span onClick={() => resetForm("login")} className="cursor-pointer text-[#5b9cf6]">Sign in</span></>
            ) : (
              <>New here? <span onClick={() => resetForm("register")} className="cursor-pointer text-[#5b9cf6]">Create account</span></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

