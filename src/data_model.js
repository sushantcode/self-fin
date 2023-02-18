export const SCHEMA = {
    expense: {
        year_month: 'YYYY-MM',
        item: {
            category: '[Grocery, Rent, Utility, Personal, Others]',
            date: 'yyyy-mm-dd',
            location: 'location',
            amount: 'amount',
            payment_method: 'payment_method',
            remarks: 'remarks',
        },
    },
    income: {
        year_month: 'YYYY-MM',
        item: {
            source: '[Salary, Saving, Stock, Individual, Others]',
            date: 'yyyy-mm-dd',
            amount: 'amount',
            payment_method: 'payment_method',
            remarks: 'remarks',
        },
    },
    loanToFriends: {
        year_month: 'YYYY-MM',
        item: {
            person: 'Person Name',
            date: 'yyyy-mm-dd',
            amount: 'amount',
            payment_method: 'payment_method',
            remarks: 'remarks',
        },
    },
    savings: {
        year_month: 'YYYY-MM',
        item: {
            where: 'Bank/individual',
            date: 'yyyy-mm-dd',
            amount: 'amount',
            currency: 'Rs or USD',
            interest: 'interest',
            remarks: 'remarks',
        },
    },
    investments: {
        year_month: 'YYYY-MM',
        item: {
            broker: 'Webull, Robinhood, Fidelity, Others',
            stock: 'AAPL',
            company: 'Apple',
            date: 'yyyy-mm-dd',
            amount: 'amount',
            units: 'units',
            vested: 'Yes/No',
            remarks: 'remarks',
        },
    },
    toHome: {
        year_month: 'YYYY-MM',
        item: {
            service: 'MoneyGram, WesternUnion, Remitly, Xoom, Others',
            receiver: 'receiver',
            date: 'yyyy-mm-dd',
            usd: 'amount',
            nrs: 'units',
            payment_method: 'payment_method',
            remarks: 'remarks',
        },
    },
};
