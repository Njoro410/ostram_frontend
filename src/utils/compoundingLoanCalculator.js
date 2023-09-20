const calculateCompoundingLoanPayments = (amount, loanTermMonths, annualInterestRate) => {
    const r = annualInterestRate / 100 / 12; // Monthly interest rate
    const n = loanTermMonths; // Loan term in months

    let principalAmount = amount;
    let monthlyPayment = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (amount > 0 && annualInterestRate > 0 && loanTermMonths > 0) {
        if (annualInterestRate === 0) {
            monthlyPayment = amount / loanTermMonths;
        } else {
            monthlyPayment = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }

        totalPayment = monthlyPayment * n;
        totalInterest = totalPayment - amount;
    }

    return {
        principalAmount: amount.toFixed(2),
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        loanTerm: loanTermMonths
    };
};

export default calculateCompoundingLoanPayments;