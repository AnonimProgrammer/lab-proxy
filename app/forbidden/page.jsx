import Button from "../components/Button";

export const metadata = {
  title: "DevForge // access denied",
  description: "You do not have permission to view this area.",
};

export default function ForbiddenPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-panel border border-panel-border rounded-md p-8 text-center">
        <p className="text-secondary text-xs uppercase tracking-[0.4em] mb-4">
          {"// clearance denied"}
        </p>
        <h1 className="text-2xl text-primary font-bold neon-text mb-3">
          Access Restricted
        </h1>
        <p className="text-muted text-sm mb-8">
          This sector is reserved for admin operators. Your session is valid,
          but your clearance level is not high enough.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/dashboard" size="sm">
            Return to dashboard
          </Button>
          <Button href="/" variant="outline" size="sm">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
