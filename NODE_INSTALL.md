# Install Node.js (required to run this project)

Node.js and npm are **not** installed on your Mac. Follow this once to fix it.

---

## Fastest beginner-safe path

1. **Open this link in your browser:**  
   **https://nodejs.org**

2. **Download** the green **LTS** button (recommended version).

3. **Run the installer** (`.pkg` file). Click through: Continue → Continue → Agree → Install. Enter your Mac password if asked.

4. **Quit Terminal completely** (Cmd+Q or Terminal → Quit), then open Terminal again.

5. **Check it worked:** in Terminal type:
   ```bash
   node -v
   npm -v
   ```
   You should see version numbers (e.g. `v20.x.x` and `10.x.x`).

6. **Run the Zyra project:**
   ```bash
   cd /Users/akheelashraf/Documents/5_ZYRA_DIGITAL/Website/zyra-site
   npm install
   npm run dev
   ```
   Then open **http://localhost:3000** in your browser.

---

After Node is installed, you can close this file. The main project instructions are in **README.md**.
