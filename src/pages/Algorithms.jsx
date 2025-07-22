const topics = [
  {
    title: "Sorting Algorithms",
    description: "Master sorting for optimizing and pre-processing data.",
    problems: [
      { name: "Sorting It All Out", url: "https://codeforces.com/problemset/problem/703/A" },
      { name: "Merge Sort Task", url: "https://codeforces.com/problemset/problem/602/B" },
      { name: "Nearly Sorted", url: "https://codeforces.com/problemset/problem/131/A" }
    ]
  },
  {
    title: "Searching Algorithms",
    description: "Binary search, two pointers, and ternary search are critical for optimization.",
    problems: [
      { name: "Binary Search", url: "https://codeforces.com/problemset/problem/706/B" },
      { name: "Two Pointers", url: "https://codeforces.com/problemset/problem/1059/A" }
    ]
  },
  {
    title: "Greedy Algorithms",
    description: "Greedy is powerful for locally optimal, globally feasible solutions.",
    problems: [
      { name: "Activity Selection", url: "https://codeforces.com/problemset/problem/1324/C" },
      { name: "Greedy for Candies", url: "https://codeforces.com/problemset/problem/1419/A" }
    ]
  },
  {
    title: "Dynamic Programming (DP)",
    description: "Crucial for solving problems with overlapping subproblems.",
    problems: [
      { name: "Frog Jump", url: "https://atcoder.jp/contests/dp/tasks/dp_a" },
      { name: "Knapsack Variant", url: "https://codeforces.com/problemset/problem/342/C" },
      { name: "Longest Common Subsequence", url: "https://codeforces.com/problemset/problem/1452/D" }
    ]
  },
  {
    title: "Prefix Sum & Difference Array",
    description: "Used for range queries, modifications in O(1) after preprocessing.",
    problems: [
      { name: "B. Interesting Subarray", url: "https://codeforces.com/problemset/problem/1030/A" },
      { name: "C. Cows and Segments", url: "https://codeforces.com/problemset/problem/702/B" }
    ]
  },
  {
    title: "Bit Manipulation",
    description: "Binary tricks and operations like XOR are frequently tested.",
    problems: [
      { name: "XOR Queries", url: "https://codeforces.com/problemset/problem/455/A" },
      { name: "Submask Enumeration", url: "https://codeforces.com/problemset/problem/914/C" }
    ]
  },
  {
    title: "Graph Algorithms (DFS, BFS)",
    description: "Essential for connectivity, pathfinding, and graph traversal problems.",
    problems: [
      { name: "Maze Escape (DFS)", url: "https://codeforces.com/problemset/problem/339/B" },
      { name: "Shortest Path (BFS)", url: "https://codeforces.com/problemset/problem/59/A" }
    ]
  },
  {
    title: "Number Theory & Modulo",
    description: "Divisors, GCD, primes, mod math – vital in contests.",
    problems: [
      { name: "GCD Problems", url: "https://codeforces.com/problemset/problem/34/B" },
      { name: "Modulo Inverse", url: "https://codeforces.com/problemset/problem/616/A" }
    ]
  },
  {
    title: "Two Pointers & Sliding Window",
    description: "Techniques to optimize nested loops to linear complexity.",
    problems: [
      { name: "Max Subarray Sum", url: "https://codeforces.com/problemset/problem/978/C" },
      { name: "Sum in Subarray", url: "https://codeforces.com/problemset/problem/276/C" }
    ]
  },
  {
    title: "Binary Lifting & LCA",
    description: "Used in tree queries and ancestor relationships.",
    problems: [
      { name: "Binary Lifting Concept", url: "https://codeforces.com/blog/entry/74847" }
    ]
  },
  {
    title: "Disjoint Set Union (DSU)",
    description: "Union-Find to manage components and groups efficiently.",
    problems: [
      { name: "DSU Problems", url: "https://codeforces.com/problemset/problem/734/B" }
    ]
  }
];

const Algorithms = () => {
  return (
    <div className="algo">
      <h2 className="algo-title">📘 Algorithms Library (1600+ CP Essentials)</h2>
      <div className="algo-container">
        {topics.map((topic, idx) => (
          <div className="algo-card" key={idx}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <ul>
              {topic.problems.map((p, i) => (
                <li key={i}>
                  <a href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Algorithms;
