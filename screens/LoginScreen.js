import { Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useFormik } from 'formik';
import { FormInput } from '../components/FormInput';
import { LoginSchema } from '../utils/validationSchemas';

export default function LoginScreen({ onGoToRegister }) {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await new Promise((r) => setTimeout(r, 1200));

        if (
          values.email === 'test@example.com' &&
          values.password === 'password123'
        ) {
          Alert.alert('Berhasil', 'Login sukses!');
        } else {
          setFieldError('email', 'Email atau password salah');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Login</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>            Selamat Datang</Text>
          <Text style={styles.subtitle}>                      Silakan login untuk melanjutkan</Text>

          <FormInput
            label="Email"
            placeholder="Masukkan email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          <FormInput
            label="Password"
            placeholder="Masukkan password"
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.errors.password}
            touched={formik.touched.password}
            onSubmitEditing={formik.handleSubmit}
          />

          <TouchableOpacity
            style={[styles.button, formik.isSubmitting && styles.buttonDisabled]}
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            <Text style={styles.buttonText}>
              {formik.isSubmitting ? 'Loading...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Belum punya akun?{' '}
            <Text style={styles.link} onPress={onGoToRegister}>
              Daftar
            </Text>
          </Text>

          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Akun Demo:</Text>
            <Text style={styles.demoText}>Email: test@example.com</Text>
            <Text style={styles.demoText}>Password: password123</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  header: {
    height: 110,
    backgroundColor: '#165bd2e2',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  container: {
    padding: 24,
    paddingTop: 120,
    paddingBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#222',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#165bd2e2',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  bottomText: {
    textAlign: 'center',
    marginTop: 28,
    fontSize: 16,
    color: '#555',
  },
  link: {
    color: '#165bd2e2',
    fontWeight: '800',
  },
  demoBox: {
    marginTop: 34,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222',
    marginBottom: 14,
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});