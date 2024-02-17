import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/phonebook';

const getAllEntries = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const addEntry = async (newEntry) => {
    const response = await axios.post(baseUrl, newEntry);
    return response.data;
};

const updateEntry = async (id, updatedEntry) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedEntry);
    return response.data;
};

const apiService = {
    getAllEntries,
    addEntry,
    updateEntry,
};

export default apiService;
