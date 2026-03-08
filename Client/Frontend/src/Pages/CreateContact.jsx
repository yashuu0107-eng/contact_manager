import React, { useState ,useEffect} from "react";
import "./CreateForm.css"; // Create a corresponding CSS file for styling

const CreateForm = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    code: "+1", // Default country code
    email: "",
  });
  const [countryChange, setCountryChange] = useState("");
  const [countries, setCountries] = useState([]);
  const [Countrycode, setCountryCode] = useState("");
  useEffect(() => {
    fetch("https://countrynamewithphonecode.onrender.com/")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch countries');
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setCountries([]); // Set to empty array on error
      });
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.email || !formData.code) {
      alert('Please fill in all fields.');
      return;
    }
    onCreate(formData);
    onClose();
  };



  const handleCountrycodechange = (e) => {
    const valueSelected = e.target.value;
    setCountryChange(valueSelected);
    const countryData = countries.find(
      (country) => country.name === valueSelected
    );

    if (countryData) {
      setCountryCode(countryData.code);
      // Update the formData with the selected country code
      setFormData({ ...formData, code: countryData.code });
    } else {
      setCountryCode("");
    }
  };
  return (
    <div className="create-form-container">
      <div className="create-form">
        <h2>Create Contact</h2>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
         <label htmlFor="code">Country Code:</label>
        <select onChange={handleCountrycodechange} value={countryChange}>
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option value={country.name} key={country._id}>
              {country.name}
            </option>
          ))}
        </select>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <div className="button-container">
          <button className="create-button" onClick={handleSubmit}>
            Create
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
