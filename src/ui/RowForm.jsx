import styled from "styled-components";
import PropTypes from "prop-types";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  
  padding: 1.2rem 0;
  
  &:first-child {
      padding-top: 0;
    }
    
    &:last-child {
        padding-bottom: 0;
    }
    
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
    
    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
    `;

const Label = styled.label`
  font-weight: 500;
  `;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  `;

function RowForm({lable,error,children}) {
    return (
        <FormRow>
        {lable && <Label htmlFor={children.props.id}>{lable}</Label>}
        {children}
        {error && <Error>{error}</Error>}
      </FormRow>
    )
}

export default RowForm

RowForm.propTypes = {
  lable: PropTypes.node,
  error: PropTypes.node,
  children: PropTypes.node,
};