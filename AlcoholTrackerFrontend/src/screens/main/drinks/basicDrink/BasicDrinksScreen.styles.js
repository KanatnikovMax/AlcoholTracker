import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  drinkCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    maxWidth: '48%',
  },
  drinkImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  drinkName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  drinkInfo: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#5a7454',
    padding: 12,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#fefffa',
    fontSize: 16,
  },
});