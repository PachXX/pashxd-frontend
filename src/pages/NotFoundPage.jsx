import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
export default function NotFoundPage() {
  return <section className="max-w-3xl mx-auto px-6 pt-48 pb-32 text-center">
    <SEOHead title="Page not found | Pashx Dashboard" description="This page could not be found." noIndex />
    <p className="text-green-700 font-semibold">404</p>
    <h1 className="text-4xl font-bold mt-4">Page not found</h1>
    <p className="text-slate-600 mt-4">The link may have changed. Explore PxD or browse our latest articles.</p>
    <div className="flex justify-center gap-6 mt-8"><Link to="/" className="underline">Go home</Link><Link to="/resources" className="underline">Read the blog</Link></div>
  </section>;
}
