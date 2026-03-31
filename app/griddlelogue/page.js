"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BarChart3, X, Share2 } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

// ── QUESTIONS ─────────────────────────────────────────────────────────────────

const ALL_QUESTIONS = [
  { q: "What country celebrates National Pancake Day on Shrove Tuesday?", a: "United Kingdom", wrong: ["United States","Canada","Australia"], cat: "Pancakes", fact: "In the UK, Shrove Tuesday is called Pancake Day and dates back to 1100 AD. It was a way to use up rich foods before Lent!" },
  { q: "What is the main leavening agent in traditional pancakes?", a: "Baking powder", wrong: ["Yeast","Egg whites","Cream of tartar"], cat: "Pancakes", fact: "Baking powder was invented in 1843 and revolutionized pancake making. Before that, cooks used yeast, which required hours of rising time!" },
  { q: "Which U.S. state produces the most maple syrup?", a: "Vermont", wrong: ["Maine","New York","New Hampshire"], cat: "Pancakes", fact: "Vermont produces about 2 million gallons of maple syrup each year. It takes 40 gallons of sap to make just 1 gallon of syrup!" },
  { q: "Which meal's name literally means 'to break the fast'?", a: "Breakfast", wrong: ["Lunch","Dinner","Brunch"], cat: "Breakfast", fact: "The word 'breakfast' first appeared in English in the 15th century. It refers to breaking the fasting period of the night!" },
  { q: "In which country did croissants originate?", a: "Austria", wrong: ["France","Belgium","Switzerland"], cat: "Breakfast", fact: "The croissant originated in Vienna, Austria as the 'kipferl.' It didn't become popular in France until the 1830s!" },
  { q: "What gives orange juice its cloudy appearance?", a: "Pulp and pectin", wrong: ["Sugar","Vitamin C","Citric acid"], cat: "Breakfast", fact: "Fresh-squeezed orange juice is cloudy because of pectin and pulp. Clear juice has been filtered and processed to remove these!" },
  { q: "Which country is the largest producer of coffee in the world?", a: "Brazil", wrong: ["Colombia","Vietnam","Ethiopia"], cat: "Coffee", fact: "Brazil produces about one-third of the world's coffee. Coffee was first planted there in 1727 and transformed the country's economy!" },
  { q: "What does 'espresso' mean in Italian?", a: "Pressed out", wrong: ["Strong","Quick","Dark"], cat: "Coffee", fact: "Espresso means 'pressed out' in Italian, referring to how hot water is pressed through finely ground coffee. It was invented in Italy in 1884!" },
  { q: "According to legend, who discovered coffee?", a: "A goat herder", wrong: ["A farmer","A monk","A king"], cat: "Coffee", fact: "Legend says an Ethiopian goat herder named Kaldi noticed his goats became energetic after eating coffee berries around 800 AD!" },
  { q: "What was the first fully computer-animated feature film?", a: "Toy Story", wrong: ["Shrek","A Bug's Life","Finding Nemo"], cat: "Movies", fact: "Toy Story was released by Pixar in 1995 and took four years to make. It was the first feature film made entirely with CGI!" },
  { q: "Which movie features the quote 'Here's looking at you, kid'?", a: "Casablanca", wrong: ["Gone with the Wind","The Maltese Falcon","Citizen Kane"], cat: "Movies", fact: "Casablanca was released in 1942 and won Best Picture. Humphrey Bogart improvised 'Here's looking at you, kid' during filming!" },
  { q: "How many Oscars did Titanic win in 1998?", a: "11", wrong: ["9","10","12"], cat: "Movies", fact: "Titanic won 11 Oscars, tying with Ben-Hur and later Lord of the Rings: Return of the King for the most wins ever!" },
  { q: "Which instrument has 88 keys?", a: "Piano", wrong: ["Organ","Harpsichord","Accordion"], cat: "Music", fact: "The standard piano has 88 keys: 52 white and 36 black. This range covers over 7 octaves of musical notes!" },
  { q: "The Beatles were from which English city?", a: "Liverpool", wrong: ["London","Manchester","Birmingham"], cat: "Music", fact: "The Beatles formed in Liverpool in 1960. The city now has a Beatles museum, statues, and themed tours honoring the Fab Four!" },
  { q: "What does 'MTV' stand for?", a: "Music Television", wrong: ["Music TV","Musical Television","Media Television"], cat: "Music", fact: "MTV launched on August 1, 1981. The first music video played was 'Video Killed the Radio Star' by The Buggles!" },
  { q: "Who wrote Pride and Prejudice?", a: "Jane Austen", wrong: ["Charlotte Bronte","Mary Shelley","Emily Bronte"], cat: "Books", fact: "Jane Austen published Pride and Prejudice in 1813. She originally titled it 'First Impressions' when she wrote it at age 21!" },
  { q: "In what year was the first Harry Potter book published?", a: "1997", wrong: ["1995","1999","2001"], cat: "Books", fact: "Harry Potter and the Philosopher's Stone was published in 1997 with just 500 copies. The series has now sold over 500 million books!" },
  { q: "What is the best-selling novel of all time?", a: "Don Quixote", wrong: ["Harry Potter","A Tale of Two Cities","The Lord of the Rings"], cat: "Books", fact: "Don Quixote by Miguel de Cervantes has sold over 500 million copies since 1605. It is considered the first modern novel!" },
  { q: "What is the smallest country in the world?", a: "Vatican City", wrong: ["Monaco","San Marino","Liechtenstein"], cat: "Geography", fact: "Vatican City is only 0.17 square miles and has about 800 residents. It became an independent state in 1929!" },
  { q: "Which river flows through the most countries?", a: "Danube", wrong: ["Nile","Amazon","Rhine"], cat: "Geography", fact: "The Danube flows through 10 countries: Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova, and Ukraine!" },
  { q: "What is the capital of Australia?", a: "Canberra", wrong: ["Sydney","Melbourne","Brisbane"], cat: "Geography", fact: "Canberra was purpose-built as the capital in 1913. Sydney and Melbourne both wanted to be capital, so a new city was created!" },
  { q: "How many hearts does an octopus have?", a: "3", wrong: ["1","2","4"], cat: "Animals", fact: "Octopuses have 3 hearts! Two pump blood to the gills, and one pumps blood to the rest of the body. They also have blue blood!" },
  { q: "What is the only mammal that can truly fly?", a: "Bat", wrong: ["Flying squirrel","Sugar glider","Colugo"], cat: "Animals", fact: "Bats are the only mammals capable of sustained flight. Flying squirrels and sugar gliders can only glide short distances!" },
  { q: "What animal's fingerprints are nearly identical to humans?", a: "Koala", wrong: ["Chimpanzee","Gorilla","Orangutan"], cat: "Animals", fact: "Koala fingerprints are so similar to human prints that they could theoretically confuse crime scene investigators!" },
  { q: "What is the hardest natural substance on Earth?", a: "Diamond", wrong: ["Gold","Iron","Titanium"], cat: "Science", fact: "Diamonds are made of carbon atoms arranged in a crystal structure. They form about 100 miles below Earth's surface!" },
  { q: "What planet is known as the Red Planet?", a: "Mars", wrong: ["Venus","Jupiter","Mercury"], cat: "Science", fact: "Mars appears red because of iron oxide (rust) on its surface. A day on Mars is only 37 minutes longer than an Earth day!" },
  { q: "What gas do plants absorb from the air?", a: "Carbon dioxide", wrong: ["Oxygen","Nitrogen","Hydrogen"], cat: "Science", fact: "Plants absorb carbon dioxide and release oxygen through photosynthesis. A single tree can absorb about 48 pounds of CO2 per year!" },
  { q: "What was the name of the coffee shop in Friends?", a: "Central Perk", wrong: ["Central Park","Coffee Central","The Coffee House"], cat: "TV Shows", fact: "Central Perk's orange couch was found in a Warner Bros. storage basement. The set designers kept it because it fit perfectly!" },
  { q: "How many seasons did The Office (US) run?", a: "9", wrong: ["7","8","10"], cat: "TV Shows", fact: "The Office ran for 9 seasons with 201 episodes. Steve Carell left after season 7, but the show continued for two more seasons!" },
  { q: "What year did Seinfeld first air?", a: "1989", wrong: ["1987","1991","1993"], cat: "TV Shows", fact: "Seinfeld debuted in 1989 as 'The Seinfeld Chronicles.' It was almost cancelled after the pilot but went on to become one of TV's biggest hits!" },
  { q: "Where are the 2026 Winter Olympics being held?", a: "Milan-Cortina, Italy", wrong: ["Salt Lake City, USA","Sapporo, Japan","Stockholm, Sweden"], cat: "Winter Olympics", fact: "The 2026 Winter Olympics will be held across two Italian cities: Milan and Cortina d'Ampezzo. This is Italy's fourth time hosting the Winter Games!" },
  { q: "Where were the first Winter Olympics held in 1924?", a: "Chamonix, France", wrong: ["St. Moritz, Switzerland","Oslo, Norway","Lake Placid, USA"], cat: "Winter Olympics", fact: "The first Winter Olympics were held in Chamonix, France in 1924. Only 16 nations and 258 athletes competed, compared to thousands today!" },
  { q: "Which country has won the most Winter Olympic medals of all time?", a: "Norway", wrong: ["United States","Russia","Germany"], cat: "Winter Olympics", fact: "Norway has won over 400 Winter Olympic medals, more than any other country. Their success comes largely from cross-country skiing and biathlon!" },
  { q: "How many rings are in the Olympic symbol?", a: "5", wrong: ["4","6","7"], cat: "Winter Olympics", fact: "The five Olympic rings represent the five inhabited continents: Africa, the Americas, Asia, Europe, and Oceania. The design was created in 1913!" },
  { q: "Which figure skater landed the first quadruple jump in Olympic competition?", a: "Kurt Browning", wrong: ["Scott Hamilton","Brian Boitano","Brian Orser"], cat: "Winter Olympics", fact: "Kurt Browning of Canada landed the first ratified quadruple jump in competition in 1988. Today, top skaters regularly land multiple quads in a single program!" },
  { q: "What sport combines cross-country skiing and rifle shooting?", a: "Biathlon", wrong: ["Nordic combined","Ski jumping","Freestyle skiing"], cat: "Winter Olympics", fact: "Biathlon originated as training for Norwegian military patrol units. Athletes ski up to 20 kilometers and must shoot at targets from both standing and prone positions!" },
  { q: "Which country invented the sport of curling?", a: "Scotland", wrong: ["Canada","Sweden","Norway"], cat: "Winter Olympics", fact: "Curling originated in Scotland in the 16th century. The oldest curling stone, found at the bottom of a Scottish pond, dates back to 1511!" },
  { q: "How long is a standard Olympic hockey game?", a: "60 minutes", wrong: ["40 minutes","48 minutes","90 minutes"], cat: "Winter Olympics", fact: "Olympic hockey games consist of three 20-minute periods. The sport has been part of the Winter Olympics since the first games in 1924!" },
  { q: "What is the Miracle on Ice?", a: "USA hockey beating USSR in 1980", wrong: ["A figure skating move","A speed skating record","The first triple axel"], cat: "Winter Olympics", fact: "The Miracle on Ice was when the underdog US amateur hockey team defeated the heavily favored Soviet team 4-3 at the 1980 Lake Placid Olympics!" },
  { q: "What do athletes slide down in the luge?", a: "An ice chute", wrong: ["A bobsled track","A ski slope","A half-pipe"], cat: "Winter Olympics", fact: "Luge athletes reach speeds over 90 mph while lying feet-first on a tiny sled. They steer using only subtle leg movements and body shifts!" },
  { q: "Which jump is considered the most difficult in figure skating?", a: "Axel", wrong: ["Lutz","Salchow","Loop"], cat: "Winter Olympics", fact: "The axel is the hardest jump because it requires an extra half rotation. A triple axel is actually 3.5 rotations! It is named after Norwegian skater Axel Paulsen." },
  { q: "How many athletes are on a bobsled team in the four-man event?", a: "4", wrong: ["2","3","5"], cat: "Winter Olympics", fact: "A four-man bobsled team includes a pilot, brakeman, and two pushers. The sled and crew together can weigh up to 1,389 pounds!" },
  { q: "What is the half-pipe event named after?", a: "Its shape", wrong: ["A musical instrument","A plumbing fixture","Its inventor"], cat: "Winter Olympics", fact: "The half-pipe is shaped like a tube cut in half lengthwise. Snowboard half-pipes at the Olympics are 22 feet tall with walls at 18-foot vertical!" },
  { q: "Which Winter Olympic sport features the skeleton event?", a: "Sliding", wrong: ["Skiing","Skating","Snowboarding"], cat: "Winter Olympics", fact: "In skeleton, athletes dive headfirst onto a tiny sled and race down the same track used for bobsled and luge, reaching speeds over 80 mph!" },
  { q: "What country dominates short track speed skating?", a: "South Korea", wrong: ["Netherlands","USA","Japan"], cat: "Winter Olympics", fact: "South Korea has won more Olympic medals in short track speed skating than any other country. The sport is incredibly popular there!" },
  { q: "How many sports are in the Winter Olympics?", a: "15", wrong: ["7","12","20"], cat: "Winter Olympics", fact: "The Winter Olympics features 15 sports including alpine skiing, biathlon, bobsled, curling, figure skating, ice hockey, luge, skeleton, snowboarding, and speed skating!" },
  { q: "What color medal is awarded for third place?", a: "Bronze", wrong: ["Gold","Silver","Copper"], cat: "Winter Olympics", fact: "Olympic bronze medals are made of copper and tin. Gold medals are actually mostly silver with gold plating, and must contain at least 6 grams of gold!" },
  { q: "Which city has hosted the Winter Olympics three times?", a: "None yet", wrong: ["Innsbruck, Austria","Lake Placid, USA","St. Moritz, Switzerland"], cat: "Winter Olympics", fact: "No city has hosted three Winter Olympics yet. Innsbruck (1964, 1976), St. Moritz (1928, 1948), and Lake Placid (1932, 1980) have each hosted twice!" },
  { q: "What is the largest organ in the human body?", a: "Skin", wrong: ["Heart","Liver","Brain"], cat: "Science", fact: "Your skin weighs about 8 pounds and covers roughly 22 square feet. It completely renews itself every 27 days!" },
  { q: "How many bones are in the adult human body?", a: "206", wrong: ["106","306","406"], cat: "Science", fact: "Babies are born with about 270 bones, but many fuse together as we grow. By adulthood, we have 206 bones!" },
  { q: "What planet has the most moons in our solar system?", a: "Saturn", wrong: ["Jupiter","Uranus","Neptune"], cat: "Science", fact: "Saturn has over 140 known moons, surpassing Jupiter's count. Scientists keep discovering new ones with better telescopes!" },
  { q: "What is the speed of light?", a: "186,000 miles per second", wrong: ["186,000 miles per hour","1 million miles per hour","1 million miles per second"], cat: "Science", fact: "Light travels at 186,000 miles per second. At that speed, it takes sunlight about 8 minutes to reach Earth from the Sun!" },
  { q: "What element does O represent on the periodic table?", a: "Oxygen", wrong: ["Gold","Osmium","Oganesson"], cat: "Science", fact: "Oxygen makes up about 21% of Earth's atmosphere. It was discovered independently by two scientists in the 1770s!" },
  { q: "What is the closest star to Earth?", a: "The Sun", wrong: ["Proxima Centauri","Alpha Centauri","Sirius"], cat: "Science", fact: "The Sun is about 93 million miles from Earth. The next closest star, Proxima Centauri, is over 4 light-years away!" },
  { q: "What do bees collect from flowers to make honey?", a: "Nectar", wrong: ["Pollen","Sap","Dew"], cat: "Science", fact: "Bees visit up to 5,000 flowers in a single day to collect nectar. It takes about 60,000 bees traveling 55,000 miles to make one pound of honey!" },
  { q: "What causes thunder?", a: "Lightning heating air", wrong: ["Clouds colliding","Wind speed","Rain falling"], cat: "Science", fact: "Lightning heats the air to around 30,000 degrees Fahrenheit, causing it to expand rapidly and create a sonic boom we hear as thunder!" },
  { q: "How long does it take Earth to orbit the Sun?", a: "365 days", wrong: ["24 hours","30 days","1,000 days"], cat: "Science", fact: "Earth's orbit is actually 365.25 days, which is why we add a leap day every four years to keep our calendars accurate!" },
  { q: "What are the three states of matter taught in elementary school?", a: "Solid, liquid, gas", wrong: ["Hot, cold, warm","Hard, soft, fluid","Ice, water, steam"], cat: "Science", fact: "There are actually more states of matter, including plasma (found in stars and lightning) and Bose-Einstein condensate, which only exists near absolute zero!" },
  { q: "What is the longest river in the world?", a: "Nile", wrong: ["Amazon","Mississippi","Yangtze"], cat: "Geography", fact: "The Nile River stretches about 4,132 miles through 11 African countries. Ancient Egyptians called it 'Ar' meaning black because of its dark sediment!" },
  { q: "What is the largest ocean on Earth?", a: "Pacific", wrong: ["Atlantic","Indian","Arctic"], cat: "Geography", fact: "The Pacific Ocean covers more area than all the land on Earth combined! It contains more than half of the world's free water." },
  { q: "Which continent has the most countries?", a: "Africa", wrong: ["Asia","Europe","South America"], cat: "Geography", fact: "Africa has 54 recognized countries. The newest is South Sudan, which became independent in 2011!" },
  { q: "What is the tallest mountain in the world?", a: "Mount Everest", wrong: ["K2","Mount Kilimanjaro","Denali"], cat: "Geography", fact: "Mount Everest stands at 29,032 feet tall and grows about half an inch each year due to tectonic plate movement!" },
  { q: "Which U.S. state has the most coastline?", a: "Alaska", wrong: ["California","Florida","Hawaii"], cat: "Geography", fact: "Alaska has over 6,600 miles of coastline, more than all other U.S. states combined! Its coastline is longer than the entire U.S. Atlantic coast." },
  { q: "What country has the largest population in the world?", a: "India", wrong: ["United States","China","Indonesia"], cat: "Geography", fact: "India surpassed China as the world's most populous country in 2023, with over 1.4 billion people. That's about 17% of all humans on Earth!" },
  { q: "What is the driest place on Earth?", a: "Atacama Desert", wrong: ["Sahara Desert","Death Valley","Gobi Desert"], cat: "Geography", fact: "Parts of Chile's Atacama Desert have never recorded rainfall in human history! Scientists use it to test Mars rovers because it is so similar to the Martian surface." },
  { q: "How many continents are there?", a: "7", wrong: ["5","6","8"], cat: "Geography", fact: "The seven continents are Africa, Antarctica, Asia, Australia, Europe, North America, and South America. Together they make up about 30% of Earth's surface!" },
  { q: "Which country (or countries) is both in Europe and Asia?", a: "Both Russia and Turkey", wrong: ["Russia","Turkey","Egypt"], cat: "Geography", fact: "Both Russia and Turkey span two continents. Istanbul, Turkey is the only major city in the world located on two continents!" },
  { q: "What is the largest desert in the world?", a: "Antarctic", wrong: ["Sahara","Arabian","Gobi"], cat: "Geography", fact: "Antarctica is technically the world's largest desert because it receives less than 10 inches of precipitation per year. The Sahara is the largest hot desert!" },
  { q: "According to legend, how was tea discovered?", a: "Leaves fell into an emperor's boiling water", wrong: ["A monk brewed it intentionally","It was found growing wild in a market","A sailor mixed herbs with seawater"], cat: "Food & Drink", fact: "According to legend, Chinese Emperor Shennong discovered tea in 2737 BC when leaves from a wild tree accidentally fell into his pot of boiling water. Today tea is the second most consumed beverage in the world after water!" },
  { q: "What ancient group was served cheesecake for energy?", a: "Greek Olympic athletes", wrong: ["Roman gladiators","Egyptian pharaohs","Viking warriors"], cat: "Food & Drink", fact: "Ancient Greek athletes were served cheesecake to boost their energy during the first Olympic Games on the island of Delos. The earliest known cheesecake recipe dates back to the 5th century BC!" },
  { q: "How were Tater Tots invented?", a: "They were made to use up leftover potato scraps", wrong: ["A chef created them as a side dish for burgers","A farmer needed a way to preserve potatoes","They were inspired by a French croquette recipe"], cat: "Food & Drink", fact: "Tater tots were invented in 1953 by Ore-Ida founders F. Nephi and Golden Grigg as a creative way to use up leftover potato shavings from making French fries. They almost sold them for free before realizing their potential!" },
  { q: "When is National Cheese Doodle Day?", a: "March 5", wrong: ["January 14","July 22","October 10"], cat: "Food & Drink", fact: "National Cheese Doodle Day is March 5th! Over 15 million pounds of cheese doodles are produced annually. They trace back to farm machinery that accidentally puffed corn kernels, and the snack was perfected in the 1950s." },
  { q: "What is a full moon's relationship to the sun?", a: "It reflects the sun's light from the opposite side of Earth", wrong: ["It produces its own glow from its core","It absorbs sunlight and re-emits it","It only shines when the sun sets below 30 degrees"], cat: "Nature & Science", fact: "A full moon occurs when the moon is directly opposite the sun, with Earth in between. It doesn't produce its own light; it reflects sunlight! A full moon always rises at sunset and always sets at sunrise." },
  { q: "Why does the sky appear blue?", a: "Air molecules scatter blue light more than red", wrong: ["The ocean reflects blue light upward","The ozone layer absorbs other colors","Water vapor refracts sunlight into blue wavelengths"], cat: "Nature & Science", fact: "The sky is blue because of Rayleigh Scattering. Air molecules scatter shorter blue wavelengths of sunlight much more efficiently than longer red ones. At sunset, light travels through more atmosphere, scattering blue away and leaving reds and oranges!" },
  { q: "How many kernels does an average ear of corn have?", a: "Around 800", wrong: ["Around 400","Around 1,200","Around 2,000"], cat: "Nature & Science", fact: "The average ear of corn has about 800 kernels arranged in an even number of rows, most commonly 16! Corn is the most produced grain in the world, and every part of the plant is used for something." },
  { q: "What unique distinction did Abraham Lincoln hold among U.S. Presidents?", a: "He was the only president to hold a patent", wrong: ["He was the only president born outside the U.S.","He was the only president who never married","He was the only president to serve non-consecutive terms"], cat: "History", fact: "Abraham Lincoln is the only U.S. President to hold a patent! He invented a device to lift boats over shallow waters. He was also the tallest president at 6'4\" and famously stored documents in his top hat." },
  { q: "What letter does NO U.S. President's last name start with?", a: "S", wrong: ["Q","X","Z"], cat: "History", fact: "Despite S being one of the most common starting letters for English words, no U.S. President has ever had a last name beginning with S! The letters B, Q, U, X, and Y are also missing, but S is the most surprising gap." },
  { q: "What did Dr. Seuss write after his editor dared him to use only 50 words?", a: "Green Eggs and Ham", wrong: ["The Cat in the Hat","How the Grinch Stole Christmas","One Fish Two Fish Red Fish Blue Fish"], cat: "History", fact: "Dr. Seuss wrote Green Eggs and Ham in 1960 after his editor bet him $50 that he couldn't write a book using only 50 words. He won the bet! He also coined the word 'nerd' and wasn't actually a doctor." },
  { q: "How do hippos protect their skin from the sun?", a: "They produce a red oily secretion", wrong: ["They roll in mud constantly","They stay submerged all day","They have extra-thick skin that blocks UV rays"], cat: "Animals", fact: "Hippos produce their own reddish, oily secretion which acts as sunscreen AND an antibiotic! Despite spending up to 16 hours a day in water, hippos can't actually swim; they walk along riverbeds instead." },
  { q: "How many hours a day do lions typically sleep?", a: "16 to 20 hours", wrong: ["8 to 10 hours","12 to 14 hours","22 to 23 hours"], cat: "Animals", fact: "Lions sleep up to 20 hours a day! They are the only truly social big cats, living in groups called prides of up to 40 members. Despite being called 'king of the jungle,' lions actually live in grasslands and savannas." },
  { q: "How long does a horse typically need to eat each day?", a: "14 to 16 hours", wrong: ["4 to 6 hours","8 to 10 hours","20 to 22 hours"], cat: "Animals", fact: "Horses need to eat grass or hay for about 14 to 16 hours a day because their digestive systems are designed for near-constant grazing. They can also drink up to 10 gallons of water daily!" },
  { q: "How many years of history does the guitar have?", a: "About 3,500 years", wrong: ["About 500 years","About 1,000 years","About 2,000 years"], cat: "Arts & Culture", fact: "Guitars have a history stretching back approximately 3,500 years, with roots in ancient Egypt and Persia! Today the guitar is the world's most popular instrument. The modern six-string guitar was developed in Spain in the late 18th century." },
  { q: "How old is opera as an art form?", a: "About 400 years", wrong: ["About 200 years","About 600 years","About 1,000 years"], cat: "Arts & Culture", fact: "Opera originated around 1600 in Florence, Italy, making it about 400 years old! It was created as a fully sung dramatic form combining music, poetry, and theater. Famous operas feature unamplified voices that cut through entire orchestras." },
  { q: "Where does the term 'computer bug' come from?", a: "A moth was found stuck in a computer relay", wrong: ["Early computers used insect-shaped transistors","Programmers used 'bug' as slang for a code error","It came from a military code name"], cat: "Technology", fact: "In 1947, engineers found an actual moth stuck in a relay of the Harvard Mark II computer, causing a malfunction. They taped it into the logbook and wrote 'First actual case of a bug being found.' The term has stuck ever since!" },
  { q: "What did Ancient Egyptians use bread as?", a: "Currency", wrong: ["Building material","Medicine","Fuel for fires"], cat: "Food & Drink", fact: "Ancient Egyptians used bread and beer as currency to pay workers, including those who built the pyramids! Bread was so central to life that over 50 varieties have been found in archaeological records." },
  { q: "What does the word 'pancake' first appear in?", a: "An English cookbook from the 1400s", wrong: ["A Roman cookbook from 100 AD","A French pastry guide from the 1600s","An American diner menu from the 1800s"], cat: "Pancakes", fact: "The word 'pancake' first appeared in an English cookbook around 1430! But pancake-like foods have been made for over 30,000 years. Ancient humans ground grains and cooked them on hot stones, and nearly every culture has its own version." },
  { q: "How many cups of coffee does the average American drink per day?", a: "About 3 cups", wrong: ["About 1 cup","About 2 cups","About 5 cups"], cat: "Coffee", fact: "The average American coffee drinker has about 3 cups per day! The U.S. is one of the largest coffee-consuming countries in the world. Coffee is also the second most traded commodity globally after oil." },
  { q: "How long does honey last if stored properly?", a: "Indefinitely", wrong: ["About 2 years","About 10 years","About 50 years"], cat: "Food & Drink", fact: "Honey never spoils! Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible. Its low moisture content and natural acidity make it almost impossible for bacteria to grow." },
  { q: "What was pizza originally considered in Italy?", a: "Street food for the poor", wrong: ["A dessert for wealthy families","A royal delicacy","A religious ceremonial food"], cat: "Food & Drink", fact: "Pizza originated as cheap street food in Naples, Italy, eaten by the working poor. It wasn't considered respectable until Queen Margherita of Italy tried it in 1889 and loved it. The classic Margherita pizza was created in her honor!" },
  { q: "Which breakfast food was invented as part of a health reform movement?", a: "Corn flakes", wrong: ["Bacon","Orange juice","Scrambled eggs"], cat: "Breakfast", fact: "Corn flakes were invented in 1894 by Dr. John Harvey Kellogg as a bland, healthy food. His brother Will added sugar and turned it into a commercial sensation. The Kellogg's brand was born!" },
  { q: "How many words does the average person know?", a: "Around 42,000", wrong: ["Around 5,000","Around 20,000","Around 100,000"], cat: "Words & Language", fact: "A 2016 study found that the average adult knows around 42,000 dictionary words by age 20 and keeps growing to about 48,000 by age 60. Experts estimate we passively recognize far more, perhaps 100,000 words, even if we rarely use them." },
  { q: "What is the most common letter in the English language?", a: "E", wrong: ["A","T","S"], cat: "Words & Language", fact: "The letter E is the most common letter in English, appearing in about 13% of all text! That is why Wheel of Fortune gives players E, R, S, T, L, and N for free in the final round." },
  { q: "Approximately how many words does the English language contain?", a: "Around 170,000", wrong: ["Around 50,000","Around 500,000","Around 1,000,000"], cat: "Words & Language", fact: "The Oxford English Dictionary contains about 170,000 words currently in use, with another 47,000 obsolete words. English adds roughly 1,000 new words every year and borrows heavily from French, Latin, German, and hundreds of other languages." },
  { q: "What Danish concept describes the feeling of coziness and contentment?", a: "Hygge", wrong: ["Lagom","Sisu","Fika"], cat: "Cozy Living", fact: "Hygge (pronounced HOO-gah) is a Danish and Norwegian concept describing a mood of coziness and comfortable conviviality. It might be a candlelit dinner, a warm blanket, or good conversation. Denmark consistently ranks among the happiest countries!" },
  { q: "What does 'fika' mean in Swedish culture?", a: "A coffee and snack break with others", wrong: ["An afternoon nap","A long walk in nature","A weekly family dinner"], cat: "Cozy Living", fact: "Fika is a cherished Swedish tradition: a deliberate pause in the day to enjoy coffee and a sweet treat with friends or colleagues. Many Swedish workplaces build it into the daily schedule. Cinnamon rolls are the classic fika companion!" },
  { q: "How many books does the average American read per year?", a: "About 12", wrong: ["About 2","About 4","About 20"], cat: "Books", fact: "According to Gallup, Americans read an average of about 12 books per year, though avid readers skew that number up significantly. Women tend to read more books than men, and fiction is the most popular genre across all age groups." },
  { q: "What is the best-selling book of all time?", a: "The Bible", wrong: ["Harry Potter and the Sorcerer's Stone","Don Quixote","A Tale of Two Cities"], cat: "Books", fact: "The Bible is the best-selling book of all time with an estimated 5 billion copies sold. Don Quixote holds the record for best-selling novel at over 500 million copies. Harry Potter has sold over 600 million copies across the entire series!" },
  { q: "What percentage of Earth's water is drinkable fresh water?", a: "About 3%", wrong: ["About 25%","About 10%","About 1%"], cat: "Fun Facts", fact: "Only about 3% of Earth's water is fresh water and most of that is locked in glaciers and ice caps! Less than 1% of all water on Earth is actually accessible for human use. This is why water conservation matters so much." },
  { q: "How far do bees travel to make one pound of honey?", a: "About 55,000 miles", wrong: ["About 500 miles","About 10,000 miles","About 100,000 miles"], cat: "Fun Facts", fact: "To produce just one pound of honey, bees collectively fly about 55,000 miles and visit around 2 million flowers! A single bee will produce only about 1/12 of a teaspoon of honey in its entire lifetime." },
  { q: "What is the only food that never expires?", a: "All of the above", wrong: ["Vinegar","Salt","Honey"], cat: "Fun Facts", fact: "Honey, salt, and pure distilled white vinegar all have an indefinite shelf life when stored properly! Salt never expires because it's a mineral. Vinegar is self-preserving due to its acidity. And honey's natural properties keep it fresh for millennia." },
  { q: "What is the most covered song in history?", a: "Yesterday by The Beatles", wrong: ["Happy Birthday to You","Somewhere Over the Rainbow","What a Wonderful World"], cat: "Music", fact: "Yesterday by The Beatles holds the Guinness World Record as the most covered song in history, with over 2,200 recorded versions! Paul McCartney woke up with the melody in his head and temporarily titled it 'Scrambled Eggs' while writing the lyrics." },
  { q: "How many piano keys are on a standard piano?", a: "88", wrong: ["72","76","96"], cat: "Music", fact: "A standard piano has 88 keys: 52 white and 36 black. This design was standardized in the late 1800s. The piano was invented around 1700 by Bartolomeo Cristofori in Italy." },
  { q: "What is the oldest living type of tree on Earth?", a: "Bristlecone Pine", wrong: ["Redwood","Baobab","Olive tree"], cat: "Nature", fact: "The Great Basin Bristlecone Pine is the oldest known living tree species, with one individual named Methuselah estimated to be over 4,800 years old! Its location is kept secret to protect it. It grows in the White Mountains of California." },
  { q: "How much of Earth's oxygen is produced by the ocean?", a: "About 50%", wrong: ["About 10%","About 30%","About 80%"], cat: "Nature", fact: "About 50% of Earth's oxygen comes from the ocean, produced by tiny marine plants called phytoplankton! The Amazon rainforest produces about 20%. So the ocean is literally the lungs of the planet." },
  { q: "How long does it take to form a habit, according to research?", a: "It varies widely by person and habit", wrong: ["21 days","66 days","90 days"], cat: "Everyday Wonders", fact: "The popular idea that habits form in 21 days comes from a misread of a 1960 self-help book! A 2010 study found it actually takes anywhere from 18 to 254 days depending on the person and the habit, with an average of about 66 days." },
  { q: "How many times does the average person laugh per day?", a: "About 15", wrong: ["About 5","About 30","About 50"], cat: "Everyday Wonders", fact: "Adults laugh an average of about 15 times per day but children laugh up to 400 times! Laughter releases endorphins, reduces stress hormones, and even provides a mild workout for your core muscles." },
  { q: "What sense is most closely linked to memory?", a: "Smell", wrong: ["Sight","Hearing","Touch"], cat: "Everyday Wonders", fact: "Smell is the sense most directly connected to memory and emotion! The olfactory bulb, which processes smell, is directly linked to the brain's memory and emotion centers. This is why a whiff of cinnamon or coffee can instantly transport you back in time." },
  { q: "How long is an elephant's pregnancy?", a: "About 22 months", wrong: ["About 6 months","About 12 months","About 18 months"], cat: "Animals", fact: "Elephants have the longest pregnancy of any land animal: nearly 22 months! Baby elephants are born weighing about 200 pounds and can stand within an hour. Elephants also mourn their dead and return to the bones of deceased family members." },
  { q: "How many hearts does an octopus have?", a: "3", wrong: ["1","2","5"], cat: "Animals", fact: "Octopuses have three hearts! Two pump blood to the gills, and one pumps it to the rest of the body. Their blood is also blue because it contains copper-based hemocyanin. They also have nine brains: one central and one in each arm!" },
  { q: "What is the shortest complete sentence in the English language?", a: "Go.", wrong: ["I am.","Be.","Hi."], cat: "Words & Language", fact: "The shortest grammatically complete sentence in English is 'Go.' It's a command where the subject 'you' is implied. 'I am.' is the shortest sentence with an explicit subject and verb. English is remarkable for how much meaning can be packed into two letters!" },
  { q: "Which planet in our solar system has the most moons?", a: "Saturn", wrong: ["Jupiter","Neptune","Uranus"], cat: "Space", fact: "Saturn has 146 confirmed moons as of 2024. Scientists keep discovering new ones with increasingly powerful telescopes!" },
  { q: "In what country did coffee actually originate?", a: "Ethiopia", wrong: ["Brazil","Yemen","Colombia"], cat: "Coffee", fact: "Ethiopia is the birthplace of coffee. The wild coffee plant was discovered there and its use spread to Yemen and the rest of the world around the 15th century." },
  { q: "What is a polar bear's fur actually made of?", a: "Hollow, transparent strands", wrong: ["Dense white fibers","Waterproof white wool","Thick cream-colored fur"], cat: "Animals", fact: "Each strand of polar bear fur is hollow and transparent. It only appears white because it scatters visible light, the same reason snow looks white!" },
  { q: "Which country invented pasta?", a: "China", wrong: ["Italy","Greece","Persia"], cat: "Food & Drink", fact: "Noodles were enjoyed in China at least 4,000 years ago. The oldest known noodles, found preserved in a bowl in China, date to about 4,000 years ago." },
  { q: "How long is a Venusian day compared to its year?", a: "Longer than a Venusian year", wrong: ["About 24 hours","About 90 Earth days","Shorter than Earth's day"], cat: "Space", fact: "Venus rotates so slowly that a single Venusian day (243 Earth days) is actually longer than its entire orbit around the Sun (225 Earth days)." },
  { q: "What does the www in a web address stand for?", a: "World Wide Web", wrong: ["Worldwide Wireless Web","World Web Works","Wide World Web"], cat: "Technology", fact: "The World Wide Web was invented by Tim Berners-Lee in 1989 as a system for sharing information over the internet. The web and the internet are not the same thing!" },
  { q: "Which metal is liquid at room temperature?", a: "Mercury", wrong: ["Gallium","Cesium","Bismuth"], cat: "Science", fact: "Mercury is the only metal that is liquid at standard room temperature. It was used in thermometers for centuries before safer alternatives were developed." },
  { q: "How many sides does a hexagon have?", a: "Six", wrong: ["Five","Seven","Eight"], cat: "Math", fact: "Honeybees build hexagonal cells in their honeycombs because hexagons are the most space-efficient shape, creating the most storage with the least wax." },
  { q: "Which ancient wonder of the world still exists today?", a: "Great Pyramid of Giza", wrong: ["Hanging Gardens of Babylon","Colossus of Rhodes","Temple of Artemis"], cat: "History", fact: "Built around 2560 BCE, the Great Pyramid stood as the tallest human-made structure on Earth for over 3,800 years. It is the only one of the Seven Wonders still standing." },
  { q: "What ingredient makes bread fluffy?", a: "Yeast", wrong: ["Baking soda","Salt","Gluten"], cat: "Food & Drink", fact: "Yeast consumes sugars in dough and releases carbon dioxide gas, creating the air pockets that give bread its soft, airy texture. Sourdough uses wild yeast from the air!" },
  { q: "How many colors appear in a standard rainbow?", a: "Seven", wrong: ["Five","Six","Eight"], cat: "Science", fact: "The seven colors are red, orange, yellow, green, blue, indigo, and violet. Rainbows are actually full circles; we only see arcs because the ground cuts off the bottom half." },
  { q: "On which continent is the Sahara Desert?", a: "Africa", wrong: ["Asia","South America","Australia"], cat: "Geography", fact: "The Sahara is the world's largest hot desert, covering about 3.6 million square miles across 11 northern African countries. It was once a lush, green savanna." },
  { q: "What causes the Northern Lights?", a: "Solar particles hitting Earth's atmosphere", wrong: ["Light reflecting off polar ice","Moonlight refracted by cold air","Volcanic gases rising at the poles"], cat: "Science", fact: "The Northern Lights (Aurora Borealis) are caused by charged particles from the sun colliding with gases in Earth's atmosphere. The different colors come from different types of gas at different altitudes." },
  { q: "How long does it take light from the Sun to reach Earth?", a: "About 8 minutes", wrong: ["About 8 seconds","About 8 hours","About 8 days"], cat: "Space", fact: "Sunlight takes about 8 minutes and 20 seconds to travel the 93 million miles to Earth. This means we always see the Sun as it was 8 minutes ago, not as it is right now." },
  { q: "What is the only mammal native to Antarctica?", a: "There are none", wrong: ["Polar bear","Arctic fox","Snow leopard"], cat: "Animals", fact: "No land mammals are native to Antarctica! Penguins, seals, and whales visit or live in its waters, but polar bears live in the Arctic, not Antarctica. The two poles are on opposite ends of the Earth." },
  { q: "How many teeth does an adult human have?", a: "32", wrong: ["28","30","36"], cat: "Science", fact: "Adults have 32 teeth including 4 wisdom teeth. Many people have their wisdom teeth removed because modern human jaws are often too small to accommodate them comfortably." },
];

