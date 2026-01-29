import React from "react";
import ScoreRing from "./Scorering";
import StatCard from "./StatCard";


const Pill = ({ text, color }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}
  >
    {text}
  </span>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl p-6 shadow border">
    <h2 className="text-lg font-bold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

const ATSResult = ({ data }) => {
  return (
    <div className="space-y-10">
        

      {/* HERO SCORE */}
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Overall ATS Match
          </h2>
          <p className="text-gray-600 text-sm">
            How well your resume aligns with the job description
          </p>
        </div>

        <ScoreRing score={data.ats_score} />
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Raw Score" value={data.raw_score} />
        <StatCard label="JD Keywords" value={data.total_jd_keywords} />
        <StatCard label="Resume Keywords" value={data.total_resume_keywords} />
      </div>

      {/* SKILL MATCHING */}
      <div className="grid md:grid-cols-2 gap-8">
        <Section title="Matched Skills">
          <div className="flex flex-wrap gap-3">
            {Object.keys(data.matched_keywords).length > 0 ? (
              Object.entries(data.matched_keywords).map(([k, v]) => (
                <Pill
                  key={k}
                  text={`${k} (${v})`}
                  color="bg-green-100 text-green-700"
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No matched skills</p>
            )}
          </div>
        </Section>

        <Section title="Missing Skills">
          <div className="flex flex-wrap gap-3">
            {data.missing_keywords.length > 0 ? (
              data.missing_keywords.map((kw) => (
                <Pill
                  key={kw}
                  text={kw}
                  color="bg-red-100 text-red-700"
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No missing keywords 🎉
              </p>
            )}
          </div>
        </Section>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <Section title="Category-wise Breakdown">
        <div className="grid md:grid-cols-2 gap-8">
          {Object.keys(data.matched_by_category).map((cat) => (
            <div
              key={cat}
              className="border rounded-xl p-4 bg-gray-50"
            >
              <h3 className="font-semibold mb-2">{cat}</h3>

              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Matched</p>
                {data.matched_by_category[cat].length ? (
                  <div className="flex flex-wrap gap-2">
                    {data.matched_by_category[cat].map((s) => (
                      <Pill
                        key={s}
                        text={s}
                        color="bg-green-100 text-green-700"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">None</p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Missing</p>
                {data.missing_by_category[cat].length ? (
                  <div className="flex flex-wrap gap-2">
                    {data.missing_by_category[cat].map((s) => (
                      <Pill
                        key={s}
                        text={s}
                        color="bg-red-100 text-red-700"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-green-600">
                    All covered 🎉
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
export default ATSResult;