import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_APIKEY;
const API_URL = "https://api.thecatapi.com/v1/images/search";

const Attribute = ({ data }) => {
	return <div className="font-bold p-2 rounded-md">{data}</div>;
};

function App() {
	const [catImage, setCatImage] = useState("");
	const [banList, setBanList] = useState([]);
	const [breeds, setBreeds] = useState({});

	useEffect(() => {
		fetchCatImage();
	}, []);

	const fetchCatImage = async () => {
		try {
			const response = await axios.get(`${API_URL}?limit=1&has_breeds=1&api_key=${API_KEY}`);
			const data = response.data[0];
			const imageUrl = data.url;
			const breedData = data.breeds[0];
			setCatImage(imageUrl);
			setBreeds(breedData);
			console.log(data);
		} catch (error) {
			console.log(error);
			setCatImage(null);
			setBreeds([{}]);
		}
	};

	const handleBanAttribute = (attribute) => {
		setBanList([...banList, attribute]);
	};

	return (
		
	);
}

export default App;
