# Letter Griddle Puzzle Book Creation Workflow

## Overview

This document outlines the simple workflow for creating professional Letter Griddle puzzle books ready for KDP (Kindle Direct Publishing).

**Created:** February 21, 2026  
**First Book:** Letter Griddle: 50 OG Puzzles

---

## What You Need

| Item | Location | Purpose |
|------|----------|---------|
| VS Code | Your computer | Access puzzle data |
| puzzles.js | ~/Documents/griddle-game/app/puzzles.js | Master puzzle source |
| Claude | claude.ai | Generate the book PDF |

---

## The Workflow (5 Simple Steps)

### Step 1: Decide Which Puzzles to Include

- Choose puzzles by number, theme, or date range
- Note the puzzle numbers (e.g., "Puzzles #1-50" or "All holiday puzzles")
- Typical book size: 50-100 puzzles

### Step 2: Open puzzles.js in VS Code

```
Location: ~/Documents/griddle-game/app/puzzles.js
```

1. Open VS Code
2. Navigate to the griddle-game folder
3. Open the `app` folder
4. Click on `puzzles.js`

### Step 3: Copy the Puzzles

1. Find the puzzles you want to include
2. Select them (click and drag, or Shift+Click)
3. Copy (Cmd+C on Mac)

**Puzzle format in puzzles.js:**
```javascript
{
  category: "Candy",
  puzzleNumber: 1,
  words: [
    { word: "MINT", hint: "A refreshing flavored candy", revealedIndex: 0 },
    { word: "TAFFY", hint: "A chewy candy from boardwalks", revealedIndex: 2 },
    { word: "GUMMY", hint: "Soft candy shaped like bears", revealedIndex: 2 },
    { word: "LOLLIPOP", hint: "Hard candy on a stick", revealedIndex: 0 },
    { word: "CHOCOLATE", hint: "Sweet treat from cocoa beans", revealedIndex: 4 }
  ]
}
```

### Step 4: Paste into Claude Chat

1. Open Claude (claude.ai)
2. Start a new chat or continue in the Letter Griddle project
3. Paste the puzzles
4. Tell Claude what you want:

**Example prompt:**
```
Here are the puzzles for my next book. Please create a puzzle book PDF with:
- Title: Letter Griddle: [Your Title]
- Subtitle: Word Puzzles from Lettergriddle.com
- Format: 6" x 9" for KDP
- Include answer key at the end

[Paste puzzles here]
```

### Step 5: Download and Review

1. Claude generates the PDF
2. Download it
3. Review for any issues
4. Ready for KDP upload!

---

## What Claude Handles Automatically

| Task | You Do | Claude Does |
|------|--------|-------------|
| Letter Griddle calculation | Nothing | ✅ Calculates from words + revealed positions |
| Page layout | Nothing | ✅ Creates professional design |
| Answer key | Nothing | ✅ Generates with 6 puzzles per page |
| Page numbers | Nothing | ✅ Adds throughout |
| Fun facts | Provide or request new ones | ✅ Formats and places |
| KDP margins | Nothing | ✅ Sets correct bleed/gutter |

---

## Book Specifications (KDP Ready)

| Spec | Value |
|------|-------|
| Page size | 6" × 9" |
| Interior | Black & white, white paper |
| Margins | 0.5" edges, 0.625" gutter |
| Font | Clean, readable |
| Answer key | 6 puzzles per page |

---

## Design Elements (Automatic)

Each puzzle page includes:

- 🥞 Puzzle number with pancake emoji
- Category badge (gold/amber)
- 5 word rows with letter boxes
- One revealed letter per word (shaded)
- Hints in italic
- Letter Griddle section (dark background, gold tiles)
- 🍯 Did You Know? box (cream background)
- Answer page reference

---

## Tips for Future Books

### Themed Collections
- Holiday puzzles (Christmas, Thanksgiving, etc.)
- Food & cooking puzzles
- Travel & places puzzles
- Seasonal collections

### Book Naming Ideas
- Letter Griddle: Holiday Favorites
- Letter Griddle: Foodie Edition
- Letter Griddle: Volume 2
- Letter Griddle: Cozy Collection

### Puzzle Count Recommendations
| Page Count | Puzzles | Answer Pages | Total Pages |
|------------|---------|--------------|-------------|
| ~40 pages | 30 puzzles | 5 pages | ~40 |
| ~60 pages | 50 puzzles | 9 pages | ~64 |
| ~80 pages | 70 puzzles | 12 pages | ~88 |
| ~100 pages | 90 puzzles | 15 pages | ~112 |

---

## Cover Specifications

When ready for cover creation:

| Spec | How to Calculate |
|------|------------------|
| Trim size | 6" × 9" |
| Spine width | (Page count × 0.00225") for white paper |
| Full cover width | 6" + spine + 6" + 0.125" bleed on each side |
| Cover height | 9" + 0.125" bleed top and bottom = 9.25" |

**Example for 60-page book:**
- Spine: 60 × 0.00225" = 0.135"
- Full width: 6 + 0.135 + 6 + 0.25 = 12.385"
- Full height: 9.25"

---

## Checklist Before KDP Upload

- [ ] PDF opens correctly
- [ ] All puzzles display properly
- [ ] Answer key is accurate
- [ ] Page count matches KDP listing
- [ ] Margins look correct (no cut-off text)
- [ ] Fun facts are appropriate
- [ ] Title page looks good
- [ ] Cover matches interior page count (spine width)

---

## File Naming Convention

```
Letter_Griddle_[Title]_Interior.pdf
Letter_Griddle_[Title]_Cover.pdf
```

Examples:
- `Letter_Griddle_50_OG_Puzzles_Interior.pdf`
- `Letter_Griddle_Holiday_Edition_Interior.pdf`

---

## Notes from First Book (50 OG Puzzles)

### What Worked Well
- Copy/paste from puzzles.js was seamless
- Claude calculated all Letter Griddles automatically
- Design matched the digital game aesthetic
- KDP-ready on first generation

### Refinements Made
- Changed "Letter Griddle Cafe" to "Lettergriddle.com" 
- Changed "Letter Bank" to "Letter Griddle" for consistency
- Updated "shown in blue" to "already filled in" for B&W printing
- Fresh fun facts for each puzzle (not repeating website hints)

---

## Contact & Resources

- **Website:** lettergriddle.com
- **Email:** lettergriddle@gmail.com
- **Puzzle source:** ~/Documents/griddle-game/app/puzzles.js

---

*Last Updated: February 21, 2026*
