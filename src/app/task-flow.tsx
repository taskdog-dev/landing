"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { ArrowRight, Check, LoaderCircle, Eye, PartyPopper } from "lucide-react";

// List 1: All possible tasks
const ALL_TASKS = [
  "fix login bug",
  "update dependencies",
  "add input validation",
  "resolve CI failure",
  "bump Node version",
  "fix flaky test",
  "add rate limiting",
  "update API docs",
  "fix typo in README",
  "migrate to ESM",
  "add error boundary",
  "fix memory leak",
  "update license year",
  "add retry logic",
  "fix CORS headers",
  "add pagination",
  "fix dark mode toggle",
  "upgrade TypeScript",
  "add webhook handler",
  "fix date formatting",
  "remove dead code",
  "add health check endpoint",
  "fix N+1 query",
  "add request logging",
  "update error messages",
  "fix timezone bug",
  "add CSV export",
  "fix broken link",
  "add breadcrumb nav",
  "fix scroll position",
  "fix race condition",
  "add search indexing",
  "update env example",
  "fix email template",
  "add cache invalidation",
  "rename config keys",
  "fix 404 redirect",
  "add status page",
  "update cron schedule",
  "fix image upload",
  "add slug generator",
  "fix dropdown z-index",
  "add RSS feed",
  "fix mobile menu",
  "update test fixtures",
  "add sitemap.xml",
  "fix hover styles",
  "add robots.txt",
  "fix form reset",
  "bump eslint config",
  "add loading skeleton",
  "fix truncated text",
  "update placeholder copy",
  "add favicon",
  "fix checkbox state",
  "update seed data",
  "add table sorting",
  "fix tooltip alignment",
  "update snapshots",
  "add alt text to images",
  "fix focus outline",
  "update changelog",
  "add env validation",
  "fix stale closure",
  "update docker image",
  "add skip-to-content link",
  "fix Safari rendering",
  "update max-width tokens",
  "add aria labels",
  "fix console warnings",
  "fix CI pipeline",
  "update Dockerfile",
  "add Helm values",
  "fix k8s readiness probe",
  "update nginx config",
  "add Terraform output",
  "fix GitHub Actions",
  "update deploy script",
  "add Prometheus metrics",
  "fix SSL cert renewal",
  "add Grafana dashboard",
  "update CloudFormation",
  "fix log rotation",
  "add backup cron job",
  "update staging env",
  "fix DNS records",
  "add Sentry config",
  "update CDN rules",
  "fix container build",
  "add rollback script",
];

const ROUND_SIZE = 20; // List 2: tasks per round
const VISIBLE = 5;     // List 3: visible at once
const ROW_HEIGHT = 36;

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

type PRStatus = "working" | "ready";

interface BacklogItem {
  id: number;
  text: string;
  done: boolean;
  fading: boolean;
}

interface PRItem {
  prId: number;
  taskId: number;
  prNumber: number;
  prStatus: PRStatus;
  fading: boolean;
}

let nextId = 0;
let nextPR = 1;
let nextPrId = 0;

