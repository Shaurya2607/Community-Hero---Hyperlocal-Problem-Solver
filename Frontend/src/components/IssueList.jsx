import React, { useState } from 'react';

const IssueList = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const issues = [
    { id: 1, title: 'Large pothole near DIT University gate', location: 'DIT University Road, Dehradun', reporter: 'Arjun Singh', time: '2 hours ago', priority: 'High', status: 'Verified', upvotes: 35, category: 'Pothole' },
    { id: 2, title: 'Garbage not collected in Sector 7', location: 'Sector 7, Near Market, Dehradun', reporter: 'Priya Sharma', time: '5 hours ago', priority: 'Medium', status: 'Verified', upvotes: 18, category: 'Garbage' },
    { id: 3, title: 'Water leakage on main road', location: 'City Center Road, Dehradun', reporter: 'Rohan Patel', time: '1 day ago', priority: 'High', status: 'Verified', upvotes: 22, category: 'Water Leakage' },
    { id: 4, title: 'Streetlight not working in Green Park', location: 'Green Park Road, Dehradun', reporter: 'Neha Joshi', time: '2 days ago', priority: 'Low', status: 'Verified', upvotes: 12, category: 'Streetlight' },
  ];

  const filterTags = ['All', 'High Priority', 'Verified', 'Pending'];

  return (
    <div className="p-6 bg-slate-50 min-h-screen max-w-3xl mx-auto space-y-4">
      <div className="space-y-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">All Reported Issues</h1>
          <p className="text-slate-500 text-xs">Browse, verify, and upvote community infrastructure challenges.</p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-none">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                activeFilter === tag 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main List Layout Container */}
      <div className="space-y-3">
        {issues
          .filter((issue) => {
            if (activeFilter === 'High Priority') return issue.priority === 'High';
            if (activeFilter === 'Verified') return issue.status === 'Verified';
            return true;
          })
          .map((issue) => (
            <div key={issue.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-slate-200 transition">
              {/* Media Thumbnail Container Box */}
              <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
                {issue.category === 'Pothole' ? '🚗' : issue.category === 'Garbage' ? '🗑️' : issue.category === 'Water Leakage' ? '💧' : '💡'}
              </div>

              {/* Central Details Context Elements */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-100 font-bold text-slate-500 px-2 py-0.5 rounded">#{issue.category}</span>
                  <span className="text-[11px] text-slate-400 font-medium">{issue.time}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 truncate">{issue.title}</h3>
                <p className="text-xs text-slate-500 truncate">📍 {issue.location}</p>
                <p className="text-[11px] text-slate-400 font-medium">By: {issue.reporter}</p>
              </div>

              {/* Status and Action Nodes Panel */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 gap-2">
                <div className="flex gap-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    issue.priority === 'High' ? 'bg-red-50 text-red-600' : issue.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>{issue.priority}</span>
                  <span className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-0.5 rounded-full">{issue.status}</span>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition">
                  <span>👍</span>
                  <span>{issue.upvotes}</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IssueList;