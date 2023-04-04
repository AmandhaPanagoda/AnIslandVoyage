
document.addEventListener('DOMContentLoaded', function() {
  const selector = '.item';
  const elems = Array.from( document.querySelectorAll( selector ) );
  const navigation = document.querySelector( 'item' );
  
  function makeActive( evt ) {
    const target = evt.target;
    
    if ( !target || !target.matches( selector ) ) {
      return;
    }
    
    elems.forEach( elem => elem.classList.remove( 'active' ) );
      
      evt.target.classList.add( 'active' );
  };
  
  navigation.addEventListener( 'mousedown', makeActive );
  
  } );