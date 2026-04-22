import { View, Text, TextInput, StyleSheet } from 'react-native';

export function FormInput({ label, error, touched, style, ...rest }) {
  const hasError = touched && error;

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor="#999"
        {...rest}
      />

      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#d6d6d6',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#222',
  },
  inputError: {
    borderColor: '#e53935',
    backgroundColor: '#fff8f8',
  },
  errorText: {
    marginTop: 8,
    fontSize: 12,
    color: '#e53935',
  },
});