// Pick N random unique items from array
function pickRandom(arr: string[], n: number): string[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function TaskFlow() {
  // List 2: round queue (20 tasks picked from ALL_TASKS)
  const roundQueue = useRef<string[]>([]);
  // List 3: currently visible
  const [backlog, setBacklog] = useState<BacklogItem[]>([]);
  const [prs, setPRs] = useState<PRItem[]>([]);
  const [allDone, setAllDone] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  }, []);

  // Arrow count = number of actively working PRs (min 0, max 5)
  const arrowCount = Math.min(prs.filter((pr) => pr.prStatus === "working").length, 5);

  // Process one task: done → fade → remove, with PR lifecycle
  const processTask = useCallback((taskId: number, taskText: string, onDone: () => void) => {
    const prNum = nextPR;
    const prId = nextPrId++;
    nextPR = nextPR >= 99 ? 1 : nextPR + 1;

    // Show task in TaskDog block
    setActiveTask(taskText);

    // Mark done (checkmark + strikethrough)
    setBacklog((p) => p.map((t) => t.id === taskId ? { ...t, done: true } : t));

    // PR appears as working
    setPRs((p) => {
      const next = [...p, { prId, taskId, prNumber: prNum, prStatus: "working" as PRStatus, fading: false }];
      return next.slice(-VISIBLE);
    });

    // PR ready after 1.5-2.5s
    const readyDelay = 1500 + Math.random() * 1000;
    later(() => {
      setPRs((p) => p.map((pr) => pr.prId === prId ? { ...pr, prStatus: "ready" } : pr));
      setActiveTask(null);
    }, readyDelay);

    // PR fades after 3s of being ready
    later(() => {
      setPRs((p) => p.map((pr) => pr.prId === prId ? { ...pr, fading: true } : pr));
      later(() => {
        setPRs((p) => p.filter((pr) => pr.prId !== prId));
      }, 600);
    }, readyDelay + 3000);

    // Backlog item fades after 1.2s
    later(() => {
      setBacklog((p) => p.map((t) => t.id === taskId ? { ...t, fading: true } : t));
    }, 1200);

    // Remove from backlog after fade, refill from queue
    later(() => {
      setBacklog((p) => {
        const filtered = p.filter((t) => t.id !== taskId);
        // If there are more in the round queue, add one
        if (roundQueue.current.length > 0) {
          const text = roundQueue.current.shift()!;
          filtered.push({ id: nextId++, text, done: false, fading: false });
        }
        return filtered;
      });
      onDone();
    }, 1800);
  }, [later]);

  // Run one round
  const startRound = useCallback(() => {
    clearTimers();

    // List 2: pick 20 random tasks for this round
    roundQueue.current = pickRandom(ALL_TASKS, ROUND_SIZE);

    // List 3: start empty, populate one by one
    setBacklog([]);
    setPRs([]);
    setAllDone(false);
    setActiveTask(null);
    nextPR = 1;

    const processNext = () => {
      setBacklog((current) => {
        const idle = current.filter((t) => !t.done && !t.fading);
        if (idle.length === 0 && roundQueue.current.length === 0) {
          // All done — fade out remaining PRs, then show celebration
          later(() => {
            setPRs((p) => p.map((pr) => ({ ...pr, fading: true })));
            later(() => {
              setPRs([]);
              setAllDone(true);

              later(() => {
                setRoundCount((c) => c + 1);
              }, 4000);
            }, 600);
          }, 1000);
          return current;
        }

        if (idle.length > 0) {
          const pick = idle[Math.floor(Math.random() * idle.length)];

          later(() => {
            processTask(pick.id, pick.text, () => {
              const delay = 800 + Math.random() * 600;
              later(processNext, delay);
            });
          }, 0);
        }

        return current;
      });
    };

    // Populate backlog items one by one; each item starts processing
    // after a short delay once it lands
    let populateDelay = 800;
    for (let i = 0; i < VISIBLE && roundQueue.current.length > 0; i++) {
      const text = roundQueue.current.shift()!;
      populateDelay += 600 + Math.floor(Math.random() * 800);
      const isFirst = i === 0;
      later(() => {
        setBacklog((p) => [...p, { id: nextId++, text, done: false, fading: false }]);
        // First item kicks off the processing chain after a short settle
        if (isFirst) {
          later(processNext, 1500 + Math.random() * 1000);
        }
      }, populateDelay);
    }
  }, [clearTimers, processTask, later]);

  // Start/restart rounds
  useEffect(() => {
    startRound();
    return () => {
      clearTimers();
    };
  }, [roundCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-20 mb-16 flex items-center justify-center gap-3 md:gap-5 w-full max-w-[1100px] mx-auto scale-[0.85] sm:scale-90 md:scale-100 origin-top">
      {/* Left: Backlog */}
      <div className="rounded-xl border border-border bg-card overflow-hidden w-[220px] md:w-[260px]">
        <div className="px-3 py-2 border-b border-border text-xs font-mono text-muted-foreground">
          Backlog
        </div>
        <div className="overflow-hidden relative" style={{ height: VISIBLE * ROW_HEIGHT }}>
          {allDone && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 animate-fade-in-up z-10">
              <PartyPopper className="w-8 h-8 text-primary" />
              <span className="font-mono text-sm text-primary font-semibold">Backlog clear!</span>
              <span className="font-mono text-xs text-muted-foreground">0 tasks remaining</span>
            </div>
          )}
          {backlog.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-2 px-3 font-mono text-sm transition-opacity duration-500"
              style={{
                height: ROW_HEIGHT,
                opacity: task.fading ? 0 : 1,
              }}
            >
              {task.done ? (
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
              ) : (
                <span className="shrink-0 text-xs">🐑</span>
              )}
              <span
                className={`truncate transition-colors duration-300 ${
                  task.done ? "text-primary/60 line-through" : "text-secondary-foreground"
                }`}
              >
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows left */}
      <div className="flex flex-col gap-2 shrink-0 transition-all duration-500" style={{ minWidth: 16 }}>
        {Array.from({ length: arrowCount }, (_, i) => (
          <ArrowRight key={i} className="w-4 h-4 text-primary animate-slide-right" style={{ animationDelay: `${i * 300}ms` }} />
        ))}
      </div>

      {/* Center: TaskDog block */}
      <div className="rounded-xl border border-glow bg-card glow relative px-8 py-6 md:px-12 md:py-10 min-w-[180px] md:min-w-[220px] h-[140px] md:h-[160px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl md:text-5xl mb-3">🐕</span>
          <span className="font-mono text-lg md:text-xl font-bold text-primary">
            TaskDog
          </span>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <span className="font-mono text-xs h-4 flex items-center gap-1.5 max-w-[160px] md:max-w-[200px]">
            {activeTask ? (
              <>
                <LoaderCircle className="w-3 h-3 animate-spin shrink-0 text-yellow-400" />
                <span className="truncate text-yellow-400 text-[10px]">{activeTask}</span>
              </>
            ) : allDone || backlog.length === 0 ? (
              <span className="text-muted-foreground">autonomous engineer</span>
            ) : null}
          </span>
        </div>
      </div>

      {/* Arrows right */}
      <div className="flex flex-col gap-2 shrink-0 transition-all duration-500" style={{ minWidth: 16 }}>
        {Array.from({ length: arrowCount }, (_, i) => (
          <ArrowRight key={i} className="w-4 h-4 text-primary animate-slide-right" style={{ animationDelay: `${i * 300 + 150}ms` }} />
        ))}
      </div>

      {/* Right: Pull Requests */}
      <div className="rounded-xl border border-border bg-card overflow-hidden w-[220px] md:w-[250px]">
        <div className="px-3 py-2 border-b border-border text-xs font-mono text-muted-foreground flex items-center gap-2">
          <GitHubIcon className="w-3.5 h-3.5" />
          Pull Requests
        </div>
        <div className="overflow-hidden" style={{ height: VISIBLE * ROW_HEIGHT }}>
          {prs.slice(0, VISIBLE).map((pr) => (
            <div
              key={pr.prId}
              className="flex items-center gap-2 px-3 font-mono text-sm transition-opacity duration-500"
              style={{
                height: ROW_HEIGHT,
                opacity: pr.fading ? 0 : 1,
              }}
            >
              {pr.prStatus === "working" ? (
                <span className="flex items-center gap-2 text-yellow-400 text-xs">
                  <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-muted-foreground">#{pr.prNumber}</span>
                  Working...
                </span>
              ) : (
                <span className="flex items-center gap-2 text-primary text-xs font-semibold">
                  <Eye className="w-3.5 h-3.5" />
                  <span>#{pr.prNumber}</span>
                  Ready for review
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
