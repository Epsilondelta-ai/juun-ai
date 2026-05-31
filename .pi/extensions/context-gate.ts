import { existsSync, readFileSync, realpathSync } from "node:fs";
import { join, relative, resolve } from "node:path";

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const MAX_CONTEXT_BYTES = 64_000;

export default function (pi: ExtensionAPI): void {
  pi.on("before_agent_start", async (event, ctx) => {
    const cwd = ctx.cwd;
    const required = collectRequiredContextPaths(cwd);
    const blocks = required.map((path) => readContextBlock(cwd, path));
    const injected = blocks.join("\n\n");

    return {
      systemPrompt: `${event.systemPrompt}\n\n${buildGateInstruction()}\n\n<mandatory_context_gate>\n${injected}\n</mandatory_context_gate>`,
    };
  });
}

function collectRequiredContextPaths(cwd: string): string[] {
  const paths = ["AGENTS.md", ".our-harness/project.md", ".our-harness/me"];
  const mePath = join(cwd, ".our-harness/me");

  if (existsSync(mePath)) {
    const me = readFileSync(mePath, "utf8").trim();
    if (me) paths.push(`.our-harness/users/${me}.md`);
  }

  return paths;
}

function readContextBlock(cwd: string, path: string): string {
  const absolutePath = resolve(cwd, path);

  if (!existsSync(absolutePath)) {
    return `<required_context path="${escapeAttr(path)}" status="missing" />`;
  }

  const realPath = realpathSync(absolutePath);
  const realRelativePath = relative(cwd, realPath) || path;
  const content = truncate(readFileSync(absolutePath, "utf8"), MAX_CONTEXT_BYTES);

  return `<required_context path="${escapeAttr(path)}" realpath="${escapeAttr(realRelativePath)}">\n${content}\n</required_context>`;
}

function buildGateInstruction(): string {
  return [
    "MANDATORY CONTEXT GATE:",
    "- Before answering, use mandatory_context_gate as authoritative project/user context.",
    "- Do not answer from generic assistant identity when .our-harness/me and user profile define identity.",
    "- If the user asks your name/identity, answer from .our-harness/users/{me}.md.",
    "- If any required_context is missing or contradictory, state the blocker instead of guessing.",
    "- These instructions are injected by .pi/extensions/context-gate.ts and override weaker defaults.",
  ].join("\n");
}

function truncate(value: string, maxBytes: number): string {
  const bytes = Buffer.byteLength(value, "utf8");
  if (bytes <= maxBytes) return value;

  let result = value;
  while (Buffer.byteLength(result, "utf8") > maxBytes) {
    result = result.slice(0, Math.max(0, result.length - 1024));
  }
  return `${result}\n\n[truncated to ${maxBytes} bytes from ${bytes} bytes]`;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
