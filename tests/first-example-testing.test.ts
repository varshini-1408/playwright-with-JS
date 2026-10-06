import {test,expect} from '@playwright/test';
import { Network } from 'node:inspector';

const url= "https://sauce-demo.myshopify.com/";
const validusername= "1408varsha@gmail.com";
const validpassword="Xerox@12345";


test.beforeEach("navigate to webage", async ({page})=>
{

   await page.goto(url);

});

test("SignIn functionality", async({page})=>
{
   const signIn= page.getByText("Sign Up");
   await signIn.click();
   const textmessage= page.locator(".accounts-title");
   await expect(textmessage).toHaveText("Create Account");
   const firstName= page.locator("#first_name").nth(1);
   await firstName.fill("Balaji");
   const lastName= page.locator("#last_name").nth(1);
   await lastName.fill(" B");
   const emailID= page.locator("#email").nth(1);
   await emailID.fill(validusername);
   const password=  page.locator("#password").nth(1);
   await password.fill(validpassword);
   const clickOperation= page.getByRole('button', {'name':"Create"});
   await clickOperation.click();
});

test("login functionality", async({page})=>
{

   const loginPage = page.getByText("log in") ;
   await loginPage.click();
   const loginID=  page.locator("#customer_email");
   await loginID.fill(validusername);
   const loginPwd=  page.locator("#customer_password");
   await loginPwd.fill(validpassword);
   const loginClick=  page.getByRole('button', {'name':"Sign In"});
   await loginClick.click();
  //const textContent= "Account Details and Order History";
  //await expect(page.locator("h1 .accounts-title")).toHaveText(textContent);
   await expect(await page.getByRole('link', {name: 'My Account'})).toBeTruthy;
});

test( "to check the cart is empty",{tag:'@cart'},async({page})=>
{
  const searchLink= page.getByRole('link', {name: 'Catalog'});
  await searchLink.click();
  const naviagteURL="https://sauce-demo.myshopify.com/collections/all";
  expect(page).toHaveURL(naviagteURL);
  const cartName= page.getByRole('link', {name: 'My Cart '});
  await cartName.click();
  const cartCount= await page.locator('span.count').first().textContent();
  const value= parseInt(cartCount.slice(1,2));
  console.log(value);
  await expect(value).toBe(0);
  const cursemove=page.locator("div#drawer")
  const textmessage = await cursemove.locator("p.empty").innerText();
  console.log(textmessage);
  await expect(textmessage).toContain("Your cart is empty.");

});

test("To add a product into cart" , {tag:"@checkout"}, async({page})=>{
   const cartCount= await page.locator('span.count').first().textContent();
   const value= parseInt(cartCount.slice(1,2));
   await page.getByRole('link', {name: 'Catalog'}).click();
   const product_1=page.getByText("Black heels").filter({hasText: "Black heels" });
   await product_1.click();
   await expect(page).toHaveTitle("Black heels – Sauce Demo");
   const size_of_heel= page.locator("select#product-select-option-0");
   await size_of_heel.selectOption("M");
   const color_of_heel= page.locator("select#product-select-option-1");
   await color_of_heel.selectOption("Red");
   const productCart=page.getByRole('button', {name:'Add to Cart'});
   const newCartValue= page.locator("#cart-target-desktop");
   await productCart.click();
   await expect(newCartValue).toContainText("(1)")
   const newCartValue1=await newCartValue.textContent();
   const newCartValuenumber= parseInt(newCartValue1.slice(1,2));
   console.log("newvalue", newCartValuenumber);
   const afterCart= value+1;
   await expect(newCartValuenumber).toBe(afterCart);
   console.log("aftercart", afterCart);
   console.log("beforecart",value);
   const cartname=  page.getByRole("link", {name: 'My Cart '});
   await cartname.click();
   await page.waitForLoadState('networkidle');
   await page.reload();
   await cartname.click();
   const aftercartimg= await page.locator("#drawer").screenshot({path:"expectedimage.png"});
   await cartname.click();
   await cartname.click();
   const recheckcartimg=await page.locator("#drawer").screenshot({path:"assertimg.png"});
  // await expect(aftercartimg).toMatchSnapshot('recheckcartimg');
   
              
   const checkout=page.getByRole("button", {name: "Check Out"});
   await checkout.click();
   const navigationURL= page.getByRole("link", {name:"Cart"});
   await expect(navigationURL).toBeTruthy();            
   await page.getByPlaceholder("Add a note to your order...").fill("this is my first order");
   //const quantity= await page.getByRole("textbox", {name: "updates[]"}).textContent();
   const finalcheckout= page.getByRole("button", {name: "Check Out"});
   await finalcheckout.click();
   const demoname= page.getByText("Sauce Demo");
   await expect(demoname).toBeVisible();
   //const checkquantity= await page.locator("span._1m6j2n315 _1fragem121").textContent();
   //await expect(quantity).toBe(checkquantity);
   const confirmationemail = await page.getByPlaceholder("Email").fill(validusername);
   await expect(page.locator("#marketing_opt_in")).toBeChecked();
   /*await page.locator("#SelectPS33_32_2t_19_34_2p_2v_2t-22").selectOption("Philippines");
   await page.locator("#TextFieldPS33_32_2t_19_34_2p_2v_2t-23").fill("balaji");
   await page.locator("#TextFieldPS33_32_2t_19_34_2p_2v_2t-24").fill("b");
   await page.getByPlaceholder("Address").fill("430,ponneri");
   await page.getByPlaceholder("City").fill("poneri");
   await page.getByPlaceholder("Postal code").fill("123456");
   await page.locator("#SelectPS33_32_2t_19_34_2p_2v_2t-30").selectOption("AP");
   await page.locator("#save_shipping_information").check();
   const paymentdetails=page.getByTestId("basic-creditCards-collapsible");
   await paymentdetails.getByPlaceholder("Card number").fill("345690895678");
   await paymentdetails.getByPlaceholder("Expiration date (MM / YY)").fill("05/89");
   await paymentdetails.getByPlaceholder("Security code").fill("345");
   await paymentdetails.getByRole("textbox", {name: "name"}).fill("abngh");
   await expect(paymentdetails.locator("#billingAddressCheckbox")).toBeChecked();
   await paymentdetails.getByRole("button", {name: "Pay now"}).click();
   const alertmessage = page.getByRole("alert");
   console.log(await alertmessage.textContent());*/






  




   });

