import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 40
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedHeader: {
    padding: 15,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    marginBottom: 10,
  },
  historyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollableList: {
    flex: 1,
    marginBottom: 70, // Оставляем место для кнопки
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  newPartyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  partyItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  partyItemNeedsFeedback: {
    borderLeftWidth: 5,
    borderLeftColor: '#d3ae35',
  },
  partyItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partyTextContainer: {
    flex: 1,
  },
  partyDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  partyDescription: {
    color: '#aaa',
    fontSize: 14,
  },
  feedbackBadgeContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  feedbackBadge: {
    backgroundColor: '#d3ae35',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  feedbackBadgeText: {
    color: '#121212',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#d3ae35',
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#121212',
    fontWeight: 'bold',
  },
});