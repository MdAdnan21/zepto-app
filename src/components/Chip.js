
import React, { useState, useEffect } from 'react';
import  '../components/Chip.css'

const Chip = () => {
  // Updated sample data
  const initialData = [
    { name: 'maraina Augustine', gmail: 'gannopolus@gmail.com', image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/06/person-at-computer.jpeg.jpg' },
    { name: 'Adnan', gmail: 'addu@gmail.com', image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/06/software-engineer.jpeg.jpg' },
    { name: 'Aasim', gmail: 'newone@gmail.com', image: 'https://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg' },
    { name: 'Jane', gmail: 'React', image: 'https://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg' },
    { name: 'John', gmail: 'john@gmail.com', image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg' },
    { name: 'Doe', gmail: 'doe@gmail.com', image: 'https://thumbs.dreamstime.com/b/software-engineer-portrait-smiling-young-vietnamese-69422682.jpg' },
    // ... other data
  ];

  const [allSkills, setAllSkills] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setShowDropdown(searchTerm.trim().length > 0);
  }, [searchTerm]);

  const handleSkillSelect = (skill) => {
    setSelectedSkills([...selectedSkills, skill]); // Store the entire object
    setAllSkills(allSkills.filter(item => item.gmail !== skill.gmail));
    setSearchTerm('');
  };

  const handleChipRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
    const removedSkill = initialData.find(item => item.name === skill.name); // Adjusted to name property
    setAllSkills(currentSkills => [...currentSkills, removedSkill]);
  };

  const handleReset = () => {
    setSelectedSkills([]);
    setAllSkills(initialData);
  };

  const handleBackspace = () => {
    if (searchTerm === '' && selectedSkills.length > 0) {
      const lastSelectedSkill = selectedSkills[selectedSkills.length - 1];
      setSelectedSkills(selectedSkills.slice(0, -1));

      // Find the removed skill in the initial data
      const removedSkill = initialData.find(item => item.name === lastSelectedSkill.name);

      if (removedSkill) {
        setAllSkills(currentSkills => [...currentSkills, removedSkill]);
      }
    } else if (searchTerm === '' && selectedSkills.length === 0) {
      // Clear the input if backspace is pressed and no selected skills
      setSearchTerm('');
    }
  };

  return (
    <div className='Heading' style={{ textAlign: 'center' }}>
      <h1 className="users">Pick Users</h1>
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '3px solid blue', width: '95%', padding: '8px', margin: 'auto' }}>
        {selectedSkills.map(skill => (
          <div key={skill.gmail} style={{ display: 'inline-block', marginRight: '8px', marginBottom: '8px' }}>
            <button className="selectedSkill">
              <div className="imgBox">
                {/* Add your images here */}
                <img src={skill.image} alt="" className="image--cover" />
              </div>
              {skill.name} ({skill.gmail}) <span onClick={() => handleChipRemove(skill)}>X</span>
            </button>
          </div>
        ))}

        <input
          type="text"
          placeholder="Add new user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Backspace' && handleBackspace()}
          style={{
            border: 'none',
            borderRadius: '5px', // Added border-radius
            flex: 1,
            marginLeft: '8px',
            outline: 'none', // Remove the default focus outline
            padding: '8px', // Added padding
            margin: 'auto',
          }}
        />
        <button onClick={handleReset}>Reset</button>
      </div>

      {showDropdown && (
        <div style={{ position: 'absolute', zIndex: 1, background: 'white', border: '1px solid #ccc', listStyle: 'none', padding: 0 }}>
          <ul style={{ margin: 0, padding: 0 }}>
            {allSkills.map(item => (
              <li key={item.gmail} onClick={() => handleSkillSelect(item)}>
                <div className="imgBox">
                  {/* Add your images here */}
                  <img src={item.image} alt="" className="image--cover" />
                </div>
                {item.name} - {item.gmail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Chip;

