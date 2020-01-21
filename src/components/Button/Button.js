import React from 'react';

export default function Button(props) {
  let { addClass, text, click } = props;
  return (
    <button className={'button_clear ' + (addClass || '')} onClick={click}>
      {text}
    </button>
  );
}
