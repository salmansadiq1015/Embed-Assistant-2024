import cheerio from "cheerio";
import axios from "axios";
import puppeteer from "puppeteer";

export const scrapData = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(60000);
    await page.goto(url);

    // You can customize this to extract different data from the page
    const title = await page.title();
    // Get the HTML content of the page
    const htmlContent = await page.content();

    // Load HTML content into Cheerio
    const $ = cheerio.load(htmlContent);

    // Extract text data using Cheerio selectors
    const textData = $("body").text().replace(/\s+/g, " ").trim();
    // textData = textData.replace(/\s+/g, " ").trim();

    await browser.close();

    res.status(200).json({ success: true, title: title, data: textData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// With Cheerio
export const scrapDataCheerio = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    // Fetch HTML content using Axios
    const { data } = await axios.get(url);

    // Load HTML content into Cheerio
    const $ = cheerio.load(data);

    // Extract data using Cheerio selectors
    const title = $("title").text();
    const metaDescription = $('meta[name="description"]').attr("content");

    // Extract all HTML content from the page
    const htmlContent = $("html").html();

    // You can extract more data here using Cheerio selectors

    res.status(200).json({
      success: true,
      title: title,
      metaData: metaDescription,
      data: htmlContent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
