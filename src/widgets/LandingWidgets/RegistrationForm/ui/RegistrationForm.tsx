import { useState, type ChangeEvent, type FormEvent } from "react";
import { signUp } from "@/src/shared/api/auth";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    role: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Регистрация...");

    const { data, error } = await signUp(formData.email, formData.password);
    if (error) {
      setStatus(`Ошибка регистрации: ${error.message}`);
      console.error(error);
      return;
    }

    setStatus("Пользователь успешно зарегистрирован. Проверьте почту для подтверждения.");
    console.log("Registration data:", formData, data);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#5b9cf6]/20 bg-[#0d1628] p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(91,156,246,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(200,168,255,0.08)_0%,transparent_70%)]" />

      <div className="mb-7">
        <div className="mb-3 flex items-center gap-2 ">
          <div className="h-1.5 w-1.5 rounded-full bg-[#5b9cf6] " />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5b9cf6]">
            Register with DevRank
          </span>
        </div>
        <h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-[26px]">
          Become an early access partner
        </h2>
        <p className="text-[13px] leading-relaxed text-slate-500">
          Fill in your details and start scoring candidates by real technical signals.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>

        <div className="grid gap-1.5">
          <label className="text-xs font-medium text-slate-400">Full name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-[#5b9cf6]/60 focus:ring-2 focus:ring-[#5b9cf6]/20"
          />
        </div>


        <div className="grid gap-1.5">
          <label className="text-xs font-medium text-slate-400">Email address</label>
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
            <label className="text-xs font-medium text-slate-400">Password</label>
            <span className="text-[11px] text-[#5b9cf6]">8+ characters</span>
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-slate-400">Company</label>
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
            <label className="text-xs font-medium text-slate-400">Role</label>
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

        <div className="my-1 h-px bg-white/[0.07]" />

        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] leading-relaxed text-slate-600">
            All fields optional.<br />No spam, ever.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-[#5b9cf6] via-[#6ea8ff] to-[#c8a8ff] px-6 py-3 text-sm font-semibold text-[#0d1628] shadow-[0_16px_40px_rgba(91,156,246,0.25)] transition hover:brightness-105"
          >
            Create account →
          </button>
        </div>

        {status ? (
          <p className="text-center text-sm text-slate-300">{status}</p>
        ) : null}
      </form>

      <p className="mt-5 text-center text-[11px] text-slate-600">
        Already have an account?{" "}
        <span className="cursor-pointer text-[#5b9cf6]">Sign in</span>
      </p>
    </div>
  );
};