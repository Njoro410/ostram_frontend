const calculateFixedLoanPayments = (amount, loanTermMonths, annualInterestRate) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;

    const loanTerm = loanTermMonths;
    const principalAmount = amount;
    
    const monthlyPayment = amount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
    const totalPayment = monthlyPayment * loanTermMonths;
    const totalInterest = totalPayment - amount;

    return {
        principalAmount: principalAmount,
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        loanTerm: loanTerm
    };
}

export default calculateFixedLoanPayments



