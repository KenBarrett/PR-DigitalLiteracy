import React, { useState, useEffect } from 'react';

const [second, setSecond] = useState('00');
const [minute, setMinute] = useState('00');
const [isActive, setIsActive] = useState(false);
const [counter, setCounter] = useState(0);

const Timer = () => {
	function stopTimer() {
		setIsActive(false);
		setCounter(0);
		setSecond('00');
		setMinute('00');
	}

	useEffect(() => {
		let intervalId;

		if (isActive) {
			intervalId = setInterval(() => {
				const secondCounter = counter % 60;
				const minuteCounter = Math.floor(counter / 60);

				const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
				const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

				setSecond(computedSecond);
				setMinute(computedMinute);

				setCounter((counter) => counter + 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [isActive, counter]);

	return (
		<div className="container">
			<div className="time">
				<span className="minute">{minute}</span>
				<span>:</span>
				<span className="second">{second}</span>
			</div>
			<div className="buttons">
				<button onClick={() => setIsActive(!isActive)} className="start">
					{isActive ? 'Pause' : 'Start'}
				</button>
				<button onClick={() => null} className="reset">
					Reset
				</button>
			</div>
		</div>
	);
};

export default Timer;
