# Self-fin

A responsive web app to track and manage daily financial activities like expenses, income and investments in a highly secured manner.

## Features

- Sign in using unidirectional bCrypted password which eliminates chances of backtracing original password.
- All data stored in AWS DynamoDb.
- All data are locally encrypted before sendng to cloud (DDB) using combination of keys and salts to reduce the possiblity of exposing data from cloud if by chance hacked by hacker.
- User can create following financial activities records: Expense, Income, Investments, Loans, etc.
- User can view all past data per category in an interactive manner using either table or graph to visualize their activities.
- Use of graphical representation gives user insight on how they are handling their daily financial activities.
- User can also generate single report for their choices of categories for certain period of time and evalutes the trend in their financial activities like how much they spent and how much was the income at that period of time.
- User can use the python script to parse credit/debit cards statement and batch upload the data to the cloud after encryption. This will save time to upload indivial expense one by one.

## Author
* **Gupta, Sushant** - *Main Contributor* - [Profile](https://github.com/sushantcode)

## Tech Stacks
- ReactJS (Main web-app Library/Framework)
- Python (Statement Parser)
- AWS (Database)
- Firebase (For deployment)
- Github Action (For CI/CD)
- Eslint and Prettier (Formatting)

## Want to have it for yourself?
* Contact **Gupta, Sushant** - [Portfolio]([https://github.com/sushantcode](https://sushantcode.com/))


