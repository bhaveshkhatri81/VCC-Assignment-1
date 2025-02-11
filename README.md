Use curl or Postman to test:

Query the weather:
curl -X POST -H "Content-Type: application/json" -d '{"query": "What’s the weather in Paris?"}' http://10.22.0.142:3000/process


Ask for a fun fact:
curl -X POST -H "Content-Type: application/json" -d '{"query": "Tell me a fun fact"}' http://10.22.0.142:3000/process



The assistant will route the queries to the appropriate service and return a response.

Test various queries:
News:
curl -X POST -H "Content-Type: application/json" -d '{"query": "Show me the news"}' http://10.22.0.142:3000/process

Joke:
curl -X POST -H "Content-Type: application/json" -d '{"query": "Tell me a joke"}' http://10.22.0.142:3000/process

Currency Conversion:
curl -X POST -H "Content-Type: application/json" -d '{"query": "Convert currency from USD to EUR"}' http://10.22.0.142:3000/process

Check the SQLite logs:
sqlite3 query_logs.db "SELECT * FROM logs"


