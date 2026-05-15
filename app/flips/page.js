"use client";
import React, { useState, useEffect } from 'react';
import { Share2, Instagram, BarChart3, X } from 'lucide-react';

// Daily trivia questions - tied to Letter Griddle themes

// ============================================================
// LETTER GRIDDLE FLIPS - TRIVIA QUESTIONS
// ============================================================
// ACTIVE QUESTIONS: ids 111-135 (fresh content, May 15, 2026)
// BENCHED QUESTIONS: ids 1-110 (commented out below, reuse anytime)
//
// ANCHOR DATE SET TO: May 15, 2026 at 7:45 PM
// Update this in getTodaysQuestion():
//   const anchorDate = new Date(2026, 4, 15, 19, 45, 0, 0);
//   const ANCHOR_INDEX = 0;
// ============================================================

const triviaQuestions = [

  // ============================================================
  // ACTIVE QUESTIONS - ids 111-135
  // ============================================================

  {
    id: 111,
    theme: "Food & Drink 🧈",
    question: "Why is butter yellow?",
    options: [
      "Food coloring is added during production",
      "From beta-carotene in the grass cows eat",
      "The churning process oxidizes the fat",
      "It absorbs color from the cream"
    ],
    correctAnswer: "From beta-carotene in the grass cows eat",
    hint: "It comes from what the cow eats...",
    funFact: "Butter gets its yellow color from beta-carotene, the same pigment that makes carrots orange, found in the grass and plants cows eat. Grain-fed cows produce paler butter, which is why some manufacturers add annatto dye to keep color consistent year-round!"
  },
  {
    id: 112,
    theme: "Literature 📖",
    question: "What job did Mark Twain have before becoming a writer?",
    options: [
      "Riverboat pilot",
      "Schoolteacher",
      "Newspaper editor",
      "Telegraph operator"
    ],
    correctAnswer: "Riverboat pilot",
    hint: "It inspired his pen name...",
    funFact: "Mark Twain worked as a Mississippi River steamboat pilot before writing. His pen name comes from a riverboat term: 'mark twain' means two fathoms deep, the minimum safe depth for navigation. He called it the most wonderful job in the world before the Civil War shut down river traffic!"
  },
  {
    id: 113,
    theme: "Science 🌊",
    question: "How deep is the deepest point in the ocean?",
    options: [
      "About 20,000 feet",
      "About 36,000 feet",
      "About 50,000 feet",
      "About 60,000 feet"
    ],
    correctAnswer: "About 36,000 feet",
    hint: "It's in the Pacific Ocean...",
    funFact: "The Mariana Trench's Challenger Deep reaches about 36,000 feet, deep enough to submerge Mount Everest with a mile to spare! Less than 20 people have visited the bottom of the ocean, compared to over 600 who have been to space. The pressure there is over 1,000 times surface pressure."
  },
  {
    id: 114,
    theme: "Travel ✈️",
    question: "Which country has the most UNESCO World Heritage Sites?",
    options: [
      "China",
      "Italy",
      "Spain",
      "France"
    ],
    correctAnswer: "Italy",
    hint: "Think Roman ruins, Renaissance art, and ancient cities...",
    funFact: "Italy leads the world with 59 UNESCO World Heritage Sites, just edging out China! Sites include the Colosseum, Venice, Pompeii, the Amalfi Coast, and the historic centers of Florence and Rome. Italy has been continuously inhabited and culturally influential for over 3,000 years."
  },
  {
    id: 115,
    theme: "History 🏛️",
    question: "How long did the Roman Empire last?",
    options: [
      "About 200 years",
      "About 500 years",
      "About 1,000 years",
      "About 1,500 years"
    ],
    correctAnswer: "About 1,500 years",
    hint: "Much longer than most people think...",
    funFact: "If you count from the founding of Rome to the fall of the Eastern Roman Empire (Byzantine Empire) in 1453, Rome lasted roughly 1,500 years! The Western Empire fell in 476 AD, but the Eastern Empire continued for nearly another thousand years, only ending when Constantinople fell to the Ottomans."
  },
  {
    id: 116,
    theme: "Nature 🦋",
    question: "How far can monarch butterflies migrate?",
    options: [
      "Up to 500 miles",
      "Up to 1,000 miles",
      "Up to 3,000 miles",
      "Up to 5,000 miles"
    ],
    correctAnswer: "Up to 3,000 miles",
    hint: "They travel from Canada to Mexico...",
    funFact: "Monarch butterflies migrate up to 3,000 miles from Canada and the northern U.S. to their winter home in the mountains of central Mexico. The remarkable part: no single butterfly completes the round trip. It takes 3 to 4 generations to make the return journey, yet each new generation knows the way!"
  },
  {
    id: 117,
    theme: "Food & Drink 🍜",
    question: "What country invented noodles?",
    options: [
      "Italy",
      "Japan",
      "China",
      "India"
    ],
    correctAnswer: "China",
    hint: "Archaeologists found the oldest noodles there...",
    funFact: "The world's oldest noodles, about 4,000 years old, were discovered in China preserved under ten feet of sediment. Made from millet, they looked remarkably like modern ramen! Italy and China both developed pasta traditions independently, a great example of culinary parallel evolution."
  },
  {
    id: 118,
    theme: "Literature 📖",
    question: "How long did it take Tolkien to write The Lord of the Rings?",
    options: [
      "About 2 years",
      "About 5 years",
      "About 12 years",
      "About 20 years"
    ],
    correctAnswer: "About 12 years",
    hint: "He started it right after The Hobbit...",
    funFact: "J.R.R. Tolkien spent about 12 years writing The Lord of the Rings, from 1937 to 1949, though it wasn't published until 1954. He invented entire languages, including Elvish, and drew detailed maps of Middle-earth. He considered the whole work a mythology for England, which he felt lacked one."
  },
  {
    id: 119,
    theme: "Geography 🌏",
    question: "What is the only country in the world that is also a continent?",
    options: [
      "Greenland",
      "Australia",
      "Antarctica",
      "New Zealand"
    ],
    correctAnswer: "Australia",
    hint: "It's in the Southern Hemisphere...",
    funFact: "Australia is the only nation that is also its own continent! It's the world's sixth-largest country and home to some of the most unique wildlife on Earth, including kangaroos, koalas, and platypuses. About 80% of its plant and animal species are found nowhere else on the planet."
  },
  {
    id: 120,
    theme: "History 📜",
    question: "What was the first printed book in Europe?",
    options: [
      "The Canterbury Tales",
      "Don Quixote",
      "The Gutenberg Bible",
      "Shakespeare's First Folio"
    ],
    correctAnswer: "The Gutenberg Bible",
    hint: "It was printed in the 1450s...",
    funFact: "Johannes Gutenberg printed his famous Bible around 1455 using the first movable-type printing press in Europe. Before this, books had to be copied by hand, often taking years. Gutenberg's press is considered one of the most important inventions in history, democratizing knowledge and fueling the Renaissance and Reformation."
  },
  {
    id: 121,
    theme: "Science 🧠",
    question: "What percentage of the brain is water?",
    options: [
      "About 40%",
      "About 60%",
      "About 73%",
      "About 90%"
    ],
    correctAnswer: "About 73%",
    hint: "More than most people would guess...",
    funFact: "The human brain is about 73% water, which is why even mild dehydration can affect concentration and mood. The brain also uses about 20% of the body's total energy despite being only 2% of its weight. It generates enough electrical activity to power a small light bulb!"
  },
  {
    id: 122,
    theme: "Travel 🗺️",
    question: "What is the most visited city in the world?",
    options: [
      "Paris",
      "New York City",
      "Bangkok",
      "London"
    ],
    correctAnswer: "Bangkok",
    hint: "It's in Southeast Asia...",
    funFact: "Bangkok, Thailand consistently ranks as the world's most visited city, welcoming over 20 million international tourists annually! Its official ceremonial name is one of the longest place names in the world, with 168 characters in Thai. The city is known for its ornate temples, vibrant street food, and legendary hospitality."
  },
  {
    id: 123,
    theme: "Food & Drink 🍫",
    question: "How many cacao beans does it take to make one pound of chocolate?",
    options: [
      "About 50 beans",
      "About 200 beans",
      "About 400 beans",
      "About 1,000 beans"
    ],
    correctAnswer: "About 400 beans",
    hint: "Far more than most people realize...",
    funFact: "It takes about 400 cacao beans, the entire yield of a cacao tree for a full year, to make just one pound of chocolate! The Aztecs considered cacao so valuable they used the beans as currency. Today, the world consumes about 7.5 million tons of chocolate per year."
  },
  {
    id: 124,
    theme: "Literature 📖",
    question: "What classic novel begins with 'Call me Ishmael'?",
    options: [
      "Robinson Crusoe",
      "Moby-Dick",
      "The Old Man and the Sea",
      "Twenty Thousand Leagues Under the Sea"
    ],
    correctAnswer: "Moby-Dick",
    hint: "It involves a white whale...",
    funFact: "Moby-Dick by Herman Melville was published in 1851 and was a commercial failure during his lifetime. Today it's considered one of the greatest American novels. Melville based it on two real events: the sinking of the whale ship Essex in 1820 and the story of a real albino sperm whale known as Mocha Dick!"
  },
  {
    id: 125,
    theme: "Nature 🌋",
    question: "How many volcanoes does Indonesia have?",
    options: [
      "About 30",
      "About 75",
      "About 130",
      "About 400"
    ],
    correctAnswer: "About 130",
    hint: "It sits on the Pacific Ring of Fire...",
    funFact: "Indonesia has about 130 active volcanoes, more than any other country on Earth! It sits on the Pacific Ring of Fire where tectonic plates collide. The 1883 eruption of Krakatoa was heard 3,000 miles away and caused a global drop in temperature. Volcanic soil makes Indonesian land exceptionally fertile."
  },
  {
    id: 126,
    theme: "History 🎖️",
    question: "What ancient wonder of the world still stands today?",
    options: [
      "The Colossus of Rhodes",
      "The Lighthouse of Alexandria",
      "The Great Pyramid of Giza",
      "The Hanging Gardens of Babylon"
    ],
    correctAnswer: "The Great Pyramid of Giza",
    hint: "It's in Egypt...",
    funFact: "The Great Pyramid of Giza is the only one of the Seven Wonders of the Ancient World still standing. Built around 2560 BC, it was the tallest man-made structure in the world for over 3,800 years! It contains an estimated 2.3 million stone blocks, each weighing 2.5 to 15 tons."
  },
  {
    id: 127,
    theme: "Science 🌡️",
    question: "At what temperature are Fahrenheit and Celsius the same?",
    options: [
      "-32 degrees",
      "-40 degrees",
      "0 degrees",
      "-20 degrees"
    ],
    correctAnswer: "-40 degrees",
    hint: "It's very cold...",
    funFact: "Fahrenheit and Celsius meet at exactly -40 degrees! Below that point, Celsius readings are always higher numbers than Fahrenheit. The two scales were invented about 20 years apart: Fahrenheit in 1724 and Celsius in 1742. Interestingly, Celsius originally had 0 as boiling and 100 as freezing before it was reversed!"
  },
  {
    id: 128,
    theme: "Travel 🏯",
    question: "How long is the Great Wall of China?",
    options: [
      "About 1,000 miles",
      "About 5,500 miles",
      "About 13,000 miles",
      "About 20,000 miles"
    ],
    correctAnswer: "About 13,000 miles",
    hint: "Much longer than most people think...",
    funFact: "The Great Wall of China stretches about 13,000 miles when all its sections and branches are measured together! Construction spanned more than 2,000 years across multiple dynasties. Contrary to popular belief, it is NOT visible from space with the naked eye; astronauts have confirmed this!"
  },
  {
    id: 129,
    theme: "Food & Drink 🫙",
    question: "Why do crackers have holes in them?",
    options: [
      "For decoration and branding",
      "To let steam escape during baking",
      "To make them easier to break apart",
      "To reduce calorie content"
    ],
    correctAnswer: "To let steam escape during baking",
    hint: "Think about what happens inside the oven...",
    funFact: "The holes in crackers, called 'docker holes,' let steam escape during baking so the crackers stay flat and crisp. Without them, the steam would create air pockets and the crackers would puff up like pita bread! The tool that makes the holes is called a docker."
  },
  {
    id: 130,
    theme: "Literature 📖",
    question: "Which author is one of the most prolific novelists of all time with over 225 books?",
    options: [
      "Agatha Christie",
      "Stephen King",
      "Nora Roberts",
      "Isaac Asimov"
    ],
    correctAnswer: "Nora Roberts",
    hint: "A beloved romance writer with several pen names...",
    funFact: "Nora Roberts has published over 225 novels and is one of the best-selling authors of all time with over 500 million copies sold. She writes under the pen name J.D. Robb for her futuristic crime series. She once wrote two complete novels during a single blizzard that trapped her at home!"
  },
  {
    id: 131,
    theme: "Nature 🐝",
    question: "How do bees communicate the location of flowers to each other?",
    options: [
      "Through a series of buzzing sounds",
      "By leaving a scent trail",
      "Through a waggle dance",
      "By touching antennae"
    ],
    correctAnswer: "Through a waggle dance",
    hint: "It's surprisingly literal...",
    funFact: "Honeybees perform a 'waggle dance' to tell hivemates exactly where to find food! The angle of the dance corresponds to the direction relative to the sun, and the duration indicates distance. Karl von Frisch decoded this bee language in the 1940s and won the Nobel Prize for it in 1973!"
  },
  {
    id: 132,
    theme: "History 🌏",
    question: "Which civilization invented the wheel?",
    options: [
      "Ancient Egyptians",
      "Ancient Mesopotamians",
      "Ancient Greeks",
      "Ancient Chinese"
    ],
    correctAnswer: "Ancient Mesopotamians",
    hint: "Think modern-day Iraq...",
    funFact: "The wheel was invented around 3500 BC in Mesopotamia, in the region of modern-day Iraq. Interestingly, the first wheels weren't used for transportation; they were potter's wheels for shaping clay! Wheels used for vehicles came about 300 years later. The Aztec and Inca empires, remarkably, never developed the wheel."
  },
  {
    id: 133,
    theme: "Science 🔭",
    question: "How old is the universe?",
    options: [
      "About 4.5 billion years",
      "About 7 billion years",
      "About 13.8 billion years",
      "About 20 billion years"
    ],
    correctAnswer: "About 13.8 billion years",
    hint: "It started with the Big Bang...",
    funFact: "The universe is estimated to be about 13.8 billion years old, determined by measuring the cosmic microwave background radiation left over from the Big Bang. For context, Earth is about 4.5 billion years old, meaning the universe existed for over 9 billion years before our planet formed!"
  },
  {
    id: 134,
    theme: "Travel 🇯🇵",
    question: "What is Japan's bullet train called?",
    options: [
      "Fuji Express",
      "Shinkansen",
      "Hikari",
      "Nozomi"
    ],
    correctAnswer: "Shinkansen",
    hint: "The name means 'new trunk line'...",
    funFact: "Japan's Shinkansen bullet train network has been operating since 1964 and has carried over 10 billion passengers with zero passenger fatalities from accidents! Trains run every few minutes and average delays of under one minute. Staff bow to passengers as trains depart, and food wrappers are designed to be virtually silent out of respect for fellow travelers."
  },
  {
    id: 135,
    theme: "Food & Drink 🥐",
    question: "What determines the flavor of vanilla ice cream?",
    options: [
      "The type of milk used",
      "The source and quality of the vanilla bean",
      "The churning speed",
      "The sugar-to-cream ratio"
    ],
    correctAnswer: "The source and quality of the vanilla bean",
    hint: "It all starts with the pod...",
    funFact: "True vanilla flavor comes from vanilla beans, the seed pods of a tropical orchid vine. Madagascar produces about 80% of the world's vanilla. Each flower must be hand-pollinated within 12 hours of blooming, making real vanilla one of the world's most labor-intensive spices and second only to saffron in price per pound!"
  },

];

