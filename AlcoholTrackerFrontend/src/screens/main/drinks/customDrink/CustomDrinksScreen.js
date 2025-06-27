import DrinkListScreen from '../../../../components/common/DrinkListScreen';
import { fetchUserDrinks } from '../../../../api/drinksApi';
import { getStoredUserData } from '../../../../utils/storage';

export default function CustomDrinksScreen({ navigation, route }) {
  const favoriteDrinkIds = new Set(route.params?.favoriteDrinkIds || []);

  const fetchUserDrinksWithUser = async () => {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');
    return fetchUserDrinks(userInfo.userId);
  };

  return (
    <DrinkListScreen
      fetchFunction={fetchUserDrinksWithUser}
      navigation={navigation}
      isCustom={true}
      emptyText="У вас пока нет своих напитков"
      showAddButton={true}
      favoriteDrinkIds={favoriteDrinkIds}
    />
  );
}
