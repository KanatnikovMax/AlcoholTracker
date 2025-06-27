import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 40
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#fefffa',
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
    color: '#d3ae35',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#fefffa',
  },
  logoutButton: {
    //backgroundColor: '#5a7454',
    backgroundColor: 'orange',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fefffa',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  retryButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fefffa',
    fontSize: 16,
  },
});
