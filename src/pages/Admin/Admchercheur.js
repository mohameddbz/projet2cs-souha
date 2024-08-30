import React, { useState , useEffect  } from 'react';
import PropTypes from 'prop-types';
import './Admchercheur.css';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarChercheur';
import { FaPen } from 'react-icons/fa';

function Admin2(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [sections, setSections] = useState([]);
  const [userExists, setUserExists] = useState(false);
  const [initialData, setInitialData] = useState(null);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await fetch('http://localhost:8000/user/', {
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await response.json();
        setFirstName(userData.first_name || '');
        setLastName(userData.family_name || '');
  

        const annuaireResponse = await fetch(`${process.env.REACT_APP_API_URL}/annuaire/enseignant/${userData.family_name}/${userData.first_name}/`, {
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`,
          },
        });
  
        if (annuaireResponse.ok) {
          const annuaireData = await annuaireResponse.json();
          setUserExists(true);
          setPhoneNumber(annuaireData.contact || '');
          setEmail(annuaireData.email || '');
          setLinkedin(annuaireData.linkedin || '');
          setDescription(annuaireData.description || '');
          setType(annuaireData.grade || '');
  
          setInitialData({
            firstName: userData.first_name || '',
            lastName: userData.family_name || '',
            phoneNumber: annuaireData.contact || '',
            email: annuaireData.email || '',
            linkedin: annuaireData.linkedin || '',
            description: annuaireData.description || '',
            type: annuaireData.grade || '',
          });
  
  
          const existingPublicationResponse = await fetch(`${process.env.REACT_APP_API_URL}/publication/searchall/?publisher=${userData.id}&type_publication=chercheur_profile`, {
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`,
            },
          });
  
          let publicationData;
          let publicationExists = false;
  
          if (existingPublicationResponse.ok) {
            const publications = await existingPublicationResponse.json();
            if (publications.length > 0) {
              publicationData = publications[0];
              publicationExists = true;
            }
          }
  
          if (publicationExists) {
            const sectionsResponse = await fetch(`${process.env.REACT_APP_API_URL}/publication/sections/${publicationData.id_publication}/`, {
              headers: {
                'Authorization': `token ${localStorage.getItem('token')}`,
              },
            });
  
            if (sectionsResponse.ok) {
              const sectionsData = await sectionsResponse.json();
              setSections(sectionsData);
            }
          }
        } else {
          setUserExists(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
  };

  const handleCancel = () => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setPhoneNumber(initialData.phoneNumber);
      setDescription(initialData.description);
      setSelectedFile(null);
      setType(initialData.type);
      setEmail(initialData.email);
      setLinkedin(initialData.linkedin);
      setSections([]);
    } else {
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setDescription('');
      setSelectedFile(null);
      setType('');
      setEmail('');
      setLinkedin('');
      setSections([]);
    }
  };
  

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { titre: '', contenu: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
  
    
      const userResponse = await fetch(`http://localhost:8000/user/`, {
        headers: {
          'Authorization': `token ${token}`,
        },
      });
  
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await userResponse.json();
      const userId = userData.id;
  
    
      const existingPublicationResponse = await fetch(`${process.env.REACT_APP_API_URL}/publication/searchall/?publisher=${userId}&type_publication=chercheur_profile`, {
        headers: {
          'Authorization': `token ${token}`,
        },
      });
  
      let publicationData;
      let publicationExists = false;
  
      if (existingPublicationResponse.ok) {
        const publications = await existingPublicationResponse.json();
        if (publications.length > 0) {
          publicationData = publications[0];
          publicationExists = true;
        }
      }
  
      const publicationFormData = new FormData();
      publicationFormData.append('titre', `Profil de ${firstName} ${lastName}`);
      publicationFormData.append('description', description);
      publicationFormData.append('type_publication', 'chercheur_profile');
      publicationFormData.append('etat', 'valide');
      if (selectedFile) {
        publicationFormData.append('image', selectedFile);
      }
  
      if (publicationExists) {
       
        const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/publication/${publicationData.id_publication}/`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            titre: publicationData.titre,
            description: description,
            type_publication: publicationData.type_publication,
            etat: publicationData.etat,
            publisher: publicationData.publisher 
          }),
        });
  
        if (!updateResponse.ok) {
          const errorData = await updateResponse.json();
        console.error('Update error details:', errorData);
          throw new Error('Failed to update publication');
        }
  
        console.log('Publication updated successfully');
      } else {
        const createResponse = await fetch(`${process.env.REACT_APP_API_URL}/publication/add/`, {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
          },
          body: publicationFormData,
        });
  
        if (!createResponse.ok) {
          throw new Error('Failed to create publication');
        }
  
        publicationData = await createResponse.json();
        console.log('Publication created successfully');
      }
  
      // Fetch existing sections if updating
      let existingSections = [];
      if (publicationExists) {
        const sectionsResponse = await fetch(`${process.env.REACT_APP_API_URL}/publication/sections/${publicationData.id_publication}/`, {
          headers: {
            'Authorization': `token ${token}`,
          },
        });
  
        if (sectionsResponse.ok) {
          existingSections = await sectionsResponse.json();
        }
      }
  
 
      for (const section of sections) {
        const sectionData = {
          titre: section.titre,
          contenu: section.contenu,
          publication_id: publicationData.id_publication,
        };
  
        const existingSection = existingSections.find(s => s.titre === sectionData.titre);
        if (existingSection) {
         
          const sectionResponse = await fetch(`${process.env.REACT_APP_API_URL}/section/${existingSection.id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${token}`,
            },
            body: JSON.stringify(sectionData),
          });
  
          if (!sectionResponse.ok) {
            
            throw new Error('Failed to update section');
          }
        } else {
    
          const sectionResponse = await fetch(`${process.env.REACT_APP_API_URL}/sections/create/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${token}`,
            },
            body: JSON.stringify(sectionData),
          });
  
          if (!sectionResponse.ok) {
            throw new Error('Failed to create section');
          }
        }
      }
  
      alert('Form submitted successfully!');
  
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error: ${error.message}`);
    }
  };
  const imagePreviewUrl = selectedFile ? URL.createObjectURL(selectedFile) : '';

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarPub />
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Créer un chercheur</h1>
        </div>

    
        <div className="AdminInputGroup">
          <div className="AdminInputContainer">
            <label className="AdminLabel">Photo de Profil</label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {!selectedFile ? (
              <button type="button" className="upload-button" onClick={handleIconClick}>
                Télécharger une photo
              </button>
            ) : (
              <div className="image-preview-container1">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Prévisualisation"
                className="image-preview"
              />
              <div className="image-buttons-container">
                <button
                  type="button"
                  className="edit-photo-button"
                  onClick={handleIconClick}
                >
                  <FaPen />
                </button>
                <button
                  type="button"
                  className="remove-photo-button"
                  onClick={handleRemoveImage}
                >
                  X
                </button>
              </div>
            </div>
            
            )}
          </div>
        </div>


        <div className="AdminInputGroup">
          <div className="AdminInputContainer half-width">
            <label className="AdminLabel">Prénom*</label>
            <input
              type="text"
              className="AdminInput"
              placeholder="Ecrivez votre prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="AdminInputContainer half-width">
            <label className="AdminLabel">Nom*</label>
            <input
              type="text"
              className="AdminInput"
              placeholder="Ecrivez votre nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="AdminInputGroup">
          <div className="AdminInputContainer half-width">
            <label className="AdminLabel">Téléphone*</label>
            <input
              type="tel"
              className="AdminInput"
              placeholder="Ecrivez votre numéro de téléphone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="AdminInputContainer half-width">
            <label className="AdminLabel">Email*</label>
            <input
              type="email"
              className="AdminInput"
              placeholder="Ecrivez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="AdminInputGroup">
          <div className="AdminInputContainer">
            <label className="AdminLabel">LinkedIn*</label>
            <input
              type="url"
              className="AdminInput"
              placeholder="Lien vers votre profil LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
        </div>

        <div className="AdminInputGroup">
          <div className="AdminInputContainer">
            <label className="AdminLabel">Grade*</label>
            <select
  className="AdminInput"
  value={type}
  onChange={(e) => setType(e.target.value)}
