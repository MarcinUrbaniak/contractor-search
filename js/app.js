import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import ListGroup from "react-bootstrap/ListGroup"

// import './App.css';
import {createRoot} from "react-dom";
import Stack from "react-bootstrap/Stack";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [companies, setCompanies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch('API_URL')
            .then(response => response.json())
            .then(data => {
                setCompanies(data);
                setSearchResults(data); // Ustawienie wyników wyszukiwania na wszystkie firmy po załadowaniu danych
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleSearch = () => {
        const filteredCompanies = companies.filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredCompanies);
    };

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Stack direction="horizontal"  gap={3}>
                <div className="p-2 btn btn-primary">ORGANIZACJE</div>
                <div className="p-2 btn btn-primary">BENEFICJENCI RZECZYWIŚCI</div>
                <div className="p-2 btn btn-primary">CEIDG</div>
                <div className="p-2 ms-auto btn btn-light" >ZAPISANE NA PÓŹNIEJ</div>
            </Stack>
            <Container className="mt-5 ">
                <h1 className="text-center mb-4" >Wyszukiwarka organizacji</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Wpisz nr KRS szukanej firmy"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <InputGroup className="btn">
                        <Button variant="primary"  onClick={handleSearch}>Szukaj</Button>
                    </InputGroup>
                </InputGroup>
                <ListGroup>
                    {searchResults.map(company => (
                        <ListGroup.Item key={company.id}>
                            <h2>{company.name}</h2>
                            <p>{company.description}</p>
                            <p>Adres: {company.address}</p>
                            {/* Dodaj więcej informacji o firmie */}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);

