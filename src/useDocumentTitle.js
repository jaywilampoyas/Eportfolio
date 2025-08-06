import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    if (title === 'Home') {
      document.title = 'Jaywil L. Ampoyas';
    } else {
      document.title = `${title} | Jaywil L. Ampoyas`;
    }
  }, [title]);
}

export default useDocumentTitle;
