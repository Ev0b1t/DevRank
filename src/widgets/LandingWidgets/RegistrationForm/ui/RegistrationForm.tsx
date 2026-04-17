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
    <section className="rounded-4xl border border-white/10 bg-slate-950/95 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-xl">
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#89b8fc]">
          Register with DevRank
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Become an early access partner
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Fill in your details below and start using the candidate scoring dashboard with the same polished style as the rest of the site.
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-2 text-sm text-slate-200">
          <label className="font-medium">Full name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#5b9cf6] focus:ring-2 focus:ring-[#5b9cf6]/20"
          />
        </div>

        <div className="grid gap-2 text-sm text-slate-200">
          <label className="font-medium">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#5b9cf6] focus:ring-2 focus:ring-[#5b9cf6]/20"
          />
        </div>

        <div className="grid gap-2 text-sm text-slate-200">
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#5b9cf6] focus:ring-2 focus:ring-[#5b9cf6]/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2 text-sm text-slate-200">
            <label className="font-medium">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Corp"
              className="rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#5b9cf6] focus:ring-2 focus:ring-[#5b9cf6]/20"
            />
          </div>

          <div className="grid gap-2 text-sm text-slate-200">
            <label className="font-medium">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="HR Manager"
              className="rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#5b9cf6] focus:ring-2 focus:ring-[#5b9cf6]/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            All fields are optional for now.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-[#5b9cf6] via-[#6ea8ff] to-[#c8a8ff] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(91,156,246,0.25)] transition hover:brightness-105"
          >
            Create account
          </button>
        </div>

        {status ? (
          <p className="mt-2 text-sm text-slate-300">{status}</p>
        ) : null}
      </form>
    </section>
  );
};
