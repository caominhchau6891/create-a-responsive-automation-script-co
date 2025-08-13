// ep2i_create_a_respon.ts

// Import dependencies
import { Browser, chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';

// Define automation script controller class
class ResponAutomationController {
  private browser: Browser;
  private context: any;
  private page: any;

  constructor() {
    this.initBrowser();
  }

  // Initialize browser instance
  private async initBrowser() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  // Define a method to perform automation tasks
  public async performTask(task: string, data: any) {
    switch (task) {
      case 'login':
        await this.login(data.username, data.password);
        break;
      case 'fillForm':
        await this.fillForm(data.formData);
        break;
      case 'clickButton':
        await this.clickButton(data.buttonSelector);
        break;
      default:
        console.log(`Task ${task} not supported`);
    }
  }

  // Example method to login
  private async login(username: string, password: string) {
    await this.page.goto('https://example.com/login');
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await Promise.all([
      this.page.click('input[type="submit"]'),
      this.page.waitForNavigation(),
    ]);
  }

  // Example method to fill a form
  private async fillForm(formData: any) {
    await this.page.goto('https://example.com/form');
    Object.keys(formData).forEach((key) => {
      this.page.fill(`input[name="${key}"]`, formData[key]);
    });
    await this.page.click('input[type="submit"]');
  }

  // Example method to click a button
  private async clickButton(buttonSelector: string) {
    await this.page.goto('https://example.com/button');
    await this.page.click(buttonSelector);
  }

  // Close browser instance
  public async closeBrowser() {
    await this.browser.close();
  }
}

// Create an instance of the automation script controller
const responController = new ResponAutomationController();

// Load automation script configuration from a JSON file
const config = JSON.parse(readFileSync('config.json', 'utf8'));

// Perform automation tasks
async function runAutomation() {
  try {
    await responController.performTask(config.task, config.data);
  } catch (error) {
    console.error(error);
  } finally {
    await responController.closeBrowser();
  }
}

// Run the automation script
runAutomation();