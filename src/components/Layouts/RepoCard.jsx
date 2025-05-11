import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import './RepoCard.css'

const RepoCard = ({ repo }) => {
  return (
    <div className="repo-card">
      <div className="card text-dark border-0 shadow">
        <div className="card-body">
          <h4 className="card-title mb-3">
            <a
              href={repo?.html_url}
              target="_blank"
              title={repo?.name}
              rel="noopener noreferrer"
            >
              <FaLink size={20} /> {repo?.name}
            </a>
          </h4>
          {repo?.description && (
            <p className="card-text text-dark">{repo?.description}</p>
          )}

          <div>
            <span className="badge badge-watchers text-dark">
              <FaEye size={15} /> {repo?.watchers_count}
            </span>
            <span className="badge badge-stars text-dark">
              <FaStar size={15} /> {repo?.stargazers_count}
            </span>
            <span className="badge badge-issues text-dark">
              <FaInfo size={15} /> {repo?.open_issues}
            </span>
            <span className="badge badge-forks text-dark">
              <FaUtensils size={15} /> {repo?.forks}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepoCard

/*
style={{
          // backgroundColor: "rgb(31, 41, 55)"
          backgroundColor: "#2A303C",
        }}
*/
