import './SellMyReborn.scss';
import { useState } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function SellMyReborn() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    kit_name: '',
    year: '',
    size: '',
    title: '',
    sculptor: '',
    type: '',
    weight: '',
    age_range: '',
    authenticity_card: '',
    price: '',
    shipping_fees: '',
    localization: '',
    belly_plate: '',
    gender: '',
    eyes: '',
    hair: '',
    description: '',
    status: '',
    photo: [],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const options = [
    'Or choose one here',
    'Adrie Stoete',
    'AK Kitagawa',
    'Alicia Toner',
    'Andrea Arcello',
    'Angela Degner',
    'Ann Timmerman',
    'Antonio Sanchis',
    'Arika Lee',
    'Ashten Bryant',
    'Asia Eriksen',
    'Bonnie Brown',
    'Bonnie Leah Sieben',
    'Brit Klinger',
    'Cassie Brace',
    'Christa Götzen',
    'Cindy Musgrove',
    'Claire Taylor',
    'Conny Burke',
    'Dawn Donofrio',
    'Dawn McLeod',
    'Dianna Effner',
    'Didy Jacobsen',
    'Doris M Hornbogen',
    'Ebtehal Abul',
    'Elisa Marx',
    'Elly Knoops',
    'Eva Brilli',
    'Evelina Wosnjuk',
    'Francesca Figa',
    'Gudrun Legler',
    'Heike Kolpin',
    'Ina Volprich',
    'Irina Kaplanskaya',
    'Iris Klement',
    'Iveta Eckertova',
    'Jamie Lynn Powers',
    'Jannie de Lange',
    'Joanna Kazmierczak',
    'Jodie Lombardo',
    'Joe Bailey',
    'Jorja Pigott',
    'Julia Homa',
    'Karola Wegerich',
    'Kyla Janell',
    'Laura Lee Eagles',
    'Laura Tuzio Ross',
    'Lauren Jaimes',
    'Lenka P Hucinova',
    'Lilianne Breedveld',
    'Lilly Gold',
    'Linda Murray',
    'Linde Scherer',
    'Lisa Stone',
    'Lorna Miller-Sands',
    'Lorraine Yophi',
    'Lucie Boiron',
    'Maisa Said',
    'Manuela Bertocchi',
    'Marita Winters',
    'Mayra Garza',
    'Melanie Gebhardt',
    'Melody Hess',
    'Menna Hartog',
    'Merina Zeglarski',
    'Natali Blick',
    'Nicoleta Carmanschi',
    'Nikki Johnston',
    'Nikol Maris',
    'Noemi Smith',
    'Olga Auer',
    'Olga Tschenskaja',
    'Petra Lechner',
    'Petra Seiffert',
    'Ping Lau',
    'Priscila Lopez',
    'Rachel Smith',
    'Regina Swialkowski',
    'Reva Schick',
    'Ruth Aguilar',
    'Ruth Annette',
    'Sabine Altenkirch',
    'Sabine Wegner',
    'Sabrina Hergarten',
    'Sandy Faber',
    'Sarah Mellman',
    'Sebilla Bos',
    'Severine Piret',
    'Shawna Clymer',
    'Sheila Michael',
    'Shelley Marie',
    'Sherry Rawn',
    'Shy Mrofka',
    'Sigrid Bock',
    'Sigrun Heck',
    'Stephanie Sullivan',
    'Susanne Goeschl',
    'Suzette du Plessis',
    'Tay Freitas',
    'Teresa De Castro',
    'Tiffany Campbell',
    'Tina Kewy',
    'Tove Magnusson',
    'Ulrike Gall',
    'Vicente Vidal',
    'Vincenzina Care',
    'Viviane Aleluia',
    'Other',
  ];
  const handleSearchScuptor = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Si le terme de recherche est vide, afficher toutes les options
    if (value.trim() === '') {
      setFilteredOptions(options);
    } else {
      // Sinon, filtrer les options en fonction de la saisie de l'utilisateur
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Si le champ est un fichier, stockez le fichier lui-même dans l'état
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files,
      });
      console.log(`Files for ${name}:`, e.target.files);
    } else {
      setFormData((prevFormData) => {
        // Utilisez Object.keys() pour obtenir les clés de l'objet
        const formDataCopy = { ...prevFormData };

        // Vérifiez si la clé existe avant de mettre à jour
        if (Object.keys(formDataCopy).includes(name)) {
          formDataCopy[name] = value;
        }

        return formDataCopy;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      const formDataForServer = new FormData();

      // Append each form field to FormData
      const keys = Object.keys(formData);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === 'photo') {
          const files = formData[key];
          for (let j = 0; j < files.length; j++) {
            formDataForServer.append(key, files[j]);
          }
        } else {
          formDataForServer.append(key, formData[key]);
        }
      }

      const response = await fetch(`http://localhost:3000/product/${user.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataForServer, // utilisation de formData comme corps de la requête
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create product. HTTP status: ${response.status}`
        );
      }

      // afficher produit créé en console
      setMessage('Congratulations! Your product has been created.');
      console.log('Form Data:', formData);
    } catch (error) {
      setMessage('Failed to create product. Please try again.');
      console.error('Failed to create product', error.message);
    }
  };
  return (
    <div>
      <h3>Sell your reborn</h3>
      {message && (
        <p
          className={`message ${
            message.includes('Error') ? 'error' : 'success'
          }`}
        >
          {message}
        </p>
      )}
      <div className="sell__box">
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
          className="sell__container"
        >
          <div className="sell__wrapper">
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              accept="image/*"
              multiple
              className="larger-input"
            />

            <div className="sell__col1">
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="larger-input"
              />
              <input
                type="text"
                name="kit_name"
                id="kitname"
                value={formData.kit_name}
                onChange={handleChange}
                placeholder="Name of the kit"
                className="larger-input"
              />
              <input
                type="number"
                name="year"
                id="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Creation Year"
                className="larger-input"
              />
              <input
                type="text"
                name="size"
                id="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Size (in inches)"
                className="larger-input"
              />
              <input
                type="text"
                name="weight"
                id="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight (in pounds)"
                className="larger-input"
              />
              <input
                type="text"
                name="localization"
                id="localization"
                value={formData.localization}
                onChange={handleChange}
                placeholder="Location"
                className="larger-input"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchScuptor}
                placeholder="Filter the sculptor results"
              />

              {/* Utilisez les options filtrées pour le select */}
              <select
                name="sculptor"
                id="sculptor"
                value={formData.sculptor}
                onChange={handleChange}
                className="larger-input"
              >
                {filteredOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* <select
                name="sculptor"
                id="sculptor"
                value={formData.sculptor}
                onChange={handleChange}
                className="larger-input"
                placeholder="Sculptor of the kit"
              >
                <option value="choose">Choose a sculptor</option>
                {filteredOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))} */}
              {/* <option value="choose">Choose a sculptor</option>
                <option value="Adrie Stoete">Adrie Stoete</option>
                <option value="AK Kitagawa">AK Kitagawa</option>
                <option value="Alicia Toner">Alicia Toner</option>
                <option value="Andrea Arcello">Andrea Arcello</option>
                <option value="Angela Degner">Angela Degner</option>
                <option value="Ann Timmerman">Ann Timmerman</option>
                <option value="Antonio Sanchis">Antonio Sanchis</option>
                <option value="Arika Lee">Arika Lee</option>
                <option value="Ashten Bryant">Ashten Bryant</option>
                <option value="Asia Eriksen">Asia Eriksen</option>
                <option value="Bonnie Brown">Bonnie Brown</option>
                <option value="Bonnie Leah Sieben">Bonnie Leah Sieben</option>
                <option value="Brit Klinger">Brit Klinger</option>
                <option value="Cassie Brace">Cassie Brace</option>
                <option value="Christa Götzen">Christa Götzen</option>
                <option value="Cindy Musgrove">Cindy Musgrove</option>
                <option value="Claire Taylor">Claire Taylor</option>
                <option value="Conny Burke">Conny Burke</option>
                <option value="Dawn Donofrio">Dawn Donofrio</option>
                <option value="Dawn McLeod">Dawn McLeod</option>
                <option value="Dianna Effner">Dianna Effner</option>
                <option value="Didy Jacobsen">Didy Jacobsen</option>
                <option value="Doris M Hornbogen">Doris M Hornbogen</option>
                <option value="Ebtehal Abu">Ebtehal Abu</option>
                <option value="Elisa Marx">Elisa Marx</option>
                <option value="Elly Knoops">Elly Knoops</option>
                <option value="Eva Brilli">Eva Brilli</option>
                <option value="Evelina Wosnjuk">Evelina Wosnjuk</option>
                <option value="Francesca Figa">Francesca Figa</option>
                <option value="Gudrun Legler">Gudrun Legler</option>
                <option value="Heike Kolpin">Heike Kolpin</option>
                <option value="Ina Volprich">Ina Volprich</option>
                <option value="Irina Kaplanskaya">Irina Kaplanskaya</option>
                <option value="Iris Klement">Iris Klement</option>
                <option value="Iveta Eckertova">Iveta Eckertova</option>
                <option value="Jamie Lynn Powers">Jamie Lynn Powers</option>
                <option value="Jannie de Lange">Jannie de Lange</option>
                <option value="Joanna Kazmierczak">Joanna Kazmierczak</option>
                <option value="Jodie Lombardo">Jodie Lombardo</option>
                <option value="Joe Bailey">Joe Bailey</option>
                <option value="Jorja Pigott">Jorja Pigott</option>
                <option value="Julia Homa">Julia Homa</option>
                <option value="Karola Wegerich">Karola Wegerich</option>
                <option value="Kyla Janell">Kyla Janell</option>
                <option value="Laura Lee Eagles">Laura Lee Eagles</option>
                <option value="Lauren Jaimes">Lauren Jaimes</option>
                <option value="Lenka P Hucinova">Lenka P Hucinova</option>
                <option value="Lilianne Breedveld">Lilianne Breedveld</option>
                <option value="Lilly Gold">Lilly Gold</option>
                <option value="Linda Murray">Linda Murray</option>
                <option value="Linde Scherer">Linde Scherer</option>
                <option value="Lisa Stone">Lisa Stone</option>
                <option value="Lorna Miller-Sands">Lorna Miller-Sands</option>
                <option value="Lorraine Yophi">Lorraine Yophi</option>
                <option value="Lucie Boiron">Lucie Boiron</option>
                <option value="Maisa Said">Maisa Said</option>
                <option value="Manuela Bertocchi">Manuela Bertocchi</option>
                <option value="Marita Winters">Marita Winters</option>
                <option value="Mayra Garza">Mayra Garza</option>
                <option value="Melanie Gebhardt">Melanie Gebhardt</option>
                <option value="Melody Hess">Melody Hess</option>
                <option value="Menna Hartog">Menna Hartog</option>
                <option value="Merina Zeglarski">Merina Zeglarski</option>
                <option value="Natali Blick">Natali Blick</option>
                <option value="Nicoleta Carmanschi">Nicoleta Carmanschi</option>
                <option value="Nikki Johnston">Nikki Johnston</option>
                <option value="Nikol Maris">Nikol Maris</option>
                <option value="Noemi Smith">Noemi Smith</option>
                <option value="Olga Auer">Olga Auer</option>
                <option value="Olga Tschenskaja">Olga Tschenskaja</option>
                <option value="Petra Lechner">Petra Lechner</option>
                <option value="Petra Seiffert">Petra Seiffert</option>
                <option value="Ping Lau">Ping Lau</option>
                <option value="Priscila Lopez">Priscila Lopez</option>
                <option value="Rachel Smith">Rachel Smith</option>
                <option value="Regina Swialkowski">Regina Swialkowski</option>
                <option value="Reva Schick">Reva Schick</option>
                <option value="Ruth Aguilar">Ruth Aguilar</option>
                <option value="Ruth Annette">Ruth Annette</option>
                <option value="Sabine Altenkirch">Sabine Altenkirch</option>
                <option value="Sabine Wegner">Sabine Wegner</option>
                <option value="Sabrina Hergarten">Sabrina Hergarten</option>
                <option value="Sandy Faber">Sandy Faber</option>
                <option value="Sarah Mellman">Sarah Mellman</option>
                <option value="Sebilla Bos">Sebilla Bos</option>
                <option value="Severine Piret">Severine Piret</option>
                <option value="Shawna Clymer">Shawna Clymer</option>
                <option value="Sheila Michael">Sheila Michael</option>
                <option value="Shelley Marie">Shelley Marie</option>
                <option value="Sherry Rawn<">Sherry Rawn</option>
                <option value="Shy Mrofka">Shy Mrofka</option>
                <option value="Sigrid Bock">Sigrid Bock</option>
                <option value="Sigrun Heck">Sigrun Heck</option>
                <option value="Stephanie Sullivan">Stephanie Sullivan</option>
                <option value="Susanne Goeschl">Susanne Goeschl</option>
                <option value="Suzette du Plessis">Suzette du Plessis</option>
                <option value="Tay Freitas">Tay Freitas</option>
                <option value="Teresa De Castro">Teresa De Castro</option>
                <option value="Tiffany Campbell">Tiffany Campbell</option>
                <option value="Tina Kewy">Tina Kewy</option>
                <option value="Tove Magnusson">Tove Magnusson</option>
                <option value="Ulrike Gall">Ulrike Gall</option>
                <option value="Vicente Vida">Vicente Vida</option>
                <option value="Vincenzina Care">Vincenzina Care</option>
                <option value="Viviane Aleluia">Viviane Aleluia</option> */}
              {/* </select> */}
              <input
                type="text"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="larger-input"
              />
              <input
                type="text"
                name="shipping_fees"
                id="fees"
                placeholder="Shipping fees"
                value={formData.shipping_fees}
                onChange={handleChange}
                className="larger-input"
              />
            </div>
            <div className="sell__col2">
              <select
                name="belly_plate"
                id="authenticity"
                value={formData.belly_plate}
                onChange={handleChange}
                className="larger-input"
              >
                <option value="auth">Belly plate?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="larger-input"
              >
                <option value="gen">Gender</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
                <option value="non-gendered">Non gendered</option>
              </select>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="larger-input"
              >
                <option value="stat">Status</option>
                <option value="new">New</option>
                <option value="resell">Resell</option>
              </select>
              <select
                name="authenticity_card"
                id="authenticity_card"
                value={formData.authenticity_card}
                onChange={handleChange}
                className="larger-input"
              >
                <option value="auth">Authenticity card?</option>
                <option value="yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="larger-input"
              >
                <option value="material">Type</option>
                <option value="vinyl">Vinyl</option>
                <option value="silicone">Silicone</option>
                <option value="cuddle">Cuddle</option>
              </select>
              <select
                name="age_range"
                id="age"
                value={formData.age_range}
                onChange={handleChange}
                className="larger-input"
              >
                <option value="range">Age range</option>
                <option value="baby">Baby</option>
                <option value="toddler">Toddler</option>
              </select>
              <select
                name="eyes"
                id="eyes"
                value={formData.eyes}
                onChange={handleChange}
                className="larger-input"
              >
                <option value="feature">Eyes</option>
                <option value="blue">Blue</option>
                <option value="brown">Brown</option>
                <option value="green">Green</option>
                <option value="other">Other</option>
                <option value="closed">Closed</option>
              </select>
              <select
                name="hair"
                id="hair"
                value={formData.hair}
                onChange={handleChange}
                className="larger-input"
              >
                <option value="detail">Hair</option>
                <option value="painting">Hair painting</option>
                <option value="brown">Brown hair</option>
                <option value="blonde">Blonde hair</option>
                <option value="red">Red hair</option>
                <option value="other">Other</option>
                <option value="black">Black</option>
                <option value="bald">Bald</option>
              </select>
            </div>
          </div>
          <div className="sell__col3">
            <textarea
              placeholder="Description..."
              name="description"
              id="desc"
              width="300px"
              maxLength="250"
              style={{ resize: 'none', height: '150px', width: '300px' }}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="sell__btn">
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
