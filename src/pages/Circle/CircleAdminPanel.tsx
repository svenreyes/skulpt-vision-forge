import { useState, type FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteCircleMember, listProfiles, type CircleProfile } from "@/lib/circle";

const GLASS =
  "rounded-2xl border border-white/40 bg-white/25 backdrop-blur-2xl backdrop-saturate-150";
const GLASS_SHADOW = { boxShadow: "inset 0 0 30px rgba(255,255,255,0.08)" };

const inputClass =
  "w-full rounded-xl border border-white/40 bg-white/25 backdrop-blur-md px-4 py-2.5 font-subheading text-[13px] text-white/90 tracking-wide placeholder:text-white/55 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors hover:bg-white/35";

function statusLabel(p: CircleProfile): { label: string; tone: "ok" | "pending" | "admin" } {
  if (p.role === "admin") return { label: "Admin", tone: "admin" };
  if (p.accepted_at) return { label: "Active", tone: "ok" };
  return { label: "Invited", tone: "pending" };
}

export default function CircleAdminPanel() {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const profilesQuery = useQuery({
    queryKey: ["circle", "profiles"],
    queryFn: listProfiles,
  });

  const inviteMutation = useMutation({
    mutationFn: inviteCircleMember,
    onSuccess: (_data, variables) => {
      setFeedback({ kind: "ok", text: `Invite sent to ${variables.email}.` });
      setEmail("");
      setFullName("");
      qc.invalidateQueries({ queryKey: ["circle", "profiles"] });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to send invite.";
      setFeedback({ kind: "err", text: msg });
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setFeedback({ kind: "err", text: "Enter an email address." });
      return;
    }
    inviteMutation.mutate({
      email: trimmedEmail,
      fullName: fullName.trim() || undefined,
    });
  };

  const profiles = profilesQuery.data ?? [];

  return (
    <section
      className="relative z-10 min-h-screen snap-start flex flex-col px-4 sm:px-8 lg:px-10 pt-20 sm:pt-24 pb-10 sm:pb-12 gap-5"
      aria-label="Circle admin panel"
    >
      <header className="flex items-baseline gap-3">
        <h2 className="font-subheading text-white/85 text-2xl sm:text-3xl tracking-wide">
          Admin
        </h2>
        <span className="font-subheading text-white/40 text-[10px] tracking-[0.18em] uppercase">
          Invite-only Circle controls
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5 flex-1 min-h-0">
        {/* Invite card */}
        <div className={`${GLASS} p-6 flex flex-col gap-4`} style={GLASS_SHADOW}>
          <div>
            <p className="font-subheading text-white/85 text-lg tracking-wide">Invite a member</p>
            <p className="font-subheading text-white/55 text-[11px] tracking-wide mt-1 leading-relaxed">
              We'll email them a one-time link. They set their own password and complete their
              profile on first sign-in.
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <label className="sr-only" htmlFor="invite-name">Full name</label>
            <input
              id="invite-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name (optional)"
              className={inputClass}
              maxLength={120}
              disabled={inviteMutation.isPending}
            />

            <label className="sr-only" htmlFor="invite-email">Email</label>
            <input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className={inputClass}
              autoComplete="off"
              required
              disabled={inviteMutation.isPending}
            />

            {feedback && (
              <p
                className={`font-subheading text-xs ${
                  feedback.kind === "ok" ? "text-emerald-200/90" : "text-red-300/90"
                }`}
              >
                {feedback.text}
              </p>
            )}

            <button
              type="submit"
              disabled={inviteMutation.isPending}
              className="mt-1 w-full rounded-xl border border-white/40 bg-white/20 backdrop-blur-md px-5 py-2.5 font-subheading text-[13px] text-white/90 tracking-wide hover:bg-white/30 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors disabled:opacity-60"
            >
              {inviteMutation.isPending ? "Sending…" : "Send invite →"}
            </button>
          </form>
        </div>

        {/* Members list */}
        <div className={`${GLASS} p-6 flex flex-col min-h-0`} style={GLASS_SHADOW}>
          <div className="flex items-baseline justify-between mb-4">
            <p className="font-subheading text-white/85 text-lg tracking-wide">Members</p>
            <span className="font-subheading text-white/45 text-[11px] tracking-wide">
              {profilesQuery.isLoading ? "Loading…" : `${profiles.length} total`}
            </span>
          </div>

          <div className="overflow-y-auto flex-1 min-h-0 -mr-2 pr-2">
            {profilesQuery.error && (
              <p className="font-subheading text-red-300/90 text-xs">
                Failed to load members.
              </p>
            )}

            {!profilesQuery.isLoading && profiles.length === 0 && (
              <p className="font-subheading text-white/55 text-sm">
                No members yet. Send the first invite to start the Circle.
              </p>
            )}

            <ul className="divide-y divide-white/15">
              {profiles.map((p) => {
                const status = statusLabel(p);
                return (
                  <li
                    key={p.id}
                    className="py-3 flex items-center gap-3 font-subheading text-white/80 text-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-white/90">
                        {p.full_name?.trim() || "(no name yet)"}
                      </p>
                      <p className="truncate text-white/55 text-[11px] tracking-wide">
                        {p.email}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] tracking-[0.18em] uppercase ${
                        status.tone === "admin"
                          ? "border-amber-200/50 text-amber-100/90"
                          : status.tone === "ok"
                            ? "border-emerald-200/40 text-emerald-100/90"
                            : "border-white/40 text-white/70"
                      }`}
                    >
                      {status.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
