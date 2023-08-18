const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  

describe('bookstore', function() {
  this.timeout(50000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('bookstore', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1366, height: 727 })

    //* ******** Login.js *********
    await driver.findElement(By.css(".log-in")).click()
    await driver.findElement(By.id("username")).sendKeys("username")
    await driver.findElement(By.id("password")).sendKeys("12345")
    await driver.findElement(By.css("input:nth-child(1)")).click()
    // await sleep(3000);
    await driver.findElement(By.css("button:nth-child(4)")).click()
    

    //***** */ App.js adding books to cart *******************
    await driver.findElement(By.css(".book-box:nth-child(1) > .addToCartBtn")).click()    
    await driver.findElement(By.css("button:nth-child(2)")).click()
    await driver.findElement(By.css(".book-box:nth-child(2) > .addToCartBtn")).click()
    await driver.findElement(By.css("button:nth-child(2)")).click()
    await driver.findElement(By.css(".book-box:nth-child(3) > .addToCartBtn")).click()
    await driver.findElement(By.css("button:nth-child(2)")).click()
    // await sleep(3000);
    await driver.findElement(By.css(".cartLogo")).click()    


    //******* */ Cart.js remove items *******************
    // await sleep(2000);
    const cartItems = await driver.findElement(By.css(".cartbox")).getText();    
    //  expected text
    const expectedCartItems = "Shopping Cart\nGenius Foods - $14.50Remove\nEat, Drink, and Be Healthy - $13.50Remove\nGordon Ramsay Healthy, Lean & Fit - $19.50Remove\nTotal Price: $47.50 Purchase";    
    assert.strictEqual(cartItems, expectedCartItems);

    await driver.findElement(By.css("li:nth-child(1) > .remove")).click()
    await driver.findElement(By.css("li:nth-child(1) > .remove")).click()
    const deleteCartItems = await driver.findElement(By.css(".cartbox")).getText();    
    //  expected text
    const expectedDeletedCartItems = "Shopping Cart\nGordon Ramsay Healthy, Lean & Fit - $19.50Remove\nTotal Price: $19.50 Purchase";    
    assert.strictEqual(deleteCartItems, expectedDeletedCartItems);
    // await sleep(2000);
    await driver.findElement(By.css(".Purchase")).click()

    //*********** */ PurchaseOrder.js  credit card form **********************
    
    await driver.findElement(By.css(".payButton")).click()    
    // Get the error messages from the .errorCard element
    const errorCard = await driver.findElement(By.css('.errorCard'));
    const errorMessages = await errorCard.getText();

    // Define expected error messages
    const expectedErrorMessages = [
        'Error\nSelect a card type',
        'Enter both first and last name',
        'Enter a valid 16-digit card number',
        'Enter a valid expiration date (example 12/23)',
        'Enter a valid 3-digits security code',
        'Enter a valid street address',
        'Enter a valid city',
        'Enter a valid two-letter state code',
        'Enter a valid 5-digit postal code',
        'Enter a valid 10-digit phone number',
        'Close'
    ];
    // Compare expected and actual error messages
    assert.strictEqual(errorMessages, expectedErrorMessages.join('\n'));  
    // await sleep(3000);    
    await driver.findElement(By.css(".errorButton")).click()
    await driver.findElement(By.name("creditCard")).click()    
    await driver.findElement(By.css(".cardName > input")).sendKeys("omar sanchez")
    await driver.findElement(By.css(".CardNumber > input")).sendKeys("1234 1234 1234 1234")
    await driver.findElement(By.css(".ExpirationDate > input")).sendKeys("1223")
    await driver.findElement(By.css(".SecurityCode > input")).sendKeys("123")
    await driver.findElement(By.css(".streetAdress > input")).sendKeys("123 altamira")
    await driver.findElement(By.css(".city > input")).sendKeys("los angeles")
    await driver.findElement(By.css(".state > input")).sendKeys("ca")
    await driver.findElement(By.css(".PostalCode > input")).sendKeys("12345")
    await driver.findElement(By.css(".PhoneNumber > input")).sendKeys("(123)-123-1234") 
    // await sleep(3000);   
    await driver.findElement(By.css(".payButton")).click()
    await sleep(5000);
    await driver.findElement(By.css(".cartLogo")).click()
    
     // Get the text content of the relevant elements on the Login page
    const cartEmptyText = await driver.findElement(By.css(".cartbox")).getText();    
    //  expected text
    const expectedCartEmptyText = "Shopping Cart\nYour cart is empty.\nTotal Price: $0.00 Purchase";    
    // Compare expected and actual text
    assert.strictEqual(cartEmptyText, expectedCartEmptyText);
    // await sleep(3000);
    
  })
})
