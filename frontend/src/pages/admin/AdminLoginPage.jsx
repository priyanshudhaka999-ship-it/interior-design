import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

const AdminLoginPage = () => {
  const { settings, adminUser, loginAdmin, loading } = useStudio();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = `Admin Authentication — ${settings.studioName}`;
    if (adminUser) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [adminUser, navigate, settings.studioName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Please enter your administrator email and password.');
      return;
    }

    const res = await loginAdmin(email, password);
    if (res.success) {
      toast.success('Authenticated into Atelier Vera Studio Portal.');
      navigate('/admin/dashboard', { replace: true });
    } else {
      toast.error(res.message || 'Authentication failed.');
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-16 bg-[#F7F5F0]">
      <div className="w-full max-w-md bg-[#FFFFFF] border border-[#DDD8CE] p-8 sm:p-10 space-y-6">
        <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-4">
          <div>
            <p className="font-serif text-xl tracking-[0.14em] text-[#292824]">
              {settings.studioName}
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#777C61]">
              Protected Admin Portal
            </p>
          </div>
          <Lock className="w-5 h-5 text-[#777C61]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#292824] mb-2">
              Administrator Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ateliervera.com"
              className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#DDD8CE] text-sm text-[#292824] focus:outline-none focus:border-[#777C61]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#292824] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#DDD8CE] text-sm text-[#292824] focus:outline-none focus:border-[#777C61]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-[0.18em] hover:bg-[#777C61] transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying Credentials...' : 'Sign In to Admin Dashboard'}
          </button>
        </form>

        <div className="bg-[#EAE5DC] border border-[#DDD8CE] p-4 space-y-2 text-xs text-[#77746D]">
          <div className="flex items-center justify-between text-[#292824] font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#777C61]" />
              Seeded Demo Environment Access
            </span>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@ateliervera.com');
                setPassword('AtelierVera@2026');
              }}
              className="underline text-[#777C61] hover:text-[#292824]"
            >
              Fill Seed Credentials
            </button>
          </div>
          <p>
            Public registration is disabled by architectural security policy. Initial admin accounts are provisioned via environment variables and <code className="text-[#292824]">npm run seed</code>.
          </p>
        </div>

        <div className="pt-2 border-t border-[#DDD8CE]">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#77746D] hover:text-[#292824]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Studio Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
