import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const Tracker = () => {
  const [handle, setHandle] = useState('');
  const [data, setData] = useState(null);
  const [tags, setTags] = useState({});
  const [histogram, setHistogram] = useState([]);
  const [solvedCount, setSolvedCount] = useState(0);

  const fetchData = async () => {
    try {
      const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const userData = await userRes.json();
      const info = userData.result[0];

      const subsRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      const subsData = await subsRes.json();

      const solvedSet = new Set();
      const tagMap = {};
      const ratingMap = {};

      for (const sub of subsData.result) {
        if (sub.verdict === 'OK') {
          const key = `${sub.problem.contestId}-${sub.problem.index}`;
          if (solvedSet.has(key)) continue;
          solvedSet.add(key);

          // Tags
          for (const tag of sub.problem.tags) {
            tagMap[tag] = (tagMap[tag] || 0) + 1;
          }

          // Ratings
          const rating = sub.problem.rating;
          if (rating) {
            ratingMap[rating] = (ratingMap[rating] || 0) + 1;
          }
        }
      }

      const histogramData = Object.keys(ratingMap).map(rating => ({
        rating,
        count: ratingMap[rating]
      })).sort((a, b) => parseInt(a.rating) - parseInt(b.rating));

      setData(info);
      setTags(tagMap);
      setHistogram(histogramData);
      setSolvedCount(solvedSet.size);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const colors = [
    "#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6", "#fb923c", "#2dd4bf", "#e879f9", "#4ade80"
  ];

  const tagPieData = Object.entries(tags).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="tracker-page">
      <h1 className="tracker-title">Track Your Codeforces Profile</h1>

      <div className="tracker-input-box">
        <input
          type="text"
          value={handle}
          onChange={e => setHandle(e.target.value.toUpperCase())}
          placeholder="Enter Codeforces Handle"
        />
        <button onClick={fetchData}>Track</button>
      </div>

      {data && (
        <>
          <div className="profile-box">
            <h2>{data.handle}</h2>
            <p><strong>Rank:</strong> {data.rank}</p>
            <p><strong>Rating:</strong> {data.rating}</p>
            <p><strong>Max Rating:</strong> {data.maxRating}</p>
            <p><strong>Contribution:</strong> {data.contribution}</p>
            <p><strong>Friends of:</strong> {data.friendOfCount}</p>
          </div>

          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
            Total Problems Solved: {solvedCount}
          </h3>

          <div className="analytics-box">
            <div className="chart-card">
              <h3>Rating Histogram</h3>
              <BarChart width={320} height={200} data={histogram}>
                <XAxis dataKey="rating" />
                <Tooltip />
                <Bar dataKey="count" fill="#60a5fa" />
              </BarChart>
            </div>

            <div className="chart-card">
              <h3>Tags Solved</h3>
              <PieChart width={300} height={200}>
                <Pie
                  data={tagPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {tagPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
              <div className="tag-list">
                {tagPieData.map((t, i) => (
                  <div key={i}>{t.name}: {t.value}</div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tracker;
