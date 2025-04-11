import React, { useEffect, useState } from 'react';
import { getAllCompanies, deleteCompanyById } from '../../services/companys';
import { useNavigate } from 'react-router-dom';
import type { Company } from '@/shared/types/db-models';
import ConfirmModal from '../common/ConfirmModal';
import styles from './CompanyStyles.module.scss';
import InspirationSection from '../common/InspirationSection';
import { useAuth } from '../../context/AuthContext';

const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        setCompanies(data);
      } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
          // Redirigir a login si el token es inválido
          logout();
          navigate('/login');
        }
        setError('Error loading companies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [logout, navigate]);

  // Filter companies based on the logged-in user's ID
  const filteredCompanies = user 
    ? companies.filter(company => company.userId === user?.id)
    : [];

  const handleDelete = (company: Company) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!companyToDelete || !companyToDelete.id) return;

    setDeletingId(companyToDelete.id);
    try {
      await deleteCompanyById(companyToDelete.id.toString());
      setCompanies(companies.filter(c => c.id !== companyToDelete.id));
    } catch (err) {
      setError('Error al eliminar la empresa');
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setCompanyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCompanyToDelete(null);
  };

  if (loading) {
    return <div className={styles.loading}>Loading companies...</div>;
  }

  if (error) {
    return <div className={styles.errorText}>{error}</div>;
  }

  if (!user) {
    return (
      <div className={styles.authMessage}>
        You must be logged in to view your companies.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <InspirationSection />
      <div className={styles.companiesHeader}>
        <h1 className={styles.formTitle}>My Companies</h1>
        <button 
          className={styles.addButton}
          onClick={() => navigate('/companies/add')}
        >
          Add Company
        </button>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className={styles.noCompanies}>
          You don't have any registered companies. Click "Add Company" to create a new one.
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tax ID</th>
                <th>Address</th>
                <th>Industrial Sector</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.companyName}</td>
                  <td>{company.taxId}</td>
                  <td>{company.address}</td>
                  <td>{company.industrialSector}</td>
                  <td className={styles.actionsCell}>
                    <button 
                      className={styles.viewButton}
                      onClick={() => navigate(`/companies/${company.id}`)}
                    >
                      View
                    </button>
                    <button 
                      className={styles.editButton}
                      onClick={() => navigate(`/companies/${company.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(company)}
                      disabled={deletingId === company.id}
                    >
                      {deletingId === company.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Eliminar Empresa"
        message={`¿Estás seguro de que deseas eliminar la empresa "${companyToDelete?.companyName}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default CompanyList; 