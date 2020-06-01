import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './List.css'

export default function List() {
    const [ fiis, setFiis ] = useState([]);
    
    useEffect(() => {
        async function loadFiis() {
            const response = await api.get('/fiis');
            setFiis(response.data);
        }
        loadFiis();
    }, []);

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        const results = fiis.filter(fiis =>
            fiis.ticker.includes(searchTerm && searchTerm.toUpperCase())
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <div className='fiis'>
            <input type="text"
                placeholder="Buscar FII..."
                value={searchTerm}
                onChange={handleChange} />
            <div className='list'>
                <ul>
                    {searchTerm === '' ? fiis.map(fii => (
                        <li key={fii._id}>
                            <div>
                                <strong>{fii.ticker}</strong>
                                <p>{fii.fund}</p>
                            </div>
                        </li>
                    )) : searchResults.map(fii => (
                        <li key={fii._id}>
                            <div>
                                <strong>{fii.ticker}</strong>
                                <p>{fii.fund}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
