import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../api/client';

export default function ProfilesListScreen({ navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Veri çekme fonksiyonu 
  const fetchProfiles = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await api.get(`/profiles?page=${page}&limit=10`);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setProfiles(prev => [...prev, ...res.data]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      alert("Sunucuya bağlanılamadı! Lütfen IP adresini kontrol edin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfiles(); }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchProfiles} // Sayfalama (Pagination) için 
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.card} 
            onPress={() => navigation.navigate('ProfileDetail', { id: item.id })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </Pressable>
        )}
        ListFooterComponent={loading && <ActivityIndicator color="#007AFF" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 10, elevation: 2 },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { color: '#666' }
});