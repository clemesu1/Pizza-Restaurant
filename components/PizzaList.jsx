import React from 'react'
import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

const PizzaList = ({ pizzaList }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
			<p className={styles.desc}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Phasellus posuere est eget sem consectetur porta.
				Aenean rhoncus faucibus lectus eget tincidunt.
				Aliquam imperdiet sapien id nisi finibus facilisis.
			</p>
			<div className={styles.wrapper}>
				{pizzaList.map((pizza) => (
					<PizzaCard key={pizza._id} pizza={pizza} />
				))}
			</div>
		</div>
	)
}

export default PizzaList