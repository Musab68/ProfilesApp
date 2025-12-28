import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { api } from '../api/client';

export default function ProfileDetailScreen({ route, navigation }) {
  // Liste ekranından gönderilen 'id' parametresini alıyoruz [cite: 289, 290, 297]
  const { id } = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      // Belirli bir ID'ye sahip profilin detaylarını çekiyoruz [cite: 26, 299]
      const res = await api.get(`/profiles/${id}`);
      setProfile(res.data);
    } catch (err) {
      setError('Profil detayları yüklenemedi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]); // ID değiştiğinde veriyi tekrar çek [cite: 300]

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Profil bulunamadı'}</Text>
        <Pressable style={styles.retryButton} onPress={fetchProfile}>
          <Text style={styles.retryText}>Tekrar Dene</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{profile.name}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Yaş:</Text>
          <Text style={styles.value}>{profile.age}</Text>
        </View>
        {profile.phone && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Telefon:</Text>
            <Text style={styles.value}>{profile.phone}</Text>
          </View>
        )}
        {profile.bio && (
          <View style={styles.bioSection}>
            <Text style={styles.label}>Hakkında:</Text>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: 'white', margin: 16, borderRadius: 12, padding: 20, elevation: 4 },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  infoRow: { flexDirection: 'row', marginBottom: 12 },
  label: { fontWeight: '600', width: 80, color: '#666' },
  value: { color: '#333', flex: 1 },
  bioSection: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15 },
  bioText: { color: '#444', lineHeight: 22, marginTop: 5 },
  loadingText: { marginTop: 10, color: '#666' },
  errorText: { color: '#d32f2f', marginBottom: 15 },
  retryButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8 },
  retryText: { color: 'white', fontWeight: 'bold' }
});