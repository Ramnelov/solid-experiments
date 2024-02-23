import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const DroneView = ({ params }) => {
  // State to hold the ID
  const [id, setId] = createSignal(params.id);
  const navigate = useNavigate();

  const ids = ['id1', 'id2', 'id3', 'id4', 'id5'];

  onMount(() => {
    if (!ids.includes(id())) {
      navigate('/');
    }
  });

  return (
    <div>
      <h1>View for ID: {id()}</h1>
      {/* Other view components using the id state */}
    </div>
  );
};

export default DroneView;