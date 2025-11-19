import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { Blog } from './components/Blog';
import { BlogPost } from './components/BlogPost';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Mentor } from './components/Mentor';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import './utils/create-admin';

type Page = 
  | 'home' 
  | 'about' 
  | 'vision-mission'
  | 'history'
  | 'team'
  | 'partners'
  | 'programs'
  | 'social-service'
  | 'consult'
  | 'ventures'
  | 'economic-empowerment'
  | 'education'
  | 'micro-credit'
  | 'projects'
  | 'blog'
  | 'blog-post'
  | 'gallery'
  | 'contact'
  | 'mentor'
  | 'admin-login'
  | 'admin-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('admin_token');
    if (token) {
      setAccessToken(token);
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (token: string) => {
    setAccessToken(token);
    setIsAdmin(true);
    localStorage.setItem('admin_token', token);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setAccessToken(null);
    setIsAdmin(false);
    localStorage.removeItem('admin_token');
    setCurrentPage('home');
  };

  const navigateToBlogPost = (postId: string) => {
    setSelectedBlogPostId(postId);
    setCurrentPage('blog-post');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'about':
      case 'vision-mission':
      case 'history':
      case 'team':
      case 'partners':
        return <About section={currentPage} onNavigate={setCurrentPage} />;
      case 'programs':
      case 'social-service':
      case 'consult':
      case 'ventures':
      case 'economic-empowerment':
      case 'education':
      case 'micro-credit':
      case 'projects':
        return <Programs section={currentPage} onNavigate={setCurrentPage} />;
      case 'blog':
        return <Blog onNavigate={setCurrentPage} onSelectPost={navigateToBlogPost} />;
      case 'blog-post':
        return <BlogPost postId={selectedBlogPostId} onNavigate={setCurrentPage} />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      case 'mentor':
        return <Mentor />;
      case 'admin-login':
        return <AdminLogin onLogin={handleLogin} />;
      case 'admin-dashboard':
        return isAdmin && accessToken ? (
          <AdminDashboard accessToken={accessToken} onLogout={handleLogout} />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        );
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}