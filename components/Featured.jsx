import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Featured.module.css'

const Featured = () => {
	const [index, setIndex] = useState(0);

	const images = [
		'/images/featured.png',
		'/images/featured2.png',
		'/images/featured3.png',
	];

	const handleArrow = (direction) => {
		if (direction === 'l') setIndex(index !== 0 ? index - 1 : images.length - 1);
		else setIndex(index !== 2 ? index + 1 : 0)
	}

	return (
		<div className={styles.container}>
			<div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow('l')}>
				<Image src="/images/arrowl.png" alt='' layout='fill' objectFit='contain' />
			</div>
			<div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
				{images.map((img, i) => (
					<div key={i} className={styles.imgContainer}>
						<Image src={img} alt='' layout='fill' objectFit='contain' />
					</div>
				))}

			</div>
			<div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow('r')}>
				<Image src="/images/arrowr.png" alt='' layout='fill' objectFit='contain' />
			</div>
		</div>
	)
}

export default Featured