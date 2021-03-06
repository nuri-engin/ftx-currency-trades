# ftx-currency-trades
A web service that provides quotes for digital currency trades using data from the​ ​ [FTX​ orderbook](https://docs.ftx.com/#get-orderbook).

## # Getting started
- Ensure to install Node and NPM to your computer.
- Clone the repo and go to the `ftx-currency-trades` folder.
- Run `npm install` within your CLI tool. 
- After that, run the `npm start` and ensure to see "Server is running on PORT 4000" message on your console.
- Now you can open Postman and request to the available routes.

## # Application routes and Postman collections
Application routes and built-in API request samples exist with Postman Collection folder.

Go to: [/postman-collections/README.md](postman-collections/)

---

## # Time consume
1. Planing: Undersanding and planing took almost 1.5 hour
2. MVP-scaffolding: 2 hours
3. Apply API Logic to recive request: 2 hours
4. Planing API Logic to response: 45 minutes
5. Apply API Logic to response: 2.5 hours
6. Code quality improvments: 30 minutes
> Total: 9 hours 15 minutes.

## # [OKr (Objective Key-Result)](https://www.whatmatters.com/faqs/okr-meaning-definition-example/) Planning
1. ✅ - Understand the CASE steps 
2. ✅ - Understand the FTX orderbook
3. ✅ - Understand the desired API context: Request and Response
> End of `TimeConsume.1`
4. ✅ - An empty application scaffolding
    - Starting with MVP approach
    - Github; README, gitignore
    - A basic router with dummy-data
    - Accepts JSON body w/ dummy
    - Response JSON body w/ dummy
> End of `TimeConsume.2`
5. ✅ - Match consumer input with request to the FTX's `orderbook` API.
> End of `TimeConsume.3`
6. ✅ - Match consumer input with response /Response
> End of `TimeConsume.4 & TimeConsume.5`
7. ✅ - Code cleaning and moving into better source-code w/ boilerplate
> End of `TimeConsume.6`

## # API logic
1. Determine between 'bids/asks': Consumer's "BUY" request goes to `orderbook.asks` and "SELL" request goes into the `orderbook.bids`.
2. Grab the consumer's 'amount': We will need to use 'amount' value provided by the consumer in both case for 'bids/asks'.
3. Compare to `orderbook`: Find the most closest 'amount' value from `orderbook` regarding 'bids/asks' differentiation. 
4. Left-out amount: So we have compared the values and now store the extra value between two amount of orderbook and consumer.  
5. Aggreation process (Modify the amount): In case the closest orderbook's 'amount value is not same to consumer's 'amount' value (which mostly will not be!), then we will need to aggreate orderbook to the consumer's amount;
    - Find the one unit price for orderbook amount on the closest "bids/asks". (amount / price) 
    - Multiply one unit amount price to the left-out amount value (left-out amount * one-unit amount price)
6. Response back to the consumer with the final quote which is a weighted average of newly price.

## # Possible improvments for the project
- Implementing a Swagger (OpenAPI) API documentation for the consumers.
    - Also a JSdoc for the developers.
- Applying more securty fixes (Helmet, RateLimiter, XSS injection, Snyk scanning etc.)
- Deploying the application to the Heroku cloud services.
- Providing a CI/CD process either with Heroku CI or Travis CI.
    - Enviroment seperations for the Main / Development products.
- Test cases: Providing the NodeJS test pyramid (Unit, Integration, E2E)
- More code quality approches: Lint, Prettier, husky, lint-staged, code-editor standards 
- Service health monitors: App Telemetry and App Service status page.
- Validation control: Using Joi and similar project to check consumer inputs. 
- A fully-functional boiler-plate adaptation.
