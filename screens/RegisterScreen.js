import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import { FormInput } from '../components/FormInput';
import { RegisterSchema } from '../utils/validationSchemas';

export default function RegisterScreen({ onGoToLogin }) {
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Izinkan akses galeri untuk memilih foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Izinkan akses kamera untuk mengambil foto.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showOptions = () => {
    Alert.alert('Foto Profil', 'Pilih sumber foto', [
      { text: 'Kamera', onPress: takePhoto },
      { text: 'Galeri', onPress: pickImage },
      { text: 'Batal', style: 'cancel' },
    ]);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await new Promise((r) => setTimeout(r, 1000));
        Alert.alert(
          'Registrasi Berhasil',
          `Selamat ${values.name}, akun Anda telah dibuat!`
        );
        resetForm();
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
          <TouchableOpacity onPress={onGoToLogin} style={styles.backWrap}>
            <Text style={styles.backText}>‹ Login</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Daftar Akun</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>Daftar Akun</Text>

          <TouchableOpacity style={styles.avatarContainer} onPress={showOptions}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>Pilih Foto</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.photoText}>Ketuk untuk pilih foto profil</Text>

          <FormInput
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            error={formik.errors.name}
            touched={formik.touched.name}
          />

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
            label="Nomor HP"
            placeholder="Masukkan nomor HP"
            keyboardType="phone-pad"
            value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            error={formik.errors.phone}
            touched={formik.touched.phone}
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
          />

          <FormInput
            label="Konfirmasi Password"
            placeholder="Ulangi password"
            secureTextEntry
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />

          <TouchableOpacity
            style={[
              styles.button,
              formik.isSubmitting && styles.buttonDisabled,
            ]}
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            <Text style={styles.buttonText}>
              {formik.isSubmitting ? 'Loading...' : 'Daftar'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Sudah punya akun?{' '}
            <Text style={styles.link} onPress={onGoToLogin}>
              Login
            </Text>
          </Text>
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
    position: 'relative',
  },
  backWrap: {
    position: 'absolute',
    left: 16,
    bottom: 24,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222',
    textAlign: 'center',
    marginBottom: 26,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#165bd2e2',
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#165bd2e2',
  },
  avatarPlaceholderText: {
    color: '#444',
    fontWeight: '600',
  },
  photoText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
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
});