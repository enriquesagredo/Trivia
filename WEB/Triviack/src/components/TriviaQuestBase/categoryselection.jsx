import PropTypes from 'prop-types';

const CategorySelection = ({ onSelectCategory }) => {
    const categories = ["Music", "Sport_and_leisure", "Film_and_tv", "Arts_and_literature", "History", "Society_and_culture", "Science", "Geography", "Food_and_drink", "General_knowledge"];
  
    return (
      <div className="header-container mt-5">
        <h2 className='subheader-text'>Select a Category</h2>
        <div className="buttons-container d-grid">
          {categories.map(category => (
            <button
              key={category}
              className={`btn category-button category-${category}`}
              onClick={() => onSelectCategory(category)}
            >
              {category.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  CategorySelection.propTypes = {
    onSelectCategory: PropTypes.func.isRequired,
  };