const LEGENDS = [
  "Your legend will be told for generations to come.",
  "The Trivia Crew raises a cup to you across the centuries.",
  "Future cafe regulars will study your answers.",
  "The leather tome glows with your contribution.",
  "You have honored the Letter Griddle Cafe.",
  "Laurel smiles at you from across time. \u2615",
  "Well done, chronicler. The future remembers.",
  "The archives of Griddle Falls are richer for your visit.",
  "Your name is written in the pages of the tome.",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function GriddleloguePage() {
  const [view, setView] = useState('setup');
  const [qCount, setQCount] = useState(5);
  const [timeLimitSec, setTimeLimitSec] = useState(60);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [remaining, setRemaining] = useState(60);
  const [timerMax, setTimerMax] = useState(60);
  const [showStats, setShowStats] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [legend, setLegend] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  const [stats, setStats] = useState({
    totalPlayed: 0,
    totalCorrect: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastPlayedDate: null,
  });

  const timerRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
    try {
      const saved = localStorage.getItem('griddlelogueStats');
      if (saved) setStats(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveStats = useCallback((newStats) => {
    setStats(newStats);
    try { localStorage.setItem('griddlelogueStats', JSON.stringify(newStats)); } catch (e) {}
  }, []);

  // Timer tick
  useEffect(() => {
    if (view !== 'play' || answered) return;
    timerRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Time expired - record as timed out and advance
          setResults(r => {
            const newResults = [...r, { correct: false, selected: null, timedOut: true }];
            return newResults;
          });
          setAnswered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [view, answered, idx]);

  // Auto-advance after timeout
  useEffect(() => {
    if (!answered || remaining > 0) return;
    // timed out - show briefly then advance
    const t = setTimeout(() => advanceOrFinish(), 1500);
    return () => clearTimeout(t);
  }, [answered, remaining]);

  const startGame = () => {
    const pool = shuffle(ALL_QUESTIONS).slice(0, Math.min(qCount, ALL_QUESTIONS.length));
    const qs = pool.map(q => ({ ...q, _opts: shuffle([q.a, ...q.wrong]) }));
    setQuestions(qs);
    setIdx(0);
    setAnswered(false);
    setSelected(null);
    setResults([]);
    setRemaining(timeLimitSec);
    setTimerMax(timeLimitSec);
    setView('play');
  };

  const handleAnswer = (sel) => {
    if (answered) return;
    clearInterval(timerRef.current);
    const q = questions[idx];
    const correct = sel === q.a;
    setSelected(sel);
    setAnswered(true);
    setResults(r => [...r, { correct, selected: sel, timedOut: false }]);
  };

  const advanceOrFinish = () => {
    if (idx + 1 < questions.length) {
      setIdx(i => i + 1);
      setAnswered(false);
      setSelected(null);
      setRemaining(timeLimitSec);
    } else {
      // Game over - update stats
      const correctCount = results.filter(r => r.correct).length + (answered && selected === questions[idx]?.a ? 0 : 0);
      const today = new Date().toDateString();
      const newStats = {
        ...stats,
        totalPlayed: stats.totalPlayed + 1,
        totalCorrect: stats.totalCorrect + results.filter(r => r.correct).length,
        currentStreak: stats.lastPlayedDate === new Date(Date.now() - 86400000).toDateString()
          ? stats.currentStreak + 1 : 1,
        maxStreak: Math.max(stats.maxStreak, stats.currentStreak + 1),
        lastPlayedDate: today,
      };
      saveStats(newStats);
      setLegend(LEGENDS[Math.floor(Math.random() * LEGENDS.length)]);
      setView('recap');
    }
  };

  const handleNext = () => advanceOrFinish();

  const handleShare = async () => {
    const total = questions.length;
    const correct = results.filter(r => r.correct).length;
    const pct = Math.round((correct / total) * 100);
    const dots = results.map(r => r.timedOut ? '\u23f1\ufe0f' : r.correct ? '\ud83c\udf6f' : '\u2615').join('');
    const text = [
      'Griddlelogue \ud83d\udcd6',
      dots,
      `${correct}/${total} trivia entries preserved (${pct}%)`,
      '',
      'Play at lettergriddle.com/griddlelogue',
      'More games at lettergriddle.com',
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (e) {}
  };

  const timerPct = Math.max(0, (remaining / timerMax) * 100);
  const timerColor = timerPct > 50 ? '#c8780a' : timerPct > 25 ? '#d4780a' : '#b84040';

  const currentYear = hasMounted ? new Date().getFullYear() : 2026;

  // ── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <>
      <Analytics />
      <div style={{
        background: '#fdf6e8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px 16px 40px',
        fontFamily: "'Georgia', serif",
        color: '#2c1f0e',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          background: '#fdf6e8',
          border: '1px solid rgba(200,120,10,0.35)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 2px 24px rgba(140,90,30,0.12), 0 8px 48px rgba(0,0,0,0.08)',
          marginTop: '8px',
        }}>

          {/* Top strip */}
          <div style={{
            height: '5px',
            background: 'linear-gradient(90deg, #9a5a06, #f0a030, #9070d8, #f0a030, #9a5a06)',
          }} />

          {/* Header nav */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 22px 0',
          }}>
            <a href="https://lettergriddle.com" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: '#8a7055', textDecoration: 'none', fontSize: '13px',
            }}>
              <span style={{fontSize: '18px'}}>🥞</span>
              <span style={{fontFamily: 'Georgia, serif'}}>Letter Griddle Games</span>
            </a>
            <button onClick={() => setShowStats(true)} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#8a7055', fontSize: '13px',
            }}>
              <BarChart3 size={16} />
              <span>Stats</span>
            </button>
          </div>

          {/* ── SETUP SCREEN ── */}
          {view === 'setup' && (
            <div style={{padding: '20px 22px 0'}}>
              <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <div style={{fontSize: '36px', marginBottom: '10px'}}>📖🕰️</div>
                <div style={{
                  fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                  color: '#9070d8', marginBottom: '8px',
                }}>Letter Griddle · Year 2126</div>
                <h1 style={{
                  fontFamily: "'Georgia', serif", fontSize: '32px', fontWeight: '600',
                  color: '#5c3d1a', marginBottom: '4px', letterSpacing: '0.5px',
                }}>Griddlelogue</h1>
                <p style={{fontSize: '14px', color: '#8a7055', fontStyle: 'italic', lineHeight: '1.5'}}>
                  A trivia travelogue for cafe regulars across time
                </p>
              </div>

              <div style={{
                background: '#f5e9cc',
                border: '1px solid rgba(200,120,10,0.35)',
                borderLeft: '3px solid #c8780a',
                borderRadius: '8px',
                padding: '14px 16px',
                marginBottom: '22px',
                fontSize: '13.5px',
                color: '#4a3520',
                lineHeight: '1.65',
              }}>
                It is the year 2126. The trivia questions beloved by the Letter Griddle Cafe&apos;s Trivia Crew are at risk of being lost to history. You have a limited time to answer as many as you can and preserve them in the{' '}
                <em>Letter Griddle&apos;s</em> leather-bound tome, for future generations of cafe regulars.
              </div>

              <div style={{fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a7055', marginBottom: '10px'}}>
                Questions to preserve
              </div>
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px'}}>
                {[3,5,7,10].map(n => (
                  <button key={n} onClick={() => setQCount(n)} style={{
                    background: qCount === n ? '#f5e9cc' : 'white',
                    border: `1px solid ${qCount === n ? '#c8780a' : 'rgba(200,120,10,0.35)'}`,
                    color: qCount === n ? '#5c3d1a' : '#8a7055',
                    padding: '9px 16px', borderRadius: '8px', cursor: 'pointer',
                    fontSize: '13px', fontFamily: 'Georgia, serif',
                  }}>{n} questions</button>
                ))}
              </div>

              <div style={{fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a7055', marginBottom: '10px'}}>
                Time limit
              </div>
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px'}}>
                {[{s:30,l:'30 sec'},{s:60,l:'1 minute'},{s:90,l:'90 sec'},{s:120,l:'2 minutes'}].map(t => (
                  <button key={t.s} onClick={() => setTimeLimitSec(t.s)} style={{
                    background: timeLimitSec === t.s ? '#f5e9cc' : 'white',
                    border: `1px solid ${timeLimitSec === t.s ? '#c8780a' : 'rgba(200,120,10,0.35)'}`,
                    color: timeLimitSec === t.s ? '#5c3d1a' : '#8a7055',
                    padding: '9px 16px', borderRadius: '8px', cursor: 'pointer',
                    fontSize: '13px', fontFamily: 'Georgia, serif',
                  }}>{t.l}</button>
                ))}
              </div>

              <hr style={{border: 'none', borderTop: '1px solid rgba(140,90,30,0.2)', margin: '6px 0 22px'}} />
              <button onClick={startGame} style={{
                width: '100%', padding: '15px',
                background: '#c8780a', color: 'white', border: 'none',
                borderRadius: '10px', fontFamily: 'Georgia, serif',
                fontSize: '17px', letterSpacing: '0.5px', cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(200,120,10,0.3)',
              }}>Open the Tome →</button>
            </div>
          )}

          {/* ── PLAY SCREEN ── */}
          {view === 'play' && questions.length > 0 && (
            <div style={{padding: '20px 22px 0'}}>
              {/* HUD */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '16px', paddingBottom: '14px',
                borderBottom: '1px solid rgba(140,90,30,0.2)',
              }}>
                <div style={{textAlign: 'center', minWidth: '52px'}}>
                  <div style={{fontFamily: 'Georgia, serif', fontSize: '22px', color: '#5c3d1a', lineHeight: 1}}>
                    {idx + 1}<span style={{fontSize: '14px', color: '#8a7055'}}>/{questions.length}</span>
                  </div>
                  <div style={{fontSize: '11px', color: '#8a7055', marginTop: '3px'}}>Entry</div>
                </div>

                {/* Countdown bar */}
                <div style={{flex: 1, padding: '0 16px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                    <span style={{fontSize: '11px', color: '#8a7055', letterSpacing: '1px', textTransform: 'uppercase'}}>Time remaining</span>
                    <span style={{fontFamily: 'Georgia, serif', fontSize: '14px', color: '#5c3d1a'}}>{remaining}s</span>
                  </div>
                  <div style={{
                    height: '8px', background: '#f5e9cc',
                    border: '1px solid rgba(200,120,10,0.35)',
                    borderRadius: '4px', overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', borderRadius: '4px',
                      width: `${timerPct}%`,
                      background: timerColor,
                      transition: 'width 0.85s linear, background-color 0.4s',
                    }} />
                  </div>
                </div>

                <div style={{textAlign: 'center', minWidth: '52px'}}>
                  <div style={{fontFamily: 'Georgia, serif', fontSize: '22px', color: '#5c3d1a', lineHeight: 1}}>
                    {results.filter(r => r.correct).length}
                  </div>
                  <div style={{fontSize: '11px', color: '#8a7055', marginTop: '3px'}}>Preserved</div>
                </div>
              </div>

              {/* Progress dots */}
              <div style={{display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '20px'}}>
                {questions.map((_, i) => {
                  let bg = '#f5e9cc', border = 'rgba(200,120,10,0.35)', shadow = 'none';
                  if (i < idx) { bg = results[i]?.correct ? '#c8780a' : '#8a7055'; border = bg; }
                  else if (i === idx) { bg = 'white'; border = '#9070d8'; shadow = '0 0 0 2px rgba(96,64,176,0.15)'; }
                  return (
                    <div key={i} style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: bg, border: `1px solid ${border}`, boxShadow: shadow,
                      transition: 'all 0.25s',
                    }} />
                  );
                })}
              </div>

              {/* Category + Question */}
              <div style={{
                display: 'inline-block',
                background: 'rgba(96,64,176,0.15)',
                border: '1px solid rgba(96,64,176,0.25)',
                color: '#9070d8',
                fontSize: '11px',
                padding: '3px 12px',
                borderRadius: '20px',
                marginBottom: '12px',
              }}>{questions[idx].cat}</div>
              <p style={{
                fontSize: '18px', lineHeight: '1.55', color: '#2c1f0e',
                marginBottom: '20px', minHeight: '56px',
              }}>{questions[idx].q}</p>

              {/* Choices */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px', marginBottom: '14px'}}>
                {questions[idx]._opts.map((o, i) => {
                  let bg = 'white', border = 'rgba(140,90,30,0.2)', color = '#4a3520';
                  if (answered) {
                    if (o === questions[idx].a) { bg = '#edf7f2'; border = 'rgba(58,140,92,0.4)'; color = '#3a8c5c'; }
                    else if (o === selected) { bg = '#fdf0f0'; border = 'rgba(184,64,64,0.35)'; color = '#b84040'; }
                    else { color = '#8a7055'; }
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(o)} disabled={answered} style={{
                      background: bg, border: `1px solid ${border}`, color,
                      padding: '12px', borderRadius: '9px', cursor: answered ? 'default' : 'pointer',
                      fontSize: '14px', fontFamily: 'Georgia, serif',
                      textAlign: 'left', lineHeight: '1.4', transition: 'all 0.16s',
                    }}>{o}</button>
                  );
                })}
              </div>

              {/* Fact box */}
              <div style={{
                background: answered
                  ? (selected === questions[idx].a ? '#edf7f2' : '#fdf0f0')
                  : '#f5e9cc',
                border: `1px solid ${answered
                  ? (selected === questions[idx].a ? 'rgba(58,140,92,0.4)' : 'rgba(184,64,64,0.35)')
                  : 'rgba(140,90,30,0.2)'}`,
                borderRadius: '9px', padding: '13px 15px',
                fontSize: '13.5px', lineHeight: '1.6', marginBottom: '14px',
                color: answered
                  ? (selected === questions[idx].a ? '#2a6644' : '#7a3030')
                  : '#8a7055',
                fontStyle: answered ? 'normal' : 'italic',
                minHeight: '52px',
              }}>
                {answered
                  ? `${selected === questions[idx].a ? '🍯' : '☕'} ${
                      selected === questions[idx].a
                        ? questions[idx].fact
                        : `The correct answer was: ${questions[idx].a}. ${questions[idx].fact}`
                    }`
                  : 'Choose your answer to preserve this entry...'}
              </div>

              {answered && (
                <button onClick={handleNext} style={{
                  width: '100%', padding: '12px',
                  background: 'white', border: '1px solid rgba(200,120,10,0.35)',
                  color: '#5c3d1a', borderRadius: '9px', cursor: 'pointer',
                  fontSize: '14px', fontFamily: 'Georgia, serif', marginBottom: '4px',
                }}>
                  {idx + 1 < questions.length ? 'Record next entry \u2192' : 'Seal the tome \u2192'}
                </button>
              )}
            </div>
          )}

          {/* ── RECAP SCREEN ── */}
          {view === 'recap' && (
            <div style={{padding: '20px 22px 0'}}>
              <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <div style={{fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#9070d8', marginBottom: '10px'}}>
                  Griddlelogue · Session Complete
                </div>
                <div style={{fontFamily: 'Georgia, serif', fontSize: '52px', fontWeight: '600', color: '#5c3d1a', lineHeight: 1}}>
                  {results.filter(r => r.correct).length}/{questions.length}
                </div>
                <div style={{fontSize: '14px', color: '#8a7055', marginTop: '6px', fontStyle: 'italic'}}>
                  {Math.round((results.filter(r => r.correct).length / questions.length) * 100)}% of trivia preserved for future generations
                </div>
              </div>

              <div style={{display: 'flex', gap: '10px', marginBottom: '18px'}}>
                {[
                  { n: results.filter(r => r.correct).length, l: 'Correct' },
                  { n: results.filter(r => !r.correct).length, l: 'Missed' },
                  { n: `${Math.round((results.filter(r => r.correct).length / questions.length) * 100)}%`, l: 'Accuracy' },
                ].map((s, i) => (
                  <div key={i} style={{
                    flex: 1, background: '#f5e9cc',
                    border: '1px solid rgba(140,90,30,0.2)',
                    borderRadius: '10px', padding: '14px 10px', textAlign: 'center',
                  }}>
                    <div style={{fontFamily: 'Georgia, serif', fontSize: '28px', color: '#5c3d1a'}}>{s.n}</div>
                    <div style={{fontSize: '11px', color: '#8a7055', marginTop: '3px'}}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: '#f5e9cc', border: '1px solid rgba(200,120,10,0.35)',
                borderLeft: '3px solid #c8780a', borderRadius: '8px',
                padding: '14px 18px', fontSize: '14px', color: '#7a5230',
                fontStyle: 'italic', textAlign: 'center', marginBottom: '18px',
                lineHeight: '1.6', fontFamily: 'Georgia, serif',
              }}>&ldquo;{legend}&rdquo;</div>

              {/* Travelogue */}
              <div style={{
                background: 'white', border: '1px solid rgba(140,90,30,0.2)',
                borderRadius: '12px', overflow: 'hidden', marginBottom: '18px',
              }}>
                <div style={{
                  background: '#f5e9cc', borderBottom: '1px solid rgba(140,90,30,0.2)',
                  padding: '11px 16px', fontFamily: 'Georgia, serif',
                  fontSize: '14px', color: '#5c3d1a',
                }}>📜 Your Travelogue</div>
                <div style={{padding: '12px 16px', maxHeight: '250px', overflowY: 'auto'}}>
                  {results.map((r, i) => {
                    const q = questions[i];
                    if (!q) return null;
                    const icon = r.timedOut ? '⏱' : r.correct ? '🍯' : '☕';
                    const aText = r.timedOut
                      ? `Time expired. Answer: ${q.a}`
                      : r.selected;
                    return (
                      <div key={i} style={{
                        display: 'flex', gap: '10px', alignItems: 'flex-start',
                        padding: '9px 0',
                        borderBottom: i < results.length - 1 ? '1px solid rgba(140,90,30,0.08)' : 'none',
                      }}>
                        <span style={{fontSize: '14px', flexShrink: 0, marginTop: '1px', width: '18px', textAlign: 'center'}}>{icon}</span>
                        <div>
                          <div style={{fontSize: '13px', color: '#8a7055', fontStyle: 'italic', lineHeight: '1.4'}}>{q.q}</div>
                          <div style={{fontSize: '13.5px', color: '#4a3520', marginTop: '2px'}}>{aText}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{display: 'flex', gap: '10px'}}>
                <button onClick={() => setView('setup')} style={{
                  flex: 1, padding: '13px',
                  background: '#c8780a', color: 'white', border: 'none',
                  borderRadius: '9px', fontFamily: 'Georgia, serif',
                  fontSize: '15px', cursor: 'pointer',
                }}>Play again</button>
                <button onClick={handleShare} style={{
                  flex: 1, padding: '13px',
                  background: 'white', border: '1px solid rgba(200,120,10,0.35)',
                  color: '#5c3d1a', borderRadius: '9px',
                  fontSize: '14px', fontFamily: 'Georgia, serif', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                }}>
                  <Share2 size={16} />
                  {shareCopied ? 'Copied!' : 'Copy recap'}
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{
            textAlign: 'center', padding: '20px 22px 24px',
            borderTop: view !== 'play' ? '1px solid rgba(140,90,30,0.2)' : 'none',
            marginTop: '20px',
          }}>
            <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '8px'}}>
              {[
                { href: 'https://lettergriddle.com', label: 'Letter Griddle Games' },
                { href: 'https://lettergriddle.com/privacy', label: 'Privacy' },
                { href: 'https://lettergriddle.com/terms', label: 'Terms' },
              ].map(l => (
                <a key={l.href} href={l.href} style={{
                  fontSize: '12px', color: '#8a7055', textDecoration: 'none',
                }}>{l.label}</a>
              ))}
            </div>
            <div style={{fontSize: '11px', color: '#8a7055', opacity: 0.7}}>
              © {currentYear} Letter Griddle. All rights reserved.
            </div>
          </div>
        </div>

        {/* Stats Modal */}
        {showStats && (
          <div
            onClick={() => setShowStats(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: 'rgba(92,61,26,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
            }}
          >
            <div onClick={e => e.stopPropagation()} style={{
              background: 'white', borderRadius: '16px', padding: '28px 24px',
              maxWidth: '320px', width: '100%', position: 'relative',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            }}>
              <button onClick={() => setShowStats(false)} style={{
                position: 'absolute', top: '14px', right: '14px',
                background: 'none', border: 'none', cursor: 'pointer', color: '#8a7055',
              }}><X size={22} /></button>
              <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <div style={{fontSize: '28px', marginBottom: '8px'}}>📖🕰️</div>
                <h2 style={{fontFamily: 'Georgia, serif', fontSize: '20px', color: '#5c3d1a'}}>Your Stats</h2>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                {[
                  { n: stats.totalPlayed, l: 'Sessions played' },
                  { n: stats.totalCorrect, l: 'Total correct' },
                  { n: stats.currentStreak, l: 'Current streak' },
                  { n: stats.maxStreak, l: 'Best streak' },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: '#f5e9cc', borderRadius: '10px',
                    padding: '14px 10px', textAlign: 'center',
                  }}>
                    <div style={{fontFamily: 'Georgia, serif', fontSize: '26px', color: '#5c3d1a'}}>{s.n}</div>
                    <div style={{fontSize: '11px', color: '#8a7055', marginTop: '3px'}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <p style={{textAlign: 'center', fontSize: '11px', color: '#8a7055', marginTop: '16px'}}>
                Stats saved locally on your device
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
