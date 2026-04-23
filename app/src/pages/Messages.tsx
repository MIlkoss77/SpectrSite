import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { Shield, Trash2, Mail, Inbox, Clock } from "lucide-react";

export default function Messages() {
  const navigate = useNavigate();
  const { user, isLoading, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
    if (!isLoading && user && !isAdmin) {
      navigate("/");
    }
  }, [isLoading, user, isAdmin, navigate]);

  const { data: messages, isLoading: messagesLoading, refetch } = trpc.contact.list.useQuery(undefined, {
    enabled: isAdmin,
    retry: false,
  });

  const deleteMutation = trpc.contact.delete.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) {
    return (
      <main className="relative z-10 pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="relative z-10 pt-[72px]">
      <section className="px-6 py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#00FFFF]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00FFFF]/60">
                  Admin Dashboard
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
            </div>
            <span className="bg-[rgba(0,255,255,0.1)] text-[#00FFFF] text-sm font-medium px-4 py-2 rounded-full">
              {messages?.length || 0} messages
            </span>
          </div>

          {/* Messages Table */}
          <div className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl overflow-hidden">
            {messagesLoading ? (
              <div className="py-20 text-center text-white/40">Loading messages...</div>
            ) : !messages || messages.length === 0 ? (
              <div className="py-20 text-center">
                <Inbox className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 text-sm">No messages yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Name</th>
                      <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Email</th>
                      <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Subject</th>
                      <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Message</th>
                      <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Date</th>
                      <th className="text-right text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr
                        key={msg.id}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-white">{msg.name}</td>
                        <td className="px-6 py-4">
                          <a
                            href={`mailto:${msg.email}`}
                            className="flex items-center gap-1.5 text-sm text-[#00FFFF] hover:text-[#00E396] transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {msg.email}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.05] text-white/60">
                            {msg.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/60 max-w-[300px] truncate">
                          {msg.message}
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-xs text-white/40 font-mono-data">
                            <Clock className="w-3 h-3" />
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm("Delete this message?")) {
                                deleteMutation.mutate({ id: msg.id });
                              }
                            }}
                            className="text-white/30 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
