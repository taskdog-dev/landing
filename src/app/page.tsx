import {
  ArrowRight,
  Github,
  Zap,
  TrendingUp,
  Shield,
  Lock,
  Server,
  ShieldCheck,
  FileText,
  CircleCheckBig,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { TaskFlow } from "./task-flow";

const painPoints = [
  "fixing failing tests",
  "updating dependencies",
  "addressing bug reports",
  "resolving CI failures",
  "implementing small feature requests",
];

const pipeline = [
  { label: "Task created", icon: "📋" },
  { label: "Repo analyzed", icon: "🔍" },
  { label: "Minimal patch", icon: "⚡" },
  { label: "PR opened", icon: "✅" },
];

const steps = [
  {
    num: "01",
    title: "Install the TaskDog GitHub App",
    desc: "One click to connect your repository.",
  },
  {
    num: "02",
    title: "Label an issue",
    desc: "Add the taskdog label to any issue.",
  },
  {
    num: "03",
    title: "TaskDog analyzes the repository",
    desc: "Understands your codebase, style, and conventions.",
  },
  {
    num: "04",
    title: "Generates a minimal patch",
    desc: "Focused, reviewable changes — nothing more.",
  },
  {
    num: "05",
    title: "A pull request appears",
    desc: "Ready for review in your repo.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Remove bottlenecks",
    desc: "Small tasks no longer block your sprint.",
  },
  {
    icon: TrendingUp,
    title: "Increase engineering output",
    desc: "Ship more without hiring more.",
  },
  {
    icon: Shield,
    title: "Stay in control",
    desc: "Every PR is reviewed by your team.",
  },
  {
    icon: Lock,
    title: "Secure by design",
    desc: "Your code, your infrastructure.",
  },
];

const enterprise = [
  { icon: Server, text: "Runner executes in your VPC or on-prem" },
  { icon: ShieldCheck, text: "Code never leaves your infrastructure" },
  { icon: FileText, text: "Audit logs" },
  { icon: CircleCheckBig, text: "Approval gates" },
  { icon: Cpu, text: "Customer-managed LLM endpoints" },
];

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 h-14">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold">
            <span className="text-primary">🐕</span> TaskDog
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="https://docs.taskdog.dev" className="hover:text-foreground transition-colors">
              Docs
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors h-9 px-3 font-mono text-xs font-medium"
            >
              <Github className="w-4 h-4" />
              Install
            </a>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glow bg-primary/5 font-mono text-xs text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Now in beta
          </span>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="mx-auto max-w-[1200px] w-full px-8 relative z-10 pt-[56px] pb-4">
            <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4">
              <p className="animate-fade-in-up opacity-0 font-mono text-3xl md:text-5xl font-bold text-foreground">
                🐕 TaskDog:
              </p>
              <p className="animate-fade-in-up opacity-0 animation-delay-100 font-mono text-sm text-primary/70">
                The sheepdog for your engineering backlog.
              </p>
              <h1 className="animate-fade-in-up opacity-0 animation-delay-200 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Give it a task.
                <br />
                <span className="text-gradient">Get a PR.</span>
              </h1>
            </div>
            {/* Task flow animation */}
            <TaskFlow />
            <div className="max-w-3xl mx-auto text-center space-y-3 mt-8 md:mt-10">
              <p className="animate-fade-in-up opacity-0 animation-delay-300 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                TaskDog is an autonomous AI engineer that turns backlog tasks
                into pull requests.
              </p>
              <div className="animate-fade-in-up opacity-0 animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="glow inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors h-11 px-8 font-semibold text-base"
                >
                  <Github className="w-4 h-4" />
                  Install GitHub App
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground transition-colors h-11 px-8 text-base"
                >
                  See how it works
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="max-w-3xl mx-auto">
              <p className="font-mono text-sm text-primary mb-4">The problem</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Engineering teams waste hours every week on small backlog tasks.
              </h2>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {painPoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 border border-border font-mono text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-lg text-muted-foreground">
                Backlogs grow faster than teams can handle.
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="max-w-3xl mx-auto">
              <p className="font-mono text-sm text-primary mb-4">The solution</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                TaskDog automatically turns backlog tasks into pull requests.
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                Engineers stay in control. TaskDog does the work.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {pipeline.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2 px-4 py-4 rounded-lg bg-card border border-border min-w-[130px] text-center">
                      <span className="text-2xl">{step.icon}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {step.label}
                      </span>
                    </div>
                    {i < pipeline.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-primary hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 md:py-32 border-t border-border">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="max-w-3xl mx-auto">
              <p className="font-mono text-sm text-primary mb-4">How it works</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
                Five steps. Zero setup overhead.
              </h2>
              <div>
                {steps.map((step) => (
                  <div
                    key={step.num}
                    className="group flex gap-6 py-6 border-b border-border last:border-b-0 hover:bg-secondary/30 -mx-4 px-4 rounded-lg transition-colors"
                  >
                    <span className="font-mono text-primary text-sm font-bold mt-0.5">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why TaskDog */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="max-w-3xl mx-auto">
              <p className="font-mono text-sm text-primary mb-4">Why TaskDog</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
                Why teams use TaskDog
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b) => (
                  <div
                    key={b.title}
                    className="p-6 rounded-xl bg-card border border-border hover:border-glow transition-colors group"
                  >
                    <b.icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="max-w-3xl mx-auto">
              <p className="font-mono text-sm text-primary mb-4">Enterprise</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
                Enterprise friendly
              </h2>
              <div className="space-y-4">
                {enterprise.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-4 px-5 py-4 rounded-lg bg-card border border-border"
                  >
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-secondary-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Give it a task.{" "}
                <span className="text-gradient">Get a PR.</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Install TaskDog and watch your backlog start moving.
              </p>
              <a
                href="#"
                className="glow inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors h-11 px-8 font-semibold text-base"
              >
                <Github className="w-4 h-4" />
                Install GitHub App
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mx-auto max-w-[1200px] px-8 mt-24">
            <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold">
                <span className="text-primary">🐕</span> TaskDog
              </Link>
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} TaskDog. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
