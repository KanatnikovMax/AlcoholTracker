import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d3ae35',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailRow: {
    marginBottom: 16,
  },
  label: {
    color: '#fefffa',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    color: '#d3ae35',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  feedbackContainer: {
    backgroundColor: '#fffbea',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },

  feedbackLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },

  feedbackOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  feedbackOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    marginRight: 6,
    backgroundColor: '#f8f8f8',
  },

  feedbackOptionSelected: {
    backgroundColor: '#d3ae35',
    borderColor: '#d3ae35',
  },

  feedbackOptionText: {
    fontSize: 14,
    color: '#333',
  },

  feedbackOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },

  feedbackSubmitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  feedbackSubmitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },


  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  drinkItem: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  drinkName: {
    fontSize: 16,
    color: '#4CAF50',
  },

});