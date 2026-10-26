import { useState, useEffect } from 'react';

function DataList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/loan/validation-rules') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div>
            <h2>Personal Information</h2>
            <ul>
                {Object.entries(items.personalInfo).map(([rate, index1]) => (
                    <li key={index1}>Personal Information: {rate} <strong>{index1}</strong></li>
                ))
                }
            </ul>
        </div>
    );
}

export default DataList;
