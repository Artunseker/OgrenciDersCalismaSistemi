import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import StudentListPage from './pages/StudentListPage';
import StudentDetailPage from './pages/StudentDetailPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/students/:id" element={<StudentDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 