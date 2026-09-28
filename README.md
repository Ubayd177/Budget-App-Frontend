# Budget-App-Frontend
The Frontend to BudgetFyn (Budgeting Web Application). Used simulated/testing data.

### 🖥️ Tech Stack (Frontend): 
**Frontend framework:** React<br>
**Graphs:** Google Charts API<br>
**API link:** Plaid Link<br>
**Other tools:** Axios

### Explanation:
React is used for the frontend, split into modular components (e.g., login and registration forms). React interacts with Plaid Link, which opens a secure modal using a 3-step handshake to connect with a bank and process credentials directly on Plaid's servers.

To display transaction data, Axios sends an authorized HTTP request to the backend to fetch the user's MongoDB transaction documents. The backend returns a JSON payload, and React renders the transaction data in a table. 

Additionally, after a custom function sorts the transaction data, the Google Charts API is used to visualize transactions grouped by their category types.

### Disclaimer
This is not meant to be used either, due to privacy etc there was removal for my backend environmental variables, keys and transactional information, therefore backend ...
... will NOT work. The frontend would be a static experience not worth running dependencies for.

Instead, read the code to determine how you would interact with the Plaid API and middleware with React
>>>>>>> origin/main
