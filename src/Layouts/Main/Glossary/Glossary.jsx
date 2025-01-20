import React, { useRef } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import glossaryTerms from './glossaryTerms.json';

const sections = [
	{ id: 'A' },
	{ id: 'B' },
	{ id: 'C' },
	{ id: 'D' },
	{ id: 'F' },
	{ id: 'G' },
	{ id: 'H' },
	{ id: 'I' },
	{ id: 'J' },
	{ id: 'L' },
	{ id: 'M' },
	{ id: 'N' },
	{ id: 'P' },
	{ id: 'Q' },
	{ id: 'R' },
	{ id: 'S' },
	{ id: 'U' },
	{ id: 'V' },
	{ id: 'W' },
];

const sectionsWithTerms = sections.filter(({ id }) => glossaryTerms['terms'].some((term) => term.word.startsWith(id)));

const Glossary = () => {
	const sectionRefs = useRef({});

	const scrollToSection = (id) => {
		const offset = -100;
		const element = sectionRefs.current[id];

		if (element) {
			const elementPosition = element.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({
				top: elementPosition + offset,
				behavior: 'smooth',
			});
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div>
			<h1 style={{ textAlign: 'center', marginBottom: '7px', fontWeight: 'bold', fontSize: '40px' }}>
				Glossary of Technical Terms
			</h1>
			<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
				{sections.map(({ id }) => (
					<button
						key={id}
						onClick={() => scrollToSection(id)}
						style={{
							margin: '0 5px',
							width: '30px',
							height: '33px',
							fontSize: '16px',
							cursor: 'pointer',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
						}}
					>
						{id}
					</button>
				))}
			</div>

			{sectionsWithTerms.map(({ id }) => (
				<div key={id}>
					<h1
						ref={(el) => (sectionRefs.current[id] = el)}
						style={{
							marginLeft: '142px',
						}}
					>
						{id}
					</h1>

					{glossaryTerms['terms']
						.filter((term) => term.word.startsWith(id))
						.map((term) => (
							<Card className="flex items-center justify-center" sx={{ minWidth: 275 }} key={term.word}>
								<CardContent sx={{ maxWidth: 600 }}>
									<Typography sx={{ mb: 1.5 }} variant="h5" component="div">
										<strong>{term.word}</strong>
									</Typography>
									<Typography variant="body2">
										<p>{term.definition}</p>
									</Typography>
								</CardContent>
							</Card>
						))}
				</div>
			))}

			<button
				onClick={scrollToTop}
				style={{
					position: 'fixed',
					bottom: '20px',
					right: '20px',
					width: '50px',
					height: '50px',
					fontSize: '10px',
					cursor: 'pointer',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '50%',
					boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<span style={{ fontSize: '18px', marginTop: '7px' }}>↑</span>
				<span style={{ fontSize: '8px', marginBottom: '23px' }}>Scroll to Top</span>
			</button>
		</div>
	);
};

export default Glossary;
