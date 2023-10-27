import { useRouter } from 'next/router';
import './reload-button.css'


const ReloadButton = () => {
  const router = useRouter();

  const reloadComponent = () => {
    router.reload(); // Reload the current page
  };

  return (
      <button onClick={reloadComponent} className='reloadButton'>Reload</button>
  );
};

export default ReloadButton;