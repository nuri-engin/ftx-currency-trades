This is a `JSON format::Collection v2.1` based Postman collection resource.

You may use the file sample to generate an ready-to-use Postman requests.

Available routes/requests;
- [GET] {{LOCAL}}/api/v1/: Get the base route/path request
- [POST] {{LOCAL}}/api/v1/trade: Here we apply the trade process
    > Expected payload: action, base_currency, quote_currency, amount

Available global-variables (Ensure to save to Postman)
- {{LOCAL}}: http://127.0.0.1:4000 
- {{MAIN}}: It will come next...