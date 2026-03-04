# CLAUDE.md — AI Assistant Guide for Futurem-Safety-document

## Project Overview

This repository contains the **2026년 안전&환경 서류 체크리스트** (2026 Safety & Environmental Document Checklist), a web-based tool developed by the 설비기획그룹 (Facilities Planning Group) at **POSCO Future M (포스코 퓨처엠)**.

The tool helps construction project managers verify which safety and environmental compliance documents are required for a given project, based on Korean laws (산안법, 건진법, 화관법, etc.), and allows export to PDF and Excel.

---

## Repository Structure

```
Futurem-Safety-document/
├── index.html          # Production: Main checklist UI (stable version)
├── script.js           # Production: All client-side logic
├── style.css           # Production: All styling
└── 개발계/              # Development area (work in progress)
    ├── index.html      # Dev version of UI
    ├── script.js       # Dev version of JS
    ├── style.css       # Dev version of CSS
    ├── 클로드 신규/     # v2 Pro — Claude-assisted upgrade (most advanced)
    │   ├── index_upgraded.html    # Pro UI with dashboard + search + filter
    │   ├── script_upgraded.js     # Pro JS: stats, chart, search, save/load, AI
    │   ├── style_upgraded.css     # Pro styling
    │   ├── server_upgraded.py     # Flask server with logging & AI guide API
    │   └── QUICKSTART.md          # Setup guide for the Pro version
    ├── 회사내부공유용/   # Internal sharing version (Flask with templates/static)
    │   ├── templates/index.html
    │   ├── static/js/script.js
    │   ├── static/css/style.css
    │   └── server.py              # Flask server (templates-based)
    ├── API Server 버전/ # Earlier API server experiment
    │   ├── index.html
    │   ├── script.js
    │   ├── style.css
    │   └── server.py
    ├── 집 연습용/       # Home practice environment
    └── 이전파일/        # Archive of previous versions
        ├── v16 버전.html
        ├── index(최종본).html
        └── ...
```

**The root `index.html` / `script.js` / `style.css` is the stable production version. The `개발계/` directory contains active development.**

---

## Core Concepts

### Document Categories (4 Steps / 단계)

| Step | Korean Title | Timing |
|------|-------------|--------|
| Ⅰ | 안전&환경 (자사 기준) | 상시 |
| Ⅱ | 시공계획서 | 착공 30일 전 |
| Ⅲ | 착공계 | 착공 직전 (1일 전) |
| Ⅳ | 착공 시 (당일) | 착공 당일 |

### Document Status Logic

Each document has one of three statuses, computed dynamically from `공사금액` (contract amount, 억원) and `공사기간` (contract period, 개월):

| Badge | Korean | Meaning |
|-------|--------|---------|
| `●` required | 필수 | Always mandatory |
| `○` conditional | 확인 필요 / 필수 / 미해당 | Depends on amount and/or period |
| — | 미해당 | Exempt / not applicable |

### Key Business Logic in `getStatusDisplay()` (`script.js:101`)

- Documents marked `●` are always **필수**.
- Documents marked `○` use `baseAmount` and `basePeriod` thresholds:
  - Both zero → always **확인 필요**
  - `baseAmount` only → **필수** if `amount >= baseAmount`, else **미해당**
  - `basePeriod` only → **필수** if `period >= basePeriod`, else **미해당**
  - Both set → **필수** only if both thresholds met
- **Special case — 재해예방 기술지도 계약서** (interlock logic at `script.js:106`):
  - `amount >= 50억` → always **미해당** (안전관리자 선임 대상이므로)
  - `amount >= 1억 AND period >= 1개월` → **필수**
  - Otherwise → **미해당**

### Reference Tables (참고표)

Three reference tables are available via modal popup (`referenceData` object in `script.js:64`):

- **참고표 1** — 공사금액별 현장대리인 자격 기준
- **참고표 2** — 공사금액별 안전관리자 선임 기준
- **참고표 3** — 안전관리비 계상기준 (rate table by contract amount)

---

## Technology Stack

### Production Version (Root)
- **Pure HTML/CSS/JavaScript** — no build tools, no npm, no framework
- **html2pdf.js** (v0.10.1) — PDF export via CDN
- **SheetJS / xlsx** (v0.18.5) — Excel export via CDN

### Pro Version (`개발계/클로드 신규/`)
- **Frontend**: Same HTML/CSS/JS + **Chart.js** (v4.4.0) for donut chart dashboard
- **Backend**: **Python Flask** (`server_upgraded.py`) serving files and the AI guide API
  - Port: `5000`
  - CORS enabled
  - Logging to `server.log` + stdout
- **AI Integration** (dual-environment):
  - `ENV = "HOME"` → Google Gemini API (`MY_API_KEY_GOOGLE` env var)
  - `ENV = "OFFICE"` → POSCO internal GPT (`POSCO_GPT_KEY` env var, `gpt-4o` model)

### Internal Sharing Version (`개발계/회사내부공유용/`)
- Flask with proper `templates/` and `static/` folder structure
- Same dual-environment AI logic

---

## Development Workflows

### Running the Production Version (Static)
No server needed. Open `index.html` directly in a browser.

