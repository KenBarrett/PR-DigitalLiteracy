import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { AuthProvider } from './firebase/AuthContext';
import PATHS from './paths';
import components from './components';
import Layout from './Layouts/layout';
import Home from './pages/Home';

import QuizLayout from './Layouts/Main/quiz/index';
import DesktopQuiz from './Layouts/Main/quiz/quizPlatform/DesktopQuiz';
import MobileQuiz from './Layouts/Main/quiz/quizPlatform/MobileQuiz';
import Glossary from './Layouts/Main/Glossary/Glossary';

import FAQ from './pages/FAQ';

ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID);

// Single Page Applications uses client side navigation and google anyalytics can't depend on fullpage reloads. Uselocation require the context of the router to be rendered to provide the location to the Google Analytics. Also, the useLocation() causes the component to re-render whenever the location changes.
function AnalyticsWrapper() {
	const location = useLocation();
	useEffect(() => {
		console.log(location.pathname);
		ReactGA.send({ hitType: 'pageview', page_location: location.pathname });
	}, [location.pathname]);
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<AnalyticsWrapper />
				<Layout>
					<Routes>
						{Object.keys(PATHS).map((pathName) => {
							const href = PATHS[pathName];
							const Component = components[pathName];
							return <Route key={pathName} path={href} element={<Component />} />;
						})}
						<Route path="/quiz" element={<QuizLayout />} />
						<Route path="/quiz/desktop" element={<DesktopQuiz />} />
						<Route path="/quiz/mobile" element={<MobileQuiz />} />
						<Route path="/glossary" element={<Glossary />} />
						<Route path="/faq" element={<FAQ />} />
						<Route path="*" element={<Home />} />
					</Routes>
				</Layout>
			</Router>
		</AuthProvider>
	);
}

export default App;
