import { Brand, Link, Shot, chain } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "router",
  title: "Free model router",
  blurb:
    "Shinbo can try an ordered list of free OpenRouter models when one is unavailable. Provider availability and limits still apply.",
  seo: {
    title: "Shinbo Free Router: model fallback and limits",
    description:
      "How the Shinbo Free Router works: an ordered chain of free OpenRouter models, three-deep fallback per request, editable in Settings → Models, no paid tier.",
  },
  shot: "/shots/model-picker.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>An ordered model chain with fallback.</h2>
        </div>
        <p className="lede">
          A <b>router</b> is a named, ordered chain of models. Shinbo ships one:
          the <b>Shinbo Free Router</b>, ten <code>:free</code> OpenRouter ids.
          When the first link is rate-limited, down or retired, the next one is
          tried. A request can still fail when no eligible model is available,
          and the catalog in your app decides which ids are live.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              In the composer picker, choose <b>Shinbo Free Router</b>. It sits
              above the catalog and carries a <b>Free</b> badge.
            </li>
            <li>
              Send a prompt. The transcript footer names the model that actually
              ran.
            </li>
            <li>
              To change the order, open{" "}
              <b>Settings → Models → Catalog &amp; routers</b>, drag links, ✕
              one to drop it, or add a zero-priced model.
            </li>
            <li>
              Click <b>Add a router</b> to start a second chain; it is seeded
              with the free one.
            </li>
          </ol>
        </div>
      </div>

      <div className="cols-2">
        <div>
          <div className="region">
            <div className="band band-head">
              <span className="label">Development configuration</span>
              <span className="tag tag-accent">ordered fallback</span>
            </div>
            <ol className="band chain">
              {chain.map((id) => (
                <li key={id}>
                  <Brand id={id} />
                  {id}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div>
          <dl className="kv region">
            <dt>Sent per request</dt>
            <dd>first three eligible links</dd>
            <dt>Links 4–10</dt>
            <dd>ranked reserve</dd>
            <dt>Routers</dt>
            <dd>up to 5</dd>
            <dt>Links per router</dt>
            <dd>up to 24</dd>
            <dt>Add a link</dt>
            <dd>any model priced at zero</dd>
            <dt>Context window</dt>
            <dd>the first link's</dd>
          </dl>
          <p className="copy">
            A router whose ids are all <code>:free</code> shows the Free badge.
            Edits are validated in the renderer and again in the main process.
          </p>
        </div>
      </div>

      <div className="head">
        <h2>How fallback works.</h2>
        <p className="lede">
          Shinbo expands a router into OpenRouter's <b>fallback array</b>: a
          list of models sent with one request. OpenRouter rejects more than
          three, so each request carries only the{" "}
          <b>first three surviving links</b>. Links 4–10 are not ten tries in
          one request; they are the reserve that moves up when an earlier id
          retires.
        </p>
      </div>

      <div className="cols-2">
        <div className="region">
          <div className="band band-head">
            <span className="label">Eligible</span>
          </div>
          <div className="band">
            <p className="copy">
              Before a request, every chain is filtered against the model
              catalog the app actually has. A retired id is dropped, not sent.
              If the catalog is empty, on first launch or with no network, the
              chain goes unfiltered so it still routes.
            </p>
          </div>
        </div>
        <div className="region">
          <div className="band band-head">
            <span className="label">Which link answered</span>
          </div>
          <div className="band">
            <p className="copy">
              The reply's model id is recorded per turn. The transcript footer
              names it, and draws a <b>Fell back to …</b> notice when the
              answering model changes mid-turn. A <code>:free</code> variant
              answering for its base model does not count as a fallback.
            </p>
          </div>
        </div>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">When a model goes quiet</span>
        </div>
        <div className="band">
          <p className="copy">
            A minute with no output and no tool call (three minutes if a tool is
            running) draws a stall notice with <b>Try another model</b>. Picking
            one swaps <i>this</i> turn: the run stops and the same prompt
            requeues on the model you chose.
          </p>
        </div>
      </div>

      <Shot
        src="/shots/model-picker.png"
        alt="Shinbo model picker over an illustrative workspace conversation, showing model roles, search, catalog entries and favorites"
        title="The picker"
        caption="Model roles · search and favorites · illustrative workspace conversation"
      />

      <div className="head">
        <h2>Cost and keys.</h2>
        <p className="lede">
          Shinbo has no paid tier, license key or account. Running on the free
          chain can cost nothing. It does not include unlimited inference: free
          routes depend on provider availability and limits, and a fallback can
          fail too. Shinbo documents no numeric rate limit.
        </p>
        <p className="copy">
          The chain still needs the verified OpenRouter key from first launch; a
          free-tier key passes. How keys are stored, and the other providers,
          subscriptions and local endpoints you can route to, are on{" "}
          <Link href="/docs/models">Models</Link>.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Private routing</span>
          <span className="tag">optional · off by default</span>
        </div>
        <div className="band">
          <p className="copy">
            An OpenRouter setting for the <b>main agent loop only</b>. It
            restarts the local harness and asks OpenRouter for endpoints with no
            data collection and zero retention on every request. It{" "}
            <b>fails closed</b>: a model with no qualifying endpoint fails, and
            never falls back. It does not cover verifier, vision, advisor,
            secrets or tagger calls, tools, or your OpenRouter account's own
            logging settings.
          </p>
        </div>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              Three links per request. A router longer than three is a reserve,
              not extra retries.
            </li>
            <li>
              A free route is only as available as its provider. Expect
              rate-limit fallbacks at busy hours; the footer tells you when.
            </li>
            <li>
              A free or paid badge says nothing about an endpoint's data policy.
              Use Private routing if that matters, and accept that it can fail.
            </li>
            <li>
              OpenRouter variants (<code>:free</code>, <code>:batch</code>,{" "}
              <code>:nitro</code>, <code>:online</code>) stay on OpenRouter and
              offer no direct-provider switch.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/models">Models</Link> for roles, providers
        and subscriptions · <Link href="/docs/control">Control</Link> for the
        verifier model behind Auto mode ·{" "}
        <Link href="/docs/harness">Harness</Link> for running other CLIs on
        their own sign-ins.
      </p>
    </>
  ),
};

export default doc;
