import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../../services/companys';
import { Company, User } from '@/shared/types/db-models';
import { useUser } from '../../hooks/useUser';
import {EmissionsImport} from '../EmissionsImport';
import EmissionsChart from '../emissionsChart/EmissionsChart';
import styles from './CompanyStyles.module.scss';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getCompanyById(id);
        setCompany(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading company details. Please try again.');
        setLoading(false);
        console.error('Error loading company details:', err);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading company details...</div>;
  }

  if (error) {
    return <div className={styles.errorText}>{error}</div>;
  }

  if (!company) {
    return <div className={styles.errorText}>Company not found</div>;
  }

  if (!user) {
    return (
      <div className={styles.authMessage}>
        You must be logged in to view company details.
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailHeader}>
        <h1 className={styles.detailTitle}>Company Information</h1>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      <div className={styles.detailSection}>
        <div className={styles.infoItem}>
          <h3>Company name</h3>
          <p>{company.companyName}</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Tax Identification Number</h3>
          <p>{company.taxId}</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Address & Location</h3>
          <p>{company.address}</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Contact Person & Communication Details</h3>
          <p>Name: {user && user.name ? `${user.name} ${user.lastname || ''}` : 'N/A'}</p>
          <p>Email: {user?.email || 'N/A'}</p>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.detailSection}>
        <h2 className={styles.sectionTitle}>Operational Profile</h2>
        <div className={styles.infoItem}>
          <h3>Industry Sector</h3>
          <p>{company.industrialSector}</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Description of Marine-Related Activities</h3>
          <p>{company.relatedActivitiesDescription}</p>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.detailSection}>
        <h2 className={styles.sectionTitle}>Emissions and Discharge Data</h2>
        <div className={styles.constructionBox}>
          <EmissionsImport />
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.detailSection}>
        <h2 className={styles.sectionTitle}>Line Chart for Monthly Solvent Emissions</h2>
        <div className={styles.constructionBox}>
          <EmissionsChart />
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.detailSection}>
        <h2 className={styles.sectionTitle}>Blue Seal of Transparency</h2>
        <p className={styles.sealText}>
          Earn the Blue Seal of Transparency and demonstrate your commitment to reducing marine pollution. 
          By participating in this initiative, your company contributes to a healthier ocean and gains recognition 
          for its sustainable efforts. Transparency and accountability are key to making a real difference—join us 
          and become a leader in environmental responsibility!
        </p>
        <div className={styles.sealImageContainer}>
          <img 
            src="/BlueSealOfTransparency2.png" 
            alt="Blue Seal of Transparency" 
            className={styles.sealImage}
          />
        </div>
        
        <div className={styles.exportSection}>
          <h3>Export Blue Seal to Your Website</h3>
          <p>Share your commitment to marine conservation by displaying the Blue Seal on your website.</p>
          
          <div className={styles.exportOptions}>
            <div className={styles.exportOption}>
              <h4>HTML Code</h4>
              <div className={styles.codeBox}>
                <code>{`<a href="https://thesea.org/companies/${company.id}" target="_blank" rel="noopener noreferrer">
  <img src="https://thesea.org/BlueSealOfTransparency2.png" alt="Blue Seal of Transparency" width="200" />
</a>`}</code>
              </div>
              <button 
                className={styles.copyButton}
                onClick={() => {
                  const code = `<a href="https://thesea.org/companies/${company.id}" target="_blank" rel="noopener noreferrer">
  <img src="https://thesea.org/BlueSealOfTransparency2.png" alt="Blue Seal of Transparency" width="200" />
</a>`;
                  navigator.clipboard.writeText(code);
                  alert('HTML code copied to clipboard!');
                }}
              >
                Copy HTML Code
              </button>
            </div>
            
            <div className={styles.exportOption}>
              <h4>Direct Link</h4>
              <div className={styles.codeBox}>
                <code>https://thesea.org/companies/{company.id}</code>
              </div>
              <button 
                className={styles.copyButton}
                onClick={() => {
                  const link = `https://thesea.org/companies/${company.id}`;
                  navigator.clipboard.writeText(link);
                  alert('Link copied to clipboard!');
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail; 