/*
// ============================================================
// BENCHED QUESTIONS - ids 1-110
// Uncomment and move above the closing ]; to restore
// ============================================================

  {
    id: 1,
    theme: "Pancakes 🥞",
    question: "What country celebrates National Pancake Day on Shrove Tuesday?",
    options: ["United States", "Canada", "United Kingdom", "Australia"],
    correctAnswer: "United Kingdom",
    hint: "Across the pond...",
    funFact: "In the UK, Shrove Tuesday is called 'Pancake Day' and dates back to 1100 AD. It was a way to use up rich foods before Lent!"
  },
  {
    id: 2,
    theme: "Pancakes 🥞",
    question: "What is the main leavening agent in traditional pancakes?",
    options: ["Yeast", "Baking powder", "Egg whites", "Cream of tartar"],
    correctAnswer: "Baking powder",
    hint: "It makes them fluffy without waiting...",
    funFact: "Baking powder was invented in 1843 and revolutionized pancake making. Before that, cooks used yeast, which required hours of rising time!"
  },
  {
    id: 3,
    theme: "Pancakes 🥞",
    question: "Which U.S. state produces the most maple syrup?",
    options: ["Maine", "New York", "Vermont", "New Hampshire"],
    correctAnswer: "Vermont",
    hint: "Think green mountains...",
    funFact: "Vermont produces about 2 million gallons of maple syrup each year. It takes 40 gallons of sap to make just 1 gallon of syrup!"
  },
  {
    id: 4,
    theme: "Breakfast 🍳",
    question: "Which meal's name literally means 'to break the fast'?",
    options: ["Lunch", "Dinner", "Breakfast", "Brunch"],
    correctAnswer: "Breakfast",
    hint: "Think about what you haven't done all night...",
    funFact: "The word 'breakfast' first appeared in English in the 15th century. It refers to breaking the fasting period of the night!"
  },
  {
    id: 5,
    theme: "Breakfast 🍳",
    question: "In which country did croissants originate?",
    options: ["France", "Austria", "Belgium", "Switzerland"],
    correctAnswer: "Austria",
    hint: "Not where you might think...",
    funFact: "The croissant originated in Vienna, Austria as the 'kipferl.' It didn't become popular in France until the 1830s!"
  },
  {
    id: 6,
    theme: "Breakfast 🍳",
    question: "What gives orange juice its cloudy appearance?",
    options: ["Sugar", "Pulp and pectin", "Vitamin C", "Citric acid"],
    correctAnswer: "Pulp and pectin",
    hint: "The natural stuff inside...",
    funFact: "Fresh-squeezed orange juice is cloudy because of pectin and pulp. Clear juice has been filtered and processed to remove these!"
  },
  {
    id: 7,
    theme: "Coffee ☕",
    question: "Which country is the largest producer of coffee in the world?",
    options: ["Colombia", "Vietnam", "Ethiopia", "Brazil"],
    correctAnswer: "Brazil",
    hint: "The largest country in South America...",
    funFact: "Brazil produces about one-third of the world's coffee. Coffee was first planted there in 1727 and transformed the country's economy!"
  },
  {
    id: 8,
    theme: "Coffee ☕",
    question: "What does 'espresso' mean in Italian?",
    options: ["Strong", "Pressed out", "Quick", "Dark"],
    correctAnswer: "Pressed out",
    hint: "Think about how it's made...",
    funFact: "Espresso means 'pressed out' in Italian, referring to how hot water is pressed through finely ground coffee. It was invented in Italy in 1884!"
  },
  {
    id: 9,
    theme: "Coffee ☕",
    question: "According to legend, who discovered coffee?",
    options: ["A farmer", "A goat herder", "A monk", "A king"],
    correctAnswer: "A goat herder",
    hint: "His animals acted strangely...",
    funFact: "Legend says an Ethiopian goat herder named Kaldi noticed his goats became energetic after eating coffee berries around 800 AD!"
  },
  {
    id: 10,
    theme: "Movies 🎬",
    question: "What was the first fully computer-animated feature film?",
    options: ["Shrek", "Toy Story", "A Bug's Life", "Finding Nemo"],
    correctAnswer: "Toy Story",
    hint: "To infinity and beyond...",
    funFact: "Toy Story was released by Pixar in 1995 and took four years to make. It was the first feature film made entirely with CGI!"
  },
  {
    id: 11,
    theme: "Movies 🎬",
    question: "Which movie features the quote 'Here's looking at you, kid'?",
    options: ["Gone with the Wind", "The Maltese Falcon", "Casablanca", "Citizen Kane"],
    correctAnswer: "Casablanca",
    hint: "A classic romance set during WWII...",
    funFact: "Casablanca was released in 1942 and won Best Picture. Humphrey Bogart improvised 'Here's looking at you, kid' during filming!"
  },
  {
    id: 12,
    theme: "Movies 🎬",
    question: "How many Oscars did 'Titanic' win in 1998?",
    options: ["9", "10", "11", "12"],
    correctAnswer: "11",
    hint: "It tied for the all-time record...",
    funFact: "Titanic won 11 Oscars, tying with Ben-Hur and later Lord of the Rings: Return of the King for the most wins ever!"
  },
  {
    id: 13,
    theme: "Music 🎵",
    question: "Which instrument has 88 keys?",
    options: ["Organ", "Harpsichord", "Piano", "Accordion"],
    correctAnswer: "Piano",
    hint: "A popular instrument for beginners and masters alike...",
    funFact: "The standard piano has 88 keys: 52 white and 36 black. This range covers over 7 octaves of musical notes!"
  },
  {
    id: 14,
    theme: "Music 🎵",
    question: "The Beatles were from which English city?",
    options: ["London", "Manchester", "Liverpool", "Birmingham"],
    correctAnswer: "Liverpool",
    hint: "A famous port city in the northwest...",
    funFact: "The Beatles formed in Liverpool in 1960. The city now has a Beatles museum, statues, and themed tours honoring the Fab Four!"
  },
  {
    id: 15,
    theme: "Music 🎵",
    question: "What does 'MTV' stand for?",
    options: ["Music TV", "Music Television", "Musical Television", "Media Television"],
    correctAnswer: "Music Television",
    hint: "It launched in 1981...",
    funFact: "MTV launched on August 1, 1981. The first music video played was 'Video Killed the Radio Star' by The Buggles!"
  },
  {
    id: 16,
    theme: "Books 📚",
    question: "Who wrote 'Pride and Prejudice'?",
    options: ["Charlotte Bronte", "Jane Austen", "Mary Shelley", "Emily Bronte"],
    correctAnswer: "Jane Austen",
    hint: "A beloved English author from the early 1800s...",
    funFact: "Jane Austen published Pride and Prejudice in 1813. She originally titled it 'First Impressions' when she wrote it at age 21!"
  },
  {
    id: 17,
    theme: "Books 📚",
    question: "In what year was the first Harry Potter book published?",
    options: ["1995", "1997", "1999", "2001"],
    correctAnswer: "1997",
    hint: "The late 1990s...",
    funFact: "Harry Potter and the Philosopher's Stone was published in 1997 with just 500 copies. The series has now sold over 500 million books!"
  },
  {
    id: 18,
    theme: "Books 📚",
    question: "What is the best-selling book of all time (excluding religious texts)?",
    options: ["Harry Potter", "Don Quixote", "A Tale of Two Cities", "The Lord of the Rings"],
    correctAnswer: "Don Quixote",
    hint: "A Spanish classic about a knight...",
    funFact: "Don Quixote by Miguel de Cervantes has sold over 500 million copies since 1605. It's considered the first modern novel!"
  },
  {
    id: 19,
    theme: "Geography 🌍",
    question: "What is the smallest country in the world?",
    options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
    correctAnswer: "Vatican City",
    hint: "It's completely surrounded by Rome...",
    funFact: "Vatican City is only 0.17 square miles and has about 800 residents. It became an independent state in 1929!"
  },
  {
    id: 20,
    theme: "Geography 🌍",
    question: "Which river flows through the most countries?",
    options: ["Nile", "Amazon", "Danube", "Rhine"],
    correctAnswer: "Danube",
    hint: "A famous European river...",
    funFact: "The Danube flows through 10 countries: Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova, and Ukraine!"
  },
  {
    id: 21,
    theme: "Geography 🌍",
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: "Canberra",
    hint: "It's not the largest city...",
    funFact: "Canberra was purpose-built as the capital in 1913. Sydney and Melbourne both wanted to be capital, so a new city was created!"
  },
  {
    id: 22,
    theme: "Animals 🐾",
    question: "How many hearts does an octopus have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    hint: "More than you might expect...",
    funFact: "Octopuses have 3 hearts! Two pump blood to the gills, and one pumps blood to the rest of the body. They also have blue blood!"
  },
  {
    id: 23,
    theme: "Animals 🐾",
    question: "What is the only mammal that can truly fly?",
    options: ["Flying squirrel", "Sugar glider", "Bat", "Colugo"],
    correctAnswer: "Bat",
    hint: "Other 'flying' mammals only glide...",
    funFact: "Bats are the only mammals capable of sustained flight. Flying squirrels and sugar gliders can only glide short distances!"
  },
  {
    id: 24,
    theme: "Animals 🐾",
    question: "What animal's fingerprints are nearly identical to humans?",
    options: ["Chimpanzee", "Gorilla", "Koala", "Orangutan"],
    correctAnswer: "Koala",
    hint: "An Australian marsupial...",
    funFact: "Koala fingerprints are so similar to human prints that they could theoretically confuse crime scene investigators!"
  },
  {
    id: 25,
    theme: "Science 🔬",
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Titanium"],
    correctAnswer: "Diamond",
    hint: "It's also a gemstone...",
    funFact: "Diamonds are made of carbon atoms arranged in a crystal structure. They form about 100 miles below Earth's surface!"
  },
  {
    id: 26,
    theme: "Science 🔬",
    question: "What planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    hint: "Named after the Roman god of war...",
    funFact: "Mars appears red because of iron oxide (rust) on its surface. A day on Mars is only 37 minutes longer than an Earth day!"
  },
  {
    id: 27,
    theme: "Science 🔬",
    question: "What gas do plants absorb from the air?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctAnswer: "Carbon dioxide",
    hint: "We breathe this out...",
    funFact: "Plants absorb carbon dioxide and release oxygen through photosynthesis. A single tree can absorb about 48 pounds of CO2 per year!"
  },
  {
    id: 28,
    theme: "TV Shows 📺",
    question: "What was the name of the coffee shop in 'Friends'?",
    options: ["Central Park", "Central Perk", "Coffee Central", "The Coffee House"],
    correctAnswer: "Central Perk",
    hint: "A play on words with a famous park...",
    funFact: "Central Perk's orange couch was found in a Warner Bros. storage basement. The set designers kept it because it fit perfectly!"
  },
  {
    id: 29,
    theme: "TV Shows 📺",
    question: "How many seasons did 'The Office' (US) run?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "9",
    hint: "It started in 2005 and ended in 2013...",
    funFact: "The Office ran for 9 seasons with 201 episodes. Steve Carell left after season 7, but the show continued for two more seasons!"
  },
  {
    id: 30,
    theme: "TV Shows 📺",
    question: "What year did 'Seinfeld' first air?",
    options: ["1987", "1989", "1991", "1993"],
    correctAnswer: "1989",
    hint: "The end of the 1980s...",
    funFact: "Seinfeld debuted in 1989 as 'The Seinfeld Chronicles.' It was almost cancelled after the pilot but went on to become one of TV's biggest hits!"
  },
  {
    id: 31,
    theme: "Winter Olympics ❄️",
    question: "Where are the 2026 Winter Olympics being held?",
    options: ["Salt Lake City, USA", "Milan-Cortina, Italy", "Sapporo, Japan", "Stockholm, Sweden"],
    correctAnswer: "Milan-Cortina, Italy",
    hint: "Two Italian cities are sharing hosting duties...",
    funFact: "The 2026 Winter Olympics will be held across two Italian cities: Milan and Cortina d'Ampezzo. This is Italy's fourth time hosting the Winter Games!"
  },
  {
    id: 32,
    theme: "Winter Olympics ❄️",
    question: "Where were the first Winter Olympics held in 1924?",
    options: ["St. Moritz, Switzerland", "Chamonix, France", "Oslo, Norway", "Lake Placid, USA"],
    correctAnswer: "Chamonix, France",
    hint: "A French Alpine town...",
    funFact: "The first Winter Olympics were held in Chamonix, France in 1924. Only 16 nations and 258 athletes competed, compared to thousands today!"
  },
  {
    id: 33,
    theme: "Winter Olympics ❄️",
    question: "Which country has won the most Winter Olympic medals of all time?",
    options: ["United States", "Russia", "Norway", "Germany"],
    correctAnswer: "Norway",
    hint: "A Scandinavian nation known for skiing...",
    funFact: "Norway has won over 400 Winter Olympic medals, more than any other country. Their success comes largely from cross-country skiing and biathlon!"
  },
  {
    id: 34,
    theme: "Winter Olympics ❄️",
    question: "How many rings are in the Olympic symbol?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "5",
    hint: "One for each inhabited continent...",
    funFact: "The five Olympic rings represent the five inhabited continents: Africa, the Americas, Asia, Europe, and Oceania. The design was created in 1913!"
  },
  {
    id: 35,
    theme: "Winter Olympics ❄️",
    question: "Which figure skater landed the first quadruple jump in Olympic competition?",
    options: ["Scott Hamilton", "Brian Boitano", "Kurt Browning", "Brian Orser"],
    correctAnswer: "Kurt Browning",
    hint: "A Canadian skater in the late 1980s...",
    funFact: "Kurt Browning of Canada landed the first ratified quadruple jump in competition in 1988. Today, top skaters regularly land multiple quads in a single program!"
  },
  {
    id: 36,
    theme: "Winter Olympics ❄️",
    question: "What sport combines cross-country skiing and rifle shooting?",
    options: ["Nordic combined", "Biathlon", "Ski jumping", "Freestyle skiing"],
    correctAnswer: "Biathlon",
    hint: "Athletes must hit targets between skiing legs...",
    funFact: "Biathlon originated as training for Norwegian military patrol units. Athletes ski up to 20 kilometers and must shoot at targets from both standing and prone positions!"
  },
  {
    id: 37,
    theme: "Winter Olympics ❄️",
    question: "Which country invented the sport of curling?",
    options: ["Canada", "Sweden", "Scotland", "Norway"],
    correctAnswer: "Scotland",
    hint: "Think bagpipes and kilts...",
    funFact: "Curling originated in Scotland in the 16th century. The oldest curling stone, found at the bottom of a Scottish pond, dates back to 1511!"
  },
  {
    id: 38,
    theme: "Winter Olympics ❄️",
    question: "How long is a standard Olympic hockey game?",
    options: ["40 minutes", "48 minutes", "60 minutes", "90 minutes"],
    correctAnswer: "60 minutes",
    hint: "Three periods of equal length...",
    funFact: "Olympic hockey games consist of three 20-minute periods. The sport has been part of the Winter Olympics since the first games in 1924!"
  },
  {
    id: 39,
    theme: "Winter Olympics ❄️",
    question: "What is the 'Miracle on Ice'?",
    options: ["A figure skating move", "USA hockey beating USSR in 1980", "A speed skating record", "The first triple axel"],
    correctAnswer: "USA hockey beating USSR in 1980",
    hint: "Lake Placid, Cold War, amateur vs. professionals...",
    funFact: "The 'Miracle on Ice' was when the underdog US amateur hockey team defeated the heavily favored Soviet team 4-3 at the 1980 Lake Placid Olympics!"
  },
  {
    id: 40,
    theme: "Winter Olympics ❄️",
    question: "What do athletes slide down in the luge?",
    options: ["A bobsled track", "An ice chute", "A ski slope", "A half-pipe"],
    correctAnswer: "An ice chute",
    hint: "They lie on their backs on a small sled...",
    funFact: "Luge athletes reach speeds over 90 mph while lying feet-first on a tiny sled. They steer using only subtle leg movements and body shifts!"
  },
  {
    id: 41,
    theme: "Winter Olympics ❄️",
    question: "Which jump is considered the most difficult in figure skating?",
    options: ["Lutz", "Salchow", "Axel", "Loop"],
    correctAnswer: "Axel",
    hint: "It's the only jump that takes off facing forward...",
    funFact: "The axel is the hardest jump because it requires an extra half rotation. A triple axel is actually 3.5 rotations! It's named after Norwegian skater Axel Paulsen."
  },
  {
    id: 42,
    theme: "Winter Olympics ❄️",
    question: "How many athletes are on a bobsled team in the four-man event?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4",
    hint: "The name gives it away...",
    funFact: "A four-man bobsled team includes a pilot, brakeman, and two pushers. The sled and crew together can weigh up to 1,389 pounds!"
  },
  {
    id: 43,
    theme: "Winter Olympics ❄️",
    question: "What is the half-pipe event named after?",
    options: ["A musical instrument", "A plumbing fixture", "Its shape", "Its inventor"],
    correctAnswer: "Its shape",
    hint: "Think about what it looks like from the side...",
    funFact: "The half-pipe is shaped like a tube cut in half lengthwise. Snowboard half-pipes at the Olympics are 22 feet tall with walls at 18-foot vertical!"
  },
  {
    id: 44,
    theme: "Winter Olympics ❄️",
    question: "Which Winter Olympic sport features the 'skeleton' event?",
    options: ["Skiing", "Sliding", "Skating", "Snowboarding"],
    correctAnswer: "Sliding",
    hint: "Athletes go headfirst down an icy track...",
    funFact: "In skeleton, athletes dive headfirst onto a tiny sled and race down the same track used for bobsled and luge, reaching speeds over 80 mph!"
  },
  {
    id: 45,
    theme: "Winter Olympics ❄️",
    question: "What country dominates short track speed skating?",
    options: ["Netherlands", "USA", "South Korea", "Japan"],
    correctAnswer: "South Korea",
    hint: "An Asian powerhouse in this event...",
    funFact: "South Korea has won more Olympic medals in short track speed skating than any other country. The sport is incredibly popular there!"
  },
  {
    id: 46,
    theme: "Winter Olympics ❄️",
    question: "How many sports are in the Winter Olympics?",
    options: ["7", "12", "15", "20"],
    correctAnswer: "15",
    hint: "More than you might think...",
    funFact: "The Winter Olympics features 15 sports including alpine skiing, biathlon, bobsled, curling, figure skating, ice hockey, luge, skeleton, snowboarding, and speed skating!"
  },
  {
    id: 47,
    theme: "Winter Olympics ❄️",
    question: "What color medal is awarded for third place?",
    options: ["Gold", "Silver", "Bronze", "Copper"],
    correctAnswer: "Bronze",
    hint: "A brownish metal...",
    funFact: "Olympic bronze medals are made of copper and tin. Gold medals are actually mostly silver with gold plating, and must contain at least 6 grams of gold!"
  },
  {
    id: 48,
    theme: "Winter Olympics ❄️",
    question: "Which city has hosted the Winter Olympics three times?",
    options: ["Innsbruck, Austria", "Lake Placid, USA", "St. Moritz, Switzerland", "None yet"],
    correctAnswer: "None yet",
    hint: "Two cities have hosted twice, but none three times...",
    funFact: "No city has hosted three Winter Olympics yet. Innsbruck (1964, 1976), St. Moritz (1928, 1948), and Lake Placid (1932, 1980) have each hosted twice!"
  },
  {
    id: 49,
    theme: "Science 🔬",
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Brain", "Skin"],
    correctAnswer: "Skin",
    hint: "It covers your entire body...",
    funFact: "Your skin weighs about 8 pounds and covers roughly 22 square feet. It completely renews itself every 27 days!"
  },
  {
    id: 50,
    theme: "Science 🔬",
    question: "How many bones are in the adult human body?",
    options: ["106", "206", "306", "406"],
    correctAnswer: "206",
    hint: "More than 200 but less than 250...",
    funFact: "Babies are born with about 270 bones, but many fuse together as we grow. By adulthood, we have 206 bones!"
  },
  {
    id: 51,
    theme: "Science 🔬",
    question: "What planet has the most moons in our solar system?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn",
    hint: "The one with the famous rings...",
    funFact: "Saturn has over 140 known moons, surpassing Jupiter's count. Scientists keep discovering new ones with better telescopes!"
  },
  {
    id: 52,
    theme: "Science 🔬",
    question: "What is the speed of light?",
    options: ["186,000 miles per hour", "186,000 miles per second", "1 million miles per hour", "1 million miles per second"],
    correctAnswer: "186,000 miles per second",
    hint: "It's incredibly fast, measured per second...",
    funFact: "Light travels at 186,000 miles per second. At that speed, it takes sunlight about 8 minutes to reach Earth from the Sun!"
  },
  {
    id: 53,
    theme: "Science 🔬",
    question: "What element does 'O' represent on the periodic table?",
    options: ["Gold", "Osmium", "Oxygen", "Oganesson"],
    correctAnswer: "Oxygen",
    hint: "You breathe it every day...",
    funFact: "Oxygen makes up about 21% of Earth's atmosphere. It was discovered independently by two scientists in the 1770s!"
  },
  {
    id: 54,
    theme: "Science 🔬",
    question: "What is the closest star to Earth?",
    options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"],
    correctAnswer: "The Sun",
    hint: "It rises every morning...",
    funFact: "The Sun is about 93 million miles from Earth. The next closest star, Proxima Centauri, is over 4 light-years away!"
  },
  {
    id: 55,
    theme: "Science 🔬",
    question: "What do bees collect from flowers to make honey?",
    options: ["Pollen", "Nectar", "Sap", "Dew"],
    correctAnswer: "Nectar",
    hint: "A sweet liquid inside the flower...",
    funFact: "Bees visit up to 5,000 flowers in a single day to collect nectar. It takes about 60,000 bees traveling 55,000 miles to make one pound of honey!"
  },
  {
    id: 56,
    theme: "Science 🔬",
    question: "What causes thunder?",
    options: ["Clouds colliding", "Lightning heating air", "Wind speed", "Rain falling"],
    correctAnswer: "Lightning heating air",
    hint: "It always follows lightning...",
    funFact: "Lightning heats the air to around 30,000 degrees Fahrenheit, causing it to expand rapidly and create a sonic boom we hear as thunder!"
  },
  {
    id: 57,
    theme: "Science 🔬",
    question: "How long does it take Earth to orbit the Sun?",
    options: ["24 hours", "30 days", "365 days", "1,000 days"],
    correctAnswer: "365 days",
    hint: "Think about a calendar...",
    funFact: "Earth's orbit is actually 365.25 days, which is why we add a leap day every four years to keep our calendars accurate!"
  },
  {
    id: 58,
    theme: "Science 🔬",
    question: "What are the three states of matter taught in elementary school?",
    options: ["Hot, cold, warm", "Solid, liquid, gas", "Hard, soft, fluid", "Ice, water, steam"],
    correctAnswer: "Solid, liquid, gas",
    hint: "Water can be all three...",
    funFact: "There are actually more states of matter, including plasma (found in stars and lightning) and Bose-Einstein condensate, which only exists near absolute zero!"
  },
  {
    id: 59,
    theme: "Geography 🌍",
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    correctAnswer: "Nile",
    hint: "It flows through Egypt...",
    funFact: "The Nile River stretches about 4,132 miles through 11 African countries. Ancient Egyptians called it 'Ar' meaning 'black' because of its dark sediment!"
  },
  {
    id: 60,
    theme: "Geography 🌍",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correctAnswer: "Pacific",
    hint: "Its name means peaceful...",
    funFact: "The Pacific Ocean covers more area than all the land on Earth combined! It contains more than half of the world's free water."
  },
  {
    id: 61,
    theme: "Geography 🌍",
    question: "Which continent has the most countries?",
    options: ["Asia", "Europe", "Africa", "South America"],
    correctAnswer: "Africa",
    hint: "It's the second largest continent...",
    funFact: "Africa has 54 recognized countries. The newest is South Sudan, which became independent in 2011!"
  },
  {
    id: 62,
    theme: "Geography 🌍",
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Mount Kilimanjaro", "Denali"],
    correctAnswer: "Mount Everest",
    hint: "Located in the Himalayas...",
    funFact: "Mount Everest stands at 29,032 feet tall and grows about half an inch each year due to tectonic plate movement!"
  },
  {
    id: 63,
    theme: "Geography 🌍",
    question: "Which U.S. state has the most coastline?",
    options: ["California", "Florida", "Alaska", "Hawaii"],
    correctAnswer: "Alaska",
    hint: "It's the largest state...",
    funFact: "Alaska has over 6,600 miles of coastline, more than all other U.S. states combined! Its coastline is longer than the entire U.S. Atlantic coast."
  },
  {
    id: 64,
    theme: "Geography 🌍",
    question: "What country has the largest population in the world?",
    options: ["United States", "China", "India", "Indonesia"],
    correctAnswer: "India",
    hint: "It recently passed China...",
    funFact: "India surpassed China as the world's most populous country in 2023, with over 1.4 billion people. That's about 17% of all humans on Earth!"
  },
  {
    id: 65,
    theme: "Geography 🌍",
    question: "What is the driest place on Earth?",
    options: ["Sahara Desert", "Death Valley", "Atacama Desert", "Gobi Desert"],
    correctAnswer: "Atacama Desert",
    hint: "It's in South America...",
    funFact: "Parts of Chile's Atacama Desert have never recorded rainfall in human history! Scientists use it to test Mars rovers because it's so similar to the Martian surface."
  },
  {
    id: 66,
    theme: "Geography 🌍",
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    hint: "Count them: Africa, Antarctica, Asia...",
    funFact: "The seven continents are Africa, Antarctica, Asia, Australia, Europe, North America, and South America. Together they make up about 30% of Earth's surface!"
  },
  {
    id: 67,
    theme: "Geography 🌍",
    question: "Which country is both in Europe and Asia?",
    options: ["Russia", "Turkey", "Egypt", "Both Russia and Turkey"],
    correctAnswer: "Both Russia and Turkey",
    hint: "More than one country straddles the divide...",
    funFact: "Both Russia and Turkey span two continents. Istanbul, Turkey is the only major city in the world located on two continents!"
  },
  {
    id: 68,
    theme: "Geography 🌍",
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
    correctAnswer: "Antarctic",
    hint: "Deserts are defined by precipitation, not heat...",
    funFact: "Antarctica is technically the world's largest desert because it receives less than 10 inches of precipitation per year. The Sahara is the largest hot desert!"
  },
  {
    id: 69,
    theme: "Food & Drink ☕",
    question: "According to legend, how was tea discovered?",
    options: ["A monk brewed it intentionally", "Leaves fell into an emperor's boiling water", "It was found growing wild in a market", "A sailor mixed herbs with seawater"],
    correctAnswer: "Leaves fell into an emperor's boiling water",
    hint: "The story involves a Chinese emperor and an accident...",
    funFact: "According to legend, Chinese Emperor Shennong discovered tea in 2737 BC when leaves from a wild tree accidentally fell into his pot of boiling water. Today tea is the second most consumed beverage in the world after water!"
  },
  {
    id: 70,
    theme: "Food & Drink 🍰",
    question: "What ancient group was served cheesecake for energy?",
    options: ["Roman gladiators", "Egyptian pharaohs", "Greek Olympic athletes", "Viking warriors"],
    correctAnswer: "Greek Olympic athletes",
    hint: "Think ancient Greece and sporting events...",
    funFact: "Ancient Greek athletes were served cheesecake to boost their energy during the first Olympic Games on the island of Delos. The earliest known cheesecake recipe dates back to the 5th century BC!"
  },
  {
    id: 71,
    theme: "Food & Drink 🥔",
    question: "How were Tater Tots invented?",
    options: ["A chef created them as a side dish for burgers", "They were made to use up leftover potato scraps", "A farmer needed a way to preserve potatoes", "They were inspired by a French croquette recipe"],
    correctAnswer: "They were made to use up leftover potato scraps",
    hint: "Waste not, want not...",
    funFact: "Tater tots were invented in 1953 by Ore-Ida founders F. Nephi and Golden Grigg as a creative way to use up leftover potato shavings from making French fries. They almost sold them for free before realizing their potential!"
  },
  {
    id: 72,
    theme: "Food & Drink 🧀",
    question: "When is National Cheese Doodle Day?",
    options: ["January 14", "March 5", "July 22", "October 10"],
    correctAnswer: "March 5",
    hint: "It's in early spring...",
    funFact: "National Cheese Doodle Day is March 5th! Over 15 million pounds of cheese doodles are produced annually. They trace back to farm machinery that accidentally puffed corn kernels, and the snack was perfected in the 1950s."
  },
  {
    id: 73,
    theme: "Nature & Science 🌕",
    question: "What is a full moon's relationship to the sun?",
    options: ["It reflects the sun's light from the opposite side of Earth", "It produces its own glow from its core", "It absorbs sunlight and re-emits it", "It only shines when the sun sets below 30 degrees"],
    correctAnswer: "It reflects the sun's light from the opposite side of Earth",
    hint: "The moon doesn't make its own light...",
    funFact: "A full moon occurs when the moon is directly opposite the sun, with Earth in between. It doesn't produce its own light: it reflects sunlight! A full moon always rises at sunset and always sets at sunrise."
  },
  {
    id: 74,
    theme: "Nature & Science ☀️",
    question: "Why does the sky appear blue?",
    options: ["The ocean reflects blue light upward", "Air molecules scatter blue light more than red", "The ozone layer absorbs other colors", "Water vapor refracts sunlight into blue wavelengths"],
    correctAnswer: "Air molecules scatter blue light more than red",
    hint: "It has to do with how light bounces off air...",
    funFact: "The sky is blue because of Rayleigh Scattering; air molecules scatter shorter blue wavelengths of sunlight much more efficiently than longer red ones. At sunset, light travels through more atmosphere, scattering blue away and leaving reds and oranges!"
  },
  {
    id: 75,
    theme: "Nature & Science 🌽",
    question: "How many kernels does an average ear of corn have?",
    options: ["Around 400", "Around 800", "Around 1,200", "Around 2,000"],
    correctAnswer: "Around 800",
    hint: "More than you might think, and always even rows...",
    funFact: "The average ear of corn has about 800 kernels arranged in an even number of rows, most commonly 16! Corn is the most produced grain in the world, and every part of the plant is used for something."
  },
  {
    id: 76,
    theme: "History & People 🎩",
    question: "What unique distinction did Abraham Lincoln hold among U.S. Presidents?",
    options: ["He was the only president born outside the U.S.", "He was the only president to hold a patent", "He was the only president who never married", "He was the only president to serve non-consecutive terms"],
    correctAnswer: "He was the only president to hold a patent",
    hint: "It involved boats and water...",
    funFact: "Abraham Lincoln is the only U.S. President to hold a patent! He invented a device to lift boats over shallow waters. He was also the tallest president at 6'4\", a gifted wrestler, and famously stored documents in his top hat."
  },
  {
    id: 77,
    theme: "History & People 🇺🇸",
    question: "What letter does NO U.S. President's last name start with?",
    options: ["Q", "X", "S", "Z"],
    correctAnswer: "S",
    hint: "It's actually the most common starting letter in English words...",
    funFact: "Despite 'S' being one of the most common starting letters for English words, no U.S. President has ever had a last name beginning with S! The letters B, Q, U, X, and Y are also missing, but S is the most surprising gap."
  },
  {
    id: 78,
    theme: "History & People 🎭",
    question: "What did Dr. Seuss write after his editor dared him to use only 50 words?",
    options: ["The Cat in the Hat", "How the Grinch Stole Christmas", "Green Eggs and Ham", "One Fish Two Fish Red Fish Blue Fish"],
    correctAnswer: "Green Eggs and Ham",
    hint: "It involves a breakfast food...",
    funFact: "Dr. Seuss wrote Green Eggs and Ham in 1960 after his editor bet him $50 that he couldn't write a book using only 50 words. He won the bet! He also coined the word 'nerd' and wasn't actually a doctor: 'Seuss' was his middle name."
  },
  {
    id: 79,
    theme: "Animals 🦛",
    question: "How do hippos protect their skin from the sun?",
    options: ["They roll in mud constantly", "They produce a red oily secretion", "They stay submerged all day", "They have extra-thick skin that blocks UV rays"],
    correctAnswer: "They produce a red oily secretion",
    hint: "It looks alarming but it's natural sunscreen...",
    funFact: "Hippos produce their own reddish, oily 'blood sweat' which acts as sunscreen AND an antibiotic! Despite spending up to 16 hours a day in water, hippos can't actually swim. They walk along riverbeds instead."
  },
  {
    id: 80,
    theme: "Animals 🦁",
    question: "How many hours a day do lions typically sleep?",
    options: ["8 to 10 hours", "12 to 14 hours", "16 to 20 hours", "22 to 23 hours"],
    correctAnswer: "16 to 20 hours",
    hint: "Much more than humans; they conserve energy...",
    funFact: "Lions sleep up to 20 hours a day! They are the only truly social big cats, living in groups called prides of up to 40 members. Despite being called 'king of the jungle,' lions actually live in grasslands and savannas, not jungles."
  },
  {
    id: 81,
    theme: "Animals 🐴",
    question: "How long does a horse typically need to eat each day?",
    options: ["4 to 6 hours", "8 to 10 hours", "14 to 16 hours", "20 to 22 hours"],
    correctAnswer: "14 to 16 hours",
    hint: "Their digestive system requires near-constant grazing...",
    funFact: "Horses need to eat grass or hay for about 14-16 hours a day because their digestive systems are designed for near-constant grazing. They can also drink up to 10 gallons of water daily! Horses have excellent long-term memories and can sleep both standing up and lying down."
  },
  {
    id: 82,
    theme: "Arts & Culture 🎸",
    question: "How many years of history does the guitar have?",
    options: ["About 500 years", "About 1,000 years", "About 2,000 years", "About 3,500 years"],
    correctAnswer: "About 3,500 years",
    hint: "Its origins trace back to ancient civilizations...",
    funFact: "Guitars have a history stretching back approximately 3,500 years, with roots in ancient Egypt and Persia! Today the guitar is the world's most popular instrument. The modern six-string guitar was developed in Spain in the late 18th century."
  },
  {
    id: 83,
    theme: "Arts & Culture 🎭",
    question: "How old is opera as an art form?",
    options: ["About 200 years", "About 400 years", "About 600 years", "About 1,000 years"],
    correctAnswer: "About 400 years",
    hint: "It originated around the turn of the 17th century...",
    funFact: "Opera originated around 1600 in Florence, Italy, making it about 400 years old! It was created as a fully sung dramatic form combining music, poetry, and theater. Famous operas like La Traviata and Carmen feature unamplified voices that cut through entire orchestras."
  },
  {
    id: 84,
    theme: "Technology 💻",
    question: "Where does the term 'computer bug' come from?",
    options: ["Early computers used insect-shaped transistors", "A moth was found stuck in a computer relay", "Programmers used 'bug' as slang for a code error", "It came from a military code name"],
    correctAnswer: "A moth was found stuck in a computer relay",
    hint: "It was quite literal...",
    funFact: "In 1947, engineers found an actual moth stuck in a relay of the Harvard Mark II computer. They taped it into the logbook and wrote 'First actual case of a bug being found.' The term had been used loosely before, but this cemented it forever!"
  },
  {
    id: 85,
    theme: "Food & Drink 🍞",
    question: "What did Ancient Egyptians use bread as?",
    options: ["Building material", "Currency", "Medicine", "Fuel for fires"],
    correctAnswer: "Currency",
    hint: "It was valuable enough to exchange for goods...",
    funFact: "Ancient Egyptians used bread and beer as currency to pay workers, including those who built the pyramids! Bread was so central to life that over 50 varieties have been found in archaeological records. A rolled piece of white bread also served as an eraser before rubber was invented!"
  },
  {
    id: 86,
    theme: "Food & Drink 🥞",
    question: "What does the word 'pancake' first appear in?",
    options: ["A Roman cookbook from 100 AD", "An English cookbook from the 1400s", "A French pastry guide from the 1600s", "An American diner menu from the 1800s"],
    correctAnswer: "An English cookbook from the 1400s",
    hint: "It's older than most people think...",
    funFact: "The word 'pancake' first appeared in an English cookbook around 1430! But pancake-like foods have been made for over 30,000 years; ancient humans ground grains and cooked them on hot stones. Nearly every culture in the world has its own version of a pancake."
  },
  {
    id: 87,
    theme: "Food & Drink ☕",
    question: "How many cups of coffee does the average American drink per day?",
    options: ["About 1 cup", "About 2 cups", "About 3 cups", "About 5 cups"],
    correctAnswer: "About 3 cups",
    hint: "More than you might expect...",
    funFact: "The average American coffee drinker has about 3 cups per day! The U.S. is one of the largest coffee-consuming countries in the world. Coffee is also the second most traded commodity globally after oil."
  },
  {
    id: 88,
    theme: "Food & Drink 🍯",
    question: "How long does honey last if stored properly?",
    options: ["About 2 years", "About 10 years", "About 50 years", "Indefinitely"],
    correctAnswer: "Indefinitely",
    hint: "Archaeologists have found it in ancient tombs...",
    funFact: "Honey never spoils! Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible. Its low moisture content and natural acidity make it almost impossible for bacteria to grow."
  },
  {
    id: 89,
    theme: "Food & Drink 🍕",
    question: "What was pizza originally considered in Italy?",
    options: ["A dessert for wealthy families", "Street food for the poor", "A royal delicacy", "A religious ceremonial food"],
    correctAnswer: "Street food for the poor",
    hint: "It started very humbly...",
    funFact: "Pizza originated as cheap street food in Naples, Italy, eaten by the working poor. It wasn't considered respectable until Queen Margherita of Italy tried it in 1889 and loved it. The classic Margherita pizza was created in her honor!"
  },
  {
    id: 90,
    theme: "Food & Drink 🧇",
    question: "Which breakfast food was invented as part of a health reform movement?",
    options: ["Bacon", "Corn flakes", "Orange juice", "Scrambled eggs"],
    correctAnswer: "Corn flakes",
    hint: "A doctor invented it to discourage something...",
    funFact: "Corn flakes were invented in 1894 by Dr. John Harvey Kellogg as a bland, healthy food to discourage what he believed were unhealthy impulses. His brother Will added sugar and turned it into a commercial sensation. The Kellogg's brand was born!"
  },
  {
    id: 91,
    theme: "Words & Language 📖",
    question: "How many words does the average person know?",
    options: ["Around 5,000", "Around 20,000", "Around 42,000", "Around 100,000"],
    correctAnswer: "Around 42,000",
    hint: "Researchers studied this carefully...",
    funFact: "A 2016 study found that the average adult knows around 42,000 dictionary words by age 20 and keeps growing to about 48,000 by age 60. But experts estimate we passively recognize far more, perhaps 100,000 words, even if we rarely use them."
  },
  {
    id: 92,
    theme: "Words & Language 📖",
    question: "What is the most common letter in the English language?",
    options: ["A", "T", "E", "S"],
    correctAnswer: "E",
    hint: "It shows up in roughly 13% of all English text...",
    funFact: "The letter E is the most common letter in English, appearing in about 13% of all text! That's why Wheel of Fortune gives players E, R, S, T, L, and N for free in the final round; they're the six most frequently used letters."
  },
  {
    id: 93,
    theme: "Words & Language 📖",
    question: "Approximately how many words does the English language contain?",
    options: ["Around 50,000", "Around 170,000", "Around 500,000", "Around 1,000,000"],
    correctAnswer: "Around 170,000",
    hint: "The Oxford English Dictionary is the best reference...",
    funFact: "The Oxford English Dictionary contains about 170,000 words currently in use, with another 47,000 obsolete words. English adds roughly 1,000 new words every year! It borrows heavily from French, Latin, German, and hundreds of other languages."
  },
  {
    id: 94,
    theme: "Cozy Living 🕯️",
    question: "What Danish concept describes the feeling of coziness and contentment?",
    options: ["Lagom", "Hygge", "Sisu", "Fika"],
    correctAnswer: "Hygge",
    hint: "It became a wellness trend worldwide...",
    funFact: "Hygge (pronounced HOO-gah) is a Danish and Norwegian concept describing a mood of coziness and comfortable conviviality. It might be a candlelit dinner, a warm blanket, or good conversation. Denmark consistently ranks among the happiest countries and hygge is often credited!"
  },
  {
    id: 95,
    theme: "Cozy Living 🕯️",
    question: "What does 'fika' mean in Swedish culture?",
    options: ["An afternoon nap", "A coffee and snack break with others", "A long walk in nature", "A weekly family dinner"],
    correctAnswer: "A coffee and snack break with others",
    hint: "It's a daily ritual in Swedish workplaces...",
    funFact: "Fika, a cherished Swedish tradition, is a deliberate pause in the day to enjoy coffee and a sweet treat with friends or colleagues. It's considered so important that many Swedish workplaces build it into the daily schedule. Cinnamon rolls are the classic fika companion!"
  },
  {
    id: 96,
    theme: "Books & Reading 📚",
    question: "How many books does the average American read per year?",
    options: ["About 2", "About 4", "About 12", "About 20"],
    correctAnswer: "About 12",
    hint: "Roughly one per month...",
    funFact: "According to Gallup, Americans read an average of about 12 books per year, though avid readers skew that number up significantly. Women tend to read more books than men, and fiction is the most popular genre across all age groups."
  },
  {
    id: 97,
    theme: "Books & Reading 📚",
    question: "What is the best-selling book of all time?",
    options: ["Harry Potter and the Sorcerer's Stone", "Don Quixote", "The Bible", "A Tale of Two Cities"],
    correctAnswer: "The Bible",
    hint: "It has been translated into over 700 languages...",
    funFact: "The Bible is the best-selling book of all time with an estimated 5 billion copies sold. Don Quixote holds the record for best-selling novel at over 500 million copies. Harry Potter has sold over 600 million copies across the entire series!"
  },
  {
    id: 98,
    theme: "Fun Facts 🌍",
    question: "What percentage of Earth's water is drinkable fresh water?",
    options: ["About 25%", "About 10%", "About 3%", "About 1%"],
    correctAnswer: "About 3%",
    hint: "Far less than most people assume...",
    funFact: "Only about 3% of Earth's water is fresh water and most of that is locked in glaciers and ice caps! Less than 1% of all water on Earth is actually accessible for human use. This is why water conservation matters so much."
  },
  {
    id: 99,
    theme: "Fun Facts 🐝",
    question: "How far does a bee travel to make one pound of honey?",
    options: ["About 500 miles", "About 10,000 miles", "About 55,000 miles", "About 100,000 miles"],
    correctAnswer: "About 55,000 miles",
    hint: "The number is staggering...",
    funFact: "To produce just one pound of honey, bees collectively fly about 55,000 miles and visit around 2 million flowers! A single bee will produce only about 1/12 of a teaspoon of honey in its entire lifetime. No wonder it's so special."
  },
  {
    id: 100,
    theme: "Fun Facts 🎉",
    question: "What is the only food that never expires?",
    options: ["Vinegar", "Salt", "Honey", "All of the above"],
    correctAnswer: "All of the above",
    hint: "There's more than one answer here...",
    funFact: "Honey, salt, and pure distilled white vinegar all have an indefinite shelf life when stored properly! Salt never expires because it's a mineral. Vinegar is self-preserving due to its acidity. And honey's low moisture and natural antimicrobial properties keep it fresh for millennia."
  },
  {
    id: 101,
    theme: "Music 🎵",
    question: "What is the most covered song in history?",
    options: ["Yesterday by The Beatles", "Happy Birthday to You", "Somewhere Over the Rainbow", "What a Wonderful World"],
    correctAnswer: "Yesterday by The Beatles",
    hint: "It's by the most famous band in rock history...",
    funFact: "Yesterday by The Beatles holds the Guinness World Record as the most covered song in history, with over 2,200 recorded versions! Paul McCartney woke up with the melody in his head and temporarily titled it 'Scrambled Eggs' while writing the lyrics."
  },
  {
    id: 102,
    theme: "Music 🎵",
    question: "How many piano keys are on a standard piano?",
    options: ["72", "76", "88", "96"],
    correctAnswer: "88",
    hint: "The number hasn't changed in over a century...",
    funFact: "A standard piano has 88 keys: 52 white and 36 black. This design was standardized in the late 1800s. The piano was invented around 1700 by Bartolomeo Cristofori in Italy, who called it 'gravicembalo col piano e forte', harpsichord with soft and loud."
  },
  {
    id: 103,
    theme: "Nature 🌿",
    question: "What is the oldest living type of tree on Earth?",
    options: ["Redwood", "Baobab", "Bristlecone Pine", "Olive tree"],
    correctAnswer: "Bristlecone Pine",
    hint: "It grows in harsh, high-altitude conditions in the American West...",
    funFact: "The Great Basin Bristlecone Pine is the oldest known living tree species, with one individual named Methuselah estimated to be over 4,800 years old! Its location is kept secret to protect it. It grows in the White Mountains of California in extremely harsh conditions."
  },
  {
    id: 104,
    theme: "Nature 🌿",
    question: "How much of the Earth's oxygen is produced by the ocean?",
    options: ["About 10%", "About 30%", "About 50%", "About 80%"],
    correctAnswer: "About 50%",
    hint: "It's roughly half and most people are surprised...",
    funFact: "About 50% of Earth's oxygen comes from the ocean, produced by tiny marine plants called phytoplankton! The Amazon rainforest produces about 20%. So the ocean is literally the lungs of the planet, and phytoplankton are creatures most people have never heard of."
  },
  {
    id: 105,
    theme: "Everyday Wonders 💡",
    question: "How long does it take to form a habit, according to research?",
    options: ["21 days", "66 days", "90 days", "It varies widely by person and habit"],
    correctAnswer: "It varies widely by person and habit",
    hint: "The popular '21 days' figure isn't quite accurate...",
    funFact: "The popular idea that habits form in 21 days comes from a misread of a 1960 self-help book! A 2010 study by Phillippa Lally found it actually takes anywhere from 18 to 254 days depending on the person and the habit with an average of about 66 days."
  },
  {
    id: 106,
    theme: "Everyday Wonders 💡",
    question: "How many times does the average person laugh per day?",
    options: ["About 5", "About 15", "About 30", "About 50"],
    correctAnswer: "About 15",
    hint: "Children laugh far more than adults...",
    funFact: "Adults laugh an average of about 15 times per day but children laugh up to 400 times! Laughter is contagious, social, and actually good for your health. It releases endorphins, reduces stress hormones, and even provides a mild workout for your core muscles."
  },
  {
    id: 107,
    theme: "Everyday Wonders 💡",
    question: "What sense is most closely linked to memory?",
    options: ["Sight", "Hearing", "Smell", "Touch"],
    correctAnswer: "Smell",
    hint: "Have you ever caught a scent and instantly remembered something from years ago?",
    funFact: "Smell is the sense most directly connected to memory and emotion! The olfactory bulb, which processes smell, is directly linked to the hippocampus and amygdala, the brain's memory and emotion centers. This is why a whiff of cinnamon or coffee can instantly transport you back in time."
  },
  {
    id: 108,
    theme: "Animals 🐘",
    question: "How long is an elephant's pregnancy?",
    options: ["About 6 months", "About 12 months", "About 18 months", "About 22 months"],
    correctAnswer: "About 22 months",
    hint: "It's the longest of any land animal...",
    funFact: "Elephants have the longest pregnancy of any land animal: nearly 22 months! That's almost two years. Baby elephants are born weighing about 200 pounds and can stand within an hour. Elephants also mourn their dead and have been observed returning to the bones of deceased family members."
  },
  {
    id: 109,
    theme: "Animals 🐙",
    question: "How many hearts does an octopus have?",
    options: ["1", "2", "3", "5"],
    correctAnswer: "3",
    hint: "More than you'd expect...",
    funFact: "Octopuses have three hearts! Two pump blood to the gills, and one pumps it to the rest of the body. Their blood is also blue because it contains copper-based hemocyanin instead of the iron-based hemoglobin that makes human blood red. They also have nine brains: one central and one in each arm!"
  },
  {
    id: 110,
    theme: "Fun Facts ✨",
    question: "What is the shortest complete sentence in the English language?",
    options: ["Go.", "I am.", "Be.", "Hi."],
    correctAnswer: "Go.",
    hint: "It's a command with an implied subject...",
    funFact: "The shortest grammatically complete sentence in English is 'Go.' It's a command where the subject 'you' is implied. 'I am.' is the shortest sentence with an explicit subject and verb. English is fascinating in how much meaning can be packed into just two letters!"
  },

*/

