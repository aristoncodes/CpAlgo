import { useEffect, useState } from 'react';

const Problems = () => {
  const [aProblems, setAProblems] = useState([]);
  const [bProblems, setBProblems] = useState([]);
  const [cProblems, setCProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);
  const [showC, setShowC] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch('https://codeforces.com/api/problemset.problems');
        const data = await res.json();
        const all = data.result.problems;

        const a = [];
        const b = [];
        const c = [];

        for (const p of all) {
          if (a.length < 100 && p.index === 'A') a.push(p);
          else if (b.length < 100 && p.index === 'B') b.push(p);
          else if (c.length < 100 && p.index === 'C') c.push(p);
          if (a.length === 100 && b.length === 100 && c.length === 100) break;
        }

        setAProblems(a);
        setBProblems(b);
        setCProblems(c);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch problems:', err);
      }
    };

    fetchProblems();
  }, []);

  const renderProblemSection = (title, problems, visible, toggle) => (
    <div className="section">
      <h2 className="section-header" onClick={toggle}>
        {title} <span>({problems.length} problems)</span>
        <span className="dropdown-icon">{visible ? '▲' : '▼'}</span>
      </h2>
      {visible && (
        <div className="problem-grid">
          {problems.map((p, i) => (
            <div className="card" key={i}>
              <div className="status">Unsolved</div>
              <h3>{p.contestId}{p.index}. {p.name}</h3>
              <a
                className="solve-btn"
                href={`https://codeforces.com/contest/${p.contestId}/problem/${p.index}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 Solve Problem
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="problems-page">
      {loading ? <p>Loading...</p> : (
        <>
          {renderProblemSection("Problem A Grind", aProblems, showA, () => setShowA(!showA))}
          {renderProblemSection("Problem B Grind", bProblems, showB, () => setShowB(!showB))}
          {renderProblemSection("Problem C Grind", cProblems, showC, () => setShowC(!showC))}
        </>
      )}
    </div>
  );
};

export default Problems;
