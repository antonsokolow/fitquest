import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PRIMARY_COLOR = '#fff';
const SUCCESS_COLOR = '#2BAB5C';
const SECONDARY_COLOR = '#fff';

const styles = StyleSheet.create({
  // Container Styles
  containerDefault: {
    alignItems: 'center',
    padding: 18,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  containerPrimary: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  containerBlue: {
    backgroundColor: '#4267b2',
    borderColor: '#4267b2',
  },
  containerWhite: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  containerSuccess: {
    backgroundColor: SUCCESS_COLOR,
    borderColor: SUCCESS_COLOR,
  },
  containerPrimaryOutline: {
    backgroundColor: 'transparent',
  },
  containerSecondary: {
    backgroundColor: 'transparent',
    borderColor: SUCCESS_COLOR,
  },
  containerSecondaryOutline: {
    backgroundColor: 'transparent',
  },
  containerLarge: {
    paddingVertical: 15,
  },
  containerSmall: {
    paddingVertical: 5,
  },
  containerDisabled: {
    opacity: 0.65,
  },

  // TextStyles
  textDefault: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '500',
    color: '#fff',
  },
  textPrimary: {
    color: SUCCESS_COLOR,
  },
  textPrimaryOutline: {
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    color: SECONDARY_COLOR,
  },
  textSecondaryOutline: {
    color: SUCCESS_COLOR,
  },
  textLarge: {
    fontSize: 20,
  },
  textSmall: {
    fontSize: 14,
  },
  textDisabled: {},
})

const getStyles = ({
  size,
  theme,
  outline,
  disabled,
}) => {
  const containerStyles = [styles.containerDefault];
  const textStyles = [styles.textDefault];

  if (size === 'large') {
    containerStyles.push(styles.containerLarge);
    textStyles.push(styles.textLarge);
  } else if (size === 'small') {
    containerStyles.push(styles.containerSmall);
    textStyles.push(styles.textSmall);
  }

  if (theme === 'secondary') {
    containerStyles.push(styles.containerSecondary);
    textStyles.push(styles.textPrimary);

    if (outline) {
      containerStyles.push(styles.containerSecondaryOutline);
      textStyles.push(styles.textSecondaryOutline);
    }
  } else if (theme === 'success') {
    containerStyles.push(styles.containerSuccess);
    textStyles.push(styles.textSecondary);
  } else if (theme === 'blue') {
    containerStyles.push(styles.containerBlue);
    textStyles.push(styles.textSecondary);
  } else if (theme === 'white') {
    containerStyles.push(styles.containerWhite);
    textStyles.push(styles.textPrimary);
  }else {
    containerStyles.push(styles.containerPrimary);
    textStyles.push(styles.textPrimary);

    if (outline) {
      containerStyles.push(styles.containerPrimaryOutline);
      textStyles.push(styles.textPrimaryOutline);
    }
  }

  if (disabled) {
    containerStyles.push(styles.containerDisabled);
    textStyles.push(styles.textDisabled);
  }

  return { textStyles, containerStyles };
};

class Button extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    theme: PropTypes.oneOf(['primary', 'secondary', 'success', 'outline', 'inline', 'blue', 'white']),
    outline: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    size: 'default',
    theme: 'primary',
    outline: false,
    disabled: false,
  }

  render() {
    const {onPress, text, elem, disabled, ...rest} = this.props
    const {textStyles, containerStyles} = getStyles({disabled, ...rest})

    return (
      <TouchableOpacity
        onPress={onPress}
        style={containerStyles}
        disabled={disabled}>
        {elem}
        <Text style={textStyles}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

export default Button;