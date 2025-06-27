// components/DrinkListScreen.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
  drinkCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    position: 'relative', // Важно для позиционирования иконки
  },
  drinkImageWrapper: {
    marginBottom: 10,
    alignItems: 'center',
    width: '100%', // Добавляем ширину для правильного позиционирования
  },
  favoriteIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 10,
    padding: 3,
    elevation: 2,
  },
  drinkName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  drinkInfo: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#aaa',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#d3ae35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#d3ae35',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 50,
  },
});