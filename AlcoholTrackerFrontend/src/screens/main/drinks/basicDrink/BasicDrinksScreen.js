import { fetchBasicDrinks } from '../../../../api/drinksApi';
import DrinkListScreen from '../../../../components/common/DrinkListScreen';
import { getStoredUserData } from '../../../../utils/storage';

export default function BasicDrinksScreen({ navigation, route }) {
  const favoriteDrinkIds = new Set(route.params?.favoriteDrinkIds || []);

  const fetchBasicDrinksWithUser = async () => {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');
    return fetchBasicDrinks(userInfo.userId);
  };

  return (
    <DrinkListScreen
      fetchFunction={fetchBasicDrinksWithUser}
      navigation={navigation}
      isCustom={false}
      emptyText="Напитки не найдены"
      favoriteDrinkIds={favoriteDrinkIds}
    />
  );
};