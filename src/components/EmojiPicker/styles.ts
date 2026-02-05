import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)'
      }
    }),
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  searchEmojiGrid: {
    justifyContent: 'flex-start',
    paddingLeft: 0,
  },
  emojiButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  emojiText: {
    fontSize: 28,
  },
  noResultsContainer: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  skinToneSelector: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  skinToneButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  skinToneButtonActive: {
    borderWidth: 2,
    transform: [{ scale: 1.15 }],
  },
});
