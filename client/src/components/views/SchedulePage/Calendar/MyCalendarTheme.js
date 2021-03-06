import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const CustomCheckbox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  input[type='checkbox'] {
    margin-right: 3px;
    visibility: hidden;
  }

  input[type='checkbox']:checked + label {
    background-color: ${(props) => props.theme.colors.white};
    border-color: ${(props) => props.whichColor};
  }

  input[type='checkbox']:checked + label:after {
    opacity: 1;
  }

  label {
    position: absolute;
    display: flex;
    background-color: ${(props) => props.whichColor};
    border: 2px solid ${(props) => props.whichColor};
    border-radius: 50%;
    width: 10px;
    height: 10px;
    left: 0;
    top: 25%;
  }

  label:after {
    display: flex;
    content: '';
    height: 4px;
    width: 4px;
    opacity: 0;
    position: absolute;
    top: 2px;
    left: 2px;
  }

  .theme-tag {
    display: flex;
    font-size: 13px;
  }
`;

function MyCalendarTheme({ CalendarData }) {  

  const renderTheme = CalendarData && CalendarData.map((theme, index) => (
    <CustomCheckbox key={theme.id + theme.name} whichColor={theme.bgColor}>
      <input type="checkbox" value={theme.id} id={theme.id + theme.name} disabled />
      <label htmlFor={theme.id + theme.name} />
      <div className="theme-tag">{theme.name}</div>
    </CustomCheckbox>
  ));

  return (
    <Container>
      {renderTheme}
    </Container>
  );
}

export default MyCalendarTheme;
