// import Express
const express = require('express')

// import morgan
const morgan = require('morgan');

// Create an Express app
const app = express()

// Use Morgan middleware with the 'dev' option for concise output
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send(`<h1>Hello!</h1>`);
});


/* 1. Be Polite, Greet the User
Task: Create a route that responds to URLs like /greetings/<username-parameter>.

Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

Response: Include the username from the URL in the response, such as "Hello there, Christy!" or "What a delight it is to see you once more, Mathilda."*/


// http://localhost:3000/greetings/Christy

app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;

    res.send(`<h1>Hello there, ${name}!</h1>`);
});



/* 2. Rolling the Dice
Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

Examples: Matches routes like /roll/6 or /roll/20.

Validation: If the parameter is not a number, respond with "You must specify a number." For instance, /roll/potato should trigger this response.

Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with "You rolled a 14." */


// http://localhost:3000/roll/5

app.get('/roll/:number', (req, res) => {
  const number = req.params.number;

  if (Number(number)){
  res.send(`<h1>The ${number} is a number </h1>`);
  }else{
    res.send(`<h1>The ${number} is not a number </h1>`);
  }
});




/* 3. I Want THAT One!
Task: Create a route for URLs like /collectibles/<index-parameter>.

Examples: Matches routes such as /collectibles/2 or /collectibles/0.

Data Array:

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
Validation: If the index does not correspond to an item in the array, respond with "This item is not yet in stock. Check back soon!"

Response: Should describe the item at the given index, like "So, you want the shiny ball? For 5.95, it can be yours!" Include both the name and price properties.

Using Query Parameters
In this section, you practice using query parameters to pass information from the URL to the server in an Express application.

Query parameters are added to the end of a URL after a ? and are formatted as key=value pairs. Multiple query parameters can be added to a URL by separating them with &. For example, the following URL has two query parameters, name and age:

localhost:3000/hello?name=Christy&age=32

Query parameters are available in the server's req.query object. We can access the values of the name and age query parameters like so:

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
}); */

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];


//http://localhost:3000/hello/2

app.get('/hello/:index', (req, res) => {
  const index = req.params.index
  const colle = collectibles[index];
  
  if (index <= collectibles.length -1){
    res.send(`Hello there, the item ia a <b>${colle.name}</b>! and the item price is <b>${colle.price}</b>.`);
  }else{
    res.send(`This item is not yet in stock. Check back soon!`);
  }

});

/* 4. Filter Shoes by Query Parameters
Use the following array of shoes in this challenge:

  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];
Task: Create a route /shoes that filters the list of shoes based on query parameters.

Query Parameters:

min-price: Excludes shoes below this price.
max-price: Excludes shoes above this price.
type: Shows only shoes of the specified type.
No parameters: Responds with the full list of shoes. */

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// http://localhost:3000/shoes?type=boot

app.get('/shoes', (req, res) => {

  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const type = req.query.type;

  let filterShoe = shoes;
  let shoeList = '';

  if (Number(minPrice)) {
    filterShoe = filterShoe.filter((shoe) => {
    return shoe.price >= minPrice 
  });
  }

  if (Number(maxPrice)) {
    filterShoe = filterShoe.filter((shoe) => { 
      return shoe.price <= maxPrice
    });
  }

  if (type) {
    filterShoe = filterShoe.filter((shoe) => {
      return shoe.type === type
    });
  }

  filterShoe.forEach(shoe => {
    shoeList += `<ul><li><b>name:</b> ${shoe.name}</li> 
                    <li><b>price:</b> ${shoe.price}</li> 
                    <li><b>type:</b> ${shoe.type}</li></ul>`;
  });

  res.send(shoeList);
});


// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
})