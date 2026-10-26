const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

//for cors purposes
const corsOptions = {
    origin: ["http://localhost:5173"],
}
app.use(cors(corsOptions));

// ADD THIS ROUTE HANDLER

//Eligibility Post


// Handle the POST request for loan eligibility
app.post('/api/loan/eligibility', (req, res) => {
  const {monthlyIncome, loanAmount, creditScore } = req.body;

  const income = parseFloat(monthlyIncome);
  const loan = parseFloat(loanAmount);
  const score = parseInt(creditScore, 10);

  // Simple eligibility logic:
  // e.g., credit score >= 650 and loan amount <= 5 * monthly income
  const maxAllowedLoan = income * 5;
  const isEligible = score >= 650 && loan <= maxAllowedLoan;

  if (isEligible) {
    res.json({
            eligibilityResult: {
                isEligible: true,
                approvalLikelihood: 85,
                riskCategory: "low",
                decisionReason: "Strong income-to-expense ratio and manageable existing debt"
            },
            recommendedLoan: {
                maxAmount: 180000.00,
                recommendedAmount: 150000.00,
                interestRate: 12.5,
                monthlyPayment: 7089.50,
                totalRepayment: 170148.00
            },
            affordabilityAnalysis: {
                disposableIncome: 10000.00,
                debtToIncomeRatio: 20.0,
                loanToIncomeRatio: 60.0,
                affordabilityScore: "good"
            }
    });
  } else {
    res.json({
      status: 'Denied',
    });
  }
});

//Eligibility Get

app.get('/api/loan/eligibility', (req, res) => {
    res.json({ 
    eligibilityResult: {
    isEligible: true,
    approvalLikelihood: 85,
    riskCategory: "low",
    decisionReason: "Strong income-to-expense ratio and manageable existing debt"
  },
  recommendedLoan: {
    maxAmount: 180000.00,
    recommendedAmount: 150000.00,
    interestRate: 12.5,
    monthlyPayment: 7089.50,
    totalRepayment: 170148.00
  },
  affordabilityAnalysis: {
    disposableIncome: 10000.00,
    debtToIncomeRatio: 20.0,
    loanToIncomeRatio: 60.0,
    affordabilityScore: "good"
  }
});
});


//loan Products

app.get('/api/loan/products', (req, res) => {
    res.json({ 
        products: [
            {
            id:"personal_loan",
            name:"Personal Loan",
            description: "Flexible personal financing for various needs",
            minAmount: 5000.00,
            maxAmount: 300000.00,
            minTerm: 6,
            maxTerm: 60,
            interestRateRange: {
            min: 10.5,
            max: 18.5
          },
          purposes: ["debt_consolidation", "home_improvement", "education", "medical", "other"]
      },
         {
            id:"vehicle_loan",
            name:"Vehicle Finance",
            description: "Financing for new and used vehicles",
            minAmount: 50000.00,
            maxAmount: 1500000.00,
            minTerm: 12,
            maxTerm: 72,
            interestRateRange: {
            min: 8.5,
            max: 15.0
          },
          purposes: ["new_vehicle", "used_vehicle"]
      },
        ],
});
});

//Calculate Rate

app.get('/api/loan/calculate-rate', (req, res) => {
    res.json({ 
  interestRate: 12.5,
  monthlyPayment: 7089.50,
  totalInterest: 20148.00,
  totalRepayment: 170148.00,
  paymentSchedule: [
    {
      month: 1,
      payment: 7089.50,
      principal: 5527.17,
      interest: 1562.33,
      balance: 144472.83
    },
    {
      month: 2,
      payment: 7089.50,
      principal: 5584.89,
      interest: 1504.61,
      balance: 138887.94
    }
  ]
});
});

//Validation Rules

app.get('/api/loan/validation-rules', (req, res) => {
    res.json({ 
  personalInfo: {
    age: {
      min: 18,
      max: 65,
      required: true,
      errorMessage: "Age must be between 18 and 65"
    },
    employmentStatus: {
      required: true,
      options: ["employed", "self_employed", "unemployed", "retired"],
      errorMessage: "Please select your employment status"
    },
    employmentDuration: {
      min: 3,
      required: true,
      errorMessage: "Minimum 3 months employment required"
    }
  },
  financialInfo: {
    monthlyIncome: {
      min: 5000.00,
      required: true,
      errorMessage: "Minimum monthly income of R5,000 required"
    },
   monthlyExpenses: {
      min: 0,
      required: true,
      errorMessage: "Please enter your monthly expenses"
    },
    creditScore: {
      min: 300,
      max: 850,
      required: false,
      errorMessage: "Credit score must be between 300 and 850"
    }
  },
  loanDetails: {
    requestedAmount: {
      min: 5000.00,
      max: 300000.00,
      required: true,
      errorMessage: "Loan amount must be between R5,000 and R300,000"
    },
    loanTerm: {
      min: 6,
      max: 60,
      required: true,
      errorMessage: "Loan term must be between 6 and 60 months"
    }
  }
});
});




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
