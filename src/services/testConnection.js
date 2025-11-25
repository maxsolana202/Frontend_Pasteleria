import { authAPI } from './api';

// Función para probar la conexión con el backend
export const testBackendConnection = async () => {
  try {
    console.log('🔍 Probando conexión con el backend...');
    
    // Probar endpoint de usuarios (público)
    const response = await authAPI.getUsers();
    console.log('✅ Conexión exitosa:', response.data);
    return true;
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('💡 Asegúrate de que:');
    console.log('   - El backend esté ejecutándose en http://localhost:8080');
    console.log('   - No haya errores de CORS');
    console.log('   - Los endpoints existan en el backend');
    return false;
  }
};