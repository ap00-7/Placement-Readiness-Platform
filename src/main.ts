import './kodnest-premium.css'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app mount node')

app.innerHTML = `
  <div class="kds-page">
    <header class="kds-topbar">
      <div class="kds-container kds-topbar__inner">
        <div class="kds-projectName">KodNest Premium Build System</div>
        <div class="kds-progress" aria-label="Progress">
          <span class="kds-small">Step 2 / 8</span>
          <div class="kds-progress__bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="kds-progress__fill" style="width: 25%"></div>
          </div>
        </div>
        <div class="kds-topbar__right">
          <span class="kds-badge kds-badge--inProgress"><span class="kds-dot"></span>In Progress</span>
        </div>
      </div>
    </header>

    <section class="kds-contextHeader">
      <div class="kds-container">
        <h1 class="kds-h1">Build with calm precision</h1>
        <p class="kds-subtext kds-measure">
          A focused workspace with consistent tokens, predictable components, and proof-driven completion.
        </p>
      </div>
    </section>

    <main class="kds-workspace">
      <div class="kds-container">
        <div class="kds-grid">
          <section>
            <div class="kds-card">
              <h2 class="kds-h2">Primary Workspace</h2>
              <div class="kds-divider"></div>
              <div class="kds-prose">
                <p>
                  This paragraph is intentionally long to validate the reading measure. On desktop, it must remain comfortable and never sprawl across the full container.
                  The design system enforces a maximum text width of 720px for body copy blocks to keep scanning easy and reduce fatigue.
                </p>
                <p>
                  Use cards, inputs, and clear hierarchy. Keep the accent red for moments of intent: primary actions, progress, and focus—nothing else.
                </p>
              </div>

              <div class="kds-divider"></div>

              <div class="kds-field">
                <label class="kds-label" for="demo-input">Example input</label>
                <input id="demo-input" class="kds-input" placeholder="Clean border, calm focus state" />
                <p class="kds-help kds-measure">Focus uses the same ring everywhere. No heavy shadows.</p>
              </div>

              <div class="kds-divider"></div>

              <div style="display:flex; gap: var(--space-2); flex-wrap: wrap;">
                <button class="kds-btn kds-btn--primary" type="button">Primary action</button>
                <button class="kds-btn kds-btn--secondary" type="button">Secondary</button>
                <button class="kds-btn kds-btn--quiet" type="button">Quiet</button>
              </div>
            </div>
          </section>

          <aside class="kds-card">
            <h3 class="kds-panelTitle">Step explanation</h3>
            <p class="kds-help kds-measure">
              Keep this short. Explain what to do next, why it matters, and what “done” looks like—without hype.
            </p>

            <div class="kds-divider"></div>

            <h3 class="kds-panelTitle">Copyable prompt</h3>
            <div class="kds-promptBox" role="group" aria-label="Prompt box">
              <pre>Implement the UI using the KodNest Premium Build System tokens and components. Keep spacing on 8/16/24/40/64. Use accent sparingly.</pre>
            </div>

            <div class="kds-divider"></div>

            <div class="kds-actions">
              <button class="kds-btn kds-btn--secondary" type="button">Copy</button>
              <button class="kds-btn kds-btn--secondary" type="button">Build in Lovable</button>
              <div class="kds-actionsRow">
                <button class="kds-btn kds-btn--secondary" type="button">It Worked</button>
                <button class="kds-btn kds-btn--secondary" type="button">Error</button>
              </div>
              <button class="kds-btn kds-btn--secondary" type="button">Add Screenshot</button>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <footer class="kds-proofFooter" aria-label="Proof footer">
      <div class="kds-container kds-proofFooter__inner">
        <div class="kds-proofList">
          <div class="kds-proofItem">
            <input type="checkbox" aria-label="UI Built" />
            <div class="kds-proofMeta">
              <p class="kds-proofName">UI Built</p>
              <div class="kds-proofInput">
                <input class="kds-input" placeholder="Proof (link or note)" />
              </div>
            </div>
          </div>

          <div class="kds-proofItem">
            <input type="checkbox" aria-label="Logic Working" />
            <div class="kds-proofMeta">
              <p class="kds-proofName">Logic Working</p>
              <div class="kds-proofInput">
                <input class="kds-input" placeholder="Proof (how it was validated)" />
              </div>
            </div>
          </div>

          <div class="kds-proofItem">
            <input type="checkbox" aria-label="Test Passed" />
            <div class="kds-proofMeta">
              <p class="kds-proofName">Test Passed</p>
              <div class="kds-proofInput">
                <input class="kds-input" placeholder="Proof (test run reference)" />
              </div>
            </div>
          </div>

          <div class="kds-proofItem">
            <input type="checkbox" aria-label="Deployed" />
            <div class="kds-proofMeta">
              <p class="kds-proofName">Deployed</p>
              <div class="kds-proofInput">
                <input class="kds-input" placeholder="Proof (deployment URL)" />
              </div>
            </div>
          </div>
        </div>

        <p class="kds-small kds-measure">
          Each checkbox requires proof input. The footer stays present to keep completion honest and visible.
        </p>
      </div>
    </footer>
  </div>
`
