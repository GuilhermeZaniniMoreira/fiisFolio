import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './List.css'

Modal.setAppElement('#root');

export default function List() {
    const [ fiis, setFiis ] = useState([]);
    
    useEffect(() => {
        async function loadFiis() {
            const response = await api.get('/fiis');
            setFiis(response.data);
        }
        loadFiis();
    });

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const results = fiis.filter(fiis =>
            fiis.ticker.includes(searchTerm && searchTerm.toUpperCase())
        );
        setSearchResults(results);
    }, [searchTerm]);

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState({});

    function openModal(e, fii) {
        setSelected(fii);
        console.log(fii)
        setIsOpen(true);
    }
  
    function closeModal(e) {
        e.stopPropagation();
        setIsOpen(false);
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
    };

    const [baseDate, setBaseDate] = useState(new Date());
    const [priceBaseDate, setPriceBaseDate] = useState(0);
    const [payment, setPayment] = useState(new Date());
    const [lastDividend, setLastDividend] = useState(0);

    const handleChangePriceBaseDate = event => {
        setPriceBaseDate(event.target.value);
    };
    
    const handleChangeLastDividend = event => {
        setLastDividend(event.target.value);
    };

    async function update() {
        await api.post('/fii-update', {
            ticker: selected.ticker,
            baseDate: baseDate,
            payment: payment,
            priceBaseDate: priceBaseDate,
            lastDividend: lastDividend
        });
    }

    return (
        <div className='fiis'>
            <input type="text"
                placeholder="Buscar FII..."
                value={searchTerm}
                onChange={handleChange} />
            <div className='list'>
                <ul>
                    {searchTerm === '' ? fiis.map(fii => (
                        <li key={fii._id} onClick={(e) => openModal(e, fii)}>
                            <div>
                                <strong>{fii.ticker}</strong>
                                <p>{fii.fund}</p>
                            </div>
                        </li>
                    )) : searchResults.map(fii => (
                        <li key={fii._id} onClick={(e) => openModal(e, fii)}>
                            <div>
                                <strong>{fii.ticker}</strong>
                                <p>{fii.fund}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className="fund">
                        <div>
                            <strong>{selected.ticker}</strong>
                        </div>
                        <div>
                            <strong>{selected.fund}</strong>
                        </div>
                        <div>
                            <strong>{selected.name}</strong>
                        </div>
                        <form>
                            <label>Data base:</label>
                            <DatePicker selected={baseDate} onChange={date => setBaseDate(date)} />
                            <label>Preço na data base:</label>
                            <input value={priceBaseDate} onChange={handleChangePriceBaseDate} />
                            <label>Pagamento:</label>
                            <DatePicker selected={payment} onChange={date => setPayment(date)} />
                            <label>Último dividendo:</label>
                            <input value={lastDividend} onChange={handleChangeLastDividend} />
                            <button className="update" onClick={update}>Alterar</button>
                        </form>
                        <button className="close" onClick={closeModal}>Fechar</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
