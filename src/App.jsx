import React, { useState, useEffect } from "react";
import axios from "axios";
import Attribute from "./components/Attribute";
const API_KEY = import.meta.env.VITE_APIKEY;
const API_URL = "https://api.thecatapi.com/v1/images/search";
const BACKUP_IMG =
	"https://static.vecteezy.com/system/resources/previews/004/639/366/original/error-404-not-found-text-design-vector.jpg";

function App() {
	const [image, setImage] = useState(BACKUP_IMG);
	const [breeds, setBreeds] = useState({ origin: "", country_code: "", life_span: "" });
	const [banList, setBanList] = useState({ origin: [], country_code: [], life_span: [] });

	useEffect(() => {
		fetchCatImage();
	}, [banList]);

	const fetchCatImage = async () => {
		try {
			const response = await axios.get(`${API_URL}?limit=1&has_breeds=1&api_key=${API_KEY}`);
			const data = response.data[0];
			const imageUrl = data.url;
			const breed = data.breeds[0];
			const breedsToPut = {
				origin: breed.origin,
				country_code: breed.country_code,
				life_span: breed.life_span,
			};

			// Check if the fetched breeds contain any banned attributes
			if (isBanned(breedsToPut)) {
				// If banned attributes are found, fetch image again
				await fetchCatImage();
			} else {
				setImage(imageUrl);
				setBreeds(breedsToPut);
			}
		} catch (error) {
			console.log(error);
			setImage(BACKUP_IMG);
			setBreeds({ origin: "", country_code: "", life_span: "" });
		}
	};

	const isBanned = (breedsToCheck) => {
		// Check if any banned attribute is present in the fetched breeds
		return Object.keys(banList).some((attribute) => {
			return banList[attribute].includes(breedsToCheck[attribute]);
		});
	};

	const addToBanList = (event, title) => {
		const value = event.target.innerText;
		const updatedBanList = { ...banList };
		if (!updatedBanList[title.toLowerCase()].includes(value)) {
			// If it doesn't exist, append the value to the array
			updatedBanList[title.toLowerCase()].push(value);
			// Update the state with the modified banList
			setBanList(updatedBanList);
		}
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<header
				id="header"
				className="bg-white border-b-4 border-indigo-600 mb-8 text-center p-6"
			>
				<h1 className="text-4xl font-bold text-indigo-600">Veni Vici!</h1>
			</header>
			<main className="flex flex-grow">
				<div id="banlist" className="w-1/4 bg-white p-6 border-r border-gray-300">
					<div>
						<h2 className="text-2xl font-semibold mb-4">Ban List</h2>
					</div>
					<div id="ban-list-container">
						<ul className="space-y-2">
							{Object.entries(banList).map(([key, value]) => (
								<li key={key} className="text-lg">
									<strong className="font-semibold">{key}:</strong>
									<ul className="ml-4 list-disc">
										{value.map((item, index) => (
											<li key={index}>{item}</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="flex-1 p-6">
					<section className="max-w-md mx-auto">
						<div className="bg-white rounded-lg shadow-lg overflow-hidden">
							<img
								src={image}
								alt="image of cat"
								className="w-full h-auto object-cover"
							/>
						</div>
					</section>
					{breeds ? (
						<section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							<Attribute
								title="Origin"
								data={breeds.origin}
								onClickToBanList={addToBanList}
							/>
							<Attribute
								title="Country_code"
								data={breeds.country_code}
								onClickToBanList={addToBanList}
							/>
							<Attribute
								title="Life_span"
								data={breeds.life_span}
								onClickToBanList={addToBanList}
							/>
						</section>
					) : (
						<h3 className="text-xl text-center text-gray-600 mt-8">No Breeds Yet</h3>
					)}
					<section className="flex justify-center mt-12">
						<button
							onClick={(e) => fetchCatImage()}
							type="button"
							className="bg-indigo-600 text-white px-6 py-3 rounded-md text-xl font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Get New Cat!
						</button>
					</section>
				</div>
			</main>
		</div>
	);
}

export default App;
