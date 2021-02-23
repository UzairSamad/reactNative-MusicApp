import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from 'src/constants';

export const styles = StyleSheet.create({
  area: {
    position: 'relative',
    flex: 1,
    paddingBottom: Dimensions.MINI_PLAYER_HEIGHT,
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 36,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },

  wrapper: {
    flexDirection: 'row',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.primary,
  },
});