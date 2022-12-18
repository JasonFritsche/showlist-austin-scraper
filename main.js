const puppeteer = require("puppeteer");

async function scrape() {
  const browser = await puppeteer.launch({ dumpio: true });
  const page = await browser.newPage();

  await page.goto("https://austin.showlists.net/");
  const allShowData = await page.evaluate(() => {
    const showElements = document.querySelectorAll("div.showlist div");
    const showsElementsArr = Array.from(showElements);
    const showDatesArr = showsElementsArr.filter(
      (el) => el.querySelector(".text-brand")?.innerHTML
    );

    const parseShows = (element) => {
      const liElements = [...element.childNodes];

      const liData = liElements
        .filter((node) => node.nodeType === Node.ELEMENT_NODE)
        .map((el, idx) => {
          const childNodeArr = Array.from(el.childNodes);
          const showTitleEl = childNodeArr.find((childNode) =>
            childNode?.className?.includes("show-title")
          );
          return {
            description: showTitleEl?.innerText,
            showHref: showTitleEl?.href,
            childNodeArr: childNodeArr,
          };
        });
      return liData;
    };

    const _allShowData = showDatesArr.map((el) => {
      return {
        data: el.childNodes,
        shows: parseShows(el.querySelector("div.show-date > ul")),
      };
    });
    return _allShowData;
  });

  //console.log(allShowData);
  page.on("console", (msg) => console[msg._type]("PAGE LOG:", msg._text));

  await browser.close();
}
scrape();
