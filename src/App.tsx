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

  // Map page keys to URL paths
  const pageToPath = (page: string, id?: string) => {
    switch (page) {
      case 'home': return '/';
      case 'about': return '/about';
      case 'vision-mission': return '/about/vision-mission';
      case 'history': return '/about/history';
      case 'team': return '/our-leadership'; // friendly unique path requested
      case 'partners': return '/about/partners';
      case 'programs': return '/programs';
      case 'social-service': return '/programs/social-service';
      case 'consult': return '/programs/consult';
      case 'ventures': return '/programs/ventures';
      case 'economic-empowerment': return '/programs/economic-empowerment';
      case 'education': return '/programs/education';
      case 'micro-credit': return '/programs/micro-credit';
      case 'projects': return '/projects';
      case 'blog': return '/blog';
      case 'blog-post': return id ? `/blog/${id}` : '/blog';
      case 'gallery': return '/gallery';
      case 'contact': return '/contact';
      case 'mentor': return '/destiny-coach';
      case 'admin-login': return '/admin/login';
      case 'admin-dashboard': return '/admin/dashboard';
      default: return '/';
    }
  };

  // Parse path into page + optional id (for blog-post)
  const pathToPage = (pathname: string) => {
    const p = pathname.replace(/\/+$/, ''); // trim trailing slash
    if (p === '' || p === '/') return { page: 'home' as Page };
    if (p === '/about') return { page: 'about' as Page };
    if (p === '/about/vision-mission') return { page: 'vision-mission' as Page };
    if (p === '/about/history') return { page: 'history' as Page };
    if (p === '/our-leadership') return { page: 'team' as Page };
    if (p === '/about/partners') return { page: 'partners' as Page };
    if (p === '/programs') return { page: 'programs' as Page };
    if (p === '/programs/social-service') return { page: 'social-service' as Page };
    if (p === '/programs/consult') return { page: 'consult' as Page };
    if (p === '/programs/ventures') return { page: 'ventures' as Page };
    if (p === '/programs/economic-empowerment') return { page: 'economic-empowerment' as Page };
    if (p === '/programs/education') return { page: 'education' as Page };
    if (p === '/programs/micro-credit') return { page: 'micro-credit' as Page };
    if (p === '/projects') return { page: 'projects' as Page };
    if (p === '/blog') return { page: 'blog' as Page };
    if (p.startsWith('/blog/')) {
      const id = p.split('/')[2];
      return { page: 'blog-post' as Page, id };
    }
    if (p === '/gallery') return { page: 'gallery' as Page };
    if (p === '/contact') return { page: 'contact' as Page };
    if (p === '/mentor' || p === '/destiny-coach') return { page: 'mentor' as Page };
    if (p === '/admin/login') return { page: 'admin-login' as Page };
    if (p === '/admin/dashboard') return { page: 'admin-dashboard' as Page };
    return { page: 'home' as Page };
  };

  // initialize from current URL and handle back/forward navigation
  useEffect(() => {
    const { page, id } = pathToPage(window.location.pathname);
    setCurrentPage(page);
    if (id) setSelectedBlogPostId(id);

    const onPop = () => {
      const { page: p, id: popId } = pathToPage(window.location.pathname);
      setCurrentPage(p);
      setSelectedBlogPostId(popId || null);
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('admin_token');
    if (token) {
      setAccessToken(token);
      setIsAdmin(true);
    }
  }, []);

  const navigate = (page: string, opts?: { id?: string }) => {
    const id = opts?.id ?? (page === 'blog-post' ? selectedBlogPostId ?? undefined : undefined);
    const path = pageToPath(page, id);
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      // ignore (some environments may restrict pushState)
    }
    if (page === 'blog-post' && id) setSelectedBlogPostId(id);
    setCurrentPage(page as Page);
  };

  const handleLogin = (token: string) => {
    setAccessToken(token);
    setIsAdmin(true);
    localStorage.setItem('admin_token', token);
    navigate('admin-dashboard');
  };

  const handleLogout = () => {
    setAccessToken(null);
    setIsAdmin(false);
    localStorage.removeItem('admin_token');
    navigate('home');
  };

  const navigateToBlogPost = (postId: string) => {
    setSelectedBlogPostId(postId);
    navigate('blog-post', { id: postId });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'about':
      case 'vision-mission':
      case 'history':
      case 'team':
      case 'partners':
        return <About section={currentPage} onNavigate={navigate} />;
      case 'programs':
      case 'social-service':
      case 'consult':
      case 'ventures':
      case 'economic-empowerment':
      case 'education':
      case 'micro-credit':
      case 'projects':
        return <Programs section={currentPage} onNavigate={navigate} />;
      case 'blog':
        return <Blog onNavigate={navigate} onSelectPost={navigateToBlogPost} />;
      case 'blog-post':
        return <BlogPost postId={selectedBlogPostId} onNavigate={navigate} />;
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
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={navigate}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}