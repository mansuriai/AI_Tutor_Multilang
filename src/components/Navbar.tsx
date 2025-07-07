
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, User, Bot } from "lucide-react";
import { toast } from "sonner";
import { useAiTutor } from "@/contexts/AiTutorContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setIsOpen: setAiTutorOpen } = useAiTutor();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAnonymousLogin = () => {
    // Set a temporary anonymous user in localStorage
    localStorage.setItem('anonymousUser', 'true');
    toast.success(t('common.loggedInAnonymously'));
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-tutor-primary to-tutor-secondary flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="text-xl font-display font-bold">{t('common.aiTutor')}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-tutor-primary transition">{t('nav.home')}</Link>
          <Link to="/subjects" className="text-gray-600 hover:text-tutor-primary transition">{t('nav.subjects')}</Link>
          <Link to="/community" className="text-gray-600 hover:text-tutor-primary transition">{t('nav.community')}</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-tutor-primary transition">{t('nav.dashboard')}</Link>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setAiTutorOpen(true)}
              >
                <Bot size={18} />
                {t('nav.askAiTutor')}
              </Button>
              <Button variant="ghost" onClick={() => {
                localStorage.removeItem('anonymousUser');
                setIsLoggedIn(false);
                toast.success(t('common.loggedOut'));
                navigate("/");
              }}>{t('nav.logout')}</Button>
              <Link to="/dashboard">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={handleAnonymousLogin}
              >
                {t('nav.tryAnonymously')}
              </Button>
              <Link to="/auth">
                <Button>{t('nav.signIn')}</Button>
              </Link>
            </div>
          )}
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-3 border-b">
          <Link to="/" className="text-gray-600 hover:text-tutor-primary transition p-2">{t('nav.home')}</Link>
          <Link to="/subjects" className="text-gray-600 hover:text-tutor-primary transition p-2">{t('nav.subjects')}</Link>
          <Link to="/community" className="text-gray-600 hover:text-tutor-primary transition p-2">{t('nav.community')}</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-tutor-primary transition p-2">{t('nav.dashboard')}</Link>
              <Button 
                variant="outline"
                className="flex items-center gap-2 justify-start"
                onClick={() => {
                  setAiTutorOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <Bot size={18} />
                {t('nav.askAiTutor')}
              </Button>
              <Button variant="outline" onClick={() => {
                localStorage.removeItem('anonymousUser');
                setIsLoggedIn(false);
                toast.success(t('common.loggedOut'));
                navigate("/");
              }} className="justify-start">{t('nav.logout')}</Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={handleAnonymousLogin} 
                className="w-full mb-2"
              >
                {t('nav.tryAnonymously')}
              </Button>
              <Link to="/auth" className="w-full">
                <Button className="w-full">{t('nav.signIn')}</Button>
              </Link>
            </>
          )}
          <div className="px-2">
            <LanguageSelector />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
