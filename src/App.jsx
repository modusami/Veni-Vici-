import React, { useState, useEffect } from "react";
import axios from "axios";
import Attribute from "./components/Attribute";
const API_KEY = import.meta.env.VITE_APIKEY;
const API_URL = "https://api.thecatapi.com/v1/images/search";
const BACKUP_IMG =
	"https://static.vecteezy.com/system/resources/previews/004/639/366/original/error-404-not-found-text-design-vector.jpg";

function App() {
	const [image, setImage] = useState(BACKUP_IMG);
	const [breed, setBreed] = useState([{}]);

	useEffect(() => {
		fetchCatImage();
	}, []);

	const fetchCatImage = async () => {
		try {
			const response = await axios.get(`${API_URL}?limit=1&has_breeds=1&api_key=${API_KEY}`);
			const data = response.data[0];
			const imageUrl = data.url;
			const breeds = data.breeds;
			setImage(imageUrl);
			setBreed(breeds);
			console.log(breed);
		} catch (error) {
			console.log(error);
			setImage(BACKUP_IMG);
			setBreed([{}]);
		}
	};

	return (
		<>
			<header id="header">
				<h1>Veni Vici!</h1>
			</header>
			<main>
				<section className="max-w-[400px] min-h-[400px] flex justify-center items-center">
					<img src={image} alt="image of cat" width="100%" height="100%" />
				</section>
				{breed ? (
					<section className="flex gap-5">
						<Attribute title="Origin" data={breed[0].origin} />

						<Attribute title="Grooming" data={breed[0].grooming} />

						<Attribute title="Health Issues" data={breed[0].health_issues} />
					</section>
				) : (
					<h3>No Breeds Yet</h3>
				)}
				<section>
					<button
						onClick={(e) => fetchCatImage()}
						type="button"
						className="border-8 p-3 outline-none"
					>
						Get New Cat!
					</button>
				</section>
			</main>
		</>
	);
}

export default App;
