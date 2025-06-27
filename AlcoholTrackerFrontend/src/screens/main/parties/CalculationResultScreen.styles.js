import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Основной контейнер
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  
  // Контент внутри ScrollView
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 100
  },

  // Заголовок
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700', // Жёлтый
    marginBottom: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1
  },

  // Поле ввода места
  inputContainer: {
    marginBottom: 25,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 18,
    borderWidth: 2,
    borderColor: '#333'
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 10
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#444'
  },

  // Блоки информации
  infoBlock: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 8
  },
  infoText: {
    fontSize: 15,
    color: '#DDD',
    marginBottom: 8,
    paddingLeft: 5
  },
  warningText: {
    fontSize: 15,
    color: '#FF5252',
    marginTop: 10,
    fontWeight: '600'
  },

  // Секция с вариантами
  resultSection: {
    marginBottom: 25
  },
  alcoholAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center'
  },

  // Карточки вариантов
  variantCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3
  },
  selectedVariantCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#1A2E1A',
    transform: [{ scale: 1.02 }]
  },
  variantTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 12
  },
  drinkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A'
  },
  drinkName: {
    fontSize: 15,
    color: '#EEE',
    flex: 2
  },
  drinkAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4CAF50',
    flex: 1,
    textAlign: 'right'
  },
  selectedIndicator: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3
  },
  selectedIndicatorText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14
  },

  // Кнопка сохранения
  saveButton: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5
  },

  // Состояния загрузки и ошибки
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212'
  },
  errorText: {
    fontSize: 16,
    color: '#FF5252',
    textAlign: 'center'
  }
});