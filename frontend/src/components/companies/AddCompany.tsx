import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CompanyStyles.module.scss';
import InspirationSection from '../common/InspirationSection';
import useCompanyForm from '../../hooks/useCompanyForm';
import { useAuth } from '../../context/AuthContext';

const AddCompany: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    formData,
    loading,
    error,
    isEditMode,
    handleChange,
    handleSubmit
  } = useCompanyForm();

  if (!isAuthenticated) {
    return (
      <div className={styles.authMessage}>
        You must be logged in to {isEditMode ? 'edit' : 'add'} a company.
      </div>
    );
  }

  if (loading) {
    return <div className={styles.loading}>Loading company data...</div>;
  }

  if (error) {
    return <div className={styles.errorText}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <InspirationSection />
      <h1 className={styles.formTitle}>{isEditMode ? 'Edit Company' : 'Add New Company'}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>General Company Information</legend>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Ex: XYZ Company Ltd."
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="taxId">Tax ID</label>
              <input
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                required
                placeholder="Ex: B12345678"
              />
            </div>
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Ex: 123 Main Street, 28001 Madrid"
            />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Description of Activities</legend>
          <div className={styles.formGroup}>
            <label htmlFor="industrialSector">Industrial Sector</label>
            <input
              type="text"
              id="industrialSector"
              name="industrialSector"
              value={formData.industrialSector}
              onChange={handleChange}
              required
              placeholder="Ex: Technology, Manufacturing, Services"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="relatedActivitiesDescription">Related Activities Description</label>
            <textarea
              id="relatedActivitiesDescription"
              name="relatedActivitiesDescription"
              value={formData.relatedActivitiesDescription}
              onChange={handleChange}
              required
              placeholder="Describe the main activities of the company..."
              rows={4}
            />
          </div>
        </fieldset>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            {isEditMode ? 'Update Company' : 'Create Company'}
          </button>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompany;