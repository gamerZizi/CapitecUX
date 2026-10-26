import { useState,useEffect } from 'react'
import React from 'react';
import axios from 'axios';

 function Eligibility() {
    // 1. Manage form input state
     const [formData, setFormData] = useState({
         age: '',
         employmentStatus: '',
         employmentDuration: '',
         monthlyIncome: '',
         monthlyExpenses: '',
         existingDebt: '',
         creditScore: '',
         requestedAmount: '',
         loanTerm: '',
         loanPurpose: '',
    });
    
    // 2. Manage API response and loading/error states
     const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes dynamically
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Handle form submission and API call
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Axios automatically handles JSON serialization and throws errors for non-2xx status codes
            const response = await post('http://localhost:3000/api/loans/eligibility', formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            setResult(response.data.result);
            console.log()
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

     return (
         <>
         <div className="gap-6">
             <div className="bg-white rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2 ">

            <form onSubmit={handleSubmit}>
                 <div className="block text-gray-700 mb-2">
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        value={formData.age}
                        onChange={handleChange}
                         required
                         placeholder='Age'
                    />
                     </div>
                     <div className="block text-gray-700 mb-2">
                         <label>Employment Status:</label>
                         <select
                             id="employmentStatus"
                             name="employmentStatus"
                             className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                             value={formData.role}
                             onChange={handleChange} 
                         >
                             <option value="unemployed">Unemployed</option>
                             <option value="employed">Employed</option>
                             
                         </select>
                     </div>
                     <div className="block text-gray-700 mb-2">
                         <label>Employment Duration (in months):</label>
                         <input
                             type="number"
                             name="employmentDuration"
                             className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                             value={formData.employmentDuration}
                             onChange={handleChange}
                             required
                             placeholder='Duration'
                         />
                     </div>
                     <div className="block text-gray-700 mb-2">
                         <label>Monthly Income (R):</label>
                         <input
                             type="number"
                             name="monthlyIncome"
                             className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                             value={formData.monthlyIncome}
                             onChange={handleChange}
                             required
                             placeholder='Monthly Income'
                         />
                     </div>
                     <div className="block text-gray-700 mb-2">
                         <label>Monthly Expenses (R):</label>
                         <input
                             type="number"
                             name="monthlyExpenses"
                             className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                             value={formData.monthlyExpenses}
                             onChange={handleChange}
                             required
                             placeholder='Monthly Expenses'
                         />
                     </div>
                <div className="block text-gray-700 mb-2">
                    <label>Credit Score:</label>
                    <input
                        type="number"
                        name="creditScore"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.creditScore}
                        onChange={handleChange}
                        required
                        placeholder='Credit Score'
                    />
                </div>
                 <div className="block text-gray-700 mb-2">
                         <label>Requested Loan Amount (R):</label>
                    <input
                        type="number"
                        name="requestedAmount"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.requestedAmount}
                        onChange={handleChange}
                        required
                        placeholder='Amount'
                    />
                </div>
                 <div className="block text-gray-700 mb-2">
                    <label>Loan Term:</label>
                    <input
                        type="number"
                        name="loanTerm"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.loanTerm}
                        onChange={handleChange}
                        required
                        placeholder='Loan Term'
                    />
                     </div>
                 <div className="block text-gray-700 mb-2">
                    <label>Loan Purpose:</label>
                    <input
                        type="text"
                        name="loanPurpose"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.loanPurpose}
                        onChange={handleChange}
                        required
                        placeholder='Loan Purpose'
                    />
                     </div>

                <div className="flex justify-end w-full bg-white-100 p-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-regular py-2 px-4 rounded-full" type="submit" disabled={loading}>
                    {loading ? 'Checking...' : 'Check eligibility'}
                         </button>
                </div>

            </form>

            {/* 4. Render UI based on API State */}
            {error && <p>Error: {error}</p>}

                     <ul className="grid grid-cols-2 md:grid-cols-2 gap-3">
                         {
                             result?.map((product, index) => (
                              <li className="bg-red px-4 py-12 pl-16 rounded-lg flex flex-col text-white gap-2 border border-red-500 bg-red-700" key={index}>

                               <ul>
                                   {Object.entries(product.personalInfo).map(([elegible, index1]) => (
                                       <li key={index1}>Rate: {elegible} <strong>{index1}</strong></li>
                                         ))
                                         }
                                </ul>
                               </li>

                             ))
                         }
                     </ul>

        </div>
             </div>

             </>
    );
}
export default Eligibility;