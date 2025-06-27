import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#d3ae35',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fefffa',
  },
  centeredText: {
    textAlign: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  userDataContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
  },
  userDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userDataLabel: {
    fontSize: 16,
    color: '#fefffa',
    fontWeight: '500',
  },
  userDataValue: {
    fontSize: 16,
    color: '#d3ae35',
    fontWeight: '500',
  },
  hungerLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hungerLevelButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3a3a3a',
    alignItems: 'center',
  },
  hungerLevelButtonSelected: {
    backgroundColor: '#4CAF50',
  },
  hungerLevelText: {
    color: '#fefffa',
    fontSize: 14,
  },
  hungerLevelTextSelected: {
    color: '#fefffa',
    fontWeight: 'bold',
  },
  specialConditionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specialConditionButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3a3a3a',
    alignItems: 'center',
  },
  specialConditionButtonSelected: {
    backgroundColor: '#5a7454',
  },
  specialConditionText: {
    color: '#fefffa',
    fontSize: 14,
  },
  specialConditionTextSelected: {
    color: '#fefffa',
    fontWeight: 'bold',
  },
  promilleContainer: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  promilleButton: {
    width: '30%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3a3a3a',
    alignItems: 'center',
  },
  promilleButtonSelected: {
    backgroundColor: '#5a7454',
  },
  promilleText: {
    color: '#fefffa',
    fontSize: 16,
  },
  promilleTextSelected: {
    color: '#fefffa',
    fontWeight: 'bold',
  },
  hintText: {
    fontSize: 12,
    color: '#d3ae35',
    fontStyle: 'italic',
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  calculateButtonText: {
    color: '#fefffa',
    fontSize: 18,
    fontWeight: '600',
  },
  selectedPromilleText: {
    color: '#d3ae35',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  }

});