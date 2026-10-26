import LoanProducts from './LoanProducts';
import Eligibility from './Eligibility';
import CalculateRate from './CalculateRate';
import ValidationRules from './ValidationRules';
import { useState } from 'react';

function TabsView() {
    // 1. Define your tab structure and content
    const tabsData = [
        // {
        //     id: 'Validation Rules',
        //     label: 'Validation Rules',
        //     icon: (
        //         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        //         </svg>
        //     ),
        //     content: (
        //         <div>
        //             <h3 className="text-lg font-bold text-gray-600 mb-2">Here are some rules to be considered:</h3>
        //             <p className="text-gray-600">See the details below, for the loan your are considering</p>
        //             <ValidationRules />
        //         </div>
        //     ),
        // },
        {
            id: 'eligibility',
            label: 'Eligibity',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            content: (
                <div>
                    <h3 className="text-lg font-bold text-gray-600 mb-2">Check Loan Eligibility</h3>
                    <p className="text-gray-600">Enter your personal, financial and loan details below and see what you qualify for: </p>
                    <Eligibility />
                </div>
            ),
        },
        {
            id: 'loanProducts',
            label: 'Loan Products',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            content: (
                <div>
                    <h3 className="text-lg font-bold text-gray-600 mb-2">Available Loan Products</h3>
                    <p className="text-gray-600 pb-6">These are the available loan products best suited for your needs:</p>
                    <LoanProducts />
              
                </div>
            ),
        },
        {
            id: 'calculate-rate',
            label: 'Calculate Rate',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            content: (
                <div>
                    <h3 className="text-lg font-bold text-gray-600 mb-2">Loan Details:</h3>
                    <p className="text-gray-600">Fill in the form below, for the loan your are considering</p>
                    <CalculateRate />
                </div>
            ),
        },
        
    ];

    // 2. State tracking for the active tab ID
    const [activeTab, setActiveTab] = useState(tabsData[0].id);

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Tab Navigation Header Container */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8" aria-label="Tabs" role="tablist">
                    {tabsData.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                id={`tab-control-${tab.id}`}
                                aria-controls={`tab-panel-${tab.id}`}
                                aria-selected={isActive}
                                role="tab"
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${isActive
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Panels Content Container */}
            <div className="mt-6 p-6 bg-white shadow-sm border border-gray-100">
                {tabsData.map((tab) => (
                    <div
                        key={tab.id}
                        id={`tab-panel-${tab.id}`}
                        aria-labelledby={`tab-control-${tab.id}`}
                        role="tabpanel"
                        className={activeTab === tab.id ? 'block' : 'hidden'}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default TabsView;