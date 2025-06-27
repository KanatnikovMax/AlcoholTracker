import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ 
  label, 
  error,
  ...props 
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.errorInput : null]}
        {...props}
      />
      <Text 
        style={[styles.errorText, { opacity: error ? 1 : 0 }]}
        numberOfLines={2}
      >
        {error || ' '} {/* Пробел для сохранения места */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: '#d4af37',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  errorInput: {
    borderColor: '#ff5252',
  },
  errorText: {
    color: '#ff5252',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomTextInput;