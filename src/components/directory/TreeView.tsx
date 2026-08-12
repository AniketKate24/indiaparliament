import { useState } from "react";
import { constitutionTree, type TreeNode } from "@/data/hierarchy";
import { Portrait, SourceBadges, Tag, appointmentTone } from "./ui";

function Chevron({ open, leaf }: { open: boolean; leaf?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-background text-[10px] font-bold transition-transform ${
        open ? "rotate-90" : ""
      } ${leaf ? "opacity-60" : ""}`}
    >
      ▶
    </span>
  );
}

function MemberCard({ node }: { node: TreeNode }) {
  const m = node.member!;
  return (
    <div className="my-1 rounded-lg border border-border bg-card p-4">
      <dl className="grid gap-3 text-xs sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Designation</dt>
          <dd className="mt-0.5">{m.title}</dd>
        </div>
        {m.party && (
          <div>
            <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Party</dt>
            <dd className="mt-0.5">{m.party}</dd>
          </div>
        )}
        {m.constituency && (
          <div>
            <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
              Constituency / State
            </dt>
            <dd className="mt-0.5">{m.constituency}</dd>
          </div>
        )}
        <div>
          <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Tenure from</dt>
          <dd className="mt-0.5">{m.start}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Tenure until</dt>
          <dd className="mt-0.5">{m.end}</dd>
        </div>
        {m.note && (
          <div className="sm:col-span-2">
            <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Note</dt>
            <dd className="mt-0.5 leading-relaxed">{m.note}</dd>
          </div>
        )}
        <div className="sm:col-span-2">
          <dt className="mb-1.5 font-semibold uppercase tracking-wide text-muted-foreground">
            Citations
          </dt>
          <dd>
            <SourceBadges sources={m.sources} />
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Node({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = !!node.children?.length;
  const m = node.member;

  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted"
      >
        <Chevron open={open} leaf={!hasChildren} />
        {m && <Portrait name={m.name} photo={m.photo} size={38} />}
        <span className="min-w-0">
          <span
            className={`block truncate font-display font-semibold ${
              depth === 0 ? "text-base" : "text-sm"
            } ${m?.vacant ? "italic text-muted-foreground" : ""}`}
          >
            {node.label}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {node.sublabel ?? m?.title ?? node.article ?? ""}
          </span>
        </span>
        <span className="ml-auto hidden shrink-0 items-center gap-2 sm:flex">
          {node.article && <Tag tone="bg-primary/10 text-primary border-primary/30">{node.article}</Tag>}
          {m && <Tag tone={appointmentTone[m.appointment]}>{m.appointment}</Tag>}
        </span>
      </button>

      {open && (
        <div className="ml-[19px] border-l border-dashed border-border pl-4">
          {node.detail && (
            <p className="my-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">{node.detail}</p>
          )}
          {node.sources && node.sources.length > 0 && (
            <div className="mb-2">
              <SourceBadges sources={node.sources} />
            </div>
          )}
          {m && <MemberCard node={node} />}
          {hasChildren && (
            <ul>
              {node.children!.map((c) => (
                <Node key={c.id} node={c} depth={depth + 1} />
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}

export function TreeView() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-plaque sm:p-6">
      <p className="mb-4 max-w-3xl text-sm text-muted-foreground">
        The full chain of authority: Constitution → Part V (The Union) → the Union Executive and
        Parliament → each House → functional branch or party bench → the individual member. Each node
        carries the article it derives from; leaves open to reveal party, constituency, tenure dates
        and citations.
      </p>
      <ul>
        <Node node={constitutionTree} depth={0} />
      </ul>
    </div>
  );
}
