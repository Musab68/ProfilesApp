import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { api } from '../api/client';

export default function ProfilesListScreen({ navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfiles = async (isRefresh = false) => {
    if (loading || (!hasMore && !isRefresh)) return;
    setLoading(true);
    try {
      const currentPage = isRefresh ? 1 : page;
      const res = await api.get(`/profiles?page=${currentPage}&limit=10`);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setProfiles(prev => isRefresh ? res.data : [...prev, ...res.data]);
        setPage(currentPage + 1);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setHasMore(true);
    await fetchProfiles(true);
  };

  useEffect(() => { fetchProfiles(); }, []);

  if (loading && profiles.length === 0) {
    return <View style={styles.center}><ActivityIndicator size="large" /><Text>Yukleniyor...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => fetchProfiles()}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<View style={styles.center}><Text>Profil bulunamadi.</Text></View>}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('ProfileDetail', { id: item.id })}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: 'white', padding: 16, margin: 8, borderRadius: 8, elevation: 3 },
  name: { fontSize: 18, fontWeight: 'bold' }
});