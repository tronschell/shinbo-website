import { Brand, Link, Shot, secondModels } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "models",
  title: "Models",
  blurb:
    "One OpenRouter key gets you started; after that, any provider, subscription, CLI sign-in or local model can drive each role.",
  seo: {
    title: "Get started: OpenRouter setup and your first task",
    description:
      "How Shinbo picks models: six roles in Settings → Models, provider presets, metered plans and subscriptions, ChatGPT via Codex sign-in, secondary models and local endpoints.",
  },
  shot: "/shots/model-picker.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>One key to start. Any route after that.</h2>
        </div>
        <p className="lede">
          Shinbo runs on whatever OpenAI-compatible endpoint you point it at. It
          ships pointed at OpenRouter on the{" "}
          <Link href="/docs/router">Shinbo Free Router</Link>. Every job the app
          gives a model, from the workspace thread to tagging a note, is a{" "}
          <b>role</b> you can reassign.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              <b>Connect.</b> On first launch, paste an OpenRouter API key. A
              key from{" "}
              <a href="https://openrouter.ai/settings/keys">
                OpenRouter's API key settings
              </a>{" "}
              is required; a free-tier key can complete verification. Shinbo
              verifies it with OpenRouter before Continue unlocks; the optional
              subscription tiles do not replace this step.
            </li>
            <li>
              <b>Permissions</b> and <b>Quick Ask</b> follow; both are optional.
              Finish setup enters the workspace. Setup resumes after a restart.
            </li>
            <li>
              Open <b>Settings → Models</b>. Pick a role on the left, choose its
              model and route on the right, save the panel.
            </li>
            <li>
              To add a provider, open <b>Connections</b>, pick a preset chip or
              type your own base URL, and name the environment variable that
              holds the key.
            </li>
          </ol>
        </div>
      </div>

      <h3 id="first-task">Complete your first useful task</h3>
      <p className="copy">
        Start with the <Link href="/#download">installer for your system</Link>:
        Apple silicon Mac or Windows x64. The app is free; hosted models and
        coding-agent subscriptions have their own costs and limits.
      </p>
      <ol className="copy">
        <li>
          Create a small sample folder containing a text file you can share with
          your chosen model.
        </li>
        <li>
          After setup, open a thread in that folder and select an available
          model.
        </li>
        <li>
          Ask: “Read the text file in this folder. Summarize it in three bullets
          and list any unanswered questions. Do not edit files.”
        </li>
        <li>
          Review any permission request, then compare the answer with the file.
          A completed, accurate answer is your first result.
        </li>
      </ol>
      <p className="copy">
        If Continue stays locked, the OpenRouter key has not verified;
        connecting a subscription does not replace it. If a turn fails, read the
        provider error and pick another route. Keep API keys out of prompts.
        Once one task works, try the{" "}
        <Link href="/docs/harness">two-agent handoff</Link>.
      </p>

      <Shot
        src="/shots/onboarding-connect.png"
        alt="Shinbo's Connect step with the required OpenRouter key verification form, eight optional subscription tiles, connected Claude and ChatGPT tiles, and Continue locked until the key is verified"
        title="Connect on first launch"
        caption="Real app · a free OpenRouter key is enough · subscriptions are optional"
      />

      <div className="head">
        <h2>Six roles, one panel at a time.</h2>
        <p className="lede">
          The left list in Settings → Models holds <b>Workspace</b>,{" "}
          <b>Quick Ask</b>, <b>Verifier</b>, <b>Advisor</b>, <b>Vision</b> and{" "}
          <b>Secrets</b>, then Catalog &amp; routers, Connections,
          Subscriptions, Credentials and Private routing. Unsaved drafts stay
          put when you switch panels.
        </p>
      </div>

      <div className="cols-2">
        <div>
          <dl className="kv region">
            <dt>Workspace</dt>
            <dd>the thread's model</dd>
            <dt>Quick Ask</dt>
            <dd>the notch composer</dd>
            <dt>Verifier</dt>
            <dd>clears gated calls in Auto mode</dd>
            <dt>Advisor</dt>
            <dd>a stronger model consulted mid-turn</dd>
            <dt>Vision</dt>
            <dd>answers about an image</dd>
            <dt>Secrets</dt>
            <dd>handles the secret tool</dd>
          </dl>
        </div>
        <div>
          <p className="copy">
            Secondary roles and council seats offer API routes only; the
            ChatGPT-subscription choice is not in those pickers. If a role's
            provider has been removed, restore it or pick another route before
            retrying. A task's Stop cancels its advisor and vision requests;
            stopping a council cancels pending seats.
          </p>
        </div>
      </div>

      <Shot
        src="/shots/settings-models.png"
        alt="Settings, Models: model roles and connection panels in the real Shinbo app"
        title="Model settings"
        caption="Workspace role selected · no model chosen · default OpenRouter route explained"
      />

      <div className="head">
        <h2>Providers, plans and sign-ins.</h2>
        <p className="lede">
          Eight provider presets come with their base URL filled in, and a ninth
          is whatever you type. Nine named plans sit beside them: five metered
          keys and four subscriptions. Three CLI sign-ins carry over as they
          are.
        </p>
      </div>

      <div className="cols-2">
        <div>
          <dl className="kv region">
            <dt>Presets</dt>
            <dd>OpenRouter · Z.AI · DeepSeek · OpenCode Zen · OpenCode Go</dd>
            <dt>Local presets</dt>
            <dd>LM Studio · Ollama · llama.cpp</dd>
            <dt>Metered keys</dt>
            <dd>OpenAI · Anthropic · DeepSeek · Gemini · Mistral</dd>
            <dt>Subscriptions</dt>
            <dd>Qwen Coding Plan · GLM Coding Plan · Kimi Code · MiniMax</dd>
            <dt>CLI sign-ins</dt>
            <dd>Claude Code · Codex · Gemini CLI</dd>
          </dl>
        </div>
        <div>
          <div className="region">
            <div className="band band-head">
              <span className="label">
                Your ChatGPT plan, driving the thread
              </span>
              <span className="tag tag-accent">needs codex login</span>
            </div>
            <div className="band">
              <p className="copy">
                Pick a <b>codex:</b> model. Shinbo reads the sign-in{" "}
                <code>codex login</code> stored and relays the turn over a
                loopback port only Shinbo holds the key to. No binary is
                spawned; the turn stays Shinbo's, with its prompt, tools and
                permission mode, and draws on the plan's five-hour window.
                Claude Code and Gemini CLI spawn as themselves under the{" "}
                <Link href="/docs/harness">harness</Link> instead.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="copy">
        Mistral is monthly API credits, metered after. Keys are
        keychain-encrypted; a credential setting <i>names</i> an environment
        variable (<code>OPENROUTER_API_KEY</code>, say) and the key reaches the
        agent only in its spawn environment. Model metadata refreshes daily from
        models.dev and the OpenRouter catalog with a 24-hour cache;{" "}
        <b>Reload model catalogs</b> forces it, and cached metadata can lag the
        provider.
      </p>

      <div className="region">
        <div className="band band-head">
          <span className="label">Local models</span>
          <span className="tag">LM Studio · Ollama · llama.cpp</span>
        </div>
        <div className="band">
          <p className="copy">
            Any OpenAI-compatible Chat Completions endpoint works. The presets
            fill in <code>127.0.0.1:1234</code>, <code>11434</code> and{" "}
            <code>8080</code>. Local endpoints are allowed over{" "}
            <b>loopback http only</b>; anything else must be https. A keyless
            server can leave the credential variable empty. <b>Test</b> calls{" "}
            <code>GET /models</code>, then one throwaway completion with a tool
            advertised.
          </p>
        </div>
      </div>

      <Shot
        src="/shots/model-picker.png"
        alt="Shinbo model picker over an illustrative website launch conversation, showing model roles, search, catalog entries and favorites"
        title="The picker"
        caption="Model roles · search and favorites · illustrative workspace conversation"
      />

      <div className="head">
        <h2>The secondary models.</h2>
        <p className="lede">
          Small jobs run on their own small models. Each takes a model, an
          endpoint, a credential variable and a system prompt, and can be a free
          hosted model, a local server, or off. Where a row names a hosted
          model, it is the first link of a three-model fallback chain.
        </p>
      </div>

      <div
        tabIndex={0}
        role="region"
        aria-label="Secondary model roles; scroll horizontally"
        className="tbl-wrap"
      >
        <table className="tbl">
          <thead>
            <tr>
              <th scope="col">Subsystem</th>
              <th scope="col">What it decides</th>
              <th scope="col">Ships with</th>
              <th scope="col">Budget</th>
            </tr>
          </thead>
          <tbody>
            {secondModels.map((m) => (
              <tr key={m.name}>
                <td>{m.name}</td>
                <td>{m.role}</td>
                <td>
                  {m.model.includes("/") ? (
                    <span className="brandcell">
                      <Brand id={m.model} />
                      <b>{m.model}</b>
                    </span>
                  ) : (
                    <span className="muted">{m.model}</span>
                  )}
                </td>
                <td className="muted">{m.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              The verified OpenRouter key is required even if you only plan to
              use a subscription or a local model.
            </li>
            <li>
              The catalog lists tool-capable models only. Browsing it needs no
              key; running a turn does.
            </li>
            <li>
              A local chat model does not reroute secondary models, web search,
              voice, catalogs, updates or coding-agent CLIs.
            </li>
            <li>
              Paid providers and CLI subscriptions bill as they normally would.
              A model request is not proof you have access to that model.
            </li>
            <li>
              Up to 24 providers, 6 favorite models and 30 entries in the
              composer picker.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/router">Free model router</Link> for the
        chain, fallback and private routing ·{" "}
        <Link href="/docs/control">Control</Link> for what the Verifier clears ·{" "}
        <Link href="/docs/harness">Harness</Link> for the coding CLIs and their
        sign-ins.
      </p>
    </>
  ),
};

export default doc;
