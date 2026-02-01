"use client";
import React, { useState } from 'react';
import { Share2, Instagram } from 'lucide-react';

// Daily trivia questions - tied to Letter Griddle themes
const triviaQuestions = [
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
    funFact: "The Winter Olympics features 15 sports: alpine skiing, biathlon, bobsled, cross-country skiing, curling, figure skating, freestyle skiing, ice hockey, luge, Nordic combined, short track, skeleton, ski jumping, snowboarding, and speed skating!"
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
  }
];

// Function to get today's question
const getTodaysQuestion = () => {
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hour = estTime.getHours();
  
  let questionDate = new Date(estTime);
  if (hour < 19 || (hour === 19 && estTime.getMinutes() < 45)) {
    questionDate.setDate(questionDate.getDate() - 1);
  }
  questionDate.setHours(19, 45, 0, 0);
  
  const epoch = new Date('1970-01-01');
  const daysSinceEpoch = Math.floor((questionDate - epoch) / (1000 * 60 * 60 * 24));
  const questionIndex = daysSinceEpoch % triviaQuestions.length;
  
  return triviaQuestions[questionIndex];
};

const FlipsGame = () => {
  const [question] = useState(getTodaysQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleCardClick = (option) => {
    if (hasAnswered || isFlipping) return;
    
    setIsFlipping(true);
    setSelectedAnswer(option);
    
    setTimeout(() => {
      setHasAnswered(true);
      setIsFlipping(false);
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
  <div className="text-center mb-6">
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