// Function to get today's question - ANCHOR DATE SYSTEM
const getTodaysQuestion = () => {
  // ANCHOR DATE: February 1, 2026 at 7:45 PM = Question ID 27 (index 26)
  const anchorDate = new Date(2026, 4, 15, 19, 45, 0, 0);
const ANCHOR_INDEX = 0;
  
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  const hour = estTime.getHours();
  const minutes = estTime.getMinutes();
  
  let questionDate = new Date(estTime);
  if (hour < 19 || (hour === 19 && minutes < 45)) {
    questionDate.setDate(questionDate.getDate() - 1);
  }
  questionDate.setHours(19, 45, 0, 0);
  
  // Calculate days since anchor date
  const daysSinceAnchor = Math.round((questionDate - anchorDate) / (1000 * 60 * 60 * 24));
  
  // Calculate question index (wraps around after all questions)
  let questionIndex = ((ANCHOR_INDEX + daysSinceAnchor) % triviaQuestions.length + triviaQuestions.length) % triviaQuestions.length;
  
  return triviaQuestions[questionIndex];
};

const FlipsGame = () => {
  const [question] = useState(getTodaysQuestion());
  const [showStatsModal, setShowStatsModal] = useState(false);
const [flipsStats, setFlipsStats] = useState({
  totalFlips: 0,
  correctAnswers: 0,
  correctWithHint: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastCorrectDate: null
});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [puzzleFeedback, setPuzzleFeedback] = useState(null);
const [feedbackSent, setFeedbackSent] = useState(false);
useEffect(() => {
    try {
      const saved = localStorage.getItem('griddleFlipsStats');
      if (saved) {
        setFlipsStats(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Could not load flips stats', e);
    }
  }, []);

  const handleCardClick = (option) => {
    if (hasAnswered || isFlipping) return;
    
    setIsFlipping(true);
    setSelectedAnswer(option);
    
    setTimeout(() => {
      setHasAnswered(true);
      setIsFlipping(false);

      const correct = option === question.correctAnswer;
      try {
        const saved = localStorage.getItem('griddleFlipsStats');
        const current = saved ? JSON.parse(saved) : {
          totalFlips: 0, correctAnswers: 0, correctWithHint: 0,
          currentStreak: 0, maxStreak: 0, lastCorrectDate: null
        };

        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = correct
          ? (current.lastCorrectDate === yesterday || current.lastCorrectDate === today
            ? current.currentStreak + 1 : 1)
          : current.currentStreak;

        const newStats = {
          ...current,
          totalFlips: current.totalFlips + 1,
          correctAnswers: correct ? current.correctAnswers + 1 : current.correctAnswers,
          correctWithHint: correct && showHint ? current.correctWithHint + 1 : current.correctWithHint,
          currentStreak: newStreak,
          maxStreak: Math.max(current.maxStreak, newStreak),
          lastCorrectDate: correct ? today : current.lastCorrectDate
        };

        setFlipsStats(newStats);
        localStorage.setItem('griddleFlipsStats', JSON.stringify(newStats));
      } catch (e) {
        console.error('Could not save flips stats', e);
      }
    }, 600);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleShare = async () => {
  const resultEmoji = isCorrect ? "✅" : "🤔";
  const resultText = isCorrect ? "Got it!" : "Learned something new!";
  const hintText = showHint ? " (with hint)" : "";
  const shareText = `Letter Griddle Flips 🥞\n${question.theme}\n${resultEmoji} ${resultText}${hintText}\nlettergriddle.com/flips\nFree & ad-free!\nPart of the Letter Griddle Games 🥞\nMore games: lettergriddle.com`;

  if (navigator.share) {
    try {
      await navigator.share({
        text: shareText
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyToClipboard(shareText);
      }
    }
  } else {
    copyToClipboard(shareText);
  }
};
const handleFeedback = (emoji) => {
  if (feedbackSent) return;
  setPuzzleFeedback(emoji);
  setFeedbackSent(true);
  // Send to Google Forms
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeHo--3CyvRyNWRYzo9J6_srYUgOgle5QdC1rOexJKhaFJPuw/formResponse';
  const params = new URLSearchParams({
    'entry.1226112124': `Letter Griddle Flips - ${question.theme}`,
    'entry.971793728': emoji
  });
  fetch(`${formUrl}?${params}`, {
    method: 'POST',
    mode: 'no-cors'
  }).catch(() => {});
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

  const getCardStyle = (option) => {
    if (!hasAnswered) {
      return "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400 hover:border-amber-500 hover:shadow-lg hover:scale-105 cursor-pointer";
    }
    
    if (option === question.correctAnswer) {
      return "bg-gradient-to-br from-green-100 to-green-200 border-green-500 scale-105";
    }
    
    if (option === selectedAnswer && !isCorrect) {
      return "bg-gradient-to-br from-amber-200 to-amber-300 border-amber-600 opacity-75";
    }
    
    return "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 opacity-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed top-4 left-4 text-4xl opacity-20">☕</div>
      <div className="fixed top-4 right-4 text-4xl opacity-20">🥞</div>
      <div className="fixed bottom-20 left-4 text-4xl opacity-20">📜</div>
      <div className="fixed bottom-20 right-4 text-4xl opacity-20">☕</div>

      <div className="max-w-lg mx-auto relative">
  {/* Home link */}
  <div className="flex justify-start mb-2">
    <a 
      href="https://lettergriddle.com" 
      className="flex items-center gap-1 text-amber-200 hover:text-amber-100 transition-colors"
      title="Back to Letter Griddle Games"
    >
      <span className="text-xl">🥞</span>
      <span className="text-sm font-semibold" style={{fontFamily: 'Georgia, serif'}}>Letter Griddle Games</span>
    </a>
  </div>

  {/* Header */}
  <div className="text-center mb-6 relative">
    <div className="absolute right-0 top-0">
      <button
        onClick={() => setShowStatsModal(true)}
        className="flex items-center gap-1 text-amber-200 hover:text-amber-100 transition-colors"
        title="Your Stats"
      >
        <BarChart3 size={18} />
        <span className="text-sm font-semibold" style={{fontFamily: 'Georgia, serif'}}>Stats</span>
      </button>
    </div>
    <div className="text-5xl mb-2">☕</div>
    <h1 className="text-3xl font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>
      Letter Griddle Flips
    </h1>
  </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl shadow-2xl p-6 border-4 border-amber-300">
          
          {/* Theme Badge */}
          <div className="text-center mb-4">
            <span className="bg-amber-700 text-amber-100 px-4 py-1 rounded-full text-sm font-semibold">
              {question.theme}
            </span>
          </div>

          {/* Question */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-amber-900" style={{fontFamily: 'Georgia, serif'}}>
              {question.question}
            </h2>
          </div>

          {/* Hint Toggle */}
          {!hasAnswered && (
            <div className="text-center mb-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 mx-auto text-amber-700 hover:text-amber-800 transition-all"
              >
                
                <span className="text-sm font-medium">
                  {showHint ? "Hide hint" : "Need a hint?"}
                </span>
              </button>
              
              {showHint && (
                <div className="mt-2 bg-amber-200 rounded-lg px-4 py-2 inline-block">
                  <p className="text-amber-800 text-sm italic">{question.hint}</p>
                </div>
              )}
            </div>
          )}

          {/* Answer Cards - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {question.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(option)}
                className={`
                  relative p-4 rounded-xl border-3 transition-all duration-300 
                  ${getCardStyle(option)}
                  ${isFlipping && selectedAnswer === option ? 'animate-pulse' : ''}
                `}
                style={{
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: '3px'
                }}
              >
                <span className="text-amber-900 font-semibold text-center" style={{fontFamily: 'Georgia, serif'}}>
                  {option}
                </span>
                
                {/* Checkmark for correct answer after reveal */}
                {hasAnswered && option === question.correctAnswer && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Result & Fun Fact */}
          {hasAnswered && (
            <div className="animate-fade-in">
              {/* Result Message */}
              <div className={`text-center p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-amber-200 border-2 border-amber-400'}`}>
                <p className="text-xl font-bold mb-1" style={{fontFamily: 'Georgia, serif'}}>
                  {isCorrect ? "🎉 You got it!" : "Good guess!"}
                </p>
                {!isCorrect && (
                  <p className="text-amber-800">
                    The answer was <strong>{question.correctAnswer}</strong>
                  </p>
                )}
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl p-4 text-amber-100">
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  ☕ Did You Know?
                </p>
                <p className="text-sm leading-relaxed">
                  {question.funFact}
                </p>
              </div>

              {/* Share Button */}
              <div className="text-center mt-4">
                <button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 mx-auto"
                >
                  <Share2 size={18} />
                  {shareCopied ? "Copied!" : "Share"}
                </button>
              </div>
              {/* Puzzle Feedback */}
<div className="mt-2 text-center">
  {!feedbackSent ? (
    <div>
      <p className="text-xs text-amber-700 font-semibold mb-1">How was today's puzzle?</p>
      <div className="flex justify-center gap-3">
        {['😍', '😊', '😐', '😕'].map((emoji) => (
          <button key={emoji} onClick={() => handleFeedback(emoji)} className="text-2xl hover:scale-125 transition-transform" title={emoji}>
            {emoji}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-xs text-amber-600 font-semibold">Thanks for the feedback! {puzzleFeedback}</p>
  )}
</div>

              {/* Come Back Message */}
              <div className="text-center mt-4">
                <p className="text-amber-700 text-sm">
                  ☕ Come back tomorrow for another flip!
                </p>
              </div>
            </div>
          )}

          {/* Instruction */}
          {!hasAnswered && (
            <div className="text-center">
              <p className="text-amber-600 text-sm">
                Tap a card to flip it
              </p>
            </div>
          )}
        </div>

        {/* New Flip Time */}
        <div className="text-center mt-6">
          <p className="text-amber-300 text-xs">
            New flip daily at 7:45 PM EST
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pb-6">
        <div className="max-w-lg mx-auto text-center">
          {/* Letter Griddle Games Link */}
          <a 
            href="https://lettergriddle.com" 
            className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-100 transition-colors mb-4"
          >
            <span className="text-xl">🥞</span>
            <span className="font-semibold">Letter Griddle Games</span>
          </a>
          
          {/* Instagram */}
          <div className="mb-4">
            <a 
              href="https://instagram.com/letter_griddle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-100 text-sm transition-colors"
            >
              <Instagram size={16} className="inline mr-1" /> @letter_griddle
            </a>
          </div>
          
          {/* Legal Links */}
          <div className="flex justify-center gap-4 text-xs text-amber-400 mb-3">
            <a href="/privacy" className="hover:text-amber-200 transition-colors">Privacy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-amber-200 transition-colors">Terms</a>
          </div>
          
          {/* Copyright */}
          <p className="text-amber-500 text-xs">
            © {new Date().getFullYear()} Letter Griddle. All rights reserved.
          </p>
        </div>
      </footer>

      {showStatsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{background: 'rgba(120, 60, 0, 0.45)'}} onClick={() => setShowStatsModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowStatsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>

            <div className="text-center mb-4">
              <p className="text-3xl mb-2">☕</p>
              <h2 className="text-xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>Your Flips Stats</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-800">{flipsStats.totalFlips}</div>
                <div className="text-xs text-amber-600 mt-1">Total Flips</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-800">{flipsStats.correctAnswers}</div>
                <div className="text-xs text-amber-600 mt-1">Correct Answers</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-800">
                  {flipsStats.totalFlips > 0 ? Math.round((flipsStats.correctAnswers / flipsStats.totalFlips) * 100) : 0}%
                </div>
                <div className="text-xs text-amber-600 mt-1">Accuracy</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-800">{flipsStats.currentStreak}</div>
                <div className="text-xs text-amber-600 mt-1">Win Streak 🔥</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-800">{flipsStats.maxStreak}</div>
                <div className="text-xs text-amber-600 mt-1">Best Streak</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-800">{flipsStats.correctWithHint}</div>
                <div className="text-xs text-amber-600 mt-1">Won with Hint 💡</div>
              </div>
            </div>

           <div className="bg-amber-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-amber-800">
                {flipsStats.correctAnswers - flipsStats.correctWithHint}
              </div>
              <div className="text-xs text-amber-600 mt-1">Won Without Hint ✨</div>
            </div>

            <p className="text-center text-xs text-gray-400">Stats saved locally on your device</p>
          </div>
        </div>
      )}
      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FlipsGame;