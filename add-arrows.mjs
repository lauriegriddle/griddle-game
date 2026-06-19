import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

// Stories & Recipes button
content = content.replace(
  `{"\\u2728"} Stories & Recipes
          </button>`,
  `{"\\u2728"} Stories & Recipes {showStories ? '▲' : '▼'}
          </button>`
);

// Summer Days button
content = content.replace(
  `☀️ Summer Days
          </button>`,
  `☀️ Summer Days {showSummer ? '▲' : '▼'}
          </button>`
);

// Screen-Free Books button
content = content.replace(
  `🍳 Screen-Free Books ✏️
          </button>`,
  `🍳 Screen-Free Books ✏️ {showBooks ? '▲' : '▼'}
          </button>`
);

// Archive button - sideways arrow
content = content.replace(
  `🗂️ Puzzle Archive
          </button>`,
  `🗂️ Puzzle Archive →
          </button>`
);

writeFileSync('app/page.js', content);
console.log('Done!');
