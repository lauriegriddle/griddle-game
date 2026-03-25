"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BarChart3, X, Share2, Check } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

// ── QUESTION BANK (keyed by category) ─────────────────────────────────────────

const QUESTION_BANK = {
  "Pancakes": [
    { q: "What country celebrates National Pancake Day on Shrove Tuesday?", a: "United Kingdom", wrong: ["United States","Canada","Australia"], fact: "In the UK, Shrove Tuesday is called Pancake Day and dates back to 1100 AD. It was a way to use up rich foods before Lent!" },
    { q: "What is the main leavening agent in traditional pancakes?", a: "Baking powder", wrong: ["Yeast","Egg whites","Cream of tartar"], fact: "Baking powder was invented in 1843 and revolutionized pancake making. Before that, cooks used yeast, which required hours of rising time!" },
    { q: "Which U.S. state produces the most maple syrup?", a: "Vermont", wrong: ["Maine","New York","New Hampshire"], fact: "Vermont produces about 2 million gallons of maple syrup each year. It takes 40 gallons of sap to make just 1 gallon of syrup!" },
    { q: "What does the word 'pancake' first appear in?", a: "An English cookbook from the 1400s", wrong: ["A Roman cookbook from 100 AD","A French pastry guide from the 1600s","An American diner menu from the 1800s"], fact: "The word 'pancake' first appeared in an English cookbook around 1430! But pancake-like foods have been made for over 30,000 years. Nearly every culture has its own version." },
    { q: "How long is a Venusian day compared to a Venusian year?", a: "Longer than a Venusian year", wrong: ["About the same","About half as long","Three times as long"], fact: "Venus rotates so slowly that one day on Venus (243 Earth days) is longer than its entire year (225 Earth days)!" },
    { q: "What are pancakes called in France?", a: "Crepes", wrong: ["Galettes","Beignets","Flans"], fact: "French crepes are thinner than American pancakes and can be sweet or savory. The word 'crepe' comes from the Latin 'crispus' meaning curled!" },
  ],
  "Coffee": [
    { q: "Which country is the largest producer of coffee in the world?", a: "Brazil", wrong: ["Colombia","Vietnam","Ethiopia"], fact: "Brazil produces about one-third of the world's coffee. Coffee was first planted there in 1727 and transformed the country's economy!" },
    { q: "What does 'espresso' mean in Italian?", a: "Pressed out", wrong: ["Strong","Quick","Dark"], fact: "Espresso means 'pressed out' in Italian, referring to how hot water is pressed through finely ground coffee. It was invented in Italy in 1884!" },
    { q: "According to legend, who discovered coffee?", a: "A goat herder", wrong: ["A farmer","A monk","A king"], fact: "Legend says an Ethiopian goat herder named Kaldi noticed his goats became energetic after eating coffee berries around 800 AD!" },
    { q: "How many cups of coffee does the average American drink per day?", a: "About 3 cups", wrong: ["About 1 cup","About 2 cups","About 5 cups"], fact: "The average American coffee drinker has about 3 cups per day! Coffee is also the second most traded commodity globally after oil." },
    { q: "What is a 'lungo' in coffee?", a: "A long espresso with more water", wrong: ["A large latte","A cold brew","A double shot"], fact: "A lungo is made by pulling more water through the espresso grounds, resulting in a larger, slightly less intense drink than a regular espresso." },
    { q: "Where did the word 'coffee' originate?", a: "The Arabic word 'qahwa'", wrong: ["The Turkish word 'kahve'","The Ethiopian word 'kafi'","The Italian word 'caffe'"], fact: "Coffee's name traces to the Arabic 'qahwa,' which became the Turkish 'kahve,' then the Italian 'caffe,' and finally the English 'coffee.' The plant itself is native to Ethiopia." },
  ],
  "Breakfast": [
    { q: "Which meal's name literally means 'to break the fast'?", a: "Breakfast", wrong: ["Lunch","Dinner","Brunch"], fact: "The word 'breakfast' first appeared in English in the 15th century. It refers to breaking the fasting period of the night!" },
    { q: "In which country did croissants originate?", a: "Austria", wrong: ["France","Belgium","Switzerland"], fact: "The croissant originated in Vienna, Austria as the 'kipferl.' It didn't become popular in France until the 1830s!" },
    { q: "What gives orange juice its cloudy appearance?", a: "Pulp and pectin", wrong: ["Sugar","Vitamin C","Citric acid"], fact: "Fresh-squeezed orange juice is cloudy because of pectin and pulp. Clear juice has been filtered and processed to remove these!" },
    { q: "Which breakfast food was invented as part of a health reform movement?", a: "Corn flakes", wrong: ["Bacon","Orange juice","Scrambled eggs"], fact: "Corn flakes were invented in 1894 by Dr. John Harvey Kellogg as a bland, healthy food. His brother Will added sugar and turned it into a commercial sensation!" },
    { q: "What is the most consumed breakfast food in the United States?", a: "Cold cereal", wrong: ["Eggs","Toast","Bacon"], fact: "Cold cereal has topped breakfast surveys for decades. Americans consume about 2.7 billion boxes of cereal per year!" },
    { q: "What country eats fish for breakfast as a traditional meal?", a: "Japan", wrong: ["Mexico","Brazil","Germany"], fact: "A traditional Japanese breakfast often includes grilled fish, rice, miso soup, and pickled vegetables. It is considered one of the healthiest breakfast traditions in the world!" },
  ],
  "Food & Drink": [
    { q: "According to legend, how was tea discovered?", a: "Leaves fell into an emperor's boiling water", wrong: ["A monk brewed it intentionally","It was found growing wild","A sailor mixed herbs with seawater"], fact: "According to legend, Chinese Emperor Shennong discovered tea in 2737 BC when leaves from a wild tree accidentally fell into his pot of boiling water. Tea is the second most consumed beverage after water!" },
    { q: "How long does honey last if stored properly?", a: "Indefinitely", wrong: ["About 2 years","About 10 years","About 50 years"], fact: "Honey never spoils! Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible. Its low moisture content and natural acidity prevent bacteria from growing." },
    { q: "What was pizza originally considered in Italy?", a: "Street food for the poor", wrong: ["A royal delicacy","A religious food","A dessert"], fact: "Pizza originated as cheap street food in Naples, Italy. It wasn't considered respectable until Queen Margherita of Italy tried it in 1889. The classic Margherita pizza was created in her honor!" },
    { q: "How were Tater Tots invented?", a: "They were made to use up leftover potato scraps", wrong: ["A chef created them as a burger side","A farmer needed to preserve potatoes","They were inspired by a French croquette"], fact: "Tater tots were invented in 1953 by Ore-Ida founders as a way to use up leftover potato shavings from making French fries. They almost sold them for free before realizing their potential!" },
    { q: "What did Ancient Egyptians use bread as?", a: "Currency", wrong: ["Building material","Medicine","Fuel"], fact: "Ancient Egyptians used bread and beer as currency to pay workers, including those who built the pyramids! Over 50 varieties of bread have been found in archaeological records." },
    { q: "Which country invented pasta?", a: "China", wrong: ["Italy","Greece","Persia"], fact: "Noodles were enjoyed in China at least 4,000 years ago, long before pasta became a staple of Italian cuisine. The oldest known noodles were found preserved in a bowl in China." },
  ],
  "Science": [
    { q: "What is the hardest natural substance on Earth?", a: "Diamond", wrong: ["Quartz","Corundum","Titanium"], fact: "Diamonds score a perfect 10 on the Mohs hardness scale and form about 100 miles below Earth's surface under intense heat and pressure." },
    { q: "What gas do plants absorb from the air?", a: "Carbon dioxide", wrong: ["Oxygen","Nitrogen","Hydrogen"], fact: "Plants absorb carbon dioxide and release oxygen through photosynthesis. A single tree can absorb about 48 pounds of CO2 per year!" },
    { q: "What is the largest organ in the human body?", a: "Skin", wrong: ["Heart","Liver","Brain"], fact: "Your skin weighs about 8 pounds and covers roughly 22 square feet. It completely renews itself every 27 days!" },
    { q: "What causes thunder?", a: "Lightning heating air rapidly", wrong: ["Clouds colliding","Wind speed","Rain falling"], fact: "Lightning heats the air to around 30,000 degrees Fahrenheit, causing it to expand rapidly and create a sonic boom we hear as thunder!" },
    { q: "What metal is liquid at room temperature?", a: "Mercury", wrong: ["Gallium","Cesium","Francium"], fact: "Mercury is the only metal that is liquid at standard room temperature, which is why it was once used in thermometers." },
    { q: "How many bones does an adult human have?", a: "206", wrong: ["212","198","225"], fact: "Babies are born with about 270 bones. Many fuse together during childhood and adolescence leaving adults with 206 bones." },
    { q: "Why does the sky appear blue?", a: "Air molecules scatter blue light more than red", wrong: ["The ocean reflects blue upward","The ozone absorbs other colors","Water vapor refracts sunlight"], fact: "The sky is blue because of Rayleigh Scattering. Air molecules scatter shorter blue wavelengths much more efficiently than longer red ones. At sunset, the remaining red and orange light colors the sky!" },
    { q: "What is a polar bear's fur actually made of?", a: "Hollow, transparent strands", wrong: ["Dense white fibers","Waterproof white wool","Cream-colored fur"], fact: "Each strand of polar bear fur is hollow and transparent. It only appears white because it scatters visible light, the same reason snow looks white!" },
  ],
  "Space": [
    { q: "What planet has the most moons in our solar system?", a: "Saturn", wrong: ["Jupiter","Neptune","Uranus"], fact: "Saturn has 146 confirmed moons as of 2024, edging out Jupiter. Scientists keep discovering new ones with increasingly powerful telescopes!" },
    { q: "How long is a day on Venus in Earth hours?", a: "5,832 hours", wrong: ["2,800 hours","743 hours","10,000 hours"], fact: "Venus rotates so slowly that a single Venusian day is longer than its entire year. It also rotates backwards compared to most planets!" },
    { q: "What does NASA stand for?", a: "National Aeronautics and Space Administration", wrong: ["National Aerospace Science Agency","North American Space Association","National Aviation and Space Affairs"], fact: "NASA was established in 1958 and has overseen every U.S. human spaceflight program, from Mercury to the International Space Station." },
    { q: "How long does it take light from the Sun to reach Earth?", a: "About 8 minutes", wrong: ["About 8 seconds","About 8 hours","About 8 days"], fact: "Sunlight takes about 8 minutes and 20 seconds to travel 93 million miles to Earth. This means we always see the Sun as it was 8 minutes ago!" },
    { q: "What year did the first humans land on the moon?", a: "1969", wrong: ["1965","1971","1973"], fact: "Apollo 11 landed on July 20, 1969. Neil Armstrong stepped onto the lunar surface at 10:56 PM EDT, watched by an estimated 600 million people on TV." },
    { q: "What is the largest planet in our solar system?", a: "Jupiter", wrong: ["Saturn","Neptune","Uranus"], fact: "Jupiter is so large that all other planets in the solar system could fit inside it with room to spare. Its Great Red Spot is a storm that has lasted over 350 years!" },
  ],
  "History": [
    { q: "What unique distinction did Abraham Lincoln hold among U.S. Presidents?", a: "He was the only president to hold a patent", wrong: ["Only president born outside the U.S.","Only president who never married","Only president with non-consecutive terms"], fact: "Abraham Lincoln is the only U.S. President to hold a patent! He invented a device to lift boats over shallow waters. He was also the tallest president at 6'4\"." },
    { q: "What letter does NO U.S. President's last name start with?", a: "S", wrong: ["Q","X","Z"], fact: "Despite S being one of the most common starting letters for English words, no U.S. President has ever had a last name beginning with S! Letters B, Q, U, X, and Y are also missing." },
    { q: "What did Dr. Seuss write after his editor dared him to use only 50 words?", a: "Green Eggs and Ham", wrong: ["The Cat in the Hat","How the Grinch Stole Christmas","One Fish Two Fish"], fact: "Dr. Seuss wrote Green Eggs and Ham in 1960 after his editor bet him $50 that he couldn't write a book using only 50 words. He won the bet!" },
    { q: "What ancient group was served cheesecake for energy?", a: "Greek Olympic athletes", wrong: ["Roman gladiators","Egyptian pharaohs","Viking warriors"], fact: "Ancient Greek athletes were served cheesecake to boost their energy during the first Olympic Games on the island of Delos. The earliest known cheesecake recipe dates back to the 5th century BC!" },
    { q: "Which ancient wonder of the world still exists today?", a: "Great Pyramid of Giza", wrong: ["Hanging Gardens","Colossus of Rhodes","Temple of Artemis"], fact: "Built around 2560 BCE, the Great Pyramid stood as the tallest human-made structure on Earth for over 3,800 years. It is the only one of the Seven Wonders still standing." },
    { q: "What was the original purpose of the Eiffel Tower?", a: "A temporary entrance arch for a World's Fair", wrong: ["A radio transmission tower","A lighthouse","A monument to Napoleon"], fact: "The Eiffel Tower was built in 1889 as a temporary structure for the World's Fair in Paris. It was originally planned for demolition in 1909 but was saved because it served as a radio antenna!" },
  ],
  "Geography": [
    { q: "What is the smallest country in the world?", a: "Vatican City", wrong: ["Monaco","San Marino","Liechtenstein"], fact: "Vatican City is only 0.17 square miles and has about 800 residents. It became an independent state in 1929 through the Lateran Treaty with Italy!" },
    { q: "Which river flows through the most countries?", a: "Danube", wrong: ["Nile","Amazon","Rhine"], fact: "The Danube flows through 10 countries: Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova, and Ukraine!" },
    { q: "What is the largest desert in the world?", a: "Antarctic Desert", wrong: ["Sahara","Arabian","Gobi"], fact: "Antarctica is technically the world's largest desert because it receives less than 10 inches of precipitation per year. The Sahara is the largest hot desert!" },
    { q: "What is the capital of Australia?", a: "Canberra", wrong: ["Sydney","Melbourne","Brisbane"], fact: "Canberra was purpose-built as the capital in 1913 because Sydney and Melbourne both wanted to be capital, so a compromise new city was created exactly between them!" },
    { q: "Which country has the most natural lakes?", a: "Canada", wrong: ["Russia","United States","Finland"], fact: "Canada has more lakes than the rest of the world combined, with over 3 million lakes covering about 9% of its total area. The Great Lakes alone contain 21% of the world's fresh surface water!" },
    { q: "What is the driest place on Earth?", a: "Atacama Desert", wrong: ["Sahara Desert","Death Valley","Gobi Desert"], fact: "Parts of Chile's Atacama Desert have never recorded rainfall in human history! Scientists use it to test Mars rovers because it is so similar to the Martian surface." },
  ],
  "Animals": [
    { q: "How many hearts does an octopus have?", a: "3", wrong: ["1","2","4"], fact: "Octopuses have 3 hearts! Two pump blood to the gills, and one pumps blood to the rest of the body. Their blood is blue because it contains copper-based hemocyanin!" },
    { q: "What is the only mammal that can truly fly?", a: "Bat", wrong: ["Flying squirrel","Sugar glider","Colugo"], fact: "Bats are the only mammals capable of sustained flight. Flying squirrels and sugar gliders can only glide short distances. There are over 1,400 species of bats!" },
    { q: "How do hippos protect their skin from the sun?", a: "They produce a red oily secretion", wrong: ["They roll in mud constantly","They stay submerged all day","They have extra-thick UV-blocking skin"], fact: "Hippos produce their own reddish, oily secretion which acts as both sunscreen AND an antibiotic! Despite spending up to 16 hours a day in water, hippos can't actually swim; they walk along riverbeds." },
    { q: "How long is an elephant's pregnancy?", a: "About 22 months", wrong: ["About 6 months","About 12 months","About 18 months"], fact: "Elephants have the longest pregnancy of any land animal: nearly 22 months! Baby elephants are born weighing about 200 pounds and can stand within an hour." },
    { q: "What animal's fingerprints are nearly identical to humans?", a: "Koala", wrong: ["Chimpanzee","Gorilla","Orangutan"], fact: "Koala fingerprints are so similar to human prints that they could theoretically confuse crime scene investigators!" },
    { q: "How many hours a day do lions typically sleep?", a: "16 to 20 hours", wrong: ["8 to 10 hours","12 to 14 hours","22 to 23 hours"], fact: "Lions sleep up to 20 hours a day! They are the only truly social big cats, living in groups called prides. Despite being called 'king of the jungle,' lions actually live in grasslands and savannas." },
  ],
  "Music": [
    { q: "Which instrument has 88 keys?", a: "Piano", wrong: ["Organ","Harpsichord","Accordion"], fact: "The standard piano has 88 keys: 52 white and 36 black. This range covers over 7 octaves of musical notes!" },
    { q: "The Beatles were from which English city?", a: "Liverpool", wrong: ["London","Manchester","Birmingham"], fact: "The Beatles formed in Liverpool in 1960. The city now has a Beatles museum, statues, and themed tours honoring the Fab Four!" },
    { q: "What is the most covered song in history?", a: "Yesterday by The Beatles", wrong: ["Happy Birthday to You","Somewhere Over the Rainbow","What a Wonderful World"], fact: "Yesterday by The Beatles holds the Guinness World Record as the most covered song in history with over 2,200 recorded versions! Paul McCartney woke up with the melody in his head and temporarily titled it 'Scrambled Eggs.'" },
    { q: "How many piano keys are on a standard piano?", a: "88", wrong: ["72","76","96"], fact: "A standard piano has 88 keys: 52 white and 36 black. This design was standardized in the late 1800s. The piano was invented around 1700 by Bartolomeo Cristofori in Italy." },
    { q: "How many years of history does the guitar have?", a: "About 3,500 years", wrong: ["About 500 years","About 1,000 years","About 2,000 years"], fact: "Guitars have a history stretching back approximately 3,500 years, with roots in ancient Egypt and Persia! The modern six-string guitar was developed in Spain in the late 18th century." },
    { q: "What does 'MTV' stand for?", a: "Music Television", wrong: ["Music TV","Musical Television","Media Television"], fact: "MTV launched on August 1, 1981. The first music video played was 'Video Killed the Radio Star' by The Buggles!" },
  ],
  "Books": [
    { q: "Who wrote Pride and Prejudice?", a: "Jane Austen", wrong: ["Charlotte Bronte","Mary Shelley","Emily Bronte"], fact: "Jane Austen published Pride and Prejudice in 1813. She originally titled it 'First Impressions' when she wrote it at age 21!" },
    { q: "In what year was the first Harry Potter book published?", a: "1997", wrong: ["1995","1999","2001"], fact: "Harry Potter and the Philosopher's Stone was published in 1997 with just 500 copies. The series has now sold over 500 million books!" },
    { q: "What is the best-selling book of all time?", a: "The Bible", wrong: ["Harry Potter","Don Quixote","A Tale of Two Cities"], fact: "The Bible is the best-selling book of all time with an estimated 5 billion copies sold. Don Quixote holds the record for best-selling novel at over 500 million copies!" },
    { q: "What is the best-selling novel of all time?", a: "Don Quixote", wrong: ["Harry Potter","A Tale of Two Cities","The Lord of the Rings"], fact: "Don Quixote by Miguel de Cervantes has sold over 500 million copies since 1605. It is considered the first modern novel!" },
    { q: "How many books does the average American read per year?", a: "About 12", wrong: ["About 2","About 4","About 20"], fact: "According to Gallup, Americans read an average of about 12 books per year, though avid readers skew that number up significantly. Fiction is the most popular genre." },
    { q: "What did Roald Dahl do before becoming a children's author?", a: "He was a World War II fighter pilot", wrong: ["He was a chef","He was a doctor","He was a teacher"], fact: "Roald Dahl flew Hurricanes and Gladiators for the Royal Air Force during WWII and was shot down over the Libyan desert. His war experiences later influenced his storytelling!" },
  ],
  "Movies & TV": [
    { q: "What was the first fully computer-animated feature film?", a: "Toy Story", wrong: ["Shrek","A Bug's Life","Finding Nemo"], fact: "Toy Story was released by Pixar in 1995 and took four years to make. It was the first feature film made entirely with CGI!" },
    { q: "Which movie features the quote 'Here's looking at you, kid'?", a: "Casablanca", wrong: ["Gone with the Wind","The Maltese Falcon","Citizen Kane"], fact: "Casablanca was released in 1942 and won Best Picture. Humphrey Bogart improvised 'Here's looking at you, kid' during filming!" },
    { q: "How many Oscars did Titanic win in 1998?", a: "11", wrong: ["9","10","12"], fact: "Titanic won 11 Oscars, tying with Ben-Hur and later Lord of the Rings: Return of the King for the most wins ever!" },
    { q: "What was the name of the coffee shop in Friends?", a: "Central Perk", wrong: ["Central Park","Coffee Central","The Coffee House"], fact: "Central Perk's orange couch was found in a Warner Bros. storage basement. The set designers kept it because it fit perfectly!" },
    { q: "How many seasons did The Office (US) run?", a: "9", wrong: ["7","8","10"], fact: "The Office ran for 9 seasons with 201 episodes. Steve Carell left after season 7, but the show continued for two more seasons!" },
    { q: "What year did Seinfeld first air?", a: "1989", wrong: ["1987","1991","1993"], fact: "Seinfeld debuted in 1989 as 'The Seinfeld Chronicles.' It was almost cancelled after the pilot but went on to become one of TV's biggest hits!" },
  ],
  "Sports": [
    { q: "How many players are on a standard soccer team on the field?", a: "11", wrong: ["9","10","12"], fact: "Each soccer team fields 11 players including the goalkeeper. The sport is played in over 200 countries, making it the most popular sport in the world!" },
    { q: "What country invented basketball?", a: "Canada", wrong: ["United States","England","France"], fact: "Basketball was invented in 1891 by Canadian-American Dr. James Naismith in Springfield, Massachusetts. He wrote 13 basic rules, most of which still apply today!" },
    { q: "How many holes are in a standard round of golf?", a: "18", wrong: ["9","12","24"], fact: "A standard round of golf has 18 holes, a tradition that dates to St Andrews in Scotland in 1764. Before that, courses had varying numbers of holes!" },
    { q: "What is the only sport that has been played on the moon?", a: "Golf", wrong: ["Tennis","Baseball","Javelin"], fact: "Apollo 14 astronaut Alan Shepard famously hit two golf balls on the moon in 1971. He claimed one ball traveled for miles in the low lunar gravity!" },
    { q: "What country has won the most FIFA World Cup titles?", a: "Brazil", wrong: ["Germany","Italy","Argentina"], fact: "Brazil has won the FIFA World Cup five times: 1958, 1962, 1970, 1994, and 2002. They are the only nation to have participated in every World Cup since 1930!" },
    { q: "What sport uses a shuttlecock?", a: "Badminton", wrong: ["Squash","Pickleball","Table tennis"], fact: "Badminton uses a shuttlecock, also called a birdie, which can travel at over 200 mph in professional play, making it the fastest projectile in any racquet sport!" },
    { q: "How long is a marathon?", a: "26.2 miles", wrong: ["24 miles","25 miles","28 miles"], fact: "The modern marathon distance was standardized at the 1908 London Olympics when the course was extended to finish in front of the Royal Box. The extra 0.2 miles came from the royal family's viewing preference!" },
    { q: "What is the maximum score in a single game of bowling?", a: "300", wrong: ["270","360","250"], fact: "A perfect bowling score is 300, achieved by rolling 12 consecutive strikes. The odds of a professional bowler rolling a perfect game are roughly 1 in 460!" },
  ],
  "Words & Language": [
    { q: "What is the most common letter in the English language?", a: "E", wrong: ["A","T","S"], fact: "The letter E is the most common letter in English, appearing in about 13% of all text! That is why Wheel of Fortune gives players E, R, S, T, L, and N for free in the final round." },
    { q: "Approximately how many words does the English language contain?", a: "Around 170,000", wrong: ["Around 50,000","Around 500,000","Around 1,000,000"], fact: "The Oxford English Dictionary contains about 170,000 words currently in use, with another 47,000 obsolete words. English adds roughly 1,000 new words every year!" },
    { q: "What is the shortest complete sentence in the English language?", a: "Go.", wrong: ["I am.","Be.","Hi."], fact: "The shortest grammatically complete sentence in English is 'Go.' It is a command where the subject 'you' is implied. English is remarkable for how much meaning two letters can carry!" },
    { q: "How many words does the average person know?", a: "Around 42,000", wrong: ["Around 5,000","Around 20,000","Around 100,000"], fact: "A 2016 study found that the average adult knows around 42,000 dictionary words by age 20, growing to about 48,000 by age 60. We passively recognize far more than we actively use." },
    { q: "Where does the term 'computer bug' come from?", a: "A moth was found stuck in a computer relay", wrong: ["Early computers used insect-shaped transistors","Programmers used 'bug' as slang","It came from a military code name"], fact: "In 1947, engineers found an actual moth stuck in a relay of the Harvard Mark II computer. They taped it into the logbook and wrote 'First actual case of a bug being found.' The term has stuck ever since!" },
    { q: "What is a word that reads the same forwards and backwards called?", a: "A palindrome", wrong: ["An anagram","A homophone","An alliteration"], fact: "Palindromes include words like 'racecar,' 'level,' and 'kayak,' as well as phrases like 'A man, a plan, a canal: Panama!' The word 'palindrome' itself comes from Greek meaning 'running back again.'" },
  ],
  "Cozy Living": [
    { q: "What Danish concept describes the feeling of coziness and contentment?", a: "Hygge", wrong: ["Lagom","Sisu","Fika"], fact: "Hygge (pronounced HOO-gah) is a Danish and Norwegian concept describing a mood of coziness and comfortable conviviality. Denmark consistently ranks among the happiest countries in the world!" },
    { q: "What does 'fika' mean in Swedish culture?", a: "A coffee and snack break with others", wrong: ["An afternoon nap","A long walk in nature","A weekly family dinner"], fact: "Fika is a cherished Swedish tradition: a deliberate pause in the day to enjoy coffee and a sweet treat with friends or colleagues. Cinnamon rolls are the classic fika companion!" },
    { q: "What sense is most closely linked to memory?", a: "Smell", wrong: ["Sight","Hearing","Touch"], fact: "Smell is the sense most directly connected to memory and emotion! The olfactory bulb is directly linked to the brain's memory and emotion centers. This is why a whiff of cinnamon or coffee can instantly transport you back in time." },
    { q: "How many times does the average person laugh per day?", a: "About 15", wrong: ["About 5","About 30","About 50"], fact: "Adults laugh an average of about 15 times per day but children laugh up to 400 times! Laughter releases endorphins, reduces stress hormones, and even provides a mild workout for your core muscles." },
    { q: "What is the Japanese practice of 'forest bathing'?", a: "Spending mindful time in nature among trees", wrong: ["A type of outdoor spa treatment","A meditation involving water","A traditional Japanese sport"], fact: "Shinrin-yoku, or forest bathing, is the Japanese practice of immersing yourself in a forest environment. Studies show it reduces cortisol, lowers blood pressure, and boosts the immune system!" },
    { q: "How long does it take to form a habit, according to research?", a: "It varies widely by person and habit", wrong: ["21 days","66 days","90 days"], fact: "The popular idea that habits form in 21 days comes from a misread of a 1960 self-help book! A 2010 study found it actually takes anywhere from 18 to 254 days, with an average of about 66 days." },
  ],
  "Fun Facts": [
    { q: "What percentage of Earth's water is drinkable fresh water?", a: "About 3%", wrong: ["About 25%","About 10%","About 1%"], fact: "Only about 3% of Earth's water is fresh water and most of that is locked in glaciers and ice caps! Less than 1% of all water on Earth is actually accessible for human use." },
    { q: "How far do bees travel to make one pound of honey?", a: "About 55,000 miles", wrong: ["About 500 miles","About 10,000 miles","About 100,000 miles"], fact: "To produce just one pound of honey, bees collectively fly about 55,000 miles and visit around 2 million flowers! A single bee produces only about 1/12 of a teaspoon of honey in its entire lifetime." },
    { q: "What is the only food that never expires?", a: "All of the above", wrong: ["Vinegar","Salt","Honey"], fact: "Honey, salt, and pure distilled white vinegar all have an indefinite shelf life when stored properly! Salt never expires because it is a mineral, and honey's natural properties keep it fresh for millennia." },
    { q: "How many kernels does an average ear of corn have?", a: "Around 800", wrong: ["Around 400","Around 1,200","Around 2,000"], fact: "The average ear of corn has about 800 kernels arranged in an even number of rows, most commonly 16! Corn is the most produced grain in the world." },
    { q: "What is a full moon's relationship to the sun?", a: "It reflects the sun's light from the opposite side of Earth", wrong: ["It produces its own glow","It absorbs and re-emits sunlight","It only shines when the sun sets below 30 degrees"], fact: "A full moon occurs when the moon is directly opposite the sun. It doesn't produce its own light; it reflects sunlight! A full moon always rises at sunset and always sets at sunrise." },
    { q: "How much of Earth's oxygen is produced by the ocean?", a: "About 50%", wrong: ["About 10%","About 30%","About 80%"], fact: "About 50% of Earth's oxygen comes from the ocean, produced by tiny marine plants called phytoplankton! The Amazon rainforest produces about 20%. So the ocean is literally the lungs of the planet." },
  ],
};

