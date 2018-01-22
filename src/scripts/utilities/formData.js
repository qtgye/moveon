// Polyfills FormData.prototype.entries function
export function entries( form ) {
  if ( !(form instanceof HTMLFormElement ) ) {
    return [];
  }

  return $(form).serializeArray().map( ({name, value}) => [name, value] );
}

// Polyfills FormData.prototype.values function
export function values( form ) {
  let _entries = entries(form);
  return entries.map( entry => entry.value );
}
