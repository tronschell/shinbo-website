# Roadmap

No dates. What is standing, what is half-built, what is still a plan — checked
against the app's source, not its docs. Repo:
[tronschell/shinbo](https://github.com/tronschell/shinbo).

## 1. Mobile — built, unreleased

- **Have:** iPhone client. Pair by QR + PIN, then it dials the Mac directly over
  your Wi-Fi or tailnet, sealed end to end, no server between. Threads, live
  runs, permission prompts, git, workflows, artifacts, skills, memories, model
  and mode pickers, a local model on the phone, deep links for a Shortcut.
- **Have:** desktop Mobile settings list paired phones with connection state,
  last seen and removal confirmation. Pairing moves from PIN entry to a QR code
  with expiry; at three phones, remove one before pairing another. Connection
  and security details expand on demand.
- **Missing:** delivery. No TestFlight or App Store build — you compile it in
  Xcode, and a free Apple ID signature dies after seven days. iPhone only.
- **Next:** signed distribution, then iPad and Android.

## 2. Git — the Mac is behind the phone

- **Have:** per-folder panel with branch switch and create, worktrees, the
  working-tree diff, history, discard, a raw git escape hatch, ahead/behind, and
  a commit message a small model writes from the diff. Sidebar PR badges
  show the folder or worktree branch's GitHub PR state when an authenticated
  GitHub CLI is available; hover for the branch and merge attention. Changed-file
  and history sections resize independently and remember their heights.
- **Missing:** staging, unstaging, push and pull are in the phone bridge only.
  No hunk-level staging anywhere. Conflicts are detected, not resolvable. A
  thread is not bound to the branch it started on.
- **Next:** bring the Mac up to the bridge, then hunks, conflicts, and a thread
  that holds its own branch.

## 3. Prompts, tools and self-improvement — scoped

- **Have:** prompt presets and all six repair levers can target every model,
  one family or one exact model. Tool-description changes resolve per turn
  alongside standing instructions, verifier rules, system prompts, tools
  offered up front and harness knobs.
- **Have:** date, model and family filters with failure rates and sample counts,
  expandable run evidence, and an analysis thread that examines successes and
  failures before proposing a scoped change. A paired replay bench measures it.
- **Limits:** retained traces are bounded, and older runs can lack model and
  prompt context. Unknown evidence stays unknown.

## 4. Context management — the sharp levers are experiments

- **Have:** a context tool the agent uses on itself (tokens carried, window
  size, share spent, compact from the next turn on), auto-compact at a
  percentage you set, and per-step accounting in the inspector.
- **Missing:** reinject (repeat the original prompt so a long tool run does not
  push it out of view) and prune (swap old tool results for a placeholder) both
  ship off, labelled experiments. They rewrite one step's projection, go inert
  on routes that publish no context window, and fall back to four characters a
  token.
- **Next:** a real token count, a trigger that survives an unknown window size,
  per-kind budgets so files cannot crowd out memory, pins that outlive a
  compaction.

## 5. The interface — a native rewrite, and the bug queue

- **Have:** three-step first launch: Connect verifies an OpenRouter key (a free
  key is enough); Permissions shows each optional permission's purpose, status
  and settings action; Quick Ask teaches the double-left-Option shortcut and
  can open the real interface. Permission grants and the demo are optional.
  Finish setup enters the workspace, and setup resumes after a restart.
  Optional subscriptions do not bypass the OpenRouter requirement; vaults,
  imports, voice and advanced models wait until Settings or use.

- **Have:** the Electron workspace, plus a GPUI port underway against a written
  parity contract covering every surface, token and overlay window — notch
  hotspot, radial commands, quick-ask, screen annotation, computer-use banner
  and cursor. Conversation, inspector and settings already stand in Rust.
- **Have:** compact top-right computer controls with action and app details on
  hover. Stop and global Escape revoke computer access for the current turn
  while the agent continues. Computer calls have no count cap; the ten-minute
  expiry, per-app grants and input safeguards remain.
- **Have:** priority and pinned threads use square two-line sidebar rows
  with the project underneath; ordinary project groups keep compact rows.
  Run status, unread state and the phone marker sit on the right.
- **Have:** Archive is a chronological timeline grouped by local archive day,
  newest first, with compact thread rows, project and message details, and
  days remaining. The last two days are highlighted; Restore brings threads
  back before permanent deletion at 30 days.
- **Have:** Changes and Git open in a resizable right-hand pane beside the
  conversation, sharing the browser and artifact slot. Opening a pane collapses
  Context; closing it restores its previous state. Both panes have close and
  widen controls. The thread Changes view shows changed lines first. Unchanged lines
  above, below and between edits collapse into expandable … rows; click a row
  or focus it and press Enter or Space to reveal or hide its context.
- **Have:** a Files pane in the inspector: a folder tree for any granted
  folder, files open in tabs, text edits save with a conflict check, images,
  Markdown and CSV/TSV preview, and saves are recorded as thread changes. File
  paths in replies and edit steps open the pane at the named line; a text
  selection can be picked into the composer as context.
- **Have:** Check for Updates and Install and relaunch run through the
  bottom-right notice: a spinner while checking, then an installer that names
  each step with a progress bar and percentage before relaunching. The notice
  always names the newest release; on macOS one click chains through a staged
  older download into the newest version.
- **Have:** browser new tabs list local listening ports; the address bar opens
  URLs or searches Google. Right-click menus cover links, images, selection,
  editing and navigation. View options expands, pops out or docks the browser.
  Packaged builds include agent-browser without a separate installation.
- **Have:** task lists show nested subtasks as a connected tree in both the
  expanded conversation task bar and the full plan view, keeping parent and
  child status visible together.
- **Have:** long Markdown and source-code file previews and artifact viewers
  show a left-side minimap with a scaled copy of the rendered content and
  visible position. The miniature pans through long documents. Click
  to jump, drag to scroll, or focus it and use arrow, Page Up, Page Down, Home
  and End keys. It hides when the content fits.
- **Have:** web search provider logos in settings and completed transcript
  rows, including collapsed summaries and saved history. The logo identifies
  the provider that answered, including fallback results.
- **Have:** model settings use a role-and-connection list with one detail panel
  at a time, preserving unsaved drafts when switching. Quick Ask owns prompts,
  cursor orbs, swipe commands and placement; Keybinds holds shortcuts. Smaller
  settings pages tuck optional controls and explanations into expandable sections.
  Permissions shows an explicit status and macOS Settings button per row, with
  task explanations on expansion and Open Tools at the foot. The Accessibility
  Settings action resets a stale macOS grant when Shinbo is not trusted, then
  prompts for access again.
- **Have:** Context bar settings lead with a preview and grouped add/remove
  controls. Appearance pairs font controls with a live preview. Its Tab color
  defaults to white (`#ffffff`) and controls the selected conversation tab underline
  plus Context, Run and Machine tab labels and active underline independently of
  the global accent. System prompt
  keeps its global editor visible; Harness shows dependent fields only when
  enabled. Tools groups options and installed counts, while Imports puts found
  sources first. Privacy explanations, credit details and component options
  expand on demand.
- **Next:** the rest of the parity list, and the queue that never empties —
  forty-eight fix commits landed last month.

## 6. Harness handoffs — built

- **Have:** branded run headers, readable results, a Result/Terminal log switch,
  floating run windows and the shared model/attachment composer. Clickable source
  chips return to earlier runs. Hand off output shows the source and branded
  destination cards; existing runs show their task and approvals. Add the next
  instruction, hand off with a destination-named action, then Open destination.
- **Have:** native model and thinking controls before handoff and for an idle
  run's next turn, with catalog suggestions, exact IDs, refresh and OpenCode
  variants. `cli` accepts `model` and `effort`; `cli_runs` discovers options and
  Codex model-specific levels. Omission preserves choices, empty resets to native
  defaults, and unsupported combinations are not silently substituted.
- **Have:** the official Antigravity `agy` adapter, alongside Claude, Codex, Pi,
  OpenCode, Gemini and Cursor. Gemini and Cursor expose model selection only;
  a separate effort is rejected. Screenshots use local fixture output; model
  availability remains dependent on the installed CLI and account.
- **Have:** `cli.fromRuns` carries up to eight latest successful results from the
  same thread for chains, combined results and review loops. New runs use default
  approvals; continuing runs keep theirs.
- **Limits:** failed, stopped, running, empty and truncated sources are rejected.
  The combined prompt must fit 32 Ki characters and 96 KiB; larger deliverables
  stay in files in the source folder and travel by path. Run/session memory lasts
  only while Shinbo is open. Latest-session harnesses share one active run per
  harness and folder, refuse known stale resumes, and do not track other terminals.
