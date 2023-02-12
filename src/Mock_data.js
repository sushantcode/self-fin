export const mock_data = {
    expense: {
        year_month: '2022-08',
        item: [
            {
                category: 'Grocery',
                date: '2022-08-01',
                location: 'Walmart',
                amount: '75.00',
                payment_method: 'Discover',
                remarks: 'weekly grocery'
            },
            {
                category: 'Grocery',
                date: '2022-08-01',
                location: 'Walmart',
                amount: '75.00',
                payment_method: 'Discover',
                remarks: 'weekly grocery'
            },
            {
                category: 'Grocery',
                date: '2022-08-01',
                location: 'Walmart',
                amount: '75.00',
                payment_method: 'Discover',
                remarks: 'weekly grocery'
            },
            {
                category: 'Grocery',
                date: '2022-08-04',
                location: 'Walmart',
                amount: '15.00',
                payment_method: 'Discover',
                remarks: 'monthly grocery'
            },
            {
                category: 'Grocery',
                date: '2022-08-02',
                location: 'Walmart',
                amount: '95.00',
                payment_method: 'Discover',
                remarks: 'yearly grocery'
            }
        ]
    },
    investments: {
        year_month: '2022-08',
        item: [
            {
                broker: 'Webull',
                stock: 'AAPL',
                company: 'Apple',
                date: 'yyyy-mm-dd',
                amount: '12.30',
                units: 'units',
                vested: 'Yes/No',
                remarks: 'remarks'
            },
            {
                broker: 'Webull',
                stock: 'AAPL',
                company: 'Apple',
                date: 'yyyy-mm-dd',
                amount: '45.12',
                units: 'units',
                vested: 'Yes/No',
                remarks: 'remarks'
            }
        ]
    },
    toHome: {
        year_month: 'YYYY-MM',
        item: [
            {
                service: 'MoneyGram, WesternUnion, Remitly, Xoom, Others',
                receiver: 'receiver',
                date: 'yyyy-mm-dd',
                amount: '$485.03',
                nrs: 'units',
                payment_method: 'payment_method',
                remarks: 'remarks'
            }
        ]
    }
};

export const report = {
    expense: [mock_data.expense],
    investments: [mock_data.investments]
};

export const reportData = {
    Responses: {
        expense: [mock_data.expense],
        investments: [mock_data.investments],
        toHome: [mock_data.toHome]
    }
};
