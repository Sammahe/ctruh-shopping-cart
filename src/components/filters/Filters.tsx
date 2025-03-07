import "./Filters.css";
import { FilterTypes } from "../../types/product";
import CloseIcon from "../../assets/close.svg";

interface FilterPropsType {
  filterCategories: FilterTypes;
  selectedFilters: FilterTypes;
  setSelectedFilters: (selectedFilters: FilterTypes) => void;
}
function Filters({
  filterCategories,
  selectedFilters,
  setSelectedFilters,
}: FilterPropsType) {
  const updateFilterArray = (
    array: string[],
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      if (!array.includes(value)) array.push(value);
    } else {
      const index = array.indexOf(value);
      if (index !== -1) array.splice(index, 1);
    }
  };

  const handleFilterUpdate = (
    filterEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = filterEvent.target;

    if (name === "priceRange") {
      const [start, end] = value.split("-").map(Number);
      const existingRange = selectedFilters.priceRange.some(
        (range) => range.start === start && range.end === end
      );

      if (checked && !existingRange) {
        selectedFilters.priceRange.push({ start, end });
      } else if (!checked && existingRange) {
        selectedFilters.priceRange = selectedFilters.priceRange.filter(
          (range) => range.start !== start || range.end !== end
        );
      }
    } else if (checked) {
      switch (name) {
        case "gender":
          updateFilterArray(selectedFilters.gender, value, checked);
          break;
        case "color":
          updateFilterArray(selectedFilters.color, value, checked);
          break;
        case "type":
          updateFilterArray(selectedFilters.type, value, checked);
          break;
      }
    } else {
      switch (name) {
        case "gender":
          updateFilterArray(selectedFilters.gender, value, checked);
          break;
        case "color":
          updateFilterArray(selectedFilters.color, value, checked);
          break;
        case "type":
          updateFilterArray(selectedFilters.type, value, checked);
          break;
      }
    }

    setSelectedFilters({ ...selectedFilters });
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <h3>Filters</h3>
      </div>

      {filterCategories?.color?.length ? (
        <div className="filter-category">
          <h4>Colour</h4>
          {filterCategories?.color.map((eachColor) => {
            return (
              <label key={`${eachColor}-label`}>
                <input
                  key={`${eachColor}-input`}
                  type="checkbox"
                  name="color"
                  value={eachColor}
                  onChange={handleFilterUpdate}
                />{" "}
                {eachColor}
              </label>
            );
          })}
        </div>
      ) : null}

      {filterCategories?.gender?.length ? (
        <div className="filter-category">
          <h4>Gender</h4>
          {filterCategories?.gender.map((genderValue) => {
            return (
              <label key={`${genderValue}-label`}>
                <input
                  key={`${genderValue}-input`}
                  type="checkbox"
                  name="gender"
                  value={genderValue}
                  onChange={handleFilterUpdate}
                />{" "}
                {genderValue}
              </label>
            );
          })}
        </div>
      ) : null}

      {filterCategories?.priceRange?.length ? (
        <div className="filter-category">
          <h4>Price Range</h4>

          {filterCategories?.priceRange.map((range) => {
            return (
              <label key={`${range.start}-label`}>
                <input
                  key={`${range.start}-input`}
                  type="checkbox"
                  name="priceRange"
                  value={`${range.start}-${range.end}`}
                  onChange={handleFilterUpdate}
                />{" "}
                {`Rs. ${range.start}- Rs. ${range.end}`}
              </label>
            );
          })}
        </div>
      ) : null}

      {filterCategories?.type?.length ? (
        <div className="filter-category">
          <h4>Type</h4>
          {filterCategories?.type.map((typeValue) => {
            return (
              <label key={`${typeValue}-label`}>
                <input
                  key={`${typeValue}-input`}
                  type="checkbox"
                  name="type"
                  value={typeValue}
                  onChange={handleFilterUpdate}
                />{" "}
                {typeValue}
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Filters;
