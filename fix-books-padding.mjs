import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `<section id="books" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden"`,
  `<section id="books" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden px-6 py-10"`
);

content = content.replace(
  `          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Letter-Griddle`,
  `          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Letter-Griddle`
);

content = content.replace(
  `          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/dp/B0GM1TNH5B"`,
  `          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/dp/B0GM1TNH5B"`
);

writeFileSync('app/page.js', content);
console.log('Done!');