>
  <option value="">Sélectionner un type</option>
  <option value="maître de conférences B">Maître de conférences B</option>
  <option value="maître de conférences A">Maître de conférences A</option>
  <option value="professeur">Professeur</option>
</select>
          
          </div>
        </div>

        <div className="AdminInputGroup">
          <div className="AdminInputContainer">
            <label className="AdminLabel">Description*</label>
            <textarea
              className="AdminInput"
              placeholder="Ecrivez une description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="AdminInputGroup">
          <div className="AdminInputContainer">
            <label className="AdminLabel">Sections personnalisées</label>
            {sections.map((section, index) => (
              <div key={index} className="section-input-group">
                <input
                  type="text"
                  className="AdminInput"
                  placeholder="Titre de la section"
                  value={section.titre}
                  onChange={(e) => handleSectionChange(index, 'titre', e.target.value)}
                />
                <textarea
                  className="AdminInput"
                  placeholder="Contenu de la section"
                  value={section.contenu}
                  onChange={(e) => handleSectionChange(index, 'contenu', e.target.value)}
                />
              </div>
            ))}
            <button type="button" className="add-section-button" onClick={handleAddSection}>
              Ajouter une section
            </button>
          </div>
        </div>

       
        <div className="AdminInputGroup">
          <div className="AdminInputContainer">
            <button type="button" className="submit-button" onClick={handleSubmit}>
              Soumettre
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Admin2.propTypes = {
  title: PropTypes.string,
};

Admin2.defaultProps = {
  title: '',
};

export default Admin2;

