import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      title: 'Fetch High-Quality Computer Engineering Videos',
      description: 'We source high-quality computer engineering videos from free platforms like YouTube, ensuring you get the best content for learning.',
      icon: '🎥',
    },
    {
      title: 'AI-Powered Search Refinement',
      description: 'Our AI wrapper refines search results to provide the most relevant videos. It also blocks distracting content, keeping you focused on your goals.',
      icon: '🔍',
    },
    {
      title: 'Categorized Videos for Your Goals',
      description: 'Videos are intelligently categorized based on your learning goals, making it easy to find exactly what you need.',
      icon: '📂',
    },
    {
      title: 'Real-Time Video Description Customization',
      description: 'We use AI to customize video descriptions in real-time, simplifying complex topics into easy-to-understand language.',
      icon: '🤖',
    },
  ];

  const paths = [
    { title: 'Software Engineer', path: '/software_engineer', icon: '💻' },
    { title: 'Data Scientist', path: '/data_scientist', icon: '📊' },
    { title: 'AI Engineer', path: '/ai_engineer', icon: '🤖' },
    { title: 'Web Developer', path: '/web_developer', icon: '🌐' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      text: 'StackTube AI has revolutionized how I learn programming concepts. The AI-curated content is exactly what I need.',
      avatar: '👩‍💻',
    },
    {
      name: 'Michael Chen',
      role: 'Data Science Student',
      text: 'The personalized learning paths and video recommendations helped me master complex topics efficiently.',
      avatar: '👨‍🎓',
    },
    {
      name: 'Emily Rodriguez',
      role: 'AI Researcher',
      text: 'The quality of content and AI-powered summaries make this platform stand out from traditional learning resources.',
      avatar: '👩‍🔬',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className={clsx('relative flex flex-col items-center justify-center text-center py-32 px-4')}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className={clsx('absolute inset-0 -z-10')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className={clsx('absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent')} />
        </motion.div>

        <h1 className={clsx('text-6xl font-bold text-zinc-800 dark:text-zinc-200 mb-6')}>
          Learn Computer Engineering the <span className={clsx('text-primary')}>Smarter Way</span>
        </h1>
        <p className={clsx('text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl')}>
          Discover high-quality videos, refined search results, and AI-powered tools to enhance your learning experience.
        </p>
        <motion.div
          className={clsx('flex gap-4')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/software_engineer"
            className={clsx(
              'px-8 py-3 rounded-full bg-primary text-white font-semibold',
              'hover:bg-primary/90 transition-colors duration-200',
              'shadow-lg shadow-primary/20'
            )}
          >
            Start Learning
          </Link>
          <Link
            to="/ai_engineer"
            className={clsx(
              'px-8 py-3 rounded-full border-2 border-zinc-300 dark:border-zinc-600',
              'text-zinc-700 dark:text-zinc-300 font-semibold',
              'hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200'
            )}
          >
            Explore AI Path
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className={clsx('py-24 px-4')}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={clsx('max-w-6xl mx-auto')}>
          <h2 className={clsx('text-4xl font-bold text-center text-zinc-800 dark:text-zinc-200 mb-16')}>
            Features that Set Us Apart
          </h2>
          <div className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8')}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={clsx(
                  'p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-xl',
                  'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300',
                  'border border-zinc-200 dark:border-zinc-700'
                )}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={clsx('text-4xl mb-4')}>{feature.icon}</div>
                <h3 className={clsx('text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3')}>
                  {feature.title}
                </h3>
                <p className={clsx('text-zinc-600 dark:text-zinc-400')}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Learning Paths Section */}
      <motion.section
        className={clsx('py-24 px-4 bg-zinc-50 dark:bg-zinc-900/50')}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={clsx('max-w-6xl mx-auto')}>
          <h2 className={clsx('text-4xl font-bold text-center text-zinc-800 dark:text-zinc-200 mb-16')}>
            Choose Your Learning Path
          </h2>
          <div className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8')}>
            {paths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={path.path}
                  className={clsx(
                    'block p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg',
                    'hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
                    'border border-zinc-200 dark:border-zinc-700'
                  )}
                >
                  <div className={clsx('text-5xl mb-4')}>{path.icon}</div>
                  <h3 className={clsx('text-xl font-semibold text-zinc-800 dark:text-zinc-200')}>
                    {path.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className={clsx('py-24 px-4')}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={clsx('max-w-6xl mx-auto')}>
          <h2 className={clsx('text-4xl font-bold text-center text-zinc-800 dark:text-zinc-200 mb-16')}>
            What Our Users Say
          </h2>
          <div className={clsx('grid grid-cols-1 md:grid-cols-3 gap-8')}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={clsx(
                  'p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg',
                  'hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
                  'border border-zinc-200 dark:border-zinc-700'
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={clsx('text-4xl mb-4')}>{testimonial.avatar}</div>
                <p className={clsx('text-zinc-600 dark:text-zinc-400 mb-4 italic')}>
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className={clsx('font-semibold text-zinc-800 dark:text-zinc-200')}>
                    {testimonial.name}
                  </h4>
                  <p className={clsx('text-sm text-zinc-500 dark:text-zinc-400')}>
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}