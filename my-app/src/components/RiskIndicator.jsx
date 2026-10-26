import { AlertTriangle, CheckCircle, AlertCircle, XCircle, ShieldAlert, Info } from 'lucide-react';

type RiskLevel = 'very-low' | 'low' | 'moderate' | 'high' | 'very-high' | null;

interface RiskIndicatorProps {
    riskLevel: RiskLevel;
    emiPercentage: number;
    totalEMI: number;
    salary: number;
    monthlyExpenses: number;
    existingEMI: number;
    newEMI: number;
    loanType: string;
}

const riskConfig = {
    'very-low': {
        label: 'Very Low Risk',
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        icon: CheckCircle,
        description: 'Excellent! Your EMI is well within manageable limits.',
        recommendation: 'You have strong loan affordability. Consider maintaining this healthy ratio.'
    },
    'low': {
        label: 'Low Risk',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-700',
        icon: CheckCircle,
        description: 'Good! Your loan burden is manageable.',
        recommendation: 'Your finances are stable. Monitor any additional loan commitments.'
    },
    'moderate': {
        label: 'Moderate Risk',
        color: 'from-yellow-500 to-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-700',
        icon: AlertCircle,
        description: 'Caution! Your EMI is a significant portion of your income.',
        recommendation: 'Consider reducing loan burden or increasing income before taking additional loans.'
    },
    'high': {
        label: 'High Risk',
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-700',
        icon: AlertTriangle,
        description: 'Warning! Your EMI burden is quite high.',
        recommendation: 'Strongly advise against additional loans. Focus on reducing existing debt.'
    },
    'very-high': {
        label: 'Very High Risk',
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        icon: XCircle,
        description: 'Critical! Your EMI exceeds safe limits.',
        recommendation: 'Immediate action required. Consider debt restructuring or financial counseling.'
    }
};

export function RiskIndicator({
    riskLevel,
    emiPercentage,
    totalEMI,
    salary,
    monthlyExpenses,
    existingEMI,
    newEMI,
    loanType
}: RiskIndicatorProps) {

    if (!riskLevel || salary === 0) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <ShieldAlert className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-600 mb-2">Enter Your Details</h3>
                <p className="text-gray-500">Fill in your financial details to see your risk assessment</p>
            </div>
        );
    }

    const config = riskConfig[riskLevel];
    const Icon = config.icon;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="space-y-6">
            {/* Risk Level Card */}
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${config.borderColor}`}>
                <div className={`bg-gradient-to-r ${config.color} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-8 h-8" />
                        <h2>Risk Assessment</h2>
                    </div>
                    <div className="text-3xl">{config.label}</div>
                    <div className="mt-2 text-white/90">
                        EMI to Income Ratio: {emiPercentage.toFixed(1)}%
                    </div>
                </div>

                <div className={`p-6 ${config.bgColor}`}>
                    <div className="space-y-4">
                        <div>
                            <p className={`${config.textColor} mb-2`}>{config.description}</p>
                            <p className="text-gray-700 text-sm">{config.recommendation}</p>
                        </div>

                        {/* Assessment Disclaimer */}
                        <div className="mt-4 pt-4 border-t border-gray-300">
                            <div className="flex gap-2 items-start">
                                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-gray-700">
                                    <span className="font-semibold text-gray-800">Important:</span> While this assessment is based on your current financial standing,
                                    it's crucial to also check your credit score before applying for any loan. Always ensure you take loans from reliable and
                                    authorized sources, carefully read all fine prints and understand any hidden charges. Additionally, maintain sufficient
                                    savings for emergencies to protect your financial stability.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-gray-800 mb-4">Financial Summary</h3>

                <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-gray-600">Monthly Salary</span>
                        <span className="text-gray-900">{formatCurrency(salary)}</span>
                    </div>

                    {monthlyExpenses > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-gray-600">Monthly Expenses</span>
                            <span className="text-red-600">-{formatCurrency(monthlyExpenses)}</span>
                        </div>
                    )}

                    {monthlyExpenses > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b bg-blue-50 -mx-6 px-6 py-2">
                            <span className="text-gray-800">Available Income</span>
                            <span className="text-blue-700">{formatCurrency(salary - monthlyExpenses)}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-gray-600">Existing EMI</span>
                        <span className="text-gray-900">{formatCurrency(existingEMI)}</span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-gray-600">New EMI ({loanType})</span>
                        <span className="text-gray-900">{formatCurrency(newEMI)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-gray-800">Total EMI</span>
                        <span className="text-blue-600">{formatCurrency(totalEMI)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200">
                        <span className="text-gray-800">Remaining Income</span>
                        <span className="text-green-600">{formatCurrency(salary - monthlyExpenses - totalEMI)}</span>
                    </div>
                </div>
            </div>

            {/* EMI Breakdown Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-gray-800 mb-4">EMI Breakdown</h3>

                <div className="space-y-3">
                    {/* Visual bar */}
                    <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                        {existingEMI > 0 && (
                            <div
                                className="absolute top-0 left-0 h-full bg-blue-500"
                                style={{ width: `${Math.min((existingEMI / salary) * 100, 100)}%` }}
                            />
                        )}
                        {newEMI > 0 && (
                            <div
                                className="absolute top-0 h-full bg-indigo-500"
                                style={{
                                    left: `${Math.min((existingEMI / salary) * 100, 100)}%`,
                                    width: `${Math.min((newEMI / salary) * 100, 100 - (existingEMI / salary) * 100)}%`
                                }}
                            />
                        )}
                    </div>

                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-gray-600">Existing EMI ({((existingEMI / salary) * 100).toFixed(1)}%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                            <span className="text-gray-600">New EMI ({((newEMI / salary) * 100).toFixed(1)}%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Ranges Reference */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-gray-800 mb-4">Risk Categories</h3>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">Very Low Risk</span>
                        </div>
                        <span className="text-gray-600">≤ 10%</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">Low Risk</span>
                        </div>
                        <span className="text-gray-600">10% - 20%</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-700">Moderate Risk</span>
                        </div>
                        <span className="text-gray-600">20% - 40%</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-gray-700">High Risk</span>
                        </div>
                        <span className="text-gray-600">40% - 50%</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-gray-700">Very High Risk</span>
                        </div>
                        <span className="text-gray-600">&gt; 50%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}