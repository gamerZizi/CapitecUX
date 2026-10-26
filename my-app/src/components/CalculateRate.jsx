import React, { useState } from 'react';

const CalculateRate = () => {
    const [loanAmount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [creditScore, setCreditScore] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalPayable, setTotalPayable] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [error, setError] = useState('');

    const calculateMonthlyPayment = () => {
        if (!loanAmount || !interestRate || !loanTerm) {
            setError('Please fill in all fields.');
            alert('Please fill all the fields !!!');
            setMonthlyPayment('');
            return;
        }

   const loanAmount = parseFloat(loanAmount) - (downPayment ? parseFloat(downPayment) : 0);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTerm) * 12;

        const numerator = loanAmount * r * Math.pow(1 + r, n);
        const denominator = Math.pow(1 + r, n) - 1;
        const monthlyPayment = (numerator / denominator).toFixed(2);

        setMonthlyPayment(monthlyPayment);
        const totalPayable = (monthlyPayment * n).toFixed(2);
        setTotalPayable(totalPayable);
        const totalInterest = (totalPayable - loanAmount).toFixed(2);
        setTotalInterest(totalInterest);
        setError('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
                <div className="block text-gray-700 mb-2">
                    <label>
                        Loan Amount (R):
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder='Amount'
                        />
                    </label>
                </div>
                <div className="block text-gray-700 mb-2">
                    <label>
                        Loan Term (years):
                        <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(e.target.value)}
                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder='Loan Term'
                        />
                    </label>
                </div>
                <div className="block text-gray-700 mb-2">
                    <label>Credit Score:</label>
                    <input
                        type="number"
                        value={creditScore}
                        onChange={(e) => setCreditScore(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder='Credit Score'
                      
                      
                    />
                </div>
                <div className="block text-gray-700 mb-2">
                    <label>
                        Rate of Interest (%):
                        <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder='Annual Interest Rate'
                        />
                    </label>
                </div>
                
                <div className="flex justify-end w-full bg-white-100 p-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-regular py-2 px-4 rounded-full" onClick={calculateMonthlyPayment}>Calculate</button>
                </div>
                {error && <h3 className='res'>{error}</h3>}
                {monthlyPayment && (
                    <div className='res'>
                        <h3>Monthly Payment: R {monthlyPayment}</h3>
                        <h3>Total Loan Payment: R {totalPayable}</h3>
                        <h3>Total Interest Amount: R {totalInterest}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalculateRate;