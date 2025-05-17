
import { Car } from '../types/car';

const API_URL = '/admin/api';

export const deleteVehicle = async (carId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('car_id', carId);

    const response = await fetch(`${API_URL}/vehicle_actions.php`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar vehículo',
    };
  }
};
