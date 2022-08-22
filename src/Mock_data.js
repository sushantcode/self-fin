export const mock_data = {
  expense: {
    year_month: "2022-08",
    item: [
      {
        category: "Grocery",
        date: "2022-08-01",
        location: "Walmart",
        amount: "75.00",
        payment_method: "Discover",
        remarks: "weekly grocery"
      },
      {
        category: "Grocery",
        date: "2022-08-04",
        location: "Walmart",
        amount: "15.00",
        payment_method: "Discover",
        remarks: "monthly grocery"
      },
      {
        category: "Grocery",
        date: "2022-08-02",
        location: "Walmart",
        amount: "95.00",
        payment_method: "Discover",
        remarks: "yearly grocery"
      }
    ]
  },
  investments: {
    year_month: "2022-08",
    item: [
      {
        broker: "Webull",
        stock: "AAPL",
        company: "Apple",
        date: "yyyy-mm-dd",
        amount: "amount",
        units: "units",
        vested: "Yes/No",
        remarks: "remarks"
      }
    ]
  },
  toHome: {
    year_month: "YYYY-MM",
    item: [
      {
        service: "MoneyGram, WesternUnion, Remitly, Xoom, Others",
        receiver: "receiver",
        date: "yyyy-mm-dd",
        usd: "amount",
        nrs: "units",
        payment_method: "payment_method",
        remarks: "remarks"
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
    expense: [
      {
        year_month: "2022-08",
        item:
          "VTJGc2RHVmtYMStab1hHUncvRmVMV2NjQ0pJNmlKYXRjY2ZxMFczbExYVDVLZGJEZVAzamZjYVFEZmNxNVNsUUQ2T1RWVjZMMEVHSktFMGdZaUtjK0xKSGI0UjkvUTJ0aDF0aW1haUpjOWFLTm1Ydzl5VFFMaU9wZWRqVVdwRjYzTWZmb0VOMTlHaFkweGN4eURPdG55dVluMlBrM0d3eVhVTHVrNytia2sxd1FtYU52UlRGaEFRejZxblRDTTVLS1A0TVJYdi9pWlM1YW9rWFZyUXZpUnB6UDlFcmJoOC9qU2ZPQkZIbDV6eG5lUGtnT1Z4YVF5TGlWWlkyLzVkK0NjQUtIVlZ6VERhMGx5eTQ0cHRVeXd1a0dCangweEZrcnlyRk5kc2s1dEoyczVEQ0lQMnpGWUtkUS9zam0wVkxwUHRZdFk2ZW5Kc1VVZzlQK294b0pSb0xRRlBMT3dhaE5GVWMwQmZDWStQaVRteGR6VURXMEdWTHd4WmVxZzBCWDN4YmFWb3N6SGxjK1JKQmxTcFpDeTVuWlk0MU4xdWRydjFQaVFoeXRmTUtyY3IrVFBoNlEreDZkVExIZm1Hbnc0RStxbzhuaXdaUVFtQjkveGY2b1NkZitCNFBLVTJPYjNnOE41d1pMeU5aRXRYbndvYlZnTkdmWlQ2UTYxUmk0ZEsvY09uUWZNeXc5Vm9zMTlPNnBKOU00MENmOC9rWEhXWFlleGlJa0pjWFlFME9lSGZyQmRDWmVDdmZDamdaNzB2NEpxcW9HUGRXU2dwK3JmemNtVnlIL2VYSkdTSWcrMFhYanpMQ1VvYzYxYkh2VFEwN2g5NzNmZHR4azVBSHA3cFQ4ZDQ2a05GYjdNazJtNis0NDV1Q1hhbDhqbFdvem1pQnJ5bWx0aHczME01enN4cDZvTUJsYytGUmMycEpyNWRnbzh5ZWFLa0RtREdtbWZVMHR0cEtaa28zNUtiWUd1eEZyUGt0eXFGRmpPU3d0alFBd0RmQllYOGFjRFN0S0FyaW9KSHNqdkNnMG44QU5wOTNYUGdHWmIwVHhzK01RbmJNMTg4SGRIYmVyNFgvZWVmSjdML3haSnFTTG83Q05aTW1UNFJHNnBWR0lmZkF2eCtzTjlNbUpXUVBGeGVPNmNVWjVuYXUvYXYvcm45ZGpSSU5kSzJDVnlYazA5Z2lheFkzZzhPWTFCU0N6cVF3UXNzZFlldnAwY1RhdUk0cGJZZS9XMzhhS0xRc3JEN21kTVJFRlZuSXo4UFFDeVNxM2RJa3VvWDVYNEVhQkY3blZRaTdpYUpDL0l2a2R6ZlphZFUvemM5WFZPMXc0eTYwcVNaQUxBODV6M0RoRUZZUnFXZWFyWVZDT3d2UEtLWXJDTXFQc01sbHVvZWJBNmtaWk1GRjN0SWtDTHZLYkpZSWc2VW1yY0xuK2tPcnBTVllVNENYcnh3UGVKRUJZNXlZVThPajVVZzhCclhxVXl5QTVVbXJDTHFaaUg2UnN6Y3Q1anpJSldiVWhIRHl6dlRxd1ZMV0hlNHQ0SmxhQjByNW9iWjdOOVdEdHVFWitTRWtjbmVzSGJPOVorVE1wQ29mb28zUGNZMHR1UFhua0FrOTJzdmNKTUVFTVlBcTdRVjMwZEZNak1FNkNBMXFERkFib29TZVpEdzliZlBEQlRkdmM0UXpZQVo5M0F1L2gvM3ByVE1kS1UwZU9HaXZhSHl3NU50U01mN0lWS0RrVjNrbWFQZzJ0UTA4ekNEeUVUNTNOS0tHVlRMRkFIVmdnczZNMFZMRmVscFl5RDVhVlRkdzVMVmsxMEtRdWdrMkZUYnJRdTQrZEZVVnZBcVVsemI1Vk1tU21zUUNicit6WC9xemlqRVIzc3dMMXBBbmc0akd0ZWRWS3lWQkxoZjN5QmU1ZlQyWE9keTdualYzbUpHQ2ZNblY3NmpRaHZhSGkrM0c5ZHRKa2tySzdwKzRYczR3NnhVemNSL2luY2xOR3lYenNDcGV5dVdPRy96Z3dpVVkySW1DZnpTVEVSOHFldUkzeDFmWHdhdEhNcGFoOWh4aDNncmZqSHJUTUVvZTBvZTg4TkhPN3Rla25VMD0="
      }
    ]
  }
};