const CATEGORY_ICONS = {
  "Pancakes": "🥞",
  "Coffee": "☕",
  "Breakfast": "🍳",
  "Food & Drink": "🍯",
  "Science": "🔬",
  "Space": "🌌",
  "History": "🎩",
  "Geography": "🌍",
  "Animals": "🐾",
  "Music": "🎵",
  "Books": "📚",
  "Movies & TV": "🎬",
  "Sports": "🏆",
  "Words & Language": "📖",
  "Cozy Living": "🕯️",
  "Fun Facts": "✨",
};

const ALL_CATEGORIES = Object.keys(QUESTION_BANK);

const LEGENDS = [
  "Your legend will be told for generations to come.",
  "The Trivia Crew raises a cup to you across the centuries.",
  "Future cafe regulars will study your answers.",
  "The leather tome glows with your contribution.",
  "You have honored the Letter Griddle Cafe.",
  "The trivia crew smiles at you from across time.",
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

export default function DecoderPage() {
  const [view, setView] = useState('setup');       // setup | play | recap
  const [selectedCats, setSelectedCats] = useState([]);
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
  const [stars, setStars] = useState([]);
  const [stats, setStats] = useState({ totalPlayed: 0, totalCorrect: 0, currentStreak: 0, maxStreak: 0, lastPlayedDate: null });

  const timerRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
    try {
      const saved = localStorage.getItem('decoderStats');
      if (saved) setStats(JSON.parse(saved));
    } catch (e) {}
    setStars(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(2.5 + Math.random() * 3).toFixed(2)}s`,
    })));
  }, []);

  const saveStats = useCallback((s) => {
    setStats(s);
    try { localStorage.setItem('decoderStats', JSON.stringify(s)); } catch (e) {}
  }, []);

  // Timer
  useEffect(() => {
    if (view !== 'play' || answered) return;
    timerRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setResults(r => [...r, { correct: false, selected: null, timedOut: true }]);
          setAnswered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [view, answered, idx]);

  useEffect(() => {
    if (!answered || remaining > 0) return;
    const t = setTimeout(() => advanceOrFinish(), 1500);
    return () => clearTimeout(t);
  }, [answered, remaining]);

  const toggleCat = (cat) => {
    setSelectedCats(prev => {
      if (prev.includes(cat)) return prev.filter(c => c !== cat);
      if (prev.length >= 3) return prev;
      return [...prev, cat];
    });
  };

  const canStart = selectedCats.length >= 2;

  const startGame = () => {
    if (!canStart) return;
    const pool = [];
    selectedCats.forEach(cat => {
      const qs = QUESTION_BANK[cat].map(q => ({ ...q, cat }));
      pool.push(...qs);
    });
    const picked = shuffle(pool).slice(0, Math.min(qCount, pool.length));
    const qs = picked.map(q => ({ ...q, _opts: shuffle([q.a, ...q.wrong]) }));
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
    const correct = sel === questions[idx].a;
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
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = stats.lastPlayedDate === yesterday || stats.lastPlayedDate === today ? stats.currentStreak + 1 : 1;
      saveStats({ totalPlayed: stats.totalPlayed + 1, totalCorrect: stats.totalCorrect + results.filter(r => r.correct).length, currentStreak: newStreak, maxStreak: Math.max(stats.maxStreak, newStreak), lastPlayedDate: today });
      setLegend(LEGENDS[Math.floor(Math.random() * LEGENDS.length)]);
      setView('recap');
    }
  };

  const handleShare = async () => {
    const total = questions.length;
    const correct = results.filter(r => r.correct).length;
    const pct = Math.round((correct / total) * 100);
    const dots = results.map(r => r.timedOut ? '\u23f1\ufe0f' : r.correct ? '\ud83c\udf6f' : '\u2615').join('');
    const catLine = selectedCats.map(c => `${CATEGORY_ICONS[c]} ${c}`).join(', ');
    const text = [
      'Griddle Codex \ud83d\udcdc',
      `Decoded: ${catLine}`,
      dots,
      `${correct}/${total} entries preserved (${pct}%)`,
      '',
      'Play at lettergriddle.com/decoder',
      'More games at lettergriddle.com',
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (e) {}
  };

  const ratio = remaining / timerMax;
  const circ = 2 * Math.PI * 27;
  const dash = circ * Math.max(0, ratio);
  const timerStroke = ratio > 0.5 ? '#f5c842' : ratio > 0.25 ? '#ef9f27' : '#e24b4a';
  const currentYear = hasMounted ? new Date().getFullYear() : 2026;

  // ── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <>
      <Analytics />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        @keyframes twinkle { 0%,100%{opacity:0} 50%{opacity:0.65} }
        .cat-btn { transition: all 0.18s; }
        .cat-btn:hover { border-color: #f5c842 !important; }
      `}</style>

      {/* Starfield */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {stars.map(s => (
          <div key={s.id} style={{ position: 'absolute', width: '2px', height: '2px', background: '#e8d5a3', borderRadius: '50%', opacity: 0, left: s.left, top: s.top, animation: `twinkle ${s.duration} ${s.delay} infinite` }} />
        ))}
      </div>

      <div style={{ background: '#12102a', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 16px 40px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: '#f0e6c8', position: 'relative' }}>
        <div style={{ width: '100%', maxWidth: '520px', background: '#1c1838', border: '1px solid rgba(212,134,14,0.28)', borderRadius: '20px', overflow: 'hidden', position: 'relative', zIndex: 1, boxShadow: '0 0 60px rgba(120,80,200,0.12), 0 20px 60px rgba(0,0,0,0.5)', marginTop: '8px' }}>

          {/* Top strip */}
          <div style={{ height: '4px', background: 'linear-gradient(90deg, #7c5cbf, #f5c842, #7c5cbf)' }} />

          {/* Header nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 0' }}>
            <a href="https://lettergriddle.com" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9e8f72', textDecoration: 'none', fontSize: '13px' }}>
              <span style={{ fontSize: '18px' }}>🥞</span>
              <span>Letter Griddle Games</span>
            </a>
            <button onClick={() => setShowStats(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#9e8f72', fontSize: '13px' }}>
              <BarChart3 size={16} /><span>Stats</span>
            </button>
          </div>

          {/* ── SETUP SCREEN ── */}
          {view === 'setup' && (
            <div style={{ padding: '20px 24px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'inline-block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#c09ef5', background: 'rgba(124,92,191,0.15)', border: '1px solid rgba(200,180,255,0.15)', padding: '4px 14px', borderRadius: '20px', marginBottom: '12px' }}>
                  Year 2126 · Decoder Edition
                </div>
                <div style={{ fontFamily: "'Special Elite', serif", fontSize: '30px', color: '#f5c842', letterSpacing: '1px', marginBottom: '4px' }}>Griddle Codex</div>
                <div style={{ fontSize: '13px', color: '#9e8f72', lineHeight: '1.5', marginBottom: '8px' }}>Choose your knowledge domains to decode</div>
                <div style={{ fontSize: '24px', letterSpacing: '3px', opacity: 0.8 }}>📜 🔐 🌌</div>
              </div>

              <div style={{ background: 'rgba(124,92,191,0.08)', border: '1px solid rgba(200,180,255,0.15)', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px', fontSize: '13px', color: '#9e8f72', lineHeight: '1.6' }}>
                <strong style={{ color: '#c09ef5' }}>Decoder briefing:</strong> The Lore of Letter Griddle is organized by knowledge domain. Choose 2 or 3 domains to decode, then race to preserve as many entries as possible in the cafe's leather-bound tome before time runs out.
              </div>

              {/* Category selector */}
              <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#9e8f72', marginBottom: '10px' }}>
                Select 2 to 3 domains to decode
                {selectedCats.length > 0 && (
                  <span style={{ marginLeft: '10px', color: '#f5c842', letterSpacing: 0, textTransform: 'none', fontSize: '12px' }}>
                    {selectedCats.length}/3 selected
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                {ALL_CATEGORIES.map(cat => {
                  const active = selectedCats.includes(cat);
                  const disabled = !active && selectedCats.length >= 3;
                  return (
                    <button
                      key={cat}
                      className="cat-btn"
                      onClick={() => toggleCat(cat)}
                      disabled={disabled}
                      style={{
                        background: active ? 'rgba(212,134,14,0.18)' : '#261e4a',
                        border: `1px solid ${active ? '#f5c842' : 'rgba(212,134,14,0.28)'}`,
                        color: active ? '#f5c842' : disabled ? 'rgba(159,143,114,0.4)' : '#9e8f72',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        fontSize: '13px',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px',
                      }}
                    >
                      <span>{CATEGORY_ICONS[cat]} {cat}</span>
                      {active && <Check size={14} style={{ flexShrink: 0, color: '#f5c842' }} />}
                    </button>
                  );
                })}
              </div>

              {/* Q count + time */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9e8f72', marginBottom: '8px' }}>Questions</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[3, 5, 7, 10].map(n => (
                      <button key={n} onClick={() => setQCount(n)} style={{ background: qCount === n ? 'rgba(212,134,14,0.15)' : '#261e4a', border: `1px solid ${qCount === n ? '#f5c842' : 'rgba(212,134,14,0.28)'}`, color: qCount === n ? '#f5c842' : '#9e8f72', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>{n}</button>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9e8f72', marginBottom: '8px' }}>Time limit</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[{ s: 30, l: '30s' }, { s: 60, l: '1m' }, { s: 90, l: '90s' }, { s: 120, l: '2m' }].map(t => (
                      <button key={t.s} onClick={() => setTimeLimitSec(t.s)} style={{ background: timeLimitSec === t.s ? 'rgba(212,134,14,0.15)' : '#261e4a', border: `1px solid ${timeLimitSec === t.s ? '#f5c842' : 'rgba(212,134,14,0.28)'}`, color: timeLimitSec === t.s ? '#f5c842' : '#9e8f72', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>{t.l}</button>
                    ))}
                  </div>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid rgba(212,134,14,0.18)', margin: '6px 0 20px' }} />

              <button
                onClick={startGame}
                disabled={!canStart}
                style={{
                  width: '100%', padding: '15px',
                  background: canStart ? 'linear-gradient(135deg, #c4780a, #f5c842)' : 'rgba(212,134,14,0.15)',
                  color: canStart ? '#0e0c1e' : '#9e8f72',
                  border: canStart ? 'none' : '1px solid rgba(212,134,14,0.28)',
                  borderRadius: '11px',
                  fontFamily: "'Special Elite', serif",
                  fontSize: '17px', letterSpacing: '1px',
                  cursor: canStart ? 'pointer' : 'not-allowed',
                  boxShadow: canStart ? '0 4px 20px rgba(212,134,14,0.25)' : 'none',
                  marginBottom: '4px',
                }}
              >
                {canStart ? 'Begin Decoding \u2192' : 'Select 2 domains to begin'}
              </button>
            </div>
          )}

          {/* ── PLAY SCREEN ── */}
          {view === 'play' && questions.length > 0 && (
            <div style={{ padding: '20px 24px 0' }}>
              {/* Domain tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {selectedCats.map(cat => (
                  <span key={cat} style={{ background: 'rgba(124,92,191,0.18)', border: '1px solid rgba(200,180,255,0.15)', color: '#c09ef5', fontSize: '11px', padding: '2px 10px', borderRadius: '20px' }}>
                    {CATEGORY_ICONS[cat]} {cat}
                  </span>
                ))}
              </div>

              {/* HUD */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid rgba(212,134,14,0.18)' }}>
                <div style={{ textAlign: 'center', minWidth: '56px' }}>
                  <div style={{ fontFamily: "'Special Elite', serif", fontSize: '24px', color: '#f5c842', lineHeight: 1 }}>
                    {idx + 1}<span style={{ fontSize: '14px', color: '#9e8f72' }}>/{questions.length}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#9e8f72', marginTop: '3px' }}>Entry</div>
                </div>

                {/* SVG ring timer */}
                <div style={{ position: 'relative', width: '64px', height: '64px' }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
                    <circle cx="32" cy="32" r="27" fill="none" stroke={timerStroke} strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${dash.toFixed(2)} ${circ.toFixed(2)}`}
                      style={{ transition: 'stroke-dasharray 0.9s linear, stroke 0.3s' }} />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Special Elite', serif", fontSize: '20px', color: '#f5c842' }}>{remaining}</div>
                </div>

                <div style={{ textAlign: 'center', minWidth: '56px' }}>
                  <div style={{ fontFamily: "'Special Elite', serif", fontSize: '24px', color: '#f5c842', lineHeight: 1 }}>{results.filter(r => r.correct).length}</div>
                  <div style={{ fontSize: '11px', color: '#9e8f72', marginTop: '3px' }}>Preserved</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: '3px', background: '#261e4a', borderRadius: '2px', marginBottom: '22px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #7c5cbf, #f5c842)', borderRadius: '2px', width: `${(idx / questions.length) * 100}%`, transition: 'width 0.4s ease' }} />
              </div>

              {/* Question category + text */}
              <div style={{ fontSize: '11px', color: '#9e8f72', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Entry {idx + 1} of {questions.length}</div>
              <div style={{ display: 'inline-block', background: 'rgba(124,92,191,0.18)', border: '1px solid rgba(200,180,255,0.15)', color: '#c09ef5', fontSize: '11px', padding: '3px 12px', borderRadius: '20px', marginBottom: '12px' }}>
                {CATEGORY_ICONS[questions[idx].cat]} {questions[idx].cat}
              </div>
              <div style={{ fontSize: '18px', lineHeight: '1.55', color: '#f0e6c8', marginBottom: '22px', minHeight: '56px' }}>{questions[idx].q}</div>

              {/* Choices */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                {questions[idx]._opts.map((o, i) => {
                  let bg = '#261e4a', border = 'rgba(212,134,14,0.28)', color = '#f0e6c8', opacity = 1;
                  if (answered) {
                    if (o === questions[idx].a) { bg = 'rgba(76,175,125,0.15)'; border = 'rgba(76,175,125,0.5)'; color = '#8ef5bc'; }
                    else if (o === selected) { bg = 'rgba(224,82,82,0.12)'; border = 'rgba(224,82,82,0.4)'; color = '#f5aaaa'; }
                    else { opacity = 0.5; }
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(o)} disabled={answered} style={{ background: bg, border: `1px solid ${border}`, color, padding: '13px 12px', borderRadius: '10px', cursor: answered ? 'default' : 'pointer', fontSize: '14px', textAlign: 'left', lineHeight: '1.4', transition: 'all 0.18s', opacity }}>
                      {o}
                    </button>
                  );
                })}
              </div>

              {/* Fact box */}
              <div style={{
                borderRadius: '10px', padding: '13px 15px', fontSize: '13px', lineHeight: '1.55', marginBottom: '14px', minHeight: '48px',
                ...(answered
                  ? selected === questions[idx].a
                    ? { background: 'rgba(76,175,125,0.1)', border: '1px solid rgba(76,175,125,0.5)', color: '#a0f0c8' }
                    : { background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.4)', color: '#f0b0b0' }
                  : { background: '#261e4a', border: '1px solid rgba(212,134,14,0.18)', color: '#9e8f72' }),
              }}>
                {answered
                  ? `${selected === questions[idx].a ? '\u2713 ' : ''}${selected === questions[idx].a ? questions[idx].fact : 'The correct answer was: ' + questions[idx].a + '. ' + questions[idx].fact}`
                  : 'Choose your answer above...'}
              </div>

              {answered && (
                <button onClick={advanceOrFinish} style={{ width: '100%', padding: '12px', background: '#261e4a', border: '1px solid rgba(212,134,14,0.28)', color: '#f0e6c8', borderRadius: '9px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s', marginBottom: '4px' }}>
                  {idx + 1 < questions.length ? 'Record next entry \u2192' : 'Seal the tome \u2192'}
                </button>
              )}
            </div>
          )}

          {/* ── RECAP SCREEN ── */}
          {view === 'recap' && (
            <div style={{ padding: '20px 24px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', color: '#9e8f72', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Griddle Codex · Decoded</div>
                <div style={{ fontFamily: "'Special Elite', serif", fontSize: '52px', color: '#f5c842', lineHeight: 1 }}>
                  {results.filter(r => r.correct).length}/{questions.length}
                </div>
                <div style={{ fontSize: '14px', color: '#9e8f72', marginTop: '6px' }}>
                  {Math.round((results.filter(r => r.correct).length / questions.length) * 100)}% of trivia preserved for history
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
                  {selectedCats.map(cat => (
                    <span key={cat} style={{ background: 'rgba(124,92,191,0.18)', border: '1px solid rgba(200,180,255,0.15)', color: '#c09ef5', fontSize: '11px', padding: '2px 10px', borderRadius: '20px' }}>
                      {CATEGORY_ICONS[cat]} {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                {[
                  { n: results.filter(r => r.correct).length, l: 'Correct' },
                  { n: results.filter(r => !r.correct).length, l: 'Missed' },
                  { n: `${Math.round((results.filter(r => r.correct).length / questions.length) * 100)}%`, l: 'Accuracy' },
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, background: '#261e4a', border: '1px solid rgba(212,134,14,0.18)', borderRadius: '10px', padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Special Elite', serif", fontSize: '28px', color: '#f5c842' }}>{s.n}</div>
                    <div style={{ fontSize: '11px', color: '#9e8f72', marginTop: '3px' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(124,92,191,0.1)', border: '1px solid rgba(200,180,255,0.15)', borderRadius: '10px', padding: '13px 18px', fontSize: '14px', color: '#c09ef5', fontStyle: 'italic', textAlign: 'center', marginBottom: '18px', lineHeight: '1.5' }}>
                &ldquo;{legend}&rdquo;
              </div>

              {/* Travelogue */}
              <div style={{ background: '#12102a', border: '1px solid rgba(212,134,14,0.18)', borderRadius: '12px', overflow: 'hidden', marginBottom: '18px' }}>
                <div style={{ background: '#1c1838', borderBottom: '1px solid rgba(212,134,14,0.18)', padding: '11px 16px', fontFamily: "'Special Elite', serif", fontSize: '13px', color: '#d4860e' }}>
                  📜 Your Decoded Travelogue
                </div>
                <div style={{ padding: '12px 16px', maxHeight: '250px', overflowY: 'auto' }}>
                  {results.map((r, i) => {
                    const q = questions[i];
                    if (!q) return null;
                    const icon = r.timedOut ? '⏱' : r.correct ? '🍯' : '☕';
                    const dotBg = r.timedOut ? 'rgba(180,180,180,0.12)' : r.correct ? 'rgba(76,175,125,0.25)' : 'rgba(224,82,82,0.2)';
                    const dotColor = r.timedOut ? '#aaa' : r.correct ? '#8ef5bc' : '#f5aaaa';
                    const aText = r.timedOut ? `Time expired. Answer: ${q.a}` : r.selected;
                    return (
                      <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '9px 0', borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', marginTop: '1px', background: dotBg, color: dotColor }}>{icon}</div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#c09ef5', marginBottom: '2px' }}>{CATEGORY_ICONS[q.cat]} {q.cat}</div>
                          <div style={{ fontSize: '13px', color: '#9e8f72', lineHeight: '1.4' }}>{q.q}</div>
                          <div style={{ fontSize: '13px', color: '#f0e6c8', marginTop: '2px' }}>{aText}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => { setView('setup'); setSelectedCats([]); }} style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg, #c4780a, #f5c842)', color: '#0e0c1e', border: 'none', borderRadius: '9px', fontFamily: "'Special Elite', serif", fontSize: '15px', cursor: 'pointer' }}>
                  Decode again
                </button>
                <button onClick={handleShare} style={{ flex: 1, padding: '13px', background: '#261e4a', border: '1px solid rgba(212,134,14,0.28)', color: '#f0e6c8', borderRadius: '9px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Share2 size={16} />
                  {shareCopied ? 'Copied!' : 'Copy recap'}
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '20px 22px 24px', borderTop: view !== 'play' ? '1px solid rgba(212,134,14,0.18)' : 'none', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '8px' }}>
              {[{ href: 'https://lettergriddle.com', label: 'Letter Griddle Games' }, { href: 'https://lettergriddle.com/privacy', label: 'Privacy' }, { href: 'https://lettergriddle.com/terms', label: 'Terms' }].map(l => (
                <a key={l.href} href={l.href} style={{ fontSize: '12px', color: '#9e8f72', textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
            <div style={{ fontSize: '11px', color: '#9e8f72', opacity: 0.7 }}>
              &copy; {currentYear} Letter Griddle. All rights reserved.
            </div>
          </div>
        </div>

        {/* Stats Modal */}
        {showStats && (
          <div onClick={() => setShowStats(false)} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(18,16,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#1c1838', border: '1px solid rgba(212,134,14,0.28)', borderRadius: '16px', padding: '28px 24px', maxWidth: '320px', width: '100%', position: 'relative' }}>
              <button onClick={() => setShowStats(false)} style={{ position: 'absolute', top: '14px', right: '14px', background: 'none', border: 'none', cursor: 'pointer', color: '#9e8f72' }}><X size={22} /></button>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📜</div>
                <h2 style={{ fontFamily: "'Special Elite', serif", fontSize: '20px', color: '#f5c842' }}>Decoder Stats</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[{ n: stats.totalPlayed, l: 'Sessions' }, { n: stats.totalCorrect, l: 'Total correct' }, { n: stats.currentStreak, l: 'Streak' }, { n: stats.maxStreak, l: 'Best streak' }].map((s, i) => (
                  <div key={i} style={{ background: '#261e4a', border: '1px solid rgba(212,134,14,0.18)', borderRadius: '10px', padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Special Elite', serif", fontSize: '26px', color: '#f5c842' }}>{s.n}</div>
                    <div style={{ fontSize: '11px', color: '#9e8f72', marginTop: '3px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <p style={{ textAlign: 'center', fontSize: '11px', color: '#9e8f72', marginTop: '16px' }}>Stats saved locally on your device</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
