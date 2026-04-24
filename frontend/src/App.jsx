import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Copy, Check, RotateCcw, Send } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    productDescription: '',
    targetAudience: '',
    platform: 'Instagram Reel',
    tone: 'Trendy',
    language: 'English',
    duration: '16 sec',
    specialRequirements: ''
  });

  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setScript('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await axios.post(`${apiUrl}/generate-script`, formData);
      setScript(response.data.script);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <header>
        <h1>AdScript AI</h1>
        <p className="subtitle">Generate high-converting advertisement scripts in seconds</p>
      </header>

      <main className="main-content">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Business Name</label>
              <input
                type="text"
                name="businessName"
                placeholder="e.g. FreshBites Meal Prep"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Product/Service Description</label>
              <textarea
                name="productDescription"
                placeholder="What are you selling? (e.g. Healthy, chef-prepared meals delivered to your door)"
                rows="3"
                value={formData.productDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                placeholder="e.g. Busy professionals aged 25-40"
                value={formData.targetAudience}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Platform</label>
                <select name="platform" value={formData.platform} onChange={handleChange}>
                  <option>Instagram Reel</option>
                  <option>YouTube</option>
                  <option>TV Ad</option>
                  <option>Facebook Ad</option>
                  <option>TikTok</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tone</label>
                <select name="tone" value={formData.tone} onChange={handleChange}>
                  <option>Trendy</option>
                  <option>Emotional</option>
                  <option>Funny</option>
                  <option>Luxury</option>
                  <option>Mass</option>
                  <option>Corporate</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Language</label>
                <select name="language" value={formData.language} onChange={handleChange}>
                  <option>English</option>
                  <option>Telugu</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Kannada</option>
                  <option>Malayalam</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ad Duration</label>
                <select name="duration" value={formData.duration} onChange={handleChange}>
                  <option>8 sec</option>
                  <option>16 sec</option>
                  <option>24 sec</option>
                  <option>32 sec</option>
                  <option>40 sec</option>
                  <option>48 sec</option>
                  <option>56 sec</option>
                  <option>64 sec</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Special Requirements (Optional)</label>
              <input
                type="text"
                name="specialRequirements"
                placeholder="e.g. Mention the 20% discount code FRESH20"
                value={formData.specialRequirements}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="loader"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Script
                </>
              )}
            </button>
          </form>
        </div>

        <div className="card result-card">
          <div className="result-header">
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Generated Script</h3>
            {script && (
              <button className="copy-btn" onClick={copyToClipboard}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          <div className="script-output">
            {loading ? (
              <div className="placeholder-content">
                <Sparkles className="placeholder-icon" />
                <p>Crafting your perfect script...</p>
              </div>
            ) : script ? (
              <div>{script}</div>
            ) : error ? (
              <div style={{ color: '#ef4444', textAlign: 'center', marginTop: '2rem' }}>
                <p>{error}</p>
              </div>
            ) : (
              <div className="placeholder-content">
                <Send className="placeholder-icon" />
                <p>Fill the form and click generate to see your script here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