### Running the Pro Version (Flask Server)

```bash
# Install dependencies (once)
pip install flask flask-cors requests

# Set API key (for AI guide feature)
# Home environment:
export MY_API_KEY_GOOGLE=your_gemini_api_key_here
# Office environment (set POSCO_GPT_KEY instead and change ENV in server.py)

# Run server
cd 개발계/클로드\ 신규/
python server_upgraded.py

# Access in browser
http://localhost:5000
```

### Switching AI Environment

In `server_upgraded.py` (or `server.py`), change line:
```python
ENV = "HOME"   # Use Gemini API (for home/external use)
ENV = "OFFICE" # Use POSCO internal GPT (for office use)
```

---

## Key Files and Their Roles

| File | Purpose |
|------|---------|
| `index.html` | Entry point; loads CDN libraries, defines layout, tab navigation |
| `script.js` | All logic: `checklistData`, `referenceData`, rendering, status computation, export |
| `style.css` | Visual design; responsive layout, badge colors, print styles |
| `개발계/클로드 신규/script_upgraded.js` | Extended JS: dashboard stats, Chart.js integration, search/filter, JSON save/load, AI guide API call |
| `개발계/클로드 신규/server_upgraded.py` | Flask backend: serves static files, proxies AI API calls, health check endpoint |

---

## Data Structure

### `checklistData` (in `script.js`)

```javascript
{
  1: {
    title: "Ⅰ. 안전&환경 (자사 기준)",
    items: [
      {
        name: "서류명",
        status: "●" | "○",    // ● = always required, ○ = conditional
        description: "상세 설명",
        exemption: "면제 조건",
        remark: "특이사항",
        baseAmount: 20,        // 억원 threshold (0 = no amount condition)
        basePeriod: 0,         // 개월 threshold (0 = no period condition)
        legal: "근거법령",
        reference: "참고표 1"  // optional, triggers modal button
      }
    ]
  },
  2: { ... }, // Ⅱ. 시공계획서
  3: { ... }, // Ⅲ. 착공계
  4: { ... }  // Ⅳ. 착공 시
}
```

### Rendering Cache

`renderedSteps` object caches rendered HTML per step. When sliders change, only status badges are updated via `updateStatusBadges()` without full re-render.

---

## Conventions and Patterns

### Adding a New Document Item

1. Open `script.js` (or the relevant dev version).
2. Find the appropriate step in `checklistData` (steps 1–4).
3. Add a new item object following the existing schema.
4. Set `status: "●"` for unconditionally required documents.
5. Set `status: "○"` with appropriate `baseAmount` / `basePeriod` for conditional documents.
6. Always populate `legal` field with the applicable Korean law reference.

### Modifying Threshold Logic

- Amount/period-based thresholds are item-level properties (`baseAmount`, `basePeriod`).
- For items with **custom interlock logic** (like 기술지도), add a named check at the **top** of `getStatusDisplay()` before the generic `●`/`○` handling.

### Export Features

- **Print/PDF**: `printPage()` calls `generateAllPages()` then `window.print()`. Print styles in CSS handle layout.
- **Excel**: `downloadExcel()` uses SheetJS to build a workbook from all steps. Column widths are predefined.

### Slider ↔ Text Input Sync

Both the range slider and the text input are kept in sync:
- Slider `input` event → update text input value
- Text input `blur` event → `validateAndCleanInput()` → clamp, round, update slider
- Updates are debounced (50ms) via `debouncedUpdate()` to avoid excessive re-renders.

---

## Legal Framework References

This tool covers documents required under:

| Law (법령) | Korean Name |
|-----------|-------------|
| 산안법 | 산업안전보건법 |
| 건진법 | 건설기술진흥법 |
| 화관법 | 화학물질관리법 |
| 건산법 | 건설산업기본법 |
| 근로기준법 | 근로기준법 |
| 고용산재보험법 | 고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률 |
| 사규 | 포스코 퓨처엠 내부 규정 |

---

## Branch Strategy

- **`master`** — stable production code (root `index.html` / `script.js` / `style.css`)
- **`claude/...`** — AI-assisted development branches; merge into master after review
- The `개발계/` directory tracks experimental and version-specific work; promote to root when stable

---

## Important Notes for AI Assistants

1. **Language**: All UI strings, comments, and data are in Korean. Preserve Korean text exactly when editing checklist items.
2. **No build step**: Production files are plain HTML/CSS/JS. Do not introduce build tools unless explicitly requested.
3. **Legal accuracy**: Document names and law citations (e.g., `산안법 제36조`) must remain accurate. Do not paraphrase legal references.
4. **Data integrity**: The `checklistData` object is the single source of truth. Changes here affect all rendered output, PDF export, and Excel export simultaneously.
5. **ENV variable**: Never hardcode API keys. The `ENV` flag in `server.py` controls which AI backend is used.
6. **Threshold values are in 억원 (100M KRW)**: `baseAmount: 20` means 20억원 (2 billion KRW). Do not confuse units.
7. **`renderedSteps` cache**: If adding new rendering logic, remember to invalidate or update this cache to avoid stale content.
