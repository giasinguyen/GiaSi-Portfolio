import { useState, useEffect, useContext } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaBook, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

function GitHubContributions() {
  const [githubStats, setGithubStats] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  const username = 'giasinguyen'; // GitHub username

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);

      // Fetch user stats
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (!reposResponse.ok) {
        if (reposResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error('Failed to fetch repositories');
      }
      const reposData = await reposResponse.json();

      setGithubStats(userData);
      setRepositories(reposData);
      setError(null);
    } catch (err) {
      console.error('GitHub API Error:', err);
      setError(err.message);

      // Set fallback data if API fails (update URLs to match actual repos)
      setGithubStats({
        public_repos: 25,
        followers: 50,
        following: 30,
        created_at: '2020-01-01T00:00:00Z'
      });
      setRepositories([
        {
          id: 1,
          name: 'GiaSi-Portfolio',
          description: 'Modern personal portfolio website built with React 19, Vite 6, TailwindCSS 4, and Three.js',
          html_url: `https://github.com/${username}/GiaSi-Portfolio`,
          language: 'JavaScript',
          stargazers_count: 5,
          updated_at: '2024-12-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'spring-boot-ecommerce',
          description: 'E-commerce backend API built with Spring Boot, Spring Security, and JWT authentication',
          html_url: `https://github.com/${username}/spring-boot-ecommerce`,
          language: 'Java',
          stargazers_count: 8,
          updated_at: '2024-11-15T00:00:00Z'
        },
        {
          id: 3,
          name: 'react-task-manager',
          description: 'Kanban-style task management application with drag-and-drop functionality',
          html_url: `https://github.com/${username}/react-task-manager`,
          language: 'TypeScript',
          stargazers_count: 3,
          updated_at: '2024-10-20T00:00:00Z'
        },
        {
          id: 4,
          name: 'microservices-demo',
          description: 'Microservices architecture demo with Spring Cloud and Docker',
          html_url: `https://github.com/${username}/microservices-demo`,
          language: 'Java',
          stargazers_count: 12,
          updated_at: '2024-09-10T00:00:00Z'
        },
        {
          id: 5,
          name: 'vue-dashboard',
          description: 'Admin dashboard built with Vue.js 3 and Composition API',
          html_url: `https://github.com/${username}/vue-dashboard`,
          language: 'Vue',
          stargazers_count: 6,
          updated_at: '2024-08-25T00:00:00Z'
        },
        {
          id: 6,
          name: 'python-data-analysis',
          description: 'Data analysis and visualization projects using Python and Pandas',
          html_url: `https://github.com/${username}/python-data-analysis`,
          language: 'Python',
          stargazers_count: 4,
          updated_at: '2024-07-30T00:00:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400', dot: '#f7df1e' },
      'Java': { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', dot: '#ed8b00' },
      'TypeScript': { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', dot: '#3178c6' },
      'Python': { bg: 'bg-indigo-100 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', dot: '#3776ab' },
      'Vue': { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', dot: '#4fc08d' },
      'React': { bg: 'bg-cyan-100 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', dot: '#61dafb' },
      'HTML': { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', dot: '#e34f26' },
      'CSS': { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', dot: '#1572b6' },
    };
    return colors[language] || { bg: 'bg-gray-100 dark:bg-gray-900/20', text: 'text-gray-600 dark:text-gray-400', dot: '#64748b' };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.55, 1.4]
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin"></div>
            <div className="relative bg-white dark:bg-gray-900 m-1 rounded-full p-4">
              <FaGithub className="text-3xl text-gray-700 dark:text-gray-300" />
            </div>
          </div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Loading GitHub data...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fetching contributions and repositories</p>
        </motion.div>
      </div>
    );
  }

  const showErrorBanner = error && !githubStats;

  if (showErrorBanner) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[400px] flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-2xl p-8 mb-6">
            <FaGithub className="mx-auto text-5xl mb-4 text-red-400" />
            <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Unable to load GitHub data</h3>
            <p className="text-red-600 dark:text-red-300 text-sm mb-6">{error}</p>
            <button
              onClick={fetchGitHubData}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Error banner for API issues but still show fallback data */}
      {error && githubStats && (
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/10 dark:via-yellow-900/10 dark:to-orange-900/10 border border-amber-200/50 dark:border-amber-700/30 p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-yellow-400/5 to-orange-400/5"></div>
          <div className="relative flex items-start space-x-4">
            <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-xl">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Using Cached Data</h4>
              <p className="text-amber-700 dark:text-amber-400 text-sm">Live GitHub data is temporarily unavailable. Showing cached information.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* GitHub Stats Cards */}
      {githubStats && (
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { key: 'public_repos', label: 'Repositories', icon: FaBook, color: 'blue', value: githubStats.public_repos },
            { key: 'followers', label: 'Followers', icon: FaCodeBranch, color: 'emerald', value: githubStats.followers },
            { key: 'following', label: 'Following', icon: FaEye, color: 'purple', value: githubStats.following },
            { key: 'years', label: 'Years', icon: FaCalendarAlt, color: 'orange', value: `${new Date().getFullYear() - new Date(githubStats.created_at).getFullYear()}+` }
          ].map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`text-2xl text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* GitHub Contributions Calendar */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl shadow-gray-900/5 dark:shadow-gray-900/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/5 dark:via-purple-900/5 dark:to-pink-900/5"></div>
        
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-3 rounded-2xl">
                <FaGithub className="text-2xl text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  Contribution Activity
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Your coding journey visualized</p>
              </div>
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm font-medium"
            >
              <span>View Profile</span>
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>

          <div className="bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/30">
            <GitHubCalendar
              username={username}
              colorScheme={darkMode ? 'dark' : 'light'}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
              }}
              fontSize={12}
              blockSize={13}
              blockMargin={3}
              hideColorLegend={false}
              hideMonthLabels={false}
              hideTotalCount={false}
              showWeekdayLabels={true}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              📊 Contributions in the last year • Updated from GitHub API
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Repositories */}
      {repositories.length > 0 && (
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Recent Repositories
            </h3>
            <div className="h-px flex-1 ml-6 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {repositories.slice(0, 6).map((repo, index) => {
              const languageStyle = getLanguageColor(repo.language);
              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex flex-col h-full">
                    {/* Header with title and stars */}
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 line-clamp-1 flex-1 mr-2">
                        {repo.name}
                      </h4>
                      {repo.stargazers_count > 0 && (
                        <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg border border-yellow-200/50 dark:border-yellow-700/30">
                          <FaStar className="text-yellow-500 text-xs" />
                          <span className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">
                            {repo.stargazers_count}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description - takes available space */}
                    {repo.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                        {repo.description}
                      </p>
                    )}

                    {/* Language and update info */}
                    <div className="flex items-center justify-between mb-4 mt-auto">
                      {repo.language && (
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${languageStyle.bg} ${languageStyle.text}`}>
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: languageStyle.dot }}
                          ></span>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated {formatDate(repo.updated_at)}
                      </span>
                    </div>

                    {/* View Repository button - always at bottom */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30 border border-blue-200/50 dark:border-blue-700/50 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group/btn"
                      >
                        <FaGithub className="group-hover/btn:scale-110 transition-transform duration-200" />
                        <span>View Repository</span>
                        <FaExternalLinkAlt className="text-xs opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-200" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-10"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://github.com/${username}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 font-medium"
              >
                <FaGithub className="text-lg" />
                <span>View All Repositories</span>
                <FaExternalLinkAlt className="text-sm" />
              </a>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <FaEye className="text-lg" />
                <span>Visit GitHub Profile</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default GitHubContributions;