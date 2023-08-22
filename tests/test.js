
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


describe('test', function() {
  this.timeout(50000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })


  it('test', async function() {
    await driver.get("https://brainbites.netlify.app/")
    await driver.manage().window().setRect({ width: 1366, height: 727 })

    /*Login.js*/
    await driver.findElement(By.css(".log-in")).click()    
    await driver.findElement(By.id("username")).sendKeys("username")    
    await driver.findElement(By.id("password")).sendKeys("123456")
    await driver.findElement(By.css("input:nth-child(1)")).click()    
    await driver.findElement(By.css("button:nth-child(4)")).click()

    /* emty Cart.js Alert*/
    await driver.findElement(By.css(".cartLogo")).click()
    await driver.findElement(By.css(".PurchaseBtn")).click()
    // Assert text alert
    let alert = await driver.switchTo().alert();   
    let popupText = await alert.getText();     
    assert.equal(popupText, 'Please add items to the cart.');     
    await alert.accept();
    console.log('****Text from Cart Alert****:', popupText);

  /* book store*/
    await driver.findElement(By.css(".bookStore")).click()    
    await driver.findElement(By.css(".book-box:nth-child(1) > .addToCartBtn")).click()
    await driver.findElement(By.css("button:nth-child(2)")).click()
    await driver.findElement(By.css(".book-box:nth-child(2) > .addToCartBtn")).click()   
    await driver.findElement(By.css("button:nth-child(2)")).click()
    await driver.findElement(By.css(".book-box:nth-child(4) > .addToCartBtn")).click()    
    await driver.findElement(By.css("button:nth-child(2)")).click()
    await driver.findElement(By.css(".book-box:nth-child(5) > .addToCartBtn")).click()    
    await driver.findElement(By.css("button:nth-child(2)")).click()
    await driver.findElement(By.css(".book-box:nth-child(6) > .addToCartBtn")).click()    
    await driver.findElement(By.css("button:nth-child(2)")).click()   
    await driver.findElement(By.css(".sear-bar")).sendKeys("gordon")
    await driver.findElement(By.css(".addToCartBtn")).click()
    await driver.findElement(By.css("button:nth-child(2)")).click()    
    await driver.findElement(By.css(".cartLogo")).click()

    
    /* Cart.js*/
    // Assert Cart Text
    let cartBoxElement = await driver.findElement(By.className('cartbox'));
    let cartBoxText = await cartBoxElement.getText();    
    assert.equal(cartBoxText, 'Shopping Cart\n' +
    'Genius Foods - $14.50Remove\n' +
    'Eat, Drink, and Be Healthy - $25.50Remove\n' +
    'The Shredded Chefis - $11.50Remove\n' +
    'the body building cookbook - $20.50Remove\n' +
    'Feed Zone Portables - $40.50Remove\n' +
    'Gordon Ramsay Healthy, Lean & Fit - $30.50Remove\n' +
    'Total Price: $143.00 Purchase');
    console.log('****Text from cart box:****', cartBoxText);

    await driver.findElement(By.css("li:nth-child(1) > .remove")).click()
    await driver.findElement(By.css("li:nth-child(1) > .remove")).click()
    await driver.findElement(By.css("li:nth-child(1) > .remove")).click()
    await driver.findElement(By.css("li:nth-child(1) > .remove")).click()
    await driver.findElement(By.css("li:nth-child(1) > .remove")).click()
    await driver.findElement(By.css(".PurchaseBtn")).click()

    /* PurchaseOrder*/
    await driver.findElement(By.css("span:nth-child(1)")).click()          
    /*assert error text*/
    let errorElement = await driver.findElement(By.css('#root > div > div.purchasecontainer > div > div.errorCardContainer > div > ul'));
    let errorText = await errorElement.getText();    
    assert.equal(errorText, 'Select a card type\n' +
    'Enter both first and last name\n' +
    'Enter a valid 16-digit card number\n' +
    'Enter a valid expiration date (example 12/23)\n' +
    'Enter a valid 3-digits security code\n' +
    'Enter a valid street address\n' +
    'Enter a valid city\n' +
    'Enter a valid two-letter state code\n' +
    'Enter a valid 5-digit postal code\n' +
    'Enter a valid 10-digit phone number' );
    console.log('****Text from error Message****:', errorText);

    await driver.findElement(By.css(".errorButton")).click()
    await driver.findElement(By.name("creditCard")).click()
    await driver.findElement(By.css("label:nth-child(4) > input")).click()
    await driver.findElement(By.css("label:nth-child(5) > input")).click()    
    await driver.findElement(By.css(".cardName > input")).sendKeys("John Smith")    
    await driver.findElement(By.css(".CardNumber > input")).sendKeys("1234 1234 1234 1234")    
    await driver.findElement(By.css(".ExpirationDate > input")).sendKeys("1223")   
    await driver.findElement(By.css(".SecurityCode > input")).sendKeys("123")    
    await driver.findElement(By.css(".streetAdress > input")).sendKeys("123 street name")    
    await driver.findElement(By.css(".city > input")).sendKeys("Slat Lake City")    
    await driver.findElement(By.css(".state > input")).sendKeys("UT")    
    await driver.findElement(By.css(".PostalCode > input")).sendKeys("35226")    
    await driver.findElement(By.css(".PhoneNumber > input")).sendKeys("(800)-123-4321")   
    await driver.findElement(By.css("span:nth-child(1)")).click()
    await sleep(5000);

    /* confirm Cart-empty*/    
    await driver.findElement(By.css(".cartLogo")).click()
    await driver.findElement(By.css("p:nth-child(3)")).click()
    let cartEmtyElement = await driver.findElement(By.className('cartbox'));
    let cartEmptyText = await cartEmtyElement.getText("#root > div > div.cartbox > p:nth-child(2)");    
    assert.equal(cartEmptyText,'Shopping Cart\n'+'Your cart is empty.\n' +  'Total Price: $0.00 Purchase');
    console.log('****Text from cart box****:', cartEmptyText);
  })
})
