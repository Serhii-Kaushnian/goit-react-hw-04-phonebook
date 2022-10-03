import { Form, Label, Input, ClearButton } from './Filter.styled';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';

export default function Filter({ clearFilter, filterChange, filterValue }) {
  return (
    <div>
      <Form>
        <Label>
          Find contact by name
          <Input
            onChange={filterChange}
            type="text"
            name="filter"
            value={filterValue}
          />
        </Label>
        <ClearButton onClick={clearFilter} type="button">
          <FaTrashAlt />
        </ClearButton>
      </Form>
    </div>
  );
}

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};
