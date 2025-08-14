import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import scenariosData from './scenarios.json';

function App() {
  const [scenarios, setScenarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [randomScenario, setRandomScenario] = useState(null);
  const [showRandom, setShowRandom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // Auto-generate tags based on keywords if not present
  const generateTags = (scenario) => {
    if (scenario.tags && scenario.tags.length > 0) {
      return scenario.tags;
    }
    
    const tags = [];
    const text = `${scenario.title} ${scenario.description}`.toLowerCase();
    
    // Keyword mapping for auto-tagging
    const keywordMap = {
      'breach': ['breach', 'compromised', 'leaked', 'exposed'],
      'malware': ['malware', 'ransomware', 'wiper', 'virus', 'trojan'],
      'phishing': ['phishing', 'phish', 'spear', 'social engineer'],
      'insider': ['employee', 'insider', 'staff', 'internal'],
      'vendor': ['vendor', 'supplier', 'third-party', 'partner'],
      'infrastructure': ['infrastructure', 'server', 'network', 'system', 'datacenter'],
      'vulnerability': ['vulnerability', 'vuln', 'zero-day', 'exploit', 'flaw'],
      'legal': ['legal', 'law', 'warrant', 'enforcement', 'compliance'],
      'physical': ['physical', 'building', 'office', 'theft'],
      'cloud': ['cloud', 'aws', 'azure', 'gcp', 'saas'],
      'email': ['email', 'mail', 'smtp', 'exchange', 'outlook'],
      'mobile': ['mobile', 'phone', 'android', 'ios', 'app'],
      'AI': [' ai ', 'artificial intelligence', 'machine learning', ' ml ', 'llm', 'language model', 'chatbot', 'gpt', 'neural', 'deepfake', 'training data', 'hallucination', 'prompt injection']
    };
    
    for (const [tag, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        tags.push(tag);
      }
    }
    
    return tags.length > 0 ? tags : ['other'];
  };

  useEffect(() => {
    // Add generated tags to scenarios if needed
    const processedScenarios = scenariosData.map(scenario => ({
      ...scenario,
      tags: generateTags(scenario)
    }));
    setScenarios(processedScenarios);
  }, []);

  const uniqueTags = useMemo(() => {
    const tags = new Set();
    scenarios.forEach(scenario => {
      const scenarioTags = scenario.tags || [];
      scenarioTags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort().slice(0, 8);
  }, [scenarios]);

  const filteredScenarios = useMemo(() => {
    return scenarios.filter(scenario => {
      const matchesSearch = 
        scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const scenarioTags = scenario.tags || [];
      const matchesFilter = 
        currentFilter === 'all' ||
        scenarioTags.some(tag => tag === currentFilter);
      
      return matchesSearch && matchesFilter;
    });
  }, [scenarios, searchTerm, currentFilter]);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, currentFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredScenarios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedScenarios = filteredScenarios.slice(startIndex, endIndex);

  const handleRandomScenario = () => {
    const pool = filteredScenarios.length > 0 ? filteredScenarios : scenarios;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setRandomScenario(random);
    setShowRandom(true);
  };

  const handleScenarioClick = (scenario) => {
    setRandomScenario(scenario);
    setShowRandom(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <span key={i} className="highlight">{part}</span> : part
    );
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="title">Incident Response Scenario Library</h1>
          <p className="subtitle">Practice security incident response with real-world scenarios</p>
          <p className="subsubtitle">
            Community viewer for scenarios from{' '}
            <a href="https://x.com/badthingsdaily" target="_blank" rel="noopener noreferrer">
              @badthingsdaily
            </a>
            {' '}• Unofficial • No affiliation
          </p>
        </div>

        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search scenarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <button className="button button-yellow" onClick={handleRandomScenario}>
            Random Scenario
          </button>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('all')}
          >
            All
          </button>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${currentFilter === tag ? 'active' : ''}`}
              onClick={() => setCurrentFilter(tag)}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>

        {showRandom && randomScenario && (
          <div className="random-container active">
            <h2 style={{ marginBottom: '1rem' }}>Random Scenario</h2>
            <div className="scenario-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <span className="scenario-number">#{randomScenario.id}</span>
              <h3 className="scenario-title">{randomScenario.title}</h3>
              <p className="scenario-description">{randomScenario.description}</p>
            </div>
            <button 
              className="button button-yellow" 
              style={{ marginTop: '1.5rem' }}
              onClick={handleRandomScenario}
            >
              Another Random
            </button>
          </div>
        )}

        <div className="scenario-grid">
          {paginatedScenarios.map((scenario, index) => (
            <div
              key={scenario.id}
              className="scenario-card"
              style={{ animationDelay: `${Math.min(index * 0.05, 1)}s` }}
              onClick={() => handleScenarioClick(scenario)}
            >
              <span className="scenario-number">#{scenario.id}</span>
              <h3 className="scenario-title">
                {highlightText(scenario.title)}
              </h3>
              <p className="scenario-description">
                {highlightText(scenario.description)}
              </p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // Show first page, last page, current page, and 2 pages around current
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - currentPage) <= 2
                ) {
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 3 ||
                  pageNum === currentPage + 3
                ) {
                  return <span key={pageNum} className="pagination-dots">...</span>;
                }
                return null;
              })}
            </div>
            
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        <footer className="footer">
          <div style={{textAlign: 'center', padding: '20px 0'}}>
            <p className="credit" style={{marginBottom: '10px'}}>
              <p style={{fontSize: '0.85em', color: '#666', margin: 0}}>
                This site is an independent project created to make these scenarios more accessible for security training.
              </p>
            </p>
              <p style={{fontSize: '0.85em', color: '#666', margin: 0}}>  
              Original source:{' '}
              <a href="https://x.com/badthingsdaily" target="_blank" rel="noopener noreferrer">
                x.com/badthingsdaily
              </a>
              </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;