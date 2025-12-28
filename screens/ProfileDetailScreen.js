import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { api } from '../api/client';

export default function ProfileDetailScreen({ route }) {
  const { id } = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/profiles/${id}`);
        setProfile(res.data);
      } catch (err) {
        alert("Detaylar yuklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (!profile) return <Text>Profil bulunamadi.</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text>Email: {profile.email}</Text>
        <Text>Yas: {profile.age}</Text>
        <Text>Telefon: {profile.phone}</Text>
        <Text style={styles.bio}>Hakkinda: {profile.bio}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 4 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  bio: { marginTop: 15, fontStyle: 'italic' }
});