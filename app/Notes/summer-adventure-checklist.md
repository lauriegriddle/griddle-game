# Summer Adventure — Weekly Theme Swap Checklist

Use this each week when you're ready to switch the puzzle content. Two files are involved:
- `/app/summerescape/page.js` — the puzzle itself
- `/app/page.js` — the homepage card that links to it

---

## Part 1: Content updates (you can do these solo)

All in **`/app/summerescape/page.js`**.

- [ ] **Replace the `PUZZLES` array** with this week's 3 sub-themes, 5 words each, hints, `revealedIndex`, and `didYouKnow` facts
- [ ] **Replace the `GRAND_FACT` constant** with a condensed (1 short paragraph) summary fact covering all three sub-themes
- [ ] **Update the subtitle line** — search for `Week X:` and change the week number and theme description
- [ ] **Update the intro description paragraph** — search for `Three puzzles, three` and rewrite the second half to match the new theme
- [ ] **Update "all three ___" wording** on the completion screen — search for `all three` and make sure the noun matches (e.g. "events," "states," "sharks")
- [ ] **Update the top completion-screen emoji** — search for `text-3xl mb-4` to find the big emoji shown at the top of the "Adventure Complete" screen, and the matching one in the "Finish the Adventure" button — pick something that fits the new week's overall theme

## Part 2: Homepage card updates (you can do these solo)

In **`/app/page.js`**, search for `Summer Adventure` to find the card, then:

- [ ] Update the **`tagline`** to describe this week's 3 sub-themes
- [ ] (The `name`, `href`, and other structural fields stay the same — only the tagline needs a weekly refresh)

## Part 3: Color scheme & card art (let's do this together)

Recoloring touches many scattered lines across the file (background gradients, borders, button colors, hover states), so it's easy to miss a spot working solo. When you're ready to switch the palette — like moving from this teal/ocean-nature look to a Shark Week navy/gray look — send me the new theme and I'll walk you through:

- [ ] Updating the background gradients (intro, game, and completion screens)
- [ ] Updating the accent color used for buttons, borders, and highlights
- [ ] Updating the homepage card's gradient, border color, and background tint
- [ ] Updating the homepage card's icon/emoji to match the new theme

---

## Reminder for the final week: Shark Week & Marine Life

Since this is planned as a bigger visual shift (not just new words), let's handle Part 3 together when you're ready with the puzzle content — a navy/deep-blue palette with an ocean-life accent color would suit "Shark Week" nicely, and we can pick a fitting shark or wave emoji for the homepage card at the same time.
