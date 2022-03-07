import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const Add = ({ setClose }) => {
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState(null);
	const [desc, setDesc] = useState(null);
	const [prices, setPrices] = useState([]);
	const [extra, setExtra] = useState(null);
	const [extraOptions, setExtraOptions] = useState([]);

	const changePrice = (e, index) => {
		const currentPrices = prices;
		currentPrices[index] = e.target.value;
		setPrices(currentPrices);
	}

	const handleExtraInput = (e) => {
		setExtra({ ...extra, [e.target.name]: e.target.value });
	}

	const handleExtra = (e) => {
		setExtraOptions(prev => [...prev, extra]);
	}

	const handleCreate = async () => {
		let data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "uploads");
		try {
			const uploadRes = await axios.post(
				"https://api.cloudinary.com/v1_1/dcghqcki5/image/upload",
				data
			);
			const { url } = uploadRes.data;

			const newProduct = {
				title,
				desc,
				prices,
				extraOptions,
				img: url,
			};

			await axios.post("http://localhost:3000/api/products", newProduct);

			setClose(true);
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.close} onClick={() => setClose(true)}>X</span>
				<h1>Add a New Pizza</h1>
				<div className={styles.item}>
					<label className={styles.label}>Choose an Image</label>
					<input type="file" onChange={(e) => setFile(e.target.files[0])} />
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Title</label>
					<input
						type="text"
						className={styles.input}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Description</label>
					<textarea
						rows={4}
						type="text"
						onChange={(e) => setDesc(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Prices</label>
					<div className={styles.priceContainer}>
						<input type="number" className={`${styles.input} ${styles.inputSm}`} placeholder="Small" onChange={(e) => changePrice(e, 0)} />
						<input type="number" className={`${styles.input} ${styles.inputSm}`} placeholder="Medium" onChange={(e) => changePrice(e, 1)} />
						<input type="number" className={`${styles.input} ${styles.inputSm}`} placeholder="Large" onChange={(e) => changePrice(e, 2)} />
					</div>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Extra</label>
					<div className={styles.extra}>
						<input
							type="text"
							className={`${styles.input} ${styles.inputSm}`}
							placeholder="Item"
							name="text"
							onChange={handleExtraInput}
						/>
						<input
							type="number"
							className={`${styles.input} ${styles.inputSm}`}
							placeholder="Price"
							name="price"
							onChange={handleExtraInput}
						/>
						<button className={styles.extra} onClick={handleExtra}>
							Add
						</button>
					</div>
					<div className={styles.extraItems}>
						{extraOptions.map((option, index) => (
							<span key={index} className={styles.extraItem}>
								{option.text}
							</span>
						))}
					</div>
				</div>
				<button className={styles.createButton} onClick={handleCreate}>
					Create
				</button>
			</div>
		</div>
	)
}

